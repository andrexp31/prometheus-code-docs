---
title: Requisitos de GPU
category: Modelos locales
---

# Requisitos de GPU

Los modelos locales corren sin GPU: si no tenés una, llama-server trabaja por
CPU y todo funciona, solo más lento. Con una GPU NVIDIA, el motor se compila
con soporte CUDA y las capas del modelo se ejecutan en VRAM, que es donde se
nota la velocidad real. La referencia de esta guía es una **RTX 5060 Ti de
16 GB**.

## Cuánta VRAM necesitás

La VRAM guarda el modelo (sus pesos) y la KV cache del contexto. La regla
práctica: con 16 GB corrés cómodo modelos de 12-14 GB en cuantización Q4_K_M
o IQ4_XS, que son el equilibrio clásico entre calidad y memoria:

| VRAM | Modelos típicos |
|---|---|
| 8 GB | modelos medianos, cuantización agresiva |
| 12 GB | modelos de 7-8 GB con margen |
| 16 GB | modelos de 12-14 GB (Q4_K_M / IQ4_XS) |

> **Tip:** `Q4_K_M` e `IQ4_XS` rinden casi lo mismo que el modelo original
> para uso en chat, con menos de la mitad de la VRAM. Reservá `Q8_0` para
> cuando la calidad importe más que el espacio.

## Offload de 99 capas

Prometheus Code arranca llama-server con `-ngl 99`: hasta 99 capas del modelo
se ejecutan en la GPU, es decir prácticamente el modelo completo. En la
práctica, el offload se ajusta solo hasta donde alcanza la VRAM; las capas
que no entran quedan en CPU.

![nvidia-smi mostrando la VRAM usada por llama-server](/assets/nvidia-smi.png)

Con el contexto en 12288 tokens (KV cache cuantizada `q8_0`), un modelo de
12-14 GB deja aproximadamente **1 GB libre** de los 16 GB — margen para el
escritorio y el resto del sistema.

> **Nota:** los sliders del modelo (Capas GPU) controlan cuántas capas se
> offloadean. Bajarlo reduce el uso de VRAM a costa de velocidad; subirlo
> hace lo contrario, hasta el máximo que soporte tu GPU.

## Comprobar el uso de VRAM

Desde la terminal podés ver la VRAM que ocupa llama-server en vivo:

```bash
nvidia-smi
```

El proceso se llama `llama-server` y aparece en la lista con su memoria
usada. El panel LlamaCpp también muestra la VRAM en uso, sin salir del editor.

## Qué sigue

- [Configuración](configuracion) — parámetros con los que arranca el servidor.