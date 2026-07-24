import { expect, test, type Locator } from "@playwright/test";

async function checkboxGeometry(checkbox: Locator) {
  return checkbox.evaluate((element) => {
    const control = element.querySelector<HTMLElement>(
      ".brick-checkbox-control",
    )!;
    const controlRect = control.getBoundingClientRect();
    const rowRect = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    return {
      controlHeight: controlRect.height,
      controlWidth: controlRect.width,
      fontSize: style.fontSize,
      rowHeight: rowRect.height,
    };
  });
}

test("Checkbox and CheckboxGroup Item share default medium row geometry", async ({
  page,
}) => {
  await page.goto("/checkbox");
  const standalone = page
    .getByTestId("checkbox-overview")
    .getByRole("checkbox", { name: "Ready to publish" });
  const standaloneGeometry = await checkboxGeometry(standalone);

  await page.goto("/checkbox-group");
  const grouped = page
    .getByTestId("checkbox-group-overview")
    .getByRole("checkbox", { name: "Email reports" });
  expect(await checkboxGeometry(grouped)).toEqual(standaloneGeometry);
});

test("Checkbox and CheckboxGroup preserve independent, shared-group, and item invalid cues", async ({
  page,
}) => {
  await page.goto("/checkbox");
  const standalone = page
    .getByTestId("checkbox-validity")
    .getByRole("checkbox", { name: "Preview" })
    .nth(1);
  const standaloneCue = await standalone.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      color: style.borderLeftColor,
      style: style.borderLeftStyle,
      width: style.borderLeftWidth,
    };
  });

  await page.goto("/checkbox-group");
  const sharedGroup = page.getByRole("group", {
    name: "Invalid delivery methods",
  });
  const sharedItem = sharedGroup.getByRole("checkbox", {
    name: "Email reports",
  });
  const individualItem = page
    .getByRole("group", { name: "Individual delivery validation" })
    .getByRole("checkbox", { name: "Email reports" });

  await expect(sharedGroup).toHaveCSS("border-left-style", "solid");
  await expect(sharedItem).toHaveCSS("border-left-style", "none");
  await expect(sharedItem).toHaveAttribute("aria-invalid", "true");
  expect(
    await individualItem.evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        color: style.borderLeftColor,
        style: style.borderLeftStyle,
        width: style.borderLeftWidth,
      };
    }),
  ).toEqual(standaloneCue);
});
