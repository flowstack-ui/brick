import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("Form validates, exposes callback state, submits, and resets", async ({ page }) => {
  await page.goto("/form");
  const form = page.getByRole("form", { name: "Create account" });
  const email = form.getByRole("textbox", { name: "Work email" });

  await email.fill("not-an-email");
  await form.getByRole("button", { name: "Create account" }).click();
  await expect(form).toHaveAttribute("data-invalid", "");
  await expect(form).toHaveCSS("outline-style", "none");
  await expect(page.getByText("Validation rejected the submission")).toBeVisible();
  await expect(email).toHaveAttribute(
    "aria-describedby",
    "work-email-description work-email-error",
  );

  await email.fill("ada@example.com");
  await form.getByRole("button", { name: "Create account" }).click();
  await expect(form).toHaveAttribute("data-submitting", "");
  await expect(form).toHaveAttribute("data-submitted", "", { timeout: 2_000 });
  await expect(form).toHaveCSS("outline-style", "none");
  await expect(page.getByText("Account form submitted")).toBeVisible();

  await form.getByRole("button", { name: "Reset" }).click();
  await expect(form).not.toHaveAttribute("data-submitted");
  await expect(email).toHaveValue("");
});

test("Field labels focus controls and native ARIA remains authoritative", async ({ page }) => {
  await page.goto("/field");
  const overview = page.getByTestId("form-foundation-overview");
  await overview.locator("label").filter({ hasText: "Work email" }).click();
  await expect(overview.getByRole("textbox", { name: "Work email" })).toBeFocused();

  const relationships = page.getByTestId("form-foundation-relationships");
  const explicit = relationships.getByRole("textbox", { name: "Native ARIA field" });
  await expect(explicit).toHaveAttribute("aria-describedby", "explicit-description");
  await expect(relationships.getByText("Error has no automatic live role.")).not.toHaveAttribute("role");

  const states = page.getByTestId("field-states");
  const optional = states.locator("#optional-field");
  await expect(optional.locator("label")).toContainText("Optional field (optional)");
  const descriptionSizes = await states.locator(".brick-field-description").evaluateAll((elements) =>
    elements.slice(0, 3).map((element) => getComputedStyle(element).fontSize),
  );
  expect(new Set(descriptionSizes).size).toBe(1);

  const fieldRowGap = await states.locator("#invalid-field").evaluate(
    (element) => Number.parseFloat(getComputedStyle(element).rowGap),
  );
  expect(fieldRowGap).toBeGreaterThanOrEqual(12);
});

test("Fieldset preserves native disabled state and group relationships", async ({ page }) => {
  await page.goto("/fieldset");
  const groups = page.getByTestId("fieldset-groups");
  const invalidGroup = groups.locator("#notification-methods");
  await expect(invalidGroup).toHaveAttribute("aria-describedby", "notification-methods-description notification-methods-error");
  await expect(invalidGroup).not.toHaveAttribute("aria-required");
  await expect(invalidGroup.locator('[data-slot="checkbox-group"]')).toHaveAttribute("aria-labelledby", "notification-methods-legend");

  const disabled = groups.locator("#disabled-preferences");
  await expect(disabled).toHaveAttribute("disabled", "");
  for (const radio of await disabled.getByRole("radio").all()) {
    await expect(radio).toBeDisabled();
  }

  const firstChoice = invalidGroup.getByRole("checkbox", { name: "Email" });
  const control = firstChoice.locator(".brick-checkbox-control");
  if (await page.evaluate(() => matchMedia("(hover: hover) and (pointer: fine)").matches)) {
    const hoverBefore = {
      background: await firstChoice.evaluate((element) => getComputedStyle(element).backgroundColor),
      controlBorder: await control.evaluate((element) => getComputedStyle(element).borderColor),
    };
    await firstChoice.hover();
    await page.waitForTimeout(200);
    const hoverAfter = {
      background: await firstChoice.evaluate((element) => getComputedStyle(element).backgroundColor),
      controlBorder: await control.evaluate((element) => getComputedStyle(element).borderColor),
    };
    expect(hoverAfter.background).not.toBe(hoverBefore.background);
    expect(hoverAfter.controlBorder).not.toBe(hoverBefore.controlBorder);
  }

  const weightBefore = await firstChoice.evaluate((element) => getComputedStyle(element).fontWeight);
  await firstChoice.click();
  const weightAfter = await firstChoice.evaluate((element) => getComputedStyle(element).fontWeight);
  expect(weightAfter).toBe(weightBefore);

  const visibleSpacing = await invalidGroup
    .locator(".brick-fieldset-error")
    .evaluate((element) => Number.parseFloat(getComputedStyle(element).paddingBlockStart));
  expect(visibleSpacing).toBeGreaterThanOrEqual(16);

  const addressSpacing = await groups.locator("#address-group").evaluate((element) => {
    const legend = element.querySelector("legend")!;
    const firstField = element.querySelector<HTMLElement>(".brick-field")!;
    return firstField.getBoundingClientRect().top - legend.getBoundingClientRect().bottom;
  });
  const describedSpacing = await invalidGroup.evaluate((element) => {
    const legend = element.querySelector("legend")!;
    const description = element.querySelector<HTMLElement>(".brick-fieldset-description")!;
    return description.getBoundingClientRect().top - legend.getBoundingClientRect().bottom;
  });
  expect(addressSpacing).toBe(describedSpacing);
});

