import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/form");
});

test("Form overview preserves native submission and reset behavior", async ({ page }) => {
  const form = page.getByRole("form", { name: "Create account" });
  const email = form.getByRole("textbox", { name: "Work email" });
  await expect(form).toHaveAttribute("data-slot", "form");
  await email.fill("ada@example.com");
  await form.getByRole("button", { name: "Create account" }).click();
  await expect(form).toHaveAttribute("data-submitted", "", { timeout: 2_000 });
  await form.getByRole("button", { name: "Reset" }).click();
  await expect(email).toHaveValue("");
});

test("Form submission models keep identical inputs and report results locally", async ({ page }) => {
  for (const name of ["Native URL model", "Function action model", "Callback model"]) {
    const form = page.getByRole("form", { name });
    await expect(form.getByRole("textbox", { name: "Project name" })).toHaveValue("Analytical Engine");
    await expect(form.getByRole("button", { name: "Submit project" })).toBeVisible();
    await expect(form.locator("output")).toHaveText("Not submitted");
    await form.getByRole("button", { name: "Submit project" }).click();
    await expect(form.locator("output")).toHaveText("Submitted: Analytical Engine");
  }
});

test("Form compares inline and native validation with identical anatomy", async ({ page }) => {
  const inline = page.getByRole("form", { name: "Inline validation" });
  const native = page.getByRole("form", { name: "Native validation" });

  for (const form of [inline, native]) {
    await expect(form.getByRole("textbox", { name: "Work email" })).toHaveValue("");
    await expect(form.getByRole("button", { name: "Submit profile" })).toBeVisible();
    await expect(form.getByRole("button", { name: "Reset" })).toBeVisible();
    await expect(form.locator("output")).toHaveText("Not submitted");
  }

  await inline.getByRole("button", { name: "Submit profile" }).click();
  await expect(inline).toHaveAttribute("data-invalid", "");
  await expect(inline.getByText("Enter a valid email address.")).toBeVisible();

  await native.getByRole("button", { name: "Submit profile" }).click();
  await expect(native.getByRole("textbox", { name: "Work email" })).toBeFocused();
  await expect(native.locator("output")).toHaveText("Not submitted");

  for (const form of [inline, native]) {
    await form.getByRole("textbox", { name: "Work email" }).fill("ada@example.com");
    await form.getByRole("button", { name: "Submit profile" }).click();
    await expect(form.locator("output")).toHaveText("Valid form submitted");
  }
});

test("Form exposes invalid, submitting, submitted, and reset hooks", async ({ page }) => {
  const form = page.getByRole("form", { name: "Submission state" });
  const input = form.getByRole("textbox", { name: "Project name" });
  const submit = form.getByRole("button", { name: "Submit project" });

  await submit.click();
  await expect(form).toHaveAttribute("data-invalid", "");
  await expect(form.locator("output")).toContainText("data-invalid true");

  await input.fill("Analytical Engine");
  await submit.click();
  await expect(form).toHaveAttribute("data-submitting", "");
  await expect(form.locator("output")).toContainText("data-submitting true");
  await expect(form).toHaveAttribute("data-submitted", "", { timeout: 2_000 });
  await expect(form.locator("output")).toContainText("data-submitted true");

  await form.getByRole("button", { name: "Reset" }).click();
  await expect(form).not.toHaveAttribute("data-submitted");
  await expect(form).not.toHaveAttribute("data-invalid");
});

test("Form forwards native attributes and supports external controls", async ({ page }) => {
  const native = page.getByRole("form", { name: "Native attributes" });
  await expect(native).toHaveAttribute("method", "post");
  await expect(native).toHaveAttribute("enctype", "application/x-www-form-urlencoded");
  await expect(native).toHaveAttribute("novalidate", "");
  await expect(native).toHaveAttribute("target", "form-native-surface-target");
  await native.getByRole("button", { name: "Submit native form" }).click();
  await expect(native.locator("output")).toHaveText("Native form submitted");

  const external = page.getByRole("form", { name: "External controls" });
  const externalSubmit = page.getByRole("button", { name: "External submit" });
  const externalReset = page.getByRole("button", { name: "External reset" });
  await expect(externalSubmit).toHaveAttribute("form", "external-controls-form");
  await expect(externalReset).toHaveAttribute("form", "external-controls-form");
  await externalSubmit.click();
  await expect(page.getByText("External submit", { exact: true }).last()).toBeVisible();
  await externalReset.click();
  await expect(page.getByText("External reset", { exact: true }).last()).toBeVisible();
  await expect(external).toBeVisible();
});

test("Form preserves composition, customization, accessibility, and containment", async ({ page }) => {
  await expect(page.getByTestId("form-render")).toHaveAttribute("data-adapter", "rendered-form");
  await expect(page.getByTestId("form-as-child")).toHaveAttribute("data-adapter", "composed-form");
  const output = page
    .getByTestId("form-composition")
    .locator("[data-rendered-output]");
  await expect(output).toHaveCount(2);
  await expect(output.first()).toContainText('data-adapter="rendered-form"');
  await expect(output.last()).toContainText('data-adapter="composed-form"');
  const composedUrl = page.url();
  await page
    .getByRole("form", { name: "Composed form" })
    .getByRole("button", { name: "Submit composed Form" })
    .click();
  await expect(page).toHaveURL(composedUrl);
  await expect(page.locator("[data-slot='custom-form']")).toHaveCSS("row-gap", "32px");

  await page.setViewportSize({ width: 390, height: 844 });
  const pageWidth = await page.locator("html").evaluate((node) => node.scrollWidth);
  expect(pageWidth).toBeLessThanOrEqual(390);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
