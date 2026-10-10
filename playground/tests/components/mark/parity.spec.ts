import { expect, test } from "../../evidence-test.js";
test("all Mark variants preserve inheritance and forced-color pairs", async ({page}) => {
  await page.goto("/mark?qualification=1");
  const keys=page.getByTestId("mark-matrix").locator(".brick-mark");
  await expect(keys).toHaveCount(24);
  const values=await keys.evaluateAll(nodes=>nodes.map(n=>{
    const s=getComputedStyle(n),p=getComputedStyle(n.parentElement!);
    return {variant:n.getAttribute("data-variant"),font:s.fontSize,parent:p.fontSize,
      weight:s.fontWeight,bg:s.backgroundColor,color:s.color,parentColor:p.color,padding:s.paddingInlineStart};
  }));
  for(const v of values){
    expect(v.font).toBe(v.parent);
    if(v.variant==="plain" || v.variant==="text"){
      expect(v.bg).toBe("rgba(0, 0, 0, 0)");expect(v.color).toBe(v.parentColor);expect(v.padding).toBe("0px");
    }
    if(v.variant==="text")expect(v.weight).toBe("500");
  }
  await page.emulateMedia({forcedColors:"active"});
  const forced=await keys.evaluateAll(nodes=>nodes.map(n=>{
    const s=getComputedStyle(n);return {variant:n.getAttribute("data-variant"),
      bg:s.getPropertyValue("--brick-mark-background").trim(),fg:s.getPropertyValue("--brick-mark-foreground").trim(),decoration:s.textDecorationLine};
  }));
  for(const v of forced){
    if(v.variant==="plain"||v.variant==="text"){expect(v.bg).toBe("transparent");expect(v.decoration).toContain("underline");}
    else {expect(v.bg).toBe("Highlight");expect(v.fg).toBe("HighlightText");}
  }
});
test("documentation has native composition, inherited heading type and multiline wrapping", async ({page})=>{
  await page.goto("/mark");
  await expect(page.locator('[data-scenario="mark.recipes"]')).toHaveCount(0);
  await expect(page.getByRole("table",{name:"Mark props"})).toBeVisible();
  await expect(page.locator("#composition mark")).toHaveCount(1);
  const mark=page.locator("#typography h3 mark");
  expect(await mark.evaluate(n=>getComputedStyle(n).fontSize===getComputedStyle(n.parentElement!).fontSize)).toBe(true);
  expect(await page.locator("#wrapping mark").evaluate(n=>n.getClientRects().length)).toBeGreaterThan(1);
  await page.setViewportSize({width:390,height:844});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
