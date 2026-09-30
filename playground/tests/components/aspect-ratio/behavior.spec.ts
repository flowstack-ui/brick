import AxeBuilder from "@axe-core/playwright";
import { readFileSync } from "node:fs";
import { expect, test, type Locator } from "../../evidence-test.js";

async function box(locator: Locator) {
  const value = await locator.boundingBox();
  expect(value).not.toBeNull();
  return value!;
}

test.beforeEach(async ({ page }) => {
  await page.route(/https:\/\/(www.youtube.com|www.google.com)\//, route => route.fulfill({ contentType: "text/html", body: "<!doctype html><title>Embed fixture</title><p>External embed fixture</p>" }));
  await page.goto("/aspect-ratio?isolated=0&testMode=1&qualification=1");
  await expect(page.locator("[data-example-canvas]").first()).toBeVisible();
});

test("intro preview uses real source, tabs, responsive inset and centered ratio content", async ({ page }) => {
  const example = page.locator('[data-scenario="aspect-ratio.overview"] [data-example-preview]');
  await expect(example.getByRole("button", { name: "StackBlitz", exact: true })).toBeDisabled();
  await expect(example.locator("iframe")).toHaveCount(0);
  await expect(example.getByRole("tablist").getByRole("button", { name: "StackBlitz" })).toHaveCount(0);
  for (const width of [1280, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    const canvas = example.locator("[data-example-canvas]");
    await expect(canvas).toHaveCSS("padding", width >= 480 ? "48px" : "24px");
    const ratio = await box(canvas.locator(".brick-aspect-ratio"));
    const label = await box(canvas.getByText("16 / 9", { exact: true }));
    expect(ratio.width / ratio.height).toBeCloseTo(16 / 9, 2);
    expect(Math.abs(label.x + label.width / 2 - ratio.x - ratio.width / 2)).toBeLessThan(1);
    expect(Math.abs(label.y + label.height / 2 - ratio.y - ratio.height / 2)).toBeLessThan(1);
    expect((await box(example)).x + (await box(example)).width).toBeLessThanOrEqual(width);
  }
  await example.getByRole("tab", { name: "Code", exact: true }).click();
  await expect(example.getByRole("tab", { name: "Code", exact: true })).toHaveAttribute("aria-selected", "true");
  const source = readFileSync(new URL("../../../src/components/aspect-ratio/examples/AspectRatioBasic.tsx", import.meta.url), "utf8");
  await expect(example.locator("pre code")).toHaveText(source);
  await expect(example.getByRole("button", { name: "Copy code" })).toBeVisible();
  await expect(example.locator('[data-slot="code-block-header"]')).toHaveCount(0);
  await expect(example.locator('[data-example-source]')).toHaveAttribute("data-brick-appearance", "dark");
  const copyButton = example.getByRole("button", { name: "Copy code" });
  await expect(copyButton).toHaveClass(/brick-icon-button/);
  for (const width of [320, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    const copyBox = await box(copyButton);
    const sourceBox = await box(example.locator('[data-slot="code-block-content"]'));
    const surfaceBox = await box(example.locator('[data-example-source]'));
    expect(sourceBox.x + sourceBox.width).toBeLessThanOrEqual(copyBox.x);
    expect(copyBox.x + copyBox.width).toBeLessThan(surfaceBox.x + surfaceBox.width);
    expect(copyBox.y).toBeGreaterThan(surfaceBox.y);
  }
  await example.getByRole("tab", { name: "Code", exact: true }).focus();
  await page.keyboard.press("ArrowLeft");
  await expect(example.getByRole("tab", { name: "Preview", exact: true })).toBeFocused();
  await expect(example.locator("[data-example-canvas]")).toBeVisible();
});

test("documentation separates qualification and demonstrates all public visual controls", async ({ page }) => {
  await page.goto("/aspect-ratio?testMode=1");
  await expect(page.getByTestId("aspect-ratio-ratios")).toHaveCount(0);
  for (const id of ["variants", "radius", "overflow", "content-layout"]) {
    const section = page.locator("#" + id);
    await expect(section.getByRole("tab", { name: "Preview", exact: true })).toHaveCount(1);
    await section.getByRole("tab", { name: "Code", exact: true }).click();
    await expect(section.locator("pre code")).toContainText("export function AspectRatio");
    await section.getByRole("tab", { name: "Preview", exact: true }).click();
  }
  await expect(page.locator("#radius .brick-aspect-ratio")).toHaveCount(15);
  await expect(page.locator("#aspect-ratio-tokens")).toContainText("aspectRatios");
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const [id, maximum] of [["image", 400], ["video", 560], ["responsive", 300]] as const) {
      const frame = page.locator("#" + id + " .brick-frame.brick-aspect-ratio");
      await expect(frame).toHaveCount(1);
      expect((await box(frame)).width).toBeLessThanOrEqual(maximum);
      if (width === 1440) expect((await box(frame)).width).toBeCloseTo(maximum, 0);
    }
  }
  const fill = page.locator('#content-layout [data-content-layout="fill"]');
  const flow = page.locator('#content-layout [data-content-layout="flow"]');
  expect((await box(fill.locator(":scope > *"))).height).toBeCloseTo((await box(fill)).height - 2, 0);
  expect((await box(flow.locator(":scope > *"))).height).toBeLessThan((await box(flow)).height);
});

test("Props lists Brick's real API and keeps the complete table accessible at narrow widths", async ({ page }) => {
  await page.goto("/aspect-ratio?testMode=1#props");
  const table = page.getByRole("table", { name: "AspectRatio.Root props", exact: true });
  await expect(table.getByRole("columnheader")).toHaveText(["Prop", "Default", "Type"]);
  await expect(table.getByRole("rowheader")).toHaveText(["ratio", "variant", "radius", "overflow", "contentLayout", "asChild", "render"]);
  const rows = table.locator("tbody tr");
  const defaults = ["16 / 9", '"plain"', '"none"', '"hidden"', '"fill"', "false", "—"];
  for (let index = 0; index < defaults.length; index++) {
    await expect(rows.nth(index).locator("td").first()).toHaveText(defaults[index]);
    await expect(rows.nth(index).locator("td").last().locator("code")).not.toBeEmpty();
    await expect(rows.nth(index).locator("td").last().locator("p")).not.toBeEmpty();
  }
  const scroll = page.getByRole("region", { name: "AspectRatio.Root props scroll area", exact: true });
  for (const width of [1600, 1280, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 800 });
    const dimensions = await scroll.evaluate(element => ({ client: element.clientWidth, scroll: element.scrollWidth }));
    expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.client + 1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  }
  const accessibility = await new AxeBuilder({ page }).include("#props").analyze();
  expect(accessibility.violations).toEqual([]);
});

