import { expectEvidenceScreenshot, installVisualDefaults, setAppearance, test } from "../../visual-harness.js";
installVisualDefaults("/date-picker");
for (const appearance of ["light", "dark"] as const) {
  test("DatePicker " + appearance, async ({ page }) => {
    await setAppearance(page, appearance); await page.getByRole("button", { name: "Choose date", exact: true }).click();
    await expectEvidenceScreenshot(page, page.getByRole("dialog", { name: "Delivery calendar" }), "date-picker-" + appearance + ".png");
  });
}
