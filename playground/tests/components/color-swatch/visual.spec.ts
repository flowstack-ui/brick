import { expect, test } from "@playwright/test";

test("Color Swatch route renders its complete evidence", async ({ page }) => {
  await page.goto("/color-swatch");
  await expect(page.locator("[data-component-page='color-swatch']")).toBeVisible();
});
