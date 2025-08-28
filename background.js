// background.js

// Open options page if API key is not set
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(["geminiApiKey"], (result) => {
    if (!result.geminiApiKey) {
      chrome.tabs.create({ url: "options.html" });
    }
  });
});

// Handle solution generation requests
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GENERATE_SOLUTION") {
    chrome.storage.sync.get(["geminiApiKey"], (result) => {
      const apiKey = result.geminiApiKey;
      if (!apiKey) {
        sendResponse({ error: "API key not set" });
        return true;
      }

      generateSolution(apiKey, request, sendResponse);
    });
    return true; // Required for async response
  }
});

function generateSolution(apiKey, request, sendResponse) {
  const { title, description, language } = request;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

  const prompt = `You are an expert programming assistant. Solve the following LeetCode problem in ${language} and return ONLY the code without any explanations or additional text.

Problem Title: ${title}
Problem Description:
${description}

Requirements:
1. Use the exact function signature required by LeetCode
2. Include proper class structure for the solution
3. Use optimal algorithms and time complexity
4. Add comments only when necessary for clarity
5. Format the code for direct use in LeetCode's editor

Example for C++:
\`\`\`
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Your solution here
    }
};
\`\`\`

Now provide the solution for ${language}:`;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        const solution = data.candidates[0].content.parts[0].text;
        sendResponse({ solution });
      } else {
        sendResponse({ error: "No solution generated", details: data });
      }
    })
    .catch(error => {
      sendResponse({ error: error.message });
    });
}