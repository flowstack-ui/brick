import {
  expectEvidenceScreenshot,
  installVisualDefaults,
  test,
} from "../../visual-harness.js";

installVisualDefaults("/password-toggle-field?qualification=1");

test("Password Toggle Field visual evidence", async ({ page }) => {
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("password-toggle-field-overview"),
    "overview-light.png",
  );
  const overview = page.getByTestId("password-toggle-field-overview");
  await overview.getByRole("textbox", { name: "Password" }).focus();
  await expectEvidenceScreenshot(
    page,
    overview,
    "overview-input-focus-light.png",
  );
  await page.keyboard.press("Tab");
  await overview.scrollIntoViewIfNeeded();
  await expectEvidenceScreenshot(
    page,
    overview,
    "overview-toggle-focus-light.png",
  );
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("password-toggle-field-variants"),
    "variants-light.png",
  );
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("password-toggle-field-states"),
    "states-light.png",
  );
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("password-toggle-field-appearance"),
    "appearance.png",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("password-toggle-field-stress"),
    "stress-mobile.png",
  );
});
