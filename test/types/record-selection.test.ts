import { createElement } from "react";
import { useSelection, useSelectionCheckbox, type SelectionOptions } from "../../src/selection.js";
import { ActionDelegate } from "../../src/action-delegate.js";
import { Checkbox, type CheckboxProps } from "../../src/checkbox.js";
import { Card } from "../../src/card.js";
import { List } from "../../src/list.js";
import { Table } from "../../src/table.js";
const options: SelectionOptions = { orderedKeys: ["one"] as const };
const binding: CheckboxProps = {} as ReturnType<typeof useSelectionCheckbox>;
createElement(Checkbox, binding);
createElement(Card.Root, { selected: true });
createElement(List.Item, { selected: true });
createElement(Table.Row, { selected: true });
createElement(ActionDelegate, { targetId: "one", children: createElement("article") });
// @ts-expect-error Explicit string IDs, not mutable positional indices.
const invalid: SelectionOptions = { orderedKeys: [1] };
// @ts-expect-error Selection paint is boolean, not a visual variant.
createElement(Table.Row, { selected: "accent" });
void [useSelection, options, invalid];
