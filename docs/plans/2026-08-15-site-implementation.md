# Sitio web de Prometheus Code — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar en un Worker de Cloudflare un sitio estático (ES/EN) con Home + 17 páginas de docs que documentan Prometheus Code, replicando la estructura de code.visualstudio.com.

**Architecture:** Contenido markdown (ES/EN) + parciales HTML para el home → script `scripts/build.mjs` (node + marked) genera el HTML final con shell compartido (nav, sidebar, TOC, breadcrumb, footer) → `public/` servido por un Worker mínimo con Workers Assets.

**Tech Stack:** Cloudflare Workers + Workers Assets, wrangler 4.107, node ≥ 24, `marked` (dev dependency), HTML/CSS vanilla (sin frameworks).

## Global Constraints

- Repo: `/home/andrexp/Escritorio/prometheus-code-docs` (git ya inicializado, rama `main`).
- Paleta: fondo `#0d1117`, acento rojo `#ff7b72`, acento azul `#0078d4`, texto `#e6edf3`, secundario `#9da7b3`.
- Hero: "Prometheus Code" en rojo, tamaño `clamp(44px, 7vw, 78px)`; "Libera tu código." con gradiente blanco-azulado, tamaño `clamp(36px, 5.5vw, 62px)`.
- Extensiones → "Open VSX, libre y abierto" (nunca "Marketplace de VS Code").
- Idiomas: `/` = ES, `/en` = EN; docs en `/docs/…` y `/en/docs/…`; toggle mantiene página equivalente.
- Capturas: SOLO las que el usuario aporte (flujo colaborativo). Ya aportadas: `chat-llamacpp.png`, `hf-search.png`. Sin placeholders de imágenes.
- Sin buscador funcional en V1. Sin dependencias runtime (solo `marked` como dev dep).
- Cada commit: mensaje convencional en español (`feat:`, `docs:`, `chore:`).

---

### Task 1: Scaffold del proyecto (wrangler, package, build esqueleto)

**Files:**
- Create: `wrangler.toml`
- Create: `package.json`
- Create: `scripts/build.mjs` (esqueleto que copia assets)
- Create: `content/assets/.gitkeep`
- Create: `public/.gitkeep`

**Interfaces:**
- Produces: `npm run build` (copia `content/assets/*` → `public/assets/`); `npm run smoke` (verifica estructura esperada de `public/`); `wrangler dev`/`deploy` usan `[assets] directory = "./public"`.

- [ ] **Step 1: Crear `wrangler.toml`**

```toml
name = "prometheus-code-docs"
main = "src/worker.js"
compatibility_date = "2026-08-01"

[assets]
directory = "./public"
binding = "ASSETS"
not_found_handling = "single-page-application"
```

- [ ] **Step 2: Crear `package.json`**

```json
{
  "name": "prometheus-code-docs",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "node scripts/build.mjs",
    "smoke": "node scripts/smoke.mjs",
    "dev": "wrangler dev --local"
  },
  "devDependencies": {
    "marked": "^15.0.0",
    "wrangler": "^4.107.0"
  }
}
```

- [ ] **Step 3: Instalar dependencias**

Run: `npm install`
Expected: `marked` y `wrangler` instalados, sin errores.

- [ ] **Step 4: Crear `scripts/build.mjs` (esqueleto: copia de assets)**

```js
import { mkdir, copyFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const CONTENT = join(ROOT, 'content');
const PUBLIC = join(ROOT, 'public');

await mkdir(join(PUBLIC, 'assets'), { recursive: true });
for (const f of await readdir(join(CONTENT, 'assets'))) {
  await copyFile(join(CONTENT, 'assets', f), join(PUBLIC, 'assets', f));
}
console.log(`[build] assets copiados: ${(await readdir(join(PUBLIC, 'assets'))).join(', ') || '(ninguno)'}`);
```

- [ ] **Step 5: Crear `scripts/smoke.mjs` (verificación mínima)**

```js
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const PUBLIC = join(ROOT, 'public');
const required = process.argv.slice(2);
let failed = false;
for (const p of required) {
  const full = join(PUBLIC, p);
  const ok = existsSync(full) && readFileSync(full).length > 0;
  console.log(`${ok ? 'OK ' : 'FAIL'} ${p}`);
  if (!ok) failed = true;
}
process.exit(failed ? 1 : 0);
```

