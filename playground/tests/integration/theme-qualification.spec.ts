import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("the query-selected theme is present before application code and follows catalog navigation", async ({ page, isMobile }) => {
  await page.goto("/button?theme=qualification");

  await expect(page.locator("html")).toHaveAttribute("data-flowstack-theme", "qualification");
  await expect(page.getByRole("button", { name: "Qualification", exact: true })).toHaveAttribute("data-state", "on");
  await expect(page.getByRole("button", { name: "Publish project", exact: true })).toHaveCSS(
    "background-color",
    "rgb(0, 97, 84)",
  );

  if (isMobile) {
    await page.getByRole("button", { name: "Open component navigation" }).click();
  }

  const componentNavigation = isMobile
    ? page
        .getByRole("dialog", { name: "Brick components" })
        .getByRole("navigation", { name: "Component navigation" })
    : page.getByRole("navigation", { name: "Component navigation" });
  await componentNavigation.getByRole("link", { name: "Card", exact: true }).click();
  await expect(page).toHaveURL(/\/card\?theme=qualification$/);
  await expect(page.locator("html")).toHaveAttribute("data-flowstack-theme", "qualification");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("system appearance resolves through the generated light and dark maps", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/button?theme=qualification");
  const root = page.locator("html");
  await expect(root).toHaveCSS("color-scheme", "light dark");
  await expect(root).toHaveCSS("--brick-color-accent-solid", "#006154");

  await page.emulateMedia({ colorScheme: "dark" });
  await expect(root).toHaveCSS("--brick-color-accent-solid", "#7dd1bd");
});

test("the generated theme remains legible under user preference media", async ({ browserName, page }) => {
  await page.emulateMedia({
    colorScheme: "dark",
    forcedColors: browserName === "chromium" ? "active" : "none",
    reducedMotion: "reduce",
  });
  await page.goto("/appearance?theme=qualification");
  await expect(page.locator("html")).toHaveAttribute("data-flowstack-theme", "qualification");
  await expect(page.locator("html")).toHaveCSS("--brick-color-focus-ring", "#ff9a52");
  await expect(page.locator("#scenario-appearance-stress")).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
