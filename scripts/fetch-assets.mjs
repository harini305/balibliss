// One-off local build tool: downloads approved source media from balibliss.net
// (read-only) and writes renamed, metadata-stripped copies into the repo.
// Usage: node scripts/fetch-assets.mjs
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, extname, resolve } from 'node:path';
import sharp from 'sharp';

const ROOT = resolve(import.meta.dirname, '..');
const BASE = 'https://balibliss.net/wp-content/uploads/';
const map = JSON.parse(await readFile(resolve(ROOT, 'scripts/assets-map.json'), 'utf8'));

for (const asset of map.assets) {
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
