// File: netlify/functions/ask-chatbot.js

exports.handler = async function (event) {
  try {
    // Parse incoming request
    const { contents } = JSON.parse(event.body || "{}");

    if (!contents || !Array.isArray(contents) || contents.length === 0) {
      return {
        statusCode: 400,
        body: "Invalid request: 'contents' array is required.",
      };
    }

    // Secure server-side Gemini API key
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
      return {
        statusCode: 500,
        body: "Server Error: GEMINI_API_KEY is not set in Netlify environment.",
      };
    }

    // Gemini endpoint
    const apiUrl =
      `https://generativelanguage.googleapis.com/v1beta/models/` +
      `gemini-2.5-flash-preview-05-20:generateContent?key=${geminiApiKey}`;

    // Call Gemini API
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents }),
    });

    if (!response.ok) {
      return {
        statusCode: 500,
        body: `Gemini API Error: ${await response.text()}`,
      };
    }

    // Return model response to browser
    const result = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: `Server Error: ${err}`,
    };
  }
};
