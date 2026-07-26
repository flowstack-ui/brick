import { expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";
installVisualDefaults("/sidebar");
test("Sidebar complete visual dimensions", async ({ page }) => {
  for (const name of ["overview", "states", "variants", "sizes", "placement", "regions", "behavior"]) await expectEvidenceScreenshot(page, page.locator(`[data-scenario="sidebar.${name}"]`), `${name}-light.png`);
});
test("Sidebar appearance, stress, and forced colors", async ({ page }) => {
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="sidebar.appearance"]'), "appearance-dark.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="sidebar.stress"]'), "stress-mobile.png");
  await useForcedColors(page);
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="sidebar.states"]'), "states-forced-colors.png");
});
