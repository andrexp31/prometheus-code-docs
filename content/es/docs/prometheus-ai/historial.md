---
title: Historial y sesiones
category: Prometheus AI
---

# Historial y sesiones

Cada conversación con Prometheus AI es una sesión, y las sesiones anteriores
quedan guardadas. Podés volver a una conversación vieja y continuarla donde
quedó, o reiniciar la conversación actual y empezar de cero cuando quieras.

## Sesiones guardadas

Las sesiones se guardan en el storage local del editor, bajo la clave
`prometheus.ai.chat.sessions.v1`, con un máximo de **50 sesiones**. Las más
viejas se descartan automáticamente cuando se llega al límite.

| Dato | Valor |
|---|---|
| Almacenamiento | storage local del editor |
| Clave | `prometheus.ai.chat.sessions.v1` |
| Sesiones | máximo 50 |

Todo queda en tu máquina: el historial no se envía a ningún servidor.

## Vista de historial en el chat

El chat incluye una vista de historial donde aparecen las sesiones
anteriores, identificadas por su primer mensaje. Un clic abre la sesión y la
conversación queda lista para continuar.

## Continuar una conversación

Al abrir una sesión anterior, el chat vuelve a donde quedó: los mensajes
siguen en pantalla y el modelo recupera el contexto de esa conversación.
Cerrar el editor no pierde nada: la sesión queda guardada y reaparece intacta
la próxima vez.

> **Tip:** si trabajás en varios proyectos, alterná entre sesiones según el
> tema — cada una conserva su propio hilo.

## Reiniciar la conversación

Cuando preferís empezar de nuevo, reiniciá la sesión actual: el chat se
limpia y la conversación arranca desde cero. La sesión anterior no se pierde:
queda en el historial, y podés volver a ella cuando quieras.

## Qué sigue

- [Agentes automáticos (423)](agentes) — los especialistas del chat.
- [Terminal IA embebida](terminal) — la terminal oculta donde corren los
  comandos.
- [Memoria persistente](memoria) — lo que Prometheus AI recuerda entre
  sesiones.