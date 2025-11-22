# Quick Start Guide - Fix CORS Error

## The Problem
When you open `index.html` directly in your browser (double-clicking it), it uses the `file://` protocol, which causes CORS errors when trying to fetch from Google Sheets.

## The Solution
Run a local web server instead. Choose one of these methods:

### Option 1: Python (Easiest - Works on Windows, Mac, Linux)

**If you have Python installed:**

1. Open a terminal/command prompt in your project folder
2. Run:
   ```bash
   python -m http.server 8000
   ```
   (On Mac/Linux, you might need: `python3 -m http.server 8000`)

3. Open your browser and go to: **http://localhost:8000/index.html**

4. Press `Ctrl+C` to stop the server when done

**Or use the batch file:**
- **Windows**: Double-click `start-server.bat`
- **Mac/Linux**: Run `bash start-server.sh`

### Option 2: Node.js

**If you have Node.js installed:**

1. Open a terminal/command prompt in your project folder
2. Run:
   ```bash
   node start-server.js
   ```
   Or:
   ```bash
   npm run serve
   ```

3. Open your browser and go to: **http://localhost:8000/index.html**

4. Press `Ctrl+C` to stop the server when done

### Option 3: VS Code Live Server (If you use VS Code)

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. It will automatically open in your browser

### Option 4: Any Other Web Server

You can use any web server (Apache, Nginx, etc.) - just make sure it serves files from your project folder.

## Why This Works

When you open a file directly (`file://`), browsers apply strict CORS policies. When you use a web server (`http://localhost`), browsers allow the requests to Google Sheets.

## After Starting the Server

1. ✅ Make sure your Google Sheet is public (Share → Anyone with link can view)
2. ✅ Open http://localhost:8000/index.html in your browser
3. ✅ Check the browser console (F12) - you should see data loading successfully
4. ✅ The dashboard will auto-refresh every 60 seconds

## Troubleshooting

**"Port 8000 is already in use"**
- Use a different port: `python -m http.server 8080` (then go to http://localhost:8080/index.html)

**"Python not found"**
- Install Python from https://python.org
- Or use Node.js option instead

**Still getting CORS errors**
- Make sure you're accessing via `http://localhost:8000/index.html` (not `file://`)
- Make sure your Google Sheet is shared publicly
- Check the browser console for specific error messages


