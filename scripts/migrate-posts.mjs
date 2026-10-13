// One-off migration of the WordPress blog ("Insights") into static JSON.
// Usage: node scripts/migrate-posts.mjs   (safe to re-run; existing images are skipped)
//
// Output:
//   content/posts/<slug>.json      full post incl. sanitised html
//   content/posts/index.json       metadata of all posts, newest first
//   content/posts/categories.json  categories with >= 1 post
//   public/media/blog/<slug>/*.jpg|png  re-encoded images
import { mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, posix } from 'node:path';
import sharp from 'sharp';

const ROOT = resolve(import.meta.dirname, '..');
const API = 'https://balibliss.net/wp-json/wp/v2/';
const HEADERS = { 'User-Agent': 'Mozilla/5.0' };
const POSTS_DIR = resolve(ROOT, 'content/posts');
const MEDIA_DIR = resolve(ROOT, 'public/media/blog');
const MAX_WIDTH = 1600;
const SITE_RE = /^https?:\/\/(?:www\.)?balibliss\.net(?=\/|$|\?|#)/i;

const stats = { posts: 0, imagesDownloaded: 0, imagesSkipped: 0, failures: [], warnings: [] };

// ---------------------------------------------------------------- fetching
async function getJson(path) {
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(API + path, { headers: HEADERS });
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${path}`);
      return { data: await res.json(), headers: res.headers };
    } catch (err) {
      if (attempt >= 3) throw err;
      await new Promise((r) => setTimeout(r, 1000 * attempt));
    }
  }
}

async function getAllPosts() {
  const posts = [];
  let total = null;
  for (let page = 1; ; page++) {
    const { data, headers } = await getJson(`posts?per_page=100&page=${page}&_embed=1`);
    total ??= Number(headers.get('x-wp-total'));
    posts.push(...data);
    if (page >= Number(headers.get('x-wp-totalpages') || 1)) break;
  }
  return { posts, total };
}

// ---------------------------------------------------------------- entities
const NAMED = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ensp: ' ', emsp: ' ', thinsp: ' ',
  hellip: '…', mdash: '—', ndash: '–', lsquo: '‘', rsquo: '’', sbquo: '‚', ldquo: '“', rdquo: '”',
  bdquo: '„', laquo: '«', raquo: '»', lsaquo: '‹', rsaquo: '›', bull: '•', middot: '·', prime: '′',
  Prime: '″', copy: '©', reg: '®', trade: '™', deg: '°', times: '×', divide: '÷', plusmn: '±',
  frac12: '½', frac14: '¼', frac34: '¾', sup2: '²', sup3: '³', micro: 'µ', para: '¶', sect: '§',
  euro: '€', pound: '£', yen: '¥', cent: '¢', larr: '←', rarr: '→', uarr: '↑', darr: '↓', harr: '↔',
  hearts: '♥', star: '☆', check: '✓', shy: '', zwj: '‍', zwnj: '‌', iexcl: '¡', iquest: '¿',
  aacute: 'á', eacute: 'é', iacute: 'í', oacute: 'ó', uacute: 'ú', agrave: 'à', egrave: 'è',
  igrave: 'ì', ograve: 'ò', ugrave: 'ù', acirc: 'â', ecirc: 'ê', icirc: 'î', ocirc: 'ô', ucirc: 'û',
  auml: 'ä', euml: 'ë', iuml: 'ï', ouml: 'ö', uuml: 'ü', ntilde: 'ñ', ccedil: 'ç', szlig: 'ß',
  Aacute: 'Á', Eacute: 'É', Oacute: 'Ó', Uacute: 'Ú', Auml: 'Ä', Ouml: 'Ö', Uuml: 'Ü', oslash: 'ø',
  aring: 'å', aelig: 'æ', ordm: 'º', ordf: 'ª',
};
function decode(str) {
  return str.replace(/&(#x[0-9a-f]+|#\d+|[a-z][a-z0-9]*);?/gi, (m, e) => {
    if (e[0] === '#') {
      const cp = e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      if (cp === 160) return ' ';
      return Number.isFinite(cp) && cp > 0 && cp < 0x110000 ? String.fromCodePoint(cp) : '';
    }
    if (e in NAMED) return NAMED[e];
    stats.warnings.push(`unknown entity ${m}`);
    return m;
  });
}
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escAttr = (s) => esc(s).replace(/"/g, '&quot;');
const plain = (html) =>
  decode(html.replace(/<[^>]*>/g, ' ')).replace(/\[\/?et_pb_[^\]]*\]/g, '').replace(/\s+/g, ' ').trim();

// ---------------------------------------------------------------- parsing
const VOID = new Set(['br', 'hr', 'img', 'input', 'meta', 'link', 'wbr', 'source', 'col', 'area', 'base', 'embed', 'param', 'track']);
const DROP = new Set(['script', 'style', 'noscript', 'template', 'svg', 'math', 'object', 'canvas', 'select', 'textarea', 'button', 'form', 'video', 'audio', 'head', 'title']);
const BLOCKS = new Set(['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'table', 'blockquote', 'figure', 'section', 'article', 'header', 'footer', 'hr', 'tr', 'td', 'th', 'tbody', 'thead', 'pre']);

function parseAttrs(src) {
  const attrs = {};
  for (const m of src.matchAll(/([^\s=\/>"']+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) {
    attrs[m[1].toLowerCase()] = decode(m[2] ?? m[3] ?? m[4] ?? '');
  }
  return attrs;
}

function parse(html) {
  const root = { tag: '#root', attrs: {}, children: [] };
  const stack = [root];
  const top = () => stack[stack.length - 1];
  const re = /<!--[\s\S]*?-->|<!\[CDATA\[[\s\S]*?\]\]>|<!doctype[^>]*>|<(\/?)([a-zA-Z][\w:-]*)((?:"[^"]*"|'[^']*'|[^'">])*)>|([^<]+|<)/gi;
  let m;
  while ((m = re.exec(html))) {
    if (m[4] !== undefined) {
      top().children.push({ text: m[4] });
      continue;
    }
    if (!m[2]) continue; // comment / doctype
    const tag = m[2].toLowerCase();
    if (m[1]) {
      // closing tag: pop to the matching element if it is open, else ignore
      const idx = stack.map((n) => n.tag).lastIndexOf(tag);
      if (idx > 0) stack.length = idx;
      continue;
    }
    if (DROP.has(tag)) {
      // skip everything up to the matching close tag
      const close = new RegExp(`</${tag}\\s*>`, 'ig');
      close.lastIndex = re.lastIndex;
      const c = close.exec(html);
      re.lastIndex = c ? close.lastIndex : html.length;
      continue;
    }
    // an open <p> cannot contain blocks
    if (BLOCKS.has(tag) && top().tag === 'p') stack.pop();
    if (tag === 'li' && top().tag === 'li') stack.pop();
    const node = { tag, attrs: parseAttrs(m[3]), children: [] };
    top().children.push(node);
    if (tag === 'iframe') {
      const close = /<\/iframe\s*>/gi;
      close.lastIndex = re.lastIndex;
      const c = close.exec(html);
      re.lastIndex = c ? close.lastIndex : html.length;
      continue;
    }
    if (!VOID.has(tag) && !m[3].trim().endsWith('/')) stack.push(node);
  }
  return root;
}

// ---------------------------------------------------------------- links
function rewriteHref(raw) {
  let href = (raw || '').trim();
  if (!href || /^(javascript|data|vbscript):/i.test(href)) return null;
  if (href.startsWith('//')) href = 'https:' + href;
  if (SITE_RE.test(href)) {
    let path = href.replace(SITE_RE, '') || '/';
    if (!path.startsWith('/')) path = '/' + path;
    // add trailing slash to page paths (WordPress permalinks end in /)
    path = path.replace(/^([^?#]*?)([?#].*)?$/, (all, p, rest = '') =>
      (p.endsWith('/') || /\.[a-z0-9]{2,5}$/i.test(p) ? p : p + '/') + rest);
    return { href: path, external: false };
  }
  if (/^(mailto|tel):/i.test(href) || href.startsWith('#') || href.startsWith('/')) return { href, external: false };
  if (/^https?:\/\//i.test(href)) return { href, external: true };
  return { href, external: false };
}

function youtubeLink(src) {
  const m = (src || '').match(/(?:youtube(?:-nocookie)?\.com\/(?:embed\/|watch\?v=|v\/)|youtu\.be\/)([\w-]{6,})/i);
  return m ? `https://www.youtube.com/watch?v=${m[1]}` : null;
}

// ---------------------------------------------------------------- sanitising
const RENAME = { b: 'strong', i: 'em', h1: 'h2', h5: 'h3', h6: 'h4' };
const ALLOWED = new Set(['p', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'strong', 'em', 'a', 'blockquote', 'figure', 'figcaption', 'img', 'hr', 'br']);
const BLOCK_OUT = new Set(['p', 'h2', 'h3', 'h4', 'ul', 'ol', 'blockquote', 'figure', 'hr']);
const INLINE_OUT = new Set(['strong', 'em', 'a', 'img', 'br']);

const textOf = (n) => (n.text !== undefined ? n.text : n.children.map(textOf).join(''));

// Produces a list of output nodes: { tag, attrs, children } | { text } (decoded)
function clean(node, ctx) {
  if (node.text !== undefined) {
    const t = decode(node.text).replace(/\[\/?et_pb_[^\]]*\]/g, '');
    return t ? [{ text: t }] : [];
  }
  const kids = () => node.children.flatMap((c) => clean(c, ctx));
  let tag = RENAME[node.tag] ?? node.tag;

  if (tag === 'iframe') {
    const yt = youtubeLink(node.attrs.src);
    if (!yt) return [];
    const label = node.attrs.title ? `Watch “${node.attrs.title}” on YouTube` : 'Watch on YouTube';
    return [{ tag: 'p', attrs: {}, children: [{ tag: 'a', attrs: { href: yt, rel: 'noopener noreferrer' }, children: [{ text: label }] }] }];
  }
  if (tag === 'table') return tableToBlocks(node, ctx);
  if (tag === 'img') {
    const img = ctx.images.get(node.attrs.src);
    if (!img) return [];
    return [{ tag: 'img', attrs: { src: img.src, alt: meaningfulAlt(node.attrs.alt, img.src) ?? '', width: String(img.width), height: String(img.height) }, children: [] }];
  }
  if (tag === 'a') {
    const link = rewriteHref(node.attrs.href);
    const children = kids();
    if (!link) return children;
    const attrs = { href: link.href };
    if (link.external) attrs.rel = 'noopener noreferrer';
    return [{ tag: 'a', attrs, children }];
  }
  if (!ALLOWED.has(tag)) return kids();
  return [{ tag, attrs: {}, children: kids() }];
}

