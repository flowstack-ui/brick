import {
  expectEvidenceScreenshot,
  installVisualDefaults,
  test,
} from "../../visual-harness.js";
installVisualDefaults("/editable");
test("Editable recipes and transactions", async ({ page }) => {
  for (const id of [
    "basic",
    "activation",
    "submission",
    "controlled",
    "multiline",
    "empty",
    "forms",
    "rejection",
    "appearance",
  ]) {
    await expectEvidenceScreenshot(
      page,
      page.locator(`#scenario-editable-${id}`),
      `editable-${id}.png`,
      { maxDiffPixelRatio: 0 },
    );
  }
  await page
    .locator("#scenario-editable-basic .brick-editable-preview")
    .click();
  await expectEvidenceScreenshot(
    page,
    page.locator("#scenario-editable-basic"),
    "editable-editing.png",
    { maxDiffPixelRatio: 0 },
  );
  await page.getByRole("button", { name: "Open rename dialog" }).click();
  await expectEvidenceScreenshot(
    page,
    page.getByRole("dialog"),
    "editable-dialog.png",
    { maxDiffPixelRatio: 0 },
  );
});
