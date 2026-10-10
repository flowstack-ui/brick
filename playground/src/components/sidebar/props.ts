import type {
  SidebarRootProps,
  SidebarPanelProps,
  SidebarMainProps,
  SidebarTriggerProps,
  SidebarHeaderProps,
  SidebarContentProps,
  SidebarFooterProps,
} from "@flowstack-ui/brick";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";
export const sidebarRootProps = [
  {
    name: "variant",
    defaultLabel: '"docked"',
    typeLabel: '"docked" | "floating"',
    description: "Persistent shell recipe; floating adds inset and elevation.",
  },
  {
    name: "size",
    defaultLabel: '"md"',
    typeLabel: '"sm" | "md" | "lg"',
    description: "Panel width and coordinated rail width.",
  },
  {
    name: "surface",
    typeLabel: '"transparent" | "base" | "raised"',
    description: "Defaults to base for docked and raised for floating.",
  },
  {
    name: "bordered",
    defaultLabel: "true",
    typeLabel: "boolean",
    description:
      "Panel, header and footer boundaries; independent of elevation.",
  },
  {
    name: "position",
    defaultLabel: '"static"',
    typeLabel: '"static" | "sticky"',
    description:
      "Sticky panel uses the public offset and available-height variables.",
  },
  {
    name: "state",
    typeLabel: "SidebarState",
    description: "Controlled expanded, rail or offcanvas state.",
  },
  {
    name: "defaultState",
    defaultLabel: '"expanded"',
    typeLabel: "SidebarState",
    description: "Uncontrolled initial state.",
  },
  {
    name: "collapsedState",
    defaultLabel: '"offcanvas"',
    typeLabel: '"rail" | "offcanvas"',
    description: "Target for collapse toggling.",
  },
  {
    name: "onStateChange",
    typeLabel: "(state: SidebarState) => void",
    description: "Receives state requests; commit them when controlled.",
  },
  {
    name: "side",
    defaultLabel: '"left"',
    typeLabel: '"left" | "right"',
    description: "Physical side, including RTL.",
  },
  {
    name: "disabled",
    defaultLabel: "false",
    typeLabel: "boolean",
    description: "Disables trigger state changes.",
  },
  {
    name: "asChild",
    defaultLabel: "false",
    typeLabel: "boolean",
    description: "Adopts one child host.",
  },
  {
    name: "render",
    typeLabel: "RenderProp",
    description: "Custom host alternative to asChild.",
  },
] as const satisfies readonly DocsPropDefinition<SidebarRootProps>[];
export const sidebarPanelProps = [
  {
    name: "asChild",
    defaultLabel: "false",
    typeLabel: "boolean",
    description:
      "Adopts a panel host while retaining inert offcanvas behavior.",
  },
] as const satisfies readonly DocsPropDefinition<SidebarPanelProps>[];
export const sidebarMainProps = [
  {
    name: "asChild",
    defaultLabel: "false",
    typeLabel: "boolean",
    description:
      "Use a non-main host when the page already has a main landmark.",
  },
] as const satisfies readonly DocsPropDefinition<SidebarMainProps>[];
export const sidebarTriggerProps = [
  {
    name: "toState",
    typeLabel: "SidebarState",
    description: "Explicit target, otherwise toggles expanded/collapsed.",
  },
  {
    name: "asChild",
    defaultLabel: "false",
    typeLabel: "boolean",
    description: "Compose a Button without nesting buttons.",
  },
] as const satisfies readonly DocsPropDefinition<SidebarTriggerProps>[];
export const sidebarHeaderProps = [
  {
    name: "inset",
    defaultLabel: '"default"',
    typeLabel: '"default" | "none"',
    description: "Header padding.",
  },
  {
    name: "asChild",
    defaultLabel: "false",
    typeLabel: "boolean",
    description: "Compose one existing host with merged events and refs.",
  },
] as const satisfies readonly DocsPropDefinition<SidebarHeaderProps>[];
export const sidebarContentProps = [
  {
    name: "inset",
    defaultLabel: '"default"',
    typeLabel: '"default" | "none"',
    description: "Content padding; Content is not a scroll owner.",
  },
  {
    name: "asChild",
    defaultLabel: "false",
    typeLabel: "boolean",
    description: "Compose one existing host with merged events and refs.",
  },
] as const satisfies readonly DocsPropDefinition<SidebarContentProps>[];
export const sidebarFooterProps = [
  {
    name: "inset",
    defaultLabel: '"default"',
    typeLabel: '"default" | "none"',
    description: "Footer padding.",
  },
  {
    name: "asChild",
    defaultLabel: "false",
    typeLabel: "boolean",
    description: "Compose one existing host with merged events and refs.",
  },
] as const satisfies readonly DocsPropDefinition<SidebarFooterProps>[];
