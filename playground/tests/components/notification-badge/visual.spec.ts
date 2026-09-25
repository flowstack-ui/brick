import { expect, expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/notification-badge?qualification=1");

test("Notification Badge docs anchors and size progression", async ({page}) => {
  await page.goto("/notification-badge?testMode=1");
  await expect(page.locator("[data-example-canvas]").first()).toHaveScreenshot("inner-anchor-light.png");
  await expect(page.locator("#sizes [data-example-canvas]")).toHaveScreenshot("sizes-light.png");
  await expect(page.locator("#tones [data-example-canvas]")).toHaveScreenshot("tones-light.png");
  await setAppearance(page,"dark");
  await page.locator("#tones").evaluate(e=>e.scrollIntoView({block:"center"}));
  await expect(page.locator("#tones [data-example-canvas]")).toHaveScreenshot("tones-dark.png");
  await page.goto("/notification-badge?testMode=1&appearance=dark");
  await expect(page.locator("#outer-anchor [data-example-canvas]")).toHaveScreenshot("outer-anchor-dark.png");
});

test("Notification Badge modes and placement", async ({ page }) => {
  await expect(page.getByTestId("notification-badge-states")).toHaveScreenshot("states-light.png");
  await expect(page.getByTestId("notification-badge-appearance")).toHaveScreenshot("appearance-light.png");
  await expectEvidenceScreenshot(page, page.locator(".notification-badge-customization"), "customization-light.png");
  await setAppearance(page, "dark");
  await expect(page.getByTestId("notification-badge-placements")).toHaveScreenshot("placements-dark.png");
});

test("Notification Badge constrained and forced-color evidence", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const stress = page.getByTestId("notification-badge-stress");
  await expect(stress.getByText("Constrained", { exact: true })).toBeVisible();
  await expect(stress.getByText("RTL", { exact: true })).toBeVisible();
  await expect(stress).toHaveScreenshot("stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.getByTestId("notification-badge-states")).toHaveScreenshot("states-forced-colors.png");
});