function tableToBlocks(table, ctx) {
  const rows = [];
  const walk = (n) => {
    if (n.text !== undefined) return;
    if (n.tag === 'tr') rows.push(n.children.filter((c) => c.tag === 'td' || c.tag === 'th'));
    else n.children.forEach(walk);
  };
  walk(table);
  const cellNodes = (c) => normaliseInline(c.children.flatMap((k) => clean(k, ctx)));
  let headers = null;
  const out = [];
  for (const row of rows) {
    if (!row.length) continue;
    if (!headers && row.every((c) => c.tag === 'th')) {
      headers = row.map((c) => plain(textOf(c)));
      continue;
    }
    const cells = row.map(cellNodes);
    const [first, ...rest] = cells;
    out.push({ tag: 'p', attrs: {}, children: [{ tag: 'strong', attrs: {}, children: first }] });
    if (rest.length) {
      out.push({
        tag: 'ul', attrs: {},
        children: rest.map((cell, i) => ({
          tag: 'li', attrs: {},
          children: headers?.[i + 1] ? [{ tag: 'strong', attrs: {}, children: [{ text: headers[i + 1] + ':' }] }, { text: ' ' }, ...cell] : cell,
        })),
      });
    }
  }
  ctx.tables++;
  return out;
}

// strip nested blocks out of inline-only contexts (keep their content)
function normaliseInline(nodes) {
  return nodes.flatMap((n) => (n.text !== undefined || INLINE_OUT.has(n.tag) ? [n] : [{ text: ' ' }, ...normaliseInline(n.children), { text: ' ' }]));
}

