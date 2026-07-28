import { expect, installVisualDefaults, test } from "../../visual-harness.js";
installVisualDefaults("/toolbar");
test("Toolbar overview and recipes",async({page})=>{await page.setViewportSize({width:1120,height:1000});await expect(page.locator("#scenario-toolbar-overview")).toHaveScreenshot("overview-light.png");await expect(page.locator("#scenario-toolbar-variants")).toHaveScreenshot("variants-light.png");});
test("Toolbar customization and stress evidence", async ({ page }) => {
  await page.setViewportSize({ width: 1120, height: 1400 });
  await expect(page.locator("#scenario-toolbar-appearance")).toHaveScreenshot("appearance-light.png");
  await expect(page.locator("#scenario-toolbar-stress")).toHaveScreenshot("stress-light.png");
});
