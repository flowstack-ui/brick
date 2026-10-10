import { expect, test } from "../../evidence-test.js";
test("target label activates amount and IDs stay unique", async ({page}) => {
 await page.goto("/field");
 const target = page.locator("#target");
 await target.getByText("Price", {exact:true}).click();
 await expect(target.getByRole("textbox", {name:"Price"})).toBeFocused();
 const ids = await target.locator("[id]").evaluateAll(nodes=>nodes.map(n=>n.id));
 expect(new Set(ids).size).toBe(ids.length);
 await expect(page.locator("#props-item")).toBeVisible();
});
test("horizontal rows and custom icon retain layout", async ({page}) => {
 await page.setViewportSize({width:1280,height:900}); await page.goto("/field");
 const field = page.locator("#horizontal .brick-field").first();
 const parts = await field.evaluate(el=>Array.from(el.children).slice(0,2).map(c=>({top:c.getBoundingClientRect().top,left:c.getBoundingClientRect().left})));
 expect(Math.abs(parts[0].top-parts[1].top)).toBeLessThan(2);
 expect(parts[1].left).toBeGreaterThan(parts[0].left);
 const icon = page.locator("#error .brick-field-error svg");
 const box=await icon.boundingBox(); expect(box!.width).toBeGreaterThan(0); expect(box!.width).toBeLessThan(24);
});
