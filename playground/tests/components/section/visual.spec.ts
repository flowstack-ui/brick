import {
  expectEvidenceScreenshot,
  installVisualDefaults,
  setAppearance,
  test,
} from "../../visual-harness.js";

installVisualDefaults("/section");

test("Section scale and composition", async ({ page }) => {
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("section-scale"),
    "scale-light.png",
  );
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("section-composition"),
    "composition-dark.png",
  );
});

test("Section responsive and logical stress", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("section-responsive"),
    "responsive-mobile.png",
  );
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("section-stress"),
    "stress-mobile.png",
  );
});
