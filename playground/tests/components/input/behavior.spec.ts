import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator } from "@playwright/test";

async function box(locator: Locator) {
  const value = await locator.boundingBox();
  expect(value).not.toBeNull();
  return value!;
}

test.beforeEach(async ({ page }) => {
  await page.goto("/input");
});

test("Input overview preserves canonical defaults and Field labeling", async ({
  page,
}) => {
  const field = page.getByTestId("input-overview");
  const input = field.getByRole("textbox", { name: "Project name" });
  const root = input.locator("..");

  await expect(root).toHaveClass(/brick-input/);
  await expect(root).toHaveAttribute("data-variant", "outline");
  await expect(root).toHaveAttribute("data-size", "md");
  await expect(root).toHaveAttribute("data-shape", "rounded");
  await expect(root).toHaveAttribute("data-full-width", "");
  await expect(input).toHaveAttribute("data-slot", "input-control");
  await expect(input).toHaveAttribute("id", "input-overview-field-control");
  await field.getByText("Project name", { exact: true }).click();
  await expect(input).toBeFocused();
});

test("Input controlled comparisons change only variant, size, or shape", async ({
  page,
}) => {
  const variantInputs = page
    .getByTestId("input-variants")
    .getByRole("textbox", { name: "Project name" });
  await expect(variantInputs).toHaveCount(3);
  for (let index = 0; index < 3; index += 1) {
    await expect(variantInputs.nth(index)).toHaveValue("Brick workspace");
    await expect(variantInputs.nth(index).locator("..")).toHaveAttribute(
      "data-variant",
      ["outline", "soft", "underline"][index],
    );
    await expect(variantInputs.nth(index).locator("..")).toHaveAttribute(
      "data-size",
      "md",
    );
  }
  await expect(variantInputs.nth(2).locator("..")).not.toHaveAttribute(
    "data-shape",
  );
  const underlineRoot = await box(variantInputs.nth(2).locator(".."));
  const underlineControl = await box(variantInputs.nth(2));
  expect(underlineControl.x - underlineRoot.x).toBeGreaterThanOrEqual(8);

  const sizeInputs = page
    .getByTestId("input-sizes")
    .getByRole("textbox", { name: "Project name" });
  const heights: number[] = [];
  for (let index = 0; index < 3; index += 1) {
    const root = sizeInputs.nth(index).locator("..");
    await expect(root).toHaveAttribute("data-size", ["sm", "md", "lg"][index]);
    await expect(root).toHaveAttribute("data-variant", "outline");
    await expect(root).toHaveAttribute("data-shape", "rounded");
    heights.push((await box(root)).height);
  }
  expect(heights[0]).toBeLessThan(heights[1]);
  expect(heights[1]).toBeLessThan(heights[2]);

  const shapeInputs = page
    .getByTestId("input-shapes")
    .getByRole("textbox", { name: "Project name" });
  for (let index = 0; index < 3; index += 1) {
    const root = shapeInputs.nth(index).locator("..");
    await expect(root).toHaveAttribute(
      "data-shape",
      ["sharp", "rounded", "pill"][index],
    );
    await expect(root).toHaveAttribute("data-size", "md");
    await expect(root).toHaveAttribute("data-variant", "outline");
  }
  await expect(shapeInputs.nth(0).locator("..")).toHaveCSS(
    "border-radius",
    "0px",
  );
  expect(
    Number.parseFloat(
      await shapeInputs
        .nth(2)
        .locator("..")
        .evaluate((element) => getComputedStyle(element).borderRadius),
    ),
  ).toBeGreaterThan(100);
});

test("Input adornments remain logical and Clear delegates value and focus", async ({
  page,
}) => {
  const evidence = page.getByTestId("input-adornments");
  const inputs = evidence.getByRole("textbox", { name: "Project name" });
  await expect(inputs).toHaveCount(3);
  for (const input of await inputs.all()) {
    await expect(input).toHaveValue("Brick workspace");
    await expect(input.locator("..")).toHaveAttribute("data-size", "md");
  }
  await expect(
    inputs.nth(0).locator("..").locator("[data-slot='input-start']"),
  ).toHaveCount(1);
  await expect(
    inputs.nth(1).locator("..").locator("[data-slot='input-end']"),
  ).toContainText("USD");
  const endRoot = await box(inputs.nth(1).locator(".."));
  const endAdornment = await box(
    inputs.nth(1).locator("..").locator("[data-slot='input-end']"),
  );
  expect(endAdornment.x + endAdornment.width).toBeLessThanOrEqual(
    endRoot.x + endRoot.width,
  );

  const clearable = inputs.nth(2);
  const clear = evidence.getByRole("button", { name: "Clear project name" });
  const clearRoot = await box(clearable.locator(".."));
  const clearBox = await box(clear);
  expect(
    clearRoot.x + clearRoot.width - (clearBox.x + clearBox.width),
  ).toBeLessThanOrEqual(1);
  await expect(clear).toHaveAttribute("tabindex", "-1");
  await clear.click();
  await expect(clearable).toHaveValue("");
  await expect(clearable).toBeFocused();
  await expect(clear).toBeHidden();
});

