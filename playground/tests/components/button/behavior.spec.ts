import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("Button exposes the approved recipes and native semantics", async ({
  page,
}) => {
  await page.goto("/button");

  const overview = page.getByTestId("button-overview");
  const primary = overview.getByRole("button", { name: "Publish project" });
  await expect(primary).toHaveAttribute("data-variant", "solid");
  await expect(primary).toHaveAttribute("data-tone", "accent");
  await expect(primary).toHaveAttribute("data-size", "md");
  await expect(primary).toHaveAttribute("data-shape", "rounded");
  await expect(primary.locator(".brick-button__icon")).toHaveCount(0);

  await primary.click();
  await expect(overview.getByText("Pressed 1 time")).toBeVisible();

  for (const testId of [
    "button-link-href",
    "button-link-as-child",
    "button-link-render",
  ]) {
    const link = page.getByTestId(testId);
    await expect(link).toHaveAttribute("href", "#scenario-button-states");
    await expect(link).toHaveAttribute("data-variant", "solid");
    await expect(link).toHaveAttribute("data-tone", "accent");
    await expect(link).toHaveAttribute("data-size", "md");
    await expect(link).toHaveAttribute("data-shape", "rounded");
  }
  const output = page
    .getByTestId("button-composition")
    .locator("[data-rendered-output]");
  await expect(output).toHaveCount(3);
  await expect(output.first()).toContainText('href="#scenario-button-states"');
  await page.getByTestId("button-link-as-child").click();
  await expect(page).toHaveURL(/#scenario-button-states$/);
  await expect(page.locator("#scenario-button-states")).toBeInViewport();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("Button specimens change only the dimension owned by their scenario", async ({
  page,
}) => {
  await page.goto("/button");

  const variants = page.getByTestId("button-variants").locator(".brick-button");
  await expect(variants).toHaveCount(4);
  for (const control of await variants.all()) {
    await expect(control).toHaveText("Action");
    await expect(control).toHaveAttribute("data-tone", "accent");
    await expect(control).toHaveAttribute("data-size", "md");
    await expect(control).toHaveAttribute("data-shape", "rounded");
  }

  const tones = page.getByTestId("button-tones").locator(".brick-button");
  await expect(tones).toHaveCount(24);
  for (const control of await tones.all()) {
    await expect(control).toHaveText("Action");
    await expect(control).toHaveAttribute("data-size", "md");
    await expect(control).toHaveAttribute("data-shape", "rounded");
  }
  expect(
    await page
      .getByTestId("button-tones")
      .locator('.brick-button[data-variant="solid"][data-tone="neutral"]')
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

  const shapes = page.getByTestId("button-shapes").locator(".brick-button");
  await expect(shapes).toHaveCount(3);
  for (const control of await shapes.all()) {
    await expect(control).toHaveText("Action");
    await expect(control).toHaveAttribute("data-variant", "solid");
    await expect(control).toHaveAttribute("data-tone", "accent");
    await expect(control).toHaveAttribute("data-size", "md");
  }

  for (const testId of [
    "button-start-icon",
    "button-end-icon",
    "button-disabled",
    "button-loading",
  ]) {
    const control = page.getByTestId(testId);
    await expect(control).toHaveText("Action");
    await expect(control).toHaveAttribute("data-variant", "solid");
    await expect(control).toHaveAttribute("data-tone", "accent");
    await expect(control).toHaveAttribute("data-size", "md");
    await expect(control).toHaveAttribute("data-shape", "rounded");
  }
  const disabled = page.getByTestId("button-disabled");
  await expect(disabled).toHaveCSS("opacity", "1");
  expect(
    await disabled.evaluate((element) => {
      const probe = document.createElement("span");
      probe.style.color = "var(--brick-color-text-disabled)";
      document.body.append(probe);
      const expected = getComputedStyle(probe).color;
      probe.remove();
      return getComputedStyle(element).color === expected;
    }),
  ).toBe(true);
  expect(
    await disabled.evaluate((element) => {
      const probe = document.createElement("span");
      probe.style.color = "var(--brick-color-border-subtle)";
      document.body.append(probe);
      const expected = getComputedStyle(probe).color;
      probe.remove();
      return getComputedStyle(element).borderTopColor === expected;
    }),
  ).toBe(true);

  const consumerHooks = page.locator(
    '.button-customization [data-slot="custom-action"]',
  );
  await expect(consumerHooks).toHaveAttribute("data-variant", "solid");
  await expect(consumerHooks).toHaveAttribute("data-tone", "accent");
  await expect(consumerHooks).toHaveClass(/dashed-action/);
  await expect(consumerHooks).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(consumerHooks).toHaveCSS("border-top-style", "dashed");
  await expect(consumerHooks).toHaveCSS("letter-spacing", "0.6px");

  const tokenCustomization = page.getByTestId("button-token-customization");
  await expect(tokenCustomization).toHaveText("Action");
  await expect(tokenCustomization).toHaveCSS(
    "background-color",
    "rgb(107, 47, 136)",
  );
  await expect(tokenCustomization).toHaveCSS("color", "rgb(255, 255, 255)");

  const customizationCode = page
    .getByRole("heading", { name: "Component CSS properties" })
    .locator("..")
    .locator("code");
  await expect(customizationCode).toContainText(
    "--brick-button-background-hover",
  );
  await expect(customizationCode).toContainText(
    "--brick-button-background-pressed",
  );

  const rtl = page.getByRole("button", {
    name: "متابعة إعداد مساحة العمل",
  });
  await expect(rtl).toHaveAttribute("data-variant", "solid");
  await expect(rtl).toHaveAttribute("data-tone", "accent");
  await expect(rtl).not.toHaveAttribute("data-full-width");
});

test("Button native actions compose with Brick Form and Field", async ({
  page,
}) => {
  await page.goto("/button");

  const form = page.getByRole("form", {
    name: "Button native form example",
  });
  const field = form.locator(".brick-field");
  const input = form.getByRole("textbox", { name: "Project name" });
  const inputRoot = field.locator(".brick-input");

  await expect(form).toHaveClass(/brick-form/);
  await expect(field).toHaveCount(1);
  await expect(field.locator("label")).toHaveAttribute(
    "for",
    "button-project-control",
  );
  const [labelBox, inputBox, labelPadding] = await Promise.all([
    field.locator("label").boundingBox(),
    inputRoot.boundingBox(),
    field
      .locator("label")
      .evaluate((element) => getComputedStyle(element).paddingInlineStart),
  ]);
  expect(labelBox?.x).toBe(inputBox?.x);
  expect(labelPadding).toBe("0px");
  await expect(form.getByRole("button", { name: "Reset" })).toHaveAttribute(
    "data-variant",
    "solid",
  );
  await expect(form.getByRole("button", { name: "Reset" })).toHaveAttribute(
    "data-tone",
    "neutral",
  );

  await input.fill("Documentation refresh");
  await form.getByRole("button", { name: "Save form" }).click();
  await expect(form).toHaveAttribute("data-submitted", "");
  await expect(
    form.getByText('Submitted "Documentation refresh".'),
  ).toBeVisible();

  await form.getByRole("button", { name: "Reset" }).click();
  await expect(input).toHaveValue("Mobile storefront");
  await expect(form).not.toHaveAttribute("data-submitted");
  await expect(form.getByText('Reset to "Mobile storefront".')).toBeVisible();
});

test("Button preserves loading layout and adopted target sizes", async ({
  page,
}) => {
  await page.goto("/button");

  const loading = page.getByTestId("button-loading");
  await expect(loading).toHaveAttribute("aria-busy", "true");
  const loadingBefore = await loading.boundingBox();
  await expect(loading).toHaveAttribute("data-loading", "");
  const loadingAfter = await loading.boundingBox();
  expect(loadingAfter).toEqual(loadingBefore);

  const sizeCanvas = page.getByTestId("button-sizes");
  const expected = { xs: 28, sm: 36, md: 44, lg: 52, xl: 60 } as const;
  for (const [size, minimum] of Object.entries(expected)) {
    const control = sizeCanvas.locator(`.brick-button[data-size="${size}"]`);
    await expect(control).toHaveAttribute("data-variant", "solid");
    await expect(control).toHaveAttribute("data-tone", "accent");
    await expect(control).toHaveAttribute("data-shape", "rounded");
    const box = await control.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(minimum);
  }
});

test("Button keeps standard icons token-sized while its slot follows larger component content", async ({
  page,
}) => {
  await page.goto("/button");

  const button = page.getByTestId("button-end-icon");
  const icon = button.locator(".brick-button__icon");
  const svg = icon.locator("svg");
  const [iconBox, svgBox] = await Promise.all([
    icon.boundingBox(),
    svg.boundingBox(),
  ]);
  expect(iconBox).toEqual(svgBox);
  expect(svgBox?.width).toBe(18);
  expect(svgBox?.height).toBe(18);
});

test("Button keeps loading centered and directional icons semantic in RTL", async ({
  page,
}) => {
  await page.goto("/button");

  const loading = page.getByTestId("button-loading");
  await page.addStyleTag({
    content:
      ".brick-button[data-loading]::after { animation-play-state: paused !important; animation-delay: 0s !important; }",
  });
  const readSpinnerCenter = () =>
    loading.evaluate((element) => {
      const button = element.getBoundingClientRect();
      const buttonStyle = getComputedStyle(element);
      const pseudo = getComputedStyle(element, "::after");
      const matrix = new DOMMatrixReadOnly(pseudo.transform);
      const spinnerWidth = Number.parseFloat(pseudo.width);
      const spinnerX =
        buttonStyle.direction === "rtl"
          ? button.right -
            Number.parseFloat(buttonStyle.borderRightWidth) -
            Number.parseFloat(pseudo.right) -
            spinnerWidth +
            matrix.e +
            spinnerWidth / 2
          : button.left +
            Number.parseFloat(buttonStyle.borderLeftWidth) +
            Number.parseFloat(pseudo.left) +
            matrix.e +
            spinnerWidth / 2;
      const spinnerY =
        button.top +
        Number.parseFloat(buttonStyle.borderTopWidth) +
        Number.parseFloat(pseudo.top) +
        matrix.f +
        Number.parseFloat(pseudo.height) / 2;
      return {
        buttonX: button.left + button.width / 2,
        buttonY: button.top + button.height / 2,
        spinnerX,
        spinnerY,
      };
    });
  const ltrSpinnerCenter = await readSpinnerCenter();
  expect(ltrSpinnerCenter.spinnerX).toBeCloseTo(ltrSpinnerCenter.buttonX, 0);
  expect(ltrSpinnerCenter.spinnerY).toBeCloseTo(ltrSpinnerCenter.buttonY, 0);

  await page.getByRole("button", { name: "RTL", exact: true }).click();
  const rtlSpinnerCenter = await readSpinnerCenter();
  expect(rtlSpinnerCenter.spinnerX).toBeCloseTo(rtlSpinnerCenter.buttonX, 0);
  expect(rtlSpinnerCenter.spinnerY).toBeCloseTo(rtlSpinnerCenter.buttonY, 0);

  for (const { position, testId } of [
    { position: "start", testId: "button-start-icon" },
    { position: "end", testId: "button-end-icon" },
  ]) {
    const button = page.getByTestId(testId);
    const icon = button.locator(".brick-button__icon");
    const content = button.locator(".brick-button__content");
    const [iconBox, contentBox, transform] = await Promise.all([
      icon.boundingBox(),
      content.boundingBox(),
      icon
        .locator("svg")
        .evaluate((element) => getComputedStyle(element).transform),
    ]);
    expect(transform).toContain("-1");
    if (position === "start") {
      expect(iconBox!.x).toBeGreaterThan(contentBox!.x);
    } else {
      expect(iconBox!.x).toBeLessThan(contentBox!.x);
    }
  }
});

test("Button evidence uses complete tone groups and balanced variant rows", async ({
  page,
}) => {
  await page.setViewportSize({ width: 700, height: 900 });
  await page.goto("/button");

  for (const variant of ["Solid", "Soft", "Outline", "Ghost"]) {
    const group = page
      .getByRole("heading", { name: `${variant} tones` })
      .locator("../..");
    await expect(group.getByRole("button")).toHaveCount(6);
  }

  const [toneScenarioGap, toneStackGap] = await Promise.all([
    page
      .locator("[data-scenario='button.tones']")
      .evaluate((element) => getComputedStyle(element).rowGap),
    page
      .getByTestId("button-tones")
      .evaluate((element) => getComputedStyle(element).rowGap),
  ]);
  expect(toneScenarioGap).toBe(toneStackGap);

  const cells = page
    .getByTestId("button-variants")
    .locator(".button-specimen-cell");
  const variantGridStyle = await page
    .getByTestId("button-variants")
    .evaluate((element) => ({
      borderWidth: getComputedStyle(element).borderWidth,
      gap: parseFloat(getComputedStyle(element).gap),
    }));
  expect(variantGridStyle.borderWidth).toBe("0px");
  expect(variantGridStyle.gap).toBeGreaterThanOrEqual(16);

  const appearanceGridStyle = await page
    .locator(".button-appearance-grid")
    .evaluate((element) => ({
      borderWidth: getComputedStyle(element).borderWidth,
      gap: parseFloat(getComputedStyle(element).gap),
    }));
  expect(appearanceGridStyle.borderWidth).toBe("0px");
  expect(appearanceGridStyle.gap).toBeGreaterThanOrEqual(16);

  const positions = await cells.evaluateAll((elements) =>
    elements.map((element) => {
      const box = element.getBoundingClientRect();
      return { x: Math.round(box.x), y: Math.round(box.y) };
    }),
  );
  expect(new Set(positions.map(({ x }) => x)).size).toBe(2);
  expect(new Set(positions.map(({ y }) => y)).size).toBe(2);
});

test("full-width evidence fills its available specimen container", async ({
  page,
}) => {
  await page.goto("/button");

  const button = page.getByRole("button", { name: "Explicit full width" });
  const frame = button.locator("..");
  const [buttonBox, frameBox] = await Promise.all([
    button.boundingBox(),
    frame.boundingBox(),
  ]);
  expect(buttonBox?.width).toBe(frameBox?.width);
});

test("Button preserves native keyboard activation and visible focus", async ({
  page,
}) => {
  await page.goto("/button");

  const overview = page.getByTestId("button-overview");
  const primary = overview.getByRole("button", { name: "Publish project" });
  await primary.focus();
  await expect(primary).toBeFocused();
  await expect(primary).toHaveCSS("outline-style", "solid");

  await page.keyboard.press("Enter");
  await expect(overview.getByText("Pressed 1 time")).toBeVisible();
  await page.keyboard.press("Space");
  await expect(overview.getByText("Pressed 2 times")).toBeVisible();

  const link = page.getByTestId("button-link-href");
  await link.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#scenario-button-states$/);
});

test("Button keeps disabled loading presentation centered and unavailable", async ({
  page,
}) => {
  await page.goto("/button");

  const unavailableLoading = page.getByTestId("button-disabled-loading");
  await expect(unavailableLoading).toBeDisabled();
  await expect(unavailableLoading).toHaveAttribute("aria-busy", "true");

  const geometry = await unavailableLoading.evaluate((element) => {
    const root = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    const spinner = getComputedStyle(element, "::after");
    const matrix = new DOMMatrixReadOnly(spinner.transform);
    const spinnerWidth = Number.parseFloat(spinner.width);
    return {
      rootX: root.left + root.width / 2,
      rootY: root.top + root.height / 2,
      spinnerX:
        root.left +
        Number.parseFloat(style.borderLeftWidth) +
        Number.parseFloat(spinner.left) +
        matrix.e +
        spinnerWidth / 2,
      spinnerY:
        root.top +
        Number.parseFloat(style.borderTopWidth) +
        Number.parseFloat(spinner.top) +
        matrix.f +
        Number.parseFloat(spinner.height) / 2,
    };
  });
  expect(geometry.spinnerX).toBeCloseTo(geometry.rootX, 0);
  expect(geometry.spinnerY).toBeCloseTo(geometry.rootY, 0);
});

test("Button reflows in a constrained mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 256, height: 800 });
  await page.goto("/button");

  const stress = page.getByTestId("button-stress");
  const longButton = stress.getByRole("button", {
    name: "Continue with the carefully selected delivery preferences",
  });
  const box = await longButton.boundingBox();
  const frame = await longButton.locator("..").boundingBox();
  expect(box?.width).toBeLessThanOrEqual(216);
  expect(box?.height).toBeGreaterThan(44);
  expect(box!.x).toBeGreaterThanOrEqual(frame!.x);
  expect(box!.x + box!.width).toBeLessThanOrEqual(frame!.x + frame!.width);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(256);
});
