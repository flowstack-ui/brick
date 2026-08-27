import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/data-list"); });

test("keeps native facts and changes only responsive presentation", async ({ page }) => {
  const root = page.getByTestId("data-list-responsive");
  await expect(root).toHaveJSProperty("tagName", "DL");
  await expect(root.locator("dt")).toHaveCount(2);
  await expect(root.locator("dd")).toHaveCount(2);
  await expect(root).toHaveAttribute("data-orientation", "vertical");
  await page.setViewportSize({ width: 900, height: 720 });
  await expect(root).toHaveCSS("display", "grid");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
