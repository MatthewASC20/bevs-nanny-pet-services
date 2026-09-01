// One-time vendoring of the site's Google Fonts (Baloo 2 + Nunito Sans) into
// fonts/ as woff2 + @font-face rules, so synced designs render the real brand
// fonts with no network dependency. Re-run only to refresh the font files.
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, '..', 'fonts');
mkdirSync(outDir, { recursive: true });

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';
const CSS_URL = 'https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Nunito+Sans:ital,wght@0,400;0,600;0,700;1,400&display=swap';

const css = await (await fetch(CSS_URL, { headers: { 'User-Agent': UA } })).text();

// Keep only the latin subset blocks; rewrite their urls to local files.
const blocks = [...css.matchAll(/\/\* ([a-z-]+) \*\/\s*(@font-face\s*\{[\s\S]*?\})/g)];
let out = '';
let n = 0;
for (const [, subset, block] of blocks) {
  if (subset !== 'latin') continue;
  const url = block.match(/url\((https:[^)]+\.woff2)\)/)?.[1];
  if (!url) continue;
  const family = block.match(/font-family:\s*'([^']+)'/)[1].replace(/\s+/g, '');
  const style = block.match(/font-style:\s*(\w+)/)[1];
  const weight = block.match(/font-weight:\s*(\d+)/)[1];
  const file = `${family}-${weight}${style === 'italic' ? 'i' : ''}.woff2`;
  const buf = Buffer.from(await (await fetch(url, { headers: { 'User-Agent': UA } })).arrayBuffer());
  writeFileSync(join(outDir, file), buf);
  out += block.replace(/src:[^;]+;/, `src:url(./${file}) format('woff2');`).replace(/unicode-range:[^;]+;\s*/, '') + '\n';
  n++;
  console.log(`  ${file} (${(buf.length / 1024) | 0}KB)`);
}
writeFileSync(join(outDir, 'fonts.css'), out);
console.log(`fetch-fonts: ${n} faces -> fonts/fonts.css`);
