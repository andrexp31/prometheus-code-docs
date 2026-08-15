---
title: Memoria persistente
category: Prometheus AI
---

# Memoria persistente

Prometheus AI recuerda entre sesiones. Lo que se consolida en un chat queda
guardado en el storage del editor, y el modelo lo recupera cuando volvés a
abrir el editor — aunque cierres la ventana y la reabras al día siguiente.

## Memoria entre sesiones

La memoria vive en el storage local del editor, bajo la clave
`prometheus.ai.chat.memory.v1`. El modelo escribe entradas cuando detecta
datos estables en la conversación: tu nombre, el idioma que preferís, el
stack del proyecto en el que trabajás, decisiones que se tomaron. En la
sesión siguiente, esa información ya está disponible desde el primer mensaje,
sin que tengas que repetirla.

> **Nota:** no es un registro de lo que hablaste: es una memoria resumida, de
> datos que valen a futuro.

## Cómo se guarda

| Dato | Valor |
|---|---|
| Almacenamiento | storage local del editor |
| Clave | `prometheus.ai.chat.memory.v1` |
| Entradas | máximo 20 |

Todo queda en tu máquina: la memoria no se envía a ningún servidor. Cuando se
llega a las 20 entradas, las más viejas se descartan para hacer lugar a las
nuevas.

## Resúmenes compactos para modelos locales

Los modelos locales tienen una ventana de contexto limitada: cargar la
memoria entera de golpe gastaría KV cache de más. Por eso, para modelos
locales la memoria se entrega como **resúmenes compactos**: el contenido
esencial de cada entrada, condensado en pocas líneas, listo para entrar en el
contexto sin ocupar de más. El modelo sigue teniendo los datos que importan,
a una fracción del costo. Lo detallamos en [Contexto y memoria](../modelos/contexto).

## Qué sigue

- [Agentes automáticos (423)](agentes) — los especialistas del chat.
- [Terminal IA embebida](terminal) — la terminal oculta donde corren los
  comandos.
- [Historial y sesiones](historial) — conversaciones anteriores.