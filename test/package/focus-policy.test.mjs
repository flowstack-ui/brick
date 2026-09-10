import assert from "node:assert/strict";
import { test } from "node:test";
import { inspectFocusCss, verifyFocusPolicy } from "../../scripts/verify-focus-policy.mjs";

test("focus policy rejects new literals and shadow-only forced colors", () => {
  assert.equal(inspectFocusCss(".x:focus-visible { outline: 2px solid red }", "x.css").length, 1);
  assert.equal(inspectFocusCss("@media (forced-colors: active) { .x:focus-within { box-shadow: 0 0 0 var(--width) Highlight } }", "x.css").length, 1);
  assert.equal(inspectFocusCss(".x:focus-visible { outline: var(--width) solid Highlight; outline-offset: calc(-1 * var(--width)) }", "x.css").length, 0);
});

test("focus policy classifies every public owner and guards component source", verifyFocusPolicy);
