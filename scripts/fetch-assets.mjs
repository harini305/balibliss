// One-off local build tool: downloads approved source media from balibliss.net
// (read-only) and writes renamed, metadata-stripped copies into the repo.
// Usage: node scripts/fetch-assets.mjs [--force]   (existing files are skipped unless --force)
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, extname, resolve } from 'node:path';
import { existsSync } from 'node:fs';
import sharp from 'sharp';

const ROOT = resolve(import.meta.dirname, '..');
const BASE = 'https://balibliss.net/wp-content/uploads/';
const map = JSON.parse(await readFile(resolve(ROOT, 'scripts/assets-map.json'), 'utf8'));
const FORCE = process.argv.includes('--force');
// Per-section asset lists (scripts/assets/*.json, same shape) are merged in.
const extraDir = resolve(ROOT, 'scripts/assets');
if (existsSync(extraDir)) {
  for (const f of (await readdir(extraDir)).filter((n) => n.endsWith('.json')).sort()) {
    map.assets.push(...JSON.parse(await readFile(resolve(extraDir, f), 'utf8')).assets);
  }
}

for (const asset of map.assets) {
  if (!FORCE && existsSync(resolve(ROOT, asset.out))) continue;
  const res = await fetch(BASE + asset.src, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) {
    console.error(`FAIL ${res.status} ${asset.src}`);
    continue;
  }
  const input = Buffer.from(await res.arrayBuffer());
  let img = sharp(input).rotate(); // honour orientation, drop EXIF/GPS
  if (asset.resize) img = img.resize(asset.resize, asset.resize, { fit: 'contain' });

  const ext = extname(asset.out).toLowerCase();
  const out = ext === '.png' ? img.png({ compressionLevel: 9 }) : img.flatten({ background: '#ffffff' }).jpeg({ quality: 88, mozjpeg: true });
  const buf = await out.toBuffer();
  const { width, height } = await sharp(buf).metadata();

  const dest = resolve(ROOT, asset.out);
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, buf);
  console.log(`${width}x${height}  ${asset.out}`);
}
