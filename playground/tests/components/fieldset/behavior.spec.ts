import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator } from "@playwright/test";

async function expectAlignedFieldsetTops(grid: Locator) {
  const offsets = await grid.locator(".forms-cell").evaluateAll((cells) =>
    cells.map((cell) => {
      const group = cell.querySelector(".brick-fieldset")!;
      return group.getBoundingClientRect().top - cell.getBoundingClientRect().top;
    }),
  );
  expect(Math.max(...offsets) - Math.min(...offsets)).toBeLessThanOrEqual(1);
}

test.beforeEach(async ({ page }) => {
  await page.goto("/fieldset");
});

test("Fieldset overview preserves native defaults and Legend-owned relationships", async ({ page }) => {
  const overview = page.getByTestId("fieldset-overview");
  const fieldset = overview.locator("fieldset");
  const legend = fieldset.locator("[data-slot='fieldset-legend']");
  const group = fieldset.locator("[data-slot='checkbox-group']");
  await expect(fieldset).toHaveAttribute("data-slot", "fieldset");
  await expect(fieldset).not.toHaveAttribute("data-invalid");
  await expect(fieldset).not.toHaveAttribute("data-required");
  await expect(legend).toHaveJSProperty("tagName", "LEGEND");
  await expect(legend).toHaveText("Notification methods");
  await expect(fieldset).toHaveAttribute(
    "aria-describedby",
    "fieldset-overview-methods-description",
  );
  await expect(group).toHaveAttribute(
    "aria-labelledby",
    "fieldset-overview-methods-legend",
  );
});

test("Fieldset anatomy and states vary only the named evidence", async ({ page }) => {
  await expectAlignedFieldsetTops(page.getByTestId("fieldset-anatomy"));
  await expect(page.locator("#fieldset-complete")).toHaveAttribute("data-invalid", "");
  await expect(page.locator("#fieldset-complete")).toHaveAttribute("data-required", "");
  await expect(page.locator("#fieldset-complete")).not.toHaveAttribute("aria-required");
  await expect(page.locator("#fieldset-complete").getByText("Select at least one method.")).toBeVisible();
  await expect(page.locator("#fieldset-optional").getByText("(optional)")).toBeVisible();

  await expectAlignedFieldsetTops(page.getByTestId("fieldset-states"));
  for (const id of ["fieldset-required", "fieldset-optional-state", "fieldset-disabled", "fieldset-invalid"]) {
    await expect(page.locator(`#${id}`).locator("[data-slot='fieldset-legend']")).toContainText("Delivery methods");
    await expect(page.locator(`#${id}`).getByText("Choose preferred methods.", { exact: true })).toBeVisible();
    await expect(page.locator(`#${id}`).getByRole("checkbox", { name: "Email" })).toBeVisible();
  }
  await expect(page.locator("#fieldset-required")).toHaveAttribute("data-required", "");
  await expect(page.locator("#fieldset-disabled")).toHaveAttribute("disabled", "");
  await expect(page.locator("#fieldset-disabled").getByRole("checkbox", { name: "Email" })).toBeDisabled();
  await expect(page.locator("#fieldset-invalid")).toHaveAttribute("data-invalid", "");
});

test("Fieldset keeps CheckboxGroup and nested Field relationships independent", async ({ page }) => {
  const checkboxFieldset = page.locator("#fieldset-checkbox-group");
  await expect(checkboxFieldset.locator("[data-slot='checkbox-group']")).toHaveAttribute(
    "aria-labelledby",
    "fieldset-checkbox-group-legend",
  );
  await expect(checkboxFieldset).toHaveAttribute(
    "aria-describedby",
    "fieldset-checkbox-group-description",
  );

  const address = page.locator("#fieldset-address");
  await expect(address.locator("[data-slot='fieldset-legend']")).toHaveText("Address details");
  await expect(address.getByRole("textbox", { name: "City" })).toHaveAttribute(
    "id",
    "fieldset-city-control",
  );
  await expect(address.getByRole("textbox", { name: "Postal code" })).toHaveAttribute(
    "id",
    "fieldset-postal-control",
  );
});

