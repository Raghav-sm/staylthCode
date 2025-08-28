// options.js
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");

  // Load theme
  chrome.storage.sync.get(["theme"], (result) => {
    if (result.theme === "dark") {
      body.classList.add("dark");
      themeToggle.textContent = "☀️";
    }
  });

  themeToggle.addEventListener("click", () => {
    const isDark = body.classList.toggle("dark");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    chrome.storage.sync.set({ theme: isDark ? "dark" : "light" });
  });

  // Load API key
  chrome.storage.sync.get(["geminiApiKey"], (result) => {
    if (result.geminiApiKey) {
      document.getElementById("api-key").value = result.geminiApiKey;
    }
  });

  // Save API key
  document.getElementById("save-button").addEventListener("click", () => {
    const apiKey = document.getElementById("api-key").value.trim();
    if (apiKey) {
      chrome.storage.sync.set({ geminiApiKey: apiKey }, () => {
        const successMsg = document.getElementById("success-message");
        successMsg.style.display = "block";
        setTimeout(() => window.close(), 1500);
      });
    }
  });
});
