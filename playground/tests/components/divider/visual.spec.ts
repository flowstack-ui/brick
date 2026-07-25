import { expect, expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/divider");

test("Divider defaults and complete visual dimensions", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.getByTestId("divider-overview"), "overview-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("divider-orientations"), "orientations-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("divider-variants"), "variants-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("divider-thicknesses"), "thicknesses-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("divider-labels"), "labels-light.png");
});

test("Divider appearance, mobile RTL, and forced colors", async ({ page }) => {
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(page, page.getByTestId("divider-appearance"), "appearance-dark.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.getByTestId("divider-stress"), "stress-mobile.png");
  await useForcedColors(page);
  await expectEvidenceScreenshot(page, page.getByTestId("divider-variants"), "variants-forced-colors.png");
});
