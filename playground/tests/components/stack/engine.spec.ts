import { createElement as h } from "react";
import { renderToString } from "react-dom/server";
import { readFileSync } from "node:fs";
import { expect, test } from "../../evidence-test.js";
import { Stack, HStack, type StackProps } from "../../../../dist/stack.js";
import { Surface } from "../../../../dist/surface.js";
import { Button } from "../../../../dist/button.js";

const css = readFileSync("dist/styles.css", "utf8");
const children = ["Alpha", "Beta", "Gamma"].map((text) =>
  h("button", { key: text, type: "button" }, text),
);

test("all breakpoint boundaries apply independent gaps without nested inheritance", async ({
  page,
}) => {
  const content = renderToString(
    h(Stack, {
      gap: { initial: 1, sm: 2, md: 3, lg: 4, xl: 5 },
      rowGap: { md: 0 },
      children: h(Stack, { children: "Nested" }),
    }),
  );
  await page.setContent('<meta name="viewport" content="width=device-width, initial-scale=1">' + content);
  await page.addStyleTag({ content: css });
  const root = page.locator(".brick-stack").first();
  for (const [width, expected] of [
    [479, 4],
    [480, 8],
    [767, 8],
    [768, 12],
    [1023, 12],
    [1024, 16],
    [1279, 16],
    [1280, 20],
  ]) {
    await page.setViewportSize({ width, height: 800 });
    await expect(root).toHaveCSS("column-gap", `${expected}px`);
    await expect(root).toHaveCSS("row-gap", `${width >= 768 ? 0 : expected}px`);
    await expect(root.locator(".brick-stack")).toHaveCSS("gap", "0px");
  }
});

test("reverse axes map edge spacing logically and leave DOM and keyboard order intact", async ({
  page,
}) => {
  for (const dir of ["ltr", "rtl"])
    for (const direction of [
      "row",
      "row-reverse",
      "column",
      "column-reverse",
    ] as const) {
      await page.setContent(
        renderToString(
          h(Stack, {
            dir,
            direction,
            startSpacing: 2,
            endSpacing: 4,
            children,
          }),
        ),
      );
      await page.addStyleTag({ content: css });
      const root = page.locator(".brick-stack");
      const axis = direction.startsWith("row") ? "inline" : "block";
      await expect(root).toHaveCSS(
        `padding-${axis}-${direction.endsWith("reverse") ? "end" : "start"}`,
        "8px",
      );
      await expect(root).toHaveCSS(
        `padding-${axis}-${direction.endsWith("reverse") ? "start" : "end"}`,
        "16px",
      );
      await expect(root.locator("button")).toHaveText([
        "Alpha",
        "Beta",
        "Gamma",
      ]);
      await page.getByRole("button", { name: "Alpha" }).focus();
      await page.keyboard.press("Tab");
      await expect(page.getByRole("button", { name: "Beta" })).toBeFocused();
    }
});

test("longhands persist across recipe transitions and zero basis stays a length", async ({
  page,
}) => {
  await page.setContent(
    renderToString(
      h(HStack, {
        children: h(Stack.Item, {
          flex: { initial: "content", lg: 2 },
          shrink: 0,
          children: "Track",
        }),
      }),
    ),
  );
  await page.addStyleTag({ content: css });
  const item = page.locator(".brick-stack-item");
  await page.setViewportSize({ width: 700, height: 800 });
  await expect(item).toHaveCSS("flex", "0 0 auto");
  await page.setViewportSize({ width: 1100, height: 800 });
  await expect(item).toHaveCSS("flex", "2 0 0px");
});

