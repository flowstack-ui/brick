import { expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/em");

test("Em overview and inherited contexts", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="em.overview"]'), "overview-light.png");
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="em.context"]'), "contexts-light.png");
});

test("Em dark, mobile, and forced colors", async ({ page }) => {
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="em.context"]'), "contexts-dark.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="em.native"]'), "native-mobile.png");
  await useForcedColors(page);
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="em.overview"]'), "overview-forced-colors.png");
});
