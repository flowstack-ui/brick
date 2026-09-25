import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";
for (const owner of [
 { route: "float", parts: [{ id: "float-root-props", title: "Root", label: "Float.Root props" }, { id: "float-anchor-props", title: "Anchor", label: "Float.Anchor props" }] },
 { route: "stack", parts: [{ id: "stack-props", title: "Stack", label: "Stack props" }, { id: "stack-item-props", title: "Item", label: "Stack.Item props" }] },
]) {
 test(`${owner.route} props parts have visible headings and working TOC links`, async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`/${owner.route}`);
  for (const part of owner.parts) {
   const link = page.locator(`aside a[href="#${part.id}"]`);
   await expect(link).toHaveText(part.title);
   await link.click();
   await expect(page).toHaveURL(new RegExp(`#${part.id}$`));
   const section = page.locator(`#${part.id}`);
   await expect(section.getByRole("heading", { name: part.title, exact: true })).toBeVisible();
   await expect(section.getByRole("table", { name: part.label, exact: true })).toHaveCount(1);
  }
 });
}
test("seven concise previews expose source, props and accessible content", async ({ page }) => {
 await page.goto("/float");
 await expect(page.locator("[data-example-preview]")).toHaveCount(7);
 for (const part of ["Root", "Anchor"]) {
  const section = page.locator(`#float-${part.toLowerCase()}-props`);
  await expect(section.getByRole("heading", { name: part, exact: true })).toBeVisible();
  await expect(section.getByRole("table", { name: `Float.${part} props`, exact: true })).toHaveCount(1);
 }
 await page.locator("#placement").getByRole("tab",{name:"Code",exact:true}).click();
 await expect(page.locator("#placement")).toContainText("Float.Root");
 await page.locator("#placement").getByRole("tab",{name:"Preview",exact:true}).click();
 expect((await new AxeBuilder({page}).include('[data-component-page="float"]').analyze()).violations).toEqual([]);
});
test("narrow docs avoid page overflow and the floated action remains reachable", async ({page})=>{
 await page.goto("/float");
 for(const width of [320,768,1440]) {
  await page.setViewportSize({width,height:900});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
 }
 const action=page.getByRole("button",{name:"Edit project",exact:true});
 await action.scrollIntoViewIfNeeded(); await action.focus(); await expect(action).toBeFocused();
 const box=await action.boundingBox(); expect(box!.width).toBeGreaterThan(20);
 await action.click();
 await expect(page.locator("#composition .brick-float.brick-badge")).toHaveCount(1);
});
