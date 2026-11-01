import { createFileRoute } from "@tanstack/react-router";
import { db,json,requireUser } from "@/lib/airsms.server";
export const Route=createFileRoute("/api/orders")({// @ts-expect-error TanStack Start server-route type augmentation
  server:{handlers:{GET:async({request}: {request: Request})=>{const u=await requireUser(request);if(u instanceof Response)return u;const r=await db().prepare("SELECT id,country,country_name,product,operator,phone,amount_minor,currency,status,sms_code,sms_text,expires_at,created_at,updated_at FROM orders WHERE user_id=? ORDER BY created_at DESC LIMIT 50").bind(u.id).all();return json({ok:true,orders:r.results??[]});}}}});
