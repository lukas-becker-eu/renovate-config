import { $ } from "bun"
import { readInput, getCommand, deny } from "./_shared.ts"

const hook = await readInput()
const cmd = getCommand(hook)

if (!/\bgit\s+commit(\s|$)/.test(cmd)) process.exit(0)

const branch = (await $`git rev-parse --abbrev-ref HEAD`.quiet().nothrow().text()).trim()
if (branch === "main" || branch === "master")
  deny("Direct commits to main/master are blocked — create a feature branch first (e.g. git checkout -b fix/short-description).")
