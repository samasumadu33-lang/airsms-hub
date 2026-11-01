import process from "node:process";
import type {
  D1Database,
  DurableObjectNamespace,
  KVNamespace,
  R2Bucket,
} from "@cloudflare/workers-types";

type AppEnv = {
  DB?: D1Database;
  STORAGE?: R2Bucket;
  KV?: KVNamespace;
  CONTAINER?: DurableObjectNamespace;
  HF_ENV?: string;
  APP_SLUG?: string;
  [key: string]: unknown;
};

// Vercel/Node runtime configuration. Kept as a function so secrets are read
// at request time and never captured in a browser bundle.
export function bindings(): AppEnv {
  return process.env as unknown as AppEnv;
}
