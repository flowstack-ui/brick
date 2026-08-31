import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/toggle");
});

test("Toggle overview preserves the default recipe and native pressed state", async ({
  page,
}) => {
  const overview = page.getByTestId("toggle-overview");
  const toggle = overview.getByRole("button", { name: "Favorite" });
  await expect(toggle).toHaveAttribute("data-variant", "soft");
  await expect(toggle).toHaveAttribute("data-size", "md");
  await expect(toggle).toHaveAttribute("data-shape", "rounded");
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("Toggle comparison scenarios change only their named dimensions", async ({
  page,
}) => {
  const variants = page.getByTestId("toggle-variants").getByRole("button");
  await expect(variants).toHaveCount(4);
  for (const variant of ["solid", "soft", "outline", "ghost"]) {
    const specimen = page
      .getByTestId("toggle-variants")
      .locator(`.brick-toggle[data-variant="${variant}"]`);
    await expect(specimen).toHaveAttribute("data-size", "md");
    await expect(specimen).toHaveAttribute("data-shape", "rounded");
  }

  const sizes = page.getByTestId("toggle-sizes").getByRole("button");
  await expect(sizes).toHaveCount(3);
  for (const size of ["sm", "md", "lg"]) {
    await expect(
      page
        .getByTestId("toggle-sizes")
        .locator(`.brick-toggle[data-size="${size}"]`),
    ).toHaveAttribute("data-variant", "soft");
  }

  const neutral = page
    .getByTestId("toggle-tones")
    .locator('.brick-toggle[data-tone="neutral"]');
  await expect(neutral).toHaveAttribute("data-variant", "solid");
  await expect(neutral).toHaveAttribute("aria-pressed", "true");
  const [accentBackground, neutralBackground] = await Promise.all([
    page
      .getByTestId("toggle-tones")
      .locator('.brick-toggle[data-tone="accent"]')
      .evaluate((element) => getComputedStyle(element).backgroundColor),
    neutral.evaluate((element) => getComputedStyle(element).backgroundColor),
  ]);
  expect(neutralBackground).not.toBe(accentBackground);
  expect(
    await neutral.evaluate((element) => {
      const probe = document.createElement("span");
      probe.style.color = "var(--brick-color-text-primary)";
      document.body.append(probe);
      const primary = getComputedStyle(probe).color;
      probe.remove();
      const style = getComputedStyle(element);
      return style.backgroundColor !== primary && style.color === primary;
    }),
  ).toBe(true);
});

test("Toggle pressed recipes remain visually distinct", async ({ page }) => {
  const states = page.getByTestId("toggle-recipes");
  const solid = states.locator('[data-variant="solid"][data-state="on"]');
  const soft = states.locator('[data-variant="soft"][data-state="on"]');
  const outline = states.locator('[data-variant="outline"][data-state="on"]');
  const ghost = states.locator('[data-variant="ghost"][data-state="on"]');

  const [solidBackground, softBackground, outlineBackground] =
    await Promise.all([
      solid.evaluate((element) => getComputedStyle(element).backgroundColor),
      soft.evaluate((element) => getComputedStyle(element).backgroundColor),
      outline.evaluate((element) => getComputedStyle(element).backgroundColor),
    ]);
  expect(solidBackground).not.toBe(softBackground);
  expect(softBackground).not.toBe(outlineBackground);
  await expect(soft).not.toHaveCSS("box-shadow", "none");
  await expect(outline).toHaveCSS("box-shadow", "none");
  await expect(ghost).toHaveCSS("border-top-color", "rgba(0, 0, 0, 0)");
});

test("Toggle composition, disabled state, customization, and RTL remain observable", async ({
  page,
}) => {
  await expect(page.getByTestId("toggle-render")).toHaveAttribute(
    "aria-pressed",
    "false",
  );
  await expect(page.getByTestId("toggle-as-child")).toHaveAttribute(
    "aria-pressed",
    "false",
  );
  const output = page
    .getByTestId("toggle-composition")
    .locator("[data-rendered-output]");
  await expect(output).toHaveCount(2);
  await expect(output.first()).toContainText('aria-pressed="false"');
  await page.getByTestId("toggle-render").click();
  await expect(output.first()).toContainText('aria-pressed="true"');
  const disabled = page
    .getByTestId("toggle-disabled")
    .getByRole("button", { name: "Preview" });
  await expect(disabled.first()).toBeDisabled();
  await expect(disabled.first()).toHaveCSS("opacity", "0.55");
  await expect(disabled.last()).toHaveCSS("box-shadow", "none");
  expect(
    await disabled.last().evaluate((element) => {
      const probe = document.createElement("span");
      probe.style.color = "var(--brick-color-border-subtle)";
      document.body.append(probe);
      const expected = getComputedStyle(probe).color;
      probe.remove();
      return getComputedStyle(element).borderTopColor === expected;
    }),
  ).toBe(true);
  await expect(page.locator("[data-slot='custom-toggle']")).toHaveCSS(
    "border-radius",
    "12px",
  );
  await expect(page.locator("[data-slot='custom-toggle']")).toHaveCSS(
    "min-height",
    "52px",
  );
  const rtl = page
    .getByTestId("toggle-stress")
    .getByRole("button", { name: "إظهار المشاريع المكتملة" });
  await expect(rtl).toHaveAttribute("aria-pressed", "true");
  await expect(rtl).toHaveCSS("direction", "rtl");
});
