import {
  expect,
  installVisualDefaults,
  setAppearance,
  test,
} from "../../visual-harness.js";
installVisualDefaults("/checkbox-card?qualification=1");
test("CheckboxCard recipes in both appearances", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Reviewed desktop Chromium baseline; other profiles own behavior tests.");
  await expect(
    page.locator('[data-scenario="checkbox-card.variants"]'),
  ).toHaveScreenshot("variants-light.png");
  await expect(
    page.locator('[data-scenario="checkbox-card.sizes"]'),
  ).toHaveScreenshot("sizes-light.png");
  await setAppearance(page, "dark");
  await expect(page.locator('[data-scenario="checkbox-card.states"]')).toHaveScreenshot("states-dark.png");
  await expect(
    page.locator('[data-scenario="checkbox-card.variants"]'),
  ).toHaveScreenshot("variants-dark.png");
  await expect(
    page.locator('[data-scenario="checkbox-card.addon"]'),
  ).toHaveScreenshot("addon-dark.png");
  await setAppearance(page, "light");
  await expect(page.locator('[data-scenario="checkbox-card.states"]')).toHaveScreenshot("states-light.png");
});
