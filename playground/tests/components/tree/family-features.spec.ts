import { expect, test } from "../../evidence-test.js";

test("window adapters mount offscreen targets before exposing active descendants", async ({ page }) => {
  await page.goto("/tree");
  const tree = page.getByRole("tree", { name: "Windowed reports", exact: true });
  await page.getByRole("button", { name: "Reveal report 100", exact: true }).click();
  const item = tree.getByRole("treeitem", { name: "Report 100", exact: true });
  await expect(item).toBeVisible();
  await tree.focus();
  await expect(tree).toHaveAttribute("aria-activedescendant", await item.getAttribute("id") ?? "");
  await tree.press("End");
  await expect(tree.getByRole("treeitem", { name: "Report 200", exact: true })).toBeVisible();
  expect(await tree.getByRole("treeitem").count()).toBeLessThan(25);
  await page.goto("/tree-grid");
  const grid = page.getByRole("treegrid", { name: "Windowed report grid", exact: true });
  await page.getByRole("button", { name: "Reveal row 101", exact: true }).click();
  await grid.focus();
  await expect(grid.getByRole("rowheader", { name: "Report 100", exact: true })).toBeVisible();
  await grid.press("Control+End");
  await expect.poll(() => grid.evaluate(element => document.getElementById(element.getAttribute("aria-activedescendant") ?? "")?.textContent)).toBe("Report 200");
  expect(await grid.getByRole("row").count()).toBeLessThan(25);
});

test("Tree disclosure, propagated checking, forms and rename are independent", async ({ page }) => {
  await page.goto("/tree");
  const disclosure = page.getByRole("tree", { name: "Disclosure-only files", exact: true });
  await disclosure.getByText("Project", { exact: true }).click();
  await expect(disclosure.getByRole("treeitem", { name: "README.md" })).toHaveCount(0);
  await disclosure.getByRole("button", { name: "Toggle project folder" }).click();
  await expect(disclosure.getByRole("treeitem", { name: "README.md" })).toBeVisible();
  const checks = page.getByRole("tree", { name: "Files to include", exact: true });
  await expect(checks.getByRole("checkbox", { name: "Include project" })).toHaveAttribute("aria-checked", "mixed");
  await checks.getByRole("checkbox", { name: "Include project" }).click();
  await expect(checks.getByRole("checkbox", { name: "Include styles.css" })).toHaveAttribute("aria-checked", "true");
  await page.getByRole("button", { name: "Submit folder", exact: true }).click();
  await expect(page.locator("#form").getByRole("status")).toHaveText("documents");
  const actions = page.getByRole("tree", { name: "Project actions", exact: true });
  await actions.getByRole("button", { name: "Rename", exact: true }).click();
  await actions.getByRole("textbox", { name: "Project name" }).fill("");
  await actions.getByRole("button", { name: "Save", exact: true }).click();
  await expect(actions.getByRole("alert")).toHaveText("Enter a project name.");
  await actions.getByRole("button", { name: "Cancel", exact: true }).click();
  await expect(actions).toBeFocused();
  await expect(actions.getByRole("treeitem", { name: "Project", exact: true })).toBeVisible();
});

test("TreeGrid editing validates, commits and cancels with focus recovery", async ({ page }) => {
  await page.goto("/tree-grid");
  const grid = page.getByRole("treegrid", {name: "Editable project", exact: true});
  const input = grid.getByRole("textbox", {name: "Project name"});
  await input.fill("");
  await input.press("Enter");
  await expect(page.locator("#editing").getByRole("alert")).toHaveText("Enter a project name.");
  await input.fill("Renamed");
  await input.press("Enter");
  await expect(grid.getByRole("rowheader")).toHaveText("Renamed");
  await expect(grid).toBeFocused();
  await input.fill("Discard this");
  await input.press("Escape");
  await expect(input).toHaveValue("Renamed");
  await expect(grid).toBeFocused();
});

test("parent disclosure columns align child icons, checks and labels", async ({ page }) => {
  await page.goto("/tree");
  const disclosure = page.getByRole("tree", { name: "Disclosure-only files", exact: true });
  await disclosure.getByRole("button", { name: "Toggle project folder" }).click();
  for (const name of ["Disclosure-only files", "Files to include"]) {
    const tree = page.getByRole("tree", { name, exact: true });
    for (const direction of ["ltr", "rtl"]) {
      for (const size of ["xs", "sm", "md"]) {
        const offsets = await tree.evaluate((node, options) => {
          node.setAttribute("dir", options.direction);
          node.setAttribute("data-size", options.size);
          const rows = [...node.querySelectorAll('.brick-tree__item-content')];
          const selectors = ['.brick-icon', '.brick-tree__item-text', ...(options.checks ? ['.brick-tree__checkbox'] : [])];
          return selectors.flatMap(selector => {
            const positions = rows.map(row => {
              const box = row.querySelector(selector)!.getBoundingClientRect();
              return options.direction === 'rtl' ? box.right : box.left;
            });
            return positions.slice(1).map(position => Math.abs(position - positions[0]));
          });
        }, { direction, size, checks: name === "Files to include" });
        for (const offset of offsets) expect(offset).toBeLessThanOrEqual(.5);
      }
    }
  }
});