- [ ] **Step 6: Probar build**

Run: `npm run build`
Expected: `[build] assets copiados: (ninguno)` (o lista si ya hay archivos).

- [ ] **Step 7: Commit**

```bash
git add wrangler.toml package.json package-lock.json scripts/ content/assets/.gitkeep public/.gitkeep
git commit -m "chore: scaffold del sitio (wrangler assets + build + smoke)"
```

---

### Task 2: Shell compartido y build de páginas (build.mjs completo + templates)

**Files:**
- Create: `scripts/templates.js` (función `renderShell(lang, page)` que produce el HTML completo con nav, banner, sidebar, TOC, breadcrumb, footer, toggle)
- Create: `scripts/build.mjs` (completo: lee markdown, frontmatter, renderiza docs y home)
- Create: `content/es/docs/empezar/instalacion.md` (página de ejemplo, ver Task 5)
- Create: `content/en/docs/empezar/instalacion.md`

**Interfaces:**
- `renderShell(lang, { title, description, html, breadcrumb, sidebar, toc, prev, next, activePath })` → string HTML completo.
- `build.mjs` exporta `build()`; smoke verifica archivos generados.

- [ ] **Step 1: Crear `scripts/templates.js`**

Contenido del archivo (completo):

```js
export const LANG = {
  es: {
    nav: { funciones: 'Funciones', docs: 'Docs', descargas: 'Descargas', blog: 'Blog', faq: 'FAQ', recursos: 'Recursos', descargar: 'Descargar', en: 'EN' },
    banner: '<b>Nuevo:</b> 423 agentes especializados + modelos locales llama.cpp integrados — sin nube, sin suscripción',
    footer: ['Soporte', 'Privacidad', 'Gestión de cookies', 'Términos de uso', 'Licencia'],
    social: ['GitHub', 'X', 'YouTube', 'Reddit'],
  },
  en: {
    nav: { funciones: 'Features', docs: 'Docs', descargas: 'Downloads', blog: 'Blog', faq: 'FAQ', recursos: 'Resources', descargar: 'Download', en: 'ES' },
    banner: '<b>New:</b> 423 specialized agents + integrated local llama.cpp models — no cloud, no subscription',
    footer: ['Support', 'Privacy', 'Manage cookies', 'Terms of use', 'License'],
    social: ['GitHub', 'X', 'YouTube', 'Reddit'],
  },
};

export function renderShell(lang, page) {
  const t = LANG[lang];
  const alt = lang === 'es' ? 'en' : 'es';
  const base = lang === 'es' ? '' : '/en';
  const altBase = lang === 'es' ? '/en' : '';
  const togglePath = (page.activePath.startsWith('/docs') ? altBase + page.activePath : altBase + '/');
  const sidebar = page.sidebar ? `<aside class="sidebar">${page.sidebar}</aside>` : '';
  const toc = page.toc ? `<aside class="toc"><div class="t">${lang === 'es' ? 'En esta página' : 'On this page'}</div>${page.toc}</aside>` : '';
  const crumb = page.breadcrumb ? `<div class="crumb">${page.breadcrumb}</div>` : '';
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${page.title}</title>
<link rel="stylesheet" href="${base}/assets/site.css">
</head>
<body>
<nav class="nav"><div class="wrap nav-inner">
  <div class="logo"><div class="logo-badge">▲</div> Prometheus Code</div>
  <div class="nav-links">
    <a href="${base}/#features">${t.nav.funciones} ▾</a>
    <a href="${base}/docs/empezar/instalacion" class="${page.activePath.startsWith('/docs') ? 'active' : ''}">${t.nav.docs}</a>
    <a href="${base}/#descargas">${t.nav.descargas}</a>
    <span>${t.nav.blog}</span><span>${t.nav.faq}</span><span>${t.nav.recursos} ▾</span>
  </div>
  <div class="nav-right">
    <a class="lang-toggle" href="${togglePath}">${t.nav.en}</a>
    <a class="btn-download" href="${base}/#descargas">${t.nav.descargar}</a>
  </div>
</div></nav>
<div class="banner"><span class="x">✕</span>${t.banner}</div>
<div class="wrap layout">
  ${sidebar}
  <main>${crumb}${page.html}</main>
  ${toc}
</div>
<footer><div class="wrap foot-row">
  <span>🌐 ${t.social[0]}</span><span>🐦 ${t.social[1]}</span><span>📺 ${t.social[2]}</span><span>💬 ${t.social[3]}</span>
  <div class="foot-links">${t.footer.map(f => `<span>${f}</span>`).join('')}</div>
</div></footer>
</body>
</html>`;
}

