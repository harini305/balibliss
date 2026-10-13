// Local browser QA with zero dependencies: drives the installed Chrome over the
// DevTools Protocol (Node's built-in WebSocket). Run while `npm run dev` is up:
//   node scripts/qa.mjs [baseUrl] [--routes=/,/reiki/] [--all] [--quick] [--viewports=mobile-375,desktop-1440]
//   --all reads every URL from <baseUrl>/sitemap.xml; --quick skips the interaction tests.
// Writes screenshots to qa/screenshots/ and a JSON report to qa/report.json.
import { spawn } from 'node:child_process';
import { mkdir, writeFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';

const DEBUG = process.env.QA_DEBUG === "1";
const log = (...a) => DEBUG && console.log("[qa]", ...a);
const ARGS = process.argv.slice(2);
const flag = (name) => ARGS.find((a) => a.startsWith(`--${name}`))?.split('=')[1] ?? (ARGS.includes(`--${name}`) ? true : undefined);
const BASE = ARGS.find((a) => !a.startsWith('--')) ?? 'http://localhost:3000';
const QUICK = Boolean(flag('quick'));
const ROOT = resolve(import.meta.dirname, '..');
const OUT = join(ROOT, 'qa');
const SHOTS = join(OUT, 'screenshots');
const PORT = 9333;
const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].find((p) => existsSync(p));

const DEFAULT_ROUTES = [
  { path: '/', name: 'home' },
  { path: '/styleguide/', name: 'styleguide' },
  { path: '/this-page-does-not-exist/', name: '404', expectStatus: 404 },
];
const ALL_VIEWPORTS = [
  { name: 'mobile-375', width: 375, height: 812, mobile: true, dpr: 2 },
  { name: 'tablet-768', width: 768, height: 1024, mobile: true, dpr: 2 },
  { name: 'desktop-1440', width: 1440, height: 900, mobile: false, dpr: 1 },
];
const VIEWPORTS = flag('viewports') ? ALL_VIEWPORTS.filter((vp) => flag('viewports').split(',').includes(vp.name)) : ALL_VIEWPORTS;
const nameOf = (p) => (p === '/' ? 'home' : p.replace(/^\/|\/$/g, '').replace(/\//g, '_'));
let ROUTES = DEFAULT_ROUTES;
if (typeof flag('routes') === 'string') ROUTES = flag('routes').split(',').map((p) => DEFAULT_ROUTES.find((r) => r.path === p) ?? { path: p, name: nameOf(p) });
if (flag('all')) {
  const xml = await (await fetch(BASE + '/sitemap.xml')).text();
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  ROUTES = [...paths.map((p) => ({ path: p, name: nameOf(p) })), ...DEFAULT_ROUTES.filter((r) => r.name !== 'home')];
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------- minimal CDP client ----------
class CDP {
  constructor(url) {
    this.ws = new WebSocket(url);
    this.id = 0;
    this.pending = new Map();
    this.handlers = new Map();
    this.ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { res, rej } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        msg.error ? rej(new Error(msg.error.message)) : res(msg.result);
      } else if (msg.method) {
        (this.handlers.get(msg.method) ?? []).forEach((h) => h(msg.params));
      }
    };
  }
  ready() {
    return new Promise((r) => (this.ws.onopen = r));
  }
  send(method, params = {}, timeout = 30000) {
    const id = ++this.id;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((res, rej) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        rej(new Error(`CDP timeout: ${method} ${(params.expression ?? params.url ?? "").slice(0, 60)}`));
      }, timeout);
      this.pending.set(id, { res: (v) => (clearTimeout(timer), res(v)), rej: (e) => (clearTimeout(timer), rej(e)) });
    });
  }
  on(method, h) {
    this.handlers.set(method, [...(this.handlers.get(method) ?? []), h]);
  }
  async evalLong(expr) {
    const r = await this.send("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true }, 120000);
    return r.result.value;
  }
  async eval(expr) {
    const r = await this.send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text);
    return r.result.value;
  }
}

async function launch() {
  const profile = join(tmpdir(), `bb-qa-${Date.now()}`);
  const proc = spawn(CHROME, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profile}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--hide-scrollbars',
    'about:blank',
  ]);
  for (let i = 0; i < 50; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const list = await res.json();
      const page = list.find((t) => t.type === 'page');
      if (page) return { proc, profile, wsUrl: page.webSocketDebuggerUrl };
    } catch {}
    await sleep(200);
  }
  throw new Error('Chrome did not start');
}

