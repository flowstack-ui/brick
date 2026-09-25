import { expect, test } from "../../evidence-test.js";
test("Em docs preserve inherited typography and one projected semantic host", async ({page}) => {
  await page.goto("/em");
  await expect(page.locator('[data-scenario]')).toHaveCount(0);
  await expect(page.getByRole("table", {name:"Em props"})).toBeVisible();
  const projected = page.locator("#composition em");
  await expect(projected).toHaveCount(1);
  await expect(projected).toHaveAttribute("lang", "en");
  for (const appearance of ["light", "dark"]) {
    await page.locator("#typography").evaluate((node,value)=>node.setAttribute("data-brick-appearance",value),appearance);
    const metrics = await page.locator("#typography em").evaluateAll(nodes=>nodes.map(node=>{
      const child=getComputedStyle(node),parent=getComputedStyle(node.parentElement!);
      return {style:child.fontStyle,a:[child.fontSize,child.fontWeight,child.lineHeight,child.color,child.letterSpacing],b:[parent.fontSize,parent.fontWeight,parent.lineHeight,parent.color,parent.letterSpacing]};
    }));
    expect(metrics).toHaveLength(3);
    for(const m of metrics){expect(m.style).toBe("italic");expect(m.a).toEqual(m.b);}
  }
  await page.locator("#composition").getByRole("tab", {name:"Code",exact:true}).click();
  await expect(page.locator("#composition").getByRole("tabpanel")).toContainText("asChild");
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