export function buildSidebar(lang, activePath) {
  const cats = lang === 'es' ? [
    ['Empezar', [['docs/empezar/instalacion', 'Descarga e instalación'], ['docs/empezar/primeros-pasos', 'Primeros pasos'], ['docs/empezar/faq', 'Preguntas frecuentes']]],
    ['Modelos locales', [['docs/modelos/configuracion', 'Configuración'], ['docs/modelos/busqueda-hf', 'Búsqueda en Hugging Face'], ['docs/modelos/contexto', 'Contexto y memoria'], ['docs/modelos/gpu', 'Requisitos de GPU']]],
    ['Prometheus AI', [['docs/prometheus-ai/agentes', 'Agentes automáticos (423)'], ['docs/prometheus-ai/terminal', 'Terminal IA embebida'], ['docs/prometheus-ai/memoria', 'Memoria persistente'], ['docs/prometheus-ai/historial', 'Historial y sesiones']]],
    ['Funciones conservadas', [['docs/conservadas/terminal', 'Terminal integrada'], ['docs/conservadas/git', 'Git y control de versiones'], ['docs/conservadas/debugging', 'Debugging'], ['docs/conservadas/extensiones', 'Extensiones (Open VSX)'], ['docs/conservadas/live-preview', 'Live Preview'], ['docs/conservadas/temas', 'Temas']]],
  ] : [
    ['Getting Started', [['docs/empezar/instalacion', 'Download & Install'], ['docs/empezar/primeros-pasos', 'First Steps'], ['docs/empezar/faq', 'FAQ']]],
    ['Local Models', [['docs/modelos/configuracion', 'Configuration'], ['docs/modelos/busqueda-hf', 'Hugging Face Search'], ['docs/modelos/contexto', 'Context & Memory'], ['docs/modelos/gpu', 'GPU Requirements']]],
    ['Prometheus AI', [['docs/prometheus-ai/agentes', 'Automatic Agents (423)'], ['docs/prometheus-ai/terminal', 'Embedded AI Terminal'], ['docs/prometheus-ai/memoria', 'Persistent Memory'], ['docs/prometheus-ai/historial', 'History & Sessions']]],
    ['Preserved Features', [['docs/conservadas/terminal', 'Integrated Terminal'], ['docs/conservadas/git', 'Git & Version Control'], ['docs/conservadas/debugging', 'Debugging'], ['docs/conservadas/extensiones', 'Extensions (Open VSX)'], ['docs/conservadas/live-preview', 'Live Preview'], ['docs/conservadas/temas', 'Themes']]],
  ];
  const base = lang === 'es' ? '' : '/en';
  return cats.map(([cat, items]) => `<div class="side-cat"><div class="cat">${cat}</div>` +
    items.map(([path, label]) => {
      const full = `${base}/${path}`;
      const cls = full === activePath ? ' class="active"' : '';
      return `<a href="${full}"${cls}>${label}</a>`;
    }).join('') + '</div>').join('');
}

