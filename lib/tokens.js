import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/** Reads raw colour tokens from styles/tokens.css at build time (styleguide only). */
export function readColorTokens() {
  const css = readFileSync(join(process.cwd(), 'styles/tokens.css'), 'utf8');
  const tokens = [];
  for (const m of css.matchAll(/--(c-[a-z]+(?:-[a-z0-9]+)?):\s*(#[0-9a-f]{6})\s*;(?:[ \t]*\/\*[ \t]*(.*?)[ \t]*\*\/)?/gi)) {
    tokens.push({ name: `--${m[1]}`, hex: m[2].toLowerCase(), note: m[3] ?? '' });
  }
  return tokens;
}
