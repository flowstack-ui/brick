import { readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import postcss from "postcss";
import { componentIds } from "./component-test-manifest.mjs";

/** Source guard only. Browser geometry, contrast and virtual focus need owner tests. */
export function inspectFocusCss(css, file, exceptions = []) {
  const errors = [];
  postcss.parse(css).walkRules(rule => {
    if (!/:focus|\[data-focus/.test(rule.selector)) return;
    let forced = false;
    for (let parent = rule.parent; parent; parent = parent.parent) {
      if (parent.type === "atrule" && /forced-colors:\s*active/.test(parent.params)) forced = true;
    }
    const declarations = rule.nodes.filter(node => node.type === "decl");
    for (const declaration of declarations) {
      if (!/^outline(?:-width|-offset)?$/.test(declaration.prop)) continue;
      if (!/(?:\d|\.)+(?:px|rem)/.test(declaration.value)) continue;
      const key = `${file}|${rule.selector.replace(/\s+/g, " ")}|${declaration.prop}|${declaration.value.replace(/\s+/g, " ")}`;
      if (!exceptions.some(exception => exception.key === key && exception.reason)) errors.push(`Unclassified focus literal: ${key}`);
    }
    if (forced && declarations.some(d => d.prop === "box-shadow" && d.value !== "none") &&
        !declarations.some(d => /^outline/.test(d.prop) && d.value !== "none" && d.value !== "0")) {
      errors.push(`Shadow-only forced-color focus: ${file}: ${rule.selector}`);
    }
  });
  return errors;
}

export async function verifyFocusPolicy() {
  const policy = JSON.parse(await readFile(new URL("focus-policy.json", import.meta.url), "utf8"));
  const errors = [];
  const known = Object.keys(policy.owners).sort();
  if (JSON.stringify(known) !== JSON.stringify([...componentIds].sort())) errors.push("Focus ownership must classify every current public owner exactly once.");
  for (const [owner, entry] of Object.entries(policy.owners)) {
    if (!["direct", "field", "composite", "delegated", "passive", "clipping"].includes(entry.kind) || !entry.reason) errors.push(`Invalid focus owner: ${owner}`);
  }
  const root = new URL("../src/components/", import.meta.url);
  for (const directory of await readdir(root, { withFileTypes: true })) {
    if (!directory.isDirectory()) continue;
    const path = new URL(`${directory.name}/`, root);
    for (const name of await readdir(path)) {
      if (!name.endsWith(".css")) continue;
      const file = `src/components/${directory.name}/${name}`;
      errors.push(...inspectFocusCss(await readFile(new URL(name, path), "utf8"), file, policy.literalExceptions));
    }
  }
  if (errors.length) throw new Error(errors.join("\n"));
  console.log(`Focus source policy: ${known.length} owners classified; no new focus literals or shadow-only forced-color rules.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await verifyFocusPolicy();
