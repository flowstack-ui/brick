import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/group");
});

test("default is one role-free inline cluster", async ({ page }) => {
  const group = page.getByTestId("group-default");
  await expect(group).toHaveJSProperty("tagName", "DIV");
  await expect(group).toHaveClass(/brick-group/);
  await expect(group).toHaveAttribute("data-orientation", "horizontal");
  await expect(group).toHaveAttribute("data-slot", "group");
  await expect(group).not.toHaveAttribute("role");
  await expect(group).toHaveCSS("display", "inline-flex");
  await expect(group).toHaveCSS("gap", "8px");
});

test("attached controls share borders and keep focus above siblings", async ({
  page,
}) => {
  const group = page.getByTestId("group-attached").getByRole("group");
  const controls = group.getByRole("button");
  await expect(group).toHaveCSS("gap", "0px");
  await expect(controls.nth(0)).toHaveCSS("border-top-right-radius", "0px");
  await expect(controls.nth(1)).toHaveCSS("border-radius", "0px");
  await expect(controls.nth(2)).toHaveCSS("border-top-left-radius", "0px");

  const first = await controls.nth(0).boundingBox();
  const second = await controls.nth(1).boundingBox();
  expect(first).not.toBeNull();
  expect(second).not.toBeNull();
  expect(second!.x).toBeCloseTo(first!.x + first!.width - 1, 1);

  await controls.nth(1).focus();
  await expect(controls.nth(1)).toBeFocused();
  await expect(controls.nth(1)).toHaveCSS("z-index", "2");
  await expect(controls.nth(1)).toHaveCSS("outline-style", "solid");
});

test("orientation, growth, RTL, narrow containment, and axe remain valid", async ({
  page,
}) => {
  const vertical = page.getByRole("group", { name: "Move controls" });
  await expect(vertical).toHaveCSS("flex-direction", "column");
  const verticalButtons = vertical.getByRole("button");
  const top = await verticalButtons.nth(0).boundingBox();
  const bottom = await verticalButtons.nth(1).boundingBox();
  expect(bottom!.y).toBeCloseTo(top!.y + top!.height - 1, 1);

  const grow = page.locator(".brick-group[data-grow]");
  const growBox = await grow.boundingBox();
  const growButtons = grow.getByRole("button");
  expect((await growButtons.nth(0).boundingBox())!.width).toBeCloseTo(
    (growBox!.width - 8) / 2,
    0,
  );

  const rtl = page.getByRole("group", { name: "عناصر التحكم" });
  const rtlButtons = rtl.getByRole("button");
  await expect(rtlButtons.nth(0)).toHaveCSS("border-top-left-radius", "0px");
  await expect(rtlButtons.nth(2)).toHaveCSS("border-top-right-radius", "0px");

  await page.setViewportSize({ width: 320, height: 720 });
  await expect(page.locator(".group-narrow")).toHaveCSS("overflow-x", "auto");

  await page.emulateMedia({ forcedColors: "active" });
  await rtlButtons.nth(1).focus();
  await expect(rtlButtons.nth(1)).toHaveCSS("outline-style", "solid");
  await expect(rtlButtons.nth(1)).toHaveCSS("z-index", "2");

  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
