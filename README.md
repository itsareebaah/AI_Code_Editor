# AI Code Editor

## Overview

**AI Code Editor** is a modern, web-based code editing platform enhanced with AI-powered capabilities. It enables developers to write, analyze, and optimize **HTML, CSS, and JavaScript** code efficiently through intelligent automation.

The application integrates with the **Google Gemini API** via serverless functions, ensuring secure and scalable AI interactions. It is fully deployed on **Netlify**.

---

## Key Features

* **Code Explanation**
  Generate clear, step-by-step explanations for selected code snippets.

* **Code Improvement / Refactoring**
  Receive optimized, cleaner, and more maintainable code suggestions based on best practices.

* **Prompt-Based Code Generation**
  Create code snippets or components using natural language prompts.

* **Theme Toggle (Dark / Light)**
  Switch between themes for an improved developer experience.

* **Session Management**
  Save and reload code sessions locally for continued work.

* **Quota / Tier Control**
  Built-in request limits supporting Free and Pro usage models.

* **Live Deployment**
  Fully functional production deployment using Netlify.

---

## Architecture

### Frontend

* Built with **HTML, CSS, and JavaScript**
* Interactive UI for:

  * Code editing
  * AI actions (Explain, Improve, Generate)
  * Theme switching
  * Session management

### Backend (Serverless)

* Implemented using **Netlify Functions**
* File: `netlify/functions/ai-proxy.js`
* Acts as a secure proxy to the **Google Gemini API**
* Prevents exposure of API keys in client-side code

### Environment Variables

* API keys are securely stored in Netlify environment settings:

  ```
  GEMINI_API_KEY=your-google-gemini-key
  ```

---

## Getting Started

### Prerequisites

* **Node.js & npm** (for local development)
* **Netlify account**
* **Google Gemini API Key**

---

### Installation

```bash
# Clone the repository
git clone https://github.com/itsareebaah/AiCodeEditor.git

# Navigate into the project
cd AiCodeEditor

# (Optional) Install Netlify CLI
npm install -g netlify-cli

# Run locally with serverless functions
netlify dev
```

---

## Deployment

1. Push your code to GitHub.
2. Connect your repository to Netlify.
3. Configure build settings:

   * **Build Command:** *(leave empty for static site)*
   * **Publish Directory:** `/`
4. Add environment variable:

   ```
   GEMINI_API_KEY=your-google-gemini-key
   ```
5. Deploy to production.

---

## Project Structure

```
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
```

---

## Customization & Future Improvements

* Integrate advanced editors like **Monaco Editor** or **CodeMirror** for syntax highlighting and IntelliSense.
* Enhance AI prompts for domain-specific improvements (performance, accessibility, security).
* Add authentication and cloud storage (e.g., Firebase, Supabase) for cross-device session syncing.
* Implement collaboration features for real-time code sharing.

---

## License

This project is open-source and available under the MIT License.

---

## Author

Developed by **Areeba Ahmad**

---



