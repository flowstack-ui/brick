import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

test("Radiomark controlled example keeps a centered gap in both directions", async ({
  page,
}) => {
  for (const direction of ["ltr", "rtl"]) {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/radiomark?exampleDirection=" + direction);
    const button = page.getByRole("button", { name: "Use express delivery" });
    const geometry = await button.evaluate((host) => {
      const mark = host.querySelector(".brick-radiomark")!;
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

test("radiomark filled and forced-color states remain distinguishable", async ({
  page,
  browserName,
}) => {
  await page.goto("/radiomark");
  const filled = page.locator("#filled .brick-radiomark[data-filled]");
  await expect(filled).not.toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(
    page.locator("#filled .brick-radiomark:not([data-filled])"),
  ).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  if (browserName === "webkit") return; // WebKit does not emulate forced-colors.
  await page.emulateMedia({ forcedColors: "active" });
  await expect(
    page.locator("#states .brick-radiomark[data-disabled]"),
  ).toHaveCSS("opacity", "1");
  await expect(
    page.locator("#states .brick-radiomark[data-disabled]"),
  ).toHaveCSS("cursor", "not-allowed");
});
test("forced colors do not turn a disabled unchecked mark into a selected mark", async ({
  page,
}) => {
  await page.goto("/radiomark?qualification=1");
  await page.emulateMedia({ forcedColors: "active" });
  const dots = page.locator(
    '.brick-radiomark[data-disabled][data-state="unchecked"] .brick-radiomark__dot',
  );
  await expect(dots).not.toHaveCount(0);
  for (const dot of await dots.all())
    await expect(dot).toHaveCSS("visibility", "hidden");
});

test("radiomark follows its parent without acquiring radio semantics", async ({
  page,
}) => {
  await page.goto("/radiomark?qualification=1");
  const parent = page.getByRole("button", { name: "Use express delivery" });
  await parent.click();
  await expect(parent).toHaveAttribute("aria-pressed", "true");
  await expect(parent.locator(".brick-radiomark")).toHaveAttribute(
    "data-state",
    "checked",
  );
  await expect(page.getByRole("radio")).toHaveCount(0);
  for (const mark of await page.locator(".brick-radiomark").all()) {
    const box = await mark.boundingBox();
    expect(Math.abs(box!.width - box!.height)).toBeLessThan(1);
  }
});

test("radiomarks remain passive and circular", async ({ page }) => {
  await page.goto("/radiomark?qualification=1");
  const marks = page
    .getByTestId("radiomark-output")
    .locator(".brick-radiomark");
  await expect(marks).toHaveCount(4);
  const box = await marks.first().boundingBox();
  expect(box?.width).toBe(box?.height);
  await expect(marks.first()).toHaveAttribute("aria-hidden", "true");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("Radiomark public recipes, responsive resets and utilities", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1100, height: 900 });
  await page.goto("/radiomark");
  await expect(
    page.getByRole("heading", { name: "Utilities", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("table", { name: "Radiomark props" }),
  ).toBeVisible();
  const subtle = page.locator(
    '#variants .brick-radiomark[data-variant="subtle"][data-state="unchecked"]',
  );
  const soft = page.locator(
    '#variants .brick-radiomark[data-variant="soft"][data-state="unchecked"]',
  );
  await expect(subtle).toHaveCSS(
    "background-color",
    await soft.evaluate((el) => getComputedStyle(el).backgroundColor),
  );
  const disabled = page.locator("#states .brick-radiomark[data-disabled]");
  await expect(disabled).toHaveCSS("opacity", "0.5");
  await expect(disabled).toHaveCSS("cursor", "not-allowed");
  const invalid = page.locator("#states .brick-radiomark[data-invalid]");
  await expect(invalid).toHaveAttribute("aria-hidden", "true");
  await expect(invalid).not.toHaveAttribute("aria-invalid");
  await expect(invalid).not.toHaveAttribute("invalid");
  const responsive = page.locator("#responsive .brick-radiomark");
  await expect(responsive).toHaveCSS("--brick-mark-dot-scale", ".4");
  await page.setViewportSize({ width: 850, height: 900 });
  await expect(responsive).toHaveCSS("width", "24px");
  await expect(responsive).toHaveCSS("--brick-mark-dot-scale", ".4");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(responsive).toHaveCSS("width", "16px");
  await expect(responsive).toHaveCSS("--brick-mark-dot-scale", ".6");
  await expect(responsive).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
test("Radiomark glyph geometry and passive state", async ({ page }) => {
  await page.goto("/radiomark");
  await expect(
    page
      .locator(
        '#variants .brick-radiomark[data-variant="outline"] .brick-radiomark__dot',
      )
      .last(),
  ).toHaveCSS("transform", "matrix(0.6, 0, 0, 0.6, 0, 0)");
  await expect(
    page.locator(
      '#artwork .brick-radiomark[data-state="unchecked"] .brick-radiomark__artwork',
    ),
  ).toHaveCSS("visibility", "hidden");
  const toggle = page.getByRole("button", { name: "Use express delivery" });
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await expect(toggle.locator(".brick-radiomark")).toHaveAttribute(
    "data-state",
    "checked",
  );
  await expect(page.locator(".brick-radiomark[tabindex]")).toHaveCount(0);
});