test("same-host root and Item preserve independent alignment, margins and Surface inset in either CSS order", async ({
  page,
}) => {
  const tree = h(Stack.Item, {
    asChild: true,
    align: "end",
    marginInlineStart: "auto",
    children: h(Stack, {
      asChild: true,
      align: "center",
      children: h(Surface, { inset: "md", children: "Composed" }),
    }),
  });
  const stackCss = readFileSync("src/components/stack/stack.css", "utf8");
  const surfaceCss = readFileSync("src/components/surface/surface.css", "utf8");
  for (const order of [stackCss + surfaceCss, surfaceCss + stackCss]) {
    await page.setContent(renderToString(tree));
    await page.addStyleTag({ content: css + order });
    const host = page.locator(".brick-stack");
    await expect(host).toHaveCount(1);
    await expect(host).toHaveCSS("align-items", "center");
    await expect(host).toHaveCSS("align-self", "end");
    await expect(host).toHaveCSS("padding-inline-start", "24px");
    await expect(host).toHaveCSS("margin-inline-start", "0px");
  }
});

test("wrapping and line alignment expose actual flex behavior", async ({
  page,
}) => {
  await page.setContent(
    renderToString(
      h(Stack, {
        direction: "row",
        wrap: "wrap-reverse",
        alignContent: "space-between",
        columnGap: 3,
        rowGap: 2,
        style: { width: 240, height: 200 },
        children: [1, 2, 3].map((n) =>
          h(Stack.Item, { key: n, basis: 100, shrink: 0, children: String(n) }),
        ),
      }),
    ),
  );
  await page.addStyleTag({ content: css });
  const root = page.locator(".brick-stack");
  await expect(root).toHaveCSS("flex-wrap", "wrap-reverse");
  await expect(root).toHaveCSS("align-content", "space-between");
  const first = await root.locator(".brick-stack-item").first().boundingBox();
  const last = await root.locator(".brick-stack-item").last().boundingBox();
  expect(first!.y).toBeGreaterThan(last!.y);
});

test("fractional allocation, logical auto margin and composed controls retain geometry", async ({
  page,
}) => {
  await page.setContent(
    renderToString(
      h(HStack, {
        style: { width: 400 },
        children: [
          h(Stack.Item, { key: "a", grow: 0.5, basis: 0, children: "A" }),
          h(Stack.Item, { key: "b", grow: 1.5, basis: 0, children: "B" }),
        ],
      }),
    ),
  );
  await page.addStyleTag({ content: css });
  const tracks = page.locator(".brick-stack-item");
  expect((await tracks.nth(0).boundingBox())!.width).toBeCloseTo(100, 0);
  expect((await tracks.nth(1).boundingBox())!.width).toBeCloseTo(300, 0);
  await page.setContent(
    renderToString(
      h(HStack, {
        style: { width: 400 },
        children: [
          h("span", { key: "label" }, "Actions"),
          h(Stack.Item, {
            key: "action",
            asChild: true,
            marginInlineStart: "auto",
            children: h(Button, { children: "Save changes" }),
          }),
        ],
      }),
    ),
  );
  await page.addStyleTag({ content: css });
  const button = page.getByRole("button");
  const bounds = (await button.boundingBox())!;
  expect(bounds.height).toBeGreaterThanOrEqual(40);
  expect(bounds.x).toBeGreaterThan(200);
});

test("inline and responsive direction reset on the same host", async ({
  page,
}) => {
  const props: StackProps = {
    inline: { initial: true, lg: false },
    direction: { initial: "row-reverse", lg: "column" },
    startSpacing: 2,
    children,
  };
  await page.setContent(renderToString(h(Stack, props)));
  await page.addStyleTag({ content: css });
  const root = page.locator(".brick-stack");
  await page.setViewportSize({ width: 700, height: 800 });
  await expect(root).toHaveCSS("display", "inline-flex");
  await expect(root).toHaveCSS("padding-inline-end", "8px");
  await page.setViewportSize({ width: 1100, height: 800 });
  await expect(root).toHaveCSS("display", "flex");
  await expect(root).toHaveCSS("padding-block-start", "8px");
  await expect(root).toHaveCSS("padding-inline-end", "0px");
});
