import { expect, installVisualDefaults, setAppearance, test } from "../../visual-harness.js";
installVisualDefaults("/input-addon?qualification=1");
test("attached segment light and dark", async ({ page }) => {
  const specimen = page.locator('[data-scenario="input-addon.overview"]');
  await expect(specimen).toHaveScreenshot("attached-light.png");
  await setAppearance(page, "dark");
  await expect(specimen).toHaveScreenshot("attached-dark.png");
});
