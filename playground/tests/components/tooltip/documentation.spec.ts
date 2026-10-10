import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("documentation has examples, named props parts and working shared triggers", async ({ page }) => {
  await page.goto("/tooltip");
  await expect(page.locator("#props-root")).toBeVisible();
  await expect(page.locator("#props-content")).toBeVisible();
  const shared = page.locator("#shared");
  const projects = shared.getByRole("button", { name: "Projects", exact: true });
  await projects.hover();
  await expect(page.getByRole("tooltip")).toHaveText("Open Projects");
  await shared.getByRole("button", { name: "Members", exact: true }).hover();
  await expect(page.getByRole("tooltip")).toHaveText("Open Members");
  await expect(projects).not.toHaveAttribute("aria-describedby");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("tooltip")).toBeHidden();
});

test("compact recipe is themed, arrow is coordinated, retained content stays hidden", async ({ page }) => {
  for (const appearance of ["light", "dark"]) {
    await page.goto(`/tooltip?appearance=${appearance}`);
    await page.locator("#arrow").getByRole("button", { name: "With arrow" }).hover();
    const hint = page.getByRole("tooltip");
    await expect(hint).toBeVisible();
    await expect(hint).toHaveCSS("opacity", "1");
    await expect(hint).toHaveCSS("scale", "1");
    const metrics = await hint.evaluate(node => {
      const css = getComputedStyle(node);
      const arrow = getComputedStyle(node.querySelector("svg")!);
      return { border: css.borderTopWidth, padding: css.paddingTop, background: css.backgroundColor, fill: arrow.fill, width: node.getBoundingClientRect().width };
    });
    expect(metrics.border).toBe("0px");
    expect(metrics.padding).toBe("4px");
    expect(metrics.fill).toBe(metrics.background);
    expect(metrics.width).toBeGreaterThan(40);
    await page.screenshot({ path: `output/playwright/tooltip-${appearance}.png` });
  }
  await page.keyboard.press("Escape");
  await expect(page.getByText("Mounted while closed, but hidden and inaccessible.")).toBeHidden();
});

test("store and fixed positioning are functional", async ({ page }) => {
  await page.goto("/tooltip");
  await page.locator("#store").getByRole("button", { name: "Toggle store" }).click();
  await expect(page.getByRole("tooltip")).toHaveText("One shared controller");
  await page.keyboard.press("Escape");
  const target = page.locator("#positioning").getByRole("button", { name: "Fixed, matching width" });
  await target.hover();
  const hint = page.getByRole("tooltip");
  await expect(hint).toBeVisible();
  await expect(hint).toHaveCSS("position", "fixed");
  await expect(hint).toHaveCSS("scale", "1");
  const [a,b] = await Promise.all([target.boundingBox(),hint.boundingBox()]);
  expect(Math.abs(a!.width-b!.width)).toBeLessThan(1);
});

test("dialog hint stacks above its parent and Escape keeps trigger focus", async ({ page }) => {
  await page.goto("/tooltip");
  await page.locator("#dialog").getByRole("button", { name: "Open dialog" }).click();
  const target = page.getByRole("button", { name: "Project visibility" });
  await page.keyboard.press("Tab");
  await page.keyboard.press("Shift+Tab");
  await target.focus();
  const hint = page.getByRole("tooltip");
  await expect(hint).toBeVisible();
  const [hintZ, dialogZ] = await Promise.all([hint.evaluate(el=>Number(getComputedStyle(el).zIndex)),page.getByRole("dialog").evaluate(el=>Number(getComputedStyle(el).zIndex))]);
  expect(hintZ).toBeGreaterThan(dialogZ);
  await page.keyboard.press("Escape");
  await expect(hint).toBeHidden();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(target).toBeFocused();
});

test("narrow RTL docs remain contained and accessible", async ({ page }) => {
  await page.setViewportSize({width:390,height:844});
  await page.goto("/tooltip?appearance=dark");
  await page.locator("[data-component-page=tooltip]").evaluate(el=>el.setAttribute("dir","rtl"));
  await page.locator("#interactive").getByRole("button",{name:"Hover retention"}).focus();
  await expect(page.getByRole("tooltip")).toBeVisible();
  const box = await page.getByRole("tooltip").boundingBox();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x+box!.width).toBeLessThanOrEqual(390);
  expect((await new AxeBuilder({page}).disableRules(["region"]).analyze()).violations).toEqual([]);
});
