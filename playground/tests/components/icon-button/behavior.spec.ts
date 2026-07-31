import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("IconButton exposes its default named-action anatomy", async ({ page }) => {
  await page.goto("/icon-button");
  const action = page.getByRole("button", { name: "Search workspace" });

  await expect(action).toHaveAttribute("data-variant", "ghost");
  await expect(action).toHaveAttribute("data-tone", "neutral");
  await expect(action).toHaveAttribute("data-size", "md");
  await expect(action).toHaveAttribute("data-shape", "rounded");
  await expect(action.locator(".brick-icon-button__icon")).toHaveAttribute(
    "aria-hidden",
    "true",
  );
  await expect(action.locator("svg")).toHaveCount(1);

  await action.click();
  await expect(page.getByText("Activated 1 time")).toBeVisible();
  await action.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByText("Activated 2 times")).toBeVisible();
});

test("IconButton preserves every supported link composition path", async ({
  page,
}) => {
  await page.goto("/icon-button");

  const direct = page.getByTestId("icon-button-link-href");
  const rendered = page.getByTestId("icon-button-link-render");
  const composed = page.getByTestId("icon-button-link-as-child");

  for (const link of [direct, rendered, composed]) {
    await expect(link).toHaveAttribute("href", "#scenario-icon-button-states");
    await expect(link).not.toHaveAttribute("role", "button");
    await expect(link).toHaveAttribute("aria-label", "Documentation");
    await expect(link).toHaveAttribute("data-variant", "ghost");
    await expect(link).toHaveAttribute("data-tone", "neutral");
    await expect(link).toHaveAttribute("data-size", "md");
    await expect(link).toHaveAttribute("data-shape", "rounded");
    const box = await link.boundingBox();
    expect(box?.height).toBeCloseTo(44, 2);
    expect(box?.width).toBeCloseTo(44, 2);
    expect(await link.locator("svg").boundingBox()).toMatchObject({
      height: 18,
      width: 18,
    });
  }
  await expect(direct.locator(".brick-icon-button__icon")).toHaveCount(1);
  await expect(rendered.locator(".brick-icon-button__icon")).toHaveCount(1);
  await expect(composed.locator(".brick-icon-button__icon")).toHaveCount(0);
  const output = page
    .getByTestId("icon-button-composition")
    .locator("[data-rendered-output]");
  await expect(output).toHaveCount(3);
  await expect(output.first()).toContainText('aria-label="Documentation"');
  const composition = page.getByTestId("icon-button-composition");
  const compositionLabels = composition.locator(".playground-specimen-label");
  await expect(compositionLabels).toHaveText([
    "Direct href",
    "render anchor",
    "asChild anchor",
  ]);
  for (const label of await compositionLabels.all()) {
    const preview = label.locator("..");
    const [labelBox, previewBox, subjectBox] = await Promise.all([
      label.boundingBox(),
      preview.boundingBox(),
      preview.locator(".playground-output-evidence__subject").boundingBox(),
    ]);
    expect(labelBox!.width).toBeLessThan(previewBox!.width / 2);
    expect(subjectBox!.y).toBeGreaterThanOrEqual(labelBox!.y + labelBox!.height);
  }
  await composed.click();
  await expect(page).toHaveURL(/#scenario-icon-button-states$/);
  await expect(page.locator("#scenario-icon-button-states")).toBeInViewport();
});

test("IconButton exposes every closed visual recipe at the promised geometry", async ({
  page,
}) => {
  await page.goto("/icon-button");

  const variants = page
    .getByTestId("icon-button-variants")
    .locator(".brick-icon-button");
  await expect(variants).toHaveCount(4);
  for (const variant of await variants.all()) {
    await expect(variant).toHaveAttribute("data-tone", "neutral");
    await expect(variant).toHaveAttribute("data-size", "md");
    await expect(variant).toHaveAttribute("data-shape", "rounded");
  }

  const tones = page
    .getByTestId("icon-button-tones")
    .locator(".brick-icon-button");
  await expect(tones).toHaveCount(24);
  const toneRecipes = await tones.evaluateAll((elements) =>
    elements.map((element) => ({
      tone: element.getAttribute("data-tone"),
      variant: element.getAttribute("data-variant"),
    })),
  );
  expect(new Set(toneRecipes.map(({ tone }) => tone))).toEqual(
    new Set(["neutral", "accent", "info", "success", "warning", "danger"]),
  );
  expect(new Set(toneRecipes.map(({ variant }) => variant))).toEqual(
    new Set(["solid", "soft", "outline", "ghost"]),
  );
  for (const control of await tones.all()) {
    await expect(control).toHaveAttribute("data-size", "md");
    await expect(control).toHaveAttribute("data-shape", "rounded");
  }

  const expectedSizes = [
    { icon: 14, name: "xs action", target: 28 },
    { icon: 16, name: "sm action", target: 36 },
    { icon: 18, name: "md action", target: 44 },
    { icon: 20, name: "lg action", target: 52 },
    { icon: 24, name: "xl action", target: 60 },
  ];
  for (const expected of expectedSizes) {
    const control = page.getByRole("button", { name: expected.name });
    expect(await control.boundingBox()).toMatchObject({
      height: expected.target,
      width: expected.target,
    });
    expect(await control.locator("svg").boundingBox()).toMatchObject({
      height: expected.icon,
      width: expected.icon,
    });
    await expect(control).toHaveAttribute("data-variant", "ghost");
    await expect(control).toHaveAttribute("data-tone", "neutral");
    await expect(control).toHaveAttribute("data-shape", "rounded");
  }

  const rounded = page.getByRole("button", { name: "rounded action" });
  const circle = page.getByRole("button", { name: "circle action" });
  for (const control of [rounded, circle]) {
    await expect(control).toHaveAttribute("data-variant", "ghost");
    await expect(control).toHaveAttribute("data-tone", "neutral");
    await expect(control).toHaveAttribute("data-size", "md");
  }
  const [roundedRadius, circleRadius] = await Promise.all([
    rounded.evaluate((element) => Number.parseFloat(getComputedStyle(element).borderRadius)),
    circle.evaluate((element) => Number.parseFloat(getComputedStyle(element).borderRadius)),
  ]);
  expect(circleRadius).toBeGreaterThan(roundedRadius);
});

test("IconButton keeps one decorative icon and complete names across states", async ({
  page,
}) => {
  await page.goto("/icon-button");

  const svgAction = page.getByRole("button", { name: "Search projects" });
  const imageAction = page.getByRole("button", {
    name: "Open Brick resources",
  });
  const disabled = page.getByRole("button", { name: "Disabled search" });
  const loading = page.getByRole("button", {
    exact: true,
    name: "Loading search",
  });
  const unavailableLoading = page.getByRole("button", {
    name: "Unavailable loading search",
  });

  await expect(svgAction.locator(".brick-icon-button__icon")).toHaveAttribute(
    "aria-hidden",
    "true",
  );
  await expect(imageAction).toHaveAttribute(
    "aria-labelledby",
    "icon-button-image-label",
  );
  await expect(imageAction.locator("img")).toHaveAttribute("alt", "");
  await expect(imageAction.locator("img")).toHaveAttribute(
    "src",
    "/assets/icon-button/brick-image.png",
  );
  await expect(disabled).toBeDisabled();
  await expect(loading).toHaveAttribute("aria-busy", "true");
  await expect(unavailableLoading).toBeDisabled();
  await expect(unavailableLoading).toHaveAttribute("aria-busy", "true");

  for (const control of [
    svgAction,
    imageAction,
    disabled,
    loading,
    unavailableLoading,
  ]) {
    expect(await control.boundingBox()).toMatchObject({ height: 44, width: 44 });
    await expect(control).toHaveAttribute("data-variant", "ghost");
    await expect(control).toHaveAttribute("data-tone", "neutral");
    await expect(control).toHaveAttribute("data-size", "md");
    await expect(control).toHaveAttribute("data-shape", "rounded");
  }

  const spinner = await loading.evaluate((element) => {
    const style = getComputedStyle(element, "::after");
    return {
      height: style.height,
      insetBlockStart: style.insetBlockStart,
      insetInlineStart: style.insetInlineStart,
      width: style.width,
    };
  });
  expect(spinner).toEqual({
    height: "18px",
    insetBlockStart: "21px",
    insetInlineStart: "21px",
    width: "18px",
  });

  await page.getByRole("button", { name: "RTL", exact: true }).click();
  const rtlSpinner = await loading.evaluate((element) => {
    const style = getComputedStyle(element, "::after");
    return {
      animationName: style.animationName,
      insetBlockStart: style.insetBlockStart,
      insetInlineStart: style.insetInlineStart,
    };
  });
  expect(rtlSpinner).toEqual({
    animationName: "brick-button-spin-rtl",
    insetBlockStart: "21px",
    insetInlineStart: "21px",
  });
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("IconButton exposes appearance and supported customization hooks", async ({
  page,
}) => {
  await page.goto("/icon-button");

  const specimenGrid = page.getByTestId("icon-button-variants");
  const specimenGridStyle = await specimenGrid.evaluate((element) => ({
    borderWidth: getComputedStyle(element).borderWidth,
    gap: parseFloat(getComputedStyle(element).gap),
  }));
  expect(specimenGridStyle.borderWidth).toBe("0px");
  expect(specimenGridStyle.gap).toBeGreaterThanOrEqual(16);

  const appearanceGrid = page.getByTestId("icon-button-appearance");
  const appearanceGridStyle = await appearanceGrid.evaluate((element) => ({
    borderWidth: getComputedStyle(element).borderWidth,
    gap: parseFloat(getComputedStyle(element).gap),
  }));
  expect(appearanceGridStyle.borderWidth).toBe("0px");
  expect(appearanceGridStyle.gap).toBeGreaterThanOrEqual(16);
  const appearancePanels = appearanceGrid.locator(".icon-button-appearance-panel");
  await expect(appearancePanels).toHaveCount(2);
  for (const panel of await appearancePanels.all()) {
    const layout = await panel.evaluate((element) => {
      const label = element.querySelector<HTMLElement>(".playground-specimen-label")!;
      const preview = element.querySelector<HTMLElement>(".icon-button-appearance-panel__preview")!;
      return {
        gap: parseFloat(getComputedStyle(element).gap),
        labelWidth: label.getBoundingClientRect().width,
        panelWidth: element.getBoundingClientRect().width,
        separated: preview.getBoundingClientRect().top > label.getBoundingClientRect().bottom,
      };
    });
    expect(layout.gap).toBeGreaterThanOrEqual(16);
    expect(layout.labelWidth).toBeLessThan(layout.panelWidth / 2);
    expect(layout.separated).toBe(true);
  }

  const customized = page.getByTestId("icon-button-token-customization");
  await expect(customized).toHaveCSS("background-color", "rgb(107, 47, 136)");
  await expect(customized).toHaveCSS("border-color", "rgb(107, 47, 136)");
  await expect(customized).toHaveCSS("color", "rgb(255, 255, 255)");

  const hooked = page.locator(
    '.icon-button-customization [data-slot="custom-icon-action"]',
  );
  await expect(hooked).toHaveClass(/dashed-icon-action/);
  await expect(hooked).toHaveAttribute("data-slot", "custom-icon-action");
  await expect(hooked).toHaveAttribute("data-variant", "ghost");
  await expect(hooked).toHaveAttribute("data-tone", "neutral");
  await expect(hooked).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(hooked).toHaveCSS("border-top-style", "dashed");
  await expect(hooked).toHaveCSS("border-top-width", "2px");

  for (const testId of [
    "icon-button-appearance-light",
    "icon-button-appearance-dark",
  ]) {
    const control = page.getByTestId(testId);
    await expect(control).toHaveAttribute("aria-label", "Search");
    await expect(control).toHaveAttribute("data-variant", "ghost");
    await expect(control).toHaveAttribute("data-tone", "neutral");
    await expect(control).toHaveAttribute("data-size", "md");
    await expect(control).toHaveAttribute("data-shape", "rounded");
  }

  const customizationCode = page
    .getByRole("heading", { name: "Component CSS properties" })
    .locator("..")
    .locator("code");
  await expect(customizationCode).toContainText(
    "--brick-icon-button-background-hover",
  );
  await expect(customizationCode).toContainText(
    "--brick-icon-button-background-pressed",
  );
});

test("IconButton remains square in constrained and RTL content", async ({
  page,
}) => {
  await page.setViewportSize({ width: 256, height: 720 });
  await page.goto("/icon-button");

  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
    ),
  ).toBe(true);

  const constrained = page.getByRole("button", {
    name: "Open a very detailed workspace navigation menu",
  });
  const constrainedBox = await constrained.boundingBox();
  expect(constrainedBox?.width).toBe(constrainedBox?.height);

  const rtlMenu = page.getByRole("button", { name: "فتح القائمة" });
  const rtlSearch = page.getByRole("button", { name: "البحث", exact: true });
  for (const control of [rtlMenu, rtlSearch]) {
    const box = await control.boundingBox();
    expect(box?.width).toBe(box?.height);
    await expect(control).toHaveCSS("direction", "rtl");
  }
});

test("IconButton honors reduced motion and forced-color boundaries", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "chromium",
    "Forced-colors emulation is a Chromium release check.",
  );
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  await page.goto("/icon-button");

  const loading = page.getByRole("button", {
    exact: true,
    name: "Loading search",
  });
  await expect(loading).toHaveCSS("transition-duration", "0s");
  expect(
    await loading.evaluate(
      (element) => getComputedStyle(element, "::after").animationDuration,
    ),
  ).toBe("1.4s");

  const outline = page.getByRole("button", { name: "outline menu" });
  expect(
    await outline.evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).borderTopWidth),
    ),
  ).toBeGreaterThanOrEqual(1);
});
