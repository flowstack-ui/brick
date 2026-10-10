import {
  expectEvidenceScreenshot,
  installVisualDefaults,
  setAppearance,
  test,
} from "../../visual-harness.js";
installVisualDefaults("/radiomark");
for (const appearance of ["light", "dark"] as const) {
  test("Radiomark recipes " + appearance, async ({ page }) => {
    await setAppearance(page, appearance);
    await expectEvidenceScreenshot(
      page,
      page.locator("#controlled"),
      "radiomark-controlled-" + appearance + ".png",
    );
    await expectEvidenceScreenshot(
      page,
      page.locator("#variants"),
      "radiomark-variants-" + appearance + ".png",
    );
    await expectEvidenceScreenshot(
      page,
      page.locator("#states"),
      "radiomark-states-" + appearance + ".png",
    );
    await expectEvidenceScreenshot(
      page,
      page.locator("#sizes"),
      "radiomark-sizes-" + appearance + ".png",
    );
  });
}
