#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/.."

# Restore the locked dependencies, including the build tools.
npm ci --include=dev --no-audit --no-fund
npm run build

# Database migrations and admin provisioning require separate authorization.
