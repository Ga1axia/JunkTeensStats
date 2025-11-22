# OneDrive Excel Integration Setup Guide

This guide explains how to connect your OneDrive Excel file to the JunkTeens Stats Dashboard, bypassing CORS restrictions.

## The Problem

OneDrive blocks direct browser access to Excel files due to CORS (Cross-Origin Resource Sharing) security restrictions. This is a browser security feature that prevents websites from accessing files from other domains.

## The Solution: CORS Proxy Server

We'll use a simple proxy server that runs on your computer to fetch the Excel file from OneDrive and serve it to your dashboard. The proxy server bypasses CORS restrictions because server-to-server requests aren't subject to CORS.

## Setup Instructions

### Step 1: Install Node.js (if not already installed)

1. Download Node.js from https://nodejs.org/
2. Install it (this will also install npm, the package manager)
3. Verify installation by opening a terminal/command prompt and running:
   ```bash
   node --version
   npm --version
   ```

### Step 2: Install Proxy Server Dependencies

1. Open a terminal/command prompt in your project folder
2. Run:
   ```bash
   npm install
   ```
   This will install the required packages (express and cors).

### Step 3: Start the Proxy Server

1. In the terminal, run:
   ```bash
   node proxy-server.js
   ```
   Or:
   ```bash
   npm start
   ```

2. You should see:
   ```
   ✅ CORS Proxy Server is running on http://localhost:3000
   ```

3. **Keep this terminal window open** - the server needs to keep running while you use the dashboard.

### Step 4: Verify Proxy is Working

1. Open your browser and go to: `http://localhost:3000/health`
2. You should see: `{"status":"ok","message":"CORS Proxy Server is running"}`

### Step 5: Update index.html Configuration

The `index.html` file is already configured to use the proxy. Make sure the CONFIG has:

```javascript
corsProxy: 'http://localhost:3000/proxy?url=',
```

This should already be set. If not, update it.

### Step 6: Test Your Dashboard

1. Open `index.html` in your browser
2. Open the browser console (F12)
3. You should see the proxy working and data loading from your OneDrive Excel file

## Important Notes

### Keep the Proxy Server Running
- The proxy server must be running whenever you want to use the dashboard
- If you close the terminal, the proxy stops and the dashboard won't be able to fetch data

### OneDrive File Sharing
- Make sure your Excel file is shared as "Anyone with the link can view"
- The file must be accessible via the OneDrive link you provided

### Sheet Name
- Make sure your Excel file has a sheet named "Truck 1 Revenue" (or update CONFIG.sheetName)

### Cell Mapping
- Update the cell references in CONFIG.cellMapping to match your Excel file structure
- Currently set to J337 for Truck 1 Daily Revenue - update other cells as needed

## Troubleshooting

### "Cannot connect to proxy server"
- Make sure the proxy server is running (Step 3)
- Check that nothing else is using port 3000
- Try restarting the proxy server

### "Access denied" or "403 Forbidden"
- Check that your OneDrive file is shared as "Anyone with the link can view"
- Try getting a new share link from OneDrive

### "Sheet not found"
- Check the exact sheet name in your Excel file
- Update CONFIG.sheetName to match exactly (case-insensitive matching is enabled)

### Data not loading
- Check the browser console (F12) for error messages
- Verify the OneDrive link is correct
- Make sure the proxy server is running

## Alternative: Public CORS Proxy (Not Recommended)

If you can't run the local proxy server, you can try a public CORS proxy, but these are unreliable:

```javascript
corsProxy: 'https://api.allorigins.win/raw?url=',
```

**Warning:** Public proxies may:
- Be slow or unreliable
- Have rate limits
- Stop working without notice
- Not be suitable for production use

## Production Deployment

For production (when you host this on a web server), you have two options:

1. **Run the proxy server on your web server** - Deploy `proxy-server.js` to your server and update the corsProxy URL to point to your server
2. **Use Google Sheets instead** - Google Sheets doesn't have CORS restrictions and works better for production

## Next Steps

1. ✅ Start the proxy server
2. ✅ Verify it's working
3. ✅ Update cell mappings in CONFIG (currently only J337 is set for Truck 1)
4. ✅ Test the dashboard
5. ✅ Provide the remaining cell references for other trucks/metrics


