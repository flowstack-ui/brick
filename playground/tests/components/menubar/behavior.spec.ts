import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/menubar"); });

test("defaults, adjacent navigation, orientation, sizes, states, and composition work", async ({ page }) => {
  const root = page.getByTestId("menubar-overview").getByRole("menubar", { name: "Editor commands" });
  await expect(root).toHaveAttribute("data-size", "md");
  await expect(root.getByRole("menuitem", { name: "File" })).toHaveCSS("min-height", "44px");
  await expect(root.getByRole("menuitem", { name: "File" })).toHaveAttribute("aria-expanded", "true");
  await root.getByRole("menuitem", { name: "File" }).focus(); await root.getByRole("menuitem", { name: "File" }).press("ArrowRight");
  await expect(root.getByRole("menuitem", { name: "Edit" })).toHaveAttribute("aria-expanded", "true");
  for (const [index, size] of ["sm", "md", "lg"].entries()) {
    const sizedRoot = page.getByTestId("menubar-density").locator(`.brick-menubar[data-size='${size}']`);
    await expect(sizedRoot).toHaveCount(1);
    await expect(sizedRoot.getByRole("menuitem").first()).toHaveCSS("min-height", ["32px", "44px", "48px"][index]);
  }
  await expect(page.getByRole("menu").first().getByRole("menuitem").first()).toHaveCSS("min-height", "44px");
  const vertical = page.getByTestId("menubar-orientation").getByRole("menubar", { name: "Editor commands" }).nth(1);
  await vertical.getByRole("menuitem", { name: "File" }).focus(); await vertical.getByRole("menuitem", { name: "File" }).press("ArrowDown");
  await expect(vertical.getByRole("menuitem", { name: "Edit" })).toBeFocused();
  await expect(page.getByRole("menubar", { name: "Unavailable editor commands" }).getByRole("menuitem", { name: "File" })).toHaveAttribute("aria-disabled", "true");
  await expect(page.locator("[data-adapter='editor-menubar']")).toHaveAttribute("role", "menubar");
});

test("RTL, narrow overflow, and accessibility work", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const rtl = page.getByRole("menubar", { name: "أوامر المحرر" });
  const file = rtl.getByRole("menuitem", { name: "ملف" }); await file.focus(); await file.press("ArrowLeft");
  await expect(rtl.getByRole("menuitem", { name: "تحرير" })).toBeFocused();
  await file.click();
  await expect(page.getByRole("menu", { name: "ملف" })).toHaveCSS("direction", "rtl");
  await page.keyboard.press("Escape");

  await page.addStyleTag({
    content: `
      .brick-menubar__content { width: 18.75rem; }
      .brick-menubar__sub-content { width: 13.75rem; }
    `,
  });
  const insert = page.getByRole("menubar", { name: "Insert commands" });
  await insert.getByRole("menuitem", { name: "Insert" }).click();
  await page.getByRole("menuitem", { name: "Media" }).click();
  const subMenu = page.locator(".brick-menubar__sub-content[data-state='open']");
  const subMenuBox = await subMenu.boundingBox();
  expect(subMenuBox).not.toBeNull();
  expect(subMenuBox!.x).toBeGreaterThanOrEqual(0);
  expect(subMenuBox!.x + subMenuBox!.width).toBeLessThanOrEqual(390);
  expect((await new AxeBuilder({ page }).include('[data-testid="menubar-overview"]').analyze()).violations).toEqual([]);
});