test("same-host constraints work on geometry, paint and an action without wrappers", async ({ page }) => {
  for (const width of [390, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    const trial = page.getByTestId("same-host-trial");
    await expect(trial.locator(":scope > *")).toHaveCount(3);
    for (const id of ["ratio", "surface", "button"]) {
      const host = page.getByTestId("same-host-" + id);
      await expect(host).toHaveClass(/brick-frame/);
      expect((await box(host)).width).toBeCloseTo(width < 768 ? 120 : 180, 0);
    }
    await page.getByTestId("same-host-button").focus();
    await expect(page.getByTestId("same-host-button")).toBeFocused();
  }
});

test("documentation anchors, usage snippets and media preserve geometry and source pairing", async ({ page }) => {
  await expect(page.locator("#usage [data-example-source]")).toHaveCount(2);
  await expect(page.locator("#usage [data-example-preview]")).toHaveCount(0);
  for (const [id, file, expectedRatio] of [
    ["image", "AspectRatioImage", 4 / 3], ["video", "AspectRatioVideo", 1],
    ["google-map", "AspectRatioMap", 16 / 9], ["responsive", "AspectRatioResponsive", 16 / 9],
  ] as const) {
    const section = page.locator(`#${id}`);
    await expect(section.getByRole("heading").getByRole("link")).toHaveAttribute("href", `#${id}`);
    const ratio = section.locator(".brick-aspect-ratio");
    const bounds = await box(ratio);
    const viewportRatio = id === "responsive" && page.viewportSize()!.width < 768
      ? 1
      : expectedRatio;
    expect(bounds.width / bounds.height).toBeCloseTo(viewportRatio, 2);
    const child = await box(ratio.locator(":scope > *").first());
    expect(Math.abs(child.width - bounds.width)).toBeLessThan(1);
    expect(Math.abs(child.height - bounds.height)).toBeLessThan(1);
    await section.getByRole("tab", { name: "Code", exact: true }).click();
    const source = readFileSync(new URL(`../../../src/components/aspect-ratio/examples/${file}.tsx`, import.meta.url), "utf8");
    await expect(section.locator("pre code")).toHaveText(source);
    await section.getByRole("tab", { name: "Preview", exact: true }).click();
  }
  await expect(page.locator("#image img")).toBeVisible();
  await expect(page.locator("#video iframe")).toHaveAttribute("allowfullscreen", "");
  await expect(page.locator("#video iframe")).toHaveCSS("border-width", "0px");
  await expect(page.locator("#google-map iframe")).toHaveAttribute("title", "Map of Lagos, Nigeria");
});

test("responsive geometry follows all breakpoints without remounting or inherited ratios", async ({ page }) => {
  await page.getByTestId("ratio-breakpoints").evaluate(el => el.setAttribute("data-persistent", "yes"));
  for (const [width, expectedRatio] of [[390, 1], [480, 4 / 3], [768, 16 / 9], [1024, 2], [1280, 3], [390, 1]]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [id, expected] of [["ratio-breakpoints", expectedRatio], ["ratio-sparse", width >= 1024 ? 1 : 16 / 9], ["ratio-nested", width >= 768 ? 2 : 16 / 9]] as const) {
      const bounds = await box(page.getByTestId(id));
      expect(bounds.width / bounds.height).toBeCloseTo(expected, 2);
    }
    await expect(page.getByTestId("ratio-breakpoints")).toHaveAttribute("data-persistent", "yes");
  }
  await expect(page.getByTestId("ratio-flow").locator(":scope > *")).toHaveCSS("position", "static");
  await expect(page.getByTestId("ratio-breakpoints").locator(":scope > *")).toHaveCSS("position", "absolute");
});

