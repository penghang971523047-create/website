const DEFAULT_MODEL = 'dsv4.1f';

export function createProvider({
  apiKey = process.env.MXZ_API_KEY,
  baseUrl = process.env.MXZ_BASE_URL || 'https://api.mxzzz.xyz/v1',
  model = process.env.MXZ_MODEL || DEFAULT_MODEL,
  fetchImpl = fetch,
  timeoutMs = 12_000,
} = {}) {
  if (!apiKey) throw new Error('MXZ_API_KEY is required for live mode');
  const endpoint = new URL('/chat/completions', baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`);
  if (endpoint.protocol !== 'https:' || endpoint.username || endpoint.password || endpoint.search || endpoint.hash) {
    throw new Error('MXZ_BASE_URL must be an HTTPS origin without embedded credentials');
  }
  return async function ask(messages) {
    const response = await fetchImpl(endpoint, {
      method: 'POST',
      signal: AbortSignal.timeout(timeoutMs),
      headers: { 'content-type': 'application/json', authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model, messages, temperature: 0.2, stream: false }),
    });
    if (!response.ok) throw new Error(`upstream_${response.status}`);
    const data = await response.json();
    const answer = data?.choices?.[0]?.message?.content;
    if (typeof answer !== 'string' || !answer.trim()) throw new Error('invalid_upstream_response');
    return { answer: answer.trim(), model };
  };
}

export function createMockProvider() {
  return async function ask() {
    return { answer: '这是离线演示回复。配置 MXZ_API_KEY 后启用真实模型。', model: 'mock' };
  };
}