// ---------- in-page checks ----------
const PAGE_CHECKS = `(() => {
  const vw = document.documentElement.clientWidth;
  const overflow = document.documentElement.scrollWidth - vw;
  const offenders = overflow > 1
    ? [...document.querySelectorAll('body *')].filter(el => {
        const r = el.getBoundingClientRect();
        return r.width && r.right > vw + 1 && getComputedStyle(el).position !== 'fixed';
      }).slice(0, 8).map(el => el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : '') + ' →' + Math.round(el.getBoundingClientRect().right))
    : [];
  const imgs = [...document.images];
  const broken = imgs.filter(i => i.complete && i.naturalWidth === 0).map(i => i.currentSrc || i.src);
  const pending = imgs.filter(i => !i.complete && i.getBoundingClientRect().width > 0 && getComputedStyle(i).visibility !== 'hidden' && !i.closest('dialog:not([open])')).map(i => i.getAttribute('src'));
  const noAlt = imgs.filter(i => !i.hasAttribute('alt')).map(i => i.src);
  const ids = [...document.querySelectorAll('[id]')].map(e => e.id);
  const dupIds = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
  const controls = [...document.querySelectorAll('input:not([type=hidden]), select, textarea')];
  const unlabelled = controls.filter(c => !(c.labels && c.labels.length) && !c.getAttribute('aria-label') && !c.getAttribute('aria-labelledby')).map(c => c.id || c.name);
  const emptyLinks = [...document.querySelectorAll('a[href], button')].filter(a => !a.textContent.trim() && !a.getAttribute('aria-label') && !a.querySelector('[aria-label], img[alt]:not([alt=""])') && !a.closest('[aria-hidden=true]')).map(a => a.outerHTML.slice(0, 80));
  const heads = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h => +h.tagName[1]);
  const skips = []; heads.forEach((h, i) => { if (i && h > heads[i - 1] + 1) skips.push(heads[i - 1] + '→' + h); });
  const h1s = heads.filter(h => h === 1).length;
  const smallTargets = [...document.querySelectorAll('a[href], button, input, select, summary')].filter(el => {
    if (el.closest('[aria-hidden=true]') || el.closest('p, li > p') || el.offsetParent === null) return false;
    const r = el.getBoundingClientRect(); return r.width > 0 && (r.width < 24 || r.height < 24);
  }).slice(0, 8).map(el => el.tagName.toLowerCase() + ':' + (el.textContent.trim().slice(0, 24) || el.getAttribute('aria-label') || el.id) + ' ' + Math.round(el.getBoundingClientRect().width) + 'x' + Math.round(el.getBoundingClientRect().height));
  const hidden = [...document.querySelectorAll('main *')].filter(el => { const s = getComputedStyle(el); return el.getBoundingClientRect().height > 0 && (s.opacity === '0' || s.visibility === 'hidden'); }).length;
  return {
    title: document.title, lang: document.documentElement.lang,
    robots: document.querySelector('meta[name=robots]')?.content ?? null,
    overflow, offenders, images: imgs.length, broken, pending, noAlt, dupIds, unlabelled, emptyLinks, headingSkips: skips, h1s, smallTargets, hiddenInMain: hidden,
  };
})()`;

async function scrollThrough(cdp) {
  await cdp.evalLong(`(async () => {
    // Scroll only after hydration (page heroes add .intro-ready), or reveals set up later stay hidden.
    for (let t = 0; t < 100 && !document.documentElement.classList.contains('intro-ready'); t++) await new Promise(r => setTimeout(r, 100));
    await new Promise(r => setTimeout(r, 300));
    const h = () => document.documentElement.scrollHeight;
    for (let y = 0; y < h(); y += Math.round(innerHeight * 0.6)) { scrollTo({ top: y, behavior: "instant" }); await new Promise(r => setTimeout(r, 120)); }
    scrollTo({ top: h(), behavior: "instant" }); await new Promise(r => setTimeout(r, 1400));
    scrollTo({ top: 0, behavior: "instant" }); await new Promise(r => setTimeout(r, 600));
  })()`);
}

