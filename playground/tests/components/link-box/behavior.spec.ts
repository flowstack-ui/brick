import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/link-box"); });

test("the native Link owns the complete visual target and focus ring", async ({ page }) => {
  const root = page.getByTestId("link-box-destination");
  const link = root.getByRole("link", { name: "Stride Run 360" });
  await expect(root).not.toHaveAttribute("role");
  await expect(root).not.toHaveAttribute("tabindex");
  await expect(link).toHaveAttribute("href", "#link-box-product");

  await root.scrollIntoViewIfNeeded();
  const targetEvidence = await root.evaluate((element) => {
    const box = element.getBoundingClientRect();
    const point = {
      x: box.x + box.width / 2,
      y: box.y + box.height - 20,
    };
    return {
      ownsLink:
        document.elementFromPoint(point.x, point.y) ===
        element.querySelector(".brick-link-box__link"),
      point,
      position: {
        x: box.width / 2,
        y: box.height - 20,
      },
      viewport: {
        height: window.innerHeight,
        width: window.innerWidth,
      },
    };
  });
  expect(targetEvidence.point.x).toBeGreaterThanOrEqual(0);
  expect(targetEvidence.point.x).toBeLessThan(targetEvidence.viewport.width);
  expect(targetEvidence.point.y).toBeGreaterThanOrEqual(0);
  expect(targetEvidence.point.y).toBeLessThan(targetEvidence.viewport.height);
  expect(targetEvidence.ownsLink).toBe(true);

  await link.focus();
  await expect(link).toBeFocused();
  await expect(link).toHaveCSS("outline-style", "none");
  const focusOutline = await root.evaluate((element) =>
    getComputedStyle(element, "::before").outlineStyle,
  );
  expect(focusOutline).toBe("solid");

  await root.click({
    position: targetEvidence.position,
  });
  await expect(page).toHaveURL(/#link-box-product$/);
});

test("a secondary action remains independent from navigation", async ({ page }) => {
  const root = page.getByTestId("link-box-action");
  const link = root.getByRole("link", { name: "Stride Run 360" });
  const save = root.getByRole("button", { name: "Save Stride Run 360" });
  await expect(link.locator("button")).toHaveCount(0);
  await save.click();
  await expect(root.getByRole("button", { name: "Remove Stride Run 360 from saved products" })).toBeVisible();
  await expect(page).toHaveURL(/\/link-box$/);
});

test("the route remains contained and accessible", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  const results = await new AxeBuilder({ page })
    .include('[data-component-page="link-box"]')
    .analyze();
  expect(results.violations).toEqual([]);
});
