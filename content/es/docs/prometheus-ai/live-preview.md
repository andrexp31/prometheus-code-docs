---
title: Live Preview
category: Prometheus AI
---

# Live Preview

Live Preview es la vista propia de Prometheus Code para desarrollo web: abrí
tu proyecto, tocá el botón y la web corre en vivo dentro del editor, sin
abrir un navegador. Es un pane propio del editor, con su propio servidor de
vite detrás.

## La web en vivo, dentro del editor

Live Preview arranca un servidor de vite estable (execPath fijo, sin apertura
automática de navegador) y renderiza la página en un pane propio de la vista
del editor. Cada cambio que guardás se refleja al instante, con la recarga en
vivo de vite:

![Pane de Live Preview mostrando la web corriendo dentro del editor](/assets/live-preview.png)

> **Tip:** como no abre ninguna ventana del navegador, es ideal para iterar
> rápido sin cambiar de ventana, y deja el navegador libre para lo que
> necesites.

## Cuándo usarlo

| Situación | Conviene |
|---|---|
| Iterar un componente o página | Live Preview |
| Probar responsive y devtools completos | navegador aparte |
| Ver el resultado de la IA sobre tu código | Live Preview, con el chat al lado |

La web se ejecuta con vite: el servidor propio del editor compila y sirve el
proyecto en vivo, con recarga al guardar.

## Qué sigue

- [Extensiones (Open VSX)](../conservadas/extensiones) — herramientas de frontend desde el
  registro abierto.
- [Terminal integrada](../conservadas/terminal) — correr el proyecto desde la terminal
  mientras ves el preview.
- [Temas](../conservadas/temas) — dejar el editor a tu gusto.