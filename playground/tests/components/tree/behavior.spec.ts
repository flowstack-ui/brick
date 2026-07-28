import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/tree"); await expect(page.locator("#scenario-tree-overview .brick-tree")).toBeVisible(); });

test("defaults, anatomy, focus entry, and bounded navigation are deterministic", async ({ page }) => {
  const root = page.locator("#scenario-tree-overview .brick-tree");
  await expect(root).toHaveAttribute("role", "tree");
  await expect(root).toHaveAttribute("aria-orientation", "vertical");
  await expect(root).toHaveAttribute("data-variant", "outline");
  await expect(root).toHaveAttribute("data-size", "md");
  await root.focus();
  const selectedId = await root.getByRole("treeitem", { name: "components" }).getAttribute("id");
  await expect(root).toHaveAttribute("aria-activedescendant", selectedId ?? "");
  await page.keyboard.press("End");
  const end = await root.getAttribute("aria-activedescendant");
  await page.keyboard.press("ArrowDown");
  await expect(root).toHaveAttribute("aria-activedescendant", end ?? "");
});

test("selection, expansion, disabled state, and hierarchy remain Atom-owned", async ({ page }) => {
  const root = page.locator("#scenario-tree-selection .brick-tree");
  const item = root.getByRole("treeitem", { name: "index.ts" });
  await item.click();
  await expect(item).toHaveAttribute("aria-selected", "true");
  const branch = root.getByRole("treeitem", { name: /components/ });
  await expect(branch).toHaveAttribute("aria-expanded", "true");
  await expect(root.getByRole("treeitem", { name: "tree.css" })).toHaveAttribute("aria-disabled", "true");
  await branch.locator(":scope > .brick-tree__item-content").click();
  await expect(branch).toHaveAttribute("aria-expanded", "false");
});

test("appearance, logical RTL, containment, and accessibility are stable", async ({ page }) => {
  await expect(page.locator("#scenario-tree-appearance [data-playground-specimen-label]")).toHaveText(["light", "dark", "customized"]);
  const rtl = page.locator("#scenario-tree-stress [dir=rtl] .brick-tree");
  await expect(rtl).toHaveAttribute("dir", "rtl");
  const ltrContent = page.locator("#scenario-tree-stress .tree-cell").first().locator('[data-level="2"] > .brick-tree__item-content').first();
  const rtlContent = rtl.locator('[data-level="2"] > .brick-tree__item-content').first();
  expect(await ltrContent.evaluate(node => getComputedStyle(node).marginInlineStart)).not.toBe("0px");
  expect(await rtlContent.evaluate(node => getComputedStyle(node).marginInlineStart)).not.toBe("0px");
  await page.setViewportSize({ width: 390, height: 844 });
  const constrained = page.locator(".tree-constrained");
  expect(await constrained.evaluate(node => node.scrollWidth <= node.clientWidth)).toBe(true);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
