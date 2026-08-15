---
title: Download & Install
category: Getting Started
---

# Download & Install

Prometheus Code is a fork of VS Code (Code - OSS) with its own identity: it
integrates local LLM models, an AI chat and automatic agents directly into the
editor, with no telemetry and no cloud. It ships as a native Linux package,
and can also be run from source.

> **Free, no sign-up:** Prometheus Code is MIT. No subscriptions, no accounts,
> no gated downloads: install it and the editor is ready to use.

## Packages

| Platform | Format |
|---|---|
| Linux (Debian/Ubuntu) | `.deb` |
| Linux (any distro) | `.tar.gz` |
| Linux (portable) | `.AppImage` |

Pick the package for your distribution, install it as usual, and look for
**Prometheus Code** in your applications menu.

> **Note:** the full editor ships inside the package. The local model engine
> (llama-server) is compiled automatically the first time you turn it on —
> covered in [First Steps](primeros-pasos).

## System requirements

| Resource | Minimum | Recommended |
|---|---|---|
| RAM | 8 GB | 16 GB |
| Disk | 10 GB | 20 GB |
| Node.js (source only) | 20.x | 22.x |

For GPU-accelerated local models you also need an NVIDIA GPU with CUDA
(llama-server is compiled with CUDA support on first use). Without a GPU,
everything runs on CPU, just with slower responses.

## From source

```bash
git clone https://github.com/andrexp31/prometheus-code-desktop.git
cd prometheus-code-desktop/Prometheus-Code
npm install
npm run compile-client
```

Prerequisites: Node.js 20+, Python 3, and a C/C++ toolchain (GCC or Clang).
To launch the compiled editor in development mode:

```bash
./scripts/code.sh
```

## First launch

When you open Prometheus Code for the first time, the editor starts with the
welcome screen, which summarizes the main features: local models, Prometheus
AI chat, automatic agents, integrated terminal, full privacy, and Git and
debugging preserved from VS Code.

![Prometheus Code welcome screen when the editor opens](/assets/editor-bienvenida.png)

> **Tip:** press `Ctrl+Shift+P` to open the command palette and search for
> any action, just like in VS Code. Everything you know from the editor is
> still here.

## What's next

With the editor installed, the next step is turning on the local engine and
having your first chat with Prometheus AI: [First Steps](primeros-pasos).