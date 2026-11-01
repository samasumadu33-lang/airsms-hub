import { createFileRoute } from "@tanstack/react-router";
import { currentUser,json } from "@/lib/airsms.server";
export const Route=createFileRoute("/api/auth/me")({server:{handlers:{GET:async({request})=>{const u=await currentUser(request);return json({ok:true,user:u?{id:u.id,email:u.email,role:u.role}:null});}}}});
