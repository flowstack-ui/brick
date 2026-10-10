import { expect, test } from "@playwright/test";
test("sorting examples center and separate indicators in the Button icon slot", async ({ page }) => {
  for (const direction of ["ltr", "rtl"]) {
    await page.goto(`/table?exampleDirection=${direction}`);
    for (const id of ["sorting", "engine"]) {
      const section = page.locator(`#${id}`);
      for (const button of await section.locator("thead button").all()) {
        const label = await button.locator(".brick-button__content").boundingBox();
        const indicator = await button.locator(".brick-table__sort-indicator").boundingBox();
        expect(Math.abs(label!.y + label!.height / 2 - indicator!.y - indicator!.height / 2)).toBeLessThanOrEqual(1);
        const gap = direction === "ltr" ? indicator!.x - label!.x - label!.width : label!.x - indicator!.x - indicator!.width;
        expect(gap).toBeGreaterThanOrEqual(4);
      }
    }
  }
  const engine = page.locator("#engine");
  await engine.getByRole("button", { name: "Product", exact: true }).click();
  await expect(engine.locator("tbody tr").first()).toContainText("Keyboard");
  await expect(engine.getByRole("columnheader", { name: "Product" })).toHaveAttribute("aria-sort", "ascending");
});
test("documentation begins with the simple reference and separates example features", async ({ page }) => {
  await page.goto("/table");
  const basic = page.locator('[data-component-page="table"] table').first();
  await expect(basic.getByRole("columnheader")).toHaveText(["Product", "Category", "Price"]);
  await expect(basic.locator("tbody tr")).toHaveCount(5);
  await expect(basic).toContainText("Coffee Maker");
  const ids = ["sizes", "variants", "striped", "caption", "caption-top", "column-border", "overflow", "sticky-header", "sticky-column", "sticky", "hover", "pagination", "selection", "action-bar", "density", "surfaces", "border-tones", "nested", "structure", "record-workflow"];
  const positions = [];
  for (const id of ids) {
    const section = page.locator(`#${id}`);
    await expect(section.getByRole("tab", { name: "Preview", exact: true })).toHaveCount(1);
    await expect(section.getByRole("tab", { name: "Code", exact: true })).toHaveCount(1);
    positions.push(await section.evaluate(el => el.getBoundingClientRect().top));
  }
  expect(positions).toEqual([...positions].sort((a,b)=>a-b));
  await expect(page.locator("#sizes table")).toHaveCount(3);
  await expect(page.locator("#variants table")).toHaveCount(2);
  await page.locator("#pagination").getByRole("button", {name:"Next page"}).click();
  await expect(page.locator("#pagination table")).toContainText("Monitor");
  await expect(page.locator("#pagination table")).not.toContainText("Laptop");
});

test("sticky intersections paint above headers and body after both axes scroll", async ({ page }) => {
  for (const appearance of ["light", "dark"]) {
    await page.goto(`/table?appearance=${appearance}`);
    const table = page.locator("#sticky table");
    const scroller = table.locator("..");
    await scroller.scrollIntoViewIfNeeded();
    for (const dir of ["ltr", "rtl"]) {
      await scroller.evaluate((el, direction) => {
        el.setAttribute("dir", direction);
        el.scrollLeft = direction === "rtl" ? -180 : 180;
        el.scrollTop = 100;
      }, dir);
      const corner = table.locator("thead th[data-sticky]");
      await expect(corner).toHaveCSS("z-index", "3");
      await expect(table.locator("thead th").nth(1)).toHaveCSS("z-index", "2");
      await expect.poll(() => corner.evaluate(el => {
        const rect = el.getBoundingClientRect();
        const x = getComputedStyle(el).direction === "rtl" ? rect.left + 8 : rect.right - 8;
        return document.elementFromPoint(x, rect.top + rect.height / 2)?.closest("th") === el;
      })).toBe(true);
      expect(await scroller.evaluate(el => el.scrollHeight > el.clientHeight && Math.abs(el.scrollLeft) > 0 && el.scrollTop > 0)).toBe(true);
    }
  }
});
test("outer recipes do not leak into a nested table", async ({ page }) => {
  await page.goto("/table");
  const nested = page.getByRole("table", { name: "Design usage" });
  await expect(nested.locator("thead th").first()).toHaveCSS(
    "position",
    "static",
  );
  await expect(nested.locator("thead th").nth(1)).toHaveCSS(
    "border-left-width",
    "0px",
  );
  await expect(nested.locator("tbody td").last()).toHaveCSS(
    "border-bottom-width",
    "1px",
  );
  await expect(nested.locator("thead th").first()).toHaveCSS(
    "border-top-left-radius",
    "0px",
  );
});
test("docs cover props and sticky geometry without changing table semantics", async ({
  page,
}) => {
  await page.goto("/table");
  await expect(
    page.getByRole("heading", { name: "Root", exact: true }),
  ).toBeVisible();
  const table = page.locator("#sticky table");
  const scroller = table.locator("..");
  const start = table.locator("tbody [data-sticky]").first();
  const before = await start.boundingBox();
  await scroller.evaluate((el) => {
    el.scrollLeft = 180;
    el.scrollTop = 80;
  });
  expect((await start.boundingBox())!.x).toBeCloseTo(before!.x, 0);
  await expect(table.locator("thead th").first()).toHaveCSS(
    "position",
    "sticky",
  );
  await expect(table).not.toHaveAttribute("role", "grid");
  expect(
    await page
      .locator("#sizes table")
      .evaluateAll((els) => els.map((el) => getComputedStyle(el).fontSize)),
  ).toEqual(["14px", "14px", "16px"]);
});
