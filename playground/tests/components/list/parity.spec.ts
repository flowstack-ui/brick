import { expect, test } from "../../evidence-test.js";
test("documentation sections expose executable source and complete static-part props", async ({ page }) => {
  await page.goto("/list");
  for (const id of ["ordered", "icons", "nested", "markers", "typography", "spacing", "recipes", "selection", "single"]) {
    const section = page.locator(`#${id}`);
    await section.getByRole("tab", { name: "Code", exact: true }).click();
    await expect(section.locator("pre")).toContainText("@flowstack-ui/brick");
    await section.getByRole("tab", { name: "Preview", exact: true }).click();
  }
  await expect(page.locator("#list-root-props")).toContainText("nestedInset");
  await expect(page.locator("#list-item-props")).toContainText("markerTone");
  for (const part of ["leading", "content", "title", "description", "trailing"]) {
    await expect(page.locator(`#list-${part}-props`)).toContainText("asChild");
  }
});
test("typography inheritance preserves every font metric and secondary description", async ({ page }) => {
  await page.goto("/list");
  const lists = page.locator("#typography .brick-list");
  await expect(lists).toHaveCount(3);
  for (const list of await lists.all()) {
    const values = await list.evaluate(root => {
      const owner = getComputedStyle(root.parentElement!);
      return Array.from(root.querySelectorAll(".brick-list__item, .brick-list__row, .brick-list__title, .brick-list__description")).map(node => {
        const style = getComputedStyle(node);
        return ["fontFamily", "fontSize", "fontWeight", "lineHeight", "letterSpacing"].every(key => style[key as keyof CSSStyleDeclaration] === owner[key as keyof CSSStyleDeclaration]);
      });
    });
    expect(values.every(Boolean)).toBe(true);
    expect(await list.locator(".brick-list__title").evaluate(n => getComputedStyle(n).color)).not.toBe(await list.locator(".brick-list__description").evaluate(n => getComputedStyle(n).color));
  }
  const sizes = await lists.evaluateAll(nodes => nodes.map(n => getComputedStyle(n.querySelector("li")!).fontSize));
  expect(new Set(sizes).size).toBe(3);
});

test("native markers respect composed ol, native type and explicit overrides", async ({ page }) => {
  await page.goto("/list");
  const root = page.locator("#ordered .brick-list");
  for (const [type, expected] of [["a", "lower-alpha"], ["A", "upper-alpha"], ["i", "lower-roman"], ["I", "upper-roman"], ["1", "decimal"]]) {
    await root.evaluate((node, value) => node.setAttribute("type", value), type);
    await expect(root).toHaveCSS("list-style-type", expected);
  }
  await root.evaluate(node => { node.setAttribute("type", "a"); node.setAttribute("data-marker", "square"); });
  await expect(root).toHaveCSS("list-style-type", "square");
  // Styling is based on the resulting native host, not an Atom-only flag.
  await root.evaluate(node => { node.removeAttribute("data-ordered"); node.removeAttribute("type"); node.setAttribute("data-marker", "auto"); });
  await expect(root).toHaveCSS("list-style-type", "decimal");
});

test("marker tones override only markers and remain readable in forced colors", async ({ page }) => {
  await page.goto("/list");
  const items = page.locator("#markers .brick-list__item");
  const styles = await items.evaluateAll(nodes => nodes.map(n => ({ text: getComputedStyle(n).color, marker: getComputedStyle(n, "::marker").color })));
  expect(new Set(styles.map(s => s.text)).size).toBe(1);
  expect(new Set(styles.map(s => s.marker)).size).toBe(3);
  expect(styles[2].marker).toBe(styles[2].text);
  await page.emulateMedia({ forcedColors: "active" });
  const colors = await items.evaluateAll(nodes => nodes.map(n => getComputedStyle(n, "::marker").color));
  expect(new Set(colors).size).toBe(1);
});

test("icon first-line alignment and nested indentation hold in narrow RTL", async ({ page }) => {
  await page.goto("/list");
  for (const width of [1200, 390]) {
    await page.setViewportSize({ width, height: 900 });
    const nested = page.locator("#nested .brick-list .brick-list");
    await expect(nested).toHaveCSS("padding-inline-start", width >= 768 ? "32px" : "24px");
    for (const dir of ["ltr", "rtl"]) {
      await page.locator("#icons .brick-list").evaluate((n, direction) => n.setAttribute("dir", direction), dir);
      const rows = page.locator("#icons .brick-list__item");
      for (const row of await rows.all()) {
        const geometry = await row.evaluate(n => {
          const glyph = n.querySelector("svg")!.getBoundingClientRect();
          const content = n.querySelector(".brick-list__content")!;
          const box = content.getBoundingClientRect();
          return { delta: Math.abs(glyph.y + glyph.height / 2 - box.y - parseFloat(getComputedStyle(content).lineHeight) / 2), glyphX: glyph.x, contentX: box.x };
        });
        expect(geometry.delta).toBeLessThanOrEqual(1);
        if (dir === "rtl") expect(geometry.glyphX).toBeGreaterThan(geometry.contentX);
        else expect(geometry.glyphX).toBeLessThan(geometry.contentX);
      }
    }
  }
});
test("single selection replaces a peer and survives filtering", async ({
  page,
}) => {
  await page.goto("/list");
  const example = page.locator("#single");
  await example.getByRole("checkbox", { name: "Select Ada" }).click();
  await expect(example.getByRole("status")).toHaveText("Selected: Ada");
  await example.getByRole("button", { name: "Hide Ada" }).click();
  await expect(example.getByRole("status")).toHaveText("Selected: Ada");
  await example.getByRole("checkbox", { name: "Select Lee" }).click();
  await expect(example.getByRole("status")).toHaveText("Selected: Lee");
  await example.getByRole("button", { name: "Show everyone" }).click();
  await expect(
    example.getByRole("checkbox", { name: "Select Ada" }),
  ).not.toBeChecked();
  await expect(
    example.getByRole("checkbox", { name: "Select Lee" }),
  ).toBeChecked();
});
test("peer gap, zero density and composed typography preserve native li", async ({
  page,
}) => {
  await page.goto("/list");
  await page.setViewportSize({ width: 1200, height: 900 });
  const items = page.locator("#spacing .brick-list > .brick-list__item");
  await expect(items).toHaveCount(3);
  await expect(items.nth(0)).toHaveCSS("margin-top", "0px");
  await expect(items.nth(1)).toHaveCSS("margin-top", "16px");
  await expect(items.nth(1)).toHaveCSS("padding-top", "0px");
  await expect(items.nth(1)).toHaveCSS(
    "font-size",
    await items.nth(0).evaluate((n) => getComputedStyle(n).fontSize),
  );
  await expect(items.nth(1)).toHaveCSS("display", "list-item");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(items.nth(1)).toHaveCSS("margin-top", "8px");
  await expect(page.locator("[role=option]")).toHaveCount(0);
});
