import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator } from "@playwright/test";

async function box(locator: Locator) {
  const value = await locator.boundingBox();
  expect(value).not.toBeNull();
  return value!;
}

test.beforeEach(async ({ page }) => {
  await page.goto("/textarea");
});

test("Textarea overview preserves canonical defaults and Field labeling", async ({ page }) => {
  const evidence = page.getByTestId("textarea-overview");
  const control = evidence.getByRole("textbox", { name: "Project summary" });
  const root = control.locator("..");
  await expect(root).toHaveClass(/brick-textarea/);
  await expect(root).toHaveAttribute("data-variant", "outline");
  await expect(root).toHaveAttribute("data-size", "md");
  await expect(root).toHaveAttribute("data-shape", "rounded");
  await expect(root).toHaveAttribute("data-resize", "vertical");
  await expect(root).toHaveAttribute("data-full-width", "");
  await expect(control).toHaveAttribute("rows", "3");
  await evidence.getByText("Project summary", { exact: true }).click();
  await expect(control).toBeFocused();
  await control.fill("First line\nSecond line");
  await expect(control).toHaveValue("First line\nSecond line");
});

test("Textarea comparisons isolate variant, size, and shape", async ({ page }) => {
  const variantControls = page.getByTestId("textarea-variants").getByRole("textbox", { name: "Project summary" });
  await expect(variantControls).toHaveCount(3);
  for (let index = 0; index < 3; index += 1) {
    const root = variantControls.nth(index).locator("..");
    await expect(variantControls.nth(index)).toHaveValue("Describe the workspace goals and expected result.");
    await expect(root).toHaveAttribute("data-variant", ["outline", "soft", "underline"][index]);
    await expect(root).toHaveAttribute("data-size", "md");
  }
  await expect(variantControls.nth(2).locator("..")).not.toHaveAttribute("data-shape");

  const sizeControls = page.getByTestId("textarea-sizes").getByRole("textbox", { name: "Project summary" });
  const heights: number[] = [];
  for (let index = 0; index < 3; index += 1) {
    const root = sizeControls.nth(index).locator("..");
    await expect(root).toHaveAttribute("data-size", ["sm", "md", "lg"][index]);
    await expect(root).toHaveAttribute("data-variant", "outline");
    heights.push((await box(root)).height);
  }
  expect(heights[0]).toBeLessThan(heights[1]);
  expect(heights[1]).toBeLessThan(heights[2]);

  const shapeControls = page.getByTestId("textarea-shapes").getByRole("textbox", { name: "Project summary" });
  await expect(shapeControls).toHaveCount(2);
  await expect(shapeControls.nth(0).locator("..")).toHaveCSS("border-radius", "0px");
  expect(Number.parseFloat(await shapeControls.nth(1).locator("..").evaluate((element) => getComputedStyle(element).borderRadius))).toBeGreaterThan(0);
});

test("Textarea manual and automatic sizing remain distinct", async ({ page }) => {
  const resize = page.getByTestId("textarea-resize");
  const manual = resize.locator("textarea:not([data-autoresize])");
  await expect(manual).toHaveCount(4);
  for (let index = 0; index < 4; index += 1) {
    await expect(manual.nth(index)).toHaveCSS("resize", ["none", "vertical", "horizontal", "both"][index]);
  }

  const auto = resize.locator("textarea[data-autoresize]");
  const before = await box(auto);
  await auto.fill("One\nTwo\nThree\nFour\nFive\nSix\nSeven");
  const after = await box(auto);
  expect(after.height).toBeGreaterThan(before.height);
  await expect(auto.locator("..")).toHaveAttribute("data-resize", "none");
  await expect(auto).toHaveCSS("overflow-y", "auto");
});

