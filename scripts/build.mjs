import { mkdir, copyFile, readdir, writeFile, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { marked } from 'marked';
import { renderShell, buildSidebar, buildToc } from './templates.js';
import { buildHome } from './home.mjs';

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
    let files;
    try {
      files = await readdir(join(CONTENT, lang, 'docs', cat));
    } catch {
      continue;
    }
    for (const f of files) {
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
      activePath: '/docs/' + path,
    });
    const out = join(PUBLIC, lang === 'es' ? '' : 'en', 'docs', path + '.html');
    await mkdir(join(out, '..'), { recursive: true });
    await writeFile(out, html);
    console.log(`[build] ${fullPath}`);
  }
  try {
    const index = await readPage(lang, 'docs/index');
    const { html: indexHtml } = buildToc(index.md);
    const indexOut = join(PUBLIC, lang === 'es' ? '' : 'en', 'docs', 'index.html');
    await writeFile(indexOut, renderShell(lang, {
      title: index.title,
      html: indexHtml,
      breadcrumb: `${lang === 'es' ? 'Inicio' : 'Home'} › Docs`,
      sidebar: buildSidebar(lang, prefix + '/docs/'),
      toc: '',
      activePath: '/docs/',
    }));
    console.log(`[build] ${prefix}/docs/`);
  } catch { /* sin índice */ }
}

await buildHome();

for (const lang of LANGS) {
  const prefix = base(lang);
  for (const page of ['release-notes']) {
    try {
      const p = await readPage(lang, page);
      const { html: contentHtml } = buildToc(p.md);
      const out = join(PUBLIC, lang === 'es' ? '' : 'en', page + '.html');
      await mkdir(join(out, '..'), { recursive: true });
      await writeFile(out, renderShell(lang, {
        title: p.title,
        html: contentHtml,
        sidebar: '',
        toc: '',
        activePath: '/' + page,
      }));
      console.log(`[build] ${prefix}/${page}/`);
    } catch { /* sin página */ }
  }
}

await mkdir(join(PUBLIC, 'assets'), { recursive: true });
for (const f of await readdir(join(CONTENT, 'assets'))) {
  await copyFile(join(CONTENT, 'assets', f), join(PUBLIC, 'assets', f));
}
await mkdir(join(PUBLIC, 'en', 'assets'), { recursive: true });
for (const f of await readdir(join(PUBLIC, 'assets'))) {
  await copyFile(join(PUBLIC, 'assets', f), join(PUBLIC, 'en', 'assets', f));
}
console.log('[build] OK');