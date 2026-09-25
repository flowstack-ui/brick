import { expect, test } from "../../evidence-test.js";

test("Spinner docs expose focused examples and responsive, inherited, custom artwork geometry", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/spinner");
  for (const id of ["usage", "sizes", "colors", "custom-color", "track", "speed", "thickness", "custom-indicator", "label", "overlay", "inherited", "responsive", "emphasis", "props"]) await expect(page.locator(`#${id}`)).toHaveCount(1);
  await expect(page.locator('[data-scenario="spinner.actions"]')).toHaveCount(0);
  const svg = page.locator("#custom-indicator svg.brick-spinner");
  await expect(svg).toHaveCount(1);
  await svg.evaluate(el => {el.setAttribute("data-size", "xl"); el.setAttribute("data-tone", "danger");});
  expect(await svg.evaluate(el => ({ width: el.getBoundingClientRect().width, border: getComputedStyle(el).borderTopWidth, motion: getComputedStyle(el).animationName }))).toEqual({width:32,border:"0px",motion:"none"});
  const responsive = page.locator("#responsive .brick-spinner");
  for (const [width, expected] of [[390,16],[900,32],[1400,40]]) {
    await page.setViewportSize({width,height:900});
    expect(await responsive.evaluate(el => el.getBoundingClientRect().width)).toBe(expected);
  }
  const inherited = page.locator("#inherited .brick-spinner");
  const sizes = await inherited.evaluate(el => [el.getBoundingClientRect().width, parseFloat(getComputedStyle(el).fontSize)]);
  expect(sizes[0]).toBeCloseTo(sizes[1],1);
});

test("Spinner remains nonshrinking and visible with system colors", async ({page}) => {
  await page.goto("/spinner");
  await page.emulateMedia({reducedMotion:"reduce",forcedColors:"active"});
  const svg=page.locator("#custom-indicator svg.brick-spinner");
  await expect(svg).toHaveCSS("animation-name","none");
  const ring=page.locator("#sizes .brick-spinner").first();
  await ring.evaluate(el => Object.assign(el.parentElement!.style,{display:"flex",flexDirection:"row",width:"1px",flexWrap:"nowrap"}));
  expect(await ring.evaluate(el=>el.getBoundingClientRect().width)).toBe(12);
  expect(await ring.evaluate(el=>{const s=getComputedStyle(el);return {shrink:s.flexShrink,top:s.borderTopColor,fg:s.color};})).toEqual({shrink:"0",top:await ring.evaluate(el=>getComputedStyle(el).color),fg:await ring.evaluate(el=>getComputedStyle(el).color)});
  await expect(svg).toHaveAttribute("aria-hidden","true");
});

test("Spinner artwork rotates, RTL arc mirrors, and overlay stays contained", async ({page}) => {
  await page.goto("/spinner");
  await page.emulateMedia({reducedMotion:"no-preference"});
  const artwork = page.locator("#custom-indicator svg.brick-spinner");
  await expect(artwork).toHaveCSS("animation-duration", "0.5s");
  expect(await artwork.evaluate(el => el.getAnimations().length)).toBe(1);
  await page.emulateMedia({reducedMotion:"reduce"});
  const ring = page.locator("#sizes .brick-spinner").first();
  await ring.evaluate(el => el.setAttribute("dir", "rtl"));
  const paint = await ring.evaluate(el => {const s=getComputedStyle(el);return [s.borderTopColor,s.borderLeftColor,s.borderRightColor];});
  expect(paint[0]).toBe(paint[1]);
  expect(paint[2]).toBe("rgba(0, 0, 0, 0)");
  const overlay=page.locator("#overlay .brick-z-stack");
  const scrim=page.locator("#overlay .brick-surface__scrim");
  const a=await overlay.boundingBox(),b=await scrim.boundingBox(),c=await page.locator("#overlay .brick-spinner").boundingBox();
  expect(a).not.toBeNull(); expect(b).not.toBeNull(); expect(c).not.toBeNull();
  expect(b!.width).toBeCloseTo(a!.width,1); expect(b!.height).toBeCloseTo(a!.height,1);
  expect(c!.x+c!.width/2).toBeCloseTo(a!.x+a!.width/2,1);
  expect(c!.y+c!.height/2).toBeCloseTo(a!.y+a!.height/2,1);
});

test("Spinner shared ring preserves centered loading and disabled loading actions", async ({ page }) => {
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.goto("/spinner?qualification=1");
  const actions=page.locator('[data-scenario="spinner.actions"] :is(.brick-button,.brick-icon-button)[data-loading]');
  await expect(actions).toHaveCount(21);
  for (const dir of ["ltr","rtl"]) {
    await actions.first().evaluate((el,dir) => el.closest('[data-scenario]')!.setAttribute("dir",dir),dir);
    for (const action of await actions.all()) {
      const g=await action.evaluate(el=>{const s=getComputedStyle(el,"::after");return {w:parseFloat(s.width),h:parseFloat(s.height),left:parseFloat(s.left),top:parseFloat(s.top),pw:el.clientWidth,ph:el.clientHeight,translate:s.translate,border:s.borderTopWidth};});
      expect(g.w).toBe(g.h); expect(g.w).toBeGreaterThan(0);
      // Absolute containing-block coordinates are the action padding box.
      const translate=dir==="rtl"?g.w/2:-g.w/2;
      expect(g.left+translate+g.w/2).toBeCloseTo(g.pw/2,0);
      expect(g.top).toBeCloseTo(g.ph/2,0);
      expect(g.border).toBe("2px");
    }
  }
});
