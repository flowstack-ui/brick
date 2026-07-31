import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/navigation-menu"); });

test("defaults, links, disclosure, sizes, orientation, state, and composition work", async ({ page }) => {
  const root = page.getByTestId("navigation-menu-overview").getByRole("navigation", { name: "Primary navigation" });
  await expect(root).toHaveAttribute("data-size", "md");
  await expect(root.getByRole("button", { name: "Products" })).toHaveCSS("min-height", "44px");
  await expect(root.getByRole("button", { name: "Products" })).toHaveAttribute("aria-expanded", "true");
  await expect(root.getByRole("link", { name: "Pricing" })).toHaveAttribute("data-active", "");
  for (const [index, size] of ["sm", "md", "lg"].entries()) {
    const sizedRoot = page.getByTestId("navigation-menu-size").locator(`.brick-navigation-menu[data-size='${size}']`);
    await expect(sizedRoot).toHaveCount(1);
    await expect(sizedRoot.getByRole("button").first()).toHaveCSS("min-height", ["32px", "44px", "48px"][index]);
  }
  const direct = page.getByRole("navigation", { name: "Direct destinations" });
  await expect(direct.getByRole("link", { name: "Overview" })).toHaveAttribute("href", "/overview");
  const disabled = page.getByRole("navigation", { name: "Unavailable destination" }).getByRole("button", { name: "Products" });
  await expect(disabled).toBeDisabled();
  await expect(page.locator("[data-router-link='docs']")).toHaveAttribute("aria-current", "page");
});

test("keyboard, mobile replacement, RTL, and accessibility work", async ({ page }) => {
  const links = page.getByRole("navigation", { name: "Direct destinations" });
  const overview = links.getByRole("link", { name: "Overview" }); await overview.focus(); await overview.press("ArrowRight");
  await expect(links.getByRole("link", { name: "Pricing" })).toBeFocused();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByRole("button", { name: "Open mobile navigation" })).toBeVisible();
  const rtl = page.getByRole("navigation", { name: "التنقل الرئيسي" });
  const products = rtl.getByRole("button", { name: "المنتجات" }); await products.focus(); await products.press("ArrowLeft");
  await expect(rtl.getByRole("link", { name: "الأسعار" })).toBeFocused();
  expect((await new AxeBuilder({ page }).include('[data-testid="navigation-menu-overview"]').analyze()).violations).toEqual([]);
});
