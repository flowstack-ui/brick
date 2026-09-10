import { expect, installVisualDefaults, test } from "../../visual-harness.js";
installVisualDefaults("/stat");
test("Stat typography, units and appearance", async ({ page }) => {
  for (const id of ["basic", "sizes", "units", "trends", "appearance"]) {
    await expect(page.locator(`#scenario-stat-${id}`)).toHaveScreenshot(`${id}.png`);
  }
});
