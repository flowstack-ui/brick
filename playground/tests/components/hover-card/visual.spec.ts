import { expect, expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/hover-card");

test("Hover Card default and composition surfaces", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.getByTestId("hover-card-composition"), "composition-output-light.png");
  await page.getByRole("link", { name: "Ada Lovelace" }).focus();
  await expect(page.locator("[data-slot='hover-card']").filter({ hasText: "Mathematician" })).toHaveAttribute("data-positioned", "");
  await expect(page).toHaveScreenshot("overview-light.png");
  await page.keyboard.press("Escape");
  await setAppearance(page, "dark");
  await page.getByRole("link", { name: "Compiler project notes" }).focus();
  await expect(page.locator("[data-slot='hover-card']").filter({ hasText: "12 minute read" })).toHaveAttribute("data-positioned", "");
  await expect(page).toHaveScreenshot("composition-dark.png");
});

test("Hover Card narrow RTL and forced-color boundaries", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("link", { name: "ملف آدا لوفلايس" }).focus();
  await expect(page).toHaveScreenshot("rtl-mobile.png");
  await page.keyboard.press("Escape");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await page.getByRole("link", { name: "Ada Lovelace" }).focus();
  await expect(page).toHaveScreenshot("overview-forced-colors.png");
});
