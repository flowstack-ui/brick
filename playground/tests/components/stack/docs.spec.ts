import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

test("Stack docs expose fifteen focused exact-source examples without overflow", async ({
  page,
}) => {
  await page.goto("/stack");
  await expect(page.locator("[data-example-preview]")).toHaveCount(15);
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
    for (const canvas of await page.locator("[data-example-canvas]").all()) {
      expect(
        await canvas.evaluate((el) => el.scrollWidth <= el.clientWidth + 1),
      ).toBe(true);
    }
  }
  await page
    .locator("#recipes")
    .getByRole("tab", { name: "Code", exact: true })
    .click();
  await expect(page.locator("#recipes")).toContainText("grow={1}");
  await expect(page.locator("#recipes")).toContainText(
    "export function StackRecipes",
  );
});

test("basic example fills its row with three equal tracks", async ({ page }) => {
  await page.goto("/stack");
  const row = page.locator("[data-example-canvas]").first().locator(".brick-stack").last();
  const tracks = row.locator(":scope > .brick-stack-item");
  await expect(tracks).toHaveCount(3);
  const widths = await tracks.evaluateAll(elements => elements.map(element => element.getBoundingClientRect().width));
  expect(Math.max(...widths) - Math.min(...widths)).toBeLessThan(1);
  const metrics = await row.evaluate(element => ({ width: element.getBoundingClientRect().width, gap: parseFloat(getComputedStyle(element).columnGap) }));
  expect(Math.abs(widths.reduce((a,b)=>a+b,0) + 2 * metrics.gap - metrics.width)).toBeLessThan(1);
});

test("Stack documentation keeps semantics and accessible names", async ({
  page,
}) => {
  await page.goto("/stack");
  const scan = await new AxeBuilder({ page })
    .include('[data-component-page="stack"]')
    .analyze();
  expect(scan.violations).toEqual([]);
});

test("multiline stretch paints the actual allocated item", async ({ page }) => {
  await page.goto("/stack");
  const paintedItems = page.locator('#lines [data-example-canvas] .brick-stack-item.brick-surface').filter({ hasText: "Design" });
  await expect(paintedItems).toHaveCount(4);
  const startHeight = await paintedItems.first().evaluate(el => el.getBoundingClientRect().height);
  const painted = paintedItems.last();
  expect(await painted.evaluate(el => el.getBoundingClientRect().height)).toBeGreaterThan(startHeight);
});
