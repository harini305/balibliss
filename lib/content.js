// Build-time content loaders (server components only: they read the filesystem). Pages live in content/pages/<slug>.js
// (see content/pages/SCHEMA.md); blog posts were migrated once into content/posts/*.json.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { cleanPage, withRealImages } from './media-policy';

const PAGES_DIR = join(process.cwd(), 'content/pages');
const POSTS_DIR = join(process.cwd(), 'content/posts');

export function getPageSlugs() {
  return readdirSync(PAGES_DIR)
    .filter((f) => f.endsWith('.js') && f !== 'index.js')
    .map((f) => f.replace(/\.js$/, ''));
}

export async function getPage(slug) {
  if (!getPageSlugs().includes(slug)) return null;
  const mod = await import(`@/content/pages/${slug}.js`);
  return cleanPage(mod.default);
}

/** All pages of one kind, in the order given by `order` (unknown slugs last). */
export async function getPagesByKind(kind, order = []) {
  const pages = await Promise.all(getPageSlugs().map(getPage));
  const rank = (p) => (order.includes(p.slug) ? order.indexOf(p.slug) : order.length);
  return pages.filter((p) => p.kind === kind).sort((a, b) => rank(a) - rank(b));
}

let postIndex;
/** Post metadata, newest first. */
export function getPostIndex() {
  postIndex ??= withRealImages(JSON.parse(readFileSync(join(POSTS_DIR, 'index.json'), 'utf8')));
  return postIndex;
}

export function getPost(slug) {
  const meta = getPostIndex().find((p) => p.slug === slug);
  if (!meta) return null;
  return { ...JSON.parse(readFileSync(join(POSTS_DIR, `${slug}.json`), 'utf8')), featuredImage: meta.featuredImage };
}

export function getCategories() {
  return JSON.parse(readFileSync(join(POSTS_DIR, 'categories.json'), 'utf8'));
}
