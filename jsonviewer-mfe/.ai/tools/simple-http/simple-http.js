#!/usr/bin/env node
// Lightweight HTTP server that serves index.html for every path on port 8082.
// Equivalent of simple-http.py. Requires Node 20+ (uses no extra deps).

const http = require('http');
const fs = require('fs');
const path = require('path');

const HOST = '0.0.0.0';
const PORT = 8082;
const INDEX_PATH = path.join(__dirname, 'index.html');

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Method Not Allowed');
    return;
  }

  fs.readFile(INDEX_PATH, (err, body) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`index.html not found at ${INDEX_PATH}`);
      process.stderr.write(`[simple-http] ${req.socket.remoteAddress} - ${req.method} ${req.url} 500\n`);
      return;
    }
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Length': body.length,
      'Cache-Control': 'no-store',
    });
    if (req.method === 'HEAD') {
      res.end();
    } else {
      res.end(body);
    }
    process.stderr.write(`[simple-http] ${req.socket.remoteAddress} - ${req.method} ${req.url} 200\n`);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`simple-http serving index.html on http://${HOST}:${PORT}/*`);
});

let shuttingDown = false;
const shutdown = (signal) => {
  if (shuttingDown) {
    console.log(`\n${signal} received again, forcing exit`);
    process.exit(1);
  }
  shuttingDown = true;
  console.log(`\n${signal} received, shutting down`);
  if (typeof server.closeAllConnections === 'function') {
    server.closeAllConnections();
  }
  server.close(() => process.exit(0));
  setTimeout(() => {
    console.log('shutdown timed out, forcing exit');
    process.exit(1);
  }, 2000).unref();
};
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
