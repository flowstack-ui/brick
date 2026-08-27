import {
  expectEvidenceScreenshot,
  installVisualDefaults,
  setAppearance,
  test,
} from "../../visual-harness.js";

installVisualDefaults("/group");

test("Group overview, attached geometry, and composition", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.locator(".group-overview"), "overview-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("group-attached"), "attached-light.png");
  await expectEvidenceScreenshot(page, page.getByText("Mixed composition").locator("../.."), "composition-light.png");
});

test("Group appearance, customization, and narrow RTL stress", async ({ page }) => {
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(page, page.getByTestId("group-customization"), "customization-dark.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.getByTestId("group-stress"), "stress-mobile.png");
});
