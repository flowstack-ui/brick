import assert from "node:assert/strict";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
const root = fileURLToPath(new URL("../", import.meta.url));
await mkdir(`${root}/test-results/surface-effects`, { recursive: true });
const require = createRequire(`${root}/package.json`);
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { chromium, firefox, webkit } = require("playwright");
const { Surface } = await import(`${root}/dist/surface.js`);
const { AppBar } = await import(`${root}/dist/app-bar.js`);
const { BottomNavigation } = await import(`${root}/dist/bottom-navigation.js`);
const e = React.createElement;
const css = (
  await Promise.all(
    ["core", "surface", "app-bar", "bottom-navigation"].map((x) =>
      readFile(`${root}/dist/styles/${x}.css`, "utf8"),
    ),
  )
).join("\n");
console.log("Loaded CSS");
const tree = e(
  "main",
  null,
  e(
    Surface,
    {
      id: "outer",
      treatment: "translucent",
      backgroundOpacity: 0.6,
      backdropBlur: "18px",
      bordered: true,
      borderOpacity: 0.5,
      inset: "lg",
    },
    "Outer",
    e(Surface, { id: "inner", inset: "md" }, "Opaque child"),
    e("button", null, "Focusable"),
  ),
  e(
    Surface,
    {
      id: "identity",
      treatment: "translucent",
      backdropBlur: "none",
      backdropSaturate: 1,
    },
    "Identity",
  ),
  e(Surface, { id: "bare", level: "transparent" }, "Bare"),
  e(
    Surface,
    {
      id: "glass",
      level: "transparent",
      tone: "accent",
      treatment: "translucent",
    },
    "Transparent glass",
  ),
  e(
    AppBar.Root,
    { id: "bar", treatment: "translucent", backdropBlur: "lg" },
    e(AppBar.Toolbar, null, "App bar"),
  ),
  e(
    AppBar.Root,
    { id: "legacy", blurred: true },
    e(AppBar.Toolbar, null, "Legacy"),
  ),
  e(AppBar.Root, { id: "reset", blurred: true, treatment: "none" }, "Reset"),
  e(
    BottomNavigation.Root,
    {
      id: "bottom",
      position: "static",
      variant: "surface",
      treatment: "translucent",
      backgroundOpacity: 0.7,
      "aria-label": "Views",
    },
    e(
      BottomNavigation.Item,
      { value: "home", href: "#home" },
      e(BottomNavigation.Label, null, "Home"),
    ),
  ),
);
const html = `<style>${css}</style><style>body{background:repeating-linear-gradient(45deg,#6688bb 0 30px,#dbbb99 30px 60px)}main{padding:20px;display:grid;gap:12px}</style>${renderToStaticMarkup(tree)}`;
console.log("Rendered HTML", html.length);
const results = [];
for (const [name, engine] of Object.entries({ chromium, firefox, webkit })) {
  console.log("Launching", name);
  const browser = await engine.launch();
  const page = await browser.newPage({ viewport: { width: 900, height: 900 } });
  await page.setContent(html);
  console.log("Painted", name);
  const read = () =>
    page.evaluate(() =>
      Object.fromEntries(
        [
          "outer",
          "inner",
          "identity",
          "bare",
          "glass",
          "bar",
          "legacy",
          "reset",
          "bottom",
        ].map((id) => {
          const x = document.getElementById(id),
            c = getComputedStyle(x);
          return [
            id,
            {
              filter: c.backdropFilter,
              bg: c.backgroundColor,
              color: c.color,
              opacity: c.opacity,
              overflow: c.overflow,
              custom: c.getPropertyValue("--brick-surface-effect-opacity"),
            },
          ];
        }),
      ),
    );
  const normal = await read();
  assert.equal(normal.outer.filter, "blur(18px) saturate(1.15)");
  assert.equal(normal.inner.filter, "none");
  assert.equal(normal.inner.custom.trim(), "");
  assert.equal(normal.outer.opacity, "1");
  assert.equal(normal.identity.filter, "none");
  assert.equal(normal.reset.filter, "none");
  assert.match(normal.bar.filter, /blur\(24px\)/);
  assert.match(normal.bottom.bg, /(0\.7|70%)/);
  await page.locator("button").focus();
  assert.equal(
    await page.locator("button").evaluate((x) => document.activeElement === x),
    true,
  );
  if (name === "chromium")
    await page.screenshot({
      path: `${root}/test-results/surface-effects/light.png`,
    });
  // Exercise compiled fallback branches deterministically, separately from OS detection.
  await page.setContent(
    html.replace(
      /@media\s*\(prefers-reduced-transparency:\s*reduce\)/g,
      "@media all",
    ),
  );
  const reduced = await read();
  assert.equal(reduced.outer.filter, "none");
  assert.equal(reduced.glass.filter, "none");
  assert.match(reduced.bare.bg, /(?:rgba\(0, 0, 0, 0\)|transparent|\/ 0\))/);
  assert.notEqual(reduced.glass.bg, normal.glass.bg);
  await page.setContent(
    html.replace(
      /@supports[^{}]+\{/g,
      "@supports (flowstack-unsupported: true){",
    ),
  );
  const unsupported = await read();
  assert.equal(unsupported.outer.filter, "none");
  assert.notEqual(unsupported.outer.bg, normal.outer.bg);
  await page.setContent(
    html.replace(/@media\s*\(forced-colors:\s*active\)/g, "@media all"),
  );
  assert.equal((await read()).outer.filter, "none");
  await page.setContent(html);
  await page
    .locator("main")
    .evaluate((el) => el.setAttribute("data-brick-appearance", "dark"));
  const dark = await read();
  assert.equal(dark.outer.filter, normal.outer.filter);
  assert.notEqual(dark.outer.bg, normal.outer.bg);
  if (name === "chromium")
    await page.screenshot({
      path: `${root}/test-results/surface-effects/dark.png`,
    });
  const preference = await page.evaluate(
    () => matchMedia("(prefers-reduced-transparency: reduce)").matches,
  );
  results.push({
    engine: name,
    normal,
    reduced,
    unsupported,
    dark,
    preference,
  });
  await browser.close();
}
await writeFile(
  `${root}/test-results/surface-effects/results.json`,
  JSON.stringify(results, null, 2),
);
console.log(
  results.map((x) => ({
    engine: x.engine,
    preference: x.preference,
    outer: x.normal.outer,
    bottom: x.normal.bottom,
  })),
);
