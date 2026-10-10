import { expect, test } from "../evidence-test.js";
import { componentEntries } from "../../src/app/component-registry.js";

// Each route gets a fresh context so long catalogs do not accumulate UI state.
for (const entry of componentEntries) {
  test(`catalog route ${entry.id} renders without uncaught errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto(entry.route);
    await expect(page.locator("h1").first()).toHaveText(entry.title);
    await expect(page.locator("[data-example-canvas], [data-component-page]").first()).toBeVisible();
    expect(errors).toEqual([]);
  });
}
