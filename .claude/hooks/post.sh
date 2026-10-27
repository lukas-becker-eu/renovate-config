#!/usr/bin/env bash
if ! command -v bun &>/dev/null; then
  echo "Claude Code hook error: bun not found in PATH — post-use hooks skipped. Install bun (https://bun.sh) and restart the terminal." >&2
  exit 1
fi
exec bun "$@"
