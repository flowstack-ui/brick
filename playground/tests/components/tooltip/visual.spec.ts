import {
  expect,
  expectEvidenceScreenshot,
  installVisualDefaults,
  test,
  useForcedColors,
} from "../../visual-harness.js";

installVisualDefaults("/tooltip");

test("Tooltip default surface and recipes", async ({ page }) => {
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("tooltip-composition"),
    "composition-output-light.png",
  );
  await page.evaluate(() => window.scrollTo(0, 0));
  const trigger = page.getByRole("button", { name: "Search workspace" });
  await trigger.focus();
  await expect(
    page
      .locator("[data-slot='tooltip']")
      .filter({ hasText: "Search workspace" }),
  ).toHaveAttribute("data-positioned", "");
  await expect(page).toHaveScreenshot("overview-light.png");
});

test("Tooltip narrow RTL and forced-color boundaries", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page
    .getByRole("button", { name: "البحث في المشاريع والملفات" })
    .focus();
  await expect(page).toHaveScreenshot("rtl-mobile.png");
  await page.keyboard.press("Escape");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await page.getByRole("button", { name: "Search workspace" }).focus();
  await expect(page).toHaveScreenshot("overview-forced-colors.png");
});
