import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/appearance");
});

test("Appearance restores complete nested scopes and adds no wrapper", async ({ page }) => {
  const lightOuter = page.getByTestId("appearance-light-outer");
  const lightInner = page.getByTestId("appearance-light-inner");
  const darkMiddle = page.getByTestId("appearance-dark-middle");
  const darkOuter = page.getByTestId("appearance-dark-outer");
  const darkInner = page.getByTestId("appearance-dark-inner");

  await expect(lightInner).toHaveCSS(
    "background-color",
    await lightOuter.evaluate((element) => getComputedStyle(element).backgroundColor),
  );
  await expect(darkInner).toHaveCSS(
    "background-color",
    await darkOuter.evaluate((element) => getComputedStyle(element).backgroundColor),
  );
  await expect(darkMiddle).not.toHaveCSS(
    "background-color",
    await lightOuter.evaluate((element) => getComputedStyle(element).backgroundColor),
  );

  const appBar = page.getByTestId("appearance-app-bar");
  await expect(appBar).toHaveAttribute("data-brick-appearance", "dark");
  await expect(appBar).toHaveAttribute("data-slot", "appbar");
  await expect(appBar).toHaveClass(/brick-app-bar/);
  await expect(appBar).toHaveClass(/brick-appearance/);
});

test("Appearance explicitly scopes portalled visual roots without changing Drawer behavior", async ({ page }) => {
  await page.getByRole("button", { name: "Open dark portal" }).click();
  const content = page.getByTestId("appearance-drawer-content");
  const overlay = page.getByTestId("appearance-drawer-overlay");
  await expect(content).toHaveAttribute("data-brick-appearance", "dark");
  await expect(overlay).toHaveAttribute("data-brick-appearance", "dark");
  await expect(content).toHaveCSS("color-scheme", "dark");
  await page.getByRole("button", { name: "Close review" }).click();
  await expect(content).not.toBeAttached();

  await page.getByRole("button", { name: "Open scoped container" }).click();
  const containedContent = page.getByTestId(
    "appearance-scoped-container-content",
  );
  await expect(containedContent).not.toHaveAttribute(
    "data-brick-appearance",
    "dark",
  );
  await expect(containedContent).toHaveCSS("color-scheme", "dark");
  expect(
    await containedContent.evaluate(
      (element) =>
        element.closest('[data-testid="appearance-scoped-container"]') !== null,
    ),
  ).toBe(true);
  await page
    .getByRole("button", { name: "Close contained review" })
    .click();
  await expect(containedContent).not.toBeAttached();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("theme contract selectors restore the nearest nested appearance", async ({ page }) => {
  const lightOuter = page.getByTestId("theme-contract-light-outer");
  const darkMiddle = page.getByTestId("theme-contract-dark-middle");
  const lightInner = page.getByTestId("theme-contract-light-inner");

  await expect(lightOuter).toHaveCSS(
    "background-color",
    "rgb(255, 255, 255)",
  );
  await expect(darkMiddle).toHaveCSS(
    "background-color",
    "rgb(23, 47, 39)",
  );
  await expect(lightInner).toHaveCSS(
    "background-color",
    "rgb(255, 255, 255)",
  );
  await expect(lightInner).toHaveCSS("color-scheme", "light");
  await expect(darkMiddle).toHaveCSS("color-scheme", "dark");
  await expect(page.getByRole("textbox", { name: "Qualification native control" })).toHaveCSS(
    "color-scheme",
    "light",
  );
  await expect(lightOuter).toHaveCSS("--flowstack-theme-roles-promotion", "#8b5cf6");
});

test("compiled component inputs reach scoped and explicit portal roots", async ({ page }) => {
  await page.getByRole("button", { name: "Open themed scoped portal" }).click();
  const scoped = page.getByTestId("theme-scoped-drawer");
  await expect(scoped).toHaveCSS("border-top-left-radius", "24px");
  await expect(scoped).toHaveCSS("background-color", "rgb(28, 56, 47)");
  await expect(scoped).toHaveCSS("color-scheme", "dark");
  await page.getByRole("button", { name: "Close themed scoped portal" }).click();

  await page.getByRole("button", { name: "Open themed body portal" }).click();
  const explicit = page.getByTestId("theme-explicit-drawer");
  await expect(explicit).toHaveAttribute("data-flowstack-theme", "qualification");
  await expect(explicit).toHaveAttribute("data-brick-appearance", "light");
  await expect(explicit).toHaveCSS("border-top-left-radius", "24px");
  await expect(explicit).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await expect(page.getByTestId("theme-explicit-overlay")).toHaveCSS("color-scheme", "light");
});
