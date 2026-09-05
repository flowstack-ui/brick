import { createElement, createRef } from "react";
import { Tabs, TabsRoot, type TabsContentInset, type TabsLayout, type TabsListColumns, type TabsListRadius, type TabsRootProps, type TabsSize, type TabsTriggerRadius, type TabsVariant } from "../../../src/tabs.js";
import { Tabs as RootTabs } from "../../../src/index.js";
const ref = createRef<HTMLDivElement>();
const sizes: TabsSize[] = ["sm", "md", "lg"];
const variants: TabsVariant[] = ["line", "solid", "soft", "enclosed"];
const insets: TabsContentInset[] = ["none", "sm", "md", "lg"];
const layouts: TabsLayout[] = ["auto", "stacked", "side"];
const listColumns: TabsListColumns[] = [1, 2, 3, 4];
const listRadii: TabsListRadius[] = ["default", "none"];
const triggerRadii: TabsTriggerRadius[] = ["default", "none"];
const props: TabsRootProps = { defaultValue: "one", size: "md", variant: "line", fullWidth: true };
createElement(Tabs.Root, { ...props, ref }, createElement(Tabs.List, { ariaLabel: "Sections" }, createElement(Tabs.Trigger, { value: "one" }, "One")), createElement(Tabs.Content, { value: "one" }, "Panel"));
createElement(TabsRoot, props);
createElement(RootTabs.Root, props);
createElement(Tabs.Content, { inset: "none", value: "one" }, "Panel");
createElement(Tabs.Root, { layout: { initial: "stacked", lg: "side" }, orientation: "vertical" });
createElement(Tabs.List, { columns: { initial: 2, lg: 1 } });
createElement(Tabs.List, { radius: "none", triggerRadius: "default" });
// @ts-expect-error closed size
createElement(Tabs.Root, { size: "xl" });
// @ts-expect-error closed variant
createElement(Tabs.Root, { variant: "ghost" });
// @ts-expect-error closed content inset
createElement(Tabs.Content, { inset: "xl", value: "one" });
createElement(Tabs.Root, { layout: { lg: "side" } });
// @ts-expect-error closed list column count
createElement(Tabs.List, { columns: 5 });
// @ts-expect-error closed list radius
createElement(Tabs.List, { radius: "full" });
// @ts-expect-error closed trigger radius
createElement(Tabs.List, { triggerRadius: "full" });
void sizes; void variants; void insets; void layouts; void listColumns; void listRadii; void triggerRadii;
