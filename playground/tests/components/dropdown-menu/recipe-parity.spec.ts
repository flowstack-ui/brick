import { expect, test } from "../../evidence-test.js";

// CSS-only matrix on real rendered owner parts. Adapter propagation and DOM
// composition are exercised separately by the owner unit/controller tests.
for (const owner of ["dropdown-menu", "context-menu", "menubar"] as const) {
  test(`${owner} complete size recipes and local token overrides`, async ({
    page,
  }) => {
    await page.goto(`/${owner}?qualification=1`);
    if (owner === "dropdown-menu")
      await page
        .getByTestId("dropdown-menu-overview")
        .getByRole("button", { name: "Project actions" })
        .click();
    if (owner === "context-menu")
      await page
        .getByRole("article", { name: "Quarterly report" })
        .click({ button: "right" });
    if (owner === "menubar")
      await page
        .getByTestId("menubar-overview")
        .getByRole("menuitem", { name: "File" })
        .click();
    const menu = page
      .locator(`.brick-${owner}__content[role="menu"]`)
      .filter({ visible: true })
      .first();
    await expect(menu).toBeVisible();
    const actual = await menu.evaluate((content, owner) => {
      const item = content.querySelector<HTMLElement>(
        ".brick-action-menu__row",
      )!;
      return (["sm", "md", "lg"] as const).map((size) => {
        content.setAttribute("data-size", size);
        item.setAttribute("data-size", size);
        const row = getComputedStyle(item);
        const result = {
          size,
          height: row.minBlockSize,
          font: row.fontSize,
          line: row.lineHeight,
          weight: row.fontWeight,
          padding: getComputedStyle(content).paddingTop,
          local: "",
        };
        item.style.setProperty(`--brick-${owner}-row-padding-inline`, "19px");
        result.local = getComputedStyle(item).paddingInlineEnd;
        item.style.removeProperty(`--brick-${owner}-row-padding-inline`);
        return result;
      });
    }, owner);
    expect(actual).toEqual([
      {
        size: "sm",
        height: "24px",
        font: "12px",
        line: "16px",
        weight: "400",
        padding: "4px",
        local: "19px",
      },
      {
        size: "md",
        height: "32px",
        font: "14px",
        line: "20px",
        weight: "400",
        padding: "6px",
        local: "19px",
      },
      {
        size: "lg",
        height: "44px",
        font: "16px",
        line: "24px",
        weight: "400",
        padding: "8px",
        local: "19px",
      },
    ]);
  });
}

test("rich rows keep shortcuts on the label line and descriptions below", async ({
  page,
}) => {
  await page.goto("/dropdown-menu?qualification=1");
  await page.getByRole("button", { name: "Inspect project menu" }).click();
  const row = page.getByRole("menuitem", { name: /Rename project/ });
  const geometry = await row.evaluate((element) => {
    const bounds = (selector: string) =>
      element.querySelector(selector)!.getBoundingClientRect();
    const label = bounds(".brick-action-menu__item-label");
    const shortcut = bounds(".brick-action-menu__shortcut");
    const leading = bounds(".brick-action-menu__leading");
    const description = bounds(".brick-action-menu__description");
    return {
      labelCenter: label.y + label.height / 2,
      shortcutCenter: shortcut.y + shortcut.height / 2,
      leadingCenter: leading.y + leading.height / 2,
      labelBottom: label.bottom,
      descriptionTop: description.top,
      descriptionRight: description.right,
      rowRight: element.getBoundingClientRect().right,
    };
  });
  expect(
    Math.abs(geometry.shortcutCenter - geometry.labelCenter),
  ).toBeLessThanOrEqual(1);
  expect(
    Math.abs(geometry.leadingCenter - geometry.labelCenter),
  ).toBeLessThanOrEqual(1);
  expect(geometry.descriptionTop).toBeGreaterThanOrEqual(geometry.labelBottom);
  expect(geometry.descriptionRight).toBeLessThanOrEqual(geometry.rowRight);
});
