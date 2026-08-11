import { createElement, createRef } from "react";
import { ZStack, ZStackRoot, type ZStackAlign, type ZStackRootProps } from "../../../src/z-stack.js";
import { ZStack as RootZStack } from "../../../src/index.js";

const ref = createRef<HTMLElement>();
const aligns: ZStackAlign[] = ["stretch", "start", "center", "end"];
const props: ZStackRootProps = { as: "section", align: "center", justify: "end" };
createElement(ZStack.Root, { ...props, ref });
createElement(ZStackRoot, props);
createElement(RootZStack.Root, props);
createElement(ZStack.Item, { align: "end", justify: "start" });
createElement(ZStack.Item, { asChild: true, children: createElement("span") });
createElement(ZStack.Root, { align: { initial: "stretch", md: "center" }, justify: { initial: "start", lg: "end" } });
createElement(ZStack.Item, { align: { initial: "auto", md: "end" }, justify: { initial: "start", lg: "center" } });
// @ts-expect-error responsive placement requires initial
createElement(ZStack.Root, { align: { md: "center" } });
// @ts-expect-error closed placement
createElement(ZStack.Root, { align: "baseline" });
// @ts-expect-error visual ordering is excluded
createElement(ZStack.Item, { order: 2 });
void aligns;