test("Tree animated reversal finishes expanded and lazy failures can retry", async ({ page }) => {
  await page.goto("/tree");
  const root = page.getByRole("tree", { name: "Animated folders", exact: true });
  const row = root.getByText("Components", { exact: true });
  await row.click(); await row.click(); await row.click();
  await expect(root.getByRole("treeitem", { name: "Input", exact: true })).toBeVisible();
  await expect.poll(() => root.locator('[role="group"]').evaluate(element => Math.round(element.getBoundingClientRect().height))).toBeGreaterThan(100);
  const remote = page.getByRole("tree", { name: "Remote files", exact: true });
  await remote.getByText("Remote files", { exact: true }).click();
  await remote.getByRole("button", { name: "Retry loading files" }).click();
  await expect(remote.getByRole("treeitem", { name: "Report.pdf" })).toBeVisible();
});

test("Tree compact sizes and full-row paint have measured geometry", async ({ page }) => {
  await page.goto("/tree");
  for (const [size, height] of [["xs", 24], ["sm", 28], ["md", 32]] as const) {
    const row = page.locator(`#sizes .brick-tree[data-size="${size}"] .brick-tree__item-content`).first();
    await expect.poll(() => row.evaluate(element => Math.round(element.getBoundingClientRect().height))).toBe(height);
  }
  const root = page.locator("#sizes .brick-tree").first();
  const rows = root.locator(".brick-tree__item-content");
  const widths = await rows.evaluateAll(elements => elements.map(element => Math.round(element.getBoundingClientRect().width)));
  expect(new Set(widths).size).toBe(1);
});

test("TreeGrid checkbox controls and remote pages recover without losing hierarchy", async ({ page }) => {
  await page.goto("/tree-grid");
  const grid = page.getByRole("treegrid", { name: "Select project files", exact: true });
  await grid.getByRole("checkbox", { name: "Select App.tsx", exact: true }).click();
  await expect(grid.locator('[data-value="app"]')).toHaveAttribute("aria-selected", "true");
  await page.getByRole("button", { name: "Clear selection", exact: true }).click();
  await expect(grid.getByRole("checkbox", { name: "Select App.tsx", exact: true })).not.toBeChecked();
  await page.getByRole("button", { name: "Retry projects", exact: true }).click();
  await expect(page.getByRole("treegrid", { name: "Remote projects" })).toBeVisible();
  await page.getByRole("button", { name: "Next page", exact: true }).click();
  await expect(page.getByRole("treegrid", { name: "Remote projects" }).getByText("Project 2")).toBeVisible();
  await expect(page.getByRole("treegrid", { name: "Remote projects" }).getByRole("row").first()).toHaveAttribute("aria-rowindex", "3");
});
test("file explorer artwork follows expansion without changing accessible names", async ({ page }) => {
  await page.goto("/tree");
  const tree = page.getByRole("tree", { name: "Project files", exact: true }).first();
  const source = tree.getByRole("treeitem", { name: "src", exact: true });
  await expect(tree.locator(".brick-tree__indicator")).toHaveCount(0);
  await expect(source.locator(":scope > .brick-tree__item-content .lucide-folder-open")).toBeVisible();
  await expect(tree.getByRole("treeitem", { name: "App.tsx", exact: true }).locator(".lucide-file")).toBeVisible();
  await tree.focus();
  await page.keyboard.press("Home");
  await page.keyboard.press("ArrowLeft");
  await expect(source).toHaveAttribute("aria-expanded", "false");
  await expect(source.locator(".lucide-folder")).toBeVisible();
});

test("multiple selection uses modifiers and guides align to artwork in both directions", async ({ page }) => {
  await page.goto("/tree");
  const tree = page.locator("#controlled [role=tree]");
  const app = tree.getByRole("treeitem", { name: "App.tsx", exact: true });
  const styles = tree.getByRole("treeitem", { name: "styles.css", exact: true });
  await app.click();
  await styles.click({ modifiers: ["ControlOrMeta"] });
  await expect(app).toHaveAttribute("aria-selected", "true");
  await expect(styles).toHaveAttribute("aria-selected", "true");
  await styles.click();
  await expect(app).toHaveAttribute("aria-selected", "false");
  await tree.press("Shift+ArrowUp");
  await expect(app).toHaveAttribute("aria-selected", "true");
  for (const dir of ["ltr", "rtl"]) {
    const guided = page.getByRole("tree", { name: "Guided hierarchy", exact: true });
    await guided.evaluate((node, direction) => node.setAttribute("dir", direction), dir);
    const delta = await guided.evaluate(node => {
      const group = node.querySelector('[role=group]')!;
      const icon = node.querySelector('.brick-tree__item-content .brick-icon')!.getBoundingClientRect();
      const box = group.getBoundingClientRect();
      const css = getComputedStyle(group, '::before');
      const position = getComputedStyle(node).direction === 'rtl' ? box.right - parseFloat(css.right) : box.left + parseFloat(css.left);
      return Math.abs(position - (icon.left + icon.width / 2));
    });
    expect(delta).toBeLessThanOrEqual(1);
  }
  await expect(page.getByRole("tree", { name: "Default indentation", exact: true })).not.toHaveAttribute("data-guide");
});
