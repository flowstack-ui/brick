import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/dropdown-menu"); });

test("defaults, size, selection, state, submenu, and composition remain complete", async ({ page }) => {
  await page.getByTestId("dropdown-menu-overview").getByRole("button", { name: "Project actions" }).click();
  const menu = page.getByRole("menu", { name: "Project actions" }).first();
  await expect(menu).toHaveAttribute("data-size", "md");
  await expect(menu.getByRole("menuitem")).toHaveCount(2);
  await page.keyboard.press("Escape");
  const sizeTriggers = page.getByTestId("dropdown-menu-density").getByRole("button");
  for (const [index, size] of ["sm", "md", "lg"].entries()) {
    const trigger = sizeTriggers.nth(index); await trigger.click();
    await expect(page.locator(`#${await trigger.getAttribute("aria-controls")}`)).toHaveAttribute("data-size", size);
    await page.keyboard.press("Escape");
  }
  await page.getByRole("button", { name: "View options" }).click();
  await expect(page.getByRole("menuitemcheckbox", { name: "Inherited permissions" })).toHaveAttribute("aria-checked", "mixed");
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Command states" }).click();
  await expect(page.getByRole("menuitem", { name: "Locked command" })).toHaveAttribute("aria-disabled", "true");
  await expect(page.getByRole("menuitem", { name: "Delete project" })).toHaveAttribute("data-tone", "danger");
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Move project" }).click();
  const subTrigger = page.getByRole("menuitem", { name: "Another workspace" });
  await subTrigger.focus(); await subTrigger.press("ArrowRight");
  await expect(page.locator(".brick-dropdown-menu__sub-content[data-state='open']")).toBeVisible();
  await expect(page.locator("[data-adapter='project-actions']")).toHaveAttribute("aria-haspopup", "menu");
});

test("keyboard, RTL, mobile geometry, and accessibility work", async ({ page }) => {
  const trigger = page.getByTestId("dropdown-menu-overview").getByRole("button", { name: "Project actions" });
  await trigger.focus(); await trigger.press("Enter");
  await expect(page.getByRole("menu", { name: "Project actions" }).getByRole("menuitem").first()).toBeFocused();
  await page.keyboard.press("Escape"); await expect(trigger).toBeFocused();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "إجراءات المشروع" }).click();
  const rtl = page.getByRole("menu", { name: "إجراءات المشروع" });
  const box = await rtl.boundingBox(); expect(box!.x).toBeGreaterThanOrEqual(0); expect(box!.x + box!.width).toBeLessThanOrEqual(390);
  await page.keyboard.press("Escape");
  expect((await new AxeBuilder({ page }).include('[data-testid="dropdown-menu-overview"]').analyze()).violations).toEqual([]);
});

test("portalled menus use the playground layer below sticky review chrome", async ({ page }) => {
  const trigger = page
    .getByTestId("dropdown-menu-overview")
    .getByRole("button", { name: "Project actions" });
  await trigger.click();
  const menu = page.getByRole("menu", { name: "Project actions" }).first();
  const header = page.locator(".evidence-review-header");

  const [menuZIndex, headerZIndex] = await Promise.all([
    menu.evaluate((element) => Number(getComputedStyle(element).zIndex)),
    header.evaluate((element) => Number(getComputedStyle(element).zIndex)),
  ]);
  expect(menuZIndex).toBeLessThan(headerZIndex);
});
