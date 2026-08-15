import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { marked } from 'marked';
import { renderShell } from './templates.js';

const ROOT = new URL('..', import.meta.url).pathname;
const CONTENT = join(ROOT, 'content');
const PUBLIC = join(ROOT, 'public');

export async function buildHome() {
  for (const lang of ['es', 'en']) {
    const raw = await readFile(join(CONTENT, lang, 'index.md'), 'utf8');
    const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    const fm = {};
    if (m) {
      for (const line of m[1].split('\n')) {
        const kv = line.match(/^(\w+):\s*(.+)$/);
        if (kv) fm[kv[1]] = kv[2].replace(/^"|"$/g, '');
      }
    }
    const body = m ? m[2] : raw;
    const html = marked.parse(body, { async: false });
    const page = renderShell(lang, {
      title: fm.title ?? 'Prometheus Code',
      html,
      activePath: '/',
    });
    const out = join(PUBLIC, lang === 'es' ? '' : 'en', 'index.html');
    await mkdir(join(out, '..'), { recursive: true });
    await writeFile(out, page);
    console.log(`[build] ${lang === 'es' ? '/' : '/en'}`);
  }
}