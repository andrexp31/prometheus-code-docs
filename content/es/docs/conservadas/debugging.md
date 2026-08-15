---
title: Debugging
category: Funciones conservadas
---

# Debugging

El debugger integrado de VS Code se conserva completo en Prometheus Code:
configurás el lanzamiento en `launch.json`, ponés breakpoints y depurás con el
panel de ejecución y depuración, todo dentro del editor.

## Configurar con launch.json

Abrí la vista de **Ejecutar y depurar** (icono ▶ de la barra de actividades) y
elegí **Crear un archivo launch.json**. El editor genera una plantilla con las
configuraciones de lanzamiento para el tipo de proyecto que detecta (Node.js,
Python, etc.) en `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Iniciar programa",
      "program": "${workspaceFolder}/src/index.js"
    }
  ]
}
```

Elegí la configuración en el desplegable de arriba y presioná **F5**.

## Breakpoints

Un clic en el margen izquierdo del editor pone (o quita) un breakpoint: la
línea se marca en rojo y la ejecución se detiene ahí. También podés usar
`F9` para alternarlo sin tocar el ratón.

> **Tip:** los breakpoints se guardan con el espacio de trabajo, así que
> quedan listos la próxima vez que abras el proyecto.

## El panel de depuración

Cuando la ejecución se detiene, el panel muestra el estado completo:

| Sección | Qué muestra |
|---|---|
| Variables | las variables del ámbito actual, con sus valores en vivo |
| Pila de llamadas | el stack hasta el punto de detención |
| Inspección | expresiones que definiste vos para seguir |
| Consola de depuración | comandos y logs en el contexto del programa |

Los controles estándar están siempre a mano: **Continuar** (F5), **Saltar**
(F10), **Entrar** (F11), **Salir** (Shift+F11) y **Detener** (Shift+F5).

## Qué sigue

- [Terminal integrada](terminal) — correr el proyecto y ver los logs.
- [Git y control de versiones](git) — commitear el código que quedó depurado.
- [Live Preview](live-preview) — el frontend en vivo dentro del editor.