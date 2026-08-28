import { expectEvidenceScreenshot, installVisualDefaults, test } from "../../visual-harness.js";

installVisualDefaults("/bleed");

test("Bleed edge-media relationships", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.getByTestId("bleed-inline-owner"), "edge-media-light.png");
});

test("Bleed responsive composition", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.getByTestId("bleed-responsive"), "responsive-mobile.png");
});
