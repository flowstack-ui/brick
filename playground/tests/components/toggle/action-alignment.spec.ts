import { expect, test } from "../../evidence-test.js";

for (const owner of ["toggle", "toggle-group"]) {
  test(`${owner} uses the shared seven-size action scale`, async ({ page }, testInfo) => {
    await page.goto(`/${owner}`);
    const sizes = page.locator("#sizes");
    const values = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"];
    for (const [index, size] of values.entries()) {
      const selector = owner === "toggle" ? `.brick-toggle[data-size="${size}"]` : `.brick-toggle-group[data-size="${size}"] > .brick-toggle-group-item`;
      const item = sizes.locator(selector).first();
      await expect(item).toBeVisible();
      await expect(item).toHaveText(owner === "toggle" ? size : `${size} 1`);
      expect((await item.boundingBox())!.height).toBe([24, 32, 36, 40, 44, 48, 64][index]);
    }
    await sizes.screenshot({path: testInfo.outputPath(`${owner}-sizes-review.png`)});
  });
}

test("selected disabled group item cannot capture the only tab stop", async ({ page }) => {
  await page.goto("/toggle-group");
  const group = page.locator(".brick-toggle-group").filter({ has: page.locator('[data-state="on"][disabled]') }).last();
  await expect(group.getByRole("button", { name: "Bold" })).toHaveAttribute("tabindex", "-1");
  await expect(group.getByRole("button", { name: "Italic" })).toHaveAttribute("tabindex", "0");
});

test("dialog example places its close command in the top end corner", async ({ page }) => {
  await page.goto("/close-button");
  await page.getByRole("button", {name:"Open settings",exact:true}).click();
  const dialog=page.getByRole("dialog",{name:"Settings",exact:true});
  const close=dialog.getByRole("button",{name:"Close settings"});
  const box=(await dialog.boundingBox())!;
  const button=(await close.boundingBox())!;
  expect(button.y-box.y).toBeLessThan(40);
  expect(box.x+box.width-button.x-button.width).toBeLessThan(40);
  await close.click();
  await expect(dialog).toBeHidden();
});
