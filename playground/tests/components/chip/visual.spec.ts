import { expect, installVisualDefaults, test } from "../../visual-harness.js";

installVisualDefaults("/chip?qualification=1");

test("Chip compact anatomy and independent action", async ({ page }) => {
  await page.setViewportSize({ width: 1120, height: 1200 });
  await expect(page.locator("#scenario-chip-compact")).toHaveScreenshot("compact-light.png");
  await expect(page.locator("#scenario-chip-slots")).toHaveScreenshot("slots-light.png");
  await expect(page.locator("#scenario-chip-actions")).toHaveScreenshot("actions-light.png");
});

test("Chip overview, recipes, and content", async ({ page }) => {
  await page.setViewportSize({ width: 1120, height: 1200 });
  await expect(page.locator("#scenario-chip-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.locator("#scenario-chip-recipes")).toHaveScreenshot("recipes-light.png");
  await expect(page.locator("#scenario-chip-leading")).toHaveScreenshot("leading-light.png");
});

test("Chip appearance, removal, and boundary", async ({ page }) => {
  await page.setViewportSize({ width: 1120, height: 1400 });
  await page.locator("#scenario-chip-removal").getByRole("button", { name: "Remove Research" }).focus();
  await expect(page.locator("#scenario-chip-removal")).toHaveScreenshot("removal-focus-light.png");
  await expect(page.locator("#scenario-chip-appearance")).toHaveScreenshot("appearance-light.png");
  await expect(page.locator("#scenario-chip-boundary")).toHaveScreenshot("boundary-light.png");
});

test("Chip focused documentation recipes in both appearances", async ({page}) => {
  await page.goto("/chip?appearance=light");
  await expect(page.locator("#variants")).toHaveScreenshot("documentation-variants-light.png");
  await expect(page.locator("#sizes")).toHaveScreenshot("documentation-sizes-light.png");
  await page.goto("/chip?appearance=dark");
  await expect(page.locator("#variants")).toHaveScreenshot("documentation-variants-dark.png");
  await expect(page.locator("#disabled")).toHaveScreenshot("documentation-disabled-dark.png");
  await expect(page.locator("#rtl")).toHaveScreenshot("documentation-rtl-dark.png");
});