test("horizontal Field uses two tracks when wide and one when constrained", async ({ page }) => {
  await page.goto("/field");
  const wide = page.locator("#horizontal-wide");
  const narrow = page.locator("#horizontal-narrow");

  const wideColumns = await wide.evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" ").filter(Boolean).length);
  const narrowColumns = await narrow.evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" ").filter(Boolean).length);
  const expectedWideColumns = page.viewportSize()!.width >= 600 ? 2 : 1;
  expect(wideColumns).toBe(expectedWideColumns);
  expect(narrowColumns).toBe(1);

  const narrowBox = await narrow.boundingBox();
  const inputBox = await narrow.getByRole("textbox").boundingBox();
  expect(inputBox!.x).toBeGreaterThanOrEqual(narrowBox!.x);
  expect(inputBox!.x + inputBox!.width).toBeLessThanOrEqual(narrowBox!.x + narrowBox!.width + 0.5);
});

test("horizontal Field stacks at the widest supported phone viewport", async ({ page }) => {
  await page.setViewportSize({ width: 440, height: 956 });
  await page.goto("/field");

  const field = page.locator("#horizontal-wide");
  const columns = await field.evaluate((element) =>
    getComputedStyle(element).gridTemplateColumns.split(" ").filter(Boolean).length,
  );
  expect(columns).toBe(1);
});

test("Form foundation remains contained at 256 px, supports RTL, and passes axe", async ({ page }) => {
  await page.setViewportSize({ width: 256, height: 720 });
  await page.goto("/form-foundation");
  const stress = page.getByTestId("form-foundation-stress");
  const rtlFixture = stress.locator('[dir="rtl"]');
  await expect(rtlFixture).toHaveAttribute("dir", "rtl");
  const rtlGroup = rtlFixture.locator("#rtl-group");
  const rtlGeometry = await rtlGroup.evaluate((element) => {
    const legend = element.querySelector("legend")!;
    const description = element.querySelector<HTMLElement>(".brick-fieldset-description")!;
    const error = element.querySelector<HTMLElement>(".brick-fieldset-error")!;
    const checkbox = element.querySelector<HTMLElement>('[role="checkbox"]')!;
    const checkboxControl = checkbox.querySelector<HTMLElement>(".brick-checkbox-control")!;
    const errorCueStyle = getComputedStyle(error, "::before");
    const checkboxStyle = getComputedStyle(checkbox);
    const checkboxControlStyle = getComputedStyle(checkboxControl);
    return {
      legendGap: description.getBoundingClientRect().top - legend.getBoundingClientRect().bottom,
      errorCueBackground: errorCueStyle.backgroundColor,
      errorCueRight: errorCueStyle.right,
      errorCueWidth: Number.parseFloat(errorCueStyle.width),
      checkboxBorderLeft: Number.parseFloat(checkboxStyle.borderLeftWidth),
      checkboxBorderRight: Number.parseFloat(checkboxStyle.borderRightWidth),
      checkboxBorderRightColor: checkboxStyle.borderRightColor,
      checkboxControlBorderColor: checkboxControlStyle.borderColor,
    };
  });
  expect(rtlGeometry.legendGap).toBeGreaterThanOrEqual(12);
  expect(rtlGeometry.errorCueRight).toBe("0px");
  expect(rtlGeometry.errorCueWidth).toBeGreaterThan(0);
  expect(rtlGeometry.checkboxBorderRight).toBeGreaterThan(rtlGeometry.checkboxBorderLeft);
  expect(rtlGeometry.checkboxBorderRightColor).toBe(rtlGeometry.errorCueBackground);
  expect(rtlGeometry.checkboxControlBorderColor).not.toBe(rtlGeometry.errorCueBackground);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);

  for (const fixture of await stress.locator(".phone-frame").all()) {
    const fixtureBox = await fixture.boundingBox();
    for (const component of await fixture.locator(".brick-field, .brick-fieldset").all()) {
      const box = await component.boundingBox();
      expect(box!.x).toBeGreaterThanOrEqual(fixtureBox!.x - 0.5);
      expect(box!.x + box!.width).toBeLessThanOrEqual(fixtureBox!.x + fixtureBox!.width + 0.5);
    }
  }

  const result = await new AxeBuilder({ page }).disableRules(["region"]).analyze();
  expect(result.violations).toEqual([]);
});
