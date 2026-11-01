#!/usr/bin/env bash
set -euo pipefail
bun run build
mkdir -p public/assets
cp -R dist/client/. public/