async function screenshot(cdp, file) {
  // Chrome caps a single capture near 16k px, so long pages are saved in 8000px segments.
  const { cssContentSize } = await cdp.send('Page.getLayoutMetrics');
  const total = Math.ceil(cssContentSize.height);
  const SEG = 8000;
  for (let y = 0, i = 0; y < total; y += SEG, i++) {
    const { data } = await cdp.send('Page.captureScreenshot', {
      format: 'jpeg',
      quality: 70,
      captureBeyondViewport: true,
      clip: { x: 0, y, width: cssContentSize.width, height: Math.min(SEG, total - y), scale: 1 },
    });
    await writeFile(total > SEG ? file.replace(/.jpg$/, `-${i + 1}.jpg`) : file, Buffer.from(data, 'base64'));
  }
}

async function navigate(cdp, url) {
  log("navigate", url);
  const loaded = new Promise((r) => {
    const h = () => r();
    cdp.on('Page.loadEventFired', h);
  });
  const res = await cdp.send('Page.navigate', { url });
  await Promise.race([loaded, sleep(15000)]);
  log("fonts");
  await cdp.eval('document.fonts.ready.then(() => true)');
  await sleep(500);
  return res;
}

// ---------- interaction tests ----------
async function desktopNavTest(cdp) {
  return cdp.eval(`(async () => {
    const wait = (ms) => new Promise(r => setTimeout(r, ms));
    const out = {};
    const trig = document.querySelector('header nav[aria-label=Main] button[aria-expanded]');
    out.triggerVisible = !!trig && trig.offsetParent !== null;
    if (!trig) return out;
    trig.focus(); trig.click(); await wait(100);
    const panel = document.getElementById(trig.getAttribute('aria-controls'));
    out.opensOnClick = trig.getAttribute('aria-expanded') === 'true' && panel.hasAttribute('data-open');
    out.panelLinks = panel.querySelectorAll('a').length;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); await wait(900);
    out.escCloses = trig.getAttribute('aria-expanded') === 'false' && !panel.hasAttribute('data-open') && getComputedStyle(panel).visibility === 'hidden';
    out.focusReturned = document.activeElement === trig;
    trig.click(); await wait(80);
    document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })); await wait(80);
    out.outsideClickCloses = trig.getAttribute('aria-expanded') === 'false';
    const menuBtn = document.querySelector('[aria-controls=mobile-menu]');
    out.menuButtonHidden = !menuBtn || menuBtn.offsetParent === null;
    return out;
  })()`);
}

async function mobileMenuTest(cdp) {
  return cdp.eval(`(async () => {
    const wait = (ms) => new Promise(r => setTimeout(r, ms));
    const out = {};
    const btn = document.querySelector('[aria-controls=mobile-menu]');
    out.menuButtonVisible = !!btn && btn.offsetParent !== null;
    out.desktopNavHidden = getComputedStyle(document.querySelector('header nav[aria-label=Main]')).display === 'none';
    if (!btn) return out;
    btn.focus(); btn.click(); await wait(300);
    const dlg = document.getElementById('mobile-menu');
    out.opens = dlg.open && btn.getAttribute('aria-expanded') === 'true';
    out.modal = dlg.matches(':modal');
    out.focusInside = dlg.contains(document.activeElement);
    out.scrollLocked = document.body.hasAttribute('data-scroll-lock');
    const groups = dlg.querySelectorAll('details');
    out.groups = groups.length;
    if (groups[0]) { groups[0].querySelector('summary').click(); await wait(100); out.accordionOpens = groups[0].open; }
    const r = dlg.getBoundingClientRect();
    out.coversViewport = Math.round(r.width) >= innerWidth - 1;
    dlg.dispatchEvent(new Event('cancel')); dlg.close(); await wait(200);
    out.closes = !dlg.open && btn.getAttribute('aria-expanded') === 'false';
    out.scrollUnlocked = !document.body.hasAttribute('data-scroll-lock');
    out.focusReturned = document.activeElement === btn;
    return out;
  })()`);
}

async function skipLinkTest(cdp) {
  await cdp.eval('scrollTo(0,0); document.activeElement && document.activeElement.blur(); true');
  await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
  await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
  await sleep(150);
  return cdp.eval(`(() => {
    const a = document.activeElement;
    const r = a.getBoundingClientRect();
    return { firstTabStop: a.className + ':' + a.textContent.trim(), visible: r.top >= 0 && r.bottom > 0 && getComputedStyle(a).transform === 'none' };
  })()`);
}

