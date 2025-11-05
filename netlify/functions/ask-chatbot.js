<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>MindEase - Your Mental Wellness Companion</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.7.77/Tone.min.js"></script>
  <style>
    body{font-family:'Inter',sans-serif;background:#f0f4f8}
    .nav-item.active{background:#3b82f6;color:#fff}
    .main-content>div{display:none}
    .main-content>div.active{display:block}
    .chat-bubble{max-width:80%;padding:12px 16px;border-radius:20px;word-wrap:break-word}
    .chat-bubble-user{background:#3b82f6;color:#fff;align-self:flex-end;border-bottom-right-radius:4px}
    .chat-bubble-ai{background:#e5e7eb;color:#1f2937;align-self:flex-start;border-bottom-left-radius:4px}
    .goal-progress{transition:width .3s ease-in-out}
    #chat-input:disabled{background:#e5e7eb;cursor:not-allowed}
  </style>
</head>
<body class="antialiased text-gray-800">

  <!-- Fallback banner shown only if loaded as file:// -->
  <div id="script-error-message" class="fixed inset-0 bg-red-900 bg-opacity-95 text-white p-8 z-50 flex items-center justify-center text-center" style="display:none">
    <div>
      <h2 class="text-3xl font-bold mb-4">MindEase App Did Not Start Correctly</h2>
      <p class="text-lg">This often happens if you open the HTML file directly (a <code class="bg-black/50 px-1 rounded-sm">file:///</code> address). Serve it via a simple web server.</p>
      <div class="mt-6 p-4 bg-gray-800 rounded-lg text-left max-w-2xl mx-auto">
        <h3 class="font-semibold text-xl mb-2">Quick local serve:</h3>
        <ol class="list-decimal list-inside mt-2 space-y-2">
          <li>Open a terminal in this folder.</li>
          <li><code class="block bg-black/50 p-2 rounded mt-1 text-green-300">python -m http.server</code></li>
          <li>Visit: <a href="http://localhost:8000/index.html" class="underline text-blue-300" target="_blank">http://localhost:8000/index.html</a></li>
        </ol>
      </div>
    </div>
  </div>

  <div id="app-container" class="max-w-4xl mx-auto min-h-screen bg-white shadow-lg flex flex-col md:flex-row" style="display:none">
    <aside class="w-full md:w-1/5 bg-blue-500 text-white p-4 flex flex-row md:flex-col justify-around md:justify-start">
      <h1 class="text-2xl font-bold mb-0 md:mb-8 text-center md:text-left">MindEase</h1>
      <nav class="flex flex-row md:flex-col gap-2">
        <button data-target="home" class="nav-item w-full text-left p-3 rounded-lg font-medium transition hover:bg-blue-600 active">Home</button>
        <button data-target="journal" class="nav-item w-full text-left p-3 rounded-lg font-medium transition hover:bg-blue-600">Journal</button>
        <button data-target="meditate" class="nav-item w-full text-left p-3 rounded-lg font-medium transition hover:bg-blue-600">Meditate</button>
        <button data-target="chat" class="nav-item w-full text-left p-3 rounded-lg font-medium transition hover:bg-blue-600">Chatbot</button>
        <button data-target="goals" class="nav-item w-full text-left p-3 rounded-lg font-medium transition hover:bg-blue-600">Goals</button>
        <button data-target="resources" class="nav-item w-full text-left p-3 rounded-lg font-medium transition hover:bg-blue-600">Resources</button>
        <button data-target="settings" class="nav-item w-full text-left p-3 rounded-lg font-medium transition hover:bg-blue-600">Settings</button>
      </nav>
      <div id="auth-status" class="mt-auto text-center text-xs p-2">Connecting...</div>
    </aside>

    <main class="flex-1 p-6 md:p-8 bg-gray-50 overflow-y-auto">
      <div class="main-content">
        <div id="home" class="active">
          <h2 class="text-3xl font-bold text-gray-800 mb-4">Welcome to MindEase</h2>
          <p class="text-lg text-gray-600 mb-6">Your personal space for mental clarity and peace.</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-blue-100 border border-blue-200 p-6 rounded-xl">
              <h3 class="text-xl font-semibold mb-2 text-blue-800">Reflect on Your Day</h3>
              <p class="text-blue-700">Use the journal to write down your thoughts.</p>
            </div>
            <div class="bg-green-100 border border-green-200 p-6 rounded-xl">
              <h3 class="text-xl font-semibold mb-2 text-green-800">Find Your Calm</h3>
              <p class="text-green-700">Guided breathing to reduce stress.</p>
            </div>
            <div class="bg-purple-100 border border-purple-200 p-6 rounded-xl">
              <h3 class="text-xl font-semibold mb-2 text-purple-800">AI Companion</h3>
              <p class="text-purple-700">Supportive conversations & coping strategies.</p>
            </div>
            <div class="bg-yellow-100 border border-yellow-200 p-6 rounded-xl">
              <h3 class="text-xl font-semibold mb-2 text-yellow-800">Set Wellness Goals</h3>
              <p class="text-yellow-700">Track small, achievable habits.</p>
            </div>
          </div>
        </div>

        <div id="journal">
          <h2 class="text-3xl font-bold mb-6">My Journal</h2>
          <div class="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 class="text-xl font-semibold mb-4">How are you feeling today?</h3>
            <div class="flex items-center space-x-4 mb-4">
              <label for="mood-select">Mood:</label>
              <select id="mood-select" class="p-2 border rounded-md">
                <option>😊 Happy</option><option>🙂 Content</option><option>😐 Neutral</option>
                <option>😔 Sad</option><option>😠 Angry</option><option>😰 Anxious</option>
              </select>
            </div>
            <textarea id="journal-entry" class="w-full p-3 border rounded-md" rows="5" placeholder="Write about your day..."></textarea>
            <button id="save-journal-entry" class="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition">Save Entry</button>
          </div>
          <div id="journal-history">
            <h3 class="text-2xl font-bold mb-4">Past Entries</h3>
            <div id="journal-list" class="space-y-4"></div>
          </div>
        </div>

        <div id="meditate">
          <h2 class="text-3xl font-bold mb-6">Guided Meditation & Breathing</h2>
          <div id="meditation-player" class="hidden bg-white p-6 rounded-lg shadow-md mb-6 text-center">
            <h3 id="player-title" class="text-2xl font-semibold mb-4"></h3>
            <p id="player-description" class="text-gray-600 mb-6"></p>
            <div id="breathing-circle" class="w-40 h-40 bg-blue-300 rounded-full mx-auto my-4 flex items-center justify-center transition-transform duration-3000 ease-in-out">
              <span id="breathing-text" class="text-xl font-medium text-white"></span>
            </div>
            <button id="stop-meditation" class="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition">Stop</button>
          </div>
          <div id="meditation-list" class="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
        </div>

        <div id="chat" class="flex flex-col h-[calc(100vh-120px)]">
          <h2 class="text-3xl font-bold mb-4">AI Wellness Companion</h2>
          <div id="chat-window" class="flex-1 bg-gray-100 p-4 rounded-lg overflow-y-auto mb-4 flex flex-col gap-4"></div>
          <div id="chat-input-container" class="flex">
            <input type="text" id="chat-input" class="flex-1 p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Type your message...">
            <button id="chat-send" class="bg-blue-500 text-white px-6 py-2 rounded-r-lg font-semibold hover:bg-blue-600 transition">Send</button>
          </div>
        </div>

        <div id="goals">
          <h2 class="text-3xl font-bold mb-6">My Wellness Goals</h2>
          <div class="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 class="text-xl font-semibold mb-4">Add a New Goal</h3>
            <div class="flex flex-col sm:flex-row gap-4">
              <input type="text" id="goal-input" class="flex-1 p-3 border rounded-lg" placeholder="e.g., Meditate for 5 minutes">
              <input type="number" id="goal-target" class="p-3 border rounded-lg w-full sm:w-32" placeholder="Target (days)">
              <button id="add-goal" class="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition">Add Goal</button>
            </div>
          </div>
          <div id="goal-list" class="space-y-4"></div>
        </div>

        <div id="resources">
          <h2 class="text-3xl font-bold mb-6">Helpful Resources</h2>
          <div class="space-y-6">
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-xl font-semibold mb-2">Understanding Anxiety</h3>
              <p class="text-gray-600 mb-4">Learn about symptoms, causes, and
