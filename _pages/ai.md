---
layout: page
permalink: /ai/
title: talk to my AI
description: Ask my portfolio anything, or add me to your own AI assistant via MCP.
nav: true
nav_order: 6
---

<style>
  h1.post-title {
    background: linear-gradient(90deg, #0076df, #7c3aed, #db2777);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    width: fit-content;
  }
  :root {
    --cl-paper: #faf9f5;
    --cl-border: #e8e6dc;
    --cl-user-bubble: #f0eee6;
    --cl-text: #3d3929;
    --cl-muted: #87867f;
    --cl-clay: #d97757;
    --cl-clay-dark: #c4633f;
    --cl-input-bg: #ffffff;
  }
  html[data-theme="dark"] {
    --cl-paper: #262624;
    --cl-border: #3a3835;
    --cl-user-bubble: #393937;
    --cl-text: #eceae2;
    --cl-muted: #a8a69d;
    --cl-clay: #d97757;
    --cl-clay-dark: #e08b6d;
    --cl-input-bg: #30302e;
  }
  .ai-chat-card {
    border: 1px solid var(--cl-border);
    border-radius: 16px;
    background: var(--cl-paper);
    overflow: hidden;
    margin-bottom: 0.75rem;
  }
  .ai-chat-head {
    display: flex; align-items: center; gap: 0.5rem;
    padding: 0.7rem 1.1rem; border-bottom: 1px solid var(--cl-border);
    font-size: 0.85rem; color: var(--cl-muted);
  }
  .ai-chat-head .spark { color: var(--cl-clay); font-weight: 700; font-size: 1rem; }
  .ai-chat-head .name { color: var(--cl-text); font-weight: 600; }
  .ai-chat-log {
    min-height: 240px;
    max-height: 440px;
    overflow-y: auto;
    padding: 1.1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .ai-row { display: flex; gap: 0.65rem; align-items: flex-start; }
  .ai-avatar {
    flex: 0 0 26px; width: 26px; height: 26px; border-radius: 50%;
    background: var(--cl-clay); color: #fff;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.85rem; font-weight: 700; margin-top: 2px;
    user-select: none;
  }
  .ai-msg { max-width: 85%; font-size: 0.95rem; line-height: 1.55; white-space: pre-wrap; }
  .ai-msg.bot {
    color: var(--cl-text);
    font-family: Charter, Georgia, "Times New Roman", serif;
  }
  .ai-row.user { justify-content: flex-end; }
  .ai-msg.user {
    background: var(--cl-user-bubble); color: var(--cl-text);
    padding: 0.55rem 0.9rem; border-radius: 14px;
  }
  .ai-msg.notice { align-self: center; color: var(--cl-muted); font-size: 0.85rem; }
  .ai-thinking { display: flex; gap: 0.65rem; align-items: center; color: var(--cl-muted); font-size: 0.9rem; }
  .ai-thinking .spark { color: var(--cl-clay); font-weight: 700; animation: cl-pulse 1.2s ease-in-out infinite; }
  @keyframes cl-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.85); }
  }
  .ai-chat-form { display: flex; gap: 0.5rem; padding: 0.75rem 0.9rem; border-top: 1px solid var(--cl-border); align-items: center; }
  .ai-chat-form input {
    flex: 1; padding: 0.65rem 1rem; font-size: 0.95rem;
    border: 1px solid var(--cl-border); border-radius: 12px;
    background: var(--cl-input-bg); color: var(--cl-text);
    outline: none;
  }
  .ai-chat-form input:focus { border-color: var(--cl-clay); }
  .ai-chat-form input::placeholder { color: var(--cl-muted); }
  .ai-chat-form button {
    width: 40px; height: 40px; flex: 0 0 40px; cursor: pointer;
    border: none; border-radius: 50%;
    background: var(--cl-clay); color: #fff;
    font-size: 1.1rem; line-height: 1;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.15s ease;
  }
  .ai-chat-form button:hover { background: var(--cl-clay-dark); }
  .ai-chat-form button:disabled { opacity: 0.4; cursor: default; }
  .ai-chips { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 2rem; }
  .ai-chip {
    font-size: 0.82rem; padding: 0.3rem 0.75rem; cursor: pointer;
    border: 1px solid var(--cl-border); border-radius: 999px;
    background: var(--cl-paper); color: var(--cl-muted);
  }
  .ai-chip:hover { border-color: var(--cl-clay); color: var(--cl-clay); }
  .ai-config {
    position: relative; background: var(--global-code-bg-color);
    border-radius: 8px; padding: 0.75rem 1rem; margin: 0.5rem 0 1rem;
    font-family: monospace; font-size: 0.8rem; overflow-x: auto; white-space: pre;
  }
  .ai-copy-btn { position: absolute; top: 0.5rem; right: 0.5rem; padding: 0.2rem 0.6rem; font-size: 0.75rem; }
  .ai-grounded { font-size: 0.85rem; color: var(--global-text-color-light); margin-bottom: 0.75rem; }
