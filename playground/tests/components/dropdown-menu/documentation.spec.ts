import { expect, test } from "../../evidence-test.js";

test("DropdownMenu documentation has named parts and executable example source", async ({
  page,
}) => {
  await page.goto("/dropdown-menu");
  for (const id of [
    "sizes",
    "variants",
    "tones",
    "controlled",
    "insets",
    "overflow",
    "dialog",
  ]) {
    const section = page.locator(`section#${id}`);
    await expect(
      section.getByRole("tab", { name: "Preview", exact: true }),
    ).toHaveCount(1);
    await section.getByRole("tab", { name: "Code", exact: true }).click();
    await expect(section.locator("pre")).toContainText("@flowstack-ui/brick");
    await section.getByRole("tab", { name: "Preview", exact: true }).click();
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
  await expect(page.locator("section#appearance")).toHaveCount(0);
  for (const id of ["sizes", "variants", "tones", "positioning", "insets"]) {
    await expect(
      page.locator(`section#${id} button[aria-haspopup="menu"]`),
    ).toHaveCount(1);
  }
});

test("Menu links are undecorated and ordinary triggers stay intrinsic", async ({
  page,
}) => {
  await page.goto("/dropdown-menu");
  for (const id of ["controlled", "highlight"]) {
    const button = page.locator(`#${id} button[aria-haspopup="menu"]`);
    const widths = await button.evaluate((element) => ({
      button: element.getBoundingClientRect().width,
      parent: element.parentElement!.getBoundingClientRect().width,
    }));
    expect(widths.button).toBeLessThan(widths.parent);
  }
  await page
    .locator("#links")
    .getByRole("button", { name: "Actions", exact: true })
    .click();
  await expect(
    page.getByRole("menuitem", { name: "Source repository" }),
  ).toHaveCSS("text-decoration-line", "none");
});

test("DropdownMenu retains independent qualification evidence", async ({
  page,
}) => {
  await page.goto("/dropdown-menu?qualification=1");
  await expect(page.getByTestId("dropdown-menu-overview")).toBeVisible();
});
