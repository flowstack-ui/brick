import { expect, expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";
installVisualDefaults("/skeleton?qualification=1");
test("Skeleton defaults, shapes, animation, dimensions, lines, and loading", async ({ page }) => {
  await expect(page.getByTestId("skeleton-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.getByTestId("skeleton-variants")).toHaveScreenshot("variants-light.png");
  await expect(page.getByTestId("skeleton-animation")).toHaveScreenshot("animation-light.png");
  await expect(page.getByTestId("skeleton-dimensions")).toHaveScreenshot("dimensions-light.png");
  await expect(page.getByTestId("skeleton-lines")).toHaveScreenshot("lines-light.png");
  await expect(page.getByTestId("skeleton-loading")).toHaveScreenshot("loading-light.png");
  await setAppearance(page, "dark"); await expect(page.getByTestId("skeleton-appearance")).toHaveScreenshot("appearance-dark.png");
  await page.addStyleTag({ content: "[data-playground-app-bar], .evidence-review-header, .scenario-nav { display: none !important; }" });
  await expectEvidenceScreenshot(page, page.locator("#scenario-skeleton-appearance"), "theme-dark.png");
});
test("Skeleton responsive and forced colors", async ({ page }) => { await page.setViewportSize({ width: 390, height: 844 }); await expect(page.getByTestId("skeleton-stress")).toHaveScreenshot("stress-mobile.png"); await page.setViewportSize({ width: 1120, height: 900 }); await useForcedColors(page); await expect(page.getByTestId("skeleton-variants")).toHaveScreenshot("variants-forced-colors.png"); });
test("Skeleton docs basic is polished in both appearances and on mobile", async ({ page }) => {
  await page.goto("/skeleton");
  const basic = page.locator('[data-component-page="skeleton"]').first().locator(".brick-skeleton").first().locator("xpath=ancestor::*[contains(@class,'brick-frame')][1]");
  await expect(basic).toHaveScreenshot("docs-basic-light.png");
  await expect(page.locator("#children .brick-skeleton").first().locator("..")).toHaveScreenshot("docs-children-light.png");
  await setAppearance(page, "dark");
  await expect(basic).toHaveScreenshot("docs-basic-dark.png");
  await page.setViewportSize({width:390,height:844});
  await expect(basic).toHaveScreenshot("docs-basic-mobile.png");
});
