import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator } from "@playwright/test";

async function expectAlignedFieldTops(grid: Locator) {
  const tops = await grid.locator(".brick-field").evaluateAll((fields) =>
    fields.map((field) => field.getBoundingClientRect().top),
  );
  expect(Math.max(...tops) - Math.min(...tops)).toBeLessThanOrEqual(1);
}

test.beforeEach(async ({ page }) => {
  await page.goto("/field");
});

test("Field overview preserves default anatomy and generated relationships", async ({ page }) => {
  const overview = page.getByTestId("field-overview");
  const field = overview.locator("[data-slot='field']");
  const input = overview.getByRole("textbox", { name: "Work email" });
  await expect(field).toHaveAttribute("data-orientation", "vertical");
  await expect(field).not.toHaveAttribute("data-invalid");
  await expect(field).not.toHaveAttribute("data-required");
  await overview.getByText("Work email", { exact: true }).click();
  await expect(input).toBeFocused();
  await expect(input).toHaveAttribute("id", "field-overview-email-control");
  await expect(input).toHaveAttribute("aria-describedby", "field-overview-email-description");
});

test("Field anatomy and states vary only the named evidence", async ({ page }) => {
  await expectAlignedFieldTops(page.getByTestId("field-anatomy"));
  await expect(page.locator("#field-complete")).toHaveAttribute("data-invalid", "");
  await expect(page.locator("#field-complete")).toHaveAttribute("data-required", "");
  await expect(page.locator("#field-complete").getByText("Enter a valid email address.")).toBeVisible();
  await expect(page.locator("#field-optional-anatomy").getByText("(optional)")).toBeVisible();

  const states = page.getByTestId("field-states");
  for (const id of ["field-required", "field-optional", "field-disabled", "field-readonly"]) {
    await expect(page.locator(`#${id}`).locator("[data-slot='field-label']")).toContainText("Work email");
    await expect(page.locator(`#${id}`).getByText("Used for account notices.", { exact: true })).toBeVisible();
  }
  await expect(page.locator("#field-required").getByRole("textbox", { name: "Work email" })).toHaveAttribute("required", "");
  await expect(page.locator("#field-disabled").getByRole("textbox", { name: "Work email" })).toBeDisabled();
  await expect(page.locator("#field-readonly").getByRole("textbox", { name: "Work email" })).toHaveAttribute("readonly", "");
  await expect(states.locator("[data-slot='field']")).toHaveCount(4);
});

test("Field error modes remain distinct and top aligned", async ({ page }) => {
  const errors = page.getByTestId("field-errors");
  await expectAlignedFieldTops(errors);
  for (const id of ["field-invalid", "field-forced", "field-invalid-no-error"]) {
    await expect(page.locator(`#${id}`).getByText("Work email", { exact: true })).toBeVisible();
    await expect(page.locator(`#${id}`).getByText("Used for account notices.", { exact: true })).toBeVisible();
  }
  await expect(page.locator("#field-invalid")).toHaveAttribute("data-invalid", "");
  await expect(page.locator("#field-invalid").locator("[data-slot='field-error']")).toBeVisible();
  await expect(page.locator("#field-forced")).not.toHaveAttribute("data-invalid");
  await expect(page.locator("#field-forced").locator("[data-slot='field-error']")).toBeVisible();
  await expect(page.locator("#field-invalid-no-error").locator("[data-slot='field-error']")).toHaveCount(0);
});

test("Field orientation and explicit relationships change no visible content", async ({ page }) => {
  const vertical = page.locator("#field-vertical");
  const horizontal = page.locator("#field-horizontal");
  for (const field of [vertical, horizontal]) {
    await expect(field.getByText("Work email", { exact: true })).toBeVisible();
    await expect(field.getByText("Used for account notices.", { exact: true })).toBeVisible();
  }
  await expect(vertical).toHaveAttribute("data-orientation", "vertical");
  await expect(horizontal).toHaveAttribute("data-orientation", "horizontal");
  expect(
    await horizontal.evaluate(
      (element) => getComputedStyle(element).gridTemplateColumns.split(" ").length,
    ),
  ).toBe(2);

  const generated = page.locator("#field-generated-relations").getByRole("textbox", { name: "Work email" });
  await expect(generated).toHaveAttribute("aria-describedby", "field-generated-relations-description");
  const explicit = page.locator("#field-explicit-control");
  await expect(explicit).toHaveAttribute("aria-labelledby", "field-explicit-aria-label");
  await expect(explicit).toHaveAttribute("aria-describedby", "field-explicit-aria-description");
  await expect(page.locator("#field-explicit-aria-label")).toHaveAttribute("for", "field-explicit-control");
  const relationshipOutput = page
    .getByTestId("field-relationships")
    .locator("[data-rendered-output]");
  await expect(relationshipOutput).toHaveCount(2);
  await expect(relationshipOutput.first()).toContainText(
    'id="field-generated-relations-control"',
  );
  await expect(relationshipOutput.last()).toContainText(
    'id="field-explicit-control"',
  );
});

