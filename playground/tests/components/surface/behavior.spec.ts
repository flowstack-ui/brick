import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator } from "@playwright/test";

async function box(locator: Locator) {
  const value = await locator.boundingBox();
  expect(value).not.toBeNull();
  return value!;
}

test.beforeEach(async ({ page }) => {
  await page.goto("/surface");
});

test("default renders one semantic-neutral base surface", async ({ page }) => {
  const surface = page.getByTestId("surface-default");
  await expect(surface).toHaveJSProperty("tagName", "DIV");
  await expect(surface).toHaveClass(/brick-surface/);
  await expect(surface).toHaveAttribute("data-level", "base");
  await expect(surface).toHaveAttribute("data-elevation", "none");
  await expect(surface).toHaveAttribute("data-radius", "surface");
  await expect(surface).toHaveAttribute("data-inset", "none");
  await expect(surface).toHaveAttribute("data-slot", "surface");
  await expect(surface).not.toHaveAttribute("data-bordered");
  await expect(surface).not.toHaveAttribute("role");
  await expect(surface).toHaveCSS("box-sizing", "border-box");
  await expect(surface).toHaveCSS("overflow", "visible");
});

test("levels change only background and labels remain default badges", async ({
  page,
}) => {
  const region = page.getByTestId("surface-levels");
  const surfaces = region.locator(".surface-cell > .brick-surface");
  const backgrounds = new Set<string>();
  let reference: { borderRadius: string; padding: string; boxShadow: string } | null = null;

  for (const [index, level] of ["canvas", "base", "subtle", "raised"].entries()) {
    const surface = surfaces.nth(index);
    await expect(surface).toHaveAttribute("data-level", level);
    const styles = await surface.evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        background: style.backgroundColor,
        borderRadius: style.borderRadius,
        boxShadow: style.boxShadow,
        padding: style.padding,
      };
    });
    backgrounds.add(styles.background);
    reference ??= styles;
    expect(styles.borderRadius).toBe(reference.borderRadius);
    expect(styles.boxShadow).toBe(reference.boxShadow);
    expect(styles.padding).toBe(reference.padding);
  }
  expect(backgrounds.size).toBe(4);

  const label = region.locator("[data-playground-specimen-label]").first();
  await expect(label).toHaveAttribute("data-tone", "neutral");
  await expect(label).toHaveAttribute("data-variant", "soft");
  await expect(label).toHaveAttribute("data-shape", "rounded");
  expect((await box(label)).width).toBeLessThan(
    (await box(label.locator(".."))).width / 2,
  );
});

test("border, elevation, radius, and inset remain independent", async ({
  page,
}) => {
  const borders = page.getByTestId("surface-borders")
    .locator(".surface-cell > .brick-surface");
  await expect(borders.first()).toHaveCSS("border-left-width", "0px");
  await expect(borders.nth(1)).toHaveCSS("border-left-width", "1px");
  expect((await box(borders.first())).width).toBeCloseTo(
    (await box(borders.nth(1))).width,
    0,
  );

  const elevations = page.getByTestId("surface-elevations")
    .locator(".surface-cell > .brick-surface");
  await expect(elevations.first()).toHaveCSS("box-shadow", "none");
  const shadows = new Set<string>();
  for (let index = 1; index < 4; index += 1) {
    const shadow = await elevations.nth(index).evaluate(
      (element) => getComputedStyle(element).boxShadow,
    );
    expect(shadow).not.toBe("none");
    shadows.add(shadow);
  }
  expect(shadows.size).toBe(3);

  const radii = page.getByTestId("surface-radii")
    .locator(".surface-cell > .brick-surface");
  const radiusValues = await radii.evaluateAll((elements) =>
    elements.map((element) => getComputedStyle(element).borderRadius),
  );
  expect(new Set(radiusValues).size).toBe(3);
  expect(radiusValues[0]).toBe("0px");

  const insets = page.getByTestId("surface-insets")
    .locator(".surface-cell > .brick-surface");
  const insetValues = await insets.evaluateAll((elements) =>
    elements.map((element) => parseFloat(getComputedStyle(element).paddingLeft)),
  );
  expect(insetValues).toEqual([0, 12, 24, 32, 48, 64]);

  const responsiveInset = page.getByTestId("surface-responsive-inset");
  await page.setViewportSize({ width: 700, height: 800 });
  await expect(responsiveInset).toHaveCSS("padding-left", "12px");
  await page.setViewportSize({ width: 900, height: 800 });
  await expect(responsiveInset).toHaveCSS("padding-left", "32px");
  await page.setViewportSize({ width: 1280, height: 800 });
  await expect(responsiveInset).toHaveCSS("padding-left", "64px");
});

test("semantic output, ref, and public customization are exact", async ({
  page,
}) => {
  const output = page.locator("[data-rendered-output]").first();
  await expect(output).toContainText("<section");
  await expect(output).toContainText('data-level="raised"');
  await expect(output).not.toContainText("role=");

  const listSurface = page.locator(".surface-host-list > .brick-surface");
  await expect(listSurface).toHaveJSProperty("tagName", "LI");
  await expect(listSurface.locator("xpath=..")).toHaveJSProperty("tagName", "UL");

  await page.getByRole("button", { name: "Inspect ref" }).click();
  await expect(page.getByText("Ref host: SECTION")).toBeVisible();

  const custom = page.getByTestId("surface-customization")
    .locator(".surface-customization__preview > .brick-surface");
  await expect(custom).toHaveCSS("border-radius", "4px");
  const [background, border] = await custom.evaluate((element) => {
    const style = getComputedStyle(element);
    return [style.backgroundColor, style.borderColor];
  });
  expect(background).not.toBe("rgba(0, 0, 0, 0)");
  expect(border).not.toBe("rgba(0, 0, 0, 0)");
});

