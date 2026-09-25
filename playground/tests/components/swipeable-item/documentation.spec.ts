import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

test.beforeEach(async ({ page }) => { await page.goto("/swipeable-item"); });

test("docs expose paired examples, named part tables and visible non-drag access", async ({ page }) => {
  for (const part of ["Root", "RootProvider", "Content", "Actions"]) {
    await expect(page.locator('[data-component-page="swipeable-item"]').getByRole("heading", { name: part, exact: true })).toBeVisible();
    await expect(page.getByRole("table", { name: `SwipeableItem.${part} props` })).toBeVisible();
  }
  const basic = page.locator('[data-component-page="swipeable-item"] [data-example-preview]').first();
  await basic.getByRole("button", { name: "More actions" }).click();
  await basic.getByRole("button", { name: "Save", exact: true }).click();
  await expect(basic.getByRole("status")).toHaveText("Saved");
  await basic.getByRole("tab", { name: "Code", exact: true }).click();
  await expect(basic.getByRole("tabpanel")).toContainText("SwipeableItem.Context");
});

test("one-open list, immediate reset and dismissal use the same Atom controller", async ({ page }) => {
  const list = page.locator("#controlled");
  const rows = list.locator(".brick-swipeable-item");
  await list.getByRole("button", { name: "More actions" }).nth(0).click();
  await expect(rows.nth(0)).toHaveAttribute("data-side", "end");
  await list.getByRole("button", { name: "More actions" }).nth(1).click();
  await expect(rows.nth(0)).toHaveAttribute("data-state", "closed");
  await expect(rows.nth(1)).toHaveAttribute("data-side", "end");
  const controller = page.locator("#controller");
  await controller.getByRole("button", { name: "Show actions" }).click();
  await controller.getByRole("button", { name: "Reset without animation" }).click();
  await expect(controller.locator(".brick-swipeable-item")).toHaveAttribute("data-state", "closed");
  const dismiss = page.locator("#dismissal");
  await dismiss.getByRole("button", { name: "More actions" }).click();
  await dismiss.getByText("Dismissible actions", { exact: true }).click();
  await expect(dismiss.locator(".brick-swipeable-item")).toHaveAttribute("data-state", "closed");
});

test("narrow RTL and default docs are contained and accessible", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const rtl = page.locator('#states .brick-swipeable-item[dir="rtl"]');
  await rtl.locator(".brick-swipeable-item__content").press("ArrowRight");
  await expect(rtl).toHaveAttribute("data-side", "end");
  expect((await new AxeBuilder({ page }).include('[data-component-page="swipeable-item"]').analyze()).violations).toEqual([]);
});

test("async failure keeps the record available for retry", async ({ page }) => {
  const demo = page.locator('#async');
  await demo.getByRole('button', { name: 'More actions' }).click();
  await demo.getByRole('button', { name: 'Save', exact: true }).click();
  await expect(demo.getByRole('status')).toHaveText('Could not save. Try again.');
  await demo.getByRole('button', { name: 'More actions' }).click();
  await demo.getByRole('button', { name: 'Save', exact: true }).click();
  await expect(demo.getByRole('status')).toHaveText('Saved. The row remains available.');
});

test("iframe controller measures in its owning document", async ({ page }) => {
  await page.evaluate(() => {
    const frame = document.createElement('iframe');
    frame.title = 'Embedded Swipeable Item';
    frame.src = '/swipeable-item?testMode=1';
    frame.width = '800'; frame.height = '700';
    document.body.replaceChildren(frame);
  });
  const frame = page.frameLocator('iframe');
  const demo = frame.locator('#controller');
  await demo.getByRole('button', { name: 'Show actions' }).click();
  await expect(demo.locator('.brick-swipeable-item')).toHaveAttribute('data-side', 'end');
  await demo.getByRole('button', { name: 'Close', exact: true }).click();
  await expect(demo.locator('.brick-swipeable-item')).toHaveAttribute('data-state', 'closed');
});
