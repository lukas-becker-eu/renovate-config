# renovate-config

Shared [Renovate](https://docs.renovatebot.com/) preset and reusable GitHub Actions workflow for the `lukas-becker-eu` organisation.

## Usage

Add to your `renovate.json`:

```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["github>lukas-becker-eu/renovate-config"]
}
```

Call the shared workflow from `.github/workflows/renovate.yml`:

```yaml
name: Renovate
on:
  schedule:
    - cron: "0 2,14 * * *"
  issues:
    types: [edited]
  workflow_dispatch:

jobs:
  renovate:
    uses: lukas-becker-eu/renovate-config/.github/workflows/renovate.yml@main
    secrets: inherit
    with:
      log-level: ${{ vars.RENOVATE_LOG_LEVEL || 'info' }}
```

Secrets required in each repo: `RENOVATE_CLIENT_ID`, `RENOVATE_APP_PRIVATE_KEY`.

## What the preset configures

- Groups: Docker base images, GitHub Actions, Composer, npm (patch/minor auto-merge, major manual)
- Schedule: any time
- `lockFileMaintenance` with auto-merge
- Vulnerability alerts (auto-merge)
- Labels: `dependencies`
- Timezone: `Europe/Berlin`
