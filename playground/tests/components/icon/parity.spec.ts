import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

test.beforeEach(async ({page}) => { await page.goto('/icon'); });
test('focused documentation has matching API and TOC sections', async ({page}) => {
  for (const id of ['usage','library','custom','factory','sizes','responsive','tones','provider','accessibility','controls','direction','props-icon','props-factory','props-provider']) {
    await expect(page.locator(`#${id}`)).toBeVisible();
  }
  await expect(page.locator('#factory svg.brick-icon')).toHaveCount(1);
  await expect(page.locator('#factory svg svg')).toHaveCount(0);
  await expect(page.locator('#library svg.lucide')).toHaveCount(1);
  expect((await new AxeBuilder({page}).include('[data-component-page="icon"]').analyze()).violations).toEqual([]);
});
test('responsive sizes restore md and inherit, including sparse values', async ({page}) => {
  const icon=page.locator('#responsive [role=tabpanel] .brick-icon');
  for (const [width,size] of [[390,20],[800,32],[1100,24],[1400,16]]) {
    await page.setViewportSize({width,height:900});
    await expect(icon).toHaveCSS('width',`${size}px`);
  }
  await icon.evaluate(el => { el.setAttribute('data-size','md'); el.removeAttribute('data-size-md'); });
  await page.setViewportSize({width:800,height:900}); await expect(icon).toHaveCSS('width','24px');
});
test('action slots normalize raw, wrapped and direct SVG over all sizes', async ({page}) => {
  const results = await page.locator('#controls').evaluate(section => {
    const button = section.querySelector('.brick-button:not(.brick-icon-button)')!;
    const iconButton = section.querySelector('.brick-icon-button')!;
    const rows: {size:string;kind:string;width:number;height:number;art:number;center:number;control:number}[]=[];
    for (const size of ['2xs','xs','sm','md','lg','xl','2xl']) {
      for (const control of [button,iconButton]) {
        control.setAttribute('data-size',size);
        const slot=control.querySelector('.brick-button__icon, .brick-icon-button__icon')!;
        const original=slot.firstElementChild!;
        const raw=original.querySelector('svg')!.cloneNode(true) as Element;
        const direct=raw.cloneNode(true) as Element; direct.classList.add('brick-icon'); direct.setAttribute('data-size','2xl');
        for (const [kind,artwork] of [['wrapped',original],['raw',raw],['direct',direct]] as const) {
          slot.replaceChildren(artwork);
          const rect=artwork.getBoundingClientRect(), art=(artwork.querySelector('svg') ?? artwork).getBoundingClientRect(), box=slot.getBoundingClientRect();
          rows.push({size,kind:(control===button?'button:':'icon-button:')+kind,width:rect.width,height:rect.height,art:art.width,center:Math.abs(rect.x+rect.width/2-box.x-box.width/2),control:control.getBoundingClientRect().height});
        }
        slot.replaceChildren(original);
      }
    }
    return rows;
  });
  for(let i=0;i<results.length;i+=3) {
    const rows=results.slice(i,i+3); expect(rows[0].width,JSON.stringify(rows)).toBeCloseTo(rows[1].width,2);
    expect(rows[2].width).toBeCloseTo(rows[1].width,2);
    for(const row of rows){expect(row.width).toBeCloseTo(row.height,2);expect(row.art).toBeCloseTo(row.width,2);expect(row.center).toBeLessThan(.6);expect(row.width).toBeLessThan(row.control);}
  }
});
test('provider paint, fixed fills, effective RTL and transforms coexist', async ({page}) => {
  const arrow=page.locator('#direction [data-directional]');
  await expect(arrow).toHaveCSS('scale','-1 1');
  await arrow.evaluate(el => {el.setAttribute('dir','ltr'); (el as HTMLElement).style.transform='rotate(20deg)';});
  await expect(arrow).toHaveCSS('scale','1'); expect(await arrow.evaluate(el=>getComputedStyle(el).transform)).not.toBe('none');
  await arrow.evaluate(el=>el.setAttribute('dir','rtl')); await expect(arrow).toHaveCSS('scale','-1 1');
  await expect(page.locator('#tones [fill="#7c3aed"]')).toHaveAttribute('fill','#7c3aed');
  const defaults=page.locator('#provider [role=tabpanel] .brick-icon');
  await expect(defaults.nth(0)).toHaveAttribute('data-tone','success'); await expect(defaults.nth(2)).toHaveAttribute('data-tone','inherit');
  await page.emulateMedia({forcedColors:'active'});
  if (await page.evaluate(() => matchMedia('(forced-colors: active)').matches)) {
    expect(await defaults.nth(0).evaluate(el => getComputedStyle(el).getPropertyValue('--brick-icon-color').trim())).toBe('CanvasText');
  }
});

test('documentation previews remain contained on narrow screens and expose matching code', async ({page})=>{
  await page.setViewportSize({width:390,height:844});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(391);
  for(const section of ['library','custom','factory','sizes','responsive','tones','provider','accessibility','controls','direction']){
    const area=page.locator(`#${section}`);
    await area.getByRole('tab',{name:'Code',exact:true}).click();
    await expect(area.getByRole('tabpanel')).toContainText('export function Icon');
    await area.getByRole('tab',{name:'Preview',exact:true}).click();
  }
});

test('every responsive size token resolves at every breakpoint',async({page})=>{
  const icon=page.locator('#responsive [role=tabpanel] .brick-icon');
  for(const [breakpoint,width] of [['sm',500],['md',800],['lg',1100],['xl',1400]] as const){
    await page.setViewportSize({width,height:900});
    for(const [size,expected] of [['inherit',16],['2xs',12],['xs',16],['sm',20],['md',24],['lg',28],['xl',32],['2xl',40]] as const){
      await icon.evaluate((el,{breakpoint,size})=>{for(const key of ['sm','md','lg','xl'])el.removeAttribute(`data-size-${key}`);el.setAttribute(`data-size-${breakpoint}`,size);},{breakpoint,size});
      await expect(icon).toHaveCSS('width',`${expected}px`);
    }
  }
});

test('responsive action slots override provider size at each active breakpoint',async({page})=>{
  const button=page.locator('#controls .brick-button:not(.brick-icon-button)').first();
  await button.evaluate(el=>{el.setAttribute('data-size','sm');el.setAttribute('data-size-md','2xl');el.setAttribute('data-size-lg','2xs');});
  const artwork=button.locator('.brick-button__icon > .brick-icon');
  for(const [width,expected] of [[390,16],[800,24],[1100,14]]){
    await page.setViewportSize({width,height:900});await expect(artwork).toHaveCSS('width',`${expected}px`);
  }
});
