import { expectEvidenceScreenshot, installVisualDefaults, test } from "../../visual-harness.js";

installVisualDefaults("/file-upload");

test("File Upload visual evidence", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.getByTestId("file-upload-overview"), "overview-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("file-upload-variants"), "variants-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("file-upload-recipes"), "recipes-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("file-upload-states"), "states-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("file-upload-appearance"), "appearance.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.getByTestId("file-upload-stress"), "stress-mobile.png");
});