test("Field composition and appearances preserve identical defaults", async ({ page }) => {
  const rendered = page.getByTestId("field-render");
  const composed = page.getByTestId("field-as-child");
  await expect(rendered).toHaveAttribute("data-adapter", "rendered-field");
  await expect(rendered.locator("[data-adapter='rendered-label']")).toHaveJSProperty("tagName", "LABEL");
  await expect(rendered.locator("[data-adapter='rendered-description']")).toHaveJSProperty("tagName", "P");
  await expect(composed).toHaveAttribute("data-adapter", "composed-field");
  await expect(composed.locator("[data-adapter='composed-label']")).toHaveJSProperty("tagName", "LABEL");
  await expect(composed.locator("[data-adapter='composed-description']")).toHaveJSProperty("tagName", "P");
  for (const field of [rendered, composed]) {
    await expect(field.getByText("Work email", { exact: true })).toBeVisible();
    await expect(field.getByText("Used for account notices.", { exact: true })).toBeVisible();
    await expect(field).not.toHaveAttribute("data-invalid");
  }
  const compositionOutput = page
    .getByTestId("field-composition")
    .locator("[data-rendered-output]");
  await expect(compositionOutput).toHaveCount(2);
  await expect(compositionOutput.first()).toContainText(
    'data-adapter="rendered-field"',
  );
  await expect(compositionOutput.last()).toContainText(
    'data-adapter="composed-field"',
  );

  const appearances = page.getByTestId("field-appearance").locator("[data-slot='field']");
  await expect(appearances).toHaveCount(2);
  for (const field of await appearances.all()) {
    await expect(field.getByText("Work email", { exact: true })).toBeVisible();
    await expect(field.getByText("Used for account notices.", { exact: true })).toBeVisible();
    await expect(field).not.toHaveAttribute("data-invalid");
  }
});

test("Field anchor navigation keeps target treatment below the sticky review region", async ({ page }) => {
  await page.getByRole("link", { name: "06 Relations" }).click();
  await expect(page).toHaveURL(/#scenario-field-relationships$/);
  const target = page.locator("#scenario-field-relationships");
  const heading = target.locator(":scope > .scenario-heading");
  await expect(target).toHaveCSS("outline-style", "none");
  await expect(heading).toHaveCSS("border-left-style", "solid");

  const positions = await page.evaluate(() => {
    const sticky = document.querySelector(".evidence-review-header")!;
    const targetHeading = document.querySelector(
      "#scenario-field-relationships > .scenario-heading",
    )!;
    return {
      headingTop: targetHeading.getBoundingClientRect().top,
      stickyBottom: sticky.getBoundingClientRect().bottom,
    };
  });
  expect(positions.headingTop).toBeGreaterThanOrEqual(positions.stickyBottom);
});

test("Field customization remains high contrast and narrow layouts reflow", async ({ page }) => {
  const custom = page.locator("[data-slot='custom-field']");
  await expect(custom).toHaveCSS("row-gap", "16px");
  await expect(custom).toHaveCSS("column-gap", "32px");
  await expect(custom.locator("[data-slot='field-label']")).toHaveCSS("color", "rgb(18, 59, 93)");
  await expect(custom.locator("[data-slot='field-error']")).toHaveCSS("color", "rgb(122, 16, 47)");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);

  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.locator("#field-horizontal").evaluate(
      (element) => getComputedStyle(element).gridTemplateColumns.split(" ").length,
    ),
  ).toBe(1);
  expect(await page.locator("html").evaluate((node) => node.scrollWidth)).toBeLessThanOrEqual(390);
});