test("Input state ownership and availability remain native", async ({
  page,
}) => {
  const states = page.getByTestId("input-states");
  const namedInputs = states.getByRole("textbox", { name: "Project name" });
  const uncontrolled = namedInputs.nth(0);
  const controlled = namedInputs.nth(1);
  const uncontrolledRoot = await box(uncontrolled.locator(".."));
  const controlledRoot = await box(controlled.locator(".."));
  const uncontrolledCell = await box(
    uncontrolled.locator(
      "xpath=ancestor::*[contains(@class, 'forms-cell')][1]",
    ),
  );
  const controlledCell = await box(
    controlled.locator("xpath=ancestor::*[contains(@class, 'forms-cell')][1]"),
  );
  expect(uncontrolledRoot.y - uncontrolledCell.y).toBeCloseTo(
    controlledRoot.y - controlledCell.y,
    0,
  );
  await uncontrolled.fill("Uncontrolled");
  await controlled.fill("Controlled");
  await expect(uncontrolled).toHaveValue("Uncontrolled");
  await expect(controlled).toHaveValue("Controlled");
  await expect(states.getByText("Value: Controlled")).toBeVisible();

  const disabled = namedInputs.nth(2);
  const readOnly = namedInputs.nth(3);
  const required = namedInputs.nth(4);
  const invalid = namedInputs.nth(5);
  await expect(disabled).toBeDisabled();
  await expect(readOnly).toHaveAttribute("readonly");
  await expect(required).toHaveAttribute("required");
  await expect(required).toHaveAttribute("aria-required", "true");
  await expect(invalid).toHaveAttribute("aria-invalid", "true");
  await expect(invalid).toHaveAttribute(
    "aria-describedby",
    "input-invalid-error",
  );
  await expect(invalid.locator("..")).toHaveCSS(
    "background-color",
    await required
      .locator("..")
      .evaluate((element) => getComputedStyle(element).backgroundColor),
  );
});

test("Input composes with inline validation, reset, and external ownership", async ({
  page,
}) => {
  const form = page.getByRole("form", { name: "Input account form" });
  const email = form.getByRole("textbox", { name: "Email" });
  await form.getByRole("button", { name: "Save email" }).click();
  await expect(email).toBeFocused();
  await expect(email).toHaveAttribute("data-invalid", "");
  await expect(form.getByText("Enter a valid email address.")).toBeVisible();

  await email.fill("ada@example.com");
  await form.getByRole("button", { name: "Save email" }).click();
  await expect(form.locator("output")).toHaveText("Submitted: ada@example.com");
  await expect(email).not.toHaveAttribute("data-invalid");

  const external = page.getByRole("textbox", { name: "External project" });
  expect(
    await page
      .locator("#input-form-example")
      .evaluate((element) =>
        new FormData(element as HTMLFormElement).get("project"),
      ),
  ).toBe("Brick");

  await form.getByRole("button", { name: "Reset" }).click();
  await expect(email).toHaveValue("");
  await expect(form.locator("output")).toHaveText("Form reset");
});

test("Input rendered relationship evidence matches the live DOM", async ({
  page,
}) => {
  const outputEvidence = page
    .getByTestId("input-form")
    .locator(".playground-output-evidence");
  const input = outputEvidence.getByRole("textbox", {
    name: "Account email",
  });
  await expect(input).toHaveAttribute("id", "input-output-control");
  await expect(input).toHaveAttribute(
    "aria-describedby",
    "input-output-description input-output-error",
  );
  await expect(input).toHaveAttribute("aria-invalid", "true");
  const output = outputEvidence.locator("[data-rendered-output]");
  await expect(output).toContainText('data-slot="input"');
  await expect(output).toContainText('data-slot="input-control"');
  await expect(output).toContainText('id="input-output-control"');
  await expect(output).toContainText(
    'aria-describedby="input-output-description input-output-error"',
  );
});

test("Input appearance, customization, RTL, and narrow containment remain stable", async ({
  page,
}) => {
  const appearances = page
    .getByTestId("input-appearance")
    .getByRole("textbox", { name: "Project name" });
  await expect(appearances).toHaveCount(2);
  for (const input of await appearances.all()) {
    await expect(input.locator("..")).toHaveAttribute(
      "data-variant",
      "outline",
    );
    await expect(input.locator("..")).toHaveAttribute("data-size", "md");
  }

  const custom = page.locator("[data-slot='custom-input']");
  await expect(custom).toHaveCSS("border-radius", "12px");
  await expect(custom).toHaveCSS("border-color", "rgb(24, 121, 78)");
  await expect(custom.locator("input")).toHaveCSS("letter-spacing", "1.28px");

  const rtl = page.getByRole("searchbox", { name: "البحث في الحساب" });
  const rtlRoot = rtl.locator("..");
  await expect(rtlRoot).toHaveCSS("direction", "rtl");
  const startBox = await box(rtlRoot.locator("[data-slot='input-start']"));
  const clearBox = await box(page.getByRole("button", { name: "مسح البحث" }));
  expect(startBox.x).toBeGreaterThan(clearBox.x);

  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.locator("html").evaluate((element) => element.scrollWidth),
  ).toBeLessThanOrEqual(390);
  expect(
    (await box(page.getByTestId("input-stress"))).width,
  ).toBeLessThanOrEqual(390);

  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);

  await page.emulateMedia({ forcedColors: "active" });
  const forcedColorsInput = page
    .getByTestId("input-states")
    .getByRole("textbox")
    .first();
  await forcedColorsInput.focus();
  const forcedColorsRoot = forcedColorsInput.locator("..");
  await expect(forcedColorsRoot).toHaveCSS("outline-style", "solid");
  await expect(forcedColorsRoot).toHaveCSS("box-shadow", "none");
});
