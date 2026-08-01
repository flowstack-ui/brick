import {
  expect,
  installVisualDefaults,
  setAppearance,
  test,
  useForcedColors,
} from "../../visual-harness.js";

installVisualDefaults("/skip-link");

test("Skip Link focused default and sticky overlay", async ({ page }) => {
  const hiddenSkipLinks = await page.addStyleTag({ content: ".brick-skip-link { display: none !important; }" });
  await expect(page.locator("#scenario-skip-link-overview")).toHaveScreenshot("overview-layout-light.png");
  await expect(page.locator("#scenario-skip-link-native")).toHaveScreenshot("native-layout-light.png");
  await expect(page.locator("#scenario-skip-link-composition")).toHaveScreenshot("composition-layout-light.png");
  await expect(page.locator("#scenario-skip-link-stress")).toHaveScreenshot("stress-layout-light.png");
  await hiddenSkipLinks.evaluate((node) => node.parentNode?.removeChild(node));
  const overview = page.getByRole("link", { name: "Skip repeated workspace navigation" });
  await overview.focus();
  await expect(overview).toHaveScreenshot("overview-focus-light.png");

  await page.locator("#scenario-skip-link-sticky").scrollIntoViewIfNeeded();
  const sticky = page.getByRole("link", { name: "Skip Brick playground navigation" });
  await sticky.focus();
  await expect(page).toHaveScreenshot("sticky-focus-light.png");
});

test("Skip Link dark, customized, mobile RTL, and forced-colors focus", async ({ page }) => {
  await setAppearance(page, "dark");
  await expect(page.getByTestId("skip-link-appearance")).toHaveScreenshot("appearance-dark.png");
  await expect(page.getByTestId("skip-link-customization")).toHaveScreenshot("customization-dark.png");
  const dark = page.getByRole("link", { name: "Skip dark navigation" });
  await dark.focus();
  await expect(dark).toHaveScreenshot("appearance-focus-dark.png");

  const custom = page.getByRole("link", { name: "Skip customized navigation" });
  await custom.focus();
  await expect(custom).toHaveScreenshot("customization-focus-dark.png");

  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
  const hiddenSkipLinks = await page.addStyleTag({ content: ".brick-skip-link { display: none !important; }" });
  await expect(page.locator("#scenario-skip-link-appearance")).toHaveScreenshot("appearance-mobile.png");
  await hiddenSkipLinks.evaluate((node) => node.parentNode?.removeChild(node));
  const rtl = page.getByRole("link", { name: "تخطى أدوات التنقل وانتقل إلى المحتوى الرئيسي" });
  await rtl.focus();
  await expect(page).toHaveScreenshot("stress-focus-mobile.png");

  await useForcedColors(page);
  await expect(rtl).toHaveScreenshot("focus-forced-colors.png");
});
