import { expect, test } from "@playwright/test";

test("Field Label and Fieldset Legend share question typography and initial rhythm", async ({
  page,
}) => {
  await page.goto("/field");
  const field = page.getByTestId("field-overview").locator(".brick-field");
  const fieldPresentation = await field.evaluate((element) => {
    const label = element.querySelector<HTMLElement>(".brick-field-label")!;
    const control = element.querySelector<HTMLElement>(".forms-control")!;
    const style = getComputedStyle(label);
    return {
      gap: control.getBoundingClientRect().top - label.getBoundingClientRect().bottom,
      typography: {
        family: style.fontFamily,
        lineHeight: style.lineHeight,
        size: style.fontSize,
        weight: style.fontWeight,
      },
    };
  });

  await page.goto("/fieldset");
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
        lineHeight: style.lineHeight,
        size: style.fontSize,
        weight: style.fontWeight,
      },
    };
  });

  expect(fieldsetPresentation.typography).toEqual(
    fieldPresentation.typography,
  );
  expect(fieldsetPresentation.gap).toBeCloseTo(fieldPresentation.gap, 0);
});
