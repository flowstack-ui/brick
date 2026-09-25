import { expect, test } from "../../evidence-test.js";

test("state specimens show distinct current navigation and compact named icon controls", async ({ page }) => {
  await page.goto('/sidebar');
  const roots = page.locator('#states .brick-sidebar');
  for (const [index, state] of ['expanded', 'rail', 'offcanvas'].entries()) {
    const root = roots.nth(index);
    await expect(root).toHaveAttribute('data-state', state);
    await expect(root.locator('.brick-sidebar__main')).toContainText(state);
    const button = root.getByRole('button', { name: `Toggle ${state} sidebar` });
    await expect(button).toHaveCSS('width', '36px');
    await expect(button).toHaveCSS('height', '36px');
    await expect(button.locator('svg')).toHaveCount(1);
    if (state === 'expanded') await expect(root.getByRole('link', {name:'Projects'})).toHaveText('Projects');
    else if (state === 'rail') {
      await expect(root.getByRole('link', {name:'Projects'})).toHaveText('');
      expect((await root.locator('.brick-sidebar__panel').boundingBox())!.width).toBe(52);
    } else await expect(root.locator('.brick-sidebar__panel')).toBeHidden();
    await button.click();
    const next = state === 'expanded' ? 'offcanvas' : 'expanded';
    await expect(root.locator('.brick-sidebar__main')).toContainText(next);
    await expect(root.getByRole('button', { name: `Toggle ${next} sidebar` })).toBeVisible();
  }
});

test("reopening does not briefly wrap panel text into a tall narrow column", async ({ page }) => {
  await page.goto('/sidebar');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const root = page.locator('#floating .brick-sidebar');
  const result = await root.evaluate(async el => {
    const trigger = el.querySelector<HTMLButtonElement>('button')!;
    const panel = el.querySelector<HTMLElement>('.brick-sidebar__panel')!;
    const expandedHeight = el.getBoundingClientRect().height;
    el.style.setProperty('--brick-sidebar-transition-duration', '400ms');
    trigger.click();
    await new Promise(resolve => setTimeout(resolve, 450));
    trigger.click();
    const heights: number[] = [];
    const widths: number[] = [];
    const start = performance.now();
    await new Promise<void>(resolve => {
      function frame() {
        heights.push(el.getBoundingClientRect().height);
        widths.push(panel.getBoundingClientRect().width);
        if (performance.now() - start < 450) requestAnimationFrame(frame);
        else resolve();
      }
      requestAnimationFrame(frame);
    });
    return { expandedHeight, heights, widths };
  });
  expect(Math.max(...result.heights)).toBeLessThanOrEqual(result.expandedHeight + 1);
  expect(Math.min(...result.widths)).toBeCloseTo(result.widths[result.widths.length - 1], 1);
});

test("narrow examples pan locally and controlled/mobile compositions remain usable", async ({ page }) => {
  await page.goto('/sidebar');
  await page.setViewportSize({ width: 390, height: 844 });
  const scrollport = page.locator('#states .brick-scroll-area-viewport');
  await expect(scrollport).toBeVisible();
  expect(await scrollport.evaluate(el => el.scrollWidth > el.clientWidth)).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  const controlled = page.locator('#controlled');
  await controlled.getByRole('button', { name: 'Toggle controlled sidebar' }).click();
  await expect(controlled.locator('.brick-sidebar')).toHaveAttribute('data-state', 'rail');
  await controlled.getByRole('checkbox').check();
  await expect(controlled.getByRole('button', { name: 'Toggle controlled sidebar' })).toBeDisabled();
  await page.getByRole('button', { name: 'Open mobile navigation' }).click();
  await expect(page.getByRole('dialog', { name: 'Workspace navigation' })).toBeVisible();
  await page.getByRole('button', { name: 'Close navigation' }).click();
  await expect(page.getByRole('dialog', { name: 'Workspace navigation' })).not.toBeVisible();
});

test("direct triggers do not displace panel/main in either direction or side", async ({ page }) => {
  await page.goto('/sidebar?qualification=1');
  await page.setViewportSize({width:1440,height:1000});
  const root=page.locator('[data-scenario="sidebar.behavior"] .brick-sidebar').first();
  for(const dir of ['ltr','rtl']) for(const side of ['left','right']) {
    await root.evaluate((el, values)=>{el.setAttribute('dir',values[0]);el.setAttribute('data-side',values[1]);},[dir,side]);
    const panel=await root.locator('.brick-sidebar__panel').boundingBox();
    const main=await root.locator('.brick-sidebar__main').boundingBox();
    const trigger=await root.locator('.brick-sidebar__trigger').boundingBox();
    expect(panel!.y).toBeCloseTo(main!.y,1);
    expect(main!.y).toBeGreaterThanOrEqual(trigger!.y+trigger!.height-1);
    expect(main!.width).toBeGreaterThan(100);
    if(side==='left') expect(panel!.x+panel!.width).toBeLessThanOrEqual(main!.x+1);
    else expect(main!.x+main!.width).toBeLessThanOrEqual(panel!.x+1);
  }
});

test("floating offcanvas leaves no phantom track gap and remains reopenable", async ({page})=>{
  await page.goto('/sidebar');
  const root=page.locator('#floating .brick-sidebar');
  const button=root.getByRole('button');
  await button.click();
  await expect(root).toHaveAttribute('data-state','offcanvas');
  await expect(root).toHaveCSS('column-gap','0px');
  await expect(root.locator('.brick-sidebar__panel')).toHaveAttribute('inert','');
  await expect(root.locator('.brick-sidebar__main')).toBeVisible();
  await button.click();
  await expect(root).toHaveAttribute('data-state','expanded');
});

test("borderless regions and rail context compose without overrides",async({page})=>{
  await page.goto('/sidebar');
  for(const part of ['panel','header','footer']) {
    const elements=page.locator(`#borders .brick-sidebar__${part}`);
    for(const el of await elements.all()) for(const edge of ['top','right','bottom','left']) await expect(el).toHaveCSS(`border-${edge}-width`,'0px');
  }
  await page.locator('#rail').getByRole('button',{name:'Toggle rail'}).click();
  await expect(page.locator('#rail .brick-sidebar__content')).toHaveText('W');
  for(const part of ['Root','Panel','Main','Trigger','Header','Content','Footer']) await expect(page.getByRole('table',{name:`Sidebar.${part} props`,exact:true})).toBeVisible();
});
