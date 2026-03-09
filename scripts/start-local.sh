#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$ROOT_DIR/backend"
npm install

cd "$ROOT_DIR"

cleanup() {
  if [[ -n "${BACKEND_PID:-}" ]]; then
    kill "$BACKEND_PID" >/dev/null 2>&1 || true
  fi
  if [[ -n "${FRONTEND_PID:-}" ]]; then
    kill "$FRONTEND_PID" >/dev/null 2>&1 || true
  fi
}
trap cleanup EXIT

npm --prefix backend run start &
BACKEND_PID=$!

python3 -m http.server 3000 --directory frontend &
FRONTEND_PID=$!

echo "Backend:  http://localhost:3001"
echo "Frontend: http://localhost:3000"
echo "Pressione Ctrl+C para encerrar."

wait
