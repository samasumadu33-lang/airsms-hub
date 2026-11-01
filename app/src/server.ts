import "./lib/error-capture";
import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { applySecurityHeaders } from "./lib/security-headers.server";
type Entry={fetch:(request:Request,env:unknown,ctx:unknown)=>Promise<Response>|Response};
let entry:Promise<Entry>|undefined;
async function getEntry(){if(!entry)entry=import("@tanstack/react-start/server-entry").then(m=>(m.default??m) as Entry);return entry;}
async function normalize(response:Response){if(response.status<500)return response;const type=response.headers.get("content-type")??"";if(!type.includes("application/json"))return response;const body=await response.clone().text();if(!body.includes('"unhandled":true')||!body.includes('"message":"HTTPError"'))return response;console.error(consumeLastCapturedError()??new Error("SSR error"));return new Response(renderErrorPage(),{status:500,headers:{"content-type":"text/html; charset=utf-8"}});}
export default {async fetch(request:Request,env:unknown,ctx:unknown){try{const url=new URL(request.url);if(url.pathname.length>1&&url.pathname.endsWith("/"))return applySecurityHeaders(Response.redirect(new URL(url.pathname.slice(0,-1)+url.search,url),301));const h=await getEntry();return applySecurityHeaders(await normalize(await h.fetch(request,env,ctx)));}catch(e){console.error(e);return applySecurityHeaders(new Response(renderErrorPage(),{status:500,headers:{"content-type":"text/html; charset=utf-8"}}));}}};
