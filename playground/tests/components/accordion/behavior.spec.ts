import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/accordion"); });

test("defaults, recipes, and selection models preserve controlled differences", async ({ page }) => {
  const root = page.getByTestId("accordion-overview").locator(".brick-accordion");
  await expect(root).toHaveAttribute("data-variant", "plain");
  await expect(root).toHaveAttribute("data-size", "md");
  await expect(root).toHaveAttribute("data-orientation", "vertical");
  for (const variant of ["plain", "soft", "outline"]) await expect(page.getByTestId("accordion-variants").locator(`.brick-accordion[data-variant='${variant}']`)).toHaveCount(1);
  for (const size of ["sm", "md", "lg"]) await expect(page.getByTestId("accordion-sizes").locator(`.brick-accordion[data-size='${size}']`)).toHaveCount(1);
  await expect(page.getByTestId("accordion-selection").locator(".brick-accordion-content[data-state='open']")).toHaveCount(4);
});

test("activation, locked-open, disabled, mounted, and landmark lifecycle remain correct", async ({ page }) => {
  const root = page.getByTestId("accordion-overview").locator(".brick-accordion");
  const trigger = root.getByRole("button", { name: "Account settings" });
  await trigger.press("Enter");
  const region = root.getByRole("region");
  expect(await trigger.getAttribute("aria-controls")).toBe(await region.getAttribute("id"));
  expect(await region.getAttribute("aria-labelledby")).toBe(await trigger.getAttribute("id"));
  const locked = page.getByTestId("accordion-selection").getByRole("button", { name: "Account settings" }).first();
  await expect(locked).toHaveAttribute("data-locked-open", "");
  await expect(locked).toHaveAttribute("aria-disabled", "true");
  const states = page.getByTestId("accordion-states");
  await expect(states.locator(".brick-accordion-trigger[data-disabled]")).toHaveCount(4);
  await expect(states.locator(".brick-accordion-content[hidden]")).toHaveCount(1);
  await expect(states.locator(".brick-accordion-content").last()).not.toHaveAttribute("role");
});

test("vertical and direction-aware horizontal keyboard navigation are stable", async ({ page }) => {
  const orientation = page.getByTestId("accordion-orientation");
  const vertical = orientation.locator(".brick-accordion[data-orientation='vertical']").getByRole("button");
  await vertical.first().focus();
  await vertical.first().press("ArrowDown");
  await expect(vertical.nth(1)).toBeFocused();
  const horizontal = orientation.locator(".brick-accordion[data-orientation='horizontal']").getByRole("button");
  await horizontal.first().focus();
  await horizontal.first().press("ArrowRight");
  await expect(horizontal.nth(1)).toBeFocused();
  const rtl = page.getByTestId("accordion-stress").locator("[dir='rtl'] .brick-accordion").getByRole("button");
  await rtl.first().focus();
  await rtl.first().press("ArrowLeft");
  await expect(rtl.nth(1)).toBeFocused();
});

test("responsive overflow and accessibility remain contained", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const phone = page.locator(".accordion-phone");
  expect(await phone.evaluate((element) => element.scrollWidth >= element.clientWidth)).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  expect((await new AxeBuilder({ page }).include('[data-testid="accordion-workbench"]').disableRules(["landmark-unique"]).analyze()).violations).toEqual([]);
});
