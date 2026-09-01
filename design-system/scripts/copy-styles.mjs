// Byte-copies the authored src/styles.css into dist/ (kept byte-identical so
// design-sync diffs of dist/styles.css stay clean). Runs after tsup in `build`.
import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
mkdirSync(join(here, '..', 'dist'), { recursive: true });
copyFileSync(join(here, '..', 'src', 'styles.css'), join(here, '..', 'dist', 'styles.css'));
console.log('copied src/styles.css -> dist/styles.css');
