import {
  expect,
  expectEvidenceScreenshot,
  installVisualDefaults,
  setAppearance,
  test,
  useForcedColors,
} from "../../visual-harness.js";

installVisualDefaults("/checkbox?qualification=1");

test("Checkbox linked labels retain first-line alignment and independent links", async ({ page }) => {
  const section = page.locator("#scenario-checkbox-linked-label");
  await expectEvidenceScreenshot(page, section, "compound-light.png");
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(page, section, "compound-dark.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await section.evaluate(el => el.setAttribute("dir", "rtl"));
  await section.locator("[data-example-canvas]").evaluateAll(elements => elements.forEach(el => el.setAttribute("dir", "rtl")));
  await expectEvidenceScreenshot(page, section, "compound-mobile-rtl.png");
});

test("Checkbox state and appearance", async ({ page }) => {
  await expect(page.getByTestId("checkbox-overview")).toHaveScreenshot(
    "overview-light.png",
  );
  await expect(page.getByTestId("checkbox-sizes")).toHaveScreenshot(
    "sizes-light.png",
  );
  await expect(page.getByTestId("checkbox-states")).toHaveScreenshot(
    "states-light.png",
  );
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("checkbox-composition"),
    "composition-output-light.png",
  );
  await setAppearance(page, "dark");
  await expect(page.getByTestId("checkbox-appearance")).toHaveScreenshot(
    "appearance-dark.png",
  );
});

test("Checkbox constrained and forced-color evidence", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("checkbox-stress")).toHaveScreenshot(
    "stress-mobile.png",
  );
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.getByTestId("checkbox-states")).toHaveScreenshot(
    "states-forced-colors.png",
  );
});
