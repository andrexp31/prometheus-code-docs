---
title: Contexto y memoria
category: Modelos locales
---

# Contexto y memoria

El contexto es la memoria de trabajo del modelo: todo lo que la conversación
usa para responder. Cuanto más grande, más cosas recuerda el modelo — pero
cada token de contexto ocupa VRAM. Esta página explica cómo lo administra
Prometheus Code para sacarle el máximo a 16 GB.

## Qué es la KV cache

Para cada token de la conversación, el modelo guarda una copia de sus estados
internos (claves y valores de atención) en la **KV cache**. Ese es el costo
real del contexto en memoria:

| KV cache | Costo por token | 8192 tokens | 12288 tokens |
|---|---|---|---|
| FP16 (por defecto) | ≈ 0.47 MB/token | ≈ 3.8 GB | ≈ 5.8 GB |
| K/V cuantizada `q8_0` | ≈ 0.24 MB/token | ≈ 1.9 GB | ≈ 2.9 GB |

> **Nota:** los valores son aproximados y dependen del modelo. La idea es la
> misma siempre: la KV cache crece con la conversación, y cuantizarla la
> reduce a la mitad.

## De 8192 a 12288 tokens

Por defecto el contexto es de 8192 tokens. Como llama-server arranca con
`--cache-type-k/-v q8_0`, la KV cache cuesta la mitad, y con eso la misma
VRAM alcanza para una ventana de **12288 tokens** — un 50 % más de
conversación. En una GPU de 16 GB, con un modelo de 12-14 GB, subir el
contexto a 12288 deja aún ~1 GB libre.

> **Tip:** probá con 12288 tokens cuando trabajes con proyectos grandes: el
> modelo lee más archivos del proyecto antes de que el contexto se llene.

## Resúmenes compactos

Cuando la conversación crece, el chat genera un **resumen compacto** cada 3
turnos: condensa lo hablado hasta ese momento y lo agrega al contexto, de modo
que el modelo sigue recordando el hilo sin que la conversación entera ocupe
la KV cache.

## Truncado de mensajes largos

Los mensajes de más de **5000 caracteres** se truncan. El texto se corta a la
longitud máxima y el resto se descarta, para que un mensaje gigante no
inunde el contexto ni el costo de VRAM.

## Ventanas largas con `--context-shift`

Para conversaciones que superan la ventana, llama-server usa
`--context-shift`: cuando el contexto se llena, desplaza la ventana en lugar
de reiniciarla, descartando la parte más vieja y conservando el final de la
conversación. Combinado con los resúmenes compactos, la sesión se mantiene
coherente aunque sea muy larga.

> **Nota:** el contexto se gestiona automáticamente: no hay controles de
> contexto en el chat. Si querés más ventana, ajustá el slider de Contexto del
> modelo en su panel de configuración — [Configuración](configuracion).

## Qué sigue

- [Requisitos de GPU](gpu) — qué modelos corren según tu VRAM.