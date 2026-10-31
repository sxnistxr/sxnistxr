// Run with Playwright available: bun scripts/render-assets.mjs
// Optionally set CHROMIUM_EXECUTABLE to an existing Chromium binary.
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const assets = fileURLToPath(new URL('../assets/', import.meta.url));
const png = name => `data:image/png;base64,${readFileSync(assets + name).toString('base64')}`;
const browser = await chromium.launch({
  ...(process.env.CHROMIUM_EXECUTABLE ? { executablePath: process.env.CHROMIUM_EXECUTABLE } : {}),
  args: ['--no-sandbox'],
});
const base = `*{box-sizing:border-box}body{margin:0;font-family:'Noto Sans',Arial,sans-serif}img{display:block}`;
async function render(name, html, height) {
  const page = await browser.newPage({ viewport: { width: 1200, height }, deviceScaleFactor: 1 });
  await page.setContent(`<html><head><style>${base}</style></head><body>${html}</body></html>`);
  await page.evaluate(() => Promise.all([...document.images].map(i => i.decode())));
  await page.screenshot({ path: assets + name, omitBackground: true });
  await page.close();
}
try {
  await render('header.png', `
  <style>
  .hero{position:relative;width:1200px;height:360px;background:#080609;overflow:hidden;border-radius:16px;color:#f5f3f4}
  .avatar{position:absolute;right:0;top:0;width:470px;height:360px;object-fit:cover;mask-image:linear-gradient(to right,transparent,black 20%)}
  .intro{position:absolute;left:56px;top:72px;z-index:1}
  h1{font-size:105px;font-weight:900;letter-spacing:-6px;line-height:1;margin:0 0 25px}
  p{font-size:29px;line-height:1.5;margin:0;color:#d4cfd5;letter-spacing:-.5px}
  </style>
  <div class="hero"><img class="avatar" src="${png('avatar.png')}"><div class="intro"><h1>dev car :3</h1><p>Tools for images.<br>Frameworks for the web.</p></div></div>`, 360);
} finally { await browser.close(); }
