---
title: Búsqueda en Hugging Face
category: Modelos locales
---

# Búsqueda en Hugging Face

El panel LlamaCpp incluye un catálogo integrado de Hugging Face: buscás un
modelo GGUF, elegís la cuantización y lo descargás sin salir del editor. La
descarga se pausa y resume, y sigue en segundo plano aunque cierres el panel.

![Buscador de Hugging Face integrado en el panel LlamaCpp](/assets/hf-search.png)

## Cómo buscar

1. En **Catálogo Hugging Face**, escribí el nombre del modelo (ej. `qwen gguf`).
2. El resultado muestra los repos encontrados y sus archivos GGUF, con la
   cuantización detectada para cada uno.
3. Elegí una cuantización y clic en **Descargar**.
4. Cuando termina, clic en **Activar** sobre el modelo descargado.

El modelo queda en `~/.prometheus-code/llamacpp/models/` y se recuerda entre
sesiones.

## Límite de 20 resultados

La búsqueda pide 20 resultados por consulta. No es una limitación de diseño:
Hugging Face restringe a 500 peticiones cada 300 segundos y, con páginas
grandes, el catálogo toca ese límite fácilmente. Con `limit=20` las búsquedas
siguen siendo fluidas sin caer en rate limit.

> **Tip:** si buscás algo muy específico y no aparece, acortá la consulta a lo
> esencial (ej. `qwen 7b gguf` en vez de la versión completa) y refiná con las
> cuantizaciones.

## Detección de cuantizaciones

El catálogo identifica automáticamente la cuantización de cada archivo GGUF,
incluida la nomenclatura nueva de llama.cpp:

| Cuantización | Perfil |
|---|---|
| `Q4_K_M` / `IQ4_XS` | equilibrio calidad/VRAM (recomendada) |
| `Q6_K` / `Q8_0` | más calidad, más VRAM |
| `Q8_0_8_8` | cuantización compuesta para GPU Blackwell |
| `MXFP4_MOE` | formato de punto flotante para modelos MoE |

Si el nombre de un archivo no coincide con ningún patrón conocido, el modelo
se muestra igualmente sin cuantización identificada.

> **Nota:** el catálogo solo lista modelos en formato GGUF, que es el que
> entiende `llama-server`. Un repo que solo tenga safetensors no aparece como
> descargable.

## Qué sigue

- [Contexto y memoria](contexto) — cómo maneja la conversación el servidor.