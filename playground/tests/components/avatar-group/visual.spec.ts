import {
  expect,
  installVisualDefaults,
  setAppearance,
  test,
  useForcedColors,
} from "../../visual-harness.js";

installVisualDefaults("/avatar-group?qualification=1");

test("AvatarGroup recipes and overflow", async ({ page }) => {
  await page.setViewportSize({ width: 1120, height: 5000 });
  await page.goto("/avatar-group?qualification=1");
  await page.locator(".evidence-review-header").evaluate((element) => {
    (element as HTMLElement).style.setProperty("display", "none", "important");
  });
  await expect(page.getByTestId("avatar-group-overview")).toHaveScreenshot(
    "overview-light.png",
  );
  await expect(page.getByTestId("avatar-group-recipes")).toHaveScreenshot(
    "recipes-light.png",
  );
  await page.getByTestId("avatar-group-stacking").evaluate((element) => {
    (element as HTMLElement).style.paddingBlockStart = "3rem";
  });
  await expect(page.getByTestId("avatar-group-stacking")).toHaveScreenshot(
    "stacking-light.png",
  );
  await expect(page.getByTestId("avatar-group-overflow")).toHaveScreenshot(
    "overflow-light.png",
  );
  await setAppearance(page, "dark");
  await expect(page.getByTestId("avatar-group-overview")).toHaveScreenshot(
    "overview-dark.png",
  );
});

test("AvatarGroup constrained, RTL, and forced-color evidence", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("avatar-group-stress")).toHaveScreenshot(
    "stress-mobile.png",
  );
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.getByTestId("avatar-group-overflow")).toHaveScreenshot(
    "overflow-forced-colors.png",
  );
});

test("compact separation edges at fractional scale", async ({ page }) => {
  await page.setViewportSize({ width: 1120, height: 1200 });
  const groups = page
    .getByTestId("avatar-group-stacking")
    .locator(".brick-avatar-group");
  for (const appearance of ["light", "dark"] as const) {
    await setAppearance(page, appearance);
    for (const [index, name] of [
      [6, "singleton"],
      [7, "overflow-only"],
      [8, "peers"],
    ] as const) {
      const group = groups.nth(index);
      await group.evaluate((element) => {
        (element as HTMLElement).style.zoom = "4.125";
      });
      await expect(group).toHaveScreenshot(
        `separation-${name}-${appearance}.png`,
        { maxDiffPixelRatio: 0.001 },
      );
    }
  }
});
