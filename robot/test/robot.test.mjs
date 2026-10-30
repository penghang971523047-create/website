import test from 'node:test';
import assert from 'node:assert/strict';
import { createHandler } from '../server.mjs';

const request = (body, headers={}) => new Request('http://robot.test/api/chat', {method:'POST',headers:{'content-type':'application/json',...headers},body:JSON.stringify(body)});
test('health and mock chat return safe JSON', async () => { const h=createHandler({ask:async()=>({answer:'ok',model:'dsv4.1f'})}); const health=await h(new Request('http://robot.test/health')); assert.equal(health.status,200); const r=await h(request({message:'你好'})); const b=await r.json(); assert.equal(r.status,200); assert.equal(b.status,'answered'); assert.equal(b.model,'dsv4.1f'); assert.match(b.disclaimer,/不是律师/); });
test('rejects missing and oversized messages', async () => { const h=createHandler({ask:async()=>({answer:'unused'})}); let r=await h(request({})); assert.equal(r.status,400); assert.equal((await r.json()).code,'message_required'); r=await h(request({message:'a'.repeat(401)})); assert.equal(r.status,400); assert.equal((await r.json()).code,'message_too_long'); });
test('maps provider failures without leaking details', async () => { const h=createHandler({ask:async()=>{throw new Error('secret-provider-detail')}}); const r=await h(request({message:'x'})); const b=await r.json(); assert.equal(r.status,502); assert.equal(b.code,'upstream_unavailable'); assert.equal(JSON.stringify(b).includes('secret'),false); });
test('keeps the MXZ /v1 base path in the chat endpoint', async () => {
  let called;
  const ask = (await import('../provider.mjs')).createProvider({
    apiKey:'test-key',
    baseUrl:'https://api.mxzzz.xyz/v1',
    fetchImpl: async (url) => { called=String(url); return new Response(JSON.stringify({choices:[{message:{content:'ok'}}]}),{status:200}); },
  });
  await ask([{role:'user',content:'hi'}]);
  assert.equal(called,'https://api.mxzzz.xyz/v1/chat/completions');
});
