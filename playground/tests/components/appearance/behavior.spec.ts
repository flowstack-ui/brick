import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/appearance");
});

function relativeLuminance(rgb: string) {
  const channels = rgb.match(/[\d.]+/gu)?.slice(0, 3).map(Number) ?? [];
  expect(channels).toHaveLength(3);
  const linear = channels.map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrastRatio(first: string, second: string) {
  const a = relativeLuminance(first);
  const b = relativeLuminance(second);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

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

test("native selection uses one opaque contrast pair in each appearance", async ({ page }) => {
  const lightSurface = page.getByTestId("appearance-light");
  const darkSurface = page.getByTestId("appearance-dark");

  const selectionPaint = async (testId: string) => page.getByTestId(testId).evaluate((element) => {
    const selection = getComputedStyle(element, "::selection");
    const probe = document.createElement("span");
    probe.style.backgroundColor = "var(--brick-color-selection-background)";
    probe.style.color = "var(--brick-color-selection-foreground)";
    element.append(probe);
    const resolved = getComputedStyle(probe);
    const result = {
      background: selection.backgroundColor,
      foreground: selection.color,
      backgroundToken: resolved.backgroundColor,
      foregroundToken: resolved.color,
    };
    probe.remove();
    return result;
  });

  const light = await selectionPaint("appearance-light");
  const dark = await selectionPaint("appearance-dark");

  expect(light.background).toBe(light.backgroundToken);
  expect(light.foreground).toBe(light.foregroundToken);
  expect(dark.background).toBe(dark.backgroundToken);
  expect(dark.foreground).toBe(dark.foregroundToken);
  expect(light.background).not.toBe(dark.background);
  expect(contrastRatio(light.foreground, light.background)).toBeGreaterThanOrEqual(4.5);
  expect(contrastRatio(dark.foreground, dark.background)).toBeGreaterThanOrEqual(4.5);

  const lightAction = lightSurface.getByRole("button", { name: "Continue" });
  const darkAction = darkSurface.getByRole("button", { name: "Continue" });
  await expect.poll(() => lightAction.evaluate((element) =>
    getComputedStyle(element, "::selection").backgroundColor)).toBe(light.background);
  await expect.poll(() => darkAction.evaluate((element) =>
    getComputedStyle(element, "::selection").backgroundColor)).toBe(dark.background);
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
