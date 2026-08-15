---
title: Git & Version Control
category: Preserved Features
---

# Git & Version Control

VS Code's version control is preserved in Prometheus Code: if your project is
a Git repository, the editor detects changes instantly and lets you run the
whole flow — staging, commits, diff, branches and sync — without leaving the
editor.

## The Source Control panel

The branches icon in the activity bar opens the Source Control panel. There
you see the pending changes, with modified, new and deleted files:

1. **Stage:** click the `+` on a file (or **Stage All Changes** in the
   header) to move it to the staging area.
2. **Commit:** type the message in the field at the top and confirm with
   `Ctrl+Enter`.
3. **Sync:** the sync icon pushes/pulls from the remote.

## Built-in diff

Clicking a modified file opens the **side-by-side diff**: the previous
version on the left, the current one on the right, with added and removed
lines highlighted. From the diff itself you can revert individual changes
before committing.

> **Note:** the diff also works against the last commit and against any
> version in history, not just uncommitted changes.

## Branches

| Action | Where |
|---|---|
| Create branch | click the branch name in the status bar |
| Switch branch | branches menu in the status bar |
| See branches and remotes | panel → **View Branches** |

The editor does not ask for extra credentials: the ones you already have
configured on the system (SSH, token) are reused as is.

## What's next

- [Integrated Terminal](terminal) — the project's shell inside the editor.
- [Debugging](debugging) — run and debug code with breakpoints.
- [Extensions (Open VSX)](extensiones) — extra Git tools from the open
  registry.