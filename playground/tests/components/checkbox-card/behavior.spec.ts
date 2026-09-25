import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";
test.beforeEach(async ({ page }) => {
  await page.goto("/checkbox-card?qualification=1");
});
test("native label and keyboard activate one checkbox", async ({ page }) => {
  const basic = page.locator('[data-scenario="checkbox-card.basic"]');
  const input = basic.getByRole("checkbox", { name: "Backups" });
  await basic.getByText("Backups", { exact: true }).click();
  await expect(input).toBeChecked();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Shift+Tab");
  await expect(input).toBeFocused();
  await page.keyboard.press("Space");
  await expect(input).not.toBeChecked();
  await expect(basic.locator(".brick-checkbox-card")).toHaveCSS(
    "outline-style",
    "solid",
  );
});
test("read-only, disabled and mixed states preserve their behavior", async ({
  page,
}) => {
  const states = page.locator('[data-scenario="checkbox-card.states"]');
  await states.getByText("Read only", { exact: true }).click();
  await expect(
    states.getByRole("checkbox", { name: "Read only" }),
  ).toBeChecked();
  await expect(
    states.getByRole("checkbox", { name: "Disabled" }),
  ).toBeDisabled();
  const mixed = states.getByRole("checkbox", { name: "Partially selected" });
  await expect(mixed).toHaveAttribute("aria-checked", "mixed");
  await states.getByText("Partially selected", { exact: true }).click();
  await expect(mixed).toBeChecked();
});
test("sizes coordinate inset and indicator without state geometry shifts", async ({
  page,
}) => {
  const sizes = page.locator(
    '[data-scenario="checkbox-card.sizes"] .brick-checkbox-card',
  );
  for (let index = 0; index < 3; index++) {
    const card = sizes.nth(index);
    const control = card.locator(".brick-checkbox-card__control");
    await expect(control).toHaveCSS(
      "padding-inline-start",
      index === 0 ? "12px" : "16px",
    );
    await expect(card.locator("svg")).toHaveCSS(
      "width",
      ["16px", "20px", "24px"][index],
    );
    const before = await card.boundingBox();
    await card.locator(".brick-checkbox-card__label").click();
    const after = await card.boundingBox();
    expect(after?.height).toBe(before?.height);
  }
});
test("form group validates, enforces maximum and resets", async ({ page }) => {
  const form = page.locator('[data-scenario="checkbox-card.form"]');
  await form.getByRole("button", { name: "Save", exact: true }).click();
  await expect(
    form.getByRole("checkbox", { name: "Daily backups" }),
  ).toBeFocused();
  await page.keyboard.press("Space");
  await expect(
    form.getByRole("checkbox", { name: "Priority support" }),
  ).toBeDisabled();
  await form.getByRole("button", { name: "Save", exact: true }).click();
  await expect(form.getByRole("status")).toHaveText("backups");
  await form.getByRole("button", { name: "Reset", exact: true }).click();
  await expect(
    form.getByRole("checkbox", { name: "Daily backups" }),
  ).not.toBeChecked();
});
test("responsive orientation and narrow page contain content", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const control = page.locator(
    '[data-scenario="checkbox-card.responsive"] .brick-checkbox-card__control',
  );
  await expect(control).toHaveCSS("flex-direction", "column");
  await expect(
    page.locator('[data-scenario="checkbox-card.form"] .brick-checkbox-group'),
  ).toHaveCSS("clear", "both");
  const geometry = await page.locator('[data-scenario="checkbox-card.form"] .brick-fieldset').evaluate((fieldset) => {
    const legend = fieldset.querySelector("legend")!.getBoundingClientRect();
    const group = fieldset.querySelector(".brick-checkbox-group")!.getBoundingClientRect();
    const boundary = fieldset.getBoundingClientRect();
    return { gap: group.top - legend.bottom, width: group.width, available: boundary.width };
  });
  expect(geometry.gap).toBeCloseTo(16, 2);
  expect(geometry.width).toBeGreaterThan(100);
  expect(geometry.width).toBeCloseTo(geometry.available, 2);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.setViewportSize({ width: 1200, height: 900 });
  await expect(control).toHaveCSS("flex-direction", "row");
});
test("RTL and accessibility preserve native option semantics", async ({
  page,
}) => {
  await page.goto("/checkbox-card?qualification=1&exampleDirection=rtl");
  const result = await new AxeBuilder({ page })
    .include(
      '[data-scenario="checkbox-card.basic"], [data-scenario="checkbox-card.variants"], [data-scenario="checkbox-card.tones"]',
    )
    .analyze();
  expect(result.violations).toEqual([]);
});
test("forced colors and reduced motion preserve selection and focus", async ({
  page,
  browserName,
}) => {
  test.skip(browserName === "webkit", "WebKit does not emulate forced-colors");
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  const basic = page.locator('[data-scenario="checkbox-card.basic"]');
  const input = basic.getByRole("checkbox", { name: "Backups" });
  await input.focus();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Shift+Tab");
  await page.keyboard.press("Space");
  await expect(input).toBeChecked();
  await expect(basic.locator(".brick-checkbox-card")).toHaveCSS(
    "outline-style",
    "solid",
  );
});

test("disabled paint, read-only paint and plain subtle indicators are distinct", async ({ page }) => {
  const states = page.locator('[data-scenario="checkbox-card.states"]');
  await expect(states.locator('.brick-checkbox-card[data-disabled]')).toHaveCSS('opacity', '0.5');
  await expect(states.locator('.brick-checkbox-card[data-readonly]')).toHaveCSS('opacity', '1');
  await expect(states.locator('.brick-checkbox-card[data-readonly]')).toHaveCSS('cursor', 'default');
  const subtle = page.locator('[data-scenario="checkbox-card.variants"] .brick-checkbox-card[data-variant="subtle"]');
  const mark = subtle.locator('.brick-checkmark');
  await expect(mark).toHaveCSS('border-top-color', 'rgba(0, 0, 0, 0)');
  await subtle.getByText('subtle', { exact: true }).click();
  await expect(subtle.getByRole('checkbox')).not.toBeChecked();
  await expect(mark).toHaveCSS('border-top-color', 'rgba(0, 0, 0, 0)');
});
