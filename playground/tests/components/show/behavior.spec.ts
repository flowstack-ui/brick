import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
test.beforeEach(async ({ page }) => { await page.goto("/show"); });
test("Show uses exact md boundary, stays mounted, and stays layout-transparent", async ({ page }) => {
  const root = page.getByTestId("show-primary");
  await page.setViewportSize({ width: 767, height: 800 }); await expect(root).toHaveCSS("display", "none"); await expect(root).toBeAttached();
  await page.setViewportSize({ width: 768, height: 800 }); await expect(root).toHaveCSS("display", "contents");
  const displays = page.getByTestId("show-display").locator(".brick-show");
  for (const item of await displays.all()) await expect(item).toHaveCSS("display", "contents");
});
test("Show and Hide are complementary and state survives responsive hiding", async ({ page }) => {
  await page.setViewportSize({ width: 767, height: 800 });
  await expect(page.getByTestId("show-pair").locator(".brick-show")).toBeHidden(); await expect(page.getByTestId("show-pair").locator(".brick-hide")).toBeVisible();
  await page.setViewportSize({ width: 768, height: 800 });
  await expect(page.getByTestId("show-pair").locator(".brick-show")).toBeVisible(); await expect(page.getByTestId("show-pair").locator(".brick-hide")).toBeHidden();
  await page.getByRole("button", { name: "Increment retained state" }).click(); await expect(page.getByText("Retained count: 1")).toBeVisible();
  await page.setViewportSize({ width: 600, height: 800 }); await expect(page.getByTestId("show-mounted").locator(".brick-show")).toBeHidden(); await expect(page.getByText("Retained count: 1")).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
