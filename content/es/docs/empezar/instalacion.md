---
title: Descarga e instalación
category: Empezar
---

# Descarga e instalación

Prometheus Code es un fork de VS Code (Code - OSS) con identidad propia:
integra modelos LLM locales, chat de IA y agentes automáticos directamente en
el editor, sin telemetría y sin nube. Se distribuye como paquete nativo de
Linux.

> **Pago único, sin registro:** Pagás una sola vez y no hay suscripciones,
> ni cuentas, ni descargas condicionadas: instalás y el editor queda listo
> para usar.

## Paquetes

| Plataforma | Formato |
|---|---|
| Linux (Debian/Ubuntu) | `.deb` |
| Linux (cualquier distro) | `.tar.gz` |
| Linux (portable) | `.AppImage` |

Elegí el paquete para tu distribución, instalalo como de costumbre y buscá
**Prometheus Code** en el menú de aplicaciones.

> **Nota:** el editor completo viene en el paquete. El motor de modelos locales
> (llama-server) se compila automáticamente la primera vez que lo encendés —
> lo vemos en [Primeros pasos](primeros-pasos).

## Requisitos del sistema

| Recurso | Mínimo | Recomendado |
|---|---|---|
| RAM | 8 GB | 16 GB |
| Disco | 10 GB | 20 GB |

Para los modelos locales con aceleración por GPU necesitás además una GPU
NVIDIA con CUDA (llama-server se compila con soporte CUDA al primer uso). Sin
GPU, todo funciona igual por CPU, con menor velocidad de respuesta.

## Primera ejecución

Al abrir Prometheus Code por primera vez, el editor arranca con la ventana de
bienvenida, que resume las funciones principales: modelos locales, chat de
Prometheus AI, agentes automáticos, terminal integrada, privacidad total y Git
y debugging conservados de VS Code.

![Ventana de bienvenida de Prometheus Code al abrir el editor](/assets/editor-bienvenida.png)

> **Tip:** usá `Ctrl+Shift+P` para abrir la barra de comandos y buscar
> cualquier acción, igual que en VS Code. Todo lo que conocés del editor sigue
> acá.

## Qué sigue

Con el editor instalado, el siguiente paso es encender el motor local y hacer
tu primer chat con Prometheus AI: [Primeros pasos](primeros-pasos).