import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/context-menu"); });

test("pointer, keyboard, sizes, states, submenu, and composition work", async ({ page }) => {
  const target = page.getByRole("article", { name: "Quarterly report" });
  await target.click({ button: "right" });
  const menu = page.getByRole("menu", { name: "Quarterly report actions" });
  await expect(menu).toHaveAttribute("data-size", "md");
  await page.keyboard.press("Escape"); await target.focus(); await target.press("Shift+F10");
  await expect(menu).toBeVisible(); await page.keyboard.press("Escape");
  const sizeTargets = page.getByTestId("context-menu-density").getByRole("article");
  for (const [index, size] of ["sm", "md", "lg"].entries()) {
    const sizedTarget = sizeTargets.nth(index); await sizedTarget.click({ button: "right" });
    await expect(page.locator("[role='menu'][data-state='open']")).toHaveAttribute("data-size", size);
    await page.keyboard.press("Escape");
  }
  const archived = page.getByRole("article", { name: "Archived report" }); await archived.click({ button: "right" });
  await expect(page.getByRole("menuitem", { name: "Sharing unavailable" })).toHaveAttribute("aria-disabled", "true");
  await expect(page.getByRole("menuitem", { name: "Delete permanently" })).toHaveAttribute("data-tone", "danger");
  await page.keyboard.press("Escape");
  await expect(page.locator("[data-adapter='report-target']")).toHaveAttribute("data-slot", "context-menu-trigger");
});

test("RTL, mobile collision, visible alternative, and accessibility work", async ({ page }) => {
  await expect(page.getByRole("button", { name: "Open report" })).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  const rtlTarget = page.getByRole("article", { name: "تقرير المشروع" }); await rtlTarget.click({ button: "right" });
  const rtl = page.getByRole("menu", { name: "إجراءات التقرير" });
  const box = await rtl.boundingBox(); expect(box!.x).toBeGreaterThanOrEqual(0); expect(box!.x + box!.width).toBeLessThanOrEqual(390);
  await page.keyboard.press("Escape");
  expect((await new AxeBuilder({ page }).include('[data-testid="context-menu-overview"]').analyze()).violations).toEqual([]);
});
