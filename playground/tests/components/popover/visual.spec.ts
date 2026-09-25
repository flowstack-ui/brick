import {
  expect,
  expectEvidenceScreenshot,
  installVisualDefaults,
  setAppearance,
  test,
  useForcedColors,
} from "../../visual-harness.js";

installVisualDefaults("/popover?qualification=1");

test("Popover documentation indicator radius and virtual anchor", async ({ page }) => {
  for (const appearance of ["light", "dark"] as const) {
    await page.goto(`/popover?appearance=${appearance}#indicator`);
    await page.locator("#indicator").getByRole("button", { name: "Settings", exact: true }).scrollIntoViewIfNeeded();
    await expect(page.locator("#indicator")).toHaveScreenshot(`indicator-${appearance}.png`);
    await page.locator("#radius").getByRole("button", { name: "full", exact: true }).click();
    await expect(page.getByRole("dialog", { name: "full", exact: true })).toHaveScreenshot(`full-radius-${appearance}.png`);
    await page.keyboard.press("Escape");
    await page.getByRole("button", { name: "Open at reference", exact: true }).click();
    await expect(page).toHaveScreenshot(`virtual-anchor-${appearance}.png`);
    await page.keyboard.press("Escape");
  }
});

test("Popover default and anatomy surfaces", async ({ page }) => {
  await page.getByRole("button", { name: "Project settings" }).click();
  await expect(page).toHaveScreenshot("overview-light.png");
  await page.keyboard.press("Escape");
  await page.addStyleTag({
    content:
      "[data-playground-app-bar], .evidence-review-header, .scenario-nav { display: none !important; }",
  });
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("popover-appearance"),
    "appearance-light.png",
  );
  await setAppearance(page, "dark");
  await page.getByRole("button", { name: "Inspect anatomy" }).click();
  await expect(page).toHaveScreenshot("anatomy-dark.png");
});

test("Popover narrow RTL and forced-color boundaries", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "فتح إعدادات المشروع" }).click();
  await expect(page).toHaveScreenshot("rtl-mobile.png");
  await page.keyboard.press("Escape");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await page.getByRole("button", { name: "Project settings" }).click();
  await expect(page).toHaveScreenshot("overview-forced-colors.png");
});
