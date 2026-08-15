---
title: Integrated Terminal
category: Preserved Features
---

# Integrated Terminal

The integrated terminal in the bottom panel is the same one from VS Code,
preserved as is: a real terminal, no web emulation, no containers. Open one
with `Ctrl+`` or from the **Terminal → New Terminal** menu, and you have your
full shell inside the editor.

## Fish by default, zsh and bash too

Prometheus Code starts with **fish** as the default shell. If you prefer
another one, the integrated terminal detects the shells installed on your
system and you can pick zsh or bash from the terminal's dropdown menu:

| Shell | How to select it |
|---|---|
| fish | default |
| zsh | terminal menu → **Select Default Profile** |
| bash | terminal menu → **Select Default Profile** |

> **Tip:** each terminal opens in the folder you have open in the editor, so
> commands run directly against your project.

## Several terminals in parallel

You can open as many terminals as you want and organize them as you like:

| Shortcut | Action |
|---|---|
| `Ctrl+`` | toggle terminal |
| `Ctrl+Shift+5` | split the current terminal |
| terminal menu | rename, rearrange, close |

Each terminal has its own history and shell; splitting lets you, for example,
run the server in one and the tests in the other.

## Shell integration

The integrated terminal detects the shell prompt (shell integration) and
uses it for extras: jumping to the end of the output, navigating by command
blocks and a reliable exit code so you know whether a command worked. This
works out of the box on fish.

## The AI's terminal is a different thing

Prometheus AI also runs commands, but not in your terminal: it runs them in
its own terminal embedded inside the chat, with full output and exit code
(`(exit code: 0)`). It can also ask you to run commands in your integrated
terminal with `run_in_terminal` and reads the full output of the result. We
cover this in [Embedded AI Terminal](../prometheus-ai/terminal).

## What's next

- [Git & Version Control](git) — staging, commits and diff from the editor.
- [Debugging](debugging) — breakpoints, launch.json and the debug panel.
- [Live Preview](live-preview) — the web running live inside the editor.