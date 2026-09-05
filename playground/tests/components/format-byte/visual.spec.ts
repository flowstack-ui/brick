import { expectEvidenceScreenshot, installVisualDefaults, test } from "../../visual-harness.js";

installVisualDefaults("/format-byte");
test("byte formats", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.getByTestId("format-byte-output"), "formats-light.png");
});
