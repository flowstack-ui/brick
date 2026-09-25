import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

test.beforeEach(async ({ page }) => { await page.goto("/radio-group"); });

test("focused docs expose source-paired examples and multipart navigation", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Usage", exact: true })).toBeVisible();
  await expect(page.locator("#props-item-root")).toBeAttached();
  await expect(page.locator("#props-input")).toBeAttached();
  await page.locator("#open").getByRole("tab", { name: "Code", exact: true }).click();
  await expect(page.locator("#open").getByRole("tabpanel")).toContainText("RadioGroup.ItemHiddenInput");
});

test("native parts isolate link activation and own keyboard selection", async ({ page }) => {
  const section = page.locator("#open");
  const group = section.getByRole("radiogroup", { name: "Delivery", exact: true });
  const standard = group.getByRole("radio", { name: "Standard delivery", exact: true });
  const express = group.getByRole("radio", { name: /Express delivery/ });
  await expect(standard).toHaveAccessibleDescription("Arrives in three to five business days.");
  await page.context().route("https://example.com/shipping", route => route.fulfill({ body: "Shipping terms" }));
  const popupPromise = page.waitForEvent("popup");
  await group.getByRole("link").click();
  const popup = await popupPromise;
  await popup.close();
  await expect(standard).toBeChecked();
  await expect(express).not.toBeChecked();
  await standard.focus();
  await page.keyboard.press("ArrowDown");
  await expect(express).toBeFocused();
  await expect(express).toBeChecked();
  await expect(group.locator('input[type="radio"][tabindex="0"]')).toHaveCount(1);
  await page.keyboard.press("ArrowLeft");
  await expect(express).toBeChecked();
  await page.keyboard.press("Home");
  await expect(standard).toBeChecked();
});

test("native form validation, submit and reset work; Hook Form connects errors", async ({ page }) => {
  const form = page.locator("#native-form");
  await form.getByRole("button", { name: "Save", exact: true }).click();
  await expect(form.getByRole("radio", { name: "Email", exact: true })).toBeFocused();
  // Correct from the validation-focus target with the group's native keyboard
  // contract. Browser-owned validation bubbles can intercept pointer actions.
  await page.keyboard.press("ArrowDown");
  await expect(form.getByRole("radio", { name: "Text message", exact: true })).toBeChecked();
  await expect.poll(() => form.locator('input[type="checkbox"]').evaluate((input: HTMLInputElement) => input.validity.valid)).toBe(true);
  await form.getByRole("button", { name: "Save", exact: true }).click();
  await expect(form.locator("output")).toHaveText("Saved: sms");
  await form.getByRole("button", { name: "Reset", exact: true }).click();
  await expect(form.getByRole("radio", { name: "Text message", exact: true })).not.toBeChecked();
  await form.getByRole("radio", { name: "Email", exact: true }).click();
  await expect(form.getByRole("radio", { name: "Email", exact: true })).toBeChecked();
  const hook = page.locator("#hook-form");
  await hook.getByRole("button", { name: "Save", exact: true }).click();
  await expect(hook.getByText("Choose a contact method.", { exact: true })).toBeVisible();
  await hook.getByRole("radio", { name: "Email", exact: true }).click();
  await hook.getByRole("button", { name: "Save", exact: true }).click();
  await expect(hook.getByRole("button", { name: "Saved", exact: true })).toBeVisible();
});

test("sizes, variants and sparse responsive resets have correct geometry", async ({ page }) => {
  const sizes = page.locator("#sizes .brick-radio-group-control[data-state='checked']");
  expect(await sizes.evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().width))).toEqual([12,16,20,24]);
  const responsive = page.locator("#responsive .brick-radio-group-control[data-state='checked']");
  await page.setViewportSize({ width: 1000, height: 900 });
  await expect.poll(() => responsive.evaluate(node => node.getBoundingClientRect().width)).toBe(24);
  await expect.poll(() => responsive.evaluate(node => getComputedStyle(node).backgroundColor)).toBe("rgba(0, 0, 0, 0)");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect.poll(() => responsive.evaluate(node => node.getBoundingClientRect().width)).toBe(16);
  expect(await responsive.evaluate(node => getComputedStyle(node).backgroundColor)).not.toBe("rgba(0, 0, 0, 0)");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("controller, native ref and custom indicators work without duplicate marks", async ({ page }) => {
  const controller = page.locator("#controller");
  await controller.getByRole("button", { name: "Choose text message" }).click();
  await expect(controller.getByRole("radio", { name: "Text message", exact: true })).toBeChecked();
  await controller.getByRole("button", { name: "Reset", exact: true }).click();
  await expect(controller.getByRole("radio", { name: "Email", exact: true })).toBeChecked();
  await page.locator("#responsive").getByRole("button", { name: "Focus email" }).click();
  await expect(page.locator("#responsive input[type=radio]")).toBeFocused();
  await expect(page.locator("#indicator .brick-radiomark")).toHaveCount(2);
  await expect(page.locator("#indicator .brick-radiomark__dot")).toHaveCount(0);
});

test("docs have no automatically detectable accessibility violations", async ({ page }) => {
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("selection motion preserves geometry and honors reduced motion", async ({ page }) => {
  const group = page.getByRole("radiogroup", { name: "Notifications", exact: true }).first();
  const option = group.getByRole("radio", { name: "Text message", exact: true });
  const mark = option.locator(".brick-radio-group-control");
  const dot = mark.locator(".brick-radiomark__dot");
  await option.scrollIntoViewIfNeeded();
  const before = await mark.boundingBox();
  await option.click();
  await expect(option).toBeChecked();
  await expect.poll(() => dot.evaluate(node => getComputedStyle(node).opacity)).toBe("1");
  expect(await mark.boundingBox()).toEqual(before);
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const part of [mark, dot]) {
    await expect.poll(() => part.evaluate(node => getComputedStyle(node).transitionDuration)).toBe("0s");
  }
});

test("custom artwork stays centered and density comparisons share a first baseline", async ({ page }) => {
  const mark = page.locator("#indicator .brick-radiomark").first();
  const artwork = mark.locator(".brick-radiomark__artwork");
  async function expectCentered() {
    const outer = await mark.boundingBox();
    const inner = await artwork.locator(":scope > *").boundingBox();
    expect(outer).not.toBeNull(); expect(inner).not.toBeNull();
    expect(Math.abs(inner!.x + inner!.width / 2 - outer!.x - outer!.width / 2)).toBeLessThan(1);
    expect(Math.abs(inner!.y + inner!.height / 2 - outer!.y - outer!.height / 2)).toBeLessThan(1);
    expect(inner!.height).toBeLessThan(outer!.height);
  }
  await expectCentered();
  // Exercise the original text-artwork regression as well as the public SVG example.
  await artwork.evaluate(node => { const text = node.ownerDocument.createElement("span"); text.textContent = "✓"; node.replaceChildren(text); });
  await expectCentered();
  const groups = page.locator("#density .brick-radio-group");
  const comfortable = await groups.nth(0).locator(".brick-radio-group-label").first().boundingBox();
  const compact = await groups.nth(1).locator(".brick-radio-group-label").first().boundingBox();
  expect(Math.abs(comfortable!.y - compact!.y)).toBeLessThan(1);
  for (const group of await groups.all()) {
    const marks = group.locator(".brick-radio-group-control");
    const first = await marks.first().boundingBox(), last = await marks.last().boundingBox();
    expect(Math.abs(first!.x - last!.x)).toBeLessThan(1);
  }
});
