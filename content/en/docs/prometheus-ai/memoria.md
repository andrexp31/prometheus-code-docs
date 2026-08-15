---
title: Persistent Memory
category: Prometheus AI
---

# Persistent Memory

Prometheus AI remembers between sessions. What is consolidated in a chat is
stored in the editor's storage, and the model retrieves it when you open the
editor again — even if you close the window and come back the next day.

## Memory between sessions

Memory lives in the editor's local storage, under the key
`prometheus.ai.chat.memory.v1`. The model writes entries when it detects
stable data in the conversation: your name, the language you prefer, the
stack of the project you are working on, decisions that were made. In the
next session that information is already available from the first message,
without having to repeat it.

> **Note:** it is not a record of what you said: it is summarized memory, of
> data that matters going forward.

## How it is stored

| Data | Value |
|---|---|
| Storage | editor's local storage |
| Key | `prometheus.ai.chat.memory.v1` |
| Entries | max 20 |

Everything stays on your machine: memory is never sent to any server. When
the 20 entries are reached, the oldest ones are discarded to make room for
new ones.

## Compact summaries for local models

Local models have a limited context window: loading the whole memory at once
would waste too much KV cache. That is why, for local models, memory is
delivered as **compact summaries**: the essential content of each entry,
condensed into a few lines, ready to fit in the context without taking too
much. The model still has the data that matters, at a fraction of the cost.
We detail this in [Context & Memory](../modelos/contexto).

## What's next

- [Automatic Agents (423)](agentes) — the chat's specialists.
- [Embedded AI Terminal](terminal) — the hidden terminal where commands run.
- [History & Sessions](historial) — previous conversations.