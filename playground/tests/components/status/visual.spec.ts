import { expect, test } from "@playwright/test";

test("Status route renders its complete evidence", async ({ page }) => {
  await page.goto("/status");
  await expect(page.locator("[data-component-page='status']")).toBeVisible();
});
