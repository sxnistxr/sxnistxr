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
  await page.screenshot({ path: assets + name });
  await page.close();
}
try {
  await render('header.png', `
  <style>
  .hero{position:relative;width:1200px;height:440px;background:#080609;overflow:hidden;border-radius:16px;color:#f5f3f4}
  .avatar{position:absolute;right:0;top:0;width:470px;height:440px;object-fit:cover;mask-image:linear-gradient(to right,transparent,black 20%)}
  .intro{position:absolute;left:56px;top:50px;z-index:1}
  .byline{display:flex;align-items:center;gap:12px;color:#aaa3ad;font-size:23px}
  .mark{display:block;width:12px;height:12px;border-radius:50%;background:#ff0806}
  h1{font-size:116px;font-weight:900;letter-spacing:-8px;line-height:1;margin:40px 0 25px}
  p{font-size:29px;line-height:1.5;margin:0;color:#d4cfd5;letter-spacing:-.5px}
  .line{position:absolute;left:56px;bottom:43px;width:46px;height:4px;background:#ff0806}
  </style>
  <div class="hero"><img class="avatar" src="${png('avatar.png')}"><div class="intro"><div class="byline"><span class="mark"></span>A personal dev lab</div><h1>sxnistxr</h1><p>Tools for images.<br>Frameworks for the web.</p></div><div class="line"></div></div>`, 440);
  for (const [file, source, url, color, fg, border] of [
    ['compare-preview.png', 'compare-tool.png', 'compare-tool-xi.vercel.app', '#f4dddd', '#4c242a', '#d4aeb4'],
    ['optz-preview.png', 'optz.png', 'dihlabs.lol/optz', '#171217', '#c7bac7', '#433543'],
  ]) {
    await render(file, `<style>
    .frame{width:1200px;height:646px;background:${color};padding:25px 32px 0;border-radius:14px;overflow:hidden}
    .chrome{height:45px;display:flex;align-items:flex-start;gap:9px;color:${fg};font-size:20px}
    .dots{display:flex;gap:7px;margin-top:9px;margin-right:15px}.dots b{width:8px;height:8px;border-radius:50%;background:${fg};opacity:.45}
    .viewport{height:576px;overflow:hidden;border:1px solid ${border};border-radius:8px 8px 0 0}
    img{width:1134px;height:auto}
    </style><div class="frame"><div class="chrome"><div class="dots"><b></b><b></b><b></b></div>${url}</div><div class="viewport"><img src="${png(source)}"></div></div>`, 646);
  }
} finally { await browser.close(); }
