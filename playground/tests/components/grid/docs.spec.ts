import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

test("Grid native tracks, areas and responsive placement use actual grid geometry", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/grid");
  await expect(page.locator("[data-example-preview]")).toHaveCount(11);
  const implicit = page.locator("#implicit [data-example-canvas] .brick-grid");
  await expect(implicit).toHaveCSS("grid-auto-flow", "column");
  expect((await implicit.evaluate(el => getComputedStyle(el).gridTemplateColumns)).split(" ")).toHaveLength(3);
  const nested = page.locator("#subgrid [data-example-canvas] .brick-grid-item");
  await expect(nested).toHaveCSS("grid-template-columns", /subgrid/);
  const templates = page.locator("#templates [data-example-canvas] .brick-grid");
  const widths = await templates.locator(":scope > *").evaluateAll(items => items.map(item => item.getBoundingClientRect().width));
  expect(widths[1] / widths[0]).toBeCloseTo(2, 1);
  const areas = page.locator("#areas [data-example-canvas] .brick-grid");
  await expect(areas).toHaveCSS("grid-template-areas", '"header header" "nav main"');
  await expect(page.locator("#flow [data-example-canvas] .brick-grid")).toHaveCSS("grid-auto-flow", "dense");
  const featured = page.locator("#responsive [data-example-canvas] .brick-grid-item").first();
  await expect(featured).toHaveCSS("grid-column-start", "4");
  await expect(featured).toHaveCSS("grid-column-end", "span 3");
  await expect(page.locator("#inline [data-example-canvas] .brick-grid")).toHaveCSS("display", "inline-grid");
  for (const [width, start, span] of [[375, 1, 2], [480, 2, 2], [768, 2, 3], [1024, 3, 3], [1280, 4, 3]]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(featured).toHaveCSS("grid-column-start", String(start));
    await expect(featured).toHaveCSS("grid-column-end", `span ${span}`);
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const part of ["root", "item"]) {
    await page.locator(`aside a[href="#grid-${part}-props"]`).click();
    await expect(page).toHaveURL(new RegExp(`#grid-${part}-props$`));
  }
  await page.setViewportSize({ width: 375, height: 800 });
  await expect(featured).toHaveCSS("grid-column-start", "1");
  await expect(featured).toHaveCSS("grid-column-end", "span 2");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
});

test("Grid docs are accessible and show the executable source", async ({ page }) => {
  await page.goto("/grid");
  await page.locator("#templates").getByRole("tab", { name: "Code", exact: true }).click();
  await expect(page.locator("#templates")).toContainText("templateColumns");
  expect((await new AxeBuilder({ page }).include('[data-component-page="grid"]').analyze()).violations).toEqual([]);
});
