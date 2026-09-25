import { test, expect } from "@playwright/test";

test("reopening interrupts an exit without leaving content hidden", async ({ page }) => {
  await page.goto("/tooltip");
  const toggle = page.locator("#store").getByRole("button", { name: "Toggle store" });
  await toggle.click();
  const hint = page.getByRole("tooltip");
  await expect(hint).toBeVisible();
  await hint.evaluate(element => { element.style.transitionDuration = "2s"; });
  await toggle.click();
  await toggle.click();
  await expect(hint).toBeVisible();
  await expect(hint).toHaveAttribute("data-state", "open");
  await expect(hint).not.toHaveAttribute("aria-hidden", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await hint.evaluate(element => element.style.removeProperty("transition-duration"));
  await page.keyboard.press("Escape");
  await expect(hint).toBeHidden();
});

test("iframe portal, custom boundary, composed ref and exit remain owner-document scoped", async ({ page }) => {
  await page.goto("/tooltip?qualification=environment");
  const frame = page.frameLocator('iframe[title="Tooltip owner document"]');
  const trigger = frame.getByRole("button", { name: "Frame hint" });
  await trigger.focus();
  const hint = frame.getByRole("tooltip");
  await expect(hint).toBeVisible();
  await expect(hint).toHaveAttribute("data-positioned", "");
  await expect(frame.getByTestId("content-ref")).toHaveText("DIV");
  await expect(page.getByRole("tooltip")).toHaveCount(0);
  const geometry = await hint.evaluate(el => ({right:el.getBoundingClientRect().right,top:el.getBoundingClientRect().top}));
  expect(geometry.right).toBeLessThanOrEqual(248);
  expect(geometry.top).toBeGreaterThanOrEqual(0);
  await page.evaluate(() => document.dispatchEvent(new KeyboardEvent("keydown", { key:"Escape",bubbles:true })));
  await expect(hint).toBeVisible();
  const before = Number(await frame.getByTestId("exits").textContent());
  await trigger.press("Escape");
  await expect(hint).toBeHidden();
  await expect(frame.getByTestId("exits")).toHaveText(String(before+1));
  await expect(trigger).toBeFocused();
  await expect(frame.locator('[role="tooltip"]')).toHaveAttribute("hidden", "");
});
