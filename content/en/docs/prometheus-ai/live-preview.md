---
title: Live Preview
category: Prometheus AI
---

# Live Preview

Live Preview is Prometheus Code's own view for web development: open your
project, hit the button and the web runs live inside the editor, without
opening a browser. It is a dedicated pane of the editor, with its own vite
server behind it.

## The web live, inside the editor

Live Preview starts a stable vite server (fixed execPath, no automatic
browser opening) and renders the page in a dedicated pane of the editor view.
Every change you save is reflected instantly, with vite's live reload:

![Live Preview pane showing the web running inside the editor](/assets/live-preview.png)

> **Tip:** since it does not open any browser window, it is great for fast
> iteration without switching windows, and it leaves your browser free for
> what you need.

## When to use it

| Situation | Use |
|---|---|
| Iterating on a component or page | Live Preview |
| Testing responsive and full devtools | separate browser |
| Seeing the AI's result on your code | Live Preview, chat beside it |

The web is served with vite: the editor's own server compiles and serves the
project live, with reload on save.

## What's next

- [Extensions (Open VSX)](../conservadas/extensiones) — frontend tools from the open
  registry.
- [Integrated Terminal](../conservadas/terminal) — run the project from the terminal while
  watching the preview.
- [Themes](../conservadas/temas) — make the editor your own.