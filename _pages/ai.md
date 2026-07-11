---
layout: page
permalink: /ai/
title: talk to my AI
description: Ask my portfolio anything — or add me to your own AI assistant via MCP.
nav: true
nav_order: 6
---

<style>
  .ai-chat-card {
    border: 1px solid var(--global-divider-color);
    border-radius: 12px;
    background: var(--global-card-bg-color);
    overflow: hidden;
    margin-bottom: 0.75rem;
  }
  .ai-chat-log {
    min-height: 220px;
    max-height: 420px;
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }
  .ai-msg { max-width: 85%; padding: 0.5rem 0.75rem; border-radius: 10px; font-size: 0.92rem; line-height: 1.45; white-space: pre-wrap; }
  .ai-msg.user { align-self: flex-end; background: var(--global-theme-color); color: #fff; }
  .ai-msg.bot { align-self: flex-start; background: var(--global-code-bg-color); color: var(--global-text-color); }
  .ai-msg.notice { align-self: center; color: var(--global-text-color-light); font-size: 0.85rem; background: none; }
  .ai-chat-form { display: flex; gap: 0.5rem; padding: 0.75rem; border-top: 1px solid var(--global-divider-color); }
  .ai-chat-form input {
    flex: 1; padding: 0.5rem 0.75rem; font-size: 0.92rem;
    border: 1px solid var(--global-divider-color); border-radius: 8px;
    background: var(--global-bg-color); color: var(--global-text-color);
  }
  .ai-chat-form button, .ai-copy-btn {
    padding: 0.45rem 1rem; font-size: 0.9rem; cursor: pointer;
    border: 1px solid var(--global-theme-color); border-radius: 8px;
    background: var(--global-theme-color); color: #fff;
  }
  .ai-chat-form button:disabled { opacity: 0.5; cursor: default; }
  .ai-chips { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 2rem; }
  .ai-chip {
    font-size: 0.82rem; padding: 0.25rem 0.7rem; cursor: pointer;
    border: 1px solid var(--global-divider-color); border-radius: 999px;
    background: none; color: var(--global-text-color-light);
  }
  .ai-chip:hover { border-color: var(--global-theme-color); color: var(--global-theme-color); }
  .ai-config {
    position: relative; background: var(--global-code-bg-color);
    border-radius: 8px; padding: 0.75rem 1rem; margin: 0.5rem 0 1rem;
    font-family: monospace; font-size: 0.8rem; overflow-x: auto; white-space: pre;
  }
  .ai-copy-btn { position: absolute; top: 0.5rem; right: 0.5rem; padding: 0.2rem 0.6rem; font-size: 0.75rem; }
  .ai-grounded { font-size: 0.85rem; color: var(--global-text-color-light); margin-bottom: 0.75rem; }
</style>

Ask about my experience, projects, skills, or availability. Answers are grounded **only in my resume data** — the assistant is instructed not to embellish and to say "I don't know" when the data doesn't cover it.

<div class="ai-grounded">💡 Powered by a serverless agent grounded in <a href="{{ '/assets/json/public-profile.json' | relative_url }}">my public profile</a> — the same data behind the MCP server below.</div>

<div class="ai-chat-card">
  <div class="ai-chat-log" id="ai-log">
    <div class="ai-msg bot">Hi! I can answer questions about Abhishek — his experience at Intuit and Wells Fargo, his ML research, projects, or what roles he's looking for. What would you like to know?</div>
  </div>
  <form class="ai-chat-form" id="ai-form">
    <input type="text" id="ai-input" placeholder="e.g. Does he have experience with data pipelines?" maxlength="500" autocomplete="off" />
    <button type="submit" id="ai-send">Send</button>
  </form>
</div>

<div class="ai-chips" id="ai-chips">
  <button class="ai-chip">What ML research has he done?</button>
  <button class="ai-chip">Tell me about his work at Wells Fargo</button>
  <button class="ai-chip">What is he doing at Intuit?</button>
  <button class="ai-chip">Is he open to Summer 2027 roles?</button>
  <button class="ai-chip">What systems projects has he built?</button>
</div>

---

## 🔌 Prefer your own AI? Add me as an MCP server

If you use **Claude Desktop**, **Cursor**, or **VS Code**, you can plug my profile directly into your assistant via the [Model Context Protocol](https://modelcontextprotocol.io). Your AI gets tools like `get_experience`, `get_projects`, and `get_availability_and_contact` — and answers about me from my actual data instead of guessing.

**Claude Desktop** — add to `claude_desktop_config.json`:

<div class="ai-config" id="cfg-claude">{
  "mcpServers": {
    "abhishek": {
      "command": "npx",
      "args": ["mcp-remote", "https://abhishek-portfolio-agent.abhi25072002.workers.dev/mcp"]
    }
  }
}<button class="ai-copy-btn" data-target="cfg-claude">copy</button></div>

**Cursor / VS Code** — add to `.cursor/mcp.json` or `.vscode/mcp.json`:

<div class="ai-config" id="cfg-cursor">{
  "mcpServers": {
    "abhishek": { "url": "https://abhishek-portfolio-agent.abhi25072002.workers.dev/mcp" }
  }
}<button class="ai-copy-btn" data-target="cfg-cursor">copy</button></div>

Then ask your assistant things like *"Does Abhishek have Spring Boot experience?"* or *"Summarize his ML publications."*

**For AI crawlers:** this site also serves [`llms.txt`]({{ '/llms.txt' | relative_url }}) and a machine-readable [`public-profile.json`]({{ '/assets/json/public-profile.json' | relative_url }}).

**Under the hood:** a single dependency-free Cloudflare Worker serves both the chat API and the MCP server ([source on GitHub](https://github.com/abhi25072002/abhi25072002.github.io/tree/main/worker)), grounded in an allowlisted profile so private data never reaches the AI layer.

<script>
  const WORKER_URL = "https://abhishek-portfolio-agent.abhi25072002.workers.dev";
  const log = document.getElementById("ai-log");
  const form = document.getElementById("ai-form");
  const input = document.getElementById("ai-input");
  const send = document.getElementById("ai-send");
  const history = [];

  function add(role, text) {
    const div = document.createElement("div");
    div.className = "ai-msg " + role;
    div.textContent = text;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
    return div;
  }

  async function ask(question) {
    add("user", question);
    history.push({ role: "user", content: question });
    input.value = "";
    send.disabled = true;
    const thinking = add("notice", "Thinking…");
    try {
      const res = await fetch(WORKER_URL + "/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      thinking.remove();
      if (!res.ok) throw new Error("bad status " + res.status);
      const data = await res.json();
      add("bot", data.reply);
      history.push({ role: "assistant", content: data.reply });
    } catch (e) {
      thinking.remove();
      add("notice", "The chat backend isn't reachable right now. You can still browse my CV and projects, or email ajd6@gatech.edu.");
    } finally {
      send.disabled = false;
      input.focus();
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = input.value.trim();
    if (q) ask(q);
  });

  document.getElementById("ai-chips").addEventListener("click", (e) => {
    if (e.target.classList.contains("ai-chip")) ask(e.target.textContent);
  });

  document.querySelectorAll(".ai-copy-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const el = document.getElementById(btn.dataset.target).cloneNode(true);
      el.querySelector(".ai-copy-btn").remove();
      navigator.clipboard.writeText(el.textContent.trim());
      btn.textContent = "copied!";
      setTimeout(() => (btn.textContent = "copy"), 1500);
    });
  });
</script>
