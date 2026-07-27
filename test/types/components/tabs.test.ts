import { createElement, createRef } from "react";
import { Tabs, TabsRoot, type TabsRootProps, type TabsSize, type TabsVariant } from "../../../src/tabs.js";
import { Tabs as RootTabs } from "../../../src/index.js";
const ref = createRef<HTMLDivElement>();
const sizes: TabsSize[] = ["sm", "md", "lg"];
const variants: TabsVariant[] = ["line", "solid", "soft", "enclosed"];
const props: TabsRootProps = { defaultValue: "one", size: "md", variant: "line", fullWidth: true };
createElement(Tabs.Root, { ...props, ref }, createElement(Tabs.List, { ariaLabel: "Sections" }, createElement(Tabs.Trigger, { value: "one" }, "One")), createElement(Tabs.Content, { value: "one" }, "Panel"));
createElement(TabsRoot, props);
createElement(RootTabs.Root, props);
// @ts-expect-error closed size
createElement(Tabs.Root, { size: "xl" });
// @ts-expect-error closed variant
createElement(Tabs.Root, { variant: "ghost" });
void sizes; void variants;
