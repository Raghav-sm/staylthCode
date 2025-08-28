# StaylthCode  | LeetCode Helper

StaylthCode is a lightweight Chrome extension built for **LeetCode enthusiasts**.  
It helps you **generate AI-powered solutions** (via Gemini API) and also **hides test cases** so you can focus on problem-solving helping you sharpen your coding skills instead of spoilers. 


## 📌Features
- 🤖 **Gemini-Powered Solutions** – Instantly generate solutions to LeetCode problems.  
- 🙈 **Hide Test Cases** – Keep your focus on logic, not spoilers.  
- ⚡ Runs seamlessly inside Chrome.  
- 🔑 Secure setup with your own Gemini API key.  

---

## 🛠️Installation
1. Clone this repository:
   ```
   git clone https://github.com/yourusername/staylthcode.git
    ```

2. Open Chrome and go to:

   ```bash
   chrome://extensions/
   ```
3. Enable **Developer Mode** (top right corner).
4. Click **Load unpacked** and select the project folder.
5. The extension will appear in your Chrome toolbar. 🎉


## 📂 Project Structure

```
staylthcode/
├── manifest.json
└── (where content.js should have been 👀)
```

---

## ⚙️Usage

1. After installing, go to the **Extension Options** page.
2. Add your **Gemini API Key**this is required for generating solutions.
3. Navigate to **LeetCode**.
4. StaylthCode will:

   * Hide test cases by choice via a toggle.
   * Provide AI-generated solutions when requested with multilanguage suppport.
---

## Manifest Overview

The `manifest.json` defines the extension’s core functionality:

* Declares permissions for modifying LeetCode pages.
* Loads background/option scripts.
* Handles Gemini API integration securely.


## But wait...

You may have noticed something unusual: **there’s no `content.js` in this repo,** that’s right. It's missing.

Not because of a bug, not because of GitHub mischief but because I decided to keep it classified.

If you *really* want the `content.js`, there’s only one way,
 **Send me an email and I'll send it to you.**

Yes, this is a pseudo open-source project that’s technically incomplete *need to fix some bugs and add few more features*.
Welcome to StaylthCode <3.
