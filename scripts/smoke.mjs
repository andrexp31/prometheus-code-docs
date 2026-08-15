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