---
title: Primeros pasos
category: Empezar
---

# Primeros pasos

Esta guía recorre el flujo completo: encender el motor de modelos locales,
descargar tu primer modelo, chatear con Prometheus AI y pedirle a la IA que
trabaje en tu proyecto. Todo corre en tu máquina.

## Tu primer chat con Prometheus AI

Prometheus AI es el chat nativo del editor. Abrilo desde el icono de la barra
de actividades y escribí un saludo; el modelo responde en la conversación,
igual que en un chat normal.

![Chat de Prometheus AI respondiendo un saludo](/assets/chat-saludo.png)

> **Nota:** la primera respuesta puede tardar unos segundos mientras el
> modelo se carga en memoria. Las conversaciones siguientes son inmediatas.

## Encender el motor local

Los modelos corren con llama.cpp, integrado en el editor. Para encenderlo:

1. Hacé clic en el icono 🦙 de la barra de actividades (el icono se pone
   blanco = motor activo).
2. La primera vez, el editor compila `llama-server` localmente (con soporte
   CUDA si tenés NVIDIA). El progreso se ve en el panel.
3. Cuando el estado pase a **READY**, el motor ya responde en
   `127.0.0.1:11434`.

> **Ollama compatible:** Prometheus Code usa el mismo `llama-server` que
> Ollama, en el mismo puerto (11434). Si ya tenés modelos descargados con
> Ollama, podés apuntarlos desde el panel y funcionan directamente.

## Descargar un modelo desde Hugging Face

Con el panel de llama.cpp abierto:

1. En **Catálogo Hugging Face**, buscá un modelo GGUF (ej. `qwen gguf`).
2. Elegí la cuantización: `Q4_K_M` (menos VRAM) o `Q8_0` (más calidad).
3. Clic en **Descargar** — la descarga se pausa y resume, y sigue en segundo
   plano aunque cierres el panel.
4. Clic en **Activar** sobre el modelo descargado.

El modelo queda en `~/.prometheus-code/llamacpp/models/` y se recuerda entre
sesiones.

## Configurar el modelo desde el panel LlamaCpp

El panel expone los controles del servidor:

| Control | Qué hace |
|---|---|
| Contexto | Ventana de contexto (`-c`), p. ej. 8192 tokens |
| Capas GPU | Cuántas capas offloadea a la GPU (`-ngl`) |
| Temperatura | Creatividad de las respuestas |
| Avanzado | Flash attention, threads, KV cache cuantizada |

Cada cambio se aplica con el botón **Aplicar**, que reinicia el servidor con
los nuevos parámetros. La VRAM usada se muestra en el panel.

## Pedirle a la IA que trabaje en el proyecto

Prometheus AI puede elegir sola al especialista adecuado. En el chat escribí
una tarea y observá cómo busca y adopta un agente:

```text
> "Escribí tests para el módulo de pagos"
search_agents("python testing")
→ 1. python-tester [Desarrollo] (catálogo): genera y corre tests de pytest
use_agent("python-tester")
→ Adoptando rol: python-tester…
$ pytest tests/ --maxfail=1
✓ 184 tests passed  (exit code: 0)
```

Los comandos que ejecuta la IA aparecen como bloques dentro del propio chat,
con la salida en vivo y el exit code. Si un comando pide contraseña (por
ejemplo `sudo`), el chat te deja tipearla ahí mismo.

> **Tip:** la terminal del modelo está oculta del panel de terminales — la
> tuya no se toca. Cada comando de la IA vive como un mensaje más de la
> conversación.

## Instalar extensiones

Prometheus Code usa **Open VSX** como marketplace, el registro abierto de
extensiones de VS Code. Desde el panel de extensiones buscá el pack oficial:

```
Prometheus Code Extension Pack
```

Incluye la extensión **Prometheus AI** y el resto del ecosistema del editor,
todo con licencia libre.

## Próximos pasos

- [Preguntas frecuentes](faq) — precios, GPU, Ollama y más.