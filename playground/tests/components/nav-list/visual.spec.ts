import { expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/nav-list");

test("Nav List defaults and complete visual dimensions", async ({ page }) => {
  for (const name of ["overview", "variants", "tones", "sizes", "content", "sections", "composition"]) {
    await expectEvidenceScreenshot(page, page.locator(`[data-scenario="nav-list.${name}"]`), `${name}-light.png`);
  }
});

test("Nav List appearance, mobile RTL, and forced colors", async ({ page }) => {
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="nav-list.appearance"]'), "appearance-dark.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="nav-list.stress"]'), "stress-mobile.png");
  await useForcedColors(page);
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="nav-list.variants"]'), "variants-forced-colors.png");
});
