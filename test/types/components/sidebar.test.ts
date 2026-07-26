import { Sidebar, type SidebarPosition, type SidebarRootProps, type SidebarSize, type SidebarVariant } from "../../../src/sidebar.js";
const variant: SidebarVariant = "docked";
const size: SidebarSize = "md";
const position: SidebarPosition = "sticky";
const root: SidebarRootProps = { children: null, variant, size, position, collapsedState: "rail" };
void Sidebar; void root;
// @ts-expect-error unsupported variant
const badVariant: SidebarVariant = "solid";
// @ts-expect-error native numeric size is replaced by the Brick recipe
const badSize: SidebarRootProps = { size: 2 };
void badVariant; void badSize;
