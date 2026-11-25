import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(e =>
  e.isDirectory() ? walk(resolve(dir, e.name)) : [resolve(dir, e.name)]);

export function checkAssets(root, built = true) {
  const referenced = new Set();
  for (const file of walk(resolve(root, 'src')).filter(p => /\.(tsx?|css)$/.test(p))) {
    const text = readFileSync(file, 'utf8');
    for (const match of text.matchAll(/['"`](\/(?:assets|src\/assets)\/[^'"`?#]+)['"`]/g)) referenced.add(match[1]);
  }
  for (const url of referenced) {
    const path = url.startsWith('/src/') ? resolve(root, url.slice(1)) : resolve(root, 'public', url.slice(1));
    if (!existsSync(path)) throw new Error(`Missing referenced asset: ${url}`);
  }
  const publicFiles = walk(resolve(root, 'public'));
  if (built) for (const file of publicFiles) {
    const output = resolve(root, 'dist', relative(resolve(root, 'public'), file));
    if (!existsSync(output)) throw new Error(`Asset missing from build: ${relative(root, file)}`);
    const digest = p => createHash('sha256').update(readFileSync(p)).digest('hex');
    if (digest(file) !== digest(output)) throw new Error(`Built asset differs: ${relative(root, file)}`);
  }
  console.log(`Assets verified: ${referenced.size} references; ${publicFiles.length} public files${built ? ' copied byte-for-byte into dist' : ''}.`);
  return referenced.size;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { checkAssets(resolve(fileURLToPath(new URL('..', import.meta.url)))); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
