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
  const wrap = page.sidebar || page.toc ? 'wrap layout' : 'home';
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
<div class="${wrap}">
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
    ['Prometheus AI', [['docs/prometheus-ai/agentes', 'Agentes automáticos (423)'], ['docs/prometheus-ai/terminal', 'Terminal IA embebida'], ['docs/prometheus-ai/memoria', 'Memoria persistente'], ['docs/prometheus-ai/historial', 'Historial y sesiones'], ['docs/prometheus-ai/live-preview', 'Live Preview']]],
    ['Funciones conservadas', [['docs/conservadas/terminal', 'Terminal integrada'], ['docs/conservadas/git', 'Git y control de versiones'], ['docs/conservadas/debugging', 'Debugging'], ['docs/conservadas/extensiones', 'Extensiones (Open VSX)'], ['docs/conservadas/temas', 'Temas']]],
  ] : [
    ['Getting Started', [['docs/empezar/instalacion', 'Download & Install'], ['docs/empezar/primeros-pasos', 'First Steps'], ['docs/empezar/faq', 'FAQ']]],
    ['Local Models', [['docs/modelos/configuracion', 'Configuration'], ['docs/modelos/busqueda-hf', 'Hugging Face Search'], ['docs/modelos/contexto', 'Context & Memory'], ['docs/modelos/gpu', 'GPU Requirements']]],
    ['Prometheus AI', [['docs/prometheus-ai/agentes', 'Automatic Agents (423)'], ['docs/prometheus-ai/terminal', 'Embedded AI Terminal'], ['docs/prometheus-ai/memoria', 'Persistent Memory'], ['docs/prometheus-ai/historial', 'History & Sessions'], ['docs/prometheus-ai/live-preview', 'Live Preview']]],
    ['Preserved Features', [['docs/conservadas/terminal', 'Integrated Terminal'], ['docs/conservadas/git', 'Git & Version Control'], ['docs/conservadas/debugging', 'Debugging'], ['docs/conservadas/extensiones', 'Extensions (Open VSX)'], ['docs/conservadas/temas', 'Themes']]],
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