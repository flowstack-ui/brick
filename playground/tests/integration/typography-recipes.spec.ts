import { expect, test, type Locator, type Page } from "@playwright/test";

async function typography(locator: Locator) {
  return locator.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      family: style.fontFamily,
      size: style.fontSize,
      weight: style.fontWeight,
      lineHeight: style.lineHeight,
      letterSpacing: style.letterSpacing,
    };
  });
}

async function rootRecipe(page: Page, recipe: string) {
  return page.locator("html").evaluate((element, name) => {
    const style = getComputedStyle(element);
    return {
      family: style.getPropertyValue(`--brick-typography-${name}-font-family`).trim(),
      size: style.getPropertyValue(`--brick-typography-${name}-font-size`).trim(),
      weight: style.getPropertyValue(`--brick-typography-${name}-font-weight`).trim(),
      lineHeight: style.getPropertyValue(`--brick-typography-${name}-line-height`).trim(),
      letterSpacing: style
        .getPropertyValue(`--brick-typography-${name}-letter-spacing`)
        .trim(),
    };
  }, recipe);
}

test("Text and supporting component anatomy consume the same content recipes", async ({
  page,
}) => {
  await page.goto("/text?qualification=1");
  const textBodySm = await typography(
    page.getByTestId("text-variants").locator("[data-variant='body-sm']"),
  );
  expect(await rootRecipe(page, "body-sm")).toEqual({
    family: "ui-sans-serif, system-ui, sans-serif",
    size: ".875rem",
    weight: "400",
    lineHeight: "1.5",
    letterSpacing: "0em",
  });

  await page.goto("/field?qualification=1");
  const field = page.getByTestId("field-overview");
  expect(await typography(field.locator(".brick-field-description"))).toEqual(
    textBodySm,
  );

  await page.goto("/fieldset?qualification=1");
  expect(
    await typography(
      page.getByTestId("fieldset-overview").locator(".brick-fieldset-description"),
    ),
  ).toEqual(textBodySm);
});

test("labels, validation, controls, and field values resolve through shared recipes", async ({
  page,
}) => {
  await page.goto("/field?qualification=1");
  const field = page.getByTestId("field-overview");
  const label = await typography(field.locator(".brick-field-label"));
  expect(label).toMatchObject({
    size: "14px",
    weight: "500",
  });
  // Engines serialize the same fractional CSS pixel value differently.
  expect(parseFloat(label.lineHeight)).toBeCloseTo(16.8, 4);

  await page.goto("/fieldset?qualification=1");
  expect(
    await typography(
      page.getByTestId("fieldset-overview").locator(".brick-fieldset-legend"),
    ),
  ).toEqual(label);

  await page.goto("/button?qualification=1");
  const button = await typography(
    page.getByTestId("button-sizes").locator('.brick-button[data-size="md"]'),
  );
  await page.goto("/toggle?qualification=1");
  expect(
    await typography(page.getByTestId("toggle-overview").locator(".brick-toggle")),
  ).toEqual(button);

  await page.goto("/input?qualification=1");
  const input = page.getByTestId("input-overview").locator(".brick-input-control");
  expect(await typography(input)).toMatchObject({
    size: "16px",
    weight: "400",
    lineHeight: "24px",
  });
});

test("overlay titles share one normalized title recipe", async ({ page }) => {
  const titles = [];

  await page.goto("/dialog?qualification=1");
  await page.getByRole("button", { name: "Edit profile" }).click();
  titles.push(
    await typography(
      page
        .getByTestId("dialog-overview-content")
        .locator("[data-slot='dialog-title']"),
    ),
  );

  await page.goto("/alert-dialog?qualification=1");
  await page.getByRole("button", { name: "Delete project?" }).click();
  titles.push(
    await typography(
      page
        .getByTestId("alert-dialog-overview-content")
        .locator("[data-slot='alert-dialog-title']"),
    ),
  );

  await page.goto("/drawer?qualification=1");
  await page.getByRole("button", { name: "Filter projects" }).click();
  titles.push(
    await typography(
      page
        .getByTestId("drawer-overview-content")
        .locator("[data-slot='drawer-title']"),
    ),
  );

  expect(titles[1]).toEqual(titles[0]);
  expect(titles[2]).toEqual(titles[0]);
  expect(titles[0]).toMatchObject({
    size: "18px",
    weight: "600",
    lineHeight: "27px",
    letterSpacing: "-0.18px",
  });
});

test("surface and compact titles expose the approved normalized tracking", async ({
  page,
}) => {
  await page.goto("/card?qualification=1");
  const cardTitles = page.getByTestId("card-sizes").locator(".brick-card-title");
  await expect(cardTitles).toHaveCount(3);
  expect(await typography(cardTitles.nth(0))).toMatchObject({
    size: "16px",
    letterSpacing: "-0.16px",
  });
  expect(await typography(cardTitles.nth(1))).toMatchObject({
    size: "18px",
    letterSpacing: "-0.18px",
  });
  expect(await typography(cardTitles.nth(2))).toMatchObject({
    size: "20px",
    letterSpacing: "-0.2px",
  });

  await page.goto("/popover?qualification=1");
  await page.getByRole("button", { name: "Project settings", exact: true }).click();
  const title = page.locator("[data-slot='popover-title']").first();
  await expect(title).toBeVisible();
  await expect(title).toHaveCSS("font-size", "16px");
  await expect(title).toHaveCSS("letter-spacing", "-0.16px");
});
