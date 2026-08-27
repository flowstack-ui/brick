import { expect, test } from "@playwright/test";

test("Data List route renders its complete evidence", async ({ page }) => {
  await page.goto("/data-list");
  await expect(page.locator("[data-component-page='data-list']")).toBeVisible();
});
