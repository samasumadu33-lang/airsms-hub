import { Readable } from 'node:stream';
import server from '../dist/server/server.js';

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  try {
    const host = req.headers['x-forwarded-host'] || req.headers.host || process.env.VERCEL_URL;
    if (!host) throw new Error('Request host is missing');
    const routed = new URL(req.url || '/', `https://${host}`);
    const originalPath = typeof req.query?.__path === 'string' ? req.query.__path : '/';
    const params = new URLSearchParams(routed.search);
    params.delete('__path');
    const target = new URL(originalPath.startsWith('/') ? originalPath : `/${originalPath}`, `https://${host}`);
    target.search = params.toString();
    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (Array.isArray(value)) value.forEach((v) => headers.append(key, v));
      else if (value !== undefined) headers.set(key, value);
    }
    const method = (req.method || 'GET').toUpperCase();
    const init = { method, headers };
    if (method !== 'GET' && method !== 'HEAD') {
      init.body = Readable.toWeb(req);
      init.duplex = 'half';
    }
    const request = new Request(target, init);
    const response = await server.fetch(request, process.env, { waitUntil(promise) { Promise.resolve(promise).catch(console.error); } });
    res.statusCode = response.status;
    response.headers.forEach((value, key) => { if (key.toLowerCase() !== 'set-cookie') res.setHeader(key, value); });
    const cookies = response.headers.getSetCookie?.();
    if (cookies?.length) res.setHeader('set-cookie', cookies);
    if (!response.body) return res.end();
    Readable.fromWeb(response.body).pipe(res);
  } catch (error) {
    console.error('AirSMS Hub request failed', error);
    res.statusCode = 500;
    res.setHeader('content-type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ ok: false, error: 'The server could not complete this request.' }));
  }
}
