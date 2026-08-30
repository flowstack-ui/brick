import { expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/prose");

test("Prose overview, scale, and editorial descendants", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="prose.overview"]'), "overview-light.png");
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="prose.scale"]'), "scale-light.png");
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="prose.content"]'), "content-light.png");
});

test("Prose dark, mobile RTL, and forced colors", async ({ page }) => {
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="prose.content"]'), "content-dark.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="prose.adaptation"]'), "adaptation-mobile.png");
  await useForcedColors(page);
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="prose.overview"]'), "overview-forced-colors.png");
});
