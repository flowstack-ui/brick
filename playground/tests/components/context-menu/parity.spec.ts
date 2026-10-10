import { expect, test } from "../../evidence-test.js";

test.beforeEach(async ({ page }) => { await page.goto("/context-menu"); });

test("basic commands also have a visible button alternative", async ({ page }) => {
  const trigger = page.getByRole("button", { name: "Actions", exact: true }).first();
  await trigger.click();
  const menu = page.getByRole("menu").last();
  await expect(menu.getByRole("menuitem", { name: "New file" })).toBeVisible();
  await expect(menu.getByRole("menuitem", { name: "Delete file" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

test("repeated contextual invocation tracks each target and returns focus", async ({ page }) => {
  for (const name of ["Draft", "Published"]) {
    const target = page.locator("#multiple").getByText(`${name}: right-click or Shift+F10`, { exact: true });
    await target.click({ button: "right" });
    await expect(page.locator("#multiple")).toContainText(`Last target: ${name}`);
    await expect(page.getByRole("menu").last()).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(target).toBeFocused();
    await target.press("Shift+F10");
    await expect(page.getByRole("menu").last().getByRole("menuitem").first()).toBeFocused();
    await page.keyboard.press("Escape");
  }
});

test("external point controller preserves visible trigger focus ownership", async ({ page }) => {
  const trigger = page.locator("#store").getByRole("button", { name: "Actions", exact: true });
  await trigger.click();
  const menu = page.getByRole("menu").last();
  await expect(menu).toBeVisible();
  const [anchor, popup] = await Promise.all([trigger.boundingBox(), menu.boundingBox()]);
  expect(anchor).not.toBeNull(); expect(popup).not.toBeNull();
  expect(Math.abs(anchor!.x - popup!.x)).toBeLessThanOrEqual(8);
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});
