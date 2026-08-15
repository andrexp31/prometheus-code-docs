---
title: Configuration
category: Local Models
---

# Configuration

Local models run with `llama-server` (llama.cpp), integrated into the editor
and listening on `127.0.0.1:11434` — the same server and the same port that
Ollama uses. That's why models you already have with Ollama work here without
changes.

> **Note:** the server has no configuration panel of its own: it starts with
> fixed arguments, chosen for maximum compatibility. What you can configure,
> with sliders, is each downloaded model (context, offload and temperature).

## How the server starts

`llama-server` is compiled locally the first time you turn it on (with CUDA
support if you have NVIDIA) and runs with these fixed parameters:

| Argument | Value | What it does |
|---|---|---|
| `llama-server` | compiled binary | HTTP inference server (llama.cpp) |
| `--port` | `11434` | same port Ollama uses |
| `-c` | per model | context window |
| `--context-shift` | — | keeps long conversations on track |
| `--cache-type-k` / `--cache-type-v` | `q8_0` | quantized KV cache, half the VRAM |
| `-ngl` | `99` | offloads 99 layers to the GPU |
| `-fa` | `on` | flash attention |
| `--jinja` | — | chat templates for models that support them |

The VRAM in use is shown in the panel, and the **Stop** and **Start** buttons
let you stop and restart the server whenever you want.

> **Tip:** the server on `11434` answers as a standard Ollama HTTP API: if
> you already have tools configured against that port, they keep working
> without changes.

## Model configuration panel

Each downloaded model has its own panel with sliders that control how it
runs:

![Configuration panel of the downloaded model with its sliders](/assets/sliders-modelo.png)

| Control | What it does |
|---|---|
| Context | context window (`-c`), e.g. 8192 tokens |
| GPU layers | how many layers are offloaded to the GPU (`-ngl`) |
| Temperature | creativity of the responses |

The **Apply** button restarts the server with the new values; the change is
remembered between sessions.

> **Note:** with 16 GB of VRAM, raising the context up to 12288 tokens still
> fits thanks to the quantized KV cache — see [Context & Memory](contexto).

## What's next

- [Hugging Face Search](busqueda-hf) — find and download GGUF models from the
  built-in catalog.