import {
  expect,
  expectEvidenceScreenshot,
  installVisualDefaults,
  setAppearance,
  test,
  useForcedColors,
} from "../../visual-harness.js";

installVisualDefaults("/breadcrumb?qualification=1");

test("Breadcrumb defaults, recipes, content, composition, and appearance", async ({
  page,
}) => {
  await expect(page.getByTestId("breadcrumb-overview")).toHaveScreenshot(
    "overview-light.png",
  );
  await expect(page.getByTestId("breadcrumb-variants")).toHaveScreenshot(
    "variants-light.png",
  );
  await expect(page.getByTestId("breadcrumb-sizes")).toHaveScreenshot(
    "sizes-light.png",
  );
  await expect(page.getByTestId("breadcrumb-content")).toHaveScreenshot(
    "content-light.png",
  );
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("breadcrumb-composition"),
    "composition-light.png",
  );
  await setAppearance(page, "dark");
  await expect(page.getByTestId("breadcrumb-appearance")).toHaveScreenshot(
    "appearance-dark.png",
  );
});

test("Breadcrumb collapse, responsive RTL, and forced colors", async ({
  page,
}) => {
  await expect(page.getByTestId("breadcrumb-collapse")).toHaveScreenshot(
    "collapse-light.png",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("breadcrumb-stress")).toHaveScreenshot(
    "stress-mobile.png",
  );
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.getByTestId("breadcrumb-variants")).toHaveScreenshot(
    "variants-forced-colors.png",
  );
});

test("Breadcrumb menu and linked-current documentation specimens", async ({
  page,
}) => {
  await page.goto("/breadcrumb?testMode=1");
  await expect(page.locator("#icons .brick-breadcrumb")).toHaveScreenshot(
    "docs-icons.png",
  );
  await expect(page.locator("#current .brick-breadcrumb")).toHaveScreenshot(
    "docs-current.png",
  );
  await page
    .locator("#menu")
    .getByRole("button", { name: "Components", exact: true })
    .click();
  await expect(
    page.getByRole("menu", { name: "Components", exact: true }),
  ).toHaveScreenshot("ancestor-menu.png", { maxDiffPixels: 0, maxDiffPixelRatio: 0 });
});
