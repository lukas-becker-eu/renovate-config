import { $ } from "bun"
import { readInput, getCommand, block } from "./_shared.ts"

const hook = await readInput()
const cmd = getCommand(hook)

if (!/\bgit\s+commit(\s|$)/.test(cmd)) process.exit(0)

const subject = (await $`git log -1 --pretty=%s`.quiet().nothrow().text()).trim()
if (/^(feat|fix|chore|docs|ci|refactor|test|style|perf|build)(\([a-z0-9_-]+\))?: .+/.test(subject))
  process.exit(0)

block(`Commit subject "${subject}" does not follow Conventional Commits (type(scope): summary). Fix with: git commit --amend -m "type(scope): summary"`)
