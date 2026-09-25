import { CheckboxGroup } from "../../../src/checkbox-group.js";
import type { CheckboxGroupRootProps, CheckboxGroupParentProps } from "../../../src/checkbox-group.js";
void CheckboxGroup;
const root: CheckboxGroupRootProps = { allValues: ["email", "sms"], children: "Channels" };
const parent: CheckboxGroupParentProps = { children: "Select all" };
// @ts-expect-error The selectable collection belongs to Root, not Parent.
const incorrectParent: CheckboxGroupParentProps = { allValues: ["email"], children: "Select all" };
void root;
void parent;
void incorrectParent;
