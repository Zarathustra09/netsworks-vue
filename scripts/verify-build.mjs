// Post-build sanity checks. Run with: node scripts/verify-build.mjs
// Confirms the compiled CSS contains the classes the pages depend on (Tailwind v4
// only emits what it finds as complete literal strings in the source), that every
// asset referenced from src/ exists in public/, and that nothing leaked in that
// shouldn't (e.g. the Laravel site's Google Analytics tag).
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
let failures = 0;
const check = (label, ok, detail = '') => {
    if (!ok) failures++;
    console.log(`${ok ? 'OK     ' : 'FAIL   '} ${label}${detail ? '  ' + detail : ''}`);
};

// ---------------------------------------------------------------- compiled CSS
const cssFile = fs.readdirSync(path.join(dist, 'assets')).find((n) => n.endsWith('.css'));
const css = fs.readFileSync(path.join(dist, 'assets', cssFile), 'utf8');

const needles = {
    'daisyUI badge': '.badge{',
    'badge height override': '.badge{height:auto',
    '.text-rotate': '.text-rotate',
    'duration-[8s]': 'duration-\\[8s\\]',
    'duration-[9s]': 'duration-\\[9s\\]',
    'aria-[current=true] variant': 'aria-\\[current\\=true\\]',
    'lg:absolute': 'lg\\:absolute',
    'lg:flex-row': 'lg\\:flex-row',
    'z-[60] (drawer above header)': 'z-\\[60\\]',
    '.mobile-menu.menu-open': '.mobile-menu.menu-open',
    'model-viewer sizing rule': 'model-viewer{',
    '.gradient-bg': '.gradient-bg',
    '.tech-grid': '.tech-grid',
    '.steps': '.steps',
    '.timeline': '.timeline',
    '.mockup-code': '.mockup-code',
    'tabs-lift': 'tabs-lift',
    'modal-bottom': 'modal-bottom',
    'text-secondary/20': 'text-secondary\\/20',
    'text-primary/20': 'text-primary\\/20',
    'reduced-motion text-rotate override': '.text-rotate>*{animation:none',
};
for (const [label, needle] of Object.entries(needles)) {
    check(`css: ${label}`, css.includes(needle));
}

// ---------------------------------------------------------------- chunks
const js = fs.readdirSync(path.join(dist, 'assets')).filter((n) => n.endsWith('.js'));
check('model-viewer is its own chunk', js.some((n) => n.startsWith('model-viewer')), js.join(', '));

// ---------------------------------------------------------------- asset paths
const walk = (dir) =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
        e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]
    );
const srcFiles = walk(path.join(root, 'src')).concat(path.join(root, 'index.html'));
const refs = new Set();
for (const f of srcFiles) {
    const text = fs.readFileSync(f, 'utf8');
    for (const m of text.matchAll(/["'`](\/(?:images|models)\/[^"'`\s)]+)["'`]/g)) refs.add(m[1]);
}
const missing = [...refs].filter((r) => !fs.existsSync(path.join(root, 'public', r)));
check(`all ${refs.size} referenced images/models exist in public/`, missing.length === 0, missing.join(', '));

// ---------------------------------------------------------------- leaks
const everything = walk(dist)
    .filter((f) => /\.(html|js|css)$/.test(f))
    .map((f) => fs.readFileSync(f, 'utf8'))
    .join('\n');
check('no Google Analytics tag (G-K150TLPEN7)', !everything.includes('G-K150TLPEN7'));
check('no leftover Laravel paths', !/NETWORKS COMPANY PROFILE|glb assets|tesimonials/.test(everything));

// ---------------------------------------------------------------- weight
const publicBytes = walk(path.join(root, 'public')).reduce((n, f) => n + fs.statSync(f).size, 0);
console.log(`\npublic/ total: ${(publicBytes / 1024 / 1024).toFixed(2)} MB`);

console.log(failures ? `\n${failures} check(s) FAILED` : '\nAll checks passed');
process.exit(failures ? 1 : 0);
