import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

const specimenBadge = ".brick-badge:not([data-playground-specimen-label])";

test("documentation covers plain, icon geometry, radius and passive composition", async ({page}) => {
  await page.goto("/badge");
  await expect(page.getByTestId("badge-workbench")).toHaveCount(0);
  await expect(page.locator("#variants .brick-badge")).toHaveCount(5);
  const heights=await page.locator("#variants .brick-badge").evaluateAll(nodes=>nodes.map(n=>n.getBoundingClientRect().height));
  expect(new Set(heights).size).toBe(1);
  const plain=page.locator('#variants .brick-badge[data-variant="plain"]');
  await expect(plain).toHaveCSS("background-color","rgba(0, 0, 0, 0)");
  await expect(plain).toHaveCSS("border-top-color","rgba(0, 0, 0, 0)");
  await expect(page.locator("#sizes .brick-badge")).toHaveCount(5);
  const metrics=await page.locator("#icons .brick-badge").evaluateAll(nodes=>nodes.map(n=>{
    const icon=n.querySelector('.brick-icon')!;const b=icon.getBoundingClientRect();
    return {font:parseFloat(getComputedStyle(n).fontSize),width:b.width,height:b.height,gap:getComputedStyle(n).gap};
  }));
  for(const m of metrics){expect(m.width).toBeCloseTo(m.font,1);expect(m.height).toBeCloseTo(m.font,1);expect(m.gap).toBe("4px");}
  const circle=page.locator('#shapes .brick-badge[data-size="xl"]');
  const box=await circle.boundingBox();expect(box!.width).toBe(44);expect(box!.height).toBe(44);
  const iconBox=await circle.locator('.brick-icon').boundingBox();expect(iconBox!.width).toBe(24);expect(iconBox!.height).toBe(24);
  await expect(circle.getByRole("img",{name:"Verified xl"})).toBeVisible();
  for(const item of await page.locator('#shapes .brick-badge[data-shape="circle"]').all()) {
    const bounds=await item.boundingBox();expect(bounds!.width).toBeCloseTo(bounds!.height,1);
    const artwork=item.locator('.brick-icon');
    if(await artwork.count()){const inner=await artwork.boundingBox();expect(inner!.width).toBeLessThan(bounds!.width);expect(inner!.height).toBeLessThan(bounds!.height);}
  }
  await expect(page.locator("#radius .brick-badge")).toHaveCount(6);
  await expect(page.locator('#composition .brick-badge').first().locator('.brick-text')).toHaveCSS('color',await page.locator('#composition .brick-badge').first().evaluate(n=>getComputedStyle(n).color));
});

test("responsive recipes reset complete paint and geometry in both directions", async ({page})=>{
  await page.goto('/badge');
  const badge=page.locator('#responsive .brick-badge');
  for(const [width,size,variant,height] of [[390,'md','soft',24],[600,'xs','solid',16],[800,'sm','outline',20],[1100,'lg','plain',28],[1400,'md','soft',24],[1100,'lg','plain',28],[800,'sm','outline',20],[600,'xs','solid',16],[390,'md','soft',24]] as const){
    await page.setViewportSize({width,height:900});
    await expect(badge).toHaveCSS('min-height',`${height}px`);
    const paint=await badge.evaluate(n=>({bg:getComputedStyle(n).backgroundColor,border:getComputedStyle(n).borderTopColor}));
    expect(paint.bg==='rgba(0, 0, 0, 0)').toBe(variant==='plain'||variant==='outline');
    expect(paint.border==='rgba(0, 0, 0, 0)').toBe(variant==='plain'||variant==='soft');
  }
});

test("all five paints and six tones retain contrast in dark appearance", async ({page})=>{
  await page.goto('/badge?qualification=1&appearance=dark');
  const results=await new AxeBuilder({page}).include('[data-testid="badge-tones"]').analyze();
  expect(results.violations).toEqual([]);
});

test.beforeEach(async ({ page }) => {
  await page.goto("/badge?qualification=1");
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
  await expect(badges).toHaveCount(5);
  await expect(badges).toHaveText(["Status", "Status", "Status", "Status", "Status"]);
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
      { shape: "rounded", size: "md", tone: "neutral", variant: "plain" },
    ]);
});

test("tone matrix covers every variant and semantic tone", async ({ page }) => {
  const region = page.getByTestId("badge-tones");
  await expect(region.locator(specimenBadge)).toHaveCount(30);
  for (const variant of ["soft", "solid", "outline", "surface", "plain"]) {
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