test("Textarea value, Count, and availability state remain Atom-owned", async ({ page }) => {
  const states = page.getByTestId("textarea-states");
  const controls = states.getByRole("textbox", { name: "Project summary" });
  await expect(controls).toHaveCount(6);
  await controls.nth(1).fill("Updated project summary");
  await expect(states.getByText("Value: Updated project summary")).toBeVisible();
  await expect(controls.nth(1).locator("..").locator("[data-slot='textarea-count']")).toHaveText("23/160");
  await expect(controls.nth(2)).toBeDisabled();
  await expect(controls.nth(3)).toHaveAttribute("readonly");
  await expect(controls.nth(4)).toHaveAttribute("required");
  await expect(controls.nth(4)).toHaveAttribute("aria-required", "true");
  await expect(controls.nth(5)).toHaveAttribute("aria-invalid", "true");
  await expect(controls.nth(5)).toHaveAttribute("aria-describedby", "textarea-invalid-error");
  await expect(controls.nth(5).locator("..")).toHaveCSS("background-color", await controls.nth(4).locator("..").evaluate((element) => getComputedStyle(element).backgroundColor));
});

test("Textarea composes with inline validation, reset, external ownership, and rendered output", async ({ page }) => {
  const form = page.getByRole("form", { name: "Textarea project form" });
  const summary = form.getByRole("textbox", { name: "Project summary" });
  await form.getByRole("button", { name: "Save summary" }).click();
  await expect(summary).toBeFocused();
  await expect(summary).toHaveAttribute("data-invalid", "");
  await expect(form.getByText("Enter a project summary.")).toBeVisible();
  await summary.fill("A useful project summary");
  await form.getByRole("button", { name: "Save summary" }).click();
  await expect(form.locator("output")).toHaveText("Submitted: A useful project summary");
  await form.getByRole("button", { name: "Reset" }).click();
  await expect(summary).toHaveValue("");
  await expect(form.locator("output")).toHaveText("Form reset");

  expect(await page.locator("#textarea-form-example").evaluate((element) => new FormData(element as HTMLFormElement).get("externalNotes"))).toBe("External project notes");
  const outputControl = page.getByRole("textbox", { name: "Account notes" });
  await expect(outputControl).toHaveAttribute("id", "textarea-output-control");
  await expect(outputControl).toHaveAttribute("aria-describedby", "textarea-output-description textarea-output-error");
  const output = page.getByTestId("textarea-form").locator("[data-rendered-output]");
  await expect(output).toContainText('data-slot="textarea"');
  await expect(output).toContainText('data-slot="textarea-control"');
  await expect(output).toContainText('data-slot="textarea-count"');
});

test("Textarea appearance, customization, RTL, mobile containment, and axe remain stable", async ({ page }) => {
  const appearances = page.getByTestId("textarea-appearance").getByRole("textbox", { name: "Project summary" });
  await expect(appearances).toHaveCount(2);
  for (const control of await appearances.all()) {
    await expect(control.locator("..")).toHaveAttribute("data-variant", "outline");
    await expect(control.locator("..")).toHaveAttribute("data-size", "md");
  }
  const custom = page.locator("[data-slot='custom-textarea']");
  await expect(custom).toHaveCSS("border-radius", "12px");
  await expect(custom).toHaveCSS("border-color", "rgb(24, 121, 78)");
  await expect(custom.locator("textarea")).toHaveCSS("letter-spacing", "0.64px");

  const rtl = page.getByRole("textbox", { name: "ملاحظات المشروع" });
  await expect(rtl).toHaveCSS("direction", "rtl");
  const count = rtl.locator("..").locator("[data-slot='textarea-count']");
  const rootBox = await box(rtl.locator(".."));
  const countBox = await box(count);
  expect(countBox.x).toBeLessThan(rootBox.x + rootBox.width / 2);

  await page.setViewportSize({ width: 390, height: 844 });
  const stress = page.getByTestId("textarea-stress");
  expect((await box(stress)).width).toBeLessThanOrEqual(390);
  await expect(stress.locator("textarea").first()).toBeVisible();
  const accessibilityScanResults = await new AxeBuilder({ page }).include("[data-testid='textarea-workbench']").analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});
