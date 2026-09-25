import { expect, test } from '../../evidence-test.js';

test('Image docs have inline code, part headings, TOC and bounded responsive geometry', async ({page})=>{
 await page.goto('/image');
 await expect(page.getByRole('heading',{name:'Height',exact:true})).toBeVisible();
 for(const part of ['root','content','fallback']) {
  const section=page.locator(`#props-${part}`);
  await expect(section.getByRole('heading',{level:3})).toBeVisible();
  await expect(section.getByRole('table')).toHaveCount(1);
 }
 await expect(page.locator('iframe')).toHaveCount(0);
 const crop=page.locator('#responsive-presentation .brick-image');
 await page.setViewportSize({width:390,height:844});
 await expect(crop.locator('img')).toHaveCSS('object-fit','cover');
 const narrow=await crop.boundingBox();expect(narrow!.width/narrow!.height).toBeCloseTo(16/9,1);
 expect(await page.locator('html').evaluate(n=>n.scrollWidth)).toBeLessThanOrEqual(390);
 await page.setViewportSize({width:900,height:1000});
 await expect(crop.locator('img')).toHaveCSS('object-fit','contain');
 const medium=await crop.boundingBox();expect(medium!.width/medium!.height).toBeCloseTo(1,1);
 await page.setViewportSize({width:1280,height:900});
 await expect(crop.locator('img')).toHaveCSS('object-position','30% 65%');
 await expect(page.locator('#picture picture > img')).toHaveCount(1);
 await expect(page.locator('#picture picture')).toHaveAttribute('data-state','loaded');
 const circle=page.locator('#circular .brick-image');const box=await circle.boundingBox();expect(box!.width).toBeCloseTo(box!.height,0);
 await page.emulateMedia({forcedColors:'active',reducedMotion:'reduce'});
 await expect(page.locator('#frame-radius .brick-image')).toHaveCSS('border-top-width','1px');
});

test('Image picture uses real native sources and error replacement recovers',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/image');
 const picture=page.locator('#picture img');await picture.scrollIntoViewIfNeeded();
 await expect.poll(()=>picture.evaluate((n:HTMLImageElement)=>n.currentSrc)).toContain('studio-384.webp');
 await page.setViewportSize({width:1280,height:900});
 await expect.poll(()=>picture.evaluate((n:HTMLImageElement)=>n.currentSrc)).toContain('studio.webp');
 const states=page.locator('#source-states');await states.getByRole('button',{name:'Break source'}).click();
 await expect(states.locator('.brick-image')).toHaveAttribute('data-state','error');
 await states.getByRole('button',{name:'Restore'}).click();await expect(states.locator('.brick-image')).toHaveAttribute('data-state','loaded');
 await states.getByRole('button',{name:'Clear source'}).click();await expect(states.locator('.brick-image')).toHaveAttribute('data-state','idle');
 await expect(states.locator('img')).toHaveCount(0);
});

test('Image direction follows its own host and nested opposite scopes',async({page})=>{
 await page.goto('/image?qualification=1');
 const root=page.locator('#scenario-image-stress .brick-image[data-position="start"]').first();
 await root.evaluate(n=>n.setAttribute('dir','rtl'));await expect(root.locator('img')).toHaveCSS('object-position','100% 50%');
 await root.evaluate(n=>{n.parentElement!.setAttribute('dir','rtl');n.setAttribute('dir','ltr')});await expect(root.locator('img')).toHaveCSS('object-position','0% 50%');
});

test('Image docs rail, code and standalone evidence retain their shell contracts',async({page})=>{
 await page.setViewportSize({width:1440,height:1000});await page.goto('/image');
 const rail=page.locator('.docs-table-of-contents-rail');await expect(rail).toBeVisible();
 const title=page.getByRole('heading',{name:'Image',exact:true,level:1});
 const titleBox=await title.boundingBox();const railBox=await rail.boundingBox();expect(Math.abs(titleBox!.y-railBox!.y)).toBeLessThan(80);
 await rail.locator('a[href="#props-content"]').click();await expect(page.locator('#props-content')).toBeInViewport();
 await expect(page.locator('#props-content-heading')).toHaveText('Content');
 await page.setViewportSize({width:390,height:844});await expect(rail).toBeHidden();
 await page.goto('/preview.html?component=image&example=image.overview&testMode=1');
 await expect(page.getByRole('img',{name:'Designers reviewing the workspace'})).toBeVisible();
 await expect(page.locator('.evidence-app-bar')).toHaveCount(0);
});
