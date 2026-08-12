import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator } from "@playwright/test";

async function controlSize(checkbox: Locator) {
  return checkbox.locator(".brick-checkbox-control").evaluate((control) => {
    const rect = control.getBoundingClientRect();
    return { height: rect.height, width: rect.width };
  });
}

test.beforeEach(async ({ page }) => {
  await page.goto("/checkbox");
});

test("Checkbox overview preserves the default medium unchecked state", async ({ page }) => {
  const checkbox = page
    .getByTestId("checkbox-overview")
    .getByRole("checkbox", { name: "Ready to publish" });
  await expect(checkbox).toHaveAttribute("aria-checked", "false");
  await expect(checkbox).toHaveAttribute("data-size", "md");
  await expect(checkbox).toHaveAttribute("data-state", "unchecked");
  await expect(checkbox).not.toHaveAttribute("data-disabled");
  await checkbox.click();
  await expect(checkbox).toHaveAttribute("aria-checked", "true");
});

test("Checkbox keeps the row clickable while control feedback stays on the square", async ({ page }) => {
  const checkbox = page
    .getByTestId("checkbox-overview")
    .getByRole("checkbox", { name: "Ready to publish" });
  const control = checkbox.locator(".brick-checkbox-control");

  await checkbox.hover();
  await expect(checkbox).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await checkbox.focus();
  await expect(checkbox).toHaveCSS("outline-style", "none");
  await expect(control).toHaveCSS("outline-style", "solid");
  expect((await checkbox.boundingBox())!.height).toBeGreaterThanOrEqual(44);
});

test("Checkbox state and size comparisons change only their named dimension", async ({ page }) => {
  const states = page.getByTestId("checkbox-states").getByRole("checkbox");
  await expect(states).toHaveCount(3);
  const expectedStates = ["false", "true", "mixed"];
  for (let index = 0; index < expectedStates.length; index += 1) {
    await expect(states.nth(index)).toHaveAttribute(
      "aria-checked",
      expectedStates[index],
    );
    await expect(states.nth(index)).toHaveAttribute("data-size", "md");
    await expect(states.nth(index)).toHaveText("Preview");
  }

  const measurements: number[] = [];
  for (const size of ["sm", "md", "lg"]) {
    const checkbox = page
      .getByTestId("checkbox-sizes")
      .locator(`.brick-checkbox[data-size="${size}"]`);
    await expect(checkbox).toHaveAttribute("aria-checked", "false");
    await expect(checkbox).toHaveText("Preview");
    measurements.push((await controlSize(checkbox)).width);
  }
  expect(measurements[0]).toBeLessThan(measurements[1]);
  expect(measurements[1]).toBeLessThan(measurements[2]);
});

test("Checkbox ownership examples begin identically and retain their ownership behavior", async ({ page }) => {
  const ownership = page.getByTestId("checkbox-ownership");
  const checkboxes = ownership.getByRole("checkbox", { name: "Preview" });
  await expect(checkboxes).toHaveCount(3);
  for (const checkbox of await checkboxes.all()) {
    await expect(checkbox).toHaveAttribute("aria-checked", "true");
    await expect(checkbox).toHaveAttribute("data-size", "md");
  }

  await checkboxes.nth(0).click();
  await expect(checkboxes.nth(0)).toHaveAttribute("aria-checked", "false");
  await checkboxes.nth(1).click();
  await expect(checkboxes.nth(1)).toHaveAttribute("aria-checked", "false");
  await checkboxes.nth(2).click();
  await expect(checkboxes.nth(2)).toHaveAttribute("aria-checked", "true");
  await expect(checkboxes.nth(2)).toHaveAttribute("data-readonly", "");
});

