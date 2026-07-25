import {
  expect,
  expectEvidenceScreenshot,
  installVisualDefaults,
  setAppearance,
  test,
} from "../../visual-harness.js";

installVisualDefaults("/container");

test("Container defaults, measures, gutters, and composition", async ({ page }) => {
  await expect(page.getByTestId("container-default")).toHaveScreenshot(
    "overview-light.png",
  );
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.addStyleTag({
    content:
      ".evidence-main-column,[data-playground-content]{--brick-container-max-inline-size:none!important}",
  });
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("container-measures"),
    "measures-light.png",
  );
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("container-gutters"),
    "gutters-light.png",
  );
});

test("Container customization and narrow logical behavior", async ({ page }) => {
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("container-customization"),
    "customization-dark.png",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(
    page,
    page.locator(".container-stage"),
    "overview-mobile.png",
  );
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("container-stress"),
    "stress-mobile.png",
  );
});
