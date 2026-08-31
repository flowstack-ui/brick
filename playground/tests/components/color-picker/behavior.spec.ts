import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/color-picker"); });

test("popup text, presets, and alpha controls keep one value synchronized", async ({ page }) => {
  const overview = page.getByTestId("color-picker-overview");
  const input = overview.locator("[data-slot='color-picker-control'] [data-slot='color-picker-input']");
  await overview.locator("[data-slot='color-picker-trigger']").click();
  const editor = overview.locator("[data-slot='color-picker-content']");
  await expect(editor).toBeVisible();

  await editor.getByRole("button", { name: "Use Grass" }).click();
  await expect(input).toHaveValue("#30A46C");
  await expect(editor.getByRole("button", { name: "Use Grass" })).toHaveAttribute("data-state", "checked");
  await expect(editor.getByRole("button", { name: "Use Grass" }).locator("[data-slot='color-picker-swatch-indicator']")).toBeVisible();

  const alpha = editor.getByLabel("Opacity channel");
  await alpha.fill("0.5");
  await alpha.blur();
  await expect(alpha).toHaveValue("0.5");
  await expect(input).toHaveValue("#30A46C");
});

test("format views expose the correct channels without changing the represented color", async ({ page }) => {
  const scenario = page.locator('[data-scenario="color-picker.formats"]');
  const picker = scenario.getByText("Channel color").locator("xpath=ancestor::*[@data-slot='color-picker']");
  const select = picker.getByLabel("Channel format");
  await expect(picker.getByLabel("red")).toBeVisible();
  await select.selectOption("hsla");
  await expect(picker.getByLabel("lightness")).toBeVisible();
  await expect(picker.getByLabel("red")).toBeHidden();
  await select.selectOption("hsba");
  await expect(picker.getByLabel("brightness")).toBeVisible();
  await expect(picker.locator("[data-slot='color-picker-value-text']")).toContainText(/hsba|hsb|rgba|#/i);
});

test("native chooser, form submission, reset, and state guards remain Atom-owned", async ({ page }) => {
  const nativeInput = page.getByLabel("Open native color chooser").first();
  await nativeInput.evaluate((element) => {
    const input = element as HTMLInputElement;
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
    setter?.call(input, "#e5484d");
    input.dispatchEvent(new InputEvent("input", { bubbles: true }));
  });
  await expect(nativeInput).toHaveValue("#e5484d");

  const form = page.getByRole("form", { name: "Brand color form" });
  await form.getByRole("button", { name: "Select Sky" }).click();
  await form.getByRole("button", { name: "Save color" }).click();
  await expect(page.getByTestId("color-picker-form-status")).toContainText("0, 144, 255");
  await expect(form.locator("[data-slot='color-picker-hidden-input']")).toHaveCount(1);
  await form.getByRole("button", { name: "Reset" }).click();
  await expect(form.locator("[data-slot='color-picker-input']")).toHaveValue("#5B5BD6");

  const disabledRoot = page.locator("[data-slot='color-picker']").filter({ hasText: "Disabled color" }).first();
  await expect(disabledRoot.locator("[data-slot='color-picker-control'] [data-slot='color-picker-input']")).toBeDisabled();
  await expect(disabledRoot.locator("[data-slot='color-picker-trigger']")).toBeDisabled();
  const readOnlyRoot = page.locator("[data-slot='color-picker']").filter({ hasText: "Read-only color" }).first();
  await readOnlyRoot.locator("[data-slot='color-picker-trigger']").click();
  await expect(readOnlyRoot.locator("[data-slot='color-picker-content']")).toBeHidden();
  await expect(readOnlyRoot.locator("[data-slot='color-picker-input']").first()).toHaveAttribute("readonly", "");
});

test("popup restores focus and the complete narrow RTL page stays accessible", async ({ page }) => {
  const overview = page.getByTestId("color-picker-overview");
  const trigger = overview.locator("[data-slot='color-picker-trigger']");
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(overview.locator("[data-slot='color-picker-content']")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();

  await page.setViewportSize({ width: 320, height: 720 });
  const rtlPicker = page.locator("[dir='rtl'] [data-slot='color-picker-input']").last();
  await rtlPicker.scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  const results = await new AxeBuilder({ page }).disableRules(["region"]).analyze();
  expect(results.violations).toEqual([]);
});
