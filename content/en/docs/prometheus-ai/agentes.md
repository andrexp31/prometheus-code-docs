---
title: Automatic Agents (423)
category: Prometheus AI
---

# Automatic Agents (423)

Agents are specialists with their own instructions: a testing agent knows how
to generate and run pytest tests, a Rust agent knows the cargo conventions,
and so on up to 423 profiles. Prometheus AI searches for them, adopts them
and works with them inside the chat, with nothing to configure.

## Where the 423 agents come from

The catalog combines two sources:

| Source | What it provides |
|---|---|
| GitHub AI Templates | the agents from the open AI templates catalog |
| Installed on your system | the ones in `~/.claude/agents` (global) and in `.claude/agents` in the workspace (per project) |

Some ship with the editor and others were installed by you or your team; they
all appear in the same catalog and Prometheus AI treats them the same.

## The catalog always at hand

Since August 2026, the full catalog — names, categories and descriptions — is
injected into the chat context. Prometheus AI knows every agent from the
first message, no need to search first.

To avoid wasting context, the injection has a token budget with graceful
degradation:

| If the catalog… | What is injected… |
|---|---|
| fits in the budget | full catalog (name, category and description of every agent) |
| exceeds the budget | names only |
| still exceeds | the 20 most relevant agents per category |

In practice the full catalog almost always fits; degradation only shows up
with models with a very small context window.

## Searching for agents

Besides the injected catalog, the chat exposes `search_agents` for keyword
searches:

```text
search_agents("testing python", "Development")
```

Each agent scores points depending on where the words appear:

| Field | Weight |
|---|---|
| Name | ×3 |
| Description | ×2 |
| Category | ×1 |

Results are sorted by score and the **top 10** are returned. There is also
`list_agents(category)`, which lists up to 50 agents from a category — handy
for browsing a whole area.

> **Tip:** search by what the agent does, not by its name: "rest api" or
> "django" will find more than recalling exact names.

## Adopting an agent

When Prometheus AI picks an agent, it runs `use_agent` with its name and the
conversation continues in that role: the agent's instructions are injected
into the model context, and from then on it answers as the corresponding
specialist.

```text
use_agent("python-tester")
→ Adopting role: python-tester…
```

> **Note:** adopting an agent changes nothing in your environment: nothing is
> installed and your configuration is untouched. It is only context the model
> starts taking into account.

## Autonomy in the chat

The agent tools (`search_agents`, `list_agents`, `use_agent`) are **always
available** in the chat: they do not depend on any manual selection. The
autonomy system prompt (in the editor's language, Spanish or English) tells
the model it may search and adopt agents on its own when the task calls for
it — you ask for the result, not for the tool.

## In the chat

This is what a real conversation looks like where Prometheus AI searches for
and adopts an agent on its own:

![Prometheus AI searching for and adopting an agent in the chat](/assets/agentes-chat-1.png)

And another example from the same conversation, with the search and the
already-adopted agent:

![Agent search and adoption in the chat](/assets/agentes-chat-2.png)

## What's next

- [Embedded AI Terminal](terminal) — the hidden terminal where commands run.
- [Persistent Memory](memoria) — what Prometheus AI remembers between
  sessions.
- [History & Sessions](historial) — previous conversations.