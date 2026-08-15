---
title: Configuración
category: Modelos locales
---

# Configuración

Los modelos locales corren con `llama-server` (llama.cpp), integrado en el
editor y escuchando en `127.0.0.1:11434` — el mismo servidor y el mismo puerto
que usa Ollama. Por eso los modelos que ya tenés con Ollama funcionan acá sin
cambios.

> **Nota:** el servidor no tiene panel de configuración propio: arranca con
> argumentos fijos, pensados para máxima compatibilidad. Lo que sí se
> configura, con sliders, es cada modelo descargado (contexto, offload y
> temperatura).

## Cómo arranca el servidor

`llama-server` se compila localmente la primera vez que lo encendés (con
soporte CUDA si tenés NVIDIA) y se ejecuta con estos parámetros fijos:

| Argumento | Valor | Qué hace |
|---|---|---|
| `llama-server` | binario compilado | servidor HTTP de inferencia (llama.cpp) |
| `--port` | `11434` | mismo puerto que usa Ollama |
| `-c` | según el modelo | ventana de contexto |
| `--context-shift` | — | mantiene conversaciones largas sin perder el hilo |
| `--cache-type-k` / `--cache-type-v` | `q8_0` | KV cache cuantizada, la mitad de VRAM |
| `-ngl` | `99` | offload de 99 capas a la GPU |
| `-fa` | `on` | flash attention |
| `--jinja` | — | plantillas de chat de los modelos que las soportan |

La VRAM usada se muestra en el panel, y con los botones **Stop** y **Start**
podés detener y volver a encender el servidor cuando quieras.

> **Tip:** el servidor en `11434` responde como API HTTP estándar de Ollama:
> si ya tenés herramientas configuradas contra ese puerto, siguen
> funcionando sin tocar nada.

## Panel de configuración del modelo

Cada modelo descargado tiene su propio panel con sliders que ajustan cómo se
ejecuta:

![Panel de configuración del modelo descargado con sus sliders](/assets/sliders-modelo.png)

| Control | Qué hace |
|---|---|
| Contexto | ventana de contexto (`-c`), p. ej. 8192 tokens |
| Capas GPU | cuántas capas se offloadean a la GPU (`-ngl`) |
| Temperatura | creatividad de las respuestas |

El botón **Aplicar** reinicia el servidor con los nuevos valores; el cambio
queda guardado entre sesiones.

> **Nota:** con 16 GB de VRAM, subir el contexto hasta 12288 tokens sigue
> cabiendo gracias a la KV cache cuantizada — lo detallamos en [Contexto y
> memoria](contexto).

## Qué sigue

- [Búsqueda en Hugging Face](busqueda-hf) — encontrar y descargar modelos GGUF
  desde el catálogo integrado.