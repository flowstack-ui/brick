import { expect, installVisualDefaults, test } from "../../visual-harness.js";
installVisualDefaults("/stat?qualification=1");
test("Stat typography, units and appearance", async ({ page }) => {
  for (const id of ["basic", "sizes", "units", "trends", "appearance"]) {
    await expect(page.locator(`#scenario-stat-${id}`)).toHaveScreenshot(`${id}.png`);
  }
});
test("Stat focused supporting examples", async ({ page }) => {
  await page.goto("/stat?testMode=1");
  for (const id of ["units", "progress", "trend", "artwork"]) {
    await expect(page.locator("#" + id)).toHaveScreenshot("docs-" + id + ".png");
  }
  await page.goto("/stat?testMode=1&appearance=dark&exampleDirection=rtl");
  await page.setViewportSize({ width: 390, height: 900 });
  await expect(page.locator("#progress")).toHaveScreenshot("docs-progress-dark-rtl.png");
});
