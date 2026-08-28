import { expect, expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/reorderable-list");

test("Reorderable List overview, recipes, movement, and states", async ({ page }) => {
  await page.setViewportSize({ width: 1120, height: 1600 });
  await expect(page.locator("#scenario-reorderable-list-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.locator("#scenario-reorderable-list-recipes")).toHaveScreenshot("recipes-light.png");
  await expect(page.locator("#scenario-reorderable-list-direct")).toHaveScreenshot("direct-light.png");
  await expect(page.locator("#scenario-reorderable-list-states")).toHaveScreenshot("states-light.png");
});

test("Reorderable List dark, mobile RTL, and forced-color boundaries", async ({ page }) => {
  await page.setViewportSize({ width: 1120, height: 1200 });
  await setAppearance(page, "dark");
  await page.addStyleTag({ content: ".evidence-app-bar, .evidence-review-header, .scenario-nav { display: none !important; }" });
  await expectEvidenceScreenshot(page, page.locator("#scenario-reorderable-list-theme"), "theme-dark.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.locator("#scenario-reorderable-list-direction"), "direction-mobile-dark.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.locator("#scenario-reorderable-list-overview")).toHaveScreenshot("overview-forced-colors.png");
});
