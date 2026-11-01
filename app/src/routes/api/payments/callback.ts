import { createFileRoute } from "@tanstack/react-router";
import { verifyAndFulfill } from "@/lib/airsms.server";
export const Route=createFileRoute("/api/payments/callback")({server:{handlers:{GET:async({request})=>{const u=new URL(request.url),ref=u.searchParams.get("reference");if(ref){try{await verifyAndFulfill(ref);}catch(e){console.error("AirSMS payment callback",e);}}return Response.redirect(new URL("/account?payment="+(ref?"returned":"missing"),u.origin),303);}}}});
