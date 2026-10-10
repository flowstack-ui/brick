import { expect, test } from "../../evidence-test.js";
import AxeBuilder from "@axe-core/playwright";
test.beforeEach(async ({ page }) => { await page.emulateMedia({ reducedMotion:"reduce" }); await page.goto("/action-bar?qualification=1"); });
test("default bar uses compact geometry and inset separator", async ({ page }) => {
  await page.getByRole("button", {name:"Open basic", exact:true}).click();
  const bar = page.getByRole("dialog", {name:"File actions basic"});
  await expect(bar).toBeVisible();
  const geometry = await bar.evaluate(el => {
    const style = getComputedStyle(el), box = el.getBoundingClientRect();
    const separator = el.querySelector('.brick-action-bar__separator')!.getBoundingClientRect();
    return { padding:style.padding, bottom:innerHeight-box.bottom, left:box.left, right:box.right, width:innerWidth, separator:separator.height, bar:box.height };
  });
  expect(geometry.padding).toBe("10px 12px");
  expect(geometry.bottom).toBeGreaterThanOrEqual(15);
  expect(geometry.left).toBeGreaterThanOrEqual(15);
  expect(geometry.right).toBeLessThanOrEqual(geometry.width-15);
  expect(geometry.separator).toBe(20);
  expect(geometry.separator).toBeLessThan(geometry.bar);
  await page.getByRole("button", {name:"Archive", exact:true}).click();
  await expect(page.getByRole("status").filter({hasText:"Two files archived."})).toBeVisible();
  const scan = await new AxeBuilder({ page }).include('.brick-action-bar').analyze();
  expect(scan.violations.filter(v => v.impact === "serious" || v.impact === "critical")).toEqual([]);
});
test("long labels fit a narrow viewport", async ({ page }) => {
  await page.setViewportSize({width:360,height:780});
  await page.getByRole("button", {name:"Open localized", exact:true}).click();
  const bar = page.getByRole("dialog", {name:"File actions localized"});
  await expect(bar).toBeVisible();
  const geometry = await bar.evaluate(el => ({ width:el.clientWidth, scroll:el.scrollWidth, left:el.getBoundingClientRect().left, right:el.getBoundingClientRect().right }));
  expect(geometry.scroll).toBeLessThanOrEqual(geometry.width+1);
  expect(geometry.left).toBeGreaterThanOrEqual(15); expect(geometry.right).toBeLessThanOrEqual(345);
});
test("dialog dismisses before its owning action bar", async ({ page }) => {
  await page.getByRole("button", {name:"Open dialog", exact:true}).click();
  await page.getByRole("button", {name:"Delete", exact:true}).click();
  await expect(page.getByRole("dialog", {name:"Delete selected files?"})).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", {name:"Delete selected files?"})).toBeHidden();
  await expect(page.getByRole("dialog", {name:"File actions dialog"})).toBeVisible();
  await expect(page.getByRole("button", {name:"Delete", exact:true})).toBeFocused();
});
test("RTL logical start is on the right", async ({ page }) => {
  await page.getByRole("button", {name:"Open rtl", exact:true}).click();
  const bar = page.getByRole("dialog", {name:"File actions rtl"});
  await expect(bar).toBeVisible();
  const right = await bar.evaluate(el => innerWidth-el.getBoundingClientRect().right);
  expect(right).toBeGreaterThanOrEqual(15); expect(right).toBeLessThanOrEqual(17);
});
