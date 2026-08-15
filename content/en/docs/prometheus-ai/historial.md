---
title: History & Sessions
category: Prometheus AI
---

# History & Sessions

Every conversation with Prometheus AI is a session, and previous sessions are
saved. You can go back to an old conversation and continue where it left off,
or restart the current one and start fresh whenever you want.

## Saved sessions

Sessions are stored in the editor's local storage, under the key
`prometheus.ai.chat.sessions.v1`, with a maximum of **50 sessions**. The
oldest ones are discarded automatically when the limit is reached.

| Data | Value |
|---|---|
| Storage | editor's local storage |
| Key | `prometheus.ai.chat.sessions.v1` |
| Sessions | max 50 |

Everything stays on your machine: history is never sent to any server.

## History view in the chat

The chat includes a history view where previous sessions appear, identified
by their first message. One click opens the session and the conversation is
ready to continue.

## Continuing a conversation

When you open a previous session, the chat returns to where it left off: the
messages stay on screen and the model retrieves that conversation's context.
Closing the editor loses nothing: the session is saved and comes back intact
next time.

> **Tip:** if you work on several projects, switch between sessions by
> topic — each one keeps its own thread.

## Restarting the conversation

When you prefer to start over, restart the current session: the chat clears
and the conversation starts from scratch. The previous session is not lost:
it stays in the history, and you can go back to it whenever you want.

## What's next

- [Automatic Agents (423)](agentes) — the chat's specialists.
- [Embedded AI Terminal](terminal) — the hidden terminal where commands run.
- [Persistent Memory](memoria) — what Prometheus AI remembers between
  sessions.