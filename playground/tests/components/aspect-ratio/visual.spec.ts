import { expect, expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/aspect-ratio");

test("Aspect Ratio defaults, ratios, framing, and composition", async ({ page }) => {
  await expect(page.locator(".aspect-ratio-overview")).toHaveScreenshot("overview-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("aspect-ratio-ratios"), "ratios-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("aspect-ratio-variants"), "variants-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("aspect-ratio-radii"), "radii-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("aspect-ratio-content"), "content-light.png");
});

test("Aspect Ratio appearance, responsive, RTL, and forced colors", async ({ page }) => {
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(page, page.getByTestId("aspect-ratio-appearance"), "appearance-dark.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.getByTestId("aspect-ratio-stress"), "stress-mobile.png");
  await useForcedColors(page);
  await expectEvidenceScreenshot(page, page.getByTestId("aspect-ratio-variants"), "variants-forced-colors.png");
});
