import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("AlertDialog opens with alert semantics, safe focus, and focus restoration", async ({ page }) => {
  await page.goto("/alert-dialog");

  const trigger = page.getByRole("button", { name: "Delete project?" });
  await trigger.click();
  const dialog = page.getByRole("alertdialog", { name: "Delete project?" });
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAttribute("aria-modal", "true");
  await expect(dialog).toHaveAttribute("data-size", "md");
  await expect(dialog.locator("[data-slot='alert-dialog-header']")).toBeVisible();
  await expect(dialog.locator("[data-slot='alert-dialog-description']")).toContainText("cannot be undone");
  await expect(dialog.locator("[data-slot='alert-dialog-footer']")).toBeVisible();
  await expect(page.locator(".brick-alert-dialog-overlay")).toBeVisible();
  const cancel = page.getByRole("button", { name: "Keep project" });
  await expect(cancel).toBeFocused();

  await cancel.click();
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("AlertDialog reports Cancel and Action outcomes", async ({ page }) => {
  await page.goto("/alert-dialog");

  const trigger = page.getByRole("button", { name: "Open tracked decision" });
  await trigger.click();
  const cancel = page.getByRole("button", { name: "Cancel tracked decision" });
  const action = page.getByRole("button", { name: "Confirm tracked decision" });
  const cancelBox = await cancel.boundingBox();
  const actionBox = await action.boundingBox();
  // Browser text metrics can shift same-row controls by a fractional 1–3 px.
  // A 4 px bound still fails any real wrapped-row layout while avoiding false
  // failures from engine-specific glyph rasterization.
  expect(Math.abs(cancelBox!.y - actionBox!.y)).toBeLessThan(4);
  expect(Math.abs(cancelBox!.height - actionBox!.height)).toBeLessThan(1);
  await cancel.click();
  await expect(page.getByText("Closed: cancel")).toBeVisible();

  await trigger.click();
  await page.getByRole("button", { name: "Confirm tracked decision" }).click();
  await expect(page.getByText("Closed: action")).toBeVisible();
});

test("AlertDialog scrim never dismisses and Escape can be disabled", async ({ page }) => {
  await page.goto("/alert-dialog");
  const trigger = page.getByRole("button", { name: "Open Escape-disabled decision" });
  await trigger.click();
  const dialog = page.getByRole("alertdialog", { name: "Explicit response required" });
  const overlay = page.locator(".brick-alert-dialog-overlay").filter({ visible: true });

  await page.keyboard.press("Escape");
  await expect(dialog).toBeVisible();
  await overlay.click({ position: { x: 4, y: 4 } });
  await expect(dialog).toBeVisible();
  await page.getByRole("button", { name: "Close explicit decision" }).click();
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("disabled AlertDialog trigger cannot open through pointer or keyboard", async ({ page }) => {
  await page.goto("/alert-dialog");
  const trigger = page.getByRole("button", { name: "Unavailable decision" });

  await expect(trigger).toBeDisabled();
  await expect(trigger).toHaveAttribute("data-disabled", "");
  await expect(trigger).toHaveAttribute("tabindex", "-1");
  await trigger.click({ force: true });
  await page.keyboard.press("Enter");
  await page.keyboard.press("Space");
  await expect(page.getByRole("alertdialog")).toHaveCount(0);
});

test("preventing an AlertDialog Action keeps pending work open", async ({ page }) => {
  await page.goto("/alert-dialog");
  await page.getByRole("button", { name: "Open pending decision" }).click();
  const dialog = page.getByRole("alertdialog", { name: "Start asynchronous removal?" });
  await page.getByRole("button", { name: "Start pending action" }).click();

  await expect(dialog).toBeVisible();
  await expect(page.getByText("Pending action kept open")).toBeVisible();
  await page.getByRole("button", { name: "Cancel pending decision" }).click();
  await expect(dialog).toBeHidden();
});

test("nested AlertDialog returns focus and control to its parent Dialog", async ({ page }) => {
  await page.goto("/alert-dialog");
  const parentTrigger = page.getByRole("button", { name: "Edit draft project" });
  await parentTrigger.click();
  const parent = page.getByRole("dialog", { name: "Edit draft project" });
  const alertTrigger = page.getByRole("button", { name: "Discard draft" });
  await alertTrigger.click();
  const alert = page.getByRole("alertdialog", { name: "Discard draft?" });
  await expect(alert).toBeVisible();

  await page.getByRole("button", { name: "Keep editing draft" }).click();
  await expect(alert).toBeHidden();
  await expect(parent).toBeVisible();
  await expect(alertTrigger).toBeFocused();
  await page.getByRole("button", { name: "Finish editing" }).click();
  await expect(parent).toBeHidden();
  await expect(page.locator("#root")).not.toHaveAttribute("inert", "");
  await expect(parentTrigger).toBeFocused();
});

test("AlertDialog long-body and RTL mobile geometry remain bounded", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 640 });
  await page.goto("/alert-dialog");

  await page.getByRole("button", { name: "Open long decision" }).click();
  let dialog = page.getByRole("alertdialog", { name: "Open long decision" });
  const body = dialog.locator("[data-slot='alert-dialog-body']");
  const footer = dialog.locator("[data-slot='alert-dialog-footer']");
  await expect(footer).toBeVisible();
  expect(await body.evaluate((element) => element.scrollHeight > element.clientHeight)).toBe(true);
  let box = await dialog.boundingBox();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(390);
  expect(box!.y).toBeGreaterThanOrEqual(0);
  expect(box!.y + box!.height).toBeLessThanOrEqual(640);
  await page.getByRole("button", { name: "Keep project" }).click();

  await page.getByRole("button", { name: "حذف مشروع مساحة العمل بالتأكيد؟" }).click();
  dialog = page.getByRole("alertdialog", { name: "حذف مشروع مساحة العمل بالتأكيد؟" });
  await expect(dialog).toHaveAttribute("dir", "rtl");
  await expect(dialog.locator("[data-slot='alert-dialog-title']")).toHaveCSS("direction", "rtl");
  await expect(dialog.locator("[data-slot='alert-dialog-description']")).toHaveCSS("direction", "rtl");
  box = await dialog.boundingBox();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(390);
});

test("AlertDialog responses remain reachable under extreme reflow", async ({ page }) => {
  for (const viewport of [
    { width: 128, height: 422 },
    { width: 320, height: 200 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/alert-dialog");
    await page.getByRole("button", { name: "Open tracked decision" }).click();

    const dialog = page.getByRole("alertdialog", { name: "Remove tracked project?" });
    const action = page.getByRole("button", { name: "Confirm tracked decision" });
    await expect(dialog).toHaveCSS("overflow-y", "auto");
    await action.scrollIntoViewIfNeeded();

    const dialogBox = await dialog.boundingBox();
    const actionBox = await action.boundingBox();
    expect(actionBox!.y).toBeGreaterThanOrEqual(dialogBox!.y);
    expect(actionBox!.y + actionBox!.height).toBeLessThanOrEqual(
      dialogBox!.y + dialogBox!.height + 1,
    );
    await action.click();
    await expect(dialog).toBeHidden();
  }
});

test("AlertDialog canonical open state has no automated accessibility violations", async ({ page }) => {
  await page.goto("/alert-dialog");
  await page.getByRole("button", { name: "Delete project?" }).click();
  const dialog = page.getByRole("alertdialog", { name: "Delete project?" });
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveCSS("opacity", "1");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