test("Disabled Checkbox artwork preserves default medium geometry", async ({ page }) => {
  const disabled = page
    .getByTestId("checkbox-disabled-artwork")
    .getByRole("checkbox", { name: "Preview" });
  await expect(disabled).toHaveCount(3);
  const normal = page
    .getByTestId("checkbox-overview")
    .getByRole("checkbox", { name: "Ready to publish" });
  const normalControl = await controlSize(normal);
  const normalHeight = (await normal.boundingBox())!.height;

  for (const checkbox of await disabled.all()) {
    await expect(checkbox).toBeDisabled();
    await expect(checkbox).toHaveAttribute("data-size", "md");
    const disabledControl = await controlSize(checkbox);
    expect(disabledControl.width).toBeCloseTo(normalControl.width, 2);
    expect(disabledControl.height).toBeCloseTo(normalControl.height, 2);
    expect((await checkbox.boundingBox())!.height).toBeCloseTo(normalHeight, 2);
  }
  await expect(disabled.nth(0)).toHaveAttribute("aria-checked", "false");
  await expect(disabled.nth(1)).toHaveAttribute("aria-checked", "true");
  await expect(disabled.nth(2)).toHaveAttribute("aria-checked", "mixed");

  const validity = page
    .getByTestId("checkbox-validity")
    .getByRole("checkbox", { name: "Preview" });
  await expect(validity).toHaveCount(3);
  for (const checkbox of await validity.all()) {
    await expect(checkbox).toHaveAttribute("aria-checked", "false");
    await expect(checkbox).toHaveAttribute("data-size", "md");
  }
  await expect(validity.nth(0)).toHaveAttribute("data-readonly", "");
  await expect(validity.nth(1)).toHaveAttribute("data-invalid", "");
  await expect(validity.nth(2)).toHaveAttribute("data-required", "");
  await expect(validity.nth(2)).toHaveAttribute("aria-required", "true");
});

test("Checkbox participates in Field, FormData, reset, and external form ownership", async ({ page }) => {
  const form = page.getByRole("form", { name: "Release acknowledgement" });
  const acknowledgement = form.getByRole("checkbox", {
    name: "Release acknowledgement",
  });
  await form.getByRole("button", { name: "Save acknowledgement" }).click();
  await expect(acknowledgement).toBeFocused();
  await expect(acknowledgement).toHaveAttribute("data-invalid", "");

  await acknowledgement.click();
  await form.getByRole("button", { name: "Save acknowledgement" }).click();
  await expect(form.locator("output")).toHaveText("Submitted: accepted");
  await form.getByRole("button", { name: "Reset" }).click();
  await expect(acknowledgement).toHaveAttribute("aria-checked", "false");

  const external = page.getByRole("checkbox", {
    name: "Externally owned preference",
  });
  await external.click();
  expect(
    await page.locator("#checkbox-form-example").evaluate((element) =>
      new FormData(element as HTMLFormElement).get("external-consent"),
    ),
  ).toBe("yes");
});

test("Checkbox composition and appearances preserve identical defaults", async ({ page }) => {
  const rendered = page.getByTestId("checkbox-render");
  const composed = page.getByTestId("checkbox-as-child");
  await expect(rendered).toHaveAttribute("data-adapter", "rendered-checkbox");
  await expect(composed).toHaveAttribute("data-adapter", "composed-checkbox");
  for (const checkbox of [rendered, composed]) {
    await expect(checkbox).toHaveJSProperty("tagName", "BUTTON");
    await expect(checkbox).toHaveAttribute("role", "checkbox");
    await expect(checkbox).toHaveAttribute("aria-checked", "false");
    await expect(checkbox).toHaveAttribute("data-size", "md");
    await expect(checkbox).toHaveText("Preview");
    await expect(checkbox.locator(".brick-checkbox-control")).toHaveCount(1);
  }
  const output = page
    .getByTestId("checkbox-composition")
    .locator("[data-rendered-output]");
  await expect(output).toHaveCount(2);
  await expect(output.first()).toContainText(
    'data-adapter="rendered-checkbox"',
  );
  await expect(output.last()).toContainText(
    'data-adapter="composed-checkbox"',
  );

  const appearances = page
    .getByTestId("checkbox-appearance")
    .getByRole("checkbox", { name: "Preview" });
  await expect(appearances).toHaveCount(2);
  for (const checkbox of await appearances.all()) {
    await expect(checkbox).toHaveAttribute("aria-checked", "false");
    await expect(checkbox).toHaveAttribute("data-size", "md");
  }
});

test("Checkbox customization, anchor navigation, accessibility, and narrow containment remain stable", async ({ page }) => {
  const custom = page.locator("[data-slot='custom-checkbox']");
  await expect(custom).toHaveCSS("border-radius", "8px");
  await expect(custom.locator(".brick-checkbox-control")).toHaveCSS(
    "width",
    "24px",
  );
  await expect(custom.locator(".brick-checkbox-control")).toHaveCSS(
    "background-color",
    "rgb(24, 121, 78)",
  );

  await page.getByRole("link", { name: "07 Compose" }).click();
  await expect(page).toHaveURL(/#scenario-checkbox-composition$/);
  const target = page.locator("#scenario-checkbox-composition");
  await expect(target).toHaveCSS("outline-style", "none");
  await expect(target.locator(":scope > .scenario-heading")).toHaveCSS(
    "border-left-style",
    "solid",
  );

  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.locator("html").evaluate((node) => node.scrollWidth)).toBeLessThanOrEqual(390);
});
