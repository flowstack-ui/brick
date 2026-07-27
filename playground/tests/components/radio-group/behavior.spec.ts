import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator } from "@playwright/test";

async function controlSize(radio: Locator) {
  return radio.locator(".brick-radio-group-control").evaluate((control) => {
    const rect = control.getBoundingClientRect();
    return { height: rect.height, width: rect.width };
  });
}

test.beforeEach(async ({ page }) => { await page.goto("/radio-group"); });

test("defaults and sizes preserve one selected medium vertical recipe", async ({ page }) => {
  const overview = page.getByTestId("radio-group-overview").getByRole("radiogroup");
  await expect(overview).toHaveAttribute("data-size", "md");
  await expect(overview).toHaveAttribute("data-orientation", "vertical");
  await expect(overview.getByRole("radio", { name: "Email reports" })).toBeChecked();
  await overview.getByRole("radio", { name: "Push notifications" }).click();
  await expect(overview.getByRole("radio", { name: "Push notifications" })).toBeChecked();

  const widths: number[] = [];
  for (const size of ["sm", "md", "lg"]) {
    const group = page.getByTestId("radio-group-sizes").getByRole("radiogroup", { name: `${size} delivery channel`, exact: true });
    await expect(group).toHaveAttribute("data-orientation", "vertical");
    const selected = group.getByRole("radio", { name: "Email reports" });
    await expect(selected).toBeChecked();
    widths.push((await controlSize(selected)).width);
  }
  expect(widths[0]).toBeLessThan(widths[1]);
  expect(widths[1]).toBeLessThan(widths[2]);
});

test("orientation, keyboard, disabled skipping, and ownership remain complete", async ({ page }) => {
  const horizontal = page.getByRole("radiogroup", { name: "Horizontal delivery channel" });
  const email = horizontal.getByRole("radio", { name: "Email reports" });
  const push = horizontal.getByRole("radio", { name: "Push notifications" });
  await email.focus();
  await page.keyboard.press("ArrowRight");
  await expect(push).toBeFocused();
  await expect(push).toBeChecked();
  await page.keyboard.press("End");
  await expect(horizontal.getByRole("radio", { name: "Text messages" })).toBeChecked();

  const disabled = page.getByRole("radiogroup", { name: "Limited delivery channel" });
  await expect(disabled.getByRole("radio", { name: "Push notifications" })).toBeDisabled();
  const controlled = page.getByRole("radiogroup", { name: "Controlled delivery channel", exact: true });
  await controlled.getByRole("radio", { name: "Text messages" }).click();
  await expect(page.getByTestId("radio-group-ownership").locator(".forms-cell").nth(1).locator("output")).toHaveText("Selected: sms");
});

test("read-only selection focuses and submits without mutating", async ({ page }) => {
  const group = page.getByRole("radiogroup", { name: "Read-only delivery channel" });
  await expect(group).toHaveAttribute("aria-readonly", "true");
  const email = group.getByRole("radio", { name: "Email reports" });
  const push = group.getByRole("radio", { name: "Push notifications" });
  await push.click();
  await expect(email).toBeChecked();
  await email.focus();
  await page.keyboard.press("ArrowDown");
  await expect(push).toBeFocused();
  await expect(email).toBeChecked();
  expect(await group.evaluate((node) => new FormData((node.querySelector("input") as HTMLInputElement).form ?? document.createElement("form")).get("locked-channel"))).toBeNull();
  await expect(group.locator('input[name="locked-channel"][value="email"]')).toBeChecked();
});

test("validation, native form data, reset, and external ownership work", async ({ page }) => {
  const nativeForm = page.getByRole("form", { name: "Radio native validation" });
  await nativeForm.getByRole("button", { name: "Validate choice" }).click();
  await expect(nativeForm.getByRole("radio", { name: "Email reports" })).toBeFocused();

  const form = page.getByRole("form", { name: "Delivery preferences" });
  await form.getByRole("radio", { name: "Text messages" }).click();
  await form.getByRole("button", { name: "Save preference" }).click();
  await expect(form.locator("output")).toHaveText("Submitted: sms");
  const external = page.getByRole("radiogroup", { name: "Externally owned channel" });
  expect(await form.evaluate((element) => ({ delivery: new FormData(element as HTMLFormElement).get("delivery"), external: new FormData(element as HTMLFormElement).get("external-channel") }))).toEqual({ delivery: "sms", external: "push" });
  await form.getByRole("button", { name: "Reset" }).click();
  await expect(form.getByRole("radio", { name: "Email reports" })).toBeChecked();
  await expect(external.getByRole("radio", { name: "Push notifications" })).toBeChecked();
});

test("composition, appearance, customization, responsive, and RTL evidence remain honest", async ({ page }) => {
  for (const adapter of ["rendered", "composed"]) {
    const group = page.locator(`[data-adapter="${adapter}-group"]`);
    await expect(group).toHaveJSProperty("tagName", "DIV");
    await expect(group).toHaveAttribute("role", "radiogroup");
    await expect(group.getByRole("radio", { name: "Email reports" })).toBeChecked();
    await expect(group.locator(".brick-radio-group-control")).toHaveCount(2);
  }
  const appearances = page.getByTestId("radio-group-appearance").getByRole("radiogroup");
  await expect(appearances).toHaveCount(2);
  const customized = page.getByRole("radiogroup", { name: "Customized delivery channel" });
  expect((await controlSize(customized.getByRole("radio", { name: "Email reports" }))).width).toBeCloseTo(22, 1);

  await page.setViewportSize({ width: 390, height: 844 });
  const stress = page.getByTestId("radio-group-stress");
  expect((await stress.boundingBox())!.width).toBeLessThanOrEqual(390);
  const rtl = page.getByRole("radiogroup", { name: "طرق الإشعار" });
  const first = rtl.getByRole("radio").first();
  await first.focus();
  await page.keyboard.press("ArrowLeft");
  await expect(rtl.getByRole("radio").nth(1)).toBeChecked();
});

test("RadioGroup page has no automatically detectable accessibility violations", async ({ page }) => {
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
