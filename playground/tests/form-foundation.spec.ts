import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("Form validates, exposes callback state, submits, and resets", async ({ page }) => {
  await page.goto("/form");
  const form = page.getByRole("form", { name: "Create account" });
  const email = form.getByRole("textbox", { name: "Work email" });

  await email.fill("not-an-email");
  await form.getByRole("button", { name: "Create account" }).click();
  await expect(form).toHaveAttribute("data-invalid", "");
  await expect(page.getByText("Validation rejected the submission")).toBeVisible();
  await expect(email).toHaveAttribute(
    "aria-describedby",
    "work-email-description work-email-error",
  );

  await email.fill("ada@example.com");
  await form.getByRole("button", { name: "Create account" }).click();
  await expect(form).toHaveAttribute("data-submitting", "");
  await expect(form).toHaveAttribute("data-submitted", "", { timeout: 2_000 });
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

test("Form foundation remains contained at 256 px, supports RTL, and passes axe", async ({ page }) => {
  await page.setViewportSize({ width: 256, height: 720 });
  await page.goto("/form-foundation");
  const stress = page.getByTestId("form-foundation-stress");
  await expect(stress.locator('[dir="rtl"]')).toHaveAttribute("dir", "rtl");
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
