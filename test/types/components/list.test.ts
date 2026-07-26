import { createElement, createRef } from "react";
import { List, type ListDensity, type ListMarker, type ListSize, type ListVariant } from "../../../src/list.js";
import { List as RootList } from "../../../src/index.js";

const rootRef = createRef<HTMLUListElement | HTMLOListElement>();
const itemRef = createRef<HTMLLIElement>();
const variants: ListVariant[] = ["plain", "divided", "bordered"];
const sizes: ListSize[] = ["sm", "md", "lg"];
const densities: ListDensity[] = ["compact", "comfortable"];
const markers: ListMarker[] = ["auto", "disc", "circle", "square", "decimal", "lower-alpha", "upper-alpha", "lower-roman", "upper-roman", "none"];

createElement(List.Root, { density: "compact", marker: "upper-roman", ordered: true, ref: rootRef, reversed: true, size: "lg", start: 4, variant: "bordered" },
  createElement(List.Item, { disabled: true, ref: itemRef, value: 7 },
    createElement(List.Leading, null, "✓"),
    createElement(List.Content, null, createElement(List.Title, null, "Build"), createElement(List.Description, null, "Passed")),
    createElement(List.Trailing, null, "Ready")));
createElement(RootList.Root, null, createElement(RootList.Item, null, "One"));

// @ts-expect-error Variant values are closed.
createElement(List.Root, { variant: "raised" });
// @ts-expect-error Size values are closed.
createElement(List.Root, { size: "xl" });
// @ts-expect-error Density values are closed.
createElement(List.Root, { density: "dense" });
// @ts-expect-error Marker values are closed.
createElement(List.Root, { marker: "check" });

void variants; void sizes; void densities; void markers; void rootRef; void itemRef;
