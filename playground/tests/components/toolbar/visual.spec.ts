import {
  expect,
  installVisualDefaults,
  setAppearance,
  test,
} from "../../visual-harness.js";
installVisualDefaults("/toolbar");
test("Toolbar overview and recipes",async({page})=>{await page.setViewportSize({width:1120,height:1000});await expect(page.locator("#scenario-toolbar-overview")).toHaveScreenshot("overview-light.png");await expect(page.locator("#scenario-toolbar-variants")).toHaveScreenshot("variants-light.png");});
test("Toolbar customization and stress evidence", async ({ page }) => {
  await page.setViewportSize({ width: 1120, height: 1400 });
  await expect(page.locator("#scenario-toolbar-appearance")).toHaveScreenshot("appearance-light.png");
  await expect(page.locator("#scenario-toolbar-stress")).toHaveScreenshot("stress-light.png");
});
test("Toolbar neutral selection and disabled evidence", async ({ page }) => {
  await page.setViewportSize({ width: 1120, height: 1000 });
  await expect(page.locator("#scenario-toolbar-content")).toHaveScreenshot(
    "content-disabled-light.png",
  );
  const scenario = page.locator("#scenario-toolbar-toggles");
  await expect(scenario).toHaveScreenshot("toggles-light.png");
  await setAppearance(page, "dark");
  await expect(scenario).toHaveScreenshot("toggles-dark.png");
});
test("Toolbar focus rings remain visible inside scrolling boundaries", async ({ page }) => {
  await page.setViewportSize({ width: 1120, height: 1000 });
  const horizontal = page.locator("#scenario-toolbar-overview .brick-toolbar");
  await horizontal.getByRole("button", { name: "Undo" }).focus();
  await expect(horizontal).toHaveScreenshot("focus-horizontal-light.png");

  const vertical = page.locator(
    '#scenario-toolbar-orientation .brick-toolbar[data-orientation="vertical"]',
  );
  await vertical.getByRole("button", { name: "Top" }).focus();
  await expect(vertical).toHaveScreenshot("focus-vertical-light.png");
});
