import { createFileRoute } from "@tanstack/react-router";
import { currentUser,json } from "@/lib/airsms.server";
export const Route=createFileRoute("/api/auth/me")({// @ts-expect-error TanStack Start server-route type augmentation
  server:{handlers:{GET:async({request}: {request: Request})=>{const u=await currentUser(request);return json({ok:true,user:u?{id:u.id,email:u.email,role:u.role}:null});}}}});
