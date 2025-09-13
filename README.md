# AI Code Editor

[Live Demo](https://codeeditorai.netlify.app/) • [GitHub Repo](https://github.com/itsareebaah/AiCodeEditor.git)

---

## 🚀 Project Overview

AI Code Editor is a modern, web-based code editing tool powered by AI.  
It supports HTML, CSS, and JavaScript editing with built-in AI features for explaining, improving, and generating code. Developed using HTML, CSS, JavaScript, and deployed on Netlify with a serverless function integrating Google Gemini API.

---

## 🔍 Key Features

- ✅ **Explain Code** – Get detailed step-by-step explanation of your code  
- ✅ **Improve / Refactor Code** – Suggest enhancements, optimizations, and best practices  
- ✅ **Generate from Prompt** – Produce code snippets or components based on a custom prompt  
- 🎨 **Dark / Light Theme Toggle** – Switch between themes for better UX  
- 💾 **Session Saving & Loading** – Save your current code sessions locally and load them later  
- 🔒 **Quota / Tier Control** – Free vs Pro mode with request limits to manage usage  
- 🌐 **Live Demo & Deployment** – Fully functional live version hosted via Netlify  

---

## 🏗️ How It Works

1. **Frontend**: HTML/CSS/JS app with UI for code editor, buttons for AI actions (Explain, Improve, Generate), theme toggle, and session management.  
2. **Serverless Function**: Hosted via Netlify Functions (`netlify/functions/ai-proxy.js`) which acts as a proxy to Google Gemini API, keeping API key secure.  
3. **Environment Variables**: API key is stored in Netlify’s environment variables so it’s never visible in client-side code.

---

## 📦 Getting Started

### Prerequisites

- Node.js & npm (to test locally if using functions)  
- Netlify account (for deployment and environment variable setup)  
- Google Gemini API key (if you want real AI responses instead of mock)

### Local Setup

```bash
# Clone the repo
git clone https://github.com/itsareebaah/AiCodeEditor.git

cd AiCodeEditor

# (Optional) Install Netlify CLI if you want to test serverless functions locally
npm install -g netlify-cli

# Start development server with function support
netlify dev
Deployment Instructions
Push your updated code to GitHub.

In Netlify, connect to your GitHub repo and set build settings:

Build command: (none / blank) if static

Publish directory: / (root)

Add environment variable:

GEMINI_API_KEY = your-google-gemini-key

Deploy to production.

**##Folder Structure**

AiCodeEditor/
│
├── index.html
├── styles.css
├── app.js
├── README.md
│
└── netlify/
    └── functions/
        └── ai-proxy.js

💡 Tips & Customization

You can swap out the code editor UI (currently a <textarea>) for something richer like Monaco Editor or CodeMirror for syntax highlighting and autocompletion.

Improve prompts: refine what “Explain” / “Improve” ask Gemini, tune for your use-case (front-end, performance, accessibility etc.).

Add user authentication / cloud session storage (Firebase / Supabase) if you want sessions synced across devices.