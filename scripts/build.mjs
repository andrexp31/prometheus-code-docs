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