export function buildToc(html) {
  const ids = [];
  const withIds = html.replace(/<h2[^>]*>(.*?)<\/h2>/g, (m, inner) => {
    const id = 's' + ids.length;
    ids.push(inner.replace(/<[^>]+>/g, ''));
    return `<h2 id="${id}">${inner}</h2>`;
  });
  const links = ids.map((t, i) => `<a href="#s${i}">${t}</a>`).join('');
  return { html: withIds, tocHtml: links };
}
```

- [ ] **Step 2: Completar `scripts/build.mjs`**

Reemplazar el esqueleto por:

```js
import { mkdir, copyFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { marked } from 'marked';
import { renderShell, buildSidebar, buildToc } from './templates.js';

const ROOT = new URL('..', import.meta.url).pathname;
const CONTENT = join(ROOT, 'content');
const PUBLIC = join(ROOT, 'public');

const LANGS = ['es', 'en'];
const base = (lang) => (lang === 'es' ? '' : '/en');

async function readPage(lang, path) {
  const file = join(CONTENT, lang, path + '.md');
  const raw = await readFile(file, 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const fm = {};
  if (m) {
    for (const line of m[1].split('\n')) {
      const kv = line.match(/^(\w+):\s*(.+)$/);
      if (kv) fm[kv[1]] = kv[2].replace(/^"|"$/g, '');
    }
  }
  const body = m ? m[2] : raw;
  const md = marked.parse(body, { async: false });
  return { ...fm, md };
}

for (const lang of LANGS) {
  const prefix = base(lang);
  const pages = [];
  for (const cat of ['empezar', 'modelos', 'prometheus-ai', 'conservadas']) {
    for (const f of await readdir(join(CONTENT, lang, 'docs', cat))) {
      if (f.endsWith('.md')) pages.push(`${cat}/${f.replace(/\.md$/, '')}`);
    }
  }
  for (const path of pages) {
    const page = await readPage(lang, `docs/${path}`);
    const { html: contentHtml, tocHtml } = buildToc(page.md);
    const fullPath = `${prefix}/docs/${path}`;
    const all = pages.slice();
    const idx = all.indexOf(path);
    const prev = idx > 0 ? all[idx - 1] : undefined;
    const next = idx < all.length - 1 ? all[idx + 1] : undefined;
    const prevNext = `<div class="prevnext">${prev ? `<a href="${prefix}/docs/${prev}">← ${prev}</a>` : '<span></span>'}${next ? `<a href="${prefix}/docs/${next}">${next} →</a>` : '<span></span>'}</div>`;
    const feedback = `<div class="feedback-box"><span>${lang === 'es' ? '¿Te resultó útil esta página?' : 'Was this page helpful?'}</span><span class="fb-btn">👍</span><span class="fb-btn">👎</span><span style="margin-left:auto;color:#8b949e">${page.title}</span></div>`;
    const html = renderShell(lang, {
      title: page.title,
      html: contentHtml + feedback + prevNext,
      breadcrumb: `${lang === 'es' ? 'Inicio' : 'Home'} › ${lang === 'es' ? 'Docs' : 'Docs'} › ${page.category ?? ''} › ${page.title}`,
      sidebar: buildSidebar(lang, fullPath),
      toc: tocHtml,
      activePath: fullPath,
    });
    const out = join(PUBLIC, lang === 'es' ? '' : 'en', 'docs', path + '.html');
    await mkdir(join(out, '..'), { recursive: true });
    await writeFile(out, html);
    console.log(`[build] ${fullPath}`);
  }
}

await mkdir(join(PUBLIC, 'assets'), { recursive: true });
for (const f of await readdir(join(CONTENT, 'assets'))) {
  await copyFile(join(CONTENT, 'assets', f), join(PUBLIC, 'assets', f));
}
console.log('[build] OK');
```

Nota: agregar `import { readFile } from 'node:fs/promises';` al top del archivo.

- [ ] **Step 3: Crear `public/assets/site.css`** — hoja de estilos completa del sitio (estilos de nav, banner, hero, layout docs, sidebar, toc, codewin, callout, feedback, footer, toggle). Basada en los mockups aprobados `home-hifi-v6.html` y `docs-layout-v4.html` (copiar sus reglas CSS y ajustar clases: `.layout` grid `260px 1fr 220px`, `.lang-toggle`, `.content`).

- [ ] **Step 4: Crear página de ejemplo `content/es/docs/empezar/instalacion.md`**

```markdown
---
title: Descarga e instalación
category: Empezar
---

# Descarga e instalación

Prometheus Code es un fork de VS Code con identidad propia. Se distribuye como
paquete nativo de Linux (deb y rpm), y también se puede ejecutar desde el
código fuente.

## Paquetes

| Plataforma | Formato |
|---|---|
| Linux (Debian/Ubuntu) | `.deb` |
| Linux (Fedora/Arch) | `.rpm` |
| Windows | `.exe` |
| macOS | `.dmg` |

## Desde el código fuente

```bash
git clone https://github.com/andrexp31/prometheus-code-desktop.git
cd prometheus-code-desktop/Prometheus-Code
npm install
npm run compile-client
```

## Captura requerida
- [ ] Usuario: captura de la ventana del editor recién abierto (bienvenida).
```

- [ ] **Step 5: Crear la versión EN de la página ejemplo** (mismo contenido en inglés, mismo frontmatter, misma sección "Captura requerida").

- [ ] **Step 6: Ejecutar build y verificar**

Run: `npm run build && npm run smoke es/docs/empezar/instalacion.html en/docs/empezar/instalacion.html`
Expected: `[build] OK`, `OK es/docs/empezar/instalacion.html`, `OK en/docs/empezar/instalacion.html`.

- [ ] **Step 7: Probar visualmente con wrangler dev**

Run: `npm run dev` (en background) y abrir `http://localhost:8787/docs/empezar/instalacion` y `http://localhost:8787/en/docs/empezar/instalacion`.
Expected: página con nav, sidebar, TOC, breadcrumb, prev/next y toggle ES/EN.

- [ ] **Step 8: Commit**

```bash
git add scripts/ public/assets/site.css content/es/docs/empezar/instalacion.md content/en/docs/empezar/instalacion.md
git commit -m "feat: shell compartido (nav/sidebar/toc/footer) + build markdown a HTML + página ejemplo"
```

---

### Task 3: Home ES/EN (hero + secciones del mockup aprobado)

**Files:**
- Create: `scripts/home.mjs` (genera `public/index.html` y `public/en/index.html` con el shell + hero y secciones, siguiendo `home-hifi-v6.html`)
- Modify: `scripts/build.mjs` (llamar a `home.mjs` al final del build)

**Interfaces:**
- `home.mjs` usa `renderShell` de `templates.js`; no requiere inputs.

- [ ] **Step 1: Crear `scripts/home.mjs`** — HTML del hero y secciones (nav, banner, hero con "Prometheus Code" rojo > "Libera tu código.", sección agentes con ventana de código search_agents/use_agent/pytest, tiles "Cualquier modelo, todo local", CTA, "Un editor de clase mundial", chips de lenguajes, grid de features con "Open VSX", footer) — con textos ES y EN (dos estructuras paralelas).

- [ ] **Step 2: Integrar en `scripts/build.mjs`** — agregar `import { buildHome } from './home.mjs';` y ejecutar `buildHome()` después del loop de docs.

- [ ] **Step 3: Verificar**

Run: `npm run build && npm run smoke index.html en/index.html`
Expected: OK para ambos.

- [ ] **Step 4: Verificar visualmente** con `wrangler dev`: `http://localhost:8787/` (ES) y `/en` (EN).

- [ ] **Step 5: Commit**

```bash
git add scripts/home.mjs scripts/build.mjs
git commit -m "feat: home ES/EN con hero y secciones del mockup aprobado"
```

---

### Task 4: Worker mínimo (src/worker.js)

**Files:**
- Create: `src/worker.js`

**Interfaces:**
- Export default object con `fetch(request, env)`; `env.ASSETS.fetch` sirve estáticos.

- [ ] **Step 1: Crear `src/worker.js`**

```js
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let path = url.pathname;
    if (path.endsWith('/docs')) {
      return Response.redirect(new URL(path + '/', url), 301);
    }
    const response = await env.ASSETS.fetch(request);
    if (response.status === 404) {
      return new Response('<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>404</title></head><body style="background:#0d1117;color:#e6edf3;font-family:sans-serif;padding:3rem"><h1 style="color:#ff7b72">404</h1><p>Página no encontrada.</p><a href="/" style="color:#79c0ff">Volver al inicio</a></body></html>', { status: 404, headers: { 'content-type': 'text/html; charset=utf-8' } });
    }
    return response;
  },
};
```

- [ ] **Step 2: Probar con wrangler dev**: `/docs` → 301 a `/docs/`; ruta inexistente → 404 propio; home y docs → 200.

- [ ] **Step 3: Commit**

```bash
git add src/worker.js
git commit -m "feat: worker mínimo con redirect y 404 propio"
```

---

### Task 5: Docs — Empezar (instalación, primeros pasos, FAQ)

**Files:**
- Modify: `content/es/docs/empezar/instalacion.md` (completar contenido real + quitar sección "Captura requerida" cuando el usuario la aporte)
- Create: `content/es/docs/empezar/primeros-pasos.md`
- Create: `content/es/docs/empezar/faq.md`
- Create: `content/en/docs/empezar/primeros-pasos.md`
- Create: `content/en/docs/empezar/faq.md`
- Modify: `content/en/docs/empezar/instalacion.md`

**Formato de página (frontmatter obligatorio):** `title`, `category`. TOC se genera de los H2. Cada página con callouts, bloques de código reales y (si el usuario aportó captura) `![alt](assets/nombre.png)`.

**Capturas requeridas (pedir al usuario al terminar esta tarea):**
- [ ] instalacion: ventana del editor abierto (bienvenida) — el usuario ya la tiene o la saca al momento.
- [ ] primeros-pasos: chat de Prometheus AI respondiendo un saludo (o el paso 1 del usuario).

- [ ] **Step 1: Escribir las 6 páginas** (ES y EN) siguiendo el patrón de la página ejemplo, con contenido real de la app (panel de bienvenida, barra de comandos, primer chat, config de modelos locales desde el panel LlamaCpp, panel de agentes en la UI de "Agents customization", FAQ con preguntas reales: ¿es gratis? ¿necesita GPU? ¿se pueden usar modelos de Ollama? — sí, el mismo llama-server).

- [ ] **Step 2: Rebuild + smoke**

Run: `npm run build && npm run smoke es/docs/empezar/primeros-pasos.html en/docs/empezar/primeros-pasos.html es/docs/empezar/faq.html en/docs/empezar/faq.html`
Expected: OK.

- [ ] **Step 3: Pedir capturas al usuario** (ver lista arriba), embeberlas con `![alt](assets/nombre.png)` cuando las aporte y rebuild.

- [ ] **Step 4: Commit**

```bash
git add content/ public/
git commit -m "docs: sección Empezar ES/EN (instalación, primeros pasos, FAQ)"
```

---

### Task 6: Docs — Modelos locales (configuración, búsqueda HF, contexto, GPU)

**Files:**
- Create: `content/es/docs/modelos/configuracion.md`, `busqueda-hf.md`, `contexto.md`, `gpu.md`
- Create: `content/en/docs/modelos/*.md` (mismos 4 archivos)

**Capturas requeridas (pedir al usuario):**
- [ ] configuracion: panel LlamaCpp con la configuración del servidor (contexto, offload, temperatura).
- [ ] busqueda-hf: YA APORTADA (`hf-search.png`).
- [ ] contexto: chat donde la IA menciona el resumen de contexto (o el panel con el slider de contexto).
- [ ] gpu: nvidia-smi o panel mostrando VRAM usada por llama-server.

- [ ] **Step 1: Escribir las 8 páginas** con contenido real de esta sesión:
  - configuracion: args del servidor (llama-server, puerto 11434, `-c`, `--context-shift`, `--cache-type-k/-v q8_0`, `-ngl 99`, `-fa on`, `--jinja`), slider de contexto, botón stop/start.
  - busqueda-hf: buscador con limit=20 (evita rate limit 500/300s), detección de quant (IQ4_XS, Q6_K, Q8_0_8_8, MXFP4_MOE), repos vs archivos, embed `hf-search.png`.
  - contexto: KV ≈ 0.47 MB/token FP16, 8192→12288 con KV q8_0, resúmenes compactos de 3 turnos, truncado de mensajes >5000 chars.
  - gpu: 16 GB VRAM para modelos 12-14 GB, Q4_K_M/IQ4_XS como equilibrio, offload 99 capas, ~1 GB libre con ctx 12288.

- [ ] **Step 2: Rebuild + smoke de las 8 páginas** (paths `es/docs/modelos/*` y `en/docs/modelos/*`).

- [ ] **Step 3: Pedir capturas y embeber** cuando el usuario las aporte (menos busqueda-hf, ya está).

- [ ] **Step 4: Commit**

```bash
git add content/ public/
git commit -m "docs: sección Modelos locales ES/EN (configuración, HF, contexto, GPU)"
```

---

### Task 7: Docs — Prometheus AI (agentes, terminal IA, memoria, historial)

**Files:**
- Create: `content/es/docs/prometheus-ai/agentes.md`, `terminal.md`, `memoria.md`, `historial.md`
- Create: `content/en/docs/prometheus-ai/*.md`

**Capturas requeridas (pedir al usuario):**
- [ ] agentes: chat donde se ve `search_agents` → `use_agent` ejecutados solos (la captura puede ser del chat real).
- [ ] terminal: chat con el bloque de terminal IA embebida mostrando salida y exit code.
- [ ] memoria: chat donde la IA recuerda algo de una sesión anterior.
- [ ] historial: UI del historial de sesiones (panel o lista).

- [ ] **Step 1: Escribir las 8 páginas** con contenido real:
  - agentes: 423 agentes (catálogo + instalados), `search_agents(query, category?)` con scoring (nombre ×3, descripción ×2, categoría ×1), top 10, tools de agentes siempre disponibles, system prompt de autonomía.
  - terminal: terminal fish oculta embebida en el chat, gating de contraseñas, espera de prompt idle (shell integration), salida completa con `(exit code: N)`, deadline 10 min.
  - memoria: memoria persistente entre sesiones (storage), resúmenes compactos para modelos locales.
  - historial: sesiones previas, continuar/reiniciar conversación.

- [ ] **Step 2: Rebuild + smoke de las 8 páginas.**

- [ ] **Step 3: Pedir capturas y embeber** (`chat-llamacpp.png` ya aportada se usa en terminal o agentes según corresponda al contenido real de la captura; el usuario decide dónde).

- [ ] **Step 4: Commit**

```bash
git add content/ public/
git commit -m "docs: sección Prometheus AI ES/EN (agentes, terminal, memoria, historial)"
```

---

### Task 8: Docs — Funciones conservadas (terminal, git, debugging, extensiones, live preview, temas)

**Files:**
- Create: `content/es/docs/conservadas/{terminal,git,debugging,extensiones,live-preview,temas}.md`
- Create: `content/en/docs/conservadas/*.md`

**Capturas requeridas (pedir al usuario):**
- [ ] terminal: terminal integrada del panel con fish.
- [ ] live-preview: pane de Live Preview mostrando una web.
- [ ] temas: selector de tema oscuro/claro.
- (git/debugging/extensiones: opcional, solo si el usuario quiere)

- [ ] **Step 1: Escribir las 12 páginas** con contenido real (funciones conservadas de VS Code: terminal con fish/zsh/bash, git integrado, debug, extensiones con **Open VSX**, Live Preview con vite, temas oscuros/claros).

- [ ] **Step 2: Rebuild + smoke de las 12 páginas.**

- [ ] **Step 3: Pedir capturas y embeber** si el usuario las aporta.

- [ ] **Step 4: Commit**

```bash
git add content/ public/
git commit -m "docs: sección Funciones conservadas ES/EN (6 páginas)"
```

---

### Task 9: Verificación integral (browser-automation)

- [ ] **Step 1: Levantar `wrangler dev`** y verificar con Playwright (skill browser-automation): home ES/EN, una página de cada categoría, toggle ES/EN mantiene página, sidebar marca activa, TOC salta a anclas, imágenes cargan (200), 404 propio.

- [ ] **Step 2: Corregir lo que falle** y repetir hasta verde.

- [ ] **Step 3: Commit final de ajustes** (si hubo).

---

### Task 10: Deploy y publicación

- [ ] **Step 1: Deploy**

Run: `npx wrangler deploy`
Expected: sitio publicado en `https://prometheus-code-docs.<subdomain>.workers.dev`.

- [ ] **Step 2: Verificar en producción** (Playwright contra la URL pública).

- [ ] **Step 3: Subir el repo a GitHub**

```bash
gh repo create prometheus-code-docs --public --source . --push
```

Expected: repo creado y pusheado (si `gh` está autenticado; si no, pedir al usuario el repo destino).

- [ ] **Step 4: Commit final del estado**

```bash
git add -A && git commit -m "chore: estado final V1 del sitio"
```

---

## Self-Review del plan

- **Cobertura de spec:** Home (Task 3), Docs 17 páginas (Tasks 5-8), i18n ES/EN (Tasks 2-3, sidebar y toggle en templates), Worker + redirects + 404 (Task 4), capturas colaborativas (secciones "Captura requerida" en Tasks 5-8), verificación (Task 9), deploy + GitHub (Task 10). Sin buscador (spec dice omitir). Sin capturas extra inventadas.
- **Placeholders:** ninguna sección TBD; contenido real especificado por página en los pasos.
- **Consistencia de tipos:** `renderShell(lang, page)` y `buildSidebar(lang, activePath)` definidos en Task 2, usados igual en Tasks 2-3; `buildToc` devuelve `{ html, tocHtml }` y se usa en Task 2 únicamente. Smoke usa paths relativos a `public/` consistentes con los archivos generados.