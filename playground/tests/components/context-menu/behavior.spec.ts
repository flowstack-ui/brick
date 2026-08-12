import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/context-menu"); });

test("pointer, keyboard, sizes, states, submenu, and composition work", async ({ page }) => {
  const target = page.getByRole("article", { name: "Quarterly report" });
  await target.click({ button: "right" });
  const menu = page.getByRole("menu", { name: "Quarterly report actions" });
  await expect(menu).toHaveAttribute("data-size", "md");
  await expect(menu.getByRole("menuitem").first()).toHaveCSS("min-height", "44px");
  await page.keyboard.press("Escape"); await target.focus(); await target.press("Shift+F10");
  await expect(menu).toBeVisible(); await page.keyboard.press("Escape");
  const sizeTargets = page.getByTestId("context-menu-density").getByRole("article");
  for (const [index, size] of ["sm", "md", "lg"].entries()) {
    const sizedTarget = sizeTargets.nth(index); await sizedTarget.click({ button: "right" });
    const sizedMenu = page.locator("[role='menu'][data-state='open']");
    await expect(sizedMenu).toHaveAttribute("data-size", size);
    await expect(sizedMenu.getByRole("menuitem").first()).toHaveCSS("min-height", ["32px", "44px", "48px"][index]);
    await page.keyboard.press("Escape");
  }
  const archived = page.getByRole("article", { name: "Archived report" }); await archived.click({ button: "right" });
  await expect(page.getByRole("menuitem", { name: "Sharing unavailable" })).toHaveAttribute("aria-disabled", "true");
  await expect(page.getByRole("menuitem", { name: "Delete permanently" })).toHaveAttribute("data-tone", "danger");
  await page.keyboard.press("Escape");
  await expect(page.locator("[data-adapter='report-target']")).toHaveAttribute("data-slot", "context-menu-trigger");
});

test("repeated invocation, target transfer, and menu-tree dismissal work", async ({ page }) => {
  const firstTarget = page.getByRole("article", { name: "Design proposal" });
  const secondTarget = page.getByRole("article", { name: "Mobile prototype" });
  await firstTarget.scrollIntoViewIfNeeded();
  const firstTargetBox = await firstTarget.boundingBox();
  expect(firstTargetBox).not.toBeNull();

  await page.evaluate(() => {
    (window as Window & { contextMenuDefaults?: boolean[] }).contextMenuDefaults = [];
    document.addEventListener("contextmenu", (event) => {
      (window as Window & { contextMenuDefaults?: boolean[] }).contextMenuDefaults?.push(
        event.defaultPrevented,
      );
    });
  });

  const firstPosition = { x: 24, y: firstTargetBox!.height / 2 };
  await firstTarget.click({ button: "right", position: firstPosition });
  const firstMenu = page.getByRole("menu", { name: "Design proposal actions" });
  await expect(firstMenu).toBeVisible();
  const firstMenuBox = await firstMenu.boundingBox();

  const repeatedTargetBox = await firstTarget.boundingBox();
  expect(repeatedTargetBox).not.toBeNull();
  await page.mouse.click(
    repeatedTargetBox!.x + repeatedTargetBox!.width - 24,
    repeatedTargetBox!.y + repeatedTargetBox!.height / 2,
    { button: "right" },
  );
  await expect(firstMenu).toBeVisible();
  const repeatedMenuBox = await firstMenu.boundingBox();
  expect(firstMenuBox).not.toBeNull();
  expect(repeatedMenuBox).not.toBeNull();
  expect(Math.abs(repeatedMenuBox!.x - firstMenuBox!.x)).toBeGreaterThan(20);

  const secondTargetBox = await secondTarget.boundingBox();
  expect(secondTargetBox).not.toBeNull();
  const secondTargetPoints = [
    { x: secondTargetBox!.x + 12, y: secondTargetBox!.y + 12 },
    { x: secondTargetBox!.x + secondTargetBox!.width - 12, y: secondTargetBox!.y + 12 },
    { x: secondTargetBox!.x + 12, y: secondTargetBox!.y + secondTargetBox!.height - 12 },
    {
      x: secondTargetBox!.x + secondTargetBox!.width - 12,
      y: secondTargetBox!.y + secondTargetBox!.height - 12,
    },
  ];
  const transferPoint = secondTargetPoints.find(({ x, y }) => (
    x < repeatedMenuBox!.x
    || x > repeatedMenuBox!.x + repeatedMenuBox!.width
    || y < repeatedMenuBox!.y
    || y > repeatedMenuBox!.y + repeatedMenuBox!.height
  ));
  expect(transferPoint).toBeDefined();
  await page.mouse.click(transferPoint!.x, transferPoint!.y, { button: "right" });
  await expect(firstMenu).toBeHidden();
  await expect(page.getByRole("menu", { name: "Mobile prototype actions" })).toBeVisible();
  expect(await page.evaluate(() => (
    (window as Window & { contextMenuDefaults?: boolean[] }).contextMenuDefaults
  ))).not.toContain(false);

  await page.keyboard.press("Escape");
  const submenuTarget = page.getByRole("article", { name: "Release notes" });
  await submenuTarget.click({ button: "right" });
  const parentMenu = page.getByRole("menu", { name: "Release note actions" });
  const subTrigger = parentMenu.getByRole("menuitem", { name: "Move to folder" });
  await subTrigger.focus();
  await subTrigger.press("ArrowRight");
  const submenu = page.locator(".brick-context-menu__sub-content[data-state='open']");
  await expect(submenu).toBeVisible();

  await page.mouse.click(8, 8);
  await expect(submenu).toBeHidden();
  await expect(parentMenu).toBeHidden();
});

test("RTL, mobile collision, visible alternative, and accessibility work", async ({ page }) => {
  await expect(page.getByRole("button", { name: "Open report" })).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  const rtlTarget = page.getByRole("article", { name: "تقرير المشروع" }); await rtlTarget.click({ button: "right" });
  const rtl = page.getByRole("menu", { name: "إجراءات التقرير" });
  const box = await rtl.boundingBox(); expect(box!.x).toBeGreaterThanOrEqual(0); expect(box!.x + box!.width).toBeLessThanOrEqual(390);
  await expect(rtl).toHaveCSS("direction", "rtl");
  const rtlSubTrigger = rtl.getByRole("menuitem", { name: "نقل إلى مجلد" });
  await rtlSubTrigger.focus();
  await rtlSubTrigger.press("ArrowLeft");
  const rtlSubMenu = page.locator(".brick-context-menu__sub-content[data-state='open']");
  await expect(rtlSubMenu).toHaveCSS("direction", "rtl");
  const subMenuBox = await rtlSubMenu.boundingBox();
  expect(subMenuBox).not.toBeNull();
  expect(subMenuBox!.x).toBeGreaterThanOrEqual(0);
  expect(subMenuBox!.x + subMenuBox!.width).toBeLessThanOrEqual(390);
  await page.keyboard.press("Escape");
  expect((await new AxeBuilder({ page }).include('[data-testid="context-menu-overview"]').analyze()).violations).toEqual([]);
});
