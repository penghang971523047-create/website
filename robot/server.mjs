import http from 'node:http';
import { createMockProvider, createProvider } from './provider.mjs';

const PORT = Number(process.env.PORT || 8788);
const MAX_MESSAGE = 400;
const DISCLAIMER = '我是网站资料助手，不是律师；仅作公开资料导读，不构成法律意见，请勿提交隐私或案件材料。';
const ALLOWED_ORIGINS = new Set((process.env.MXZ_ALLOWED_ORIGINS || '').split(',').map(x => x.trim()).filter(Boolean));

function body(status, value, origin = '') {
  const headers = new Headers({'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff'});
  if (origin && ALLOWED_ORIGINS.has(origin)) { headers.set('access-control-allow-origin', origin); headers.set('vary','Origin'); }
  return new Response(JSON.stringify(value), {status, headers});
}
function validate(message) {
  if (typeof message !== 'string' || !message.trim()) return 'message_required';
  if (Array.from(message.trim()).length > MAX_MESSAGE) return 'message_too_long';
  return null;
}
export function createHandler({ask = process.env.MXZ_API_KEY ? createProvider() : createMockProvider()} = {}) {
  return async function handle(request) {
    const origin = request.headers.get('origin') || '';
    if (request.method === 'OPTIONS') {
      if (origin && !ALLOWED_ORIGINS.has(origin)) return body(403, {status:'error',code:'origin_not_allowed'}, origin);
      const h = new Headers(origin ? {'access-control-allow-origin':origin,'access-control-allow-methods':'POST,OPTIONS','access-control-allow-headers':'content-type'} : {});
      return new Response(null, {status:204,headers:h});
    }
    const url = new URL(request.url);
    if (request.method === 'GET' && url.pathname === '/health') return body(200, {status:'ok',mode:process.env.MXZ_API_KEY?'live':'mock'}, origin);
    if (request.method !== 'POST' || url.pathname !== '/api/chat') return body(404, {status:'error',code:'not_found'}, origin);
    try {
      const length = Number(request.headers.get('content-length') || 0); if (length > 4096) return body(413, {status:'error',code:'body_too_large'}, origin);
      const input = await request.json(); const message = input?.message; const error = validate(message);
      if (error) return body(400, {status:'error',code:error}, origin);
      const result = await ask([{role:'system',content:`${DISCLAIMER} Answer briefly and safely. If the question needs case-specific legal advice, refuse.`},{role:'user',content:message.trim()}]);
      return body(200, {status:'answered',code:'model_reply',answer:result.answer.slice(0,2000),model:result.model,disclaimer:DISCLAIMER}, origin);
    } catch (err) {
      const status = err?.name === 'TimeoutError' ? 504 : 502;
      return body(status, {status:'error',code:status===504?'upstream_timeout':'upstream_unavailable'}, origin);
    }
  };
}
export function createServer(options) {
  const handle = createHandler(options);
  return http.createServer(async (req,res) => {
    const url = `http://127.0.0.1${req.url}`;
    const chunks=[]; for await (const chunk of req) chunks.push(chunk);
    const request = new Request(url,{method:req.method,headers:req.headers,body:chunks.length?Buffer.concat(chunks):undefined,duplex:'half'});
    const response=await handle(request); const headers=Object.fromEntries(response.headers); res.writeHead(response.status,headers); res.end(Buffer.from(await response.arrayBuffer()));
  });
}
if (import.meta.url === `file://${process.argv[1]}`) createServer().listen(PORT,'127.0.0.1',()=>console.log(`Robot API listening on http://127.0.0.1:${PORT}`));
