import { createElement, createRef } from "react";
import {
  HStack,
  Stack,
  VStack,
  type HStackProps,
  type ResponsiveValue,
  type SpacingValue,
  type StackAlign,
  type StackDirection,
  type StackElement,
  type StackGap,
  type StackItemFlex,
  type StackItemProps,
  type StackJustify,
  type StackProps,
  type VStackProps,
} from "../../../src/stack.js";
import {
  Stack as RootStack,
  type SpacingValue as RootSpacingValue,
} from "../../../src/index.js";

const ref = createRef<HTMLElement>();
const elements: StackElement[] = [
  "div", "span", "section", "article", "nav", "header", "footer",
  "main", "aside", "ul", "ol", "li",
];
const directions: StackDirection[] = ["row", "column"];
const gaps: StackGap[] = ["0", "1", "2", "3", "4", "5", "6"];
const spacingValues: SpacingValue[] = [8, "2rem", "var(--section-gap)"];
const rootSpacingValue: RootSpacingValue = 8;
const aligns: StackAlign[] = ["stretch", "start", "center", "end", "baseline"];
const justifies: StackJustify[] = [
  "start", "center", "end", "between", "around", "evenly",
];
const props: StackProps = {
  "aria-label": "Actions",
  as: "nav",
  children: "Content",
  className: "consumer-stack",
  gap: "3",
  onClick: () => undefined,
  style: { minInlineSize: 0 },
  wrap: true,
};
const horizontal: HStackProps = { children: "Actions", gap: "2" };
const vertical: VStackProps = { children: "Fields", gap: "4" };
const responsiveDirection: ResponsiveValue<StackDirection> = { initial: "column", lg: "row" };
const itemFlex: StackItemFlex = 2;
const item: StackItemProps = { children: "Content", flex: itemFlex, align: "end" };

createElement(Stack, { ...props, ref });
createElement(RootStack, { ...props, ref });
createElement(HStack, { ...horizontal, ref });
createElement(VStack, { ...vertical, ref });
createElement(Stack, {});
createElement(Stack, { direction: responsiveDirection, gap: { initial: "2", md: "5" } });
createElement(Stack, { gap: 8, startSpacing: "2rem", endSpacing: "var(--edge-space)" });
createElement(Stack, { gap: { initial: 3, md: "2rem", lg: 8 } });
createElement(Stack.Item, item);
createElement(Stack.Item, { flex: { initial: "content", lg: 2 }, align: { initial: "auto", lg: "end" } });
createElement(Stack.Item, { asChild: true, children: createElement("section") });

// @ts-expect-error Stack hosts are deliberately closed.
createElement(Stack, { as: "table" });
createElement(Stack, { direction: "row-reverse" });
// @ts-expect-error Direction has a closed CSS vocabulary.
createElement(Stack, { direction: "diagonal" });
createElement(Stack, { justify: "space-between" });
// @ts-expect-error Wrapping is boolean only.
createElement(Stack, { wrap: "reverse" });
// @ts-expect-error HStack owns its direction.
createElement(HStack, { direction: "column" });
// @ts-expect-error VStack owns its direction.
createElement(VStack, { direction: "row" });
// @ts-expect-error Root has no asChild composition API.
createElement(Stack, { asChild: true });
createElement(Stack, { direction: { lg: "row" } });
createElement(Stack.Item, { order: 2 });

createElement(Stack, { asChild: true, children: createElement("section"), inline: { lg: true }, rowGap: 3, columnGap: 4, alignContent: "space-between", wrap: "wrap-reverse" });
createElement(Stack.Item, { grow: 0.5, shrink: { lg: 0 }, basis: { initial: "auto", lg: "35%" }, marginInlineStart: "auto" });
// @ts-expect-error Host choices are mutually exclusive.
createElement(Stack, { asChild: true, as: "section", children: createElement("div") });

void elements;
void directions;
void gaps;
void spacingValues;
void rootSpacingValue;
void aligns;
void justifies;
