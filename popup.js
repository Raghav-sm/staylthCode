// popup.js

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");
  const hideTestCases = document.getElementById("hideTestCases");
  const generateBtn = document.getElementById("generateBtn");
  const settingsBtn = document.getElementById("settingsBtn");
  const apiStatus = document.getElementById("apiStatus");

  // Load saved theme
  chrome.storage.sync.get(["theme"], (result) => {
    if (result.theme === "dark") {
      body.classList.add("dark");
      themeToggle.textContent = "☀️";
    }
  });

  // Check API key
  chrome.storage.sync.get(["geminiApiKey"], (result) => {
    if (result.geminiApiKey) {
      apiStatus.classList.add("valid");
      apiStatus.querySelector("span").textContent = "API Key: Valid";
    }
  });

  // Theme toggle
  themeToggle.addEventListener("click", () => {
    const isDark = body.classList.toggle("dark");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    chrome.storage.sync.set({ theme: isDark ? "dark" : "light" });
  });

  // Toggle test cases
  hideTestCases.addEventListener("change", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: "TOGGLE_TEST_CASES",
        hide: hideTestCases.checked
      });
    });
  });

  // Generate solutions
  generateBtn.addEventListener("click", () => {
    const language = document.getElementById("solutionLanguage").value;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: "GENERATE_SOLUTIONS",
        language
      });
    });
  });

  // Open settings
  settingsBtn.addEventListener("click", () => {
    chrome.runtime.openOptionsPage();
  });

  // Sync toggle state with page
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0].url.includes("leetcode.com/problems/")) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { type: "GET_TEST_CASES_STATE" },
        (response) => {
          if (response && response.hidden !== undefined) {
            hideTestCases.checked = response.hidden;
          }
        }
      );
    }
  });
});
