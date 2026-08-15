---
title: First Steps
category: Getting Started
---

# First Steps

This guide walks the full flow: turn on the local model engine, download your
first model, chat with Prometheus AI, and have the AI work on your project.
Everything runs on your machine.

## Your first chat with Prometheus AI

Prometheus AI is the editor's native chat. Open it from the activity bar icon
and say hello; the model answers in the conversation, just like a regular
chat.

![Prometheus AI chat replying to a greeting](/assets/chat-saludo.png)

> **Note:** the first answer may take a few seconds while the model loads
> into memory. Subsequent conversations are instant.

## Turn on the local engine

Models run with llama.cpp, integrated into the editor. To turn it on:

1. Click the 🦙 icon in the activity bar (the icon turns white = engine
   active).
2. On first use, the editor compiles `llama-server` locally (with CUDA
   support if you have NVIDIA). Progress is shown in the panel.
3. When the status turns **READY**, the engine is answering on
   `127.0.0.1:11434`.

> **Ollama compatible:** Prometheus Code uses the same `llama-server` as
> Ollama, on the same port (11434). If you already have models downloaded
> with Ollama, you can point to them from the panel and they work directly.

## Download a model from Hugging Face

With the llama.cpp panel open:

1. In **Hugging Face catalog**, search for a GGUF model (e.g. `qwen gguf`).
2. Pick the quantization: `Q4_K_M` (less VRAM) or `Q8_0` (more quality).
3. Click **Download** — downloads pause and resume, and keep running in the
   background even if you close the panel.
4. Click **Activate** on the downloaded model.

The model is stored in `~/.prometheus-code/llamacpp/models/` and remembered
between sessions.

## Configure the model from the LlamaCpp panel

The panel exposes the server controls:

| Control | What it does |
|---|---|
| Context | Context window (`-c`), e.g. 8192 tokens |
| GPU layers | How many layers are offloaded to the GPU (`-ngl`) |
| Temperature | Creativity of the responses |
| Advanced | Flash attention, threads, quantized KV cache |

Every change is applied with the **Apply** button, which restarts the server
with the new parameters. The VRAM in use is shown in the panel.

## Have the AI work on your project

Prometheus AI can pick the right specialist on its own. Type a task in the
chat and watch it search for and adopt an agent:

```text
> "Write tests for the payments module"
search_agents("python testing")
→ 1. python-tester [Development] (catalog): generates and runs pytest tests
use_agent("python-tester")
→ Adopting role: python-tester…
$ pytest tests/ --maxfail=1
✓ 184 tests passed  (exit code: 0)
```

Commands the AI runs appear as blocks inside the chat itself, with live
output and the exit code. If a command asks for a password (for example
`sudo`), the chat lets you type it right there.

> **Tip:** the model's terminal is hidden from the terminal panel — yours is
> untouched. Each AI command lives as one more message in the conversation.

## Install extensions

Prometheus Code uses **Open VSX** as its marketplace, the open extension
registry of VS Code. From the extensions panel search for the official pack:

```
Prometheus Code Extension Pack
```

It includes the **Prometheus AI** extension and the rest of the editor's
ecosystem, all under free licenses.

## What's next

- [FAQ](faq) — pricing, GPU, Ollama and more.