# Portfolio agent worker

One Cloudflare Worker (free tier), two endpoints, zero databases:

| Endpoint | What it does |
|---|---|
| `POST /chat` | Grounded chat about Abhishek — backs the widget on [abhi25072002.github.io/ai](https://abhi25072002.github.io/ai/) |
| `POST /mcp` | MCP server (Streamable HTTP) — lets any MCP client query Abhishek's profile with tools |

Both are powered by the same allowlisted, AI-facing profile
([public-profile.json](https://abhi25072002.github.io/assets/json/public-profile.json)),
generated from `resume.json` by `bin/generate_public_profile.py`. Private data
(phone, personal email, transcript links) never enters this layer.

## MCP tools exposed

`get_profile_summary` · `get_experience(company?)` · `get_projects(topic?)` ·
`get_skills` · `get_education` · `get_publications` · `get_availability_and_contact`

## Deploy (one time, ~5 minutes)

```bash
cd worker
npx wrangler login                 # free Cloudflare account
npx wrangler secret put GROQ_API_KEY   # free key from console.groq.com
npx wrangler deploy
```

The deploy prints your URL, e.g. `https://abhishek-portfolio-agent.abhishek-dharmadhikari.workers.dev`.
Then set that URL as `WORKER_URL` in `_pages/ai.md` so the chat widget points at it.

## Add the MCP server to your AI tools

**Claude Desktop** (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "abhishek": {
      "command": "npx",
      "args": ["mcp-remote", "https://abhishek-portfolio-agent.abhishek-dharmadhikari.workers.dev/mcp"]
    }
  }
}
```

**Cursor** (`.cursor/mcp.json`) and **VS Code** (`.vscode/mcp.json`) support the
URL directly:

```json
{ "mcpServers": { "abhishek": { "url": "https://abhishek-portfolio-agent.abhishek-dharmadhikari.workers.dev/mcp" } } }
```

## Guardrails

- Chat answers only from the public profile; refuses salary/visa/personal topics.
- Prompt-injection-resistant: read-only tools, no actions, system rules pinned.
- Best-effort per-IP rate limiting (20 req/min) via the Cache API.
- Input caps: 12 messages, 2000 chars each.

## Local dev

```bash
cd worker
npx wrangler dev        # serves on http://localhost:8787
curl -X POST localhost:8787/mcp -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```
