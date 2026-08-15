---
title: Hugging Face Search
category: Local Models
---

# Hugging Face Search

The LlamaCpp panel includes a built-in Hugging Face catalog: you search for a
GGUF model, pick the quantization and download it without leaving the editor.
Downloads pause and resume, and keep running in the background even if you
close the panel.

![Hugging Face search integrated in the LlamaCpp panel](/assets/hf-search.png)

## How to search

1. In **Hugging Face catalog**, type the model name (e.g. `qwen gguf`).
2. The results show the matching repos and their GGUF files, with the
   detected quantization for each one.
3. Pick a quantization and click **Download**.
4. When it finishes, click **Activate** on the downloaded model.

The model is stored in `~/.prometheus-code/llamacpp/models/` and remembered
between sessions.

## Limit of 20 results

The search requests 20 results per query. It's not a design limitation:
Hugging Face caps the API at 500 requests every 300 seconds, and with large
pages the catalog hits that limit easily. With `limit=20` searches stay
smooth without running into rate limits.

> **Tip:** if something very specific doesn't show up, shorten the query to
> the essentials (e.g. `qwen 7b gguf` instead of the full name) and refine
> with the quantizations.

## Quantization detection

The catalog automatically identifies the quantization of each GGUF file,
including llama.cpp's newer naming:

| Quantization | Profile |
|---|---|
| `Q4_K_M` / `IQ4_XS` | quality/VRAM balance (recommended) |
| `Q6_K` / `Q8_0` | more quality, more VRAM |
| `Q8_0_8_8` | composite quantization for Blackwell GPUs |
| `MXFP4_MOE` | floating-point format for MoE models |

If a file name matches no known pattern, the model is still shown, without a
detected quantization.

> **Note:** the catalog only lists models in GGUF format, which is what
> `llama-server` understands. A repo with safetensors only won't appear as
> downloadable.

## What's next

- [Context & Memory](contexto) — how the server manages the conversation.