test("documentation typography and spacing follow the shared Brick recipe mapping", async ({ page }) => {
  await expect(page.locator("#usage h2")).toHaveCSS("font-size", "20px");
  await expect(page.locator("#examples > div > h2")).toHaveCSS("font-size", "20px");
  await expect(page.locator("#image h3")).toHaveCSS("font-size", "18px");
  await expect(page.locator("#image p")).toHaveCSS("font-size", "16px");
  await expect(page.locator("#image p")).toHaveAttribute("data-tone", "secondary");
  await expect(page.locator("#usage p")).toHaveAttribute("data-tone", "secondary");
  await expect(page.locator("#image [data-example-canvas]")).toHaveAttribute("data-level", "canvas");
  for (const [selector, property, token] of [
    ["#image p", "color", "--brick-color-text-secondary"],
    ["#image [data-example-canvas]", "backgroundColor", "--brick-color-surface-canvas"],
  ] as const) {
    expect(await page.locator(selector).evaluate((element, { property, token }) => {
      const probe = document.createElement("span");
      probe.style.color = `var(${token})`;
      element.append(probe);
      const expected = getComputedStyle(probe).color;
      probe.remove();
      return getComputedStyle(element)[property] === expected;
    }, { property, token })).toBe(true);
  }
  const gap = async (before: Locator, after: Locator) => {
    const a = await box(before), b = await box(after);
    return b.y - a.y - a.height;
  };
  expect(await gap(page.locator('[data-scenario="aspect-ratio.overview"]'), page.locator("#usage"))).toBeCloseTo(64, 0);
  expect(await gap(page.locator("#usage p"), page.locator("#usage [data-example-source]").first())).toBeCloseTo(24, 0);
  expect(await gap(page.locator("#usage"), page.locator("#examples"))).toBeCloseTo(32, 0);
  expect(await gap(page.locator("#image h3"), page.locator("#image p"))).toBeCloseTo(8, 0);
  expect(await gap(page.locator("#image p"), page.locator("#image [data-example-preview]"))).toBeCloseTo(32, 0);
  expect(await gap(page.locator("#image"), page.locator("#video"))).toBeCloseTo(64, 0);
});

test("outline stays transparent with a visible border in both appearances and forced colors", async ({ page }) => {
  const outline = page.getByTestId("aspect-ratio-variants").locator('[data-variant="outline"]');
  for (const appearance of ["light", "dark"]) {
    await outline.evaluate((element, value) => element.setAttribute("data-brick-appearance", value), appearance);
    await expect(outline).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    await expect(outline).toHaveCSS("border-left-width", "1px");
    await expect(outline).not.toHaveCSS("border-left-color", "rgba(0, 0, 0, 0)");
  }
  await page.emulateMedia({ forcedColors: "active" });
  await expect(outline).toHaveCSS("background-color", /rgba\(\d+, \d+, \d+, 0\)/);
  await expect(outline).toHaveCSS("border-left-width", "1px");
});

test("defaults, ratios, variants, radii, and overflow are deterministic", async ({ page }) => {
  const root = page.getByTestId("aspect-ratio-variants").locator(".brick-aspect-ratio").first();
  await expect(root).toHaveAttribute("data-slot", "aspect-ratio");
  await expect(root).toHaveAttribute("data-variant", "plain");
  await expect(root).toHaveAttribute("data-radius", "none");
  await expect(root).toHaveAttribute("data-overflow", "hidden");
  await expect(root).not.toHaveAttribute("role");
  await expect(root).toHaveCSS("position", "relative");
  await expect(root).toHaveCSS("overflow", "hidden");
  const defaultBox = await box(root);
  expect(defaultBox.width / defaultBox.height).toBeCloseTo(16 / 9, 1);

  const ratioBoxes = await page.getByTestId("aspect-ratio-ratios").locator(".brick-aspect-ratio").evaluateAll(elements => elements.map(element => { const box = element.getBoundingClientRect(); return box.width / box.height; }));
  [1, 4 / 3, 16 / 9, 21 / 9, 3 / 4].forEach((ratio, index) => expect(ratioBoxes[index]).toBeCloseTo(ratio, 1));

  const variants = page.getByTestId("aspect-ratio-variants").locator(".brick-aspect-ratio");
  await expect(variants.nth(0)).toHaveCSS("border-left-width", "0px");
  await expect(variants.nth(2)).toHaveCSS("border-left-width", "1px");
  const radii = await page.getByTestId("aspect-ratio-radii").locator(".brick-aspect-ratio").evaluateAll(elements => elements.map(element => getComputedStyle(element).borderRadius));
  expect(new Set(radii).size).toBe(5);
  await expect(page.getByTestId("aspect-ratio-overflow").locator(".brick-aspect-ratio").nth(0)).toHaveCSS("overflow", "hidden");
  await expect(page.getByTestId("aspect-ratio-overflow").locator(".brick-aspect-ratio").nth(1)).toHaveCSS("overflow", "visible");
});

test("child semantics, composition, customization, and ref remain exact", async ({ page }) => {
  await expect(page.getByRole("img", { name: "Release dashboard preview" })).toBeVisible();
  await expect(page.getByTitle("Product tour")).toBeVisible();
  await expect(page.locator('[data-scenario="aspect-ratio.anatomy"] .brick-aspect-ratio')).toHaveCount(2);
  await page.getByRole("button", { name: "Inspect ref" }).click();
  await expect(page.getByText("Ref host: ARTICLE")).toBeVisible();
  await expect(page.getByLabel("Composed square")).toHaveJSProperty("tagName", "SECTION");
  const invalid = await box(page.getByTestId("aspect-ratio-invalid"));
  expect(invalid.width / invalid.height).toBeCloseTo(16 / 9, 1);
  await expect(page.getByTestId("aspect-ratio-appearance").locator(".brick-badge")).toHaveText(["Light", "Dark", "Customized"]);
  const badgeWidths = await page.getByTestId("aspect-ratio-appearance").locator(".brick-badge").evaluateAll(elements => elements.map(element => element.getBoundingClientRect().width));
  expect(badgeWidths.every(width => width < 8 * 16)).toBe(true);
  await expect(page.getByTestId("aspect-ratio-appearance").getByRole("heading", { name: "Aspect Ratio CSS properties" })).toBeVisible();
  const custom = page.getByTestId("aspect-ratio-appearance").locator(".playground-customization-preview .brick-aspect-ratio");
  await expect(custom).toHaveCSS("border-radius", "16px");
  expect((await box(custom)).width).toBeLessThanOrEqual(32 * 16);
});

test("responsive, RTL, preferences, focus, and accessibility hold", async ({ page }) => {
  await expect(page.getByRole("navigation", { name: "Aspect Ratio scenarios" })).toHaveCount(0);
  const ltr = page.getByTestId("aspect-ratio-stress").locator(".brick-aspect-ratio").nth(0);
  const rtl = page.getByTestId("aspect-ratio-stress").locator(".brick-aspect-ratio").nth(1);
  expect((await box(ltr)).width / (await box(ltr)).height).toBeCloseTo(3 / 4, 1);
  expect((await box(rtl)).width / (await box(rtl)).height).toBeCloseTo(4 / 3, 1);
  await page.setViewportSize({ width: 390, height: 844 });
  const stress = await box(page.getByTestId("aspect-ratio-stress"));
  expect(stress.x).toBeGreaterThanOrEqual(0);
  expect(stress.x + stress.width).toBeLessThanOrEqual(390);
  const focus = page.getByRole("button", { name: "Review release" });
  await focus.focus();
  await expect(focus).toBeFocused();
  const results = await new AxeBuilder({ page }).include('[data-component-page="aspect-ratio"]').exclude("iframe").analyze();
  expect(results.violations).toEqual([]);
});
