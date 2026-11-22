#!/usr/bin/env python3
"""Lightweight HTTP server that serves index.html for every path on port 8082."""

import os
import sys
from http.server import HTTPServer, BaseHTTPRequestHandler

HOST = "0.0.0.0"
PORT = 8082
HERE = os.path.dirname(os.path.abspath(__file__))
INDEX_PATH = os.path.join(HERE, "index.html")


class IndexHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            with open(INDEX_PATH, "rb") as f:
                body = f.read()
        except FileNotFoundError:
            self.send_error(500, f"index.html not found at {INDEX_PATH}")
            return

        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, fmt, *args):
        sys.stderr.write("[simple-http] %s - %s\n" % (self.address_string(), fmt % args))


def main():
    server = HTTPServer((HOST, PORT), IndexHandler)
    print(f"simple-http serving index.html on http://{HOST}:{PORT}/*")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nshutting down")
        server.server_close()


if __name__ == "__main__":
    main()
