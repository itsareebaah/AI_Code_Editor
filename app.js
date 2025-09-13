/* ========================================
   app.js — Full AI Code Editor Script
   ======================================== */

// === CONFIG ===
const GEMINI_API_KEY = ""; 
const GEMINI_MODEL = "gemini-1.5-flash"; 
const FREE_LIMIT = 10;
// ==============

// DOM Elements
const editor = document.getElementById('editor');
const resultBox = document.getElementById('resultBox');
const promptInput = document.getElementById('promptInput');
const tierSelect = document.getElementById('tierSelect');
const themeToggle = document.getElementById('themeToggle');
const sessionList = document.getElementById('sessionList');

let callsLeft = FREE_LIMIT;
let currentTheme = "dark"; 

/* ======================
   THEME TOGGLE HANDLER
====================== */
function applyTheme(theme) {
  if (theme === "light") {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    themeToggle.textContent = "☀️ Light";
    currentTheme = "light";
  } else {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
    themeToggle.textContent = "🌙 Dark";
    currentTheme = "dark";
  }
  localStorage.setItem("theme", currentTheme);
}

themeToggle.addEventListener('click', () => {
  applyTheme(currentTheme === "dark" ? "light" : "dark");
});

// Load theme & sessions on startup
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "dark";
  applyTheme(savedTheme);
  loadSessions();
});

/* ======================
   MAIN AI HANDLER
====================== */
async function askAI(type) {
  const code = editor.value.trim();
  const prompt = promptInput.value.trim();

  if (!consumeCall()) {
    return showResult(`<span class="text-danger">⚠️ Free quota reached. Upgrade to Pro or use your own API key.</span>`);
  }

  showResult(`<em>⏳ Thinking...</em>`);

  if (!GEMINI_API_KEY) {
    // Fallback to mock AI
    setTimeout(() => {
      if (type === "Explain") {
        showResult(`<strong>Explanation:</strong><br>This code works by doing X.<br><br><b>Line-by-line:</b><br>- Step 1: ...<br>- Step 2: ...`);
      } 
      else if (type === "Improve") {
        showResult(`<strong>Improved Code:</strong><pre><code>${code || "/* Your improved code will appear here */"}</code></pre>
        <p><b>Suggestions:</b> Use semantic tags, reduce inline styles, and improve performance.</p>`);
      } 
      else if (type === "Generate") {
        showResult(`<strong>Generated Code:</strong><pre><code>&lt;section class="hero"&gt;Generated Hero Section&lt;/section&gt;</code></pre>`);
      } 
      else {
        showResult(`<strong>AI Response:</strong><br>${prompt || "No prompt provided."}`);
      }
    }, 900);
    return;
  }

  try {
    const finalPrompt = buildPrompt(type, code, prompt);
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: finalPrompt }] }]
      })
    });

    const data = await response.json();
    if (data.candidates && data.candidates[0].content.parts[0].text) {
      showResult(`<strong>${type} Result:</strong><pre><code>${escapeHtml(data.candidates[0].content.parts[0].text)}</code></pre>`);
    } else {
      showResult(`<span class="text-danger">❌ AI did not return a valid response.</span>`);
    }
  } catch (err) {
    console.error(err);
    showResult(`<span class="text-danger">⚠️ Error contacting AI API.</span>`);
  }
}

function buildPrompt(type, code, prompt) {
  if (type === "Explain") {
    return `Explain this code in detail:\n\n${code}`;
  }
  if (type === "Improve") {
    return `Improve and optimize this code, explain improvements:\n\n${code}`;
  }
  if (type === "Generate") {
    return `Generate a fresh piece of HTML/CSS/JS code for: ${prompt || "a sample UI component"}`;
  }
  return prompt;
}

function showResult(html) {
  resultBox.innerHTML = html;
}

/* ======================
   SESSION MANAGEMENT
====================== */
document.getElementById('saveSessionBtn').addEventListener('click', () => {
  const code = editor.value.trim();
  if (!code) return toast("⚠️ Editor is empty!");
  const sessions = JSON.parse(localStorage.getItem('sessions') || "[]");
  sessions.push({ code, time: new Date().toLocaleString() });
  localStorage.setItem('sessions', JSON.stringify(sessions));
  toast("💾 Session Saved!");
  loadSessions();
});

document.getElementById('clearEditorBtn').addEventListener('click', () => {
  editor.value = "";
  toast("🗑 Editor Cleared!");
});

function loadSessions() {
  sessionList.innerHTML = "";
  const sessions = JSON.parse(localStorage.getItem('sessions') || "[]");

  if (sessions.length === 0) {
    sessionList.innerHTML = `<li class="list-group-item text-muted">No saved sessions yet</li>`;
    return;
  }

  sessions.forEach((s) => {
    const li = document.createElement('li');
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `<span>${s.time}</span>
      <button class="btn btn-sm btn-outline-primary">Load</button>`;
    li.querySelector('button').addEventListener('click', () => {
      editor.value = s.code;
      toast("✅ Session Loaded!");
    });
    sessionList.appendChild(li);
  });
}

/* ======================
   AI BUTTON HANDLERS
====================== */
document.getElementById('explainBtn').addEventListener('click', () => askAI('Explain'));
document.getElementById('improveBtn').addEventListener('click', () => askAI('Improve'));
document.getElementById('generateBtn').addEventListener('click', () => askAI('Generate'));
document.getElementById('sendPromptBtn').addEventListener('click', () => askAI('Prompt'));

/* ======================
   UTILITIES
====================== */
function toast(message) {
  const el = document.createElement('div');
  el.className = "toast-message";
  el.textContent = message;
  el.style.position = "fixed";
  el.style.bottom = "20px";
  el.style.right = "20px";
  el.style.background = "#222";
  el.style.color = "#fff";
  el.style.padding = "10px 15px";
  el.style.borderRadius = "8px";
  el.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
  el.style.zIndex = "9999";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1800);
}

function escapeHtml(str) {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* ======================
   TIER & QUOTA
====================== */
tierSelect.addEventListener('change', () => {
  callsLeft = tierSelect.value === "free" ? FREE_LIMIT : 9999;
  toast(`🔄 Switched to ${tierSelect.value.toUpperCase()} tier`);
});

function consumeCall() {
  if (tierSelect.value === "pro") return true;
  if (callsLeft > 0) {
    callsLeft--;
    return true;
  }
  return false;
}