// Ensure block structure: wrap loose inline runs in <p>, flatten blocks nested inside <p>/headings.
function structure(nodes, container) {
  const out = [];
  let run = [];
  const flush = () => {
    if (run.some((n) => n.tag || n.text.trim())) out.push({ tag: 'p', attrs: {}, children: run });
    run = [];
  };
  for (const n of nodes) {
    if (n.text !== undefined || INLINE_OUT.has(n.tag)) {
      if (n.tag === 'img' && container === 'root') {
        flush();
        out.push({ tag: 'figure', attrs: {}, children: [n] });
      } else run.push(n);
      continue;
    }
    flush();
    if (n.tag === 'p' || /^h[234]$/.test(n.tag) || n.tag === 'figcaption') {
      // inline-only; nested blocks inside a <p> split it
      const inner = [];
      let buf = [];
      const push = () => { if (buf.length) inner.push({ tag: n.tag, attrs: {}, children: normaliseInline(buf) }); buf = []; };
      for (const c of n.children) {
        if (c.text !== undefined || INLINE_OUT.has(c.tag)) buf.push(c);
        else { push(); inner.push(...structure([c], container)); }
      }
      push();
      out.push(...inner);
    } else if (n.tag === 'ul' || n.tag === 'ol') {
      const items = [];
      for (const c of n.children) {
        if (c.tag === 'li') items.push({ tag: 'li', attrs: {}, children: structureLi(c.children) });
        else if (c.tag === 'ul' || c.tag === 'ol') {
          // stray nested list: attach to previous li
          if (items.length) items[items.length - 1].children.push(...structure([c], 'li'));
        } else if (c.text === undefined || c.text.trim()) items.push({ tag: 'li', attrs: {}, children: structureLi([c]) });
      }
      out.push({ tag: n.tag, attrs: {}, children: items });
    } else if (n.tag === 'li') {
      out.push(...structure(n.children, container)); // li outside list
    } else if (n.tag === 'blockquote') {
      out.push({ tag: 'blockquote', attrs: {}, children: structure(n.children, 'blockquote') });
    } else if (n.tag === 'figure') {
      const kids = [];
      for (const c of n.children) {
        if (c.tag === 'img') kids.push(c);
        else if (c.tag === 'figcaption') kids.push({ tag: 'figcaption', attrs: {}, children: normaliseInline(c.children) });
        else if (c.tag === 'a' && c.children.some((k) => k.tag === 'img')) kids.push(...c.children.filter((k) => k.tag === 'img'));
      }
      out.push({ tag: 'figure', attrs: {}, children: kids });
    } else if (n.tag === 'hr') out.push(n);
    else out.push(...structure(n.children, container));
  }
  flush();
  return out;
}
// li content: inline runs stay inline, nested lists allowed, <p> unwrapped
function structureLi(children) {
  const out = [];
  for (const c of children) {
    if (c.tag === 'ul' || c.tag === 'ol') out.push(...structure([c], 'li'));
    else if (c.text !== undefined || INLINE_OUT.has(c.tag)) out.push(c);
    else {
      if (out.length) out.push({ tag: 'br', attrs: {}, children: [] });
      out.push(...normaliseInline(c.children));
    }
  }
  return out;
}

