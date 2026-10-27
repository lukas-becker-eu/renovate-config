#!/usr/bin/env bash
if ! command -v bun &>/dev/null; then
  printf '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"bun not found in PATH — all guards are disabled and tool calls are blocked. Install bun (https://bun.sh) and restart the terminal."}}\n'
  exit 0
fi
exec bun "$@"
