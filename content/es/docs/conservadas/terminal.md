---
title: Terminal integrada
category: Funciones conservadas
---

# Terminal integrada

La terminal integrada del panel inferior es la misma de VS Code, conservada
tal cual: una terminal real, sin emulación web ni contenedores. Abrí una con
`Ctrl+`` o desde el menú **Terminal → Nueva terminal**, y tenés tu shell
completo dentro del editor.

## Fish por defecto, zsh y bash también

Prometheus Code arranca con **fish** como shell por defecto. Si preferís
otro, la terminal integrada detecta los shells instalados en el sistema y
podés elegir zsh o bash desde el menú desplegable de la terminal:

| Shell | Cómo seleccionarla |
|---|---|
| fish | por defecto |
| zsh | menú de la terminal → **Seleccionar perfil predeterminado** |
| bash | menú de la terminal → **Seleccionar perfil predeterminado** |

> **Tip:** cada terminal abre en la carpeta abierta en el editor, así que los
> comandos corren directamente sobre tu proyecto.

## Varias terminales en paralelo

Podés abrir tantas terminales como quieras y organizarlas a tu gusto:

| Atajo | Acción |
|---|---|
| `Ctrl+`` | abrir/cerrar la terminal |
| `Ctrl+Shift+5` | dividir la terminal actual |
| menú de la terminal | renombrar, reorganizar, cerrar |

Cada terminal tiene su propio historial y su shell; dividirlas te deja, por
ejemplo, correr el servidor en una y los tests en la otra.

## Shell integration

La terminal integrada detecta el prompt del shell (shell integration) y con
eso habilita extras: saltar al final de la salida, navegar por bloques de
comandos y un exit code confiable para saber si el comando funcionó. En fish
esto funciona por defecto.

## La terminal de la IA es otra cosa

Prometheus AI también ejecuta comandos, pero no en tu terminal: los corre en
una terminal propia embebida dentro del chat, con salida completa y exit code
(`(exit code: 0)`). Además puede pedirte correr comandos en tu terminal
integrada con `run_in_terminal` y lee la salida completa del resultado. Lo
detallamos en [Terminal IA embebida](../prometheus-ai/terminal).

## Qué sigue

- [Git y control de versiones](git) — staging, commits y diff desde el editor.
- [Debugging](debugging) — breakpoints, launch.json y el panel de depuración.
- [Live Preview](live-preview) — la web corriendo en vivo dentro del editor.