import { expectEvidenceScreenshot, installVisualDefaults, test } from "../../visual-harness.js";

installVisualDefaults("/swipeable-item");

test("Swipeable Item defaults, variants, actions, and controlled state", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.getByTestId("swipeable-overview"), "overview-light.png");
  await expectEvidenceScreenshot(page, page.locator("#scenario-swipeable-item-variants"), "variants-light.png");
  await expectEvidenceScreenshot(page, page.locator("#scenario-swipeable-item-sides"), "sides-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("swipeable-alternative"), "alternative-light.png");
  const controlled = page.locator("#scenario-swipeable-item-controlled");
  await controlled.getByRole("button", { name: "Open end" }).click();
  await expectEvidenceScreenshot(page, controlled, "controlled-end.png");
});

test("Swipeable Item appearance, customization, responsive RTL, and forced colors", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.locator("#scenario-swipeable-item-appearance"), "appearance.png");
  await expectEvidenceScreenshot(page, page.locator("#scenario-swipeable-item-customized"), "customized.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.locator("#scenario-swipeable-item-stress"), "stress-mobile.png");
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1120, height: 900 });
  await page.getByTestId("swipeable-overview-item").locator(".brick-swipeable-item__content").focus();
  await expectEvidenceScreenshot(page, page.getByTestId("swipeable-overview"), "overview-forced-colors.png");
});
