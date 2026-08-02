import { expect, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/icon");

test("Icon defaults, sizes, tones, and sources", async ({ page }) => {
  await expect(page.locator("#scenario-icon-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.locator("#scenario-icon-sizes")).toHaveScreenshot("sizes-light.png");
  await expect(page.locator("#scenario-icon-tones")).toHaveScreenshot("tones-light.png");
  await expect(page.locator("#scenario-icon-sources")).toHaveScreenshot("sources-light.png");
  await expect(page.locator("#scenario-icon-composition .icon-grid")).toHaveScreenshot("composition-grid-light.png");
  await expect(page.locator("#scenario-icon-composition .playground-output-evidence")).toHaveScreenshot("composition-output-light.png");
});

test("Icon appearance, RTL, mobile, and forced colors", async ({ page }) => {
  await setAppearance(page, "dark");
  await expect(page.locator("#scenario-icon-appearance")).toHaveScreenshot("appearance-dark.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator("#scenario-icon-direction")).toHaveScreenshot("direction-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.locator("#scenario-icon-tones")).toHaveScreenshot("tones-forced-colors.png");
});
