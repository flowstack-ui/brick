import { Sidebar, type SidebarPosition, type SidebarRootProps, type SidebarSize, type SidebarSurface, type SidebarVariant } from "../../../src/sidebar.js";
const variant: SidebarVariant = "docked";
const size: SidebarSize = "md";
const position: SidebarPosition = "sticky";
const surface: SidebarSurface = "transparent";
const root: SidebarRootProps = { children: null, variant, size, position, surface, collapsedState: "rail" };
void Sidebar; void root;
// @ts-expect-error unsupported variant
const badVariant: SidebarVariant = "solid";
// @ts-expect-error native numeric size is replaced by the Brick recipe
const badSize: SidebarRootProps = { size: 2 };
// @ts-expect-error unsupported surface
const badSurface: SidebarSurface = "overlay";
void badVariant; void badSize; void badSurface;
