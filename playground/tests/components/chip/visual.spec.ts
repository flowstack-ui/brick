import { expect, installVisualDefaults, test } from "../../visual-harness.js";

installVisualDefaults("/chip");

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
