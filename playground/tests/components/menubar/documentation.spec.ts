import { expect, test } from "../../evidence-test.js";

test("Menubar documentation has named parts and executable example source", async ({
  page,
}) => {
  await page.goto("/menubar");
  for (const id of [
    "sizes",
    "variants",
    "tones",
    "controlled",
    "insets",
    "overflow",
    "dialog",
    "radio",
    "arrow",
    "placement",
  ]) {
    const section = page.locator(`section#${id}`);
    await expect(
      section.getByRole("tab", { name: "Preview", exact: true }),
    ).toHaveCount(1);
    await section.getByRole("tab", { name: "Code", exact: true }).click();
    await expect(section.locator("pre")).toContainText("@flowstack-ui/brick");
  }
  for (const part of ["root", "content", "item"]) {
    const section = page.locator(`#props-${part}`);
    await expect(section.getByRole("heading", { level: 3 })).toHaveCount(1);
    await expect(section.getByRole("table")).toHaveCount(1);
    await expect(
      page.locator(`a[href="#props-${part}"]`).first(),
    ).toBeAttached();
  }
  await expect(page.locator("iframe")).toHaveCount(0);
  for (const id of ["strip-style", "popup-style"]) {
    await expect(page.locator(`section#${id} pre`)).toHaveCount(1);
    await expect(page.locator(`a[href="#${id}"]`).first()).toBeAttached();
  }
});

test("Menubar retains independent qualification evidence", async ({ page }) => {
  await page.goto("/menubar?qualification=1");
  await expect(page.getByTestId("menubar-overview")).toBeVisible();
});
