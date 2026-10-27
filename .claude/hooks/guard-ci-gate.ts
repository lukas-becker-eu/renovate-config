import { $ } from "bun"
import { readInput, getCommand, deny } from "./_shared.ts"

const hook = await readInput()
const cmd = getCommand(hook)

if (!/(^|\n|;|&&|\|\|)\s*gh\s+pr\s+merge\b/.test(cmd)) process.exit(0)
// --auto delegates the CI gate to GitHub itself — no need to poll here
if (/\bgh\s+pr\s+merge\b.*--auto/.test(cmd)) process.exit(0)

let pr = cmd.match(/\bgh\s+pr\s+merge\s+(\d+)/)?.[1] ?? ""
const repo = cmd.match(/(?:--repo|-R)\s+(\S+)/)?.[1] ?? ""
const repoArgs = repo ? ["--repo", repo] : []

if (!pr) {
  pr = (await $`gh pr view --json number -q .number ${repoArgs}`.quiet().nothrow().text()).trim()
}

type Check = { bucket: string }
let checks: Check[] = []
try {
  const prArgs = pr ? [pr] : []
  const raw = await $`gh pr checks ${prArgs} ${repoArgs} --json bucket`.quiet().nothrow().text()
  checks = JSON.parse(raw) as Check[]
} catch {
  deny(`CI status could not be determined — run: gh pr checks ${pr || ""} to check manually.`)
}

const bad = checks.filter(c => ["fail", "pending", "cancel"].includes(c.bucket)).length
const good = checks.filter(c => c.bucket === "pass").length

if (bad > 0 || good === 0) {
  deny(`CI is not fully green — all checks must pass before merging (run: gh pr checks ${pr}).`)
}