const hasContent = (n) => (n.text !== undefined ? n.text.trim() !== '' : n.tag === 'img' || n.tag === 'hr' || n.children.some(hasContent));

function prune(nodes) {
  const out = [];
  for (const n of nodes) {
    if (n.text !== undefined) { out.push(n); continue; }
    if (n.tag === 'img' || n.tag === 'hr') { out.push(n); continue; }
    if (n.tag === 'br') { out.push(n); continue; }
    n.children = prune(n.children);
    // trim leading/trailing <br> and whitespace inside blocks
    if (BLOCK_OUT.has(n.tag) || n.tag === 'li' || n.tag === 'figcaption') {
      while (n.children.length && (n.children[0].tag === 'br' || (n.children[0].text !== undefined && !n.children[0].text.trim()))) n.children.shift();
      while (n.children.length && (n.children.at(-1).tag === 'br' || (n.children.at(-1).text !== undefined && !n.children.at(-1).text.trim()))) n.children.pop();
    }
    if (!hasContent(n)) {
      if (!BLOCK_OUT.has(n.tag) && n.tag !== 'li' && n.children.length) out.push({ text: ' ' });
      continue;
    }
    out.push(n);
  }
  return out;
}

function serialise(nodes, inline = false) {
  let s = '';
  for (const n of nodes) {
    if (n.text !== undefined) { s += esc(n.text.replace(/[ \t\r\n ]+/g, ' ')); continue; }
    const attrs = Object.entries(n.attrs).map(([k, v]) => ` ${k}="${escAttr(v)}"`).join('');
    if (n.tag === 'br') { s += '<br>'; continue; }
    if (n.tag === 'hr') { s += '<hr>\n'; continue; }
    if (n.tag === 'img') { s += `<img${attrs}>`; continue; }
    const isBlock = BLOCK_OUT.has(n.tag) || n.tag === 'li' || n.tag === 'figcaption';
    let inner = serialise(n.children, !isBlock || inline);
    if (isBlock) inner = inner.trim().replace(/\s*<br>\s*/g, '<br>');
    s += `<${n.tag}${attrs}>${inner}</${n.tag}>` + (isBlock ? '\n' : '');
  }
  return s;
}

