import assert from "node:assert/strict";
import test from "node:test";
import { findHighlightSegments as rootSegments } from "../../dist/index.js";
import { findHighlightSegments as subpathSegments } from "../../dist/highlight.js";
import { findHighlightSegments as atomSegments } from "@flowstack-ui/atom/highlight";

test("Highlight utility is identical through root, subpath and Atom", () => {
  assert.equal(rootSegments, subpathSegments);
  assert.equal(subpathSegments, atomSegments);
  assert.deepEqual(rootSegments("durable", {query:"durable"}), [
    {text:"durable",match:true,start:0,end:7,query:"durable"},
  ]);
});
