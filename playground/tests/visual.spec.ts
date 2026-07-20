import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Visual baselines are intentionally Chromium-only.");
  await page.setViewportSize({ width: 1120, height: 900 });
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  await page.goto("/button");
  await page.evaluate(async () => {
    document.documentElement.dataset.brickAppearance = "light";
    await document.fonts.ready;
  });
});

test("Button visual recipes retain their hierarchy", async ({ page }) => {
  await expect(page.getByTestId("button-variants")).toHaveScreenshot("button-variants-light.png");

  await page.evaluate(() => {
    document.documentElement.dataset.brickAppearance = "dark";
  });
  await expect(page.getByTestId("button-tones")).toHaveScreenshot("button-tones-dark.png");
  await expect(page.getByTestId("button-sizes")).toHaveScreenshot("button-sizes-dark.png");
});

test("Checkbox family retains state, size, and structured-content hierarchy", async ({ page }) => {
  await page.goto("/checkbox");
  await expect(page.getByTestId("checkbox-sizes-states")).toHaveScreenshot("checkbox-sizes-states-light.png");
  await page.evaluate(() => { document.documentElement.dataset.brickAppearance = "dark"; });
  await expect(page.getByTestId("checkbox-overview")).toHaveScreenshot("checkbox-overview-dark.png");
});

test("Checkbox family remains logical and contained in mobile RTL and forced colors", async ({ page }) => {
  await page.goto("/checkbox");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("checkbox-stress")).toHaveScreenshot("checkbox-stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  await expect(page.getByTestId("checkbox-sizes-states")).toHaveScreenshot("checkbox-sizes-states-forced-colors.png");
});

test("Button high-risk states retain visible boundaries", async ({ page }) => {
  await expect(page.getByTestId("button-states")).toHaveScreenshot("button-states-light.png");

  await page.emulateMedia({ colorScheme: "light", forcedColors: "active", reducedMotion: "reduce" });
  await expect(page.getByTestId("button-states")).toHaveScreenshot("button-states-forced-colors.png");
});

test("Button constrained and RTL recipes remain contained", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("button-stress")).toHaveScreenshot("button-stress-mobile.png");
});

test("IconButton recipes retain compact hierarchy", async ({ page }) => {
  await page.goto("/icon-button");
  await expect(page.getByTestId("icon-button-variants")).toHaveScreenshot("icon-button-variants-light.png");
  await page.evaluate(() => { document.documentElement.dataset.brickAppearance = "dark"; });
  await expect(page.getByTestId("icon-button-tones")).toHaveScreenshot("icon-button-tones-dark.png");
});

test("IconButton states remain visible in forced colors and constrained layouts", async ({ page }) => {
  await page.goto("/icon-button");
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  await expect(page.getByTestId("icon-button-states")).toHaveScreenshot("icon-button-states-forced-colors.png");
  await page.emulateMedia({ forcedColors: "none", reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("icon-button-stress")).toHaveScreenshot("icon-button-stress-mobile.png");
});

test("AppBar surfaces and anatomy retain hierarchy", async ({ page }) => {
  await page.goto("/app-bar");
  await expect(page.getByTestId("app-bar-variants")).toHaveScreenshot("app-bar-variants-light.png");
  await page.evaluate(() => { document.documentElement.dataset.brickAppearance = "dark"; });
  await expect(page.getByTestId("app-bar-options")).toHaveScreenshot("app-bar-options-dark.png");
});

test("AppBar remains contained on mobile and visible in forced colors", async ({ page }) => {
  await page.goto("/app-bar");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("app-bar-stress")).toHaveScreenshot("app-bar-stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  await expect(page.getByTestId("app-bar-density")).toHaveScreenshot("app-bar-density-forced-colors.png");
});

test("Card visual hierarchy remains stable across recipes and appearances", async ({ page }) => {
  await page.goto("/card");
  await expect(page.getByTestId("card-variants")).toHaveScreenshot("card-variants-light.png");
  await expect(page.getByTestId("card-sizes")).toHaveScreenshot("card-sizes-light.png");

  await page.evaluate(() => { document.documentElement.dataset.brickAppearance = "dark"; });
  await expect(page.getByTestId("card-overview")).toHaveScreenshot("card-overview-dark.png");
  await expect(page.getByTestId("card-appearance")).toHaveScreenshot("card-appearance-scopes.png");
});

test("Card constrained and RTL recipes remain visually contained", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/card");
  await expect(page.getByTestId("card-stress")).toHaveScreenshot("card-stress-mobile.png");
});

