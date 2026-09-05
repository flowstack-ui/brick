import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/radio-card"); });

test("selection, recipes, content, and form behavior remain complete", async ({ page }) => {
  const overview = page.getByTestId("radio-card-overview").getByRole("radiogroup");
  await expect(overview).toHaveAttribute("data-size", "md");
  await expect(overview).toHaveAttribute("data-orientation", "horizontal");
  await expect(overview.locator("[data-slot='radio-card-control']").first()).toHaveCSS("flex-direction", "row");
  await expect(overview.getByRole("radio", { name: /Team For growing product teams Most popular/ })).toBeChecked();
  await overview.getByRole("radio", { name: /Starter For personal projects/ }).click();
  await expect(overview.getByRole("radio", { name: /Starter For personal projects/ })).toBeChecked();
  await expect(page.getByTestId("radio-card-recipes").getByRole("radiogroup", { name: "sm plans" })).toHaveAttribute("data-size", "sm");
  await expect(page.getByTestId("radio-card-recipes").getByRole("radiogroup", { name: "solid plans" })).toHaveAttribute("data-variant", "solid");

  const form = page.getByRole("form", { name: "Plan form" });
  await form.getByRole("radio", { name: /Team Annual billing/ }).click();
  await form.getByRole("button", { name: "Save" }).click();
  await expect(form.locator("output")).toHaveText("Submitted: team");
  await form.getByRole("button", { name: "Reset" }).click();
  await expect(form.getByRole("radio", { name: /Starter Monthly billing/ })).toBeChecked();
});

test("keyboard, disabled, RTL, and accessibility remain complete", async ({ page }) => {
  const controlled = page.getByRole("radiogroup", { name: "Controlled plan" });
  await expect(controlled.getByRole("radio", { name: /Enterprise/ })).toBeDisabled();
  await controlled.getByRole("radio", { name: /Starter/ }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(controlled.getByRole("radio", { name: /Team/ })).toBeChecked();
  const rtl = page.getByRole("radiogroup", { name: "خطط الفوترة" });
  await rtl.getByRole("radio").first().focus();
  await page.keyboard.press("ArrowRight");
  await expect(rtl.getByRole("radio").nth(1)).toBeChecked();
  const vertical = page.getByRole("radiogroup", { name: "Centered plan" });
  await expect(vertical.locator("[data-slot='radio-card-control']")).toHaveCSS("flex-direction", "column");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
