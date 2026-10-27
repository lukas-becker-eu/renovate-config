export interface HookInput {
  tool_name?: string
  tool_input?: { command?: string }
}

export async function readInput(): Promise<HookInput> {
  try {
    return JSON.parse(await Bun.stdin.text())
  } catch {
    return {}
  }
}

export function getCommand(hook: HookInput): string {
  return hook.tool_input?.command ?? ""
}

export function deny(reason: string): void {
  console.log(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "deny",
      permissionDecisionReason: reason,
    },
  }))
  process.exit(0)
}

export function block(reason: string): void {
  console.log(JSON.stringify({ decision: "block", reason }))
  process.exit(0)
}