test("Card variants retain boundaries in forced colors", async ({ page }) => {
  await page.goto("/card");
  await page.emulateMedia({ colorScheme: "light", forcedColors: "active", reducedMotion: "reduce" });
  await expect(page.getByTestId("card-variants")).toHaveScreenshot("card-variants-forced-colors.png");
});

test("Dialog surface and anatomy retain their visual hierarchy", async ({ page }) => {
  await page.goto("/dialog");
  await page.getByRole("button", { name: "Edit profile" }).click();
  await expect(page).toHaveScreenshot("dialog-overview-light.png");

  await page.keyboard.press("Escape");
  await page.evaluate(() => { document.documentElement.dataset.brickAppearance = "dark"; });
  await page.getByRole("button", { name: "Inspect dialog anatomy" }).click();
  await expect(page).toHaveScreenshot("dialog-anatomy-dark.png");
});

test("Dialog remains contained in narrow RTL layouts", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/dialog");
  await page.getByRole("button", { name: "فتح إعدادات مساحة العمل المفصلة" }).click();
  await expect(page).toHaveScreenshot("dialog-rtl-mobile.png");
});

test("Dialog retains its boundary in forced colors", async ({ page }) => {
  await page.goto("/dialog");
  await page.emulateMedia({ colorScheme: "light", forcedColors: "active", reducedMotion: "reduce" });
  await page.getByRole("button", { name: "Edit profile" }).click();
  await expect(page).toHaveScreenshot("dialog-overview-forced-colors.png");
});

test("AlertDialog surface and urgent actions retain their visual hierarchy", async ({ page }) => {
  await page.goto("/alert-dialog");
  await page.getByRole("button", { name: "Delete project?" }).click();
  await expect(page).toHaveScreenshot("alert-dialog-overview-light.png");

  await page.getByRole("button", { name: "Keep project" }).click();
  await page.evaluate(() => { document.documentElement.dataset.brickAppearance = "dark"; });
  await page.getByRole("button", { name: "Inspect decision anatomy" }).click();
  await expect(page).toHaveScreenshot("alert-dialog-anatomy-dark.png");
});

test("AlertDialog remains contained in narrow RTL layouts", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/alert-dialog");
  await page.getByRole("button", { name: "حذف مشروع مساحة العمل بالتأكيد؟" }).click();
  await expect(page).toHaveScreenshot("alert-dialog-rtl-mobile.png");
});

test("AlertDialog retains its boundary in forced colors", async ({ page }) => {
  await page.goto("/alert-dialog");
  await page.emulateMedia({ colorScheme: "light", forcedColors: "active", reducedMotion: "reduce" });
  await page.getByRole("button", { name: "Delete project?" }).click();
  await expect(page).toHaveScreenshot("alert-dialog-overview-forced-colors.png");
});

test("Drawer end surface and anatomy retain their visual hierarchy", async ({ page }) => {
  await page.goto("/drawer");
  await page.getByRole("button", { name: "Filter projects" }).click();
  await expect(page).toHaveScreenshot("drawer-end-md-light.png");

  await page.getByRole("button", { name: "Cancel" }).click();
  await page.evaluate(() => { document.documentElement.dataset.brickAppearance = "dark"; });
  await page.getByRole("button", { name: "Inspect drawer anatomy" }).click();
  await expect(page).toHaveScreenshot("drawer-anatomy-lg-dark.png");
});

