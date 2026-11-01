# AirSMS Hub production setup

The website is built with a live 5SIM inventory adapter and Paystack checkout. Sales remain disabled until the owner has configured all required credentials and confirmed the provider's commercial terms.

## Required server-side secrets

Configure these through the website's secure settings (never paste secrets into source code or customer-facing forms):

- FIVESIM_API_KEY — API key from the 5SIM account that will fund number allocations. Select the current 5SIM protocol key (not the deprecated API1 protocol key).
- PAYSTACK_SECRET_KEY — start with a Paystack test secret key; switch to the live secret only after successful end-to-end testing and business approval.
- ADMIN_EMAIL — the email address that will own the first administrator account.
- ADMIN_BOOTSTRAP_TOKEN — a long, randomly generated one-time setup token.
- SMS_RESELLER_APPROVED — set to the exact string true only after written confirmation from 5SIM that the intended commercial resale is permitted.
- SMS_ALLOWED_SERVICES — comma-separated 5SIM service slugs individually approved in writing for this resale model. Leave empty until approval is documented. The API and checkout both reject services not in this allowlist.

## Paystack webhook

After deployment, set the Paystack webhook URL to:

https://<your-live-domain>/api/payments/webhook

Enable the charge.success event. The server verifies the webhook signature and then verifies the transaction reference, amount and currency with Paystack before requesting a number.

## First administrator

1. Set ADMIN_EMAIL and ADMIN_BOOTSTRAP_TOKEN.
2. Open /admin and create the first admin account using those values.
3. Sign in to the admin portal and set the current USD-to-GHS rate and the customer markup.
4. Confirm Paystack test-mode checkout and provider number allocation before switching to live keys.
5. Remove or rotate the bootstrap token after initial setup.

## Provider and customer-use restrictions

5SIM's public inventory endpoints can be read without an account key. The adapter uses the current 5SIM protocol at https://5sim.net/v1. Number allocation requires an authenticated API key and a funded provider balance. Inventory is never presented as an allocated number until the provider returns an order ID and phone number.

The 5SIM API documentation describes API access and a developer referral program; it does not, by itself, establish blanket permission to resell every product or service. Obtain written approval for your exact commercial model and each selected service before enabling checkout. Only put individually approved service slugs in SMS_ALLOWED_SERVICES. Do not list services where numbers are used to bypass verification, account-security, eligibility, anti-abuse or ban controls. Each originating platform may independently prohibit or reject virtual numbers. No service acceptance or SMS delivery is guaranteed.

## Payment and refund operations

A payment is verified before a provider allocation is attempted. If allocation fails after a successful payment, the order is flagged as allocation_failed for administrator support and refund handling. Do not mark an order fulfilled manually without checking the provider and payment records.

## Technical notes

- D1 stores accounts, hashed sessions, orders, payment references, settings and audit events.
- Passwords use PBKDF2-SHA-256 with a per-user random salt.
- Session tokens are stored as hashes and sent only in Secure, HttpOnly, SameSite=Lax cookies.
- Provider and payment credentials are read server-side only.
- Live inventory is fetched from 5SIM's public prices and countries endpoints. The public UI lists only services explicitly allowlisted in SMS_ALLOWED_SERVICES; an empty allowlist fails closed and prevents all service purchases.


## Vercel + Neon production deployment

The Vercel deployment uses the Node.js serverless adapter in `api/index.mjs` and Neon PostgreSQL via `DATABASE_URL`. Configure the following Vercel Production environment variables before enabling paid orders:

- `DATABASE_URL` — Neon pooled connection string (already configured on the Vercel project).
- `PAYSTACK_SECRET_KEY` — Paystack secret key.
- `FIVESIM_API_KEY` — 5SIM API key.
- `ADMIN_EMAIL` and `ADMIN_BOOTSTRAP_TOKEN` — one-time administrator bootstrap.
- `SMS_RESELLER_APPROVED=true` and `SMS_ALLOWED_SERVICES` — only after written provider and originating-service approval for each listed service. Keep the service list empty otherwise.

The build command is `bash scripts/vercel-build.sh`; install command is `bun install --frozen-lockfile`. The Paystack webhook endpoint is `/api/payments/webhook`.
