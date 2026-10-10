import { expect, test } from "../../evidence-test.js";

test("normal Menubar RTL navigation and dialog command", async ({ page }) => {
  await page.goto("/menubar");
  const bar = page.locator("section#rtl").getByRole("menubar");
  const first = bar.getByRole("menuitem", { name: "ملف", exact: true });
  await first.focus();
  await first.press("ArrowLeft");
  await expect(
    bar.getByRole("menuitem", { name: "تحرير", exact: true }),
  ).toBeFocused();
  await page
    .locator("section#dialog-chain")
    .getByRole("menuitem", { name: "Record actions", exact: true })
    .click();
  await page
    .getByRole("menuitem", { name: "Open details dialog", exact: true })
    .click();
  await expect(
    page.getByRole("dialog", { name: "Record details" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("normal Menubar mobile alternative remains usable across resize", async ({
  page,
}) => {
  await page.setViewportSize({ width: 600, height: 900 });
  await page.goto("/menubar");
  const section = page.locator("section#responsive");
  await expect(section.getByRole("menubar")).toHaveCount(0);
  await section
    .getByRole("button", { name: "Document actions", exact: true })
    .click();
  const drawer = page.getByRole("dialog", { name: "Document actions" });
  await expect(drawer).toBeVisible();
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(drawer).toBeVisible();
  await drawer
    .getByRole("button", { name: "Save document", exact: true })
    .click();
  await expect(drawer).not.toBeVisible();
  await expect(section.getByRole("status")).toHaveText("Save document");
  await expect(
    section.getByRole("menuitem", { name: "Document", exact: true }),
  ).toBeFocused();
});
