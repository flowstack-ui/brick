import { expect, test } from "../../evidence-test.js";
test("nine placements preserve parent allocation and mirror in RTL", async ({ page }) => {
  await page.goto("/float?qualification=1");
  for (const dir of ["ltr", "rtl"]) {
    await page.locator('[data-scenario="float.basic"]').evaluate((el, dir) => el.setAttribute("dir", dir), dir);
    for (const anchor of await page.locator("[data-placement-case]").all()) {
      const result = await anchor.evaluate(el => {
        const a = el.getBoundingClientRect(); const f = el.querySelector(".brick-float")!.getBoundingClientRect();
        return { a: { x:a.x,y:a.y,w:a.width,h:a.height }, f:{ x:f.x+f.width/2,y:f.y+f.height/2 }, placement: el.getAttribute("data-placement-case")! };
      });
      const [side, align] = result.placement.split("-");
      const { a, f } = result;
      expect(a.w).toBeCloseTo(240, 0); expect(a.h).toBeCloseTo(120, 0);
      const expectedX = align === "center" ? a.x+a.w/2 : (align === "end") === (dir === "ltr") ? a.x+a.w : a.x;
      expect(Math.abs(f.x-expectedX)).toBeLessThan(1);
      expect(Math.abs(f.y-(a.y+(side==="top"?0:side==="middle"?a.h/2:a.h)))).toBeLessThan(1);
    }
  }
});
test("signed offsets and sparse responsive overrides carry forward independently", async ({ page }) => {
  await page.goto("/float?qualification=1");
  for (const [width, inline, bottom] of [[600,10,false],[800,20,false],[1100,0,false],[1400,0,true]] as const) {
    await page.setViewportSize({ width, height:900 });
    const m = await page.locator("[data-offset-case]").evaluate(el => {
      const a=el.getBoundingClientRect(), f=el.querySelector(".brick-float")!.getBoundingClientRect();
      return {x:a.x,y:a.y,right:a.right,bottom:a.bottom,cx:f.x+f.width/2,cy:f.y+f.height/2};
    });
    expect(Math.abs(m.cx-(bottom?m.x+inline:m.right-inline))).toBeLessThan(1);
    expect(Math.abs(m.cy-(bottom?m.bottom+5:m.y-5))).toBeLessThan(1);
  }
});
test("nested floats reset offsets and do not inherit their ancestor's values", async ({ page }) => {
 await page.goto("/float?qualification=1");
 const result=await page.locator("[data-nested-case] .brick-float-anchor").evaluate(el=>{
  const a=el.getBoundingClientRect(), f=el.querySelector(".brick-float")!.getBoundingClientRect();
  return { dx:f.x+f.width/2-a.right, dy:f.y+f.height/2-a.y };
 });
 expect(Math.abs(result.dx)).toBeLessThan(1); expect(Math.abs(result.dy)).toBeLessThan(1);
});
test("center axes ignore offsets and percentage insets use the containing block", async ({ page }) => {
 await page.goto("/float?qualification=1");
 const anchor=page.locator('[data-placement-case="middle-center"]');
 await anchor.locator(".brick-float").evaluate(el=>{(el as HTMLElement).style.setProperty("--brick-float-offset-initial","10%");});
 let result=await anchor.evaluate(el=>{const a=el.getBoundingClientRect(),f=el.querySelector(".brick-float")!.getBoundingClientRect(); return {dx:f.x+f.width/2-a.x,dy:f.y+f.height/2-a.y};});
 expect(result.dx).toBeCloseTo(120,0); expect(result.dy).toBeCloseTo(60,0);
 await anchor.locator(".brick-float").evaluate(el=>el.setAttribute("data-placement","top-start"));
 result=await anchor.evaluate(el=>{const a=el.getBoundingClientRect(),f=el.querySelector(".brick-float")!.getBoundingClientRect(); return {dx:f.x+f.width/2-a.x,dy:f.y+f.height/2-a.y};});
 expect(result.dx).toBeCloseTo(24,0); expect(result.dy).toBeCloseTo(12,0);
});
