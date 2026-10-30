# Website robot API

A small Node HTTP API for the live website assistant. It defaults to a local mock and never logs prompts or credentials.

```bash
npm test
npm start
curl -s http://127.0.0.1:8788/api/chat -H 'content-type: application/json' -d '{"message":"你好"}'
```

Enable the MXZ OpenAI-compatible endpoint only in the process environment:

```bash
MXZ_BASE_URL=https://api.mxzzz.xyz/v1 MXZ_MODEL=dsv4.1f MXZ_API_KEY='(set outside the repo)' npm start
```

`MXZ_API_KEY` is never read from a file, written to output, or persisted. `MXZ_ALLOWED_ORIGINS` is a comma-separated exact Origin allowlist. The API accepts only `{message}` (1–400 Unicode characters), returns JSON, applies a 12-second upstream timeout, and exposes `/health`.
