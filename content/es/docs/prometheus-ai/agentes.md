---
title: Agentes automáticos (423)
category: Prometheus AI
---

# Agentes automáticos (423)

Los agentes son especialistas con instrucciones propias: un agente de testing
sabe generar y correr tests de pytest, un agente de Rust conoce las
convenciones de cargo, y así hasta 423 perfiles. Prometheus AI los busca, los
adopta y trabaja con ellos dentro del chat, sin que tengas que configurar
nada.

## De dónde salen los 423 agentes

El catálogo combina dos fuentes:

| Fuente | Qué aporta |
|---|---|
| AI Templates de GitHub | los agentes del catálogo abierto de plantillas de IA |
| Instalados en tu sistema | los que tenés en `~/.claude/agents` (globales) y en `.claude/agents` del workspace (por proyecto) |

Algunos vienen con el editor y otros los instalaste vos o tu equipo; todos
aparecen en el mismo catálogo y Prometheus AI los trata igual.

## El catálogo siempre a mano

Desde agosto de 2026, el catálogo completo —nombres, categorías y
descripciones— se inyecta en el contexto del chat. Prometheus AI conoce todos
los agentes desde el primer mensaje, sin necesidad de buscarlos primero.

Para no gastar contexto de más, la inyección tiene un presupuesto de tokens
con degradación:

| Si el catálogo… | Se inyecta… |
|---|---|
| cabe en el presupuesto | catálogo completo (nombre, categoría y descripción de cada agente) |
| excede el presupuesto | solo los nombres |
| todavía excede | los 20 agentes por categoría más relevantes |

En la práctica casi siempre entra el catálogo completo; la degradación solo
aparece con modelos de ventana de contexto muy chica.

## Buscar agentes

Además del catálogo inyectado, el chat expone `search_agents` para búsquedas
por palabras clave:

```text
search_agents("testing python", "Development")
```

Cada agente recibe un puntaje según dónde aparezcan las palabras:

| Campo | Peso |
|---|---|
| Nombre | ×3 |
| Descripción | ×2 |
| Categoría | ×1 |

Los resultados se ordenan por puntaje y se devuelven los **10 mejores**.
También está `list_agents(category)`, que lista hasta 50 agentes de una
categoría — útil para recorrer un área entera.

> **Tip:** buscá por lo que el agente hace, no por su nombre: "rest api" o
> "django" encuentran más que recordar nombres exactos.

## Adoptar un agente

Cuando Prometheus AI elige un agente, ejecuta `use_agent` con su nombre y la
conversación continúa en ese rol: las instrucciones del agente se inyectan en
el contexto del modelo y de ahí en más responde como el especialista
correspondiente.

```text
use_agent("python-tester")
→ Adoptando rol: python-tester…
```

> **Nota:** adoptar un agente no cambia nada de tu entorno: no se instala
> nada y no toca tu configuración. Solo es contexto que el modelo pasa a
> tener en cuenta.

## Autonomía en el chat

Las herramientas de agentes (`search_agents`, `list_agents`, `use_agent`)
están **siempre disponibles** en el chat: no dependen de ninguna selección
manual. El system prompt de autonomía (en el idioma del editor, español o
inglés) le indica al modelo que puede buscar y adoptar agentes por su cuenta
cuando la tarea lo amerite — vos pedís el resultado, no la herramienta.

## En el chat

Así se ve una conversación real donde Prometheus AI busca y adopta un agente
por su cuenta:

![Prometheus AI buscando y adoptando un agente en el chat](/assets/agentes-chat-1.png)

Y otro ejemplo de la misma conversación, con la búsqueda y el agente ya
adoptado:

![Búsqueda y adopción de agente en el chat](/assets/agentes-chat-2.png)

## Qué sigue

- [Terminal IA embebida](terminal) — la terminal oculta donde corren los
  comandos.
- [Memoria persistente](memoria) — lo que Prometheus AI recuerda entre
  sesiones.
- [Historial y sesiones](historial) — conversaciones anteriores.