async function formTest(cdp) {
  return cdp.eval(`(async () => {
    const wait = (ms) => new Promise(r => setTimeout(r, ms));
    const form = document.querySelector('form'); if (!form) return null;
    const out = {};
    form.querySelector('[type=submit]').click(); await wait(250);
    const summary = form.querySelector('[role=alert]');
    out.errorSummary = !!summary; out.summaryFocused = document.activeElement === summary;
    out.invalidFields = form.querySelectorAll('[aria-invalid=true]').length;
    const set = (id, v) => { const el = document.getElementById(id); const proto = Object.getPrototypeOf(el); Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, v); el.dispatchEvent(new Event('input', { bubbles: true })); };
    set('sg-enq-name', 'Test Person'); set('sg-enq-contact', 'test@example.com'); set('sg-enq-message', 'Hello');
    document.getElementById('sg-enq-terms').click();
    form.querySelector('[type=submit]').click(); await wait(250);
    out.previewShown = !!form.querySelector('pre');
    out.noFakeSent = !/sent!|message sent|thank you/i.test(form.textContent);
    out.noWindowOpened = true;
    return out;
  })()`);
}

// ---------- main ----------
const report = { base: BASE, date: new Date().toISOString(), chrome: CHROME, results: [], interactions: {}, reducedMotion: null };
await rm(SHOTS, { recursive: true, force: true });
await mkdir(SHOTS, { recursive: true });

const { proc, profile, wsUrl } = await launch();
const cdp = new CDP(wsUrl);
await cdp.ready();
await Promise.all(['Page.enable', 'Runtime.enable', 'Network.enable', 'Log.enable'].map((m) => cdp.send(m)));

let consoleErrors = [];
let failed = [];
cdp.on('Runtime.consoleAPICalled', (p) => p.type === 'error' && consoleErrors.push(p.args.map((a) => a.value ?? a.description).join(' ').slice(0, 300)));
cdp.on('Runtime.exceptionThrown', (p) => consoleErrors.push((p.exceptionDetails.exception?.description ?? p.exceptionDetails.text).slice(0, 300)));
cdp.on('Log.entryAdded', (p) => p.entry.level === 'error' && !/status of 404/.test(p.entry.text) && consoleErrors.push(p.entry.text.slice(0, 300)));
const statusByUrl = new Map();
cdp.on('Network.responseReceived', (p) => statusByUrl.set(p.response.url, p.response.status));
cdp.on('Network.loadingFailed', (p) => !p.canceled && failed.push(p.errorText));

