import { createFileRoute } from "@tanstack/react-router";
import { db, json, secret } from "@/lib/airsms.server";

export const Route = createFileRoute("/api/health")({
  server: {
    handlers: {
      GET: async () => {
        try {
          await db().prepare("SELECT 1 AS ok").first();
          return json({
            ok: true,
            service: "AirSMS Hub",
            database: "connected",
            integrations: {
              paystack: !!secret("PAYSTACK_SECRET_KEY"),
              smsProvider: !!secret("FIVESIM_API_KEY"),
              commercialApproval: secret("SMS_RESELLER_APPROVED") === "true",
            },
          });
        } catch {
          return json({ ok: false, service: "AirSMS Hub", database: "unavailable" }, 503);
        }
      },
    },
  },
});
