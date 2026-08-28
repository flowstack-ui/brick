import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/color-picker"); });

test("edits one normalized value through text, native input, and named presets", async ({ page }) => {
  const overview = page.getByTestId("color-picker-overview");
  const input = overview.getByRole("textbox", { exact: true, name: "Brand color" });
  const nativeInput = overview.getByLabel("Brand color native chooser");
  await input.fill("#E5484D");
  await expect(input).toHaveValue("#e5484d");
  await expect(nativeInput).toHaveValue("#e5484d");

  await input.fill("invalid");
  await input.blur();
  await expect(input).toHaveValue("#e5484d");

  await overview.getByRole("button", { name: "Choose brand color preset" }).click();
  const content = page.getByRole("dialog", { name: "Brand color presets" });
  await expect(content).toBeVisible();
  await content.getByRole("button", { name: "Use Grass" }).click();
  await expect(input).toHaveValue("#30a46c");

  await nativeInput.evaluate((element) => {
    const inputElement = element as HTMLInputElement;
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
    setter?.call(inputElement, "#0090ff");
    inputElement.dispatchEvent(new InputEvent("input", { bubbles: true }));
  });
  await expect(input).toHaveValue("#0090ff");
});

test("submits and resets exactly one hidden color value", async ({ page }) => {
  const form = page.getByRole("form", { name: "Brand color form" });
  await form.getByRole("button", { name: "Select Coral" }).click();
  await form.getByRole("button", { name: "Save color" }).click();
  await expect(page.getByTestId("color-picker-form-status")).toHaveText("Submitted #e5484d.");
  expect(await form.locator("input[name='brandColor']").count()).toBe(1);
  await form.getByRole("button", { name: "Reset" }).click();
  await expect(form.getByRole("textbox", { name: "Submitted brand color" })).toHaveValue("#5b5bd6");
});

test("restores trigger focus, keeps read-only inspectable, and blocks mutation", async ({ page }) => {
  const overviewTrigger = page.getByRole("button", { name: "Choose brand color preset" });
  await overviewTrigger.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog", { name: "Brand color presets" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(overviewTrigger).toBeFocused();

  const readOnlyInput = page.getByRole("textbox", { exact: true, name: "Read-only color" });
  const readOnlyRoot = readOnlyInput.locator("xpath=ancestor::*[@data-slot='color-picker']");
  await readOnlyRoot.getByRole("button", { name: "Choose read-only color preset" }).click();
  const readOnlyDialog = page.getByRole("dialog", { name: "Read-only color presets" });
  await expect(readOnlyDialog).toBeVisible();
  const readOnlyPreset = readOnlyDialog.getByRole("button", { name: "Use Coral" });
  await expect(readOnlyPreset).toHaveAttribute("aria-disabled", "true");
  await readOnlyPreset.evaluate((element) => (element as HTMLButtonElement).click());
  await expect(readOnlyInput).toHaveValue("#5b5bd6");

  await expect(page.getByRole("textbox", { exact: true, name: "Disabled color" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Choose disabled color preset" })).toBeDisabled();
});

test("keeps the narrow RTL page contained and passes focused axe", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  const rtlPicker = page.getByRole("textbox", { name: "لون العلامة التجارية للمؤسسة الدولية" });
  await rtlPicker.locator("xpath=ancestor::*[@data-slot='color-picker']").getByRole("button", { name: /Choose/ }).click();
  await expect(page.getByRole("dialog", { name: /presets/ })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  const results = await new AxeBuilder({ page }).disableRules(["region"]).analyze();
  expect(results.violations).toEqual([]);
});
