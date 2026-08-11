import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
test.beforeEach(async ({ page }) => { await page.goto("/tabs"); });

test("defaults expose complete relationships and automatic keyboard activation", async ({ page }) => {
  const root = page.getByTestId("tabs-overview").locator(".brick-tabs");
  await expect(root).toHaveAttribute("data-size", "md");
  await expect(root).toHaveAttribute("data-variant", "line");
  const tabs = root.getByRole("tab");
  await expect(tabs).toHaveCount(3);
  await tabs.first().focus();
  await tabs.first().press("ArrowRight");
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
  await expect(root.getByRole("tabpanel")).toHaveText("Activity panel content.");
});

test("variants, sizes, vertical navigation, fitted width, and disabled state are complete", async ({ page }) => {
  for (const variant of ["line", "solid", "soft", "enclosed"]) {
    const root = page.getByTestId("tabs-variants").locator(`.brick-tabs[data-variant='${variant}']`);
    await expect(root).toHaveCount(1);
    await expect(root.locator(".brick-tabs-indicator")).toHaveCSS("display", variant === "line" ? "block" : "none");
  }
  const heights: number[] = [];
  for (const size of ["sm", "md", "lg"]) heights.push((await page.getByTestId("tabs-sizes").locator(`.brick-tabs[data-size='${size}'] .brick-tabs-trigger`).first().boundingBox())!.height);
  expect(heights[0]).toBeLessThan(heights[1]); expect(heights[1]).toBeLessThan(heights[2]);
  const vertical = page.getByRole("tablist", { name: "Vertical sections" });
  const first = vertical.getByRole("tab").first(); await first.focus(); await first.press("ArrowDown"); await expect(vertical.getByRole("tab").nth(1)).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tab", { name: "Locked" })).toBeDisabled();
});

test("manual activation, composition, overflow, and RTL work", async ({ page }) => {
  const manual = page.getByRole("tablist", { name: "Manual sections" });
  const one = manual.getByRole("tab", { name: "One" }); await one.focus(); await one.press("ArrowRight");
  await expect(manual.getByRole("tab", { name: "One" })).toHaveAttribute("aria-selected", "true");
  await manual.getByRole("tab", { name: "Two" }).press("Enter"); await expect(manual.getByRole("tab", { name: "Two" })).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("[data-adapter='tabs-trigger']")).toHaveAttribute("role", "tab");
  await page.setViewportSize({ width: 390, height: 844 });
  const constrained = page.getByRole("tablist", { name: "Constrained sections" });
  expect(await constrained.evaluate((node) => node.scrollWidth > node.clientWidth)).toBe(true);
  const constrainedBox = await constrained.boundingBox();
  const initiallyVisibleTabs = constrained.getByRole("tab");
  for (const index of [0, 1, 2]) {
    const tabBox = await initiallyVisibleTabs.nth(index).boundingBox();
    expect(tabBox!.x).toBeGreaterThanOrEqual(constrainedBox!.x);
    expect(tabBox!.x + tabBox!.width).toBeLessThanOrEqual(constrainedBox!.x + constrainedBox!.width);
  }
  const rtl = page.getByRole("tablist", { name: "أقسام الحساب" });
  expect(await rtl.evaluate((node) => node.scrollWidth > node.clientWidth)).toBe(true);
  await expect(rtl.getByRole("tab")).toHaveCount(5);
  const rtlBox = await rtl.boundingBox();
  for (const index of [0, 1, 2]) {
    const tabBox = await rtl.getByRole("tab").nth(index).boundingBox();
    expect(tabBox!.x).toBeGreaterThanOrEqual(rtlBox!.x);
    expect(tabBox!.x + tabBox!.width).toBeLessThanOrEqual(rtlBox!.x + rtlBox!.width);
  }
  const rtlFirst = rtl.getByRole("tab").first();
  await rtlFirst.focus();
  await rtlFirst.press("ArrowLeft");
  const rtlActive = rtl.getByRole("tab").nth(1);
  await expect(rtlActive).toHaveAttribute("aria-selected", "true");
  await expect.poll(async () => {
    const activeBox = await rtlActive.boundingBox();
    const indicatorBox = await rtl.locator(".brick-tabs-indicator").boundingBox();
    return {
      x: Math.round(indicatorBox!.x - activeBox!.x),
      width: Math.round(indicatorBox!.width - activeBox!.width),
    };
  }).toEqual({ x: 0, width: 0 });
});

test("Tabs page has no automatically detectable accessibility violations", async ({ page }) => { expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]); });

test("responsive visual layout does not change vertical tab semantics", async ({ page }) => {
  const root = page.getByTestId("tabs-responsive-layout");
  const list = root.getByRole("tablist", { name: "Responsive workflow" });
  await expect(list).toHaveAttribute("data-radius", "none");
  await expect(list).toHaveAttribute("data-trigger-radius", "default");
  await expect(list).toHaveCSS("border-radius", "0px");
  for (const trigger of await list.getByRole("tab").all()) {
    await expect(trigger).not.toHaveCSS("border-radius", "0px");
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(root).toHaveCSS("flex-direction", "column");
  await expect(list).toHaveCSS("grid-template-columns", /.+ .+/);
  expect((await list.boundingBox())!.width).toBeGreaterThan(0);
  expect((await root.getByRole("tabpanel").boundingBox())!.width).toBeGreaterThan(0);

  const first = list.getByRole("tab", { name: "Create" });
  await first.focus();
  await first.press("ArrowDown");
  await expect(list.getByRole("tab", { name: "Build" })).toHaveAttribute(
    "aria-selected",
    "true",
  );

  await page.setViewportSize({ width: 1120, height: 900 });
  await expect(root).toHaveCSS("flex-direction", "row");
  await first.focus();
  const focusGeometry = await list.evaluate((node) => {
    const listStyle = getComputedStyle(node);
    const trigger = node.querySelector<HTMLElement>(".brick-tabs-trigger")!;
    const triggerStyle = getComputedStyle(trigger);
    const ringReach =
      Number.parseFloat(triggerStyle.outlineWidth) +
      Number.parseFloat(triggerStyle.outlineOffset);

    return {
      ringReach,
      paddingBlockStart: Number.parseFloat(listStyle.paddingBlockStart),
      paddingBlockEnd: Number.parseFloat(listStyle.paddingBlockEnd),
      paddingInlineStart: Number.parseFloat(listStyle.paddingInlineStart),
      paddingInlineEnd: Number.parseFloat(listStyle.paddingInlineEnd),
    };
  });
  for (const inset of [
    focusGeometry.paddingBlockStart,
    focusGeometry.paddingBlockEnd,
    focusGeometry.paddingInlineStart,
    focusGeometry.paddingInlineEnd,
  ]) {
    expect(inset).toBeGreaterThanOrEqual(focusGeometry.ringReach);
  }
  const desktopTracks = await list.evaluate((node) =>
    getComputedStyle(node).gridTemplateColumns.split(" ").length,
  );
  expect(desktopTracks).toBe(1);
  await expect(list).toHaveAttribute("aria-orientation", "vertical");
});
