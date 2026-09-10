import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";
import { setAppearance } from "../../visual-harness.js";

test.beforeEach(async ({ page }) => {
  await page.goto("/toggle-group");
});

for (const appearance of ["light", "dark"] as const) {
  test(`ToggleGroup ghost state precedence in ${appearance}`, async ({ page, isMobile }) => {
    test.skip(isMobile, "Fine-pointer hover and mouse-down qualification");
    await setAppearance(page, appearance);
    await page.emulateMedia({ reducedMotion: "reduce" });
    const group = page.getByRole("group", { name: "Project view", exact: true });
    await expect(group).toHaveAttribute("data-tone", "neutral");
    const off = group.getByRole("button", { name: "List", exact: true });
    const on = group.getByRole("button", { name: "Cards", exact: true });
    const bg = (item: typeof on) => item.evaluate(el => getComputedStyle(el).backgroundColor);
    await page.mouse.move(0, 0);
    await expect(off).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    const selected = await bg(on);
    await off.hover();
    const hover = await bg(off);
    expect(hover).not.toBe("rgba(0, 0, 0, 0)");
    expect(hover).not.toBe(selected);
    await on.hover();
    expect(await bg(on)).not.toBe(selected);
    const onHover = await bg(on);
    await page.mouse.down();
    expect(await bg(on)).not.toBe(onHover);
    await page.mouse.up();
    const disabled = page.getByRole("group", { name: "Disabled modes" }).getByRole("button").first();
    const disabledPaint = await bg(disabled);
    await disabled.hover({ force: true });
    expect(await bg(disabled)).toBe(disabledPaint);
    await expect(disabled).toHaveCSS("box-shadow", "none");
    await page.emulateMedia({ forcedColors: "active" });
    await expect(off).toHaveCSS("box-shadow", "none");
  });
}

test("ToggleGroup overview preserves defaults, grouped selection, and roving focus", async ({
  page,
}) => {
  const group = page.getByRole("group", { name: "Project view", exact: true });
  await expect(group).toHaveAttribute("data-variant", "ghost");
  await expect(group).toHaveAttribute("data-size", "md");
  await expect(group).toHaveAttribute("data-shape", "rounded");
  const cards = group.getByRole("button", { name: "Cards" });
  const list = group.getByRole("button", { name: "List" });
  await cards.focus();
  await page.keyboard.press("ArrowRight");
  await expect(list).toBeFocused();
  await page.keyboard.press("Space");
  await expect(list).toHaveAttribute("aria-pressed", "true");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("ToggleGroup supports controlled single and multiple selection", async ({
  page,
}) => {
  const single = page.getByRole("group", { name: "Controlled project view" });
  await single.getByRole("button", { name: "List" }).click();
  await expect(single.getByRole("button", { name: "List" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );

  const multiple = page.getByRole("group", { name: "Project filters" });
  await multiple.getByRole("button", { name: "Owned" }).click();
  await multiple.getByRole("button", { name: "Shared" }).click();
  await expect(multiple.getByRole("button", { name: "Owned" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(
    multiple.getByRole("button", { name: "Shared" }),
  ).toHaveAttribute("aria-pressed", "true");
});

test("ToggleGroup cascades distinct pressed recipes from Root to Item", async ({
  page,
}) => {
  const selectedItem = (variant: string) =>
    page
      .getByRole("group", { name: `${variant} project view` })
      .getByRole("button", { name: "Cards" });
  const solid = selectedItem("solid");
  const soft = selectedItem("soft");
  const outline = selectedItem("outline");
  const ghost = selectedItem("ghost");

  const [solidBackground, softBackground, outlineBackground] =
    await Promise.all([
      solid.evaluate((element) => getComputedStyle(element).backgroundColor),
      soft.evaluate((element) => getComputedStyle(element).backgroundColor),
      outline.evaluate((element) => getComputedStyle(element).backgroundColor),
    ]);
  expect(solidBackground).not.toBe(softBackground);
  expect(softBackground).not.toBe(outlineBackground);
  await expect(soft).toHaveCSS("box-shadow", "none");
  await expect(outline).toHaveCSS("box-shadow", "none");
  await expect(ghost).toHaveCSS("border-top-color", "rgba(0, 0, 0, 0)");

  const neutral = page.getByRole("group", { name: "neutral project view" });
  await expect(neutral).toHaveAttribute("data-tone", "neutral");
  await expect(neutral.getByRole("button", { name: "Cards" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  expect(
    await neutral.getByRole("button", { name: "Cards" }).evaluate((element) => {
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

test("ToggleGroup size specimens reflow before large Items wrap", async ({
  page,
}) => {
  await page.setViewportSize({ width: 900, height: 900 });
  await page.reload();
  const grid = page.getByTestId("toggle-group-sizes");
  const cells = grid.locator(".toggle-group-specimen-cell");
  const [firstCell, lastCell] = await Promise.all([
    cells.first().boundingBox(),
    cells.last().boundingBox(),
  ]);
  expect(firstCell).not.toBeNull();
  expect(lastCell).not.toBeNull();
  expect(lastCell!.width).toBeGreaterThan(firstCell!.width * 1.8);

  const itemBoxes = await page
    .getByRole("group", { name: "lg project view" })
    .getByRole("button")
    .evaluateAll((items) =>
      items.map((item) => {
        const box = item.getBoundingClientRect();
        return { bottom: box.bottom, top: box.top };
      }),
    );
  expect(
    Math.max(...itemBoxes.map((box) => box.top)) -
      Math.min(...itemBoxes.map((box) => box.top)),
  ).toBeLessThanOrEqual(1);
  expect(
    Math.max(...itemBoxes.map((box) => box.bottom)) -
      Math.min(...itemBoxes.map((box) => box.bottom)),
  ).toBeLessThanOrEqual(1);
});

test("ToggleGroup exposes attachment, distribution, disabled, customization, and RTL evidence", async ({
  page,
}) => {
  await expect(
    page.getByRole("group", { name: "Attached project view" }),
  ).toHaveAttribute("data-attached", "true");
  await expect(
    page.getByRole("group", { name: "Full-width project view" }),
  ).toHaveAttribute("data-full-width", "");
  const disabled = page
    .getByRole("group", { name: "Disabled modes" })
    .getByRole("button");
  await expect(disabled.first()).toBeDisabled();
  await expect(disabled.first()).toHaveCSS("opacity", "0.55");
  await expect(disabled.first()).toHaveCSS("box-shadow", "none");
  expect(
    await disabled.first().evaluate((element) => {
      const probe = document.createElement("span");
      probe.style.color = "var(--brick-color-border-subtle)";
      document.body.append(probe);
      const expected = getComputedStyle(probe).color;
      probe.remove();
      return getComputedStyle(element).borderTopColor === expected;
    }),
  ).toBe(true);
  await expect(page.locator("[data-slot='custom-toggle-group']")).toHaveCSS(
    "gap",
    "16px",
  );
  await expect(
    page
      .locator("[data-slot='custom-toggle-group']")
      .getByRole("button", { name: "Cards" }),
  ).toHaveCSS("border-radius", "12px");
  await expect(
    page.getByRole("group", { name: "طريقة عرض المشروع" }),
  ).toHaveCSS("direction", "rtl");
});
