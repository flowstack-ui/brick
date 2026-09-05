import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
test.beforeEach(async ({ page }) => page.goto("/number-input"));
test("Number Input exposes defaults, stepping, bounds, and Field relationships", async ({
  page,
}) => {
  const area = page.getByTestId("number-input-overview");
  const input = area.getByRole("spinbutton", { name: "Quantity" });
  const root = input.locator("..");
  await expect(root).toHaveAttribute("data-variant", "outline");
  await expect(root).toHaveAttribute("data-size", "lg");
  await expect(root).toHaveAttribute("data-shape", "rounded");
  await area.getByRole("button", { name: "Increase quantity" }).click();
  await expect(input).toHaveValue("4");
  await expect(input).toHaveAttribute(
    "id",
    "number-input-overview-field-control",
  );
});
test("Number Input keyboard, submission, and reset remain native", async ({
  page,
}) => {
  const stepping = page.getByTestId("number-input-stepping");
  const step = stepping.locator("#number-step-control");
  await step.focus();
  await page.keyboard.press("ArrowUp");
  await expect(step).toHaveValue("2.0");
  await expect(
    stepping.getByRole("button", { name: "Increase quantity" }).first(),
  ).toHaveAttribute("aria-disabled", "true");
  const form = page.getByRole("form", { name: "Quantity form" });
  const field = form.locator(".brick-field");
  const input = form.getByRole("spinbutton", { name: "Units" });
  await expect(form.locator("label")).toHaveCount(1);
  await expect(form.locator("legend")).toHaveCount(0);
  await input.fill("5");
  await form.getByRole("button", { name: "Save quantity" }).click();
  await expect(form.locator("output")).toContainText("Submitted: 5");
  await form.getByRole("button", { name: "Reset" }).click();
  await expect(input).toHaveValue("");
  await form.getByRole("button", { name: "Save quantity" }).click();
  await expect(input).toBeFocused();
  await expect(field).toHaveAttribute("data-invalid", "");
  await expect(form.getByText("Enter at least one unit.")).toBeVisible();
  await form.getByRole("button", { name: "Reset" }).click();
  await expect(field).not.toHaveAttribute("data-invalid");
  await expect(form.getByText("Enter at least one unit.")).toBeHidden();
  await expect(form.locator("output")).toContainText("Form reset");
});
test("hover steppers preserve geometry and reveal on hover or focus", async ({
  page,
}) => {
  const input = page.locator("#number-hover-step-control");
  const root = input.locator("..");
  const button = root.getByRole("button").first();
  const before = await root.boundingBox();
  await expect(button).toHaveCSS("opacity", "0");
  await root.hover();
  await expect(button).toHaveCSS("opacity", "1");
  const after = await root.boundingBox();
  expect(after?.width).toBe(before?.width);
  expect(after?.height).toBe(before?.height);
  await page.mouse.move(0, 0);
  await input.focus();
  await expect(button).toHaveCSS("opacity", "1");
});
test("stepper layout keeps separate square actions around a readable centered value", async ({
  page,
}) => {
  const input = page.locator("#number-square-step-control");
  const root = input.locator("..");
  const decrement = root.getByRole("button", { name: "Remove quantity" });
  const increment = root.getByRole("button", { name: "Add quantity" });
  await expect(root).toHaveAttribute("data-layout", "stepper");
  const [inputBox, decrementBox, incrementBox] = await Promise.all([
    input.boundingBox(),
    decrement.boundingBox(),
    increment.boundingBox(),
  ]);
  expect(inputBox && decrementBox && incrementBox).toBeTruthy();
  expect(decrementBox!.x + decrementBox!.width).toBeLessThanOrEqual(
    inputBox!.x,
  );
  expect(incrementBox!.x).toBeGreaterThanOrEqual(inputBox!.x + inputBox!.width);
  expect(
    Math.abs(decrementBox!.width - decrementBox!.height),
  ).toBeLessThanOrEqual(1);
  expect(
    Math.abs(incrementBox!.width - incrementBox!.height),
  ).toBeLessThanOrEqual(1);
  await expect(input).toHaveCSS("font-size", "18px");
  await expect(input).toHaveCSS("font-weight", "400");
  await expect(decrement.locator("path")).toHaveAttribute("d", "M3 8h10");
  await expect(increment.locator("path")).toHaveAttribute(
    "d",
    "M3 8h10M8 3v10",
  );
  await increment.click();
  await expect(input).toHaveValue("4");
});
test("Number Input recipes and RTL remain contained and accessible", async ({
  page,
}) => {
  await expect(
    page.getByTestId("number-input-variants").getByRole("spinbutton"),
  ).toHaveCount(3);
  const rtl = page
    .getByTestId("number-input-stress")
    .locator("[dir=rtl] .brick-number-input");
  const root = await rtl.boundingBox();
  const actions = await rtl.getByRole("button").first().boundingBox();
  expect(root && actions).toBeTruthy();
  expect(actions!.x).toBeLessThan(root!.x + root!.width / 2);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
test("Number Input step actions retain minimum coarse-pointer targets", async ({
  page,
}, testInfo) => {
  test.skip(
    !testInfo.project.name.startsWith("mobile-"),
    "requires a coarse-pointer profile",
  );
  for (const button of await page
    .getByTestId("number-input-sizes")
    .getByRole("button")
    .all()) {
    const box = await button.boundingBox();
    expect(box).toBeTruthy();
    expect(box!.height).toBeGreaterThanOrEqual(24);
  }
});
