import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const packageRoot = new URL("../../", import.meta.url);

test("package metadata defines the public Brick boundary", async () => {
  const packageJson = JSON.parse(
    await readFile(new URL("package.json", packageRoot), "utf8"),
  );

  assert.equal(packageJson.name, "@flowstack-ui/brick");
  assert.equal(packageJson.dependencies["@flowstack-ui/atom"], "0.2.1");
  assert.equal(
    packageJson.repository.url,
    "git+https://github.com/flowstack-ui/brick.git",
  );
  assert.deepEqual(packageJson.exports, {
    ".": {
      types: "./dist/index.d.ts",
      default: "./dist/index.js",
    },
    "./button": {
      types: "./dist/button.d.ts",
      default: "./dist/button.js",
    },
    "./styles.css": "./dist/styles.css",
    "./tokens.css": "./dist/tokens.css",
    "./reset.css": "./dist/reset.css",
  });
  assert.deepEqual(packageJson.sideEffects, ["**/*.css"]);
});

test("built package entrypoint can be imported without a CSS loader", async () => {
  const brick = await import(new URL("../../dist/index.js", import.meta.url));
  const button = await import(new URL("../../dist/button.js", import.meta.url));
  assert.deepEqual(Object.keys(brick), ["Button"]);
  assert.equal(button.Button, brick.Button);
});

test("published CSS entrypoints are complete browser CSS", async () => {
  const [styles, tokens, reset] = await Promise.all(
    ["styles.css", "tokens.css", "reset.css"].map((name) =>
      readFile(new URL(`../../dist/${name}`, import.meta.url), "utf8"),
    ),
  );

  assert.match(styles, /--brick-color-accent-solid/);
  assert.match(styles, /brick\.foundations/);
  assert.match(styles, /\.brick-button/);
  assert.match(styles, /box-sizing:\s*border-box/);
  assert.match(styles, /--brick-button-background/);
  assert.match(styles, /--brick-control-min-block-size-xl/);
  assert.match(tokens, /data-brick-appearance/);
  assert.match(reset, /brick\.reset/);
  assert.doesNotMatch(styles, /@(?:tailwind|source|theme|utility|custom-variant)/);
  assert.doesNotMatch(styles, /\.\.\//);
  assert.doesNotMatch(styles, /body\s*\{[^}]*margin:/);
});