</style>

Ask about my experience, projects, skills, or availability. Answers are grounded **only in my resume data**: the assistant is instructed not to embellish and to say "I don't know" when the data doesn't cover it.

<div class="ai-grounded">⚡ Powered by <strong>Llama 3.3 70B on Groq</strong>, grounded in <a href="{{ '/assets/json/public-profile.json' | relative_url }}">my public profile</a>, the same data behind the MCP server below.</div>

<div class="ai-chat-card">
  <div class="ai-chat-head"><span class="spark">✳</span><span class="name">Abhishek's agent</span><span>· grounded in resume data</span></div>
  <div class="ai-chat-log" id="ai-log">
    <div class="ai-row"><div class="ai-avatar">✳</div><div class="ai-msg bot">Hi! I can answer questions about Abhishek: his experience at Intuit and Wells Fargo, his ML research, projects, or what roles he's looking for. What would you like to know?</div></div>
  </div>
  <form class="ai-chat-form" id="ai-form">
    <input type="text" id="ai-input" placeholder="Ask about my experience, projects, or skills…" maxlength="500" autocomplete="off" />
    <button type="submit" id="ai-send" aria-label="Send">↑</button>
  </form>
</div>

<div class="ai-chips" id="ai-chips">
  <button class="ai-chip">What ML research has he done?</button>
  <button class="ai-chip">Tell me about his work at Wells Fargo</button>
  <button class="ai-chip">What is he doing at Intuit?</button>
  <button class="ai-chip">Is he open to New Grad 2027 roles?</button>
  <button class="ai-chip">What systems projects has he built?</button>
</div>

---

## 🔌 Prefer your own AI? Add me as an MCP server

If you use **Claude Desktop**, **Cursor**, or **VS Code**, you can plug my profile directly into your assistant via the [Model Context Protocol](https://modelcontextprotocol.io). Your AI gets tools like `get_experience`, `get_projects`, and `get_availability_and_contact`, and answers about me from my actual data instead of guessing.

**Claude Desktop**: add to `claude_desktop_config.json`:

<div class="ai-config" id="cfg-claude">{
  "mcpServers": {
    "abhishek": {
      "command": "npx",
      "args": ["mcp-remote", "https://abhishek-portfolio-agent.abhishek-dharmadhikari.workers.dev/mcp"]
    }
  }
}<button class="ai-copy-btn" data-target="cfg-claude">copy</button></div>

**Cursor / VS Code**: add to `.cursor/mcp.json` or `.vscode/mcp.json`:

<div class="ai-config" id="cfg-cursor">{
  "mcpServers": {
    "abhishek": { "url": "https://abhishek-portfolio-agent.abhishek-dharmadhikari.workers.dev/mcp" }
  }
}<button class="ai-copy-btn" data-target="cfg-cursor">copy</button></div>

Then ask your assistant things like *"Does Abhishek have Spring Boot experience?"* or *"Summarize his ML publications."*

**For AI crawlers:** this site also serves [`llms.txt`]({{ '/llms.txt' | relative_url }}) and a machine-readable [`public-profile.json`]({{ '/assets/json/public-profile.json' | relative_url }}).

**Under the hood:** a single dependency-free Cloudflare Worker serves both the chat API and the MCP server ([source on GitHub](https://github.com/abhi25072002/abhi25072002.github.io/tree/main/worker)), grounded in an allowlisted profile so private data never reaches the AI layer.

<script>
  const WORKER_URL = "https://abhishek-portfolio-agent.abhishek-dharmadhikari.workers.dev";
  const log = document.getElementById("ai-log");
  const form = document.getElementById("ai-form");
  const input = document.getElementById("ai-input");
  const send = document.getElementById("ai-send");
  const history = [];

  function add(role, text) {
    const row = document.createElement("div");
    row.className = "ai-row " + role;
    if (role === "bot") {
      const avatar = document.createElement("div");
      avatar.className = "ai-avatar";
      avatar.textContent = "✳";
      row.appendChild(avatar);
    }
    const div = document.createElement("div");
    div.className = "ai-msg " + role;
    div.textContent = text;
    row.appendChild(div);
    log.appendChild(row);
    log.scrollTop = log.scrollHeight;
    return row;
  }

  function addThinking() {
    const row = document.createElement("div");
    row.className = "ai-thinking";
    row.innerHTML = '<span class="spark">✳</span><span>Thinking…</span>';
    log.appendChild(row);
    log.scrollTop = log.scrollHeight;
    return row;
  }

  async function ask(question) {
    add("user", question);
    history.push({ role: "user", content: question });
    input.value = "";
    send.disabled = true;
    const thinking = addThinking();
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
