import { createFileRoute } from "@tanstack/react-router";
export const Route=createFileRoute("/robots.txt")({// @ts-expect-error TanStack Start server-route type augmentation
  server:{handlers:{GET:async({request}: {request: Request})=>{const origin=new URL(request.url).origin;return new Response(["User-agent: *","Allow: /","Disallow: /account","Disallow: /admin","Disallow: /api/","", "Sitemap: "+origin+"/sitemap.xml"].join("\\n"),{headers:{"content-type":"text/plain; charset=utf-8","cache-control":"public, max-age=86400"}});}}}});
