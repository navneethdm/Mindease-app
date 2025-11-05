// File: netlify/functions/get-firebase-config.js
exports.handler = async function () {
  try {
    const config = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
    };

    if (!config.apiKey || !config.authDomain || !config.projectId) {
      throw new Error('Firebase environment variables are not set.');
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    };
  } catch (error) {
    console.error('Error fetching Firebase config:', error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
