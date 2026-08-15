---
title: Terminal IA embebida
category: Prometheus AI
---

# Terminal IA embebida

Cuando Prometheus AI necesita ejecutar un comando, corre en una terminal
propia, oculta dentro del chat. Es una terminal real de fish, embebida como
un bloque más de la conversación (PrometheusTerminalToolPart) y renderizada
en vivo con xterm. Tu terminal no se toca: la de la IA vive como un mensaje
más de la conversación.

## Una terminal oculta para la IA

La terminal del modelo no aparece en el panel de terminales del editor: es
invisible salvo dentro del chat. Cada comando que ejecuta la IA es un bloque
con su propia línea de prompt, su salida en vivo y su resultado:

```text
$ pytest tests/ --maxfail=1
✓ 184 tests passed  (exit code: 0)
```

## Salida completa con exit code

Cuando el comando termina, el bloque muestra la salida y el código de salida
al final, como `(exit code: 0)` o `(exit code: 1)`. Con eso Prometheus AI
sabe si el comando funcionó y puede reaccionar en consecuencia — por ejemplo,
volver a correr los tests después de un fix.

## Contraseñas protegidas

Si un comando pide una contraseña (por ejemplo `sudo`), el chat activa el
**gating de contraseñas**: la terminal deja de transmitir su contenido hacia
la IA y la contraseña queda fuera de la conversación. La tipeás vos, y el
modelo solo ve el resultado del comando.

> **Nota:** así un comando con secretos nunca deja la contraseña registrada
> en el historial del chat.

## Espera de prompt (shell integration)

Antes de dar la salida por terminada, la terminal espera a que el comando
llegue de nuevo al prompt de fish. Eso se detecta con shell integration
cuando está disponible; si no, se usa un fallback por silencio: si no hay
salida nueva durante un tiempo, el comando se considera terminado. La salida
se captura completa, sin cortes por tiempo.

## Límites

| Límite | Valor |
|---|---|
| Tiempo máximo por comando (deadline) | 10 minutos |
| Salida mostrada | truncada a 8000 caracteres |

Pasado el deadline, el comando se interrumpe y la IA lo sabe. La salida se
trunca a 8000 caracteres para que un comando verboso no inunde el contexto de
la conversación.

> **Tip:** si un comando va a tardar mucho, partilo en pasos más chicos o
> pedile a la IA que lo corra en segundo plano con redirección a un archivo.

## Qué sigue

- [Agentes automáticos (423)](agentes) — los especialistas que usan esta
  terminal.
- [Memoria persistente](memoria) — lo que Prometheus AI recuerda entre
  sesiones.
- [Historial y sesiones](historial) — conversaciones anteriores.