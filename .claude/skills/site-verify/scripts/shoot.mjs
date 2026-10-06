// Screenshot site pages in light and dark at desktop and phone width, and report layout problems.
// Usage: node shoot.mjs OUT_DIR URL [URL ...] [--hover=SELECTOR] [--scroll=SELECTOR]
// Needs playwright-core (NODE_PATH pointing at its node_modules) and system Chrome.
import { mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright-core');

const args = process.argv.slice(2);
const flag = (name) => args.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
const [outDir, ...urls] = args.filter((a) => !a.startsWith('--'));
if (!outDir || !urls.length) {
  console.error('Usage: node shoot.mjs OUT_DIR URL [URL ...] [--hover=SELECTOR] [--scroll=SELECTOR]');
  process.exit(2);
}
mkdirSync(outDir, { recursive: true });

const viewports = [{ name: 'desktop', width: 1440, height: 900 }, { name: 'phone', width: 390, height: 844 }];
const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome-stable' });
let problems = 0;

for (const url of urls) {
  const slug = new URL(url).pathname.replace(/^\/|\/$/g, '').replace(/\//g, '_') || 'home';
  for (const vp of viewports) {
    for (const scheme of ['light', 'dark']) {
      const context = await browser.newContext({ viewport: vp, colorScheme: scheme, deviceScaleFactor: 1 });
      // Pages read the saved theme first; set it so the toggle state matches the scheme.
      await context.addInitScript((s) => { try { localStorage.setItem('theme', s); } catch (e) {} }, scheme);
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(400);

      // Layout report: horizontal overflow, and blocks inside main that miss the shared content edges.
      const report = await page.evaluate(() => {
        const overflow = document.documentElement.scrollWidth - window.innerWidth;
        const main = document.querySelector('main .project-body, main');
        const edges = [];
        if (main) {
          const box = main.getBoundingClientRect();
          for (const node of main.querySelectorAll('figure, .overview-card, .pdf-viewer, table, svg[viewBox]')) {
            const r = node.getBoundingClientRect();
            const card = node.closest('.overview-card');
            if (!r.width || (card && card !== node)) continue;
            if (r.right > box.right + 1 || r.left < box.left - 1) edges.push(`${node.tagName.toLowerCase()}.${node.className.baseVal ?? node.className} ${Math.round(r.left)}–${Math.round(r.right)} outside ${Math.round(box.left)}–${Math.round(box.right)}`);
          }
        }
        return { overflow, edges };
      });

      const base = `${outDir}/${slug}-${vp.name}-${scheme}`;
      await page.screenshot({ path: `${base}.png`, fullPage: true });
      const scroll = flag('scroll');
      if (scroll && await page.$(scroll)) {
        await page.locator(scroll).first().scrollIntoViewIfNeeded();
        await page.waitForTimeout(400);
        await page.screenshot({ path: `${base}-scroll.png` });
      }
      const hover = flag('hover');
      if (hover && vp.name === 'desktop' && await page.$(hover)) {
        await page.locator(hover).first().scrollIntoViewIfNeeded();
        await page.locator(hover).first().hover();
        await page.waitForTimeout(300);
        await page.screenshot({ path: `${base}-hover.png` });
      }

      const issues = [];
      if (report.overflow > 0) issues.push(`horizontal scroll ${report.overflow}px`);
      issues.push(...report.edges, ...errors.map((e) => `JS: ${e}`));
      problems += issues.length;
      console.log(`${issues.length ? '✗' : '✓'} ${base}.png${issues.map((i) => `\n    ${i}`).join('')}`);
      await context.close();
    }
  }
}
await browser.close();
process.exit(problems ? 1 : 0);
