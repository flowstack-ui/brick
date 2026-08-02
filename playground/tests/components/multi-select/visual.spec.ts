import { expect, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/multi-select");

async function removeStickyCaptureOverlap(page: import("@playwright/test").Page) {
  await page.addStyleTag({
    content: ".evidence-app-bar, .evidence-review-header, .scenario-nav { display: none !important; }",
  });
  await page.waitForTimeout(50);
}

test("MultiSelect recipes, geometry, options, and states", async ({ page }) => {
  await expect(page.getByTestId("multi-select-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.getByTestId("multi-select-variants")).toHaveScreenshot("variants-light.png");
  await expect(page.getByTestId("multi-select-sizes")).toHaveScreenshot("sizes-light.png");
  await expect(page.getByTestId("multi-select-shapes")).toHaveScreenshot("shapes-light.png");
  const options = page.getByTestId("multi-select-options");
  await options.scrollIntoViewIfNeeded();
  await removeStickyCaptureOverlap(page);
  await expect(page.locator(".scenario-nav")).toBeHidden();
  await expect(options).toHaveScreenshot("options-light.png");
  await expect(page.getByTestId("multi-select-states")).toHaveScreenshot("states-light.png");
});

test("MultiSelect dark, narrow RTL, and forced-color evidence", async ({ page }) => {
  await setAppearance(page, "dark");
  await removeStickyCaptureOverlap(page);
  await expect(page.getByTestId("multi-select-appearance")).toHaveScreenshot("appearance-dark.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("multi-select-stress")).toHaveScreenshot("stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.getByTestId("multi-select-states")).toHaveScreenshot("states-forced-colors.png");
});
