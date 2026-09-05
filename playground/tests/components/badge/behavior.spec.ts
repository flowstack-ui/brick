import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const specimenBadge = ".brick-badge:not([data-playground-specimen-label])";

test.beforeEach(async ({ page }) => {
  await page.goto("/badge");
});

test("Badge overview exposes only canonical defaults and passive semantics", async ({
  page,
}) => {
  await expect(page.getByTestId("badge-workbench")).toBeVisible();
  const badge = page.getByTestId("badge-overview").locator(specimenBadge);
  await expect(badge).toHaveText("Published");
  await expect(badge).toHaveAttribute("data-variant", "soft");
  await expect(badge).toHaveAttribute("data-tone", "neutral");
  await expect(badge).toHaveAttribute("data-size", "md");
  await expect(badge).toHaveAttribute("data-shape", "rounded");
  await expect(badge).not.toHaveAttribute("role");
  await expect(badge).not.toHaveAttribute("tabindex");
});

test("variants change only variant metadata", async ({ page }) => {
  const badges = page.getByTestId("badge-variants").locator(specimenBadge);
  await expect(badges).toHaveCount(4);
  await expect(badges).toHaveText(["Status", "Status", "Status", "Status"]);
  await expect
    .poll(() =>
      badges.evaluateAll((items) =>
        items.map((item) => ({
          shape: item.getAttribute("data-shape"),
          size: item.getAttribute("data-size"),
          tone: item.getAttribute("data-tone"),
          variant: item.getAttribute("data-variant"),
        })),
      ),
    )
    .toEqual([
      { shape: "rounded", size: "md", tone: "neutral", variant: "soft" },
      { shape: "rounded", size: "md", tone: "neutral", variant: "solid" },
      { shape: "rounded", size: "md", tone: "neutral", variant: "outline" },
      { shape: "rounded", size: "md", tone: "neutral", variant: "surface" },
    ]);
});

test("tone matrix covers every variant and semantic tone", async ({ page }) => {
  const region = page.getByTestId("badge-tones");
  await expect(region.locator(specimenBadge)).toHaveCount(24);
  for (const variant of ["soft", "solid", "outline", "surface"]) {
    for (const tone of [
      "neutral",
      "accent",
      "info",
      "success",
      "warning",
      "danger",
    ]) {
      await expect(
        region.locator(
          `${specimenBadge}[data-variant="${variant}"][data-tone="${tone}"]`,
        ),
      ).toHaveCount(1);
    }
  }
  expect(
    await region
      .locator(`${specimenBadge}[data-variant="solid"][data-tone="neutral"]`)
      .evaluate((element) => {
        const probe = document.createElement("span");
        probe.style.color = "var(--brick-color-text-primary)";
        document.body.append(probe);
        const primary = getComputedStyle(probe).color;
        probe.remove();
        const style = getComputedStyle(element);
        return style.backgroundColor !== primary && style.color === primary;
      }),
  ).toBe(true);
  expect(
    await region
      .locator(`${specimenBadge}[data-variant="surface"][data-tone="accent"]`)
      .evaluate((element) => {
        const style = getComputedStyle(element);
        return (
          style.backgroundColor !== "rgba(0, 0, 0, 0)" &&
          style.borderTopColor !== "rgba(0, 0, 0, 0)"
        );
      }),
  ).toBe(true);
});

test("sizes and shapes remain controlled comparisons", async ({ page }) => {
  const sizes = page.getByTestId("badge-sizes").locator(specimenBadge);
  await expect(sizes).toHaveCount(4);
  const metrics = await sizes.evaluateAll((items) =>
    items.map((item) => ({
      fontSize: getComputedStyle(item).fontSize,
      height: item.getBoundingClientRect().height,
    })),
  );
  const heights = metrics.map(({ height }) => height);
  expect(heights[0]).toBeLessThan(heights[1]);
  expect(heights[1]).toBeLessThan(heights[2]);
  expect(metrics[0]).toMatchObject({ fontSize: "10px", height: 16 });
  expect(metrics[3]).toMatchObject({ fontSize: "14px", height: 28 });
  expect(metrics[2].fontSize).toBe("14px");

  const shapes = page.getByTestId("badge-shapes").locator(specimenBadge);
  const radii = await shapes.evaluateAll((items) =>
    items.map((item) => Number.parseFloat(getComputedStyle(item).borderRadius)),
  );
  expect(radii[1]).toBeGreaterThan(radii[0]);
  await expect(shapes).toHaveText(["Status", "Status"]);
});

test("native composition preserves the finished passive root", async ({
  page,
}) => {
  const region = page.getByTestId("badge-composition");
  const iconLabel = region.getByTestId("badge-icon-label");
  await expect(iconLabel).toHaveCSS("gap", "4px");
  await expect(iconLabel.locator(".brick-icon")).toBeVisible();
  await expect(iconLabel).toContainText("Built for business");
  for (const testId of ["badge-render", "badge-as-child"]) {
    const badge = region.getByTestId(testId);
    await expect(badge).toHaveClass(/brick-badge/);
    await expect(badge).toHaveAttribute("data-variant", "soft");
    await expect(badge).not.toHaveAttribute("role");
  }
  await expect(
    region.getByRole("button", { name: "Clear filters" }),
  ).toBeVisible();
  const output = region.locator("[data-rendered-output]");
  await expect(output).toHaveCount(3);
  await expect(output.nth(1)).toContainText('data-testid="badge-render"');
});

test("appearance and customization hooks remain local and exact", async ({
  page,
}) => {
  const scoped = page.getByTestId("badge-appearance").locator(specimenBadge);
  await expect(scoped).toHaveCount(2);
  const custom = page.locator("[data-slot='custom-status']");
  await expect(custom).toHaveText("Status");
  const style = await custom.evaluate((element) => {
    const computed = getComputedStyle(element);
    return {
      background: computed.backgroundColor,
      foreground: computed.color,
      radius: computed.borderRadius,
    };
  });
  expect(style.radius).toBe("3.2px");
  expect(style.background).not.toBe("rgba(0, 0, 0, 0)");
  expect(style.foreground).not.toBe(style.background);
});

test("short labels remain atomic and RTL stays contained", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  const stress = page.getByTestId("badge-stress");
  await expect(stress).toBeVisible();
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth,
    ),
  ).toBe(true);
  for (const badge of await stress.locator(specimenBadge).all()) {
    const box = await badge.boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(320.5);
    await expect(badge).toHaveCSS("white-space", "nowrap");
  }
  await expect(stress.locator(`[dir='rtl'] ${specimenBadge}`)).toHaveText(
    "قيد المراجعة",
  );
});

test("Badge reference route has no automated accessibility violations", async ({
  page,
}) => {
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
