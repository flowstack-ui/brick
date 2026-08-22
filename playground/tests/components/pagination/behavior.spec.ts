import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
test.beforeEach(async ({ page }) => { await page.goto("/pagination"); await expect(page.getByRole("navigation", { name: "Release result pages" }).first()).toBeVisible(); });
test("Pagination recipes, generated items, and native activation render", async ({ page }) => { const root = page.locator("#scenario-pagination-overview .brick-pagination"); await expect(root).toHaveAttribute("data-size", "md"); await expect(root).toHaveAttribute("data-variant", "plain"); await expect(root.getByRole("button", { name: "Page 6, current page" })).toHaveAttribute("aria-current", "page"); await root.getByRole("button", { name: "Next page" }).click(); await expect(root.getByRole("button", { name: "Page 7, current page" })).toBeVisible(); });
test("Pagination localizes labels and keeps direct controls in Tab order", async ({ page }) => { const localized = page.getByRole("navigation", { name: "Páginas de resultados" }); await expect(localized.getByRole("button", { name: "Página 2, actual" })).toBeVisible(); await expect(localized.getByRole("button", { name: "Página siguiente" })).toBeVisible(); await localized.getByRole("button", { name: "Página anterior" }).focus(); await page.keyboard.press("Tab"); await expect(localized.getByRole("button", { name: "Ir a la página 1" })).toBeFocused(); });
test("Pagination contains narrow overflow, mirrors RTL artwork, and passes axe", async ({ page }) => { await page.setViewportSize({ width: 390, height: 844 }); const list = page.locator(".pagination-narrow .brick-pagination__list"); expect(await list.evaluate(node => node.scrollWidth > node.clientWidth)).toBe(true); const rtlIcon = page.getByRole("navigation", { name: "صفحات النتائج" }).getByRole("button", { name: "الصفحة السابقة" }).locator(".brick-icon"); await expect(rtlIcon).toHaveCSS("transform", "matrix(-1, 0, 0, 1, 0, 0)"); expect((await new AxeBuilder({ page }).include("#scenario-pagination-stress").analyze()).violations).toEqual([]); });
test("Pagination URL mode renders native destinations and restores route state", async ({ page }) => {
  await page.goto("/pagination?page=2#scenario-pagination-urls");
  const root = page.getByRole("navigation", { name: "Incident result pages" });
  const current = root.getByRole("link", { name: "Page 2, current page" });
  await expect(current).toHaveAttribute("href", "/pagination?page=2#scenario-pagination-urls");
  const accentHover = await current.evaluate(() => {
    const probe = document.createElement("span");
    probe.style.backgroundColor = "var(--brick-color-accent-solid-hover)";
    document.body.append(probe);
    const value = getComputedStyle(probe).backgroundColor;
    probe.remove();
    return value;
  });
  await current.hover();
  await expect(current).toHaveCSS("background-color", accentHover);
  await expect(current).toHaveCSS("border-color", accentHover);
  await root.getByRole("link", { name: "Go to page 3" }).click();
  await expect(page).toHaveURL(/\/pagination\?page=3#scenario-pagination-urls$/);
  await expect(page.getByRole("navigation", { name: "Incident result pages" }).getByRole("link", { name: "Page 3, current page" })).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/\/pagination\?page=2#scenario-pagination-urls$/);
  await expect(page.getByRole("navigation", { name: "Incident result pages" }).getByRole("link", { name: "Page 2, current page" })).toBeVisible();
});
