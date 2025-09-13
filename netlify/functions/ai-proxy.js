// netlify/functions/ai-proxy.js
import fetch from "node-fetch";

export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const body = JSON.parse(event.body);
    const { action, language, code, prompt } = body;

    // --- Gemini API Call ---
    const apiKey = process.env.GEMINI_API_KEY;
    const fullPrompt =
      action === "explain"
        ? `Explain this ${language} code:\n${code}`
        : action === "improve"
        ? `Improve this ${language} code:\n${code}`
        : prompt || "Generate a simple example";

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
        apiKey,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }],
        }),
      }
    );

    const data = await response.json();
    if (data.candidates && data.candidates.length > 0) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          text: data.candidates[0].content.parts[0].text,
        }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          error: "No response from Gemini",
        }),
      };
    }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ success: false, error: err.message }) };
  }
}
