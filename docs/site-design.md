# Spec — Sitio web de Prometheus Code (Worker Cloudflare + Workers Assets)

Fecha: 2026-08-15
Estado: diseño aprobado (mockups de alta fidelidad validados)
Proyecto: `/home/andrexp/Escritorio/prometheus-code-docs` (repo git propio)

## 1. Contexto y objetivo

Prometheus Code (fork de VS Code con identidad y funciones propias) necesita un
sitio web público que lo documente **todo**: funciones conservadas de VS Code +
funciones propias (modelos locales llama.cpp, 423 agentes automáticos, terminal
IA embebida, memoria persistente, historial de sesiones), con capturas de
pantalla reales de la aplicación.

El sitio replica la **estructura y estética de code.visualstudio.com** (nav
global, hero, secciones de features, sidebar de docs con categorías, TOC,
breadcrumbs, prev/next, feedback, footer), pero con identidad propia:
**"Prometheus Code: Libera tu código."**

Decisiones acordadas con el usuario:

1. **Enfoque técnico**: Workers Assets + build estático (markdown → HTML).
2. **Contenido**: híbrido — funciones conservadas de VS Code + funciones propias.
3. **Idiomas**: ES + EN con toggle (páginas separadas por idioma).
4. **Alcance V1**: Home + Docs core (17 páginas de docs por idioma + home).
5. **Capturas**: reales, aportadas por el usuario (copia en `content/assets/`).
   Los originales en el sistema son descartables; el proyecto es la fuente de
   verdad; Cloudflare sirve los assets en el edge.
6. **Deploy**: worker nuevo en workers.dev (dominio custom opcional a futuro).

## 2. Arquitectura

```
prometheus-code-docs/
├── wrangler.toml              # name = "prometheus-code-docs", [assets] → ./public
├── package.json               # script "build" + "marked" (dev dependency)
├── content/
│   ├── es/                    # markdown ES (una página por archivo)
│   │   ├── index.md           #   home ES
│   │   └── docs/**/*.md       #   páginas de docs ES
│   ├── en/
│   │   ├── index.md           #   home EN
│   │   └── docs/**/*.md       #   páginas de docs EN
│   └── assets/                # capturas reales (chat-llamacpp.png, hf-search.png, …)
├── scripts/
│   └── build.mjs              # markdown → HTML con shell compartido
├── src/
│   └── worker.js              # router mínimo: limpieza de rutas, 404, fallback a ASSETS
└── public/                    # GENERADO por el build (no versionado)
    ├── index.html             #   home ES
    ├── en/index.html          #   home EN
    ├── docs/…                 #   docs ES
    ├── en/docs/…              #   docs EN
    └── assets/                # imágenes, CSS, JS
```

- **Shell compartido** (generado por `build.mjs`): nav global, banner,
  breadcrumb, sidebar de docs por categorías, TOC (generado de los H2/H3),
  footer, toggle ES/EN. Una sola definición por idioma, reutilizada en todas
  las páginas.
- **Markdown con frontmatter**: `title`, `description`, `category`, `order`
  (para prev/next y orden del sidebar).
- **Worker mínimo**: sirve `env.ASSETS.fetch(request)` para todo; agrega
  redirects limpios (`/docs` → `/docs/`), 404 propio y headers de caché para
  assets inmutables. Sin framework.
- **Sin buscador en V1** (YAGNI): el campo de búsqueda del mockup **se omite**
  del header de docs en V1.

## 3. Home (ES/EN)

Replica el esquema aprobado en mockups (`home-hifi-v6.html`):

1. **Nav sticky**: logo "Prometheus Code", links (Funciones ▾, Docs, Descargas,
   Blog, FAQ, Recursos ▾), botón "Descargar", toggle idioma ES/EN.
2. **Banner** desestimable: "Nuevo: 423 agentes especializados + modelos
   locales llama.cpp integrados".
