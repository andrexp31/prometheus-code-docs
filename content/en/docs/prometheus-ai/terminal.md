---
title: Embedded AI Terminal
category: Prometheus AI
---

# Embedded AI Terminal

When Prometheus AI needs to run a command, it runs in its own terminal,
hidden inside the chat. It is a real fish terminal, embedded as one more
block of the conversation (PrometheusTerminalToolPart) and rendered live with
xterm. Your terminal is untouched: the AI's lives as one more message in the
conversation.

## A hidden terminal for the AI

The model's terminal does not show up in the editor's terminal panel: it is
invisible except inside the chat. Every command the AI runs is a block with
its own prompt line, live output and result:

![Embedded AI terminal as a block inside the Prometheus AI chat](/assets/chat-llamacpp.png)

```text
$ pytest tests/ --maxfail=1
✓ 184 tests passed  (exit code: 0)
```

## Full output with exit code

When the command finishes, the block shows the output and the exit code at
the end, like `(exit code: 0)` or `(exit code: 1)`. That is how Prometheus AI
knows whether the command worked and can react accordingly — for example,
running the tests again after a fix.

## Protected passwords

If a command asks for a password (for example `sudo`), the chat activates
**password gating**: the terminal stops streaming its content to the AI and
the password stays out of the conversation. You type it, and the model only
sees the command's result.

> **Note:** this way a command with secrets never leaves the password
> recorded in the chat history.

## Prompt wait (shell integration)

Before marking the output as complete, the terminal waits for the command to
reach the fish prompt again. That is detected with shell integration when
available; otherwise a silence fallback is used: if no new output appears for
a while, the command is considered finished. The output is captured in full,
with no time cuts.

## Limits

| Limit | Value |
|---|---|
| Max time per command (deadline) | 10 minutes |
| Shown output | truncated at 8000 characters |

Past the deadline, the command is interrupted and the AI knows it. Output is
truncated at 8000 characters so a verbose command does not flood the
conversation context.

> **Tip:** if a command will take long, split it into smaller steps or ask
> the AI to run it in the background with redirection to a file.

## What's next

- [Automatic Agents (423)](agentes) — the specialists that use this
  terminal.
- [Persistent Memory](memoria) — what Prometheus AI remembers between
  sessions.
- [History & Sessions](historial) — previous conversations.