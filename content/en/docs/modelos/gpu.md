---
title: GPU Requirements
category: Local Models
---

# GPU Requirements

Local models run without a GPU: if you don't have one, llama-server works on
the CPU and everything functions, just slower. With an NVIDIA GPU, the engine
compiles with CUDA support and the model layers run on VRAM, which is where
you feel the real speed. The reference for this guide is an **RTX 5060 Ti
with 16 GB**.

## How much VRAM you need

VRAM holds the model (its weights) and the KV cache of the context. The
practical rule: with 16 GB you comfortably run 12-14 GB models at Q4_K_M or
IQ4_XS quantization, the classic quality/memory balance:

| VRAM | Typical models |
|---|---|
| 8 GB | mid-size models, aggressive quantization |
| 12 GB | 7-8 GB models with headroom |
| 16 GB | 12-14 GB models (Q4_K_M / IQ4_XS) |

> **Tip:** `Q4_K_M` and `IQ4_XS` perform almost as well as the original
> model for chat use, with less than half the VRAM. Reserve `Q8_0` for when
> quality matters more than space.

## Offloading 99 layers

Prometheus Code starts llama-server with `-ngl 99`: up to 99 model layers run
on the GPU, practically the whole model. In practice, offload adjusts itself
to what the VRAM fits; layers that don't fit stay on the CPU.

![nvidia-smi showing the VRAM used by llama-server](/assets/nvidia-smi.png)

With the context at 12288 tokens (quantized `q8_0` KV cache), a 12-14 GB
model leaves roughly **1 GB free** out of the 16 GB — headroom for the
desktop and the rest of the system.

> **Note:** the model's sliders (GPU Layers) control how many layers are
> offloaded. Lowering it reduces VRAM usage at the cost of speed; raising it
> does the opposite, up to what your GPU supports.

## Checking VRAM usage

From the terminal you can watch the VRAM llama-server occupies live:

```bash
nvidia-smi
```

The process is called `llama-server` and appears in the list with its used
memory. The LlamaCpp panel also shows the VRAM in use, without leaving the
editor.

## What's next

- [Configuration](configuracion) — the parameters the server starts with.