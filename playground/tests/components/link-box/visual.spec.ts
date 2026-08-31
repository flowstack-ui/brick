import {
  expect,
  installVisualDefaults,
  test,
  useForcedColors,
} from "../../visual-harness.js";

installVisualDefaults("/link-box");

test("Link Box destination and independent action", async ({ page }) => {
  await expect(page.getByTestId("link-box-destination")).toHaveScreenshot(
    "destination-light.png",
  );
  await expect(page.getByTestId("link-box-action")).toHaveScreenshot(
    "action-light.png",
  );
  await expect(page.getByTestId("link-box-overlay")).toHaveScreenshot(
    "overlay-light.png",
  );
});

test("Link Box dark, RTL, narrow, and forced-color boundaries", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("link-box-dark")).toHaveScreenshot(
    "dark-mobile.png",
  );
  await expect(page.getByTestId("link-box-rtl")).toHaveScreenshot(
    "rtl-mobile.png",
  );
  await useForcedColors(page);
  await page.getByTestId("link-box-overlay").getByRole("link").focus();
  await expect(page.getByTestId("link-box-overlay")).toHaveScreenshot(
    "overlay-forced-colors.png",
  );
});
