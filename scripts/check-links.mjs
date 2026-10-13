// Dependency-free link and asset check. Fetches every URL in <base>/sitemap.xml, collects
// every internal href/src on those pages and reports any that don't resolve (status ≥ 400).
// Usage: node scripts/check-links.mjs [baseUrl]   (run against `next start` for real behaviour)
const BASE = process.argv[2] ?? 'http://localhost:3000';
const SITE = 'https://balibliss.net';

const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
const pages = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);

const decode = (s) => s.replace(/&amp;/g, '&');
const targets = new Map(); // path -> Set(of pages linking to it)
const external = new Set();

async function pool(items, n, fn) {
  const queue = [...items];
  await Promise.all(Array.from({ length: n }, async () => { while (queue.length) await fn(queue.shift()); }));
}

await pool(pages, 4, async (path) => {
  const html = await (await fetch(BASE + path)).text();
  for (const [, raw] of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const v = decode(raw);
    if (/^(mailto:|tel:|#|data:|javascript:)/.test(v)) continue;
    if (/^https?:/.test(v) && !v.startsWith(SITE)) { external.add(v); continue; }
    const p = v.startsWith(SITE) ? v.slice(SITE.length) || '/' : v;
    if (!p.startsWith('/')) continue;
    const clean = p.split('#')[0];
    if (!clean) continue;
    if (!targets.has(clean)) targets.set(clean, new Set());
    targets.get(clean).add(path);
  }
});

const bad = [];
await pool([...targets.keys()], 6, async (p) => {
  const res = await fetch(BASE + p, { redirect: 'manual' });
  if (res.status >= 400) bad.push({ status: res.status, url: p, from: [...targets.get(p)].slice(0, 3) });
});

console.log(`pages crawled: ${pages.length} · internal URLs checked: ${targets.size} · external links seen: ${external.size}`);
if (bad.length) {
  console.log(`BROKEN (${bad.length}):`);
  for (const b of bad.sort((a, b) => a.url.localeCompare(b.url))) console.log(`  ${b.status} ${b.url}  ← ${b.from.join(', ')}`);
  process.exitCode = 1;
} else console.log('No broken internal links or assets.');
console.log('\nExternal domains:', [...new Set([...external].map((u) => new URL(u).host))].sort().join(', '));
