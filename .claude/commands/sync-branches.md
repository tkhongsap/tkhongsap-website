---
description: Sync local branches with remote and clean up deleted branches
allowed-tools: Bash(git fetch:*), Bash(git branch:*), Bash(git for-each-ref:*), Bash(git rev-parse:*)
---

## Context

- Current branch: !`git branch --show-current`
- All local branches with tracking info: !`git branch -vv`
- Remote branches: !`git branch -r`

## Your task

Synchronize local branches with remote and clean up orphaned branches:

1. **Fetch and prune**: Run `git fetch --prune` to update remote-tracking branches and remove stale references

2. **Identify orphaned branches**: Find local branches whose upstream remote branch was deleted (marked as `[gone]` in `git branch -vv` output)

3. **Show cleanup preview**: Before deleting anything, show the user:
   - How many branches will be deleted
   - List of branch names that will be removed
   - Ask for confirmation if more than 3 branches will be deleted

4. **Delete orphaned branches**: Remove local branches whose remote tracking branch is gone
   - Use `git branch -D` for force deletion (these branches can't be pushed anyway)
   - Skip the currently checked out branch (safety check)
   - Skip branches without upstream tracking (local-only branches)

5. **Show summary**: Display:
   - Number of branches deleted
   - Remaining local branches
   - Final clean status

**Safety rules:**
- Never delete the currently checked out branch
- Only delete branches marked as `[gone]` (upstream deleted)
- Keep local-only branches (no upstream configured)
- If any git command fails, stop and report the error

**Expected output format:**
```
Fetching from remote and pruning stale references...
✓ Fetch complete

Scanning for orphaned branches...
Found 3 branches to clean up:
  - feature/old-feature [gone]
  - bugfix/merged-fix [gone]
  - refactor/outdated [gone]

Deleting orphaned branches...
✓ Deleted feature/old-feature
✓ Deleted bugfix/merged-fix
✓ Deleted refactor/outdated

Summary:
  3 branches deleted
  5 branches remaining
  Local branches now synced with remote
```