function sanitise(html, ctx) {
  const tree = parse(html.replace(/\[\/?et_pb_[^\]]*\]/g, ''));
  const cleaned = tree.children.flatMap((c) => clean(c, ctx));
  return serialise(prune(structure(cleaned, 'root')))
    .replace(/ +(<\/(?:strong|em|a)>)/g, '$1 ') // move trailing spaces out of inline tags
    .replace(/(<(?:strong|em)>) +/g, ' $1')
    .replace(/(<a [^>]*>) +/g, ' $1')
    .replace(/(<(?:p|h[234]|li|figcaption|blockquote)>) +/g, '$1')
    .replace(/ +(<\/(?:p|h[234]|li|figcaption)>)/g, '$1')
    .replace(/ {2,}/g, ' ')
    .trim() + '\n';
}

// ---------------------------------------------------------------- images
function cleanName(url) {
  let name = decodeURIComponent(posix.basename(new URL(url).pathname));
  name = name.replace(/\.[a-z0-9]+$/i, '').replace(/-\d+x\d+$/, '').replace(/-(scaled|rotated|e\d{10,})$/i, '');
  return name.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'image';
}
const fullSizeUrl = (url) => url.replace(/-\d+x\d+(\.[a-z0-9]+)(\?.*)?$/i, '$1');

function meaningfulAlt(alt, src) {
  const a = (alt || '').replace(/\s+/g, ' ').trim();
  if (a.length < 3) return null;
  if (/^(img|image|dsc|photo|picture|untitled|screenshot)[\s_-]*\d*$/i.test(a)) return null;
  if (/\.(jpe?g|png|webp|gif)$/i.test(a)) return null;
  const stem = src ? posix.basename(src).replace(/\.[a-z0-9]+$/i, '') : '';
  if (stem && cleanName('https://x/' + a) === stem && /[-_]/.test(a) && !/\s/.test(a)) return null;
  return a;
}

