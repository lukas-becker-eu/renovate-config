import { $ } from "bun"
import { readInput, getCommand } from "./_shared.ts"

const hook = await readInput()
const cmd = getCommand(hook)

if (!/\bgh\s+pr\s+merge\b/.test(cmd)) process.exit(0)

const branch = (await $`git rev-parse --abbrev-ref HEAD`.quiet().nothrow().text()).trim()
if (!branch || branch === "main" || branch === "master") process.exit(0)

await $`git checkout main`.quiet().nothrow()
await $`git pull`.quiet().nothrow()
await $`git branch -d ${branch}`.quiet().nothrow()
