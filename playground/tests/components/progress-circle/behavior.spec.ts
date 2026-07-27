import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/progress-circle"); });

test("defaults, values, tones, sizes, thickness, and caps are complete", async ({ page }) => {
  const root = page.getByTestId("progress-circle-overview").getByRole("progressbar", { name: "Export report" });
  await expect(root).toHaveAttribute("data-state", "indeterminate");
  await expect(root).toHaveAttribute("data-size", "md");
  await expect(root).toHaveAttribute("data-thickness", "regular");
  await expect(root).toHaveAttribute("data-cap", "round");
  await expect(root).toHaveAttribute("data-tone", "accent");
  const states = page.getByTestId("progress-circle-states");
  expect(Number(await states.getByRole("progressbar", { name: "Export report" }).nth(1).locator(".brick-progress-circle__indicator").getAttribute("stroke-dashoffset"))).toBeCloseTo(101.79, 1);
  await expect(states.getByRole("progressbar", { name: "Export report" }).nth(2).locator(".brick-progress-circle__indicator")).toHaveAttribute("stroke-dashoffset", "0");
  for (const tone of ["neutral", "accent", "info", "success", "warning", "danger"]) await expect(page.getByTestId("progress-circle-tones").locator(`.brick-progress-circle[data-tone='${tone}']`)).toHaveCount(1);
  const widths: number[] = [];
  for (const size of ["xs", "sm", "md", "lg", "xl"]) {
    const sizeRoot = page.getByTestId("progress-circle-sizes").locator(`.brick-progress-circle[data-size='${size}']`);
    widths.push((await sizeRoot.locator("svg").boundingBox())!.width);
    const geometry = await sizeRoot.locator(".brick-progress-circle__indicator").evaluate((element) => ({
      dash: Number(element.getAttribute("stroke-dasharray")?.split(" ")[0]),
      offset: Number(element.getAttribute("stroke-dashoffset")),
      total: (element as SVGCircleElement).getTotalLength(),
      vectorEffect: getComputedStyle(element).vectorEffect,
    }));
    expect(geometry.vectorEffect).toBe("none");
    expect(Math.abs(geometry.dash - geometry.total)).toBeLessThan(1);
    expect(geometry.offset / geometry.dash).toBeCloseTo(0.36, 3);
    expect(await sizeRoot.locator(".brick-progress-circle__value").evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
  }
  expect(widths).toEqual([...widths].sort((a, b) => a - b));
  for (const thickness of ["thin", "regular", "thick"]) await expect(page.getByTestId("progress-circle-thickness").locator(`.brick-progress-circle[data-thickness='${thickness}']`)).toHaveCount(1);
  await expect(page.getByTestId("progress-circle-caps").locator(".brick-progress-circle[data-cap='butt']")).toHaveCount(1);
});

test("circle geometry, naming, RTL direction, and custom range stay correct", async ({ page }) => {
  const output = page.getByTestId("progress-circle-workbench").locator("[data-scenario='progress-circle.output']");
  const root = output.getByRole("progressbar", { name: "Export report" });
  const labelledBy = await root.getAttribute("aria-labelledby");
  expect(labelledBy).toBeTruthy();
  await expect(page.locator(`[id='${labelledBy}']`)).toHaveText("Export report");
  await expect(root.locator("svg")).toHaveAttribute("viewBox", "0 0 100 100");
  await expect(root.locator(".brick-progress-circle__indicator")).toHaveAttribute("r", "45");
  const custom = page.getByTestId("progress-circle-content").getByRole("progressbar", { name: "Setup tasks" });
  await expect(custom).toHaveAttribute("aria-valuemin", "1");
  await expect(custom).toHaveAttribute("aria-valuemax", "5");
  await expect(custom).toHaveAttribute("aria-valuenow", "3");
  const ltrTransform = await page.getByTestId("progress-circle-states").locator("svg").nth(1).evaluate((element) => getComputedStyle(element).transform);
  const rtlTransform = await page.getByTestId("progress-circle-stress").getByRole("progressbar", { name: "تصدير التقرير" }).locator("svg").evaluate((element) => getComputedStyle(element).transform);
  expect(rtlTransform).toBe(ltrTransform);
});

test("reduced motion, narrow containment, and accessibility are correct", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.getByTestId("progress-circle-overview").locator(".brick-progress-circle__indicator")).toHaveCSS("animation-name", "none");
  await page.setViewportSize({ width: 390, height: 844 });
  expect((await page.getByTestId("progress-circle-stress").boundingBox())!.width).toBeLessThanOrEqual(390);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