const usedNames = new Map(); // post slug -> Set of names
async function downloadImage(url, postSlug, fallbackName = 'image') {
  const used = usedNames.get(postSlug) ?? new Set();
  usedNames.set(postSlug, used);
  let base = cleanName(url);
  if (/^\d*$/.test(base) || base.length < 3 || base === 'image') base = fallbackName; // e.g. "2.png"
  if (used.has(base)) { let i = 2; while (used.has(`${base}-${i}`)) i++; base = `${base}-${i}`; }
  used.add(base);
  const dir = resolve(MEDIA_DIR, postSlug);
  for (const ext of ['jpg', 'png']) {
    const file = resolve(dir, `${base}.${ext}`);
    if (existsSync(file)) {
      const { width, height } = await sharp(file).metadata();
      stats.imagesSkipped++;
      return { src: `/media/blog/${postSlug}/${base}.${ext}`, width, height };
    }
  }
  let res;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      res = await fetch(url, { headers: HEADERS });
      if (res.ok) break;
    } catch { res = null; }
    await new Promise((r) => setTimeout(r, 1000 * attempt));
  }
  if (!res?.ok) throw new Error(`image HTTP ${res?.status ?? 'error'} ${url}`);
  const input = Buffer.from(await res.arrayBuffer());
  const meta = await sharp(input).metadata();
  const transparent = meta.hasAlpha && !(await sharp(input).stats()).isOpaque;
  let img = sharp(input).rotate().resize({ width: MAX_WIDTH, withoutEnlargement: true }); // metadata is stripped by default
  const ext = transparent ? 'png' : 'jpg';
  img = transparent ? img.png({ compressionLevel: 9 }) : img.flatten({ background: '#ffffff' }).jpeg({ quality: 82, mozjpeg: true });
  const buf = await img.toBuffer();
  const { width, height } = await sharp(buf).metadata();
  await mkdir(dir, { recursive: true });
  await writeFile(resolve(dir, `${base}.${ext}`), buf);
  stats.imagesDownloaded++;
  return { src: `/media/blog/${postSlug}/${base}.${ext}`, width, height };
}

// ---------------------------------------------------------------- helpers
function isoWithOffset(local, gmt) {
  const l = Date.parse(local + 'Z');
  const g = Date.parse(gmt + 'Z');
  const off = Math.round((l - g) / 60000);
  const sign = off >= 0 ? '+' : '-';
  const hh = String(Math.floor(Math.abs(off) / 60)).padStart(2, '0');
  const mm = String(Math.abs(off) % 60).padStart(2, '0');
  return `${local}${sign}${hh}:${mm}`;
}

