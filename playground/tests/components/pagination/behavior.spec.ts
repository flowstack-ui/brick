import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";
test.beforeEach(async ({ page }) => { await page.goto("/pagination?qualification=1"); await expect(page.getByRole("navigation", { name: "Release result pages" }).first()).toBeVisible(); });
test("Pagination recipes, generated items, and native activation render", async ({ page }) => { const root = page.locator("#scenario-pagination-overview .brick-pagination"); await expect(root.getByRole("button", { name: "Previous page" })).toHaveAttribute("data-size", "md"); await expect(root.getByRole("button", { name: "Previous page" })).toHaveAttribute("data-variant", "outline"); const boundaryBorder = await root.getByRole("button", { name: "Previous page" }).evaluate((element) => getComputedStyle(element).borderTopColor); expect(boundaryBorder).not.toBe("rgba(0, 0, 0, 0)"); await expect(root.getByRole("button", { name: "Page 6, current page" })).toHaveAttribute("aria-current", "page"); await root.getByRole("button", { name: "Next page" }).click(); await expect(root.getByRole("button", { name: "Page 7, current page" })).toBeVisible(); });
test("Pagination localizes labels and keeps direct controls in Tab order", async ({ page }) => { const localized = page.getByRole("navigation", { name: "Páginas de resultados" }); await expect(localized.getByRole("button", { name: "Página 2, actual" })).toBeVisible(); await expect(localized.getByRole("button", { name: "Página siguiente" })).toBeVisible(); await localized.getByRole("button", { name: "Página anterior" }).focus(); await page.keyboard.press("Tab"); await expect(localized.getByRole("button", { name: "Ir a la página 1" })).toBeFocused(); });
test("Pagination contains narrow overflow, mirrors RTL artwork, and passes axe", async ({ page }) => { await page.setViewportSize({ width: 390, height: 844 }); const list = page.locator(".pagination-narrow .brick-pagination__list"); expect(await list.evaluate(node => node.scrollWidth > node.clientWidth)).toBe(true); const rtlIcon = page.getByRole("navigation", { name: "صفحات النتائج" }).getByRole("button", { name: "الصفحة السابقة" }).locator(".brick-pagination__icon"); await expect(rtlIcon).toHaveCSS("transform", "matrix(-1, 0, 0, 1, 0, 0)"); expect((await new AxeBuilder({ page }).include("#scenario-pagination-stress").analyze()).violations).toEqual([]); });
test("Pagination URL mode renders native destinations and restores route state", async ({ page }) => {
  await page.goto("/pagination?qualification=1&page=2#scenario-pagination-urls");
  const root = page.getByRole("navigation", { name: "Incident result pages" });
  const current = root.getByRole("link", { name: "Page 2, current page" });
  await expect(current).toHaveAttribute("href", "/pagination?qualification=1&page=2#scenario-pagination-urls");
  await expect(current).toHaveAttribute("data-variant", "outline");
  await current.hover();
  await expect(current).toHaveAttribute("aria-current", "page");
  await root.getByRole("link", { name: "Go to page 3" }).click();
  await expect(page).toHaveURL(url => url.searchParams.get("page") === "3" && url.hash === "#scenario-pagination-urls");
  await expect(page.getByRole("navigation", { name: "Incident result pages" }).getByRole("link", { name: "Page 3, current page" })).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(url => url.searchParams.get("page") === "2" && url.hash === "#scenario-pagination-urls");
  await expect(page.getByRole("navigation", { name: "Incident result pages" }).getByRole("link", { name: "Page 2, current page" })).toBeVisible();
});

test("Pagination documentation examples preserve shared geometry and attached hosts", async ({ page }) => {
  await page.goto("/pagination");
  const basic = page.getByRole("navigation", { name: "Basic result pages" });
  await expect(basic.getByRole("button", { name: "Page 1, current page" })).toBeVisible();
  await expect(basic.getByRole("button", { name: "Next page" })).toHaveCSS("height", "40px");
  const attached = page.locator("#attached").getByRole("navigation");
  await expect(attached.locator("li")).toHaveCount(0);
  await expect(attached.locator("button button")).toHaveCount(0);
  const controls = attached.getByRole("button");
  const rects = await controls.evaluateAll(nodes => nodes.map(node => { const r = node.getBoundingClientRect(); return { x:r.x, right:r.right, height:r.height }; }));
  expect(rects.length).toBeGreaterThan(3);
  for (let i=1; i<rects.length; i++) expect(Math.abs(rects[i].x-rects[i-1].right)).toBeLessThanOrEqual(1.1);
  const select = page.getByRole("combobox", { name: "Rows per page" });
  await select.selectOption("25");
  await expect(select).toHaveValue("25");
  const custom = page.getByRole("navigation", { name: "Customization result pages" });
  await expect(custom.getByRole("button", { name: "Previous page" })).toHaveCSS("height", "36px");
  await expect(custom.getByRole("button", { name: "Page 500, current page" })).toHaveCSS("height", "36px");
  expect((await new AxeBuilder({page}).include("main").analyze()).violations).toEqual([]);
});

test("Pagination preserves current-page contrast with forced colors and reduced motion", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Forced-color emulation is qualified in Chromium.");
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  await page.goto("/pagination");
  const root = page.getByRole("navigation", { name: "Basic result pages" });
  const current = root.getByRole("button", { name: "Page 1, current page" });
  const next = root.getByRole("button", { name: "Go to page 2" });
  await expect(current).toHaveCSS("transition-duration", "0s");
  const currentBg = await current.evaluate(node => getComputedStyle(node).backgroundColor);
  const nextBg = await next.evaluate(node => getComputedStyle(node).backgroundColor);
  expect(currentBg).not.toBe(nextBg);
  await next.click();
  await expect(root.getByRole("button", { name: "Page 2, current page" })).toHaveAttribute("aria-current", "page");
});
