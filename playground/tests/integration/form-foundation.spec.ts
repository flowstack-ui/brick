import { expect, test } from "@playwright/test";

test("default Field and Fieldset share typography with distinct control and header spacing", async ({
  page,
}) => {
  await page.goto("/field?qualification=1");
  const field = page.getByTestId("field-overview").locator(".brick-field");
  const fieldPresentation = await field.evaluate((element) => {
    const label = element.querySelector<HTMLElement>(".brick-field-label")!;
    const control = element.querySelector<HTMLElement>(".brick-input")!;
    const style = getComputedStyle(label);
    return {
      gap: control.getBoundingClientRect().top - label.getBoundingClientRect().bottom,
      typography: {
        family: style.fontFamily,
        letterSpacing: style.letterSpacing,
        lineHeight: style.lineHeight,
        size: style.fontSize,
        weight: style.fontWeight,
      },
    };
  });

  await page.goto("/fieldset?qualification=1");
  const fieldset = page
    .getByTestId("fieldset-overview")
    .locator(".brick-fieldset");
  const fieldsetPresentation = await fieldset.evaluate((element) => {
    const legend = element.querySelector<HTMLElement>(
      ".brick-fieldset-legend",
    )!;
    const description = element.querySelector<HTMLElement>(
      ".brick-fieldset-description",
    )!;
    const style = getComputedStyle(legend);
    return {
      gap:
        description.getBoundingClientRect().top -
        legend.getBoundingClientRect().bottom,
      typography: {
        family: style.fontFamily,
        letterSpacing: style.letterSpacing,
        lineHeight: style.lineHeight,
        size: style.fontSize,
        weight: style.fontWeight,
      },
    };
  });

  expect(fieldsetPresentation.typography).toEqual(
    fieldPresentation.typography,
  );
  expect(fieldPresentation.gap).toBeCloseTo(6, 0);
  expect(fieldsetPresentation.gap).toBeCloseTo(8, 0);
});
