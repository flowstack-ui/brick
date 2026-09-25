import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

test("Checkmark controlled example keeps a centered gap in both directions", async ({
  page,
}) => {
  for (const direction of ["ltr", "rtl"]) {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/checkmark?exampleDirection=" + direction);
    const button = page.getByRole("button", { name: "Include archived files" });
    const geometry = await button.evaluate((host) => {
      const mark = host.querySelector(".brick-checkmark")!;
      const row = mark.parentElement!;
      const text = Array.from(row.childNodes).find(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent?.trim(),
      )!;
      const range = document.createRange();
      range.selectNodeContents(text);
      const a = mark.getBoundingClientRect(),
        b = range.getBoundingClientRect();
      return {
        gap: Math.max(b.left - a.right, a.left - b.right),
        width: a.width,
        center: Math.abs((a.top + a.bottom - b.top - b.bottom) / 2),
      };
    });
    expect(geometry.gap).toBeGreaterThanOrEqual(7.5);
    expect(geometry.width).toBe(16);
    expect(geometry.center).toBeLessThan(3);
    await button.click();
    await expect(button).toHaveAttribute("aria-pressed", "true");
  }
});

test("checkmark filled and forced-color states remain distinguishable", async ({
  page,
  browserName,
}) => {
  await page.goto("/checkmark");
  const filled = page.locator("#filled .brick-checkmark[data-filled]");
  await expect(filled).not.toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(
    page.locator("#filled .brick-checkmark:not([data-filled])"),
  ).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  if (browserName === "webkit") return; // WebKit does not emulate forced-colors.
  await page.emulateMedia({ forcedColors: "active" });
  await expect(
    page.locator("#states .brick-checkmark[data-disabled]"),
  ).toHaveCSS("opacity", "1");
  await expect(
    page.locator("#states .brick-checkmark[data-disabled]"),
  ).toHaveCSS("cursor", "not-allowed");
});

test("checkmarks remain passive and square", async ({ page }) => {
  await page.goto("/checkmark?qualification=1");
  const marks = page
    .getByTestId("checkmark-output")
    .locator(".brick-checkmark");
  await expect(marks).toHaveCount(4);
  const box = await marks.first().boundingBox();
  expect(box?.width).toBe(box?.height);
  await expect(marks.first()).toHaveAttribute("aria-hidden", "true");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
test("checkmark state follows its semantic parent across recipes", async ({
  page,
}) => {
  await page.goto("/checkmark?qualification=1");
  const button = page.getByRole("button", { name: "Include archived files" });
  await expect(button).toHaveAttribute("aria-pressed", "false");
  await button.click();
  await expect(button).toHaveAttribute("aria-pressed", "true");
  await expect(button.locator(".brick-checkmark")).toHaveAttribute(
    "data-state",
    "checked",
  );
  for (const mark of await page.locator(".brick-checkmark").all()) {
    const box = await mark.boundingBox();
    expect(Math.abs(box!.width - box!.height)).toBeLessThan(1);
  }
  await expect(
    page.locator('.brick-checkmark[data-variant="inverted"]').first(),
  ).toHaveAttribute("aria-hidden", "true");
});

test("Checkmark public recipes, responsive resets and utilities", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1100, height: 900 });
  await page.goto("/checkmark");
  await expect(
    page.getByRole("heading", { name: "Utilities", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("table", { name: "Checkmark props" }),
  ).toBeVisible();
  const subtle = page.locator(
    '#variants .brick-checkmark[data-variant="subtle"][data-state="unchecked"]',
  );
  const soft = page.locator(
    '#variants .brick-checkmark[data-variant="soft"][data-state="unchecked"]',
  );
  await expect(subtle).toHaveCSS(
    "background-color",
    await soft.evaluate((el) => getComputedStyle(el).backgroundColor),
  );
  const disabled = page.locator("#states .brick-checkmark[data-disabled]");
  await expect(disabled).toHaveCSS("opacity", "0.5");
  await expect(disabled).toHaveCSS("cursor", "not-allowed");
  const invalid = page.locator("#states .brick-checkmark[data-invalid]");
  await expect(invalid).toHaveAttribute("aria-hidden", "true");
  await expect(invalid).not.toHaveAttribute("aria-invalid");
  await expect(invalid).not.toHaveAttribute("invalid");
  const responsive = page.locator("#responsive .brick-checkmark");
  await expect(responsive).toHaveCSS("padding", "2px");
  await page.setViewportSize({ width: 850, height: 900 });
  await expect(responsive).toHaveCSS("width", "24px");

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(responsive).toHaveCSS("width", "16px");
  await expect(responsive).toHaveCSS("padding", "0px");
  await expect(responsive).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
test("Checkmark glyph geometry and passive state", async ({ page }) => {
  await page.goto("/checkmark");
  const large = page.locator('#sizes .brick-checkmark[data-size="lg"]');
  await expect(large).toHaveCSS("padding", "2px");
  await expect(large).toHaveCSS("width", "24px");
  await expect(
    page.locator('#variants .brick-checkmark[data-variant="inverted"]').first(),
  ).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(
    page.locator('#variants .brick-checkmark[data-variant="plain"]').first(),
  ).toHaveCSS("padding", "0px");
  const toggle = page.getByRole("button", { name: "Include archived files" });
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await expect(toggle.locator(".brick-checkmark")).toHaveAttribute(
    "data-state",
    "checked",
  );
  await expect(page.locator(".brick-checkmark[tabindex]")).toHaveCount(0);
});