test("Drawer remains distinct and contained in a narrow RTL layout", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/drawer");
  await page.getByRole("button", { name: "فتح مرشحات مساحة العمل المفصلة" }).click();
  await expect(page).toHaveScreenshot("drawer-start-lg-rtl-mobile.png");
});

test("full mobile Drawer is visually distinct from large", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/drawer");
  await page.getByRole("button", { name: "Open full drawer" }).click();
  await expect(page).toHaveScreenshot("drawer-full-mobile.png");
});

test("top Drawer retains its boundary in forced colors", async ({ page }) => {
  await page.goto("/drawer");
  await page.emulateMedia({ colorScheme: "light", forcedColors: "active", reducedMotion: "reduce" });
  await page.getByRole("button", { name: "Open top drawer" }).click();
  await expect(page).toHaveScreenshot("drawer-top-forced-colors.png");
});

test("Badge recipes and sizes retain their light hierarchy", async ({ page }) => {
  await page.goto("/badge");
  await expect(page.getByTestId("badge-recipes")).toHaveScreenshot("badge-recipes-light.png");
  await expect(page.getByTestId("badge-sizes-shapes")).toHaveScreenshot("badge-sizes-shapes-light.png");
});

test("Notification counts, dots, and placements retain dark geometry", async ({ page }) => {
  await page.goto("/badge");
  await page.evaluate(() => { document.documentElement.dataset.brickAppearance = "dark"; });
  await expect(page.getByTestId("notification-counts")).toHaveScreenshot("notification-badges-dark.png");
  await expect(page.getByTestId("notification-placements")).toHaveScreenshot("notification-placements-dark.png");
});

test("Badge family remains contained in narrow localized layouts", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/badge");
  await expect(page.getByTestId("badge-stress")).toHaveScreenshot("badge-stress-mobile.png");
});

test("Badge family retains visible boundaries in forced colors", async ({ page }) => {
  await page.goto("/badge");
  await page.emulateMedia({ colorScheme: "light", forcedColors: "active", reducedMotion: "reduce" });
  await expect(page.getByTestId("badge-recipes")).toHaveScreenshot("badge-recipes-forced-colors.png");
  await expect(page.getByTestId("notification-counts")).toHaveScreenshot("notification-badges-forced-colors.png");
});

test("Avatar sizes, shapes, and status rings retain their light hierarchy", async ({ page }) => {
  await page.goto("/avatar");
  await expect(page.getByTestId("avatar-sizes")).toHaveScreenshot("avatar-sizes-light.png");
  await expect(page.getByTestId("avatar-shapes")).toHaveScreenshot("avatar-shapes-light.png");
  await expect(page.getByTestId("avatar-statuses")).toHaveScreenshot("avatar-statuses-light.png");
});

test("Avatar loaded, fallback, and notification compositions retain dark geometry", async ({ page }) => {
  await page.goto("/avatar");
  await page.evaluate(() => { document.documentElement.dataset.brickAppearance = "dark"; });
  await expect(page.getByTestId("avatar-overview")).toHaveScreenshot("avatar-overview-dark.png");
  await expect(page.getByTestId("avatar-notifications")).toHaveScreenshot("avatar-notifications-dark.png");
});

test("Avatar localized stress remains contained on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/avatar");
  await expect(page.getByTestId("avatar-stress")).toHaveScreenshot("avatar-stress-mobile.png");
});

test("Avatar status geometry retains a visible forced-colors boundary", async ({ page }) => {
  await page.goto("/avatar");
  await page.emulateMedia({ colorScheme: "light", forcedColors: "active", reducedMotion: "reduce" });
  await expect(page.getByTestId("avatar-statuses")).toHaveScreenshot("avatar-statuses-forced-colors.png");
});

test("Toggle recipes and group geometry retain their light hierarchy", async ({ page }) => {
  await page.goto("/toggle");
  await expect(page.getByTestId("toggle-recipes")).toHaveScreenshot("toggle-recipes-light.png");
  await expect(page.getByTestId("toggle-sizes-shapes")).toHaveScreenshot("toggle-sizes-shapes-light.png");
  await expect(page.getByTestId("toggle-single-group")).toHaveScreenshot("toggle-single-group-light.png");
});

