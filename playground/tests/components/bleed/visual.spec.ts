import { expectEvidenceScreenshot, installVisualDefaults, test } from "../../visual-harness.js";
import { docsParent } from "./docs-locators.js";

installVisualDefaults("/bleed?qualification=1");

test("Bleed edge-media relationships", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.getByTestId("bleed-inline-owner"), "edge-media-light.png");
});

test("Bleed responsive composition", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.getByTestId("bleed-responsive"), "responsive-mobile.png");
});

test("Bleed docs basic and logical examples", async ({ page }) => {
  await page.goto("/bleed");
  await expectEvidenceScreenshot(page, docsParent(page, "basic"), "docs-basic-light.png");
  await expectEvidenceScreenshot(page, page.locator("#specific-direction"), "docs-directions-light.png");
  await page.evaluate(() => { document.documentElement.dataset.brickAppearance = "dark"; });
  await expectEvidenceScreenshot(page, docsParent(page, "basic"), "docs-basic-dark.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, docsParent(page, "fluid"), "docs-responsive-mobile.png");
});
