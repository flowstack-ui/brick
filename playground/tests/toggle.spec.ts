import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/toggle");
});

test("standalone Toggle exposes native pressed behavior and stable labeling", async ({ page }) => {
  const toggle = page.getByRole("button", { name: "★ Favorite" });
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByText("Favorite is on")).toBeVisible();
  await toggle.focus();
  await page.keyboard.press("Space");
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
});

test("closed recipes, sizes, shapes, disabled state, and icon-only naming are rendered", async ({ page }) => {
  const recipes = page.getByTestId("toggle-recipes");
  await expect(recipes.locator(".brick-toggle")).toHaveCount(9);
  for (const variant of ["soft", "outline", "ghost"]) {
    await expect(recipes.locator(`.brick-toggle[data-variant='${variant}']`)).toHaveCount(3);
  }
  await expect(recipes.locator(".brick-toggle[data-state='on']")).toHaveCount(3);
  await expect(recipes.locator(".brick-toggle[data-disabled]")).toHaveCount(3);
  const geometry = page.getByTestId("toggle-sizes-shapes");
  for (const size of ["sm", "md", "lg"]) {
    await expect(geometry.getByRole("button", { name: `${size} toggle` })).toHaveAttribute("data-size", size);
  }
  await expect(geometry.getByRole("button", { name: "Pin project" })).toHaveAttribute("data-icon-only", "");
});

test("single group remains controlled and uses roving keyboard navigation", async ({ page }) => {
  const group = page.getByRole("group", { name: "Project view" });
  const cards = group.getByRole("button", { name: "Cards" });
  const list = group.getByRole("button", { name: "List" });
  await expect(cards).toHaveAttribute("aria-pressed", "true");
  await cards.click();
  await expect(cards).toHaveAttribute("aria-pressed", "true");
  await cards.focus();
  await page.keyboard.press("ArrowRight");
  await expect(list).toBeFocused();
  await page.keyboard.press("Space");
  await expect(list).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByText("Current view: list")).toBeVisible();
  await expect(group).toHaveAttribute("data-attached", "true");
  await expect(group).toHaveAttribute("data-full-width", "");
});

test("multiple separated group owns an array and skips its disabled item", async ({ page }) => {
  const group = page.getByRole("group", { name: "Project filters" });
  const active = group.getByRole("button", { name: "Active" });
  const owned = group.getByRole("button", { name: "Owned by me" });
  const archived = group.getByRole("button", { name: "Archived" });
  await expect(active).toHaveAttribute("aria-pressed", "true");
  await owned.click();
  await expect(owned).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByText("Selected filters: active, owned")).toBeVisible();
  await expect(archived).toBeDisabled();
  await expect(group).toHaveAttribute("data-attached", "false");
});

test("RTL arrows mirror and constrained content remains contained", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  const rtlGroup = page.getByRole("group", { name: "طريقة عرض المشروع" });
  const cards = rtlGroup.getByRole("button", { name: "بطاقات" });
  const list = rtlGroup.getByRole("button", { name: "قائمة" });
  await cards.focus();
  await page.keyboard.press("ArrowLeft");
  await expect(list).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
});

test("Toggle family has no automated accessibility violations", async ({ page }) => {
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test("selected and focus boundaries survive forced colors", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Forced-colors emulation is a Chromium release check.");
  await page.emulateMedia({ forcedColors: "active" });
  await page.reload();
  const selected = page.getByTestId("toggle-recipes").locator(".brick-toggle[data-state='on']").first();
  const styles = await selected.evaluate((element) => {
    const style = getComputedStyle(element);
    return { border: Number.parseFloat(style.borderTopWidth), outline: Number.parseFloat(style.outlineWidth) };
  });
  expect(styles.border).toBeGreaterThanOrEqual(1);
  expect(styles.outline).toBeGreaterThanOrEqual(2);
});
