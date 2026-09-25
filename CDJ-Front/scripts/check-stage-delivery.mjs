import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
const require = createRequire(resolve('package.json'));
const ts = require('typescript');
const output = resolve('artifacts/stage-delivery');
await mkdir(output, { recursive: true });
const model = await readFile('src/app/learning-experience/stage-delivery/stage-experiences.data.ts', 'utf8');
await writeFile(output + '/model.mjs', ts.transpileModule(model, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } }).outputText);
const { DELIVERY_OPTIONS, resolveStageDelivery, PROFILE_ROUTES } = await import(pathToFileURL(output + '/model.mjs').href);
const root = resolve('dist/stage-check/browser');
const mime = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.webp':'image/webp', '.jpg':'image/jpeg', '.png':'image/png', '.svg':'image/svg+xml', '.woff2':'font/woff2', '.ttf':'font/ttf', '.ico':'image/x-icon', '.mp3':'audio/mpeg', '.pdf':'application/pdf' };
let server;
const base = process.env.BASE_URL || 'http://127.0.0.1:4173';
if (!process.env.BASE_URL) {
  server = createServer(async (req, res) => { try {
    const pathname = decodeURIComponent(new URL(req.url, base).pathname);
    let file = resolve(root, '.' + pathname);
    if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403).end(); return; }
    try { if (!(await stat(file)).isFile()) file = resolve(root, 'index.html'); }
    catch { if (extname(pathname)) { res.writeHead(404).end(); return; } file = resolve(root, 'index.html'); }
    res.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream' }); res.end(await readFile(file));
  } catch { res.writeHead(500).end(); } });
  await new Promise(done => server.listen(4173, '127.0.0.1', done));
}
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ reducedMotion: 'reduce', colorScheme: 'dark' });
await context.addInitScript(() => localStorage.setItem('cdj_theme', 'dark'));
const page = await context.newPage(); page.setDefaultTimeout(18000);
const report = { base, variants: [], neutral: [], links: [], errors: [], screenshots: [] };
page.on('pageerror', e => report.errors.push(e.message));
let failure;
const urlFor = (slug, o, context = 'casa', focus) => base + '/actividad/' + slug + '?' + new URLSearchParams({ perfil: o.profile, etapa: o.stage, contexto: context, ...(focus ? { enfoque: focus } : {}) });
const panel = n => page.locator('.step-panel[data-step="' + n + '"]');
const capture = async name => { await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(1000); await page.screenshot({ path: output + '/' + name, fullPage: true }); report.screenshots.push(name); };
try {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 960 });
    for (const [slug, options] of Object.entries(DELIVERY_OPTIONS)) {
      for (const o of options) { for (const focus of o.alternativeBand ? [o.band, o.alternativeBand] : [o.band]) {
        const place = o.profile === 'teachers' ? 'escuela' : 'casa';
        const d = resolveStageDelivery(slug, o.profile, o.stage, place, focus);
        await page.goto(urlFor(slug, o, place, focus), { waitUntil: 'domcontentloaded' });
        await page.locator('[data-variant="' + d.key + '"][data-presentation="guided-v3"]').waitFor();
        await page.locator('#global-preloader').waitFor({ state: 'hidden' });
        await page.waitForFunction(() => { const im = document.querySelector('.case-hero img'); return im?.complete && im.naturalWidth > 0; });
        assert.equal(await page.locator('[data-experience-conditions] .start-box').count(), 1);
        assert.equal(await page.locator('.stage-xp iframe,.stage-xp input[type="text"],.stage-xp input[type="file"]').count(), 0);
        assert.equal(await page.locator('.step-panel').count(), 1, 'Only the active panel is rendered');
        assert.ok((await page.locator('.goal').innerText()).includes(d.lesson.objective));
        assert.equal(await page.locator('.age-notes').count(), d.option.band === 'sec' ? 1 : 0);
        assert.equal(await page.locator('.guide-card').count(), ['families', 'teachers'].includes(o.profile) ? 3 : 0);
        assert.equal(await page.locator('.next-button').isDisabled(), true);
        assert.equal(await page.locator('.clues').getAttribute('open'), null);
        const first = d.lesson.first.choices.findIndex(c => c.preferred);
        const second = d.lesson.second.choices.findIndex(c => c.preferred);
        await page.locator('input[name="decision-0"]').nth(first).check();
        assert.ok((await page.locator('.feedback').innerText()).includes(d.lesson.first.choices[first].feedback));
        assert.equal(await panel(0).count(), 1, 'Answer does not skip its explanation');
        await page.locator('.next-button').click(); await panel(1).waitFor();
        await page.waitForFunction(() => document.activeElement?.classList.contains('step-heading'));
        assert.equal(await page.locator('input[name="decision-0"]').count(), 0);
        await page.locator('.secondary-action').click(); await panel(0).waitFor();
        assert.equal(await page.locator('input[name="decision-0"]').nth(first).isChecked(), true);
        await page.locator('.next-button').click(); await panel(1).waitFor();
        await page.locator('input[name="decision-1"]').nth(second).check();
        assert.ok((await page.locator('.feedback').innerText()).includes(d.lesson.second.choices[second].feedback));
        await page.locator('.next-button').click(); await panel(2).waitFor();
        assert.ok((await page.locator('.evidence').innerText()).includes(d.lesson.evidence));
        assert.equal(await page.locator('.finish-button').isDisabled(), true);
        await page.locator('input[name="practice-action"]').first().check();
        await page.locator('.finish-button').click(); await page.locator('.finish-message').waitFor();
        assert.equal(await page.locator('.finish-button').isDisabled(), true);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1), false, 'Overflow ' + d.key + ' at ' + width);
        assert.equal(await page.locator('.real-support h2').innerText(), 'Si ocurre algo real');
        const back = await page.locator('.entry-tools .back').getAttribute('href');
        assert.equal(new URL(back, base).hash, '#' + o.stage);
        assert.equal(new URL(back, base).searchParams.get('contexto'), place);
        assert.equal(new URL(back, base).searchParams.get('enfoque'), focus);
        await page.locator('.restart-button').click(); await panel(0).waitFor();
        assert.equal(await page.locator('.step-panel input:checked').count(), 0);
        if ((slug === 'ciberseguridad-familiar' && o.profile === 'families' && focus === 'pa') || (slug === 'roblox-seguridad' && o.profile === 'kids' && focus === 'pb') || (slug === 'fomo' && o.profile === 'teens' && focus === 'sec')) {
          await page.evaluate(() => window.scrollTo(0,0));
          await capture([slug,o.profile,focus,width,'dark'].join('-')+'.png');
        }
        // Follow the actual return link and verify the page still selects the same stage.
        await page.locator('.entry-tools .back').click();
        await page.waitForURL(u => u.pathname === PROFILE_ROUTES[o.profile] && u.hash === '#' + o.stage);
        report.variants.push({ width, slug, profile:o.profile, stage:o.stage, focus, context:place, finished:true, back:true, statePreserved:true, singlePanel:true, overflow:false });
      } }
    }
  }
  for (const slug of Object.keys(DELIVERY_OPTIONS)) {
    for (const query of ['', '?perfil=unknown&etapa=preescolar', '?perfil=kids&etapa=preparatoria', '?perfil=families&etapa=fam-18-22']) {
      await page.goto(base + '/actividad/' + slug + query, { waitUntil:'domcontentloaded' });
      await page.locator('[data-stage-chooser]').waitFor();
      assert.equal(await page.locator('[data-variant]').count(),0);
      report.neutral.push({slug,query,neutral:true});
    }
  }
  await page.goto(urlFor('ciberseguridad-familiar',{profile:'families',stage:'fam-6-11'},'casa','pa'),{waitUntil:'domcontentloaded'});
  await panel(0).waitFor();
  await page.mouse.move(0,0);
  const card=page.locator('.guide-card').first();
  await card.focus(); await page.keyboard.press('Enter');
  await page.waitForFunction(v=>document.querySelector('.guide-card')?.getAttribute('aria-expanded')===v,'true');
  await page.keyboard.press('Space');
  await page.waitForFunction(v=>document.querySelector('.guide-card')?.getAttribute('aria-expanded')===v,'false');
  await card.hover(); await page.waitForFunction(v=>document.querySelector('.guide-card')?.getAttribute('aria-expanded')===v,'true');
  await page.mouse.move(0,0); await page.waitForFunction(v=>document.querySelector('.guide-card')?.getAttribute('aria-expanded')===v,'false');
  await page.locator('input[name="decision-0"]').first().focus(); await page.keyboard.press('ArrowDown');
  assert.equal(await page.locator('input[name="decision-0"]:checked').count(),1);
  await page.locator('.context-controls select').nth(1).selectOption('pb');
  await page.waitForFunction(()=>document.querySelector('[data-variant]')?.getAttribute('data-variant')?.includes(':pb:'));
  assert.equal(await page.locator('.step-panel input:checked').count(),0);
  await page.locator('.context-controls select').first().selectOption('escuela');
  await page.waitForURL(u=>u.searchParams.get('contexto')==='escuela');
  assert.equal(await page.locator('.school-note').count(),1);
  const related=await page.locator('.related a').evaluateAll(es=>es.map(e=>e.getAttribute('href')));
  for(const href of related){const u=new URL(href,base);assert.ok(resolveStageDelivery(u.pathname.split('/').pop(),u.searchParams.get('perfil'),u.searchParams.get('etapa'),u.searchParams.get('contexto'),u.searchParams.get('enfoque')));report.links.push(href);}
  await page.evaluate(()=>{window.print=()=>{window.__printRequested=true;};});
  await page.getByRole('button',{name:'Imprimir caso y guía'}).click();
  assert.equal(await page.evaluate(()=>window.__printRequested),true);
  await page.emulateMedia({media:'print'});
  assert.equal(await page.locator('.questionnaire').isVisible(),false);
  assert.equal(await page.locator('.print-only').isVisible(),true);
  assert.equal(await page.locator('.print-only section').count(),2);
  assert.ok((await page.locator('.print-only').innerText()).includes('Antes, durante y al cerrar'));
  await page.emulateMedia({media:'screen'});
  assert.equal(await page.locator('.step-panel').evaluate(el=>getComputedStyle(el).animationName),'none');
  report.print=true;report.keyboard=true;report.reducedMotion=true;report.contextReset=true;
  // Validate actual pointer/touch behaviour and light appearance independently.
  const touch=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce',colorScheme:'light'});
  await touch.addInitScript(()=>localStorage.setItem('cdj_theme','light'));
  const mobile=await touch.newPage();
  await mobile.goto(urlFor('ciberseguridad-familiar',{profile:'families',stage:'fam-6-11'},'casa','pa'),{waitUntil:'domcontentloaded'});
  const touchCard=mobile.locator('.guide-card').last();
  await touchCard.tap(); await mobile.waitForFunction(v=>Array.from(document.querySelectorAll('.guide-card')).at(-1)?.getAttribute('aria-expanded')===v,'true');
  await touchCard.tap(); await mobile.waitForFunction(v=>Array.from(document.querySelectorAll('.guide-card')).at(-1)?.getAttribute('aria-expanded')===v,'false');
  await mobile.evaluate(()=>document.fonts.ready);await mobile.waitForTimeout(1000);
  await mobile.screenshot({path:output+'/familias-390-light.png',fullPage:true});report.screenshots.push('familias-390-light.png');
  await mobile.close();await touch.close();report.touch=true;
  const light=await browser.newContext({viewport:{width:1440,height:960},reducedMotion:'no-preference',colorScheme:'light'});
  await light.addInitScript(()=>localStorage.setItem('cdj_theme','light'));
  const lightPage=await light.newPage();
  await lightPage.goto(urlFor('ciberseguridad-familiar',{profile:'families',stage:'fam-6-11'},'casa','pa'),{waitUntil:'domcontentloaded'});
  await lightPage.locator('.step-panel').waitFor();
  assert.ok((await lightPage.locator('.step-panel').evaluate(el=>getComputedStyle(el).animationName)).endsWith('slide-in'));
  assert.ok(parseFloat(await lightPage.locator('.guide-inner').first().evaluate(el=>getComputedStyle(el).transitionDuration))>0);
  await lightPage.locator('.guide-card').nth(1).hover();
  await lightPage.waitForFunction(()=>document.querySelectorAll('.guide-card')[1]?.getAttribute('aria-expanded')==='true');
  await lightPage.evaluate(()=>document.fonts.ready);await lightPage.waitForTimeout(1200);
  await lightPage.screenshot({path:output+'/familias-1440-light.png',fullPage:true});report.screenshots.push('familias-1440-light.png');
  await lightPage.locator('input[name="decision-0"]').first().check();await lightPage.locator('.next-button').click();
  await lightPage.locator('[data-step="1"]').waitFor();await lightPage.waitForTimeout(400);
  assert.equal(await lightPage.locator('.step-panel').count(),1);
  report.animations=true;
  await lightPage.close();await light.close();
  await page.setViewportSize({width:1440,height:960});
  await page.goto(base+'/recursos',{waitUntil:'domcontentloaded'});await page.locator('h1').waitFor();
  for(const slug of Object.keys(DELIVERY_OPTIONS))assert.ok(await page.locator('a[href*="/actividad/'+slug+'"]').count()>0);
  await page.locator('.filter-grid select').nth(0).selectOption('teachers');
  await page.locator('.filter-grid select').nth(2).selectOption('teach');
  await page.locator('.filter-grid select').nth(1).selectOption('Secundaria');
  assert.equal(await page.locator('a[href*="/actividad/ciberseguridad-familiar"]').count(),1);
  await page.locator('.filter-grid select').nth(0).selectOption('families');
  await page.locator('.filter-grid select').nth(2).selectOption('talk');
  await page.locator('.filter-grid select').nth(1).selectOption('18 - 22 años');
  assert.equal(await page.locator('a[href*="/actividad/fomo"],a[href*="/actividad/ciberseguridad-familiar"],a[href*="/actividad/roblox-seguridad"]').count(),0);
  report.catalog=true;
  await page.goto(base+'/pantallas-seguras',{waitUntil:'domcontentloaded'});await page.locator('#familias').waitFor();
  assert.equal(await page.locator('#ocurrio-algo,#preguntas,a[href^="/ayuda"]').count(),0);
  await page.goto(base+'/actividad/uso-con-intencion?perfil=kids',{waitUntil:'domcontentloaded'});await page.locator('.xp').waitFor();assert.equal(await page.locator('.stage-xp').count(),0);
  report.legacyPreserved=true;
  assert.equal(report.variants.length,42);assert.deepEqual(report.errors,[]);report.ok=true;
}catch(e){failure=e;report.ok=false;report.failure=e.stack;await page.screenshot({path:output+'/failure.png',fullPage:true}).catch(()=>{});}
finally{await writeFile(output+'/report.json',JSON.stringify(report,null,2));console.log('PRESENTATION_REPORT '+JSON.stringify(report));await browser.close();if(server)await new Promise(done=>server.close(done));}
if(failure)throw failure;
