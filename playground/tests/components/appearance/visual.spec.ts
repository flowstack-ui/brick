import {
  expectEvidenceScreenshot,
  installVisualDefaults,
  test,
} from "../../visual-harness.js";

installVisualDefaults("/appearance");

test("Appearance overview and nested re-entry", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 900 });
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("appearance-overview"),
    "overview-light.png",
  );
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("appearance-nesting"),
    "nesting-light.png",
  );
});

test("Appearance portal at compact width", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open dark portal" }).click();
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("appearance-drawer-content"),
    "portal-mobile.png",
  );
});
