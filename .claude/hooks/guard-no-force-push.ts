import { $ } from "bun"
import { readInput, getCommand, deny } from "./_shared.ts"

const hook = await readInput()
const cmd = getCommand(hook)

if (!/\bgit\s+push\b/.test(cmd)) process.exit(0)
if (!/--force\b|--force-with-lease\b|(^|\s)-f(\s|$)/.test(cmd)) process.exit(0)

const branch = (await $`git rev-parse --abbrev-ref HEAD`.quiet().nothrow().text()).trim()
if (/\b(main|master)\b/.test(cmd) || branch === "main" || branch === "master")
  deny("Force-push to main/master is blocked to keep history stable and main deployable.")
