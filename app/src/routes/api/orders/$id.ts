import { createFileRoute } from "@tanstack/react-router";
import { errorJson,json,requireUser,syncFiveSimOrder } from "@/lib/airsms.server";
export const Route=createFileRoute("/api/orders/$id")({server:{handlers:{GET:async({request,params})=>{const u=await requireUser(request);if(u instanceof Response)return u;try{const o=await syncFiveSimOrder(params.id,u.id);return o?json({ok:true,order:o}):errorJson("Order not found.",404);}catch(e){return errorJson(e instanceof Error?e.message:"Could not refresh this order.",502);}}}}});
