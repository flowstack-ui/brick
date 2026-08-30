import { expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/code-block");

test("Code Block defaults, recipes, and anatomy", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="code-block.overview"]'), "overview-light.png");
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="code-block.variants"]'), "variants-light.png");
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="code-block.anatomy"]'), "anatomy-light.png");
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="code-block.overflow"]'), "overflow-light.png");
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="code-block.lines"]'), "lines-light.png");
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="code-block.bounded"]'), "bounded-light.png");
});

test("Code Block appearance, stress, and forced colors", async ({ page }) => {
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="code-block.appearance"]'), "appearance-dark.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="code-block.stress"]'), "stress-mobile.png");
  await useForcedColors(page);
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="code-block.anatomy"]'), "anatomy-forced-colors.png");
});
