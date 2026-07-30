import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/feed");
  await expect(page.getByTestId("feed-overview").locator(".brick-feed")).toBeVisible();
});

test("defaults, direct anatomy, semantics, and relationships are deterministic", async ({ page }) => {
  const root = page.getByTestId("feed-overview").getByRole("feed", { name: "Release activity" });
  const articles = root.getByRole("article");
  await expect(root).toHaveAttribute("data-density", "comfortable");
  await expect(root).toHaveAttribute("data-variant", "divided");
  await expect(root).toHaveAttribute("data-slot", "feed");
  await expect(articles).toHaveCount(3);
  await expect(articles.nth(0)).toHaveAttribute("data-slot", "feed-item");
  await expect(articles.nth(0)).toHaveAttribute("aria-posinset", "1");
  await expect(articles.nth(0)).toHaveAttribute("aria-setsize", "3");
  expect(await root.locator(":scope > [role=article]").count()).toBe(3);
  await expect(articles.nth(0)).toHaveAttribute("aria-labelledby", "overview-publish-title");
  await expect(articles.nth(0)).toHaveAttribute("aria-describedby", "overview-publish-summary");
});

test("Page keys reveal articles, outside-feed keys exit, and consumer prevention remains available", async ({ page }) => {
  const viewport = page.getByLabel("Keyboard Feed viewport");
  const articles = viewport.getByRole("article");
  await articles.nth(0).focus();
  await viewport.evaluate(element => { element.scrollTop = 0; });
  await articles.nth(0).press("PageDown");
  await expect(articles.nth(1)).toBeFocused();
  await articles.nth(1).press("PageDown");
  await expect(articles.nth(2)).toBeFocused();
  expect(await viewport.evaluate(element => element.scrollTop)).toBeGreaterThan(0);
  const visible = await articles.nth(2).evaluate(article => {
    const item = article.getBoundingClientRect();
    const scroller = article.closest("[aria-label='Keyboard Feed viewport']")!.getBoundingClientRect();
    return item.top < scroller.bottom && item.bottom > scroller.top;
  });
  expect(visible).toBe(true);
  await articles.nth(2).press("PageUp");
  await expect(articles.nth(1)).toBeFocused();

  await articles.nth(0).focus();
  await articles.nth(0).press(process.platform === "darwin" ? "Meta+End" : "Control+End");
  await expect(page.getByRole("button", { name: "After feed", exact: true })).toBeFocused();
  await articles.nth(0).focus();
  await articles.nth(0).press(process.platform === "darwin" ? "Meta+Home" : "Control+Home");
  await expect(page.getByRole("button", { name: "Before feed", exact: true })).toBeFocused();

  const prevented = page.locator("#scenario-feed-keyboard .feed-cell").getByRole("article");
  await prevented.nth(0).focus();
  await prevented.nth(0).press("PageDown");
  await expect(prevented.nth(0)).toBeFocused();
});

test("dynamic state remains application-owned and updates Feed metadata", async ({ page }) => {
  const area = page.getByTestId("feed-dynamic");
  const root = area.getByRole("feed", { name: "Release activity" });
  await expect(root.getByRole("article")).toHaveCount(3);
  await area.getByRole("button", { name: "Prepend newest" }).click();
  await expect(root.getByRole("article")).toHaveCount(4);
  await expect(root.getByRole("article").first()).toContainText("Consumer verification ready");
  await expect(root.getByRole("article").first()).toHaveAttribute("aria-posinset", "1");
  await expect(root.getByRole("article").first()).toHaveAttribute("aria-setsize", "4");
  await area.getByRole("button", { name: "Mark busy" }).click();
  await expect(root).toHaveAttribute("aria-busy", "true");
  await expect(area.getByText("Updating release activity…")).toBeVisible();
  await area.getByRole("button", { name: "Use unknown total" }).click();
  await expect(root.getByRole("article").first()).toHaveAttribute("aria-setsize", "-1");
  await area.getByRole("button", { name: "Finish update" }).click();
  await expect(root).not.toHaveAttribute("aria-busy");
});

test("recipes, focus ownership, customization, narrow layout, RTL, and accessibility remain stable", async ({ page }) => {
  const variants = page.locator("#scenario-feed-variants .brick-feed");
  await expect(variants).toHaveCount(3);
  await expect(variants.nth(0)).toHaveAttribute("data-variant", "plain");
  await expect(variants.nth(1)).toHaveAttribute("data-variant", "divided");
  await expect(variants.nth(2)).toHaveAttribute("data-variant", "outline");
  expect(await variants.nth(1).locator("[role=article]").nth(1).evaluate(node => getComputedStyle(node).borderBlockStartWidth)).not.toBe("0px");
  expect(await variants.nth(2).locator("[role=article]").first().evaluate(node => getComputedStyle(node).borderRadius)).not.toBe("0px");

  const overviewItem = page.getByTestId("feed-overview").getByRole("article").first();
  await overviewItem.focus();
  const focusedOutline = await overviewItem.evaluate(node => getComputedStyle(node).outlineColor);
  await overviewItem.getByRole("button", { name: "Acknowledge" }).focus();
  expect(await overviewItem.evaluate(node => getComputedStyle(node).outlineColor)).not.toBe(focusedOutline);

  const customized = page.getByTestId("feed-customized").locator(".brick-feed");
  expect(await customized.evaluate(node => getComputedStyle(node).getPropertyValue("--brick-feed-radius").trim())).toBe("1rem");
  const customItem = customized.getByRole("article").first();
  expect(await customItem.evaluate(node => getComputedStyle(node).backgroundColor)).not.toBe("rgba(0, 0, 0, 0)");

  await page.setViewportSize({ width: 390, height: 844 });
  const constrained = page.locator(".feed-constrained");
  expect(await constrained.evaluate(node => node.scrollWidth <= node.clientWidth)).toBe(true);
  const rtlActions = page.locator("#scenario-feed-stress [dir=rtl] .feed-actions").first();
  const rtlLink = await rtlActions.getByRole("link").boundingBox();
  const rtlButton = await rtlActions.getByRole("button").boundingBox();
  expect(rtlLink && rtlButton).toBeTruthy();
  expect(rtlLink!.x).toBeGreaterThan(rtlButton!.x);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
