---
name: Merge setup safety
description: Clean-install validation and authorization boundaries for automatic merge setup.
---

Validate automatic setup with a clean, locked dependency install rather than trusting an existing node_modules directory.

**Why:** Previously installed dependencies masked security-policy blocks that appeared on a fresh install. Dependency recovery must use allowed updated packages, never bypass the package firewall.

**How to apply:** Test the configured merge setup end to end after dependency changes. Keep runtime upgrades within the current major version when possible and verify isolated tests after test-tool upgrades.

Automatic merge setup must not provision administrators, change database schemas or data, or publish the site without separate authorization.

**Why:** Dependency restoration and build reconciliation do not authorize data changes or release the owner's unpublished policy wording.

**How to apply:** Restrict the automatic hook to dependency restoration and building; handle provisioning, migrations and publishing as separately approved work.
