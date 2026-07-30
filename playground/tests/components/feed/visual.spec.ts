import { expectEvidenceScreenshot, installVisualDefaults, test } from "../../visual-harness.js";

installVisualDefaults("/feed");

test("Feed defaults, recipes, focus, and dynamic state", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.getByTestId("feed-overview"), "overview-light.png");
  await expectEvidenceScreenshot(page, page.locator("#scenario-feed-variants"), "variants-light.png");
  await expectEvidenceScreenshot(page, page.locator("#scenario-feed-density"), "density-light.png");
  await page.getByTestId("feed-overview").getByRole("article").first().focus();
  await expectEvidenceScreenshot(page, page.getByTestId("feed-overview"), "item-focus.png");
  await page.getByTestId("feed-overview").getByRole("button", { name: "Acknowledge" }).first().focus();
  await expectEvidenceScreenshot(page, page.getByTestId("feed-overview"), "descendant-focus.png");
  await page.getByTestId("feed-dynamic").getByRole("button", { name: "Mark busy" }).click();
  await expectEvidenceScreenshot(page, page.getByTestId("feed-dynamic"), "dynamic-busy.png");
});

test("Feed appearance, customization, responsive RTL, and forced colors", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.locator("#scenario-feed-appearance"), "appearance.png");
  await expectEvidenceScreenshot(page, page.getByTestId("feed-customized"), "customized.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.locator("#scenario-feed-stress"), "stress-mobile.png");
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1120, height: 900 });
  await expectEvidenceScreenshot(page, page.getByTestId("feed-overview"), "overview-forced-colors.png");
});
