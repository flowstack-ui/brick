import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const appDirectory = fileURLToPath(new URL("../", import.meta.url));

test("the consumer uses public package exports without source aliases", async () => {
  const files = await Promise.all([
    readFile(new URL("../src/main.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/App.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/styles.css", import.meta.url), "utf8"),
    readFile(new URL("../vite.config.ts", import.meta.url), "utf8"),
  ]);
  const source = files.join("\n");

  assert.match(source, /@flowstack-ui\/brick\/button/);
  assert.match(source, /@flowstack-ui\/brick\/icon-button/);
  assert.match(source, /@flowstack-ui\/brick\/app-bar/);
  assert.match(source, /@flowstack-ui\/brick\/card/);
  assert.match(source, /@flowstack-ui\/brick\/dialog/);
  assert.match(source, /@flowstack-ui\/brick\/alert-dialog/);
  assert.match(source, /@flowstack-ui\/brick\/drawer/);
  assert.match(source, /@flowstack-ui\/brick\/badge/);
  assert.match(source, /@flowstack-ui\/brick\/avatar/);
  assert.match(source, /@flowstack-ui\/brick\/toggle/);
  assert.match(source, /@flowstack-ui\/brick\/toggle-group/);
  assert.match(source, /@flowstack-ui\/brick\/tooltip/);
  assert.match(source, /@flowstack-ui\/brick\/hover-card/);
  assert.match(source, /@flowstack-ui\/brick\/popover/);
  assert.match(source, /@flowstack-ui\/brick\/form/);
  assert.match(source, /@flowstack-ui\/brick\/field/);
  assert.match(source, /@flowstack-ui\/brick\/fieldset/);
  assert.match(source, /@flowstack-ui\/brick\/checkbox/);
  assert.match(source, /@flowstack-ui\/brick\/checkbox-group/);
  assert.match(source, /@flowstack-ui\/brick\/styles\.css/);
  assert.match(source, /@flowstack-ui\/brick\/reset\.css/);
  assert.doesNotMatch(source, /\.\.\/\.\.\/(?:src|dist)/);
  assert.doesNotMatch(source, /resolve\s*:\s*\{[^}]*alias/s);
});

test("the consumer declares the standalone Brick package and a lean toolchain", async () => {
  const packageJson = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8"),
  );

  assert.equal(packageJson.private, true);
  assert.match(packageJson.dependencies["@flowstack-ui/brick"], /^file:/);
  assert.equal(packageJson.dependencies.next, undefined);
  assert.equal(packageJson.devDependencies.tailwindcss, undefined);
  assert.ok(appDirectory.endsWith("/consumer/"));
});
