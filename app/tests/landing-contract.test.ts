import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";

const read = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");

describe("AirSMS Hub application contract", () => {
  test("serves the marketplace as the public home route", () => {
    const home = read("../src/routes/index.tsx");
    expect(home).toContain('createFileRoute("/")');
    expect(home).toContain("APPROVED SERVICE INVENTORY");
    expect(home).toContain("/api/catalog");
  });

  test("provides account and order inbox routes", () => {
    const account = read("../src/routes/account.tsx");
    const orders = read("../src/routes/api/orders.ts");
    expect(account).toContain('createFileRoute("/account")');
    expect(account).toContain("/api/auth/register");
    expect(account).toContain("/api/orders");
    expect(orders).toContain("requireUser(request)");
  });

  test("keeps checkout fail-closed until each service is explicitly approved", () => {
    const checkout = read("../src/routes/api/checkout.ts");
    expect(checkout).toContain("SMS_RESELLER_APPROVED");
    expect(checkout).toContain("SMS_ALLOWED_SERVICES");
    expect(checkout).toContain("PAYSTACK_SECRET_KEY");
  });
});
