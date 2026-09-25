import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, stat, mkdir, writeFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { chromium } from 'playwright';

// Run after: ng build --output-path=dist/pantallas-check
// Playwright is installed by the validation job, not added to production dependencies.
const root = resolve('dist/pantallas-check/browser');
const output = resolve('artifacts/pantallas-seguras');
await mkdir(output, { recursive: true });
const mime = {
  '.html': 'text/html; charset=utf-8', '.js': 'application/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml',
  '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.mp3': 'audio/mpeg',
  '.pdf': 'application/pdf', '.ico': 'image/x-icon',
};
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    let file = resolve(root, '.' + pathname);
    if (file !== root && !file.startsWith(root + sep)) {
      response.writeHead(403).end();
      return;
    }
    try {
      if (!(await stat(file)).isFile()) file = resolve(root, 'index.html');
    } catch {
      if (extname(pathname)) {
        response.writeHead(404).end();
        return;
      }
      file = resolve(root, 'index.html');
    }
    response.writeHead(200, { 'Content-Type': mime[extname(file)] ?? 'application/octet-stream' });
    response.end(await readFile(file));
  } catch {
    response.writeHead(500).end();
  }
});
await new Promise((done) => server.listen(4173, '127.0.0.1', done));
const base = 'http://127.0.0.1:4173';
const browser = await chromium.launch({ headless: true });
const report = { viewports: [], resources: [], errors: [] };
const context = await browser.newContext({ reducedMotion: 'reduce' });
const page = await context.newPage();
page.on('pageerror', (error) => report.errors.push(error.message));
let failure;
try {
  for (const width of [1440, 900, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(base + '/pantallas-seguras', { waitUntil: 'domcontentloaded' });
    await page.locator('.screens-page .age-row').first().waitFor();
    await page.locator('#global-preloader').waitFor({ state: 'hidden' });
    await page.evaluate(() => document.fonts.ready);
    // The application has a JavaScript-driven entry transition; do not capture mid-transition.
    await page.waitForTimeout(1200);
    await page.waitForFunction(() => {
      const image = document.querySelector('.screens-hero img');
      return image && image.complete && image.naturalWidth > 0;
    });
    assert.equal(await page.locator('.age-row').count(), 4);
    assert.equal(await page.locator('.substage').count(), 2);
    assert.equal(await page.locator('.section-nav a').count(), 5);
    assert.equal(await page.locator('.related-resource').count(), 10);
    assert.ok(await page.locator('.substage').first().innerText().then((text) => text.includes('nunca a solas')));
    assert.ok(await page.locator('#redes-sociales').isVisible());
    assert.equal(await page.locator('#redes-sociales').locator('details').count(), 0);
    const overflow = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));
    assert.ok(overflow.content <= overflow.viewport + 1, `Horizontal overflow at ${width}: ${JSON.stringify(overflow)}`);
    await page.screenshot({ path: `${output}/inicio-${width}.png` });
    if (width === 1440 || width === 390) {
      await page.locator('#redes-sociales').screenshot({ path: `${output}/aviso-${width}.png` });
      await page.locator('#family-6-11').screenshot({ path: `${output}/primaria-${width}.png` });
      await page.locator('#escuela').screenshot({ path: `${output}/escuelas-${width}.png` });
    }
    await page.locator('.section-nav a[href$="#infografia"]').click();
    await page.waitForFunction(() => location.hash === '#infografia');
    // Fragment navigation also creates a View Transition: wait before capturing its target.
    await page.waitForTimeout(1500);
    await page.locator('#infografia img').scrollIntoViewIfNeeded();
    await page.waitForFunction(() => {
      const image = document.querySelector('#infografia img');
      return image && image.complete && image.naturalWidth === 1563 && image.naturalHeight === 1600;
    });
    const imageBox = await page.locator('#infografia img').boundingBox();
    assert.ok(imageBox && Math.abs(imageBox.width / imageBox.height - 1563 / 1600) < 0.005, 'Do not crop or distort the infographic');
    assert.equal(await page.locator('#infografia a[download]').count(), 1);
    assert.equal(await page.locator('#infografia a[target="_blank"]').count(), 2);
    assert.equal(await page.locator('#documentos a[href*="ProtocoloActuacionescolar"]').count(), 0, 'Keep the institutional protocol hidden');
    if (width === 1440 || width === 390) {
      await page.locator('#infografia').screenshot({ path: `${output}/infografia-${width}.png` });
    }
    if (width === 1440) {
      const imageResponse = await page.request.get(base + '/pantallas-seguras/infografia-ley-jalisco.jpg');
      assert.equal(imageResponse.status(), 200);
      assert.equal(imageResponse.headers()['content-type'], 'image/jpeg');
      assert.deepEqual(await imageResponse.body(), await readFile(resolve(root, 'pantallas-seguras/infografia-ley-jalisco.jpg')));
      const [popup] = await Promise.all([
        page.waitForEvent('popup'),
        page.locator('.infographic-actions a[target="_blank"]').click(),
      ]);
      await popup.waitForLoadState('domcontentloaded');
      await popup.waitForFunction(() => {
        const image = document.querySelector('img');
        return image && image.complete && image.naturalWidth === 1563;
      });
      await popup.close();
      const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.locator('#infografia a[download]').click(),
      ]);
      assert.equal(download.suggestedFilename(), 'infografia-pantallas-seguras-jalisco.jpg');
      assert.equal(await download.failure(), null);
      report.infographic = { originalImage: true, fullSizeLink: true, download: true };
    }
    await page.locator('.section-nav a[href$="#familias"]').click();
    await page.waitForFunction(() => location.hash === '#familias');
    await page.waitForTimeout(1500);
    const familyPosition = await page.locator('#familias').boundingBox();
    assert.ok(familyPosition && familyPosition.y < 900 && familyPosition.y > -50, 'Family anchor should be in view');
    await page.screenshot({ path: `${output}/familias-${width}.png` });
    await page.locator('.section-nav a[href$="#documentos"]').click();
    await page.waitForFunction(() => location.hash === '#documentos');
    await page.waitForTimeout(1500);
    assert.equal(await page.locator('#documentos').count(), 1);
    assert.equal(await page.locator('#ocurrio-algo, #preguntas, .help-link-block, .faq-list').count(), 0);
    assert.equal(await page.locator('a[href^="/ayuda"], a[href$="#ocurrio-algo"], a[href$="#preguntas"]').count(), 0);
    // Preserve keyboard navigation after removing the two unpublished sections.
    await page.locator('.section-nav a[href$="#derechos"]').focus();
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => location.hash === '#derechos');
    await page.waitForTimeout(1500);
    if (width === 1440 || width === 390) {
      await page.locator('.screens-page').screenshot({ path: `${output}/pagina-${width}.png` });
    }
    report.viewports.push({ width, overflow: false, stages: 4, primarySubStages: 2, hiddenSections: true, keyboard: true });
  }
  await page.goto(base + '/pantallas-seguras', { waitUntil: 'domcontentloaded' });
  await page.locator('.related-resource').first().waitFor();
  const links = await page.locator('.related-resource, .all-resources-link').evaluateAll((elements) =>
    elements.map((element) => ({ title: element.textContent.trim(), href: element.getAttribute('href') })),
  );
  for (const link of links) {
    assert.ok(link.href && link.href.startsWith('/'), 'Resources must use real internal destinations');
    const expected = new URL(link.href, base);
    await page.goto(expected.href, { waitUntil: 'domcontentloaded' });
    await page.locator('h1').first().waitFor();
    assert.equal(new URL(page.url()).pathname, expected.pathname, `Unexpected redirect: ${link.href}`);
    assert.equal(new URL(page.url()).search, expected.search, `Lost profile: ${link.href}`);
    assert.equal(new URL(page.url()).hash, expected.hash, `Lost stage: ${link.href}`);
    report.resources.push({ href: link.href, heading: await page.locator('h1').first().innerText() });
  }
  // Check all public entry points, including collapsed mobile navigation and footer.
  report.helpVisibility = [];
  for (const route of [
    '/', '/recursos', '/p/ninas-y-ninos', '/p/adolescentes', '/p/familias',
    '/p/docentes', '/p/familias/videojuegos', '/edutips', '/quienes-somos',
    '/series/el-dia-que-casi', '/series/pequenos-cibernautas',
  ]) {
    await page.goto(base + route, { waitUntil: 'domcontentloaded' });
    await page.locator('h1').first().waitFor();
    await page.locator('#global-preloader').waitFor({ state: 'hidden' });
    assert.equal(new URL(page.url()).pathname, route, `Preserved route: ${route}`);
    assert.equal(await page.locator('a[href^="/ayuda"]').count(), 0, `Hidden help link on ${route}`);
    assert.equal(await page.locator('app-ayuda').count(), 0);
    if (route === '/p/familias') {
      assert.ok(await page.locator('.featured-video__actions a[href="/pantallas-seguras"]').count() > 0,
        'Keep the video links that still point to Pantallas Seguras');
    }
    if (route === '/recursos') {
      assert.equal(await page.getByText('Ayuda Digital', { exact: true }).count(), 0);
    }
    report.helpVisibility.push({ route, helpLinks: 0 });
  }
  for (const route of ['/ayuda', '/ayuda#canales', '/ayuda#pasos']) {
    await page.goto(base + route, { waitUntil: 'domcontentloaded' });
    await page.waitForURL((url) => url.pathname === '/pantallas-seguras');
    await page.locator('.screens-page').waitFor();
    assert.equal(await page.locator('app-ayuda, #ocurrio-algo, #preguntas').count(), 0);
    report.helpVisibility.push({ route, redirectedTo: '/pantallas-seguras' });
  }
  assert.deepEqual(report.errors, [], 'Browser runtime errors');
  report.ok = true;
} catch (error) {
  failure = error;
  report.ok = false;
  report.failure = error.stack;
  await page.screenshot({ path: `${output}/failure.png`, fullPage: true }).catch(() => {});
} finally {
  await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  await browser.close();
  await new Promise((done) => server.close(done));
}
if (failure) throw failure;
