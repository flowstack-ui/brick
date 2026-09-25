import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/feed"); });

test("Feed documentation shows source-paired examples, props and functional loading", async ({ page }) => {
  await expect(page.getByRole("feed", { name: "Project activity" })).toBeVisible();
  const like = page.getByRole("feed", { name: "Team updates" }).getByRole("button");
  await expect(like).toHaveAttribute("data-variant", "outline");
  await like.click();
  await expect(like).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("button", { name: "Clear updates" })).toHaveAttribute("data-variant", "outline");
  await expect(page.locator("#props-root")).toBeVisible();
  await page.getByRole("button", { name: "Load more", exact: true }).click();
  const feed = page.getByRole("feed", { name: "Live activity" });
  await expect(feed).toHaveAttribute("aria-busy", "true");
  await expect(feed.getByRole("article")).toHaveCount(3);
  await expect(feed).not.toHaveAttribute("aria-busy", "true");
  await page.getByRole("button", { name: "Simulate error" }).click();
  await expect(page.getByRole("button", { name: "Retry", exact: true })).toBeEnabled();
  await page.getByRole("button", { name: "Retry", exact: true }).click();
  await expect(feed.getByRole("article")).toHaveCount(4);
  const survivor = feed.getByRole("article").first();
  await survivor.focus();
  // A background refresh must not displace focus from a surviving stable key.
  await page.getByRole("button", { name: "Load more", exact: true }).evaluate(button => (button as HTMLButtonElement).click());
  await expect(feed.getByRole("article")).toHaveCount(5);
  await expect(survivor).toBeFocused();
  await page.getByRole("button", { name: "Clear updates" }).click();
  await expect(feed.getByRole("article")).toHaveCount(0);
  await expect(page.getByRole("status").filter({ hasText: "No activity yet." })).toBeVisible();
});

test("Feed recipes reverse across breakpoints and inherit tokens without leading hidden separators", async ({ page }) => {
  const feed = page.getByRole("feed", { name: "Responsive activity" });
  for (const [width, padding, border, gap] of [[640, "8px", "0px", "8px"], [850, "16px", "1px", "12px"], [1200, "16px", "0px", "0px"], [640, "8px", "0px", "8px"]] as const) {
    await page.setViewportSize({ width, height: 900 });
    await expect(feed.getByRole("article").first()).toHaveCSS("padding-block-start", padding);
    await expect(feed.getByRole("article").first()).toHaveCSS("border-top-width", border);
    await expect(feed).toHaveCSS("row-gap", gap);
  }
  const basic = page.getByRole("feed", { name: "Project activity" });
  await basic.evaluate(element => {
    element.parentElement!.style.setProperty("--brick-feed-item-padding-inline", "3px");
    (element.firstElementChild as HTMLElement).hidden = true;
  });
  await expect(basic.getByRole("article")).toHaveCSS("padding-inline-start", "3px");
  await expect(basic.getByRole("article")).toHaveCSS("border-top-width", "0px");
  const outlined = page.getByRole("feed", { name: "Team updates" });
  await outlined.evaluate(element => element.style.setProperty("--brick-feed-background", "rgb(200, 210, 220)"));
  await expect(outlined).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(outlined.getByRole("article")).toHaveCSS("background-color", "rgb(200, 210, 220)");
  await page.emulateMedia({ forcedColors: "active" });
  await expect(basic.getByRole("article")).toHaveCSS("outline-style", "none");
  await basic.getByRole("article").focus();
  await expect(basic.getByRole("article")).toHaveCSS("outline-style", "solid");
});

test("Feed skips unavailable targets and leaves native editor navigation untouched", async ({ page }) => {
  const feed = page.getByRole("feed", { name: "Keyboard activity" });
  const articles = feed.getByRole("article", { includeHidden: true });
  await articles.nth(1).evaluate(element => { (element as HTMLElement).hidden = true; });
  await articles.nth(2).evaluate(element => { element.setAttribute("inert", ""); });
  await articles.nth(0).focus();
  await articles.nth(0).press("PageDown");
  await expect(articles.nth(3)).toBeFocused();
  await articles.nth(0).evaluate(element => {
    const editor = element.ownerDocument.createElement("textarea");
    editor.setAttribute("aria-label", "Reply");
    editor.value = "First line\nSecond line";
    element.append(editor);
  });
  const editor = feed.getByRole("textbox", { name: "Reply" });
  await editor.focus();
  await editor.press("Control+Home");
  await expect(editor).toBeFocused();
  await editor.press("PageDown");
  await expect(editor).toBeFocused();
});
