import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/tree-grid"); await expect(page.locator("#scenario-tree-grid-overview .brick-tree-grid")).toBeVisible(); });

test("defaults, hierarchy, and anatomy are deterministic", async ({ page }) => {
  const root = page.locator("#scenario-tree-grid-overview .brick-tree-grid");
  await expect(root).toHaveAttribute("role", "treegrid");
  await expect(root).toHaveAttribute("data-variant", "outline");
  await expect(root).toHaveAttribute("data-size", "md");
  await expect(root).toHaveAttribute("data-density", "comfortable");
  await expect(root).toHaveAttribute("aria-colcount", "3");
  await expect(root.locator("caption")).toHaveCSS("caption-side", "bottom");
  await expect(root.locator("tbody tr").first()).toHaveAttribute("aria-level", "1");
  await expect(root.locator("tbody tr").first()).toHaveAttribute("aria-expanded", "true");
  await expect(root.locator("tbody tr").nth(2)).toHaveAttribute("aria-level", "3");
  await expect(root.locator("tbody tr").nth(2)).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("#scenario-tree-grid-anatomy [data-slot=tree-grid-indicator]").first()).toHaveAttribute("aria-hidden", "true");
});

test("navigation, expansion, selection, sorting, and collapse focus remain operable", async ({ page }) => {
  const hierarchy = page.locator("#scenario-tree-grid-hierarchy .brick-tree-grid").first();
  await hierarchy.focus();
  await page.keyboard.press("ArrowRight");
  await expect(hierarchy).toHaveAttribute("aria-activedescendant", /cell/);
  const controlled = page.locator("#scenario-tree-grid-controlled .brick-tree-grid");
  const sortable = controlled.locator("[data-actionable]");
  await expect(sortable).toHaveAttribute("aria-sort", "ascending");
  await sortable.click();
  await expect(sortable).toHaveAttribute("aria-sort", "descending");
  await controlled.press("Enter");
  await expect(sortable).toHaveAttribute("aria-sort", "ascending");
  const childHeader = controlled.getByRole("rowheader", { name: /TreeGrid\.tsx/ });
  await childHeader.click();
  const ancestorHeader = controlled.getByRole("rowheader", { name: /components/ });
  const ancestorId = await ancestorHeader.getAttribute("id");
  await page.getByRole("button", { name: "Toggle components branch" }).click();
  await expect(childHeader).toBeHidden();
  await expect(controlled).toHaveAttribute("aria-activedescendant", ancestorId ?? "");
  const readOnly = page.locator("#scenario-tree-grid-hierarchy .brick-tree-grid").nth(1);
  await expect(readOnly).toHaveAttribute("aria-readonly", "true");
});

test("outline clipping, responsive overflow, RTL, preferences, and accessibility hold", async ({ page }) => {
  await expect(page.locator("#scenario-tree-grid-appearance [data-playground-specimen-label]")).toHaveText(["light", "dark", "customized"]);
  await expect(page.locator("#scenario-tree-grid-appearance h3")).toHaveText("Tree Grid CSS properties");
  const custom = page.locator("#scenario-tree-grid-appearance .tree-grid-customization .brick-tree-grid");
  await expect(custom).toHaveCSS("overflow", "clip");
  await expect(custom).toHaveCSS("border-top-left-radius", "16px");
  const selectedFooter = custom.locator("tfoot");
  const customBox = await custom.boundingBox();
  const footerBox = await selectedFooter.boundingBox();
  expect(customBox && footerBox && footerBox.y + footerBox.height <= customBox.y + customBox.height + 1).toBe(true);
  await page.setViewportSize({ width: 390, height: 844 });
  const container = page.locator("#scenario-tree-grid-stress .brick-tree-grid-container").first();
  expect(await container.evaluate(node => node.scrollWidth > node.clientWidth)).toBe(true);
  const containment = await container.evaluate(node => {
    const boundary = node.getBoundingClientRect();
    const parentBoundary = node.parentElement?.getBoundingClientRect();
    return {
      insideParent: parentBoundary
        ? boundary.left >= parentBoundary.left - 1
          && boundary.right <= parentBoundary.right + 1
        : false,
      insideViewport: boundary.left >= -1
        && boundary.right <= document.documentElement.clientWidth + 1,
    };
  });
  expect(containment).toEqual({ insideParent: true, insideViewport: true });
  const rtl = page.locator("#scenario-tree-grid-stress [dir=rtl] .brick-tree-grid");
  await expect(rtl).toHaveAttribute("dir", "rtl");
  await expect(rtl.locator("caption")).toHaveText("ملفات الإصدار");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
