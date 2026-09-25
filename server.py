"""
Native Loom Unified Server
Serves static frontend assets and seamlessly reverse-proxies /api/ calls
to the FastAPI AI backend (http://127.0.0.1:8000).
"""

import http.server
import socketserver
import urllib.request
import urllib.error
import subprocess
import time
import os
import sys
from pathlib import Path

PORT = 8080
BACKEND_PORT = 8000
BACKEND_HOST = "127.0.0.1"
BACKEND_URL = f"http://{BACKEND_HOST}:{BACKEND_PORT}"


class UnifiedHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def _proxy_to_backend(self, method: str):
        target_url = f"{BACKEND_URL}{self.path}"
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length) if content_length > 0 else None

        req_headers = {}
        for key in ['Content-Type', 'Accept', 'Authorization']:
            val = self.headers.get(key)
            if val:
                req_headers[key] = val

        req = urllib.request.Request(
            target_url,
            data=body,
            headers=req_headers,
            method=method
        )

        try:
            with urllib.request.urlopen(req, timeout=120) as resp:
                self.send_response(resp.status)
                for header, value in resp.getheaders():
                    # Don't double-add transfer-encoding or cors headers
                    if header.lower() not in ['transfer-encoding', 'access-control-allow-origin', 'access-control-allow-methods', 'access-control-allow-headers']:
                        self.send_header(header, value)
                self.end_headers()
                self.wfile.write(resp.read())
        except urllib.error.HTTPError as e:
            self.send_response(e.code)
            for header, value in e.headers.items():
                if header.lower() not in ['transfer-encoding', 'access-control-allow-origin']:
                    self.send_header(header, value)
            self.end_headers()
            self.wfile.write(e.read())
        except Exception as e:
            self.send_response(502)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            err_json = f'{{"error": "Backend unavailable", "details": "{str(e)}"}}'.encode('utf-8')
            self.wfile.write(err_json)

    def do_GET(self):
        if self.path.startswith('/api/') or self.path.startswith('/outputs/'):
            self._proxy_to_backend('GET')
        else:
            super().do_GET()

    def do_POST(self):
        if self.path.startswith('/api/'):
            self._proxy_to_backend('POST')
        else:
            self.send_response(405)
            self.end_headers()

    def guess_type(self, path):
        if path.endswith('.js'):
            return 'application/javascript'
        if path.endswith('.css'):
            return 'text/css'
        if path.endswith('.html'):
            return 'text/html'
        if path.endswith('.jpg') or path.endswith('.jpeg'):
            return 'image/jpeg'
        if path.endswith('.png'):
            return 'image/png'
        if path.endswith('.svg'):
            return 'image/svg+xml'
        return super().guess_type(path)


def ensure_backend_running():
    """Checks if AI Backend is up; if not, attempts to start it."""
    try:
        urllib.request.urlopen(f"{BACKEND_URL}/api/health", timeout=1)
        print(f"[OK] AI Backend confirmed active on {BACKEND_URL}")
        return True
    except Exception:
        print(f"[Info] AI Backend not detected on {BACKEND_URL}. Starting backend...")
        backend_dir = Path(__file__).resolve().parent / "ai_backend"
        python_exe = sys.executable
        venv_py = Path(__file__).resolve().parent / ".venv" / "Scripts" / "python.exe"
        if venv_py.exists():
            python_exe = str(venv_py)

        cmd = [python_exe, "-m", "uvicorn", "app:app", "--host", BACKEND_HOST, "--port", str(BACKEND_PORT)]
        try:
            subprocess.Popen(cmd, cwd=str(backend_dir))
            for _ in range(10):
                time.sleep(0.5)
                try:
                    urllib.request.urlopen(f"{BACKEND_URL}/api/health", timeout=1)
                    print(f"[OK] AI Backend successfully launched on {BACKEND_URL}")
                    return True
                except Exception:
                    pass
        except Exception as e:
            print(f"[Warning] Could not auto-launch backend: {e}")
        return False


def main():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    ensure_backend_running()
    
    socketserver.TCPServer.allow_reuse_address = True
    port = PORT
    for attempt in range(5):
        try:
            with socketserver.TCPServer(("", port), UnifiedHandler) as httpd:
                print(f"Unified Server live at http://localhost:{port}/")
                print("Serving Native Loom with AI Backend proxying...")
                sys.stdout.flush()
                httpd.serve_forever()
        except OSError:
            print(f"Port {port} busy, trying {port + 1}...")
            port += 1


if __name__ == '__main__':
    main()