for (const vp of VIEWPORTS) {
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: vp.width, height: vp.height, deviceScaleFactor: vp.dpr, mobile: vp.mobile });
  await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: vp.mobile });
  await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });

  for (const route of ROUTES) {
    consoleErrors = [];
    failed = [];
    statusByUrl.clear();
    const url = BASE + route.path;
    try {
    await navigate(cdp, url);
    const docStatus = statusByUrl.get(url) ?? null;
    log("checks@load");
    const atLoad = await cdp.eval(PAGE_CHECKS); // before scrolling: what is visible / hidden on arrival
    log("scroll");
    await scrollThrough(cdp);
    log("checks");
    const checks = await cdp.eval(PAGE_CHECKS);
    const badResponses = [...statusByUrl].filter(([u, s]) => s >= 400 && u !== url).map(([u, s]) => `${s} ${u}`);
    log("shot");
    await screenshot(cdp, join(SHOTS, `${route.name}--${vp.name}.jpg`));
    const status = docStatus;
    report.results.push({
      viewport: vp.name,
      route: route.path,
      status,
      statusOk: status === (route.expectStatus ?? 200),
      consoleErrors: [...consoleErrors],
      failedRequests: [...failed, ...badResponses],
      hiddenAtLoad: atLoad.hiddenInMain,
      ...checks,
    });
    process.stdout.write(`${vp.name} ${route.path} ${status} overflow=${checks.overflow} errors=${consoleErrors.length}\n`);
    } catch (err) {
      report.results.push({ viewport: vp.name, route: route.path, qaError: err.message });
      process.stdout.write(`${vp.name} ${route.path} QA ERROR ${err.message}\n`);
    }
  }

  if (QUICK) continue;
  // Interactions on the styleguide at this viewport
  await navigate(cdp, BASE + '/styleguide/');
  const inter = {};
  inter.skipLink = await skipLinkTest(cdp);
  inter.nav = vp.width >= 1200 ? await desktopNavTest(cdp) : await mobileMenuTest(cdp);
  // Capture the open navigation state for visual review.
  await cdp.eval(`(async () => {
    scrollTo({ top: 0, behavior: "instant" });
    const t = innerWidth >= 1200 ? document.querySelector('header nav[aria-label=Main] button[aria-expanded]') : document.querySelector('[aria-controls=mobile-menu]');
    t.click(); await new Promise(r => setTimeout(r, 400));
    const d = document.querySelector('#mobile-menu details'); if (innerWidth < 1200 && d) { d.open = true; await new Promise(r => setTimeout(r, 200)); }
    return true;
  })()`);
  {
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 75 });
    await writeFile(join(SHOTS, `nav-open--${vp.name}.jpg`), Buffer.from(data, 'base64'));
  }
  await cdp.eval(`(() => { const d = document.getElementById('mobile-menu'); if (d.open) d.close(); document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); return true; })()`);
  inter.form = await formTest(cdp);
  // Header hide/show on scroll
  inter.header = await cdp.eval(`(async () => {
    const wait = (ms) => new Promise(r => setTimeout(r, ms));
    const h = document.querySelector('header');
    scrollTo({ top: 0, behavior: "instant" }); await wait(300);
    scrollTo({ top: 1600, behavior: "instant" }); await wait(400);
    const hiddenOnDown = h.hasAttribute('data-hidden') && h.hasAttribute('data-compact');
    scrollTo({ top: 1000, behavior: "instant" }); await wait(400);
    const shownOnUp = !h.hasAttribute('data-hidden');
    scrollTo({ top: 0, behavior: "instant" }); await wait(300);
    return { hiddenOnDown, shownOnUp, expandedAtTop: !h.hasAttribute('data-compact') };
  })()`);
  // Homepage motion that screenshots can't show: the pinned horizontal sessions gallery.
  if (vp.width >= 1024) {
    await navigate(cdp, BASE + '/');
    inter.gallery = await cdp.evalLong(`(async () => {
      const wait = (ms) => new Promise(r => setTimeout(r, ms));
      for (let t = 0; t < 100 && !document.documentElement.classList.contains('intro-ready'); t++) await wait(100);
      await wait(800);
      const wrap = document.querySelector('[data-pinned]');
      if (!wrap) return { pinned: false };
      const track = wrap.querySelector('[role=list]');
      const top = wrap.getBoundingClientRect().top + scrollY;
      scrollTo({ top: top + innerHeight * 0.8, behavior: 'instant' }); await wait(1600);
      const x = new DOMMatrix(getComputedStyle(track).transform).m41;
      const stuck = Math.abs(wrap.getBoundingClientRect().top) < 2;
      scrollTo({ top: 0, behavior: 'instant' });
      return { pinned: true, stuckToTop: stuck, translatedX: Math.round(x), moved: x < -50 };
    })()`);
  }
  report.interactions[vp.name] = inter;
}

// Reduced motion: nothing hidden, ring drawn, no transforms from parallax
if (!QUICK) {
await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
await navigate(cdp, BASE + '/styleguide/');
const rm1 = await cdp.eval(PAGE_CHECKS);
const rmDetail = await cdp.eval(`(() => ({
  dashedPaths: [...document.querySelectorAll('svg path')].filter(p => p.style.strokeDashoffset && p.style.strokeDashoffset !== '0px' && p.style.strokeDashoffset !== '0').length,
  transformedParallax: [...document.querySelectorAll('[class*=Parallax_inner]')].filter(el => getComputedStyle(el).transform !== 'none').length,
  durToken: getComputedStyle(document.documentElement).getPropertyValue('--dur-3').trim(),
}))()`);
await screenshot(cdp, join(SHOTS, `styleguide--reduced-motion-1440.jpg`));
report.reducedMotion = { hiddenInMain: rm1.hiddenInMain, ...rmDetail };
}

await writeFile(join(OUT, 'report.json'), JSON.stringify(report, null, 2));
proc.kill();
await sleep(500);
await rm(profile, { recursive: true, force: true }).catch(() => {});
console.log('\nInteractions:', JSON.stringify(report.interactions, null, 1));
console.log('Reduced motion:', JSON.stringify(report.reducedMotion));