test("Fieldset relationships expose generated and forced output accurately", async ({ page }) => {
  const generated = page.locator("#notification-methods");
  await expect(generated).toHaveAttribute(
    "aria-describedby",
    "notification-methods-description notification-methods-error",
  );
  await expect(generated.locator("[data-slot='checkbox-group']")).toHaveAttribute(
    "aria-labelledby",
    "notification-methods-legend",
  );
  await expect(generated).toHaveAttribute("data-invalid", "");

  const forced = page.locator("#fieldset-forced");
  await expect(forced).not.toHaveAttribute("data-invalid");
  await expect(forced.locator("[data-slot='fieldset-error']")).toBeVisible();
  await expect(forced.locator("[data-slot='fieldset-error']")).not.toHaveAttribute(
    "aria-live",
  );

  const output = page
    .getByTestId("fieldset-relationships")
    .locator("[data-rendered-output]");
  await expect(output).toHaveCount(2);
  await expect(output.first()).toContainText('id="notification-methods-legend"');
  await expect(output.first()).toContainText(
    'aria-labelledby="notification-methods-legend"',
  );
  await expect(output.last()).toContainText('id="fieldset-forced-error"');
});

test("Fieldset composition and appearances preserve identical defaults", async ({ page }) => {
  const rendered = page.getByTestId("fieldset-render");
  const composed = page.getByTestId("fieldset-as-child");
  await expect(rendered).toHaveAttribute("data-adapter", "rendered-fieldset");
  await expect(rendered).toHaveJSProperty("tagName", "FIELDSET");
  await expect(rendered.locator("[data-adapter='rendered-legend']")).toHaveJSProperty(
    "tagName",
    "LEGEND",
  );
  await expect(composed).toHaveAttribute("data-adapter", "composed-fieldset");
  await expect(composed).toHaveJSProperty("tagName", "FIELDSET");
  await expect(composed.locator("[data-adapter='composed-legend']")).toHaveJSProperty(
    "tagName",
    "LEGEND",
  );
  for (const fieldset of [rendered, composed]) {
    await expect(fieldset.getByText("Notification methods", { exact: true })).toBeVisible();
    await expect(fieldset.getByText("Select the methods you check most often.", { exact: true })).toBeVisible();
    await expect(fieldset.getByRole("checkbox", { name: "Email" })).toBeVisible();
    await expect(fieldset).not.toHaveAttribute("data-invalid");
  }
  const output = page
    .getByTestId("fieldset-composition")
    .locator("[data-rendered-output]");
  await expect(output).toHaveCount(2);
  await expect(output.first()).toContainText(
    'data-adapter="rendered-fieldset"',
  );
  await expect(output.last()).toContainText(
    'data-adapter="composed-fieldset"',
  );

  const appearances = page
    .getByTestId("fieldset-appearance")
    .locator("[data-slot='fieldset']");
  await expect(appearances).toHaveCount(2);
  for (const fieldset of await appearances.all()) {
    await expect(fieldset.getByText("Notification methods", { exact: true })).toBeVisible();
    await expect(fieldset.getByRole("checkbox", { name: "Email" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    await expect(fieldset).not.toHaveAttribute("data-invalid");
  }
});

test("Fieldset anchor navigation stays below the sticky review region", async ({ page }) => {
  await page.getByRole("link", { name: "05 Relations" }).click();
  await expect(page).toHaveURL(/#scenario-fieldset-relationships$/);
  const target = page.locator("#scenario-fieldset-relationships");
  const heading = target.locator(":scope > .scenario-heading");
  await expect(target).toHaveCSS("outline-style", "none");
  await expect(heading).toHaveCSS("border-left-style", "solid");
  const positions = await page.evaluate(() => ({
    headingTop: document
      .querySelector("#scenario-fieldset-relationships > .scenario-heading")!
      .getBoundingClientRect().top,
    stickyBottom: document
      .querySelector(".evidence-review-header")!
      .getBoundingClientRect().bottom,
  }));
  expect(positions.headingTop).toBeGreaterThanOrEqual(positions.stickyBottom);
});

test("Fieldset customization remains high contrast and narrow content stays contained", async ({ page }) => {
  const custom = page.locator("[data-slot='custom-fieldset']");
  await expect(custom).toHaveCSS("--brick-fieldset-gap", "1rem");
  await expect(custom).toHaveCSS("--brick-fieldset-control-gap", "1.5rem");
  await expect(custom.locator("[data-slot='fieldset-legend']")).toHaveCSS(
    "color",
    "rgb(18, 59, 93)",
  );
  await expect(custom.locator("[data-slot='fieldset-error']")).toHaveCSS(
    "color",
    "rgb(122, 16, 47)",
  );
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);

  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.locator("html").evaluate((node) => node.scrollWidth)).toBeLessThanOrEqual(390);
});