test("Toggle selected state and separated filters retain dark geometry", async ({ page }) => {
  await page.goto("/toggle");
  await page.evaluate(() => { document.documentElement.dataset.brickAppearance = "dark"; });
  await expect(page.getByTestId("toggle-overview")).toHaveScreenshot("toggle-overview-dark.png");
  await expect(page.getByTestId("toggle-multiple-group")).toHaveScreenshot("toggle-multiple-group-dark.png");
});

test("Toggle family remains contained in narrow localized layouts", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/toggle");
  await expect(page.getByTestId("toggle-stress")).toHaveScreenshot("toggle-stress-mobile.png");
});

test("Toggle selected boundaries survive forced colors", async ({ page }) => {
  await page.goto("/toggle");
  await page.emulateMedia({ colorScheme: "light", forcedColors: "active", reducedMotion: "reduce" });
  await expect(page.getByTestId("toggle-recipes")).toHaveScreenshot("toggle-recipes-forced-colors.png");
});

test("HoverCard elevated preview retains its light and dark hierarchy", async ({ page }) => {
  await page.goto("/hover-card");
  await page.getByRole("link", { name: "Ada Lovelace" }).focus();
  await expect(page.locator("[data-slot='hover-card']").filter({ hasText: "Mathematician" })).toHaveAttribute("data-positioned", "");
  await expect(page).toHaveScreenshot("hover-card-overview-light.png");

  await page.keyboard.press("Escape");
  await page.evaluate(() => { document.documentElement.dataset.brickAppearance = "dark"; });
  await page.getByRole("link", { name: "Compiler project notes" }).focus();
  await expect(page.locator("[data-slot='hover-card']").filter({ hasText: "12 minute read" })).toHaveAttribute("data-positioned", "");
  await expect(page).toHaveScreenshot("hover-card-composition-dark.png");
});

test("HoverCard remains visually contained in a narrow RTL layout", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/hover-card");
  await page.getByRole("link", { name: "ملف آدا لوفلايس" }).focus();
  await expect(page.locator("[data-slot='hover-card']").filter({ hasText: "عالمة رياضيات" })).toHaveAttribute("data-positioned", "");
  await expect(page).toHaveScreenshot("hover-card-rtl-mobile.png");
});

test("HoverCard surface and Arrow retain boundaries in forced colors", async ({ page }) => {
  await page.goto("/hover-card");
  await page.emulateMedia({ colorScheme: "light", forcedColors: "active", reducedMotion: "reduce" });
  await page.getByRole("link", { name: "Ada Lovelace" }).focus();
  await expect(page.locator("[data-slot='hover-card']").filter({ hasText: "Mathematician" })).toHaveAttribute("data-positioned", "");
  await expect(page).toHaveScreenshot("hover-card-overview-forced-colors.png");
});

test("Form foundation anatomy and states retain their visual hierarchy", async ({ page }) => {
  await page.goto("/form-foundation");
  await expect(page.getByTestId("form-foundation-overview")).toHaveScreenshot("form-foundation-overview-light.png");
  await page.evaluate(() => { document.documentElement.dataset.brickAppearance = "dark"; });
  await expect(page.getByTestId("form-foundation-appearance")).toHaveScreenshot("form-foundation-appearance-dark.png");
});

test("Form foundation remains visually contained in a narrow RTL layout", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/form-foundation");
  await expect(page.getByTestId("form-foundation-stress")).toHaveScreenshot("form-foundation-stress-mobile.png");
});

test("Form foundation invalid boundaries survive forced colors", async ({ page }) => {
  await page.goto("/form-foundation");
  await page.emulateMedia({ colorScheme: "light", forcedColors: "active", reducedMotion: "reduce" });
  await expect(page.getByTestId("form-foundation-overview")).toHaveScreenshot("form-foundation-overview-forced-colors.png");
});