3. **Hero** (grilla + gradiente): "Prometheus Code" (rojo, tamaño > tagline) y
   "Libera tu código." (gradiente blanco-azulado, tamaño < brand), subtítulo,
   botones de descarga (Linux .deb / .rpm / Windows / macOS), links meta.
4. **"Agentes que construyen por vos"**: ventana de código (search_agents →
   use_agent → pytest) + texto con bullets.
5. **"Cualquier modelo, todo local"**: tiles (modelos locales, HF, chat ES,
   memoria, terminal IA, historial).
6. **CTA**: "Empezá a construir con IA gratis" — sin tarjeta, sin nube.
7. **"Un editor de clase mundial en su núcleo"**: ventana de código + chips de
   lenguajes.
8. **Grid de features conservadas**: terminal, run & debug, Git, **extensiones
   (Open VSX)**, temas, live preview, accesibilidad, web.
9. **Footer**: redes + links (soporte, privacidad, cookies, términos, licencia).

Paleta: fondo `#0d1117`, acento rojo `#ff7b72` (identidad Prometheus), acento
azul `#0078d4` (herencia VS Code), tipografías del sistema.

## 4. Docs (ES/EN)

Replica el mockup aprobado (`docs-layout-v4.html`):

- **Cabecera**: breadcrumb (Inicio › Docs › categoría › página), título,
  descripción.
- **Sidebar izquierda** sticky con 4 categorías (17 páginas en total):
  - Empezar (3 páginas): instalación, primeros pasos, FAQ.
  - Modelos locales (4 páginas): configuración, búsqueda HF, contexto y
    memoria, requisitos de GPU.
  - Prometheus AI (4 páginas): agentes automáticos, terminal IA embebida,
    memoria persistente, historial y sesiones.
  - Funciones conservadas (6 páginas): terminal, Git, debugging, extensiones
    (Open VSX), live preview, temas.
- **Contenido**: H1, párrafos, callouts, bloques de código con botón copiar,
  imágenes reales (`chat-llamacpp.png` en "Integración con Prometheus AI",
  `hf-search.png` en "Búsqueda en Hugging Face"), feedback "¿Te resultó
  útil?", prev/next.
- **TOC derecha** sticky ("En esta página") con los H2 del contenido.
- El contenido de cada página se escribe desde el conocimiento real del
  codebase (lo implementado en las últimas sesiones: HF limit=20, context
  shift, KV quant, resúmenes de contexto, search_agents, terminal AI con exit
  code, etc.).

## 5. i18n (ES/EN)

- Páginas físicas separadas: `/` (ES), `/en` (EN); `/docs/…` (ES),
  `/en/docs/…` (EN).
- Toggle en el nav: link a la ruta equivalente del otro idioma (misma página).
- Home raíz = ES (público principal del usuario); `Accept-Language` se ignora
  en V1.

## 6. Worker y despliegue

- `wrangler.toml`: `name = "prometheus-code-docs"`, `compatibility_date`
  reciente, `[assets] directory = "./public"`.
- `npm run build` (build.mjs) → `public/`; `wrangler dev` local para probar;
  `wrangler deploy` publica en `prometheus-code-docs.<subdomain>.workers.dev`.
- Dominio custom (ej. docs.2-heads.com) queda como paso opcional post-V1.
- Caché: assets inmutables con long cache; HTML con caché corta (por defecto de
  Workers Assets).

## 7. Verificación

- Build sin errores; `wrangler dev` sirve home y todas las rutas de docs en
  ambos idiomas.
- Toggle ES/EN mantiene la página equivalente; imágenes cargan desde
  `/assets/`.
- `wrangler deploy` exitoso; sitio accesible en workers.dev.
- Pruebas con browser-automation (Playwright): navegación, sidebar, TOC,
  toggle, imágenes, 404.

## 8. Fuera de alcance (V2)

- Buscador funcional.
- Blog, FAQ amplio, página de descargas con checksums.
- Dominio custom, analytics, versión EN profunda si no alcanza en V1.