test("appearance, phone reflow, RTL, focus, and axe remain sound", async ({
  page,
}) => {
  const light = page.getByTestId("surface-light-raised");
  const dark = page.getByTestId("surface-dark-raised");
  const [lightBackground, darkBackground] = await Promise.all([
    light.evaluate((element) => getComputedStyle(element).backgroundColor),
    dark.evaluate((element) => getComputedStyle(element).backgroundColor),
  ]);
  expect(lightBackground).not.toBe(darkBackground);

  await page.setViewportSize({ width: 390, height: 844 });
  const stress = page.getByTestId("surface-stress");
  const cells = stress.locator(":scope > .surface-cell");
  const first = await box(cells.first());
  const second = await box(cells.nth(1));
  expect(second.y).toBeGreaterThan(first.y + first.height - 1);
  expect(first.x).toBeGreaterThanOrEqual(0);
  expect(first.x + first.width).toBeLessThanOrEqual(390);

  const insetMarker = page.getByTestId("surface-insets")
    .locator(".surface-inset-marker")
    .first();
  const insetMarkerBox = await box(insetMarker);
  const insetSurfaceBox = await box(insetMarker.locator("xpath=.."));
  expect(insetMarkerBox.x).toBeGreaterThanOrEqual(insetSurfaceBox.x);
  expect(insetMarkerBox.x + insetMarkerBox.width)
    .toBeLessThanOrEqual(insetSurfaceBox.x + insetSurfaceBox.width);
  await expect(insetMarker).toHaveCSS("border-left-width", "2px");

  const rtl = stress.locator("[dir='rtl'] > .brick-surface");
  const padding = await rtl.evaluate((element) => {
    const style = getComputedStyle(element);
    return [style.paddingLeft, style.paddingRight];
  });
  expect(padding[0]).toBe(padding[1]);

  const focus = stress.getByRole("button", { name: "Focus boundary" });
  await focus.focus();
  await expect(focus).toBeFocused();
  await expect(focus).toHaveCSS("outline-style", "solid");

  const results = await new AxeBuilder({ page })
    .include('[data-testid="surface-stress"]')
    .analyze();
  expect(results.violations).toEqual([]);
});

test("optional media layers fill the root while content remains foreground", async ({
  page,
}) => {
  const surface = page.getByTestId("surface-layered");
  const media = page.getByTestId("surface-layered-media");
  const scrim = page.getByTestId("surface-layered-scrim");
  const content = page.getByTestId("surface-layered-content");
  const imageRoot = media.locator(".brick-image");
  const imageContent = media.locator(".brick-image__content");

  await expect(media).toHaveAttribute("aria-hidden", "true");
  await expect(media).toHaveAttribute("data-slot", "surface-media");
  await expect(scrim).toHaveAttribute("aria-hidden", "true");
  await expect(scrim).toHaveAttribute("data-direction", "inline-start");
  await expect(scrim).toHaveAttribute("data-strength", "strong");
  await expect(content).toHaveAttribute("data-slot", "surface-content");
  await expect(media).toHaveCSS("pointer-events", "none");
  await expect(scrim).toHaveCSS("pointer-events", "none");
  await expect(media).toHaveCSS("overflow", "hidden");

  const [surfaceBox, mediaBox, scrimBox, imageRootBox, imageContentBox] = await Promise.all([
    box(surface),
    box(media),
    box(scrim),
    box(imageRoot),
    box(imageContent),
  ]);
  for (const layer of [mediaBox, scrimBox, imageRootBox]) {
    expect(layer.x).toBeCloseTo(surfaceBox.x, 0);
    expect(layer.y).toBeCloseTo(surfaceBox.y, 0);
    expect(layer.width).toBeCloseTo(surfaceBox.width, 0);
    expect(layer.height).toBeCloseTo(surfaceBox.height, 0);
  }
  const imageContentBoxSize = await imageRoot.evaluate((element) => ({
    height: element.clientHeight,
    width: element.clientWidth,
  }));
  expect(imageContentBox.width).toBeCloseTo(imageContentBoxSize.width, 0);
  expect(imageContentBox.height).toBeCloseTo(imageContentBoxSize.height, 0);

  const stacking = await Promise.all(
    [media, scrim, content].map((part) =>
      part.evaluate((element) => getComputedStyle(element).zIndex),
    ),
  );
  expect(stacking).toEqual(["0", "1", "2"]);

  const results = await new AxeBuilder({ page })
    .include('[data-testid="surface-layered"]')
    .analyze();
  expect(results.violations).toEqual([]);
});

test("scrim strength changes both paint intensity and directional reach", async ({
  page,
}) => {
  const scrims = ["soft", "medium", "strong"].map((strength) =>
    page.getByTestId(`surface-scrim-${strength}`),
  );
  const recipes = await Promise.all(
    scrims.map((scrim) =>
      scrim.evaluate((element) => {
        const style = getComputedStyle(element);
        return {
          backgroundImage: style.backgroundImage,
          gradientStop: style.getPropertyValue(
            "--brick-surface-scrim-gradient-stop",
          ).trim(),
        };
      }),
    ),
  );

  expect(recipes.map(({ gradientStop }) => gradientStop)).toEqual([
    "68%",
    "82%",
    "94%",
  ]);
  expect(new Set(recipes.map(({ backgroundImage }) => backgroundImage)).size)
    .toBe(3);

  const results = await new AxeBuilder({ page })
    .include('[data-testid="surface-scrim-comparison"]')
    .analyze();
  expect(results.violations).toEqual([]);
});
