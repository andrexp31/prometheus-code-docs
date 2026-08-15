---
title: FAQ
category: Getting Started
---

# FAQ

## How much does it cost?

Prometheus Code is MIT and is paid once: a one-time license, no subscriptions,
no accounts and no locked features. Local models are open source (GGUF) and
the ecosystem extensions install from Open VSX.

> **One-time payment, no surprises:** there are no plans or renewals. The only
> optional upgrade is a better GPU, which just speeds up responses.

## Do I need a GPU?

No. Prometheus Code works with any processor, and local models run on CPU if
you don't have a GPU. With an NVIDIA GPU, llama-server is compiled with CUDA
support and responses are much faster (layers are offloaded to VRAM from the
LlamaCpp panel).

## Can I use the models I already have in Ollama?

Yes. Prometheus Code uses the same `llama-server` as Ollama, on the same port
(11434). The GGUF models you already downloaded can be pointed to from the
LlamaCpp panel and work without changes. Models can also be downloaded
directly from the built-in Hugging Face catalog.

## Is it a fork of VS Code?

Yes, it is a fork of VS Code (Code - OSS). It keeps everything you already
know: editing, debugging, built-in Git, terminal and extensions. On top of
that it adds its own identity: local models, the Prometheus AI chat and
automatic agents that work on your project.

## Which extensions can I install?

Prometheus Code uses **Open VSX**, the open extension marketplace of VS Code.
The Prometheus AI chat, the automatic agents and the local models are built
into the editor, no extra extensions needed.

## Is my data sent to the cloud?

No. Prometheus Code has no telemetry and models run locally on your machine:
your files, chats and settings never leave your computer. You only need a
connection to download a model from Hugging Face, and after that you can work
offline.

## Which operating systems does it support?

Prometheus Code ships for Linux (`.deb`, `.tar.gz` and `.AppImage`). If you
work from source, it compiles on Linux, Windows and macOS.