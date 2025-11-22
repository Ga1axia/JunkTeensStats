/**
 * Simple CORS Proxy Server for OneDrive Excel Files
 * 
 * This server acts as a proxy to bypass CORS restrictions when accessing OneDrive files.
 * 
 * To run:
 * 1. Make sure you have Node.js installed (https://nodejs.org/)
 * 2. Install dependencies: npm install express cors
 * 3. Run: node proxy-server.js
 * 4. The server will start on http://localhost:3000
 * 5. Update index.html CONFIG to use: corsProxy: 'http://localhost:3000/proxy?url='
 */

const express = require('express');
const cors = require('cors');
const https = require('https');
const http = require('http');

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

/**
 * Proxy endpoint to fetch OneDrive files
 */
app.get('/proxy', async (req, res) => {
    const targetUrl = req.query.url;
    
    if (!targetUrl) {
        return res.status(400).json({ error: 'Missing url parameter' });
    }
    
    console.log(`Proxying request to: ${targetUrl}`);
    
    try {
        // Determine if URL is HTTPS or HTTP
        const url = new URL(targetUrl);
        const client = url.protocol === 'https:' ? https : http;
        
        const options = {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': '*/*',
                'Cache-Control': 'no-cache'
            }
        };
        
        const proxyReq = client.request(targetUrl, options, (proxyRes) => {
            // Set CORS headers
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            
            // Copy response headers
            res.setHeader('Content-Type', proxyRes.headers['content-type'] || 'application/octet-stream');
            res.status(proxyRes.statusCode);
            
            // Pipe the response
            proxyRes.pipe(res);
        });
        
        proxyReq.on('error', (error) => {
            console.error('Proxy error:', error);
            res.status(500).json({ error: 'Proxy error: ' + error.message });
        });
        
        proxyReq.end();
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error proxying request: ' + error.message });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'CORS Proxy Server is running' });
});

app.listen(PORT, () => {
    console.log(`\n✅ CORS Proxy Server is running on http://localhost:${PORT}`);
    console.log(`\n📋 To use this proxy, update index.html CONFIG:`);
    console.log(`   corsProxy: 'http://localhost:${PORT}/proxy?url='`);
    console.log(`\n⚠️  Keep this server running while using your dashboard.\n`);
});


