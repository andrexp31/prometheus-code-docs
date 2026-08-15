---
title: Context & Memory
category: Local Models
---

# Context & Memory

The context is the model's working memory: everything the conversation uses
to answer. The larger it is, the more the model remembers — but every context
token takes VRAM. This page explains how Prometheus Code manages it to get
the most out of 16 GB.

## What the KV cache is

For every token in the conversation, the model keeps a copy of its internal
states (attention keys and values) in the **KV cache**. That's the real cost
of context in memory:

| KV cache | Cost per token | 8192 tokens | 12288 tokens |
|---|---|---|---|
| FP16 (default) | ≈ 0.47 MB/token | ≈ 3.8 GB | ≈ 5.8 GB |
| Quantized K/V `q8_0` | ≈ 0.24 MB/token | ≈ 1.9 GB | ≈ 2.9 GB |

> **Note:** the values are approximate and depend on the model. The idea is
> always the same: the KV cache grows with the conversation, and quantizing
> it cuts the cost in half.

## From 8192 to 12288 tokens

The default context is 8192 tokens. Since llama-server starts with
`--cache-type-k/-v q8_0`, the KV cache costs half, and with that the same
VRAM fits a window of **12288 tokens** — 50 % more conversation. On a 16 GB
GPU, with a 12-14 GB model, raising the context to 12288 still leaves about
1 GB free.

> **Tip:** try 12288 tokens when working with large projects: the model reads
> more project files before the context fills up.

## Compact summaries

As the conversation grows, the chat generates a **compact summary** every 3
turns: it condenses what was discussed so far and adds it to the context, so
the model keeps remembering the thread without the whole conversation
occupying the KV cache.

## Truncating long messages

Messages longer than **5000 characters** are truncated. The text is cut to
the maximum length and the rest is discarded, so a giant message doesn't
flood the context or the VRAM cost.

## Long windows with `--context-shift`

For conversations that exceed the window, llama-server uses
`--context-shift`: when the context fills up, it shifts the window instead
of resetting it, discarding the oldest part and keeping the end of the
conversation. Combined with the compact summaries, the session stays
coherent even when very long.

> **Note:** context is managed automatically: there are no context controls
> in the chat. If you want a larger window, adjust the model's Context slider
> in its configuration panel — [Configuration](configuracion).

## What's next

- [GPU Requirements](gpu) — which models run on your VRAM.