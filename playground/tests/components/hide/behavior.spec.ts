import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
test.beforeEach(async ({ page }) => { await page.goto("/hide"); });
test("Hide uses exact md boundary, stays mounted, and stays layout-transparent", async ({ page }) => {
  const root = page.getByTestId("hide-primary");
  await page.setViewportSize({ width: 767, height: 800 }); await expect(root).toHaveCSS("display", "contents"); await expect(root).toBeAttached();
  const displays = page.getByTestId("hide-display").locator(".brick-hide");
  for (const item of await displays.all()) await expect(item).toHaveCSS("display", "contents");
  await page.setViewportSize({ width: 768, height: 800 }); await expect(root).toHaveCSS("display", "none");
});
test("Hide and Show are complementary and hidden controls leave the tree", async ({ page }) => {
  await page.setViewportSize({ width: 767, height: 800 });
  await expect(page.getByTestId("hide-pair").locator(".brick-hide")).toBeVisible(); await expect(page.getByTestId("hide-pair").locator(".brick-show")).toBeHidden();
  await page.getByRole("button", { name: "Increment retained state" }).click(); await expect(page.getByText("Retained count: 1")).toBeVisible();
  await page.setViewportSize({ width: 768, height: 800 }); await expect(page.getByTestId("hide-mounted").locator(".brick-hide")).toBeHidden(); await expect(page.getByRole("button", { name: "Increment retained state" })).toHaveCount(0); await expect(page.getByText("Retained count: 1")).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