function makeExcerpt(rendered, html) {
  let text = plain(rendered || '').replace(/\s*(\[(…|&hellip;|\.\.\.)\]|\[…\]|…|\.\.\.)\s*$/u, '').replace(/\s*(Read more|Continue reading).*$/i, '').trim();
  if (text.length < 40) {
    // Divi posts have no excerpt: use the opening paragraph(s)
    const paras = [...html.matchAll(/<p>([\s\S]*?)<\/p>/g)].map((m) => plain(m[1])).filter((t) => t.length > 20);
    text = '';
    for (const p of paras) {
      text = text ? `${text} ${p}` : p;
      if (text.length >= 140) break;
    }
  }
  if (text.length > 260) {
    // end on a sentence boundary: whole sentences up to ~260 chars, at least one sentence
    const sentences = text.match(/[^.!?]+[.!?]+["”’)]*(?=\s|$)/g) ?? [];
    let out = '';
    for (const sen of sentences) {
      if (out && (out + sen).length > 260) break;
      out += sen;
    }
    out = out.trim();
    text = out && out.length <= 360 ? out : text.slice(0, 260).replace(/\s+\S*$/, '') + '…';
  }
  return text;
}

// ---------------------------------------------------------------- main
async function main() {
  console.log('Fetching posts…');
  const { posts, total } = await getAllPosts();
  const { data: cats } = await getJson('categories?per_page=100');
  const catById = new Map(cats.map((c) => [c.id, c]));
  // /users is closed on this site (401); author name comes from the embed or Yoast's public byline.
  let users = new Map();
  try {
    const { data } = await getJson('users?per_page=100');
    users = new Map(data.map((u) => [u.id, u.name]));
  } catch { /* not public */ }

  await mkdir(POSTS_DIR, { recursive: true });
  const index = [];
  const slugs = new Set();

  for (const p of posts) {
    const slug = p.slug;
    const title = plain(p.title.rendered);
    const ctx = { images: new Map(), tables: 0 };
    try {
      // featured image
      let featuredImage = null;
      const fm = p._embedded?.['wp:featuredmedia']?.[0];
      if (fm?.source_url) {
        const src = fm.media_details?.sizes?.full?.source_url || fm.source_url;
        try {
          const img = await downloadImage(src, slug, slug);
          featuredImage = { ...img, alt: meaningfulAlt(fm.alt_text, src) ?? title };
        } catch (err) {
          stats.failures.push(`${slug}: featured ${err.message}`);
        }
      }

      // body images
      const html = p.content.rendered;
      for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
        const attrs = parseAttrs(m[0].slice(4, -1));
        const raw = attrs.src;
        if (!raw || ctx.images.has(raw) || raw.startsWith('data:')) continue;
        let full = fullSizeUrl(new URL(raw, 'https://balibliss.net/').href);
        const id = (attrs.class || '').match(/wp-image-(\d+)/)?.[1];
        if (id) {
          try {
            const { data } = await getJson(`media/${id}`);
            full = data.media_details?.sizes?.full?.source_url || data.source_url || full;
          } catch { /* fall back to suffix-stripped url */ }
        }
        try {
          ctx.images.set(raw, await downloadImage(full, slug));
        } catch (err) {
          // retry with the url as given (the original may not exist)
          try { ctx.images.set(raw, await downloadImage(new URL(raw, 'https://balibliss.net/').href, slug)); }
          catch { stats.failures.push(`${slug}: body image ${err.message}`); }
        }
      }

      // the page template renders the title as <h1>; drop a leading heading that repeats it
      const body = sanitise(html, ctx).replace(/^<h[234]>([^\n]*?)<\/h[234]>\n/, (m, h) =>
        plain(h).toLowerCase() === title.toLowerCase() ? '' : m);
      if (ctx.tables) stats.warnings.push(`${slug}: ${ctx.tables} table(s) converted to lists`);
      const words = plain(body).split(/\s+/).filter(Boolean).length;
      const author = p._embedded?.author?.[0]?.name || users.get(p.author) || p.yoast_head_json?.author || null;
      const meta = {
        slug,
        title,
        date: isoWithOffset(p.date, p.date_gmt),
        modified: isoWithOffset(p.modified, p.modified_gmt),
        excerpt: makeExcerpt(p.excerpt?.rendered, body),
        author,
        categories: p.categories.map((id) => catById.get(id)?.slug).filter(Boolean),
        featuredImage,
        readingMinutes: Math.max(1, Math.round(words / 200)),
      };
      await writeFile(resolve(POSTS_DIR, `${slug}.json`), JSON.stringify({ ...meta, html: body }, null, 2) + '\n');
      index.push(meta);
      slugs.add(slug);
      stats.posts++;
      process.stdout.write('.');
    } catch (err) {
      stats.failures.push(`${slug}: ${err.stack || err.message}`);
    }
  }
  console.log();

  index.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  await writeFile(resolve(POSTS_DIR, 'index.json'), JSON.stringify(index, null, 2) + '\n');

  const counts = new Map();
  for (const m of index) for (const c of m.categories) counts.set(c, (counts.get(c) ?? 0) + 1);
  const categories = cats
    .filter((c) => counts.get(c.slug) > 0)
    .map((c) => ({ slug: c.slug, name: plain(c.name), description: plain(c.description || ''), count: counts.get(c.slug) }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  await writeFile(resolve(POSTS_DIR, 'categories.json'), JSON.stringify(categories, null, 2) + '\n');

  // remove stale post files from earlier runs
  for (const f of await readdir(POSTS_DIR)) {
    if (f.endsWith('.json') && f !== 'index.json' && f !== 'categories.json' && !slugs.has(f.slice(0, -5))) {
      await rm(resolve(POSTS_DIR, f));
    }
  }

  const unknown = [...new Set(stats.warnings.filter((w) => w.startsWith('unknown entity')))];
  const other = stats.warnings.filter((w) => !w.startsWith('unknown entity'));
  console.log(`\nAPI total: ${total}`);
  console.log(`Posts written: ${stats.posts}`);
  console.log(`Categories: ${categories.length}`);
  console.log(`Images downloaded: ${stats.imagesDownloaded}, skipped (already local): ${stats.imagesSkipped}`);
  if (unknown.length) console.log(`Unknown entities: ${unknown.join(', ')}`);
  if (other.length) console.log(`Notes:\n  ${other.join('\n  ')}`);
  console.log(`Failures: ${stats.failures.length}`);
  for (const f of stats.failures) console.log(`  ${f}`);
  if (stats.failures.length || stats.posts !== total) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
