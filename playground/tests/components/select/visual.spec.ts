import { expect, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/select");

async function removeStickyCaptureOverlap(page: import("@playwright/test").Page) {
  await page.addStyleTag({
    content: ".evidence-app-bar, .evidence-review-header, .scenario-nav { display: none !important; }",
  });
  await page.waitForTimeout(50);
}

test("Select recipes, geometry, options, and states", async ({ page }) => {
  await expect(page.getByTestId("select-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.getByTestId("select-variants")).toHaveScreenshot("variants-light.png");
  await expect(page.getByTestId("select-sizes")).toHaveScreenshot("sizes-light.png");
  await expect(page.getByTestId("select-shapes")).toHaveScreenshot("shapes-light.png");
  const options = page.getByTestId("select-options");
  await options.scrollIntoViewIfNeeded();
  await removeStickyCaptureOverlap(page);
  await expect(page.locator(".scenario-nav")).toBeHidden();
  await expect(options).toHaveScreenshot("options-light.png");
  await expect(page.getByTestId("select-states")).toHaveScreenshot("states-light.png");
});

test("Select dark, narrow RTL, and forced-color evidence", async ({ page }) => {
  await setAppearance(page, "dark");
  await expect(page.getByTestId("select-appearance")).toHaveScreenshot("appearance-dark.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("select-stress")).toHaveScreenshot("stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.getByTestId("select-states")).toHaveScreenshot("states-forced-colors.png");
});
