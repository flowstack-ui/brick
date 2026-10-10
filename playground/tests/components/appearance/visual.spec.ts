import {
  expectEvidenceScreenshot,
  installVisualDefaults,
  test,
} from "../../visual-harness.js";
import { expect } from "../../evidence-test.js";

installVisualDefaults("/appearance?qualification=1");

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
  // The mobile Drawer is viewport-sized: do not enlarge its viewport to take
  // a screenshot, which would change the layout being qualified.
  await expect(page.getByTestId("appearance-drawer-content")).toHaveScreenshot("portal-mobile.png");
});

test("Appearance native and Brick foreground examples", async ({ page }) => {
  await page.setViewportSize({ width: 1365, height: 950 });
  await page.goto("/appearance#native");
  await expect(page.locator("#native")).toHaveScreenshot("native-content.png");
});
