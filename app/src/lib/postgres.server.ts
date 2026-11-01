import process from "node:process";
import { Pool, type PoolClient, type QueryResultRow } from "pg";
import { attachDatabasePool } from "@vercel/functions";

type D1Result<T> = { results: T[]; success: true; meta: { changes: number } };

let pool: Pool | undefined;
function getPool(): Pool {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is not configured.");
  if (!pool) {
    pool = new Pool({
      connectionString,
      max: 5,
      idleTimeoutMillis: 5_000,
      connectionTimeoutMillis: 10_000,
      ssl: { rejectUnauthorized: true },
    });
    attachDatabasePool(pool);
  }
  return pool;
}

function toPostgres(sql: string): string {
  let query = sql
    .replace(/datetime\('now',\s*'-([0-9]+) minutes?'\)/gi, "(CURRENT_TIMESTAMP - INTERVAL '$1 minutes')")
    .replace(/datetime\('now'\)/gi, "CURRENT_TIMESTAMP");
  let index = 0;
  query = query.replace(/\?/g, () => `$${++index}`);
  return query;
}

class PreparedQuery {
  private values: unknown[] = [];
  private readonly query: string;
  constructor(sql: string) { this.query = toPostgres(sql); }
  bind(...values: unknown[]): this { this.values = values; return this; }
  async first<T extends QueryResultRow = QueryResultRow>(): Promise<T | null> {
    const result = await getPool().query<T>(this.query, this.values);
    return result.rows[0] ?? null;
  }
  async all<T extends QueryResultRow = QueryResultRow>(): Promise<D1Result<T>> {
    const result = await getPool().query<T>(this.query, this.values);
    return { results: result.rows, success: true, meta: { changes: result.rowCount ?? 0 } };
  }
  async run(): Promise<{ success: true; meta: { changes: number } }> {
    const result = await getPool().query(this.query, this.values);
    return { success: true, meta: { changes: result.rowCount ?? 0 } };
  }
  async execute(client: PoolClient): Promise<void> {
    await client.query(this.query, this.values);
  }
}

export function db() {
  return {
    prepare(sql: string) { return new PreparedQuery(sql); },
    async batch(queries: PreparedQuery[]) {
      const client = await getPool().connect();
      try {
        await client.query("BEGIN");
        for (const query of queries) await query.execute(client);
        await client.query("COMMIT");
        return { success: true };
      } catch (error) {
        await client.query("ROLLBACK");
        throw error;
      } finally {
        client.release();
      }
    },
  };
}
