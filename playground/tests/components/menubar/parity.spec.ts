import { expect, test } from "../../evidence-test.js";

test.beforeEach(async ({ page }) => { await page.goto("/menubar"); });

test("strip density is independent from popup density", async ({ page }) => {
  const bar = page.locator("#rail").getByRole("menubar", { name: "surface commands" });
  const trigger = bar.getByRole("menuitem", { name: "File", exact: true });
  await expect(trigger).toHaveCSS("min-height", "44px");
  await trigger.click();
  const popup = page.getByRole("menu").last();
  await expect(popup).toHaveAttribute("data-size", "sm");
  await expect(popup.getByRole("menuitem").first()).toHaveCSS("min-height", "24px");
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

test("vertical plain triggers preserve roving semantics and keyboard focus", async ({ page }) => {
  const bar = page.locator("#orientation").getByRole("menubar");
  await expect(bar).toHaveAttribute("aria-orientation", "vertical");
  const file = bar.getByRole("menuitem", { name: "File", exact: true });
  await file.focus();
  await file.press("ArrowDown");
  await expect(bar.getByRole("menuitem", { name: "Edit", exact: true })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("menu").last()).toBeVisible();
});
