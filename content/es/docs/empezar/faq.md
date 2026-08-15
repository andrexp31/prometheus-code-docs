---
title: Preguntas frecuentes
category: Empezar
---

# Preguntas frecuentes

## ¿Es gratis?

Sí. Prometheus Code es MIT: el editor es gratis, sin suscripciones, sin
cuentas y sin funciones bloqueadas. Los modelos locales son de código abierto
(GGUF) y las extensiones del ecosistema se instalan desde Open VSX.

> **No hay versión de pago:** nada del editor depende de un plan pago. Lo
> único opcional es una GPU mejor, que solo acelera las respuestas.

## ¿Necesito una GPU?

No. Prometheus Code funciona con cualquier procesador, y los modelos locales
se ejecutan por CPU si no tenés GPU. Con una GPU NVIDIA, llama-server se
compila con soporte CUDA y las respuestas son mucho más rápidas (las capas se
descargan en VRAM desde el panel LlamaCpp).

## ¿Puedo usar los modelos que ya tengo en Ollama?

Sí. Prometheus Code usa el mismo `llama-server` que Ollama, en el mismo
puerto (11434). Los modelos GGUF que ya descargaste se pueden apuntar desde el
panel LlamaCpp y funcionan sin cambios. Los modelos también se pueden
descargar directamente desde el catálogo de Hugging Face integrado.

## ¿Es un fork de VS Code?

Sí, es un fork de VS Code (Code - OSS). Conserva todo lo que ya conocés:
edición, debugging, Git integrado, terminal y extensiones. Por encima suma
identidad propia: modelos locales, chat de Prometheus AI y agentes automáticos
que trabajan en tu proyecto.

## ¿Qué extensiones puedo instalar?

Prometheus Code usa **Open VSX**, el marketplace abierto de extensiones de VS
Code. Además, el editor incluye el **Prometheus Code Extension Pack**, que
instala la extensión **Prometheus AI** y el resto del ecosistema del editor.

## ¿Mis datos se envían a la nube?

No. Prometheus Code no tiene telemetría y los modelos corren localmente en tu
máquina: tus archivos, chats y configuraciones no salen del equipo. Solo
necesitás conexión para descargar un modelo desde Hugging Face, y después
podés trabajar sin conexión.

## ¿En qué sistemas operativos funciona?

Prometheus Code se distribuye para Linux (`.deb`, `.tar.gz` y `.AppImage`).
Si trabajás desde el código fuente, se compila en Linux, Windows y macOS.