import {
  expectEvidenceScreenshot,
  installVisualDefaults,
  setAppearance,
  test,
} from "../../visual-harness.js";
installVisualDefaults("/checkmark");
for (const appearance of ["light", "dark"] as const) {
  test("Checkmark recipes " + appearance, async ({ page }) => {
    await setAppearance(page, appearance);
    await expectEvidenceScreenshot(
      page,
      page.locator("#controlled"),
      "checkmark-controlled-" + appearance + ".png",
    );
    await expectEvidenceScreenshot(
      page,
      page.locator("#variants"),
      "checkmark-variants-" + appearance + ".png",
    );
    await expectEvidenceScreenshot(
      page,
      page.locator("#states"),
      "checkmark-states-" + appearance + ".png",
    );
    await expectEvidenceScreenshot(
      page,
      page.locator("#sizes"),
      "checkmark-sizes-" + appearance + ".png",
    );
  });
}
