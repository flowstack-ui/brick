import assert from "node:assert/strict";
import test from "node:test";
import { useSelection, useSelectionCheckbox } from "../../dist/selection.js";
import { ActionDelegate } from "../../dist/action-delegate.js";
import * as root from "../../dist/index.js";
import * as selection from "@flowstack-ui/atom/selection";
import * as delegate from "@flowstack-ui/atom/action-delegate";

test("Brick exposes exact Atom behavior through public utility entrypoints", () => {
  assert.equal(useSelection, selection.useSelection);
  assert.equal(useSelectionCheckbox, selection.useSelectionCheckbox);
  assert.equal(ActionDelegate, delegate.ActionDelegate);
  assert.equal(root.useSelection, useSelection);
  assert.equal(root.useSelectionCheckbox, useSelectionCheckbox);
  assert.equal(root.ActionDelegate, ActionDelegate);
});
