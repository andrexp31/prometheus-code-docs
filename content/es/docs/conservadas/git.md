---
title: Git y control de versiones
category: Funciones conservadas
---

# Git y control de versiones

El control de versiones de VS Code está conservado en Prometheus Code: si tu
proyecto es un repositorio Git, el editor detecta los cambios al instante y te
deja hacer todo el flujo — staging, commits, diff, ramas y sincronización —
sin salir del editor.

## El panel de control de código fuente

El icono de ramas de la barra de actividades abre el panel de control de
código fuente. Ahí ves los cambios pendientes, con los archivos modificados,
nuevos y eliminados:

1. **Stage:** clic en el `+` sobre un archivo (o **Stage All Changes** en el
   encabezado) para pasarlo al área de staging.
2. **Commit:** escribí el mensaje en el campo de arriba y confirmá con
   `Ctrl+Enter`.
3. **Sync:** el icono de sincronización hace push/pull del remoto.

## Diff integrado

Clic sobre un archivo modificado abre el **diff lado a lado**: a la izquierda
la versión anterior, a la derecha la actual, con las líneas agregadas y
eliminadas resaltadas. Desde el propio diff podés revertir cambios puntuales
antes de commitear.

> **Nota:** el diff funciona también contra el último commit y contra
> cualquier versión del historial, no solo contra los cambios sin guardar.

## Ramas

| Acción | Dónde |
|---|---|
| Crear rama | clic en el nombre de la rama en la barra de estado |
| Cambiar de rama | menú de ramas de la barra de estado |
| Ver ramas y remotos | panel → **Ver ramas** |

El editor no pide credenciales de más: las que ya tenés configuradas en el
sistema (SSH, token) se reusan tal cual.

## Qué sigue

- [Terminal integrada](terminal) — el shell del proyecto dentro del editor.
- [Debugging](debugging) — ejecutar y depurar el código con breakpoints.
- [Extensiones (Open VSX)](extensiones) — herramientas de Git adicionales
  desde el registro abierto.