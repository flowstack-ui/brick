// Production-only optional framework qualification. No framework runtime import
// enters the package. Both local dependency archives must be digest locked.
import { mkdtemp, cp, readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import { resolve, join } from 'node:path';
import { spawnSync, spawn } from 'node:child_process';
import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';
import { verifyImageNetwork } from './verify-image-network.mjs';
const [brickPath,brickHash,atomPath,atomHash]=process.argv.slice(2);
for(const [file,hash] of [[brickPath,brickHash],[atomPath,atomHash]]) {
 assert.ok(file && /^[a-f0-9]{64}$/.test(hash??''),'Supply Brick archive/hash and Atom archive/hash');
 assert.equal(createHash('sha256').update(await readFile(file)).digest('hex'),hash);
}
const cwd=await mkdtemp(join(tmpdir(),'brick-image-next-'));
await cp('test/fixtures/image-next',cwd,{recursive:true});
await mkdir(join(cwd,'public'));
for(const [from,to] of [['studio.webp','studio.webp'],['studio-384.webp','studio-small.webp'],['studio.webp','deferred.webp']]) await cp(`playground/public/assets/image/${from}`,join(cwd,'public',to));
const manifest=JSON.parse(await readFile(join(cwd,'package.json')));
manifest.dependencies['@flowstack-ui/brick']=`file:${resolve(brickPath)}`;
manifest.dependencies['@flowstack-ui/atom']=`file:${resolve(atomPath)}`;
await writeFile(join(cwd,'package.json'),JSON.stringify(manifest,null,2));
function run(command,args){const r=spawnSync(command,args,{cwd,encoding:'utf8',env:{...process.env,NEXT_TELEMETRY_DISABLED:'1'},timeout:300000});awaitLog(command+' '+args.join(' '),r.stdout+r.stderr);if(r.status!==0)throw new Error(r.stdout+r.stderr);}
function awaitLog(label,content){process.stdout.write(label+'\n'+content+'\n');}
run('npm',['install','--no-audit','--no-fund']);
run('npm',['run','build']);
const port=4097;
const server=spawn('npm',['run','start','--','-p',String(port)],{cwd,stdio:'pipe',env:{...process.env,NEXT_TELEMETRY_DISABLED:'1'}});
let output='';server.stdout.on('data',s=>output+=s);server.stderr.on('data',s=>output+=s);
const browser=await chromium.launch();
const evidence={cwd,versions:manifest.dependencies,archives:{brickHash,atomHash},cases:[]};
try {
 let ready=false;
 for(let attempt=0;attempt<100;attempt++){try {if((await fetch(`http://127.0.0.1:${port}`)).ok){ready=true;break;}}catch{} await new Promise(r=>setTimeout(r,200));}
 assert.ok(ready,output);
 for(const width of [360,1280]) {
  const context=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:1});
  const page=await context.newPage();const errors=[];const requests=[];const responses=[];
  await page.addInitScript(()=>{window.__imageLayoutShift=0;new PerformanceObserver(list=>{for(const entry of list.getEntries())if(!entry.hadRecentInput)window.__imageLayoutShift+=entry.value;}).observe({type:'layout-shift',buffered:true});});
  page.on('response',r=>{if(r.request().resourceType()==='image')responses.push({url:r.url(),status:r.status(),cache:r.headers()['x-nextjs-cache'],contentType:r.headers()['content-type']});});
  page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(r.resourceType()==='image')requests.push(r.url())});
  const html=await (await fetch(`http://127.0.0.1:${port}`)).text();
  assert.match(html, /data-example="helper"[^>]*data-state="loading"/);
  assert.match(html, /data-example="srcset"[^>]*data-state="loading"/);
  assert.doesNotMatch(html, /Candidate unavailable/);
  assert.match(html, /srcSet="[^\"]*_next\/image/);
  await page.goto(`http://127.0.0.1:${port}`);
  await page.waitForFunction(()=>['next','helper','plain','srcset'].every(id=>document.querySelector(`[data-example="${id}"]`)?.dataset.state==='loaded'));
  const layoutShift=await page.evaluate(()=>window.__imageLayoutShift);assert.equal(layoutShift,0,'reserved intrinsic and ratio geometry prevents image arrival shifts');
  const hosts=await page.locator('[data-example="next"] img').count();assert.equal(hosts,1);
  assert.equal(await page.locator('[data-example="next"] img').getAttribute('data-ref'),'actual-img');
  assert.equal(await page.locator('[data-events]').textContent(),'2');
  const candidates=await page.locator('[data-example="next"] img, [data-example="helper"] img, [data-example="plain"] img').evaluateAll(nodes=>nodes.map(n=>({src:n.currentSrc,width:n.getBoundingClientRect().width,height:n.getBoundingClientRect().height,naturalWidth:n.naturalWidth,sizes:n.sizes})));
  for(const c of candidates.slice(0,2)){assert.match(c.src, /\/_next\/image\?/);assert.ok(c.naturalWidth>0);assert.ok(Math.abs(c.width/c.height-1.5)<0.02);const response=await fetch(c.src);assert.equal(response.status,200);assert.match(response.headers.get('content-type'),/^image\//);}
  assert.ok(!requests.some(url=>url.endsWith('/deferred.webp')),'offscreen lazy image should remain deferred in this fixture');
  assert.equal(requests.filter(url=>url.includes('/_next/image?')).length,1,'one shared optimized request, no detached duplicate');
  const warm=await fetch(candidates[0].src);assert.equal(warm.status,200);
  await page.getByRole('button',{name:'Toggle source'}).click();
  await page.waitForFunction(()=>['next','helper'].every(id=>document.querySelector(`[data-example="${id}"]`)?.dataset.state==='error'));
  await page.getByRole('button',{name:'Toggle source'}).click();
  await page.waitForFunction(()=>['next','helper'].every(id=>document.querySelector(`[data-example="${id}"]`)?.dataset.state==='loaded'));
  await page.locator('[data-example="lazy"]').scrollIntoViewIfNeeded();
  await page.waitForFunction(()=>document.querySelector('[data-example="lazy"]')?.dataset.state==='loaded');
  assert.deepEqual(errors,[]);
  await page.screenshot({path:join(cwd,`next-${width}.png`)});
  evidence.cases.push({width,candidates,requests,responses,layoutShift,warmCache:warm.headers.get('x-nextjs-cache'),hydrationErrors:errors});
  await context.close();
 }
 assert.notEqual(evidence.cases[0].candidates[0].src,evidence.cases[1].candidates[0].src,'narrow and wide select different optimized candidates');
 const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();await page.goto(`http://127.0.0.1:${port}`);await page.waitForFunction(()=>Array.from(document.querySelectorAll('[data-example="next"] img,[data-example="helper"] img')).every(n=>n.complete&&n.naturalWidth>0));await context.close();
 evidence.preHydrationDiscovery=true;
 evidence.networkFollowup = await verifyImageNetwork(browser, `http://127.0.0.1:${port}`, await readFile(join(cwd,'public/studio.webp')));
 await writeFile(join(cwd,'evidence.json'),JSON.stringify(evidence,null,2));
 console.log('PASS production Next Image/getImageProps:',join(cwd,'evidence.json'));
} finally {await browser.close();server.kill('SIGTERM');}
