import type { OwnerPart } from "../../shared/OwnerDocumentation.js";
export const parts: OwnerPart[] = [
  {
    id: "props-list",
    title: "List",
    description: "Top-level navigation row or column; resets inner destination presentation for nested navigation.",
    rows: [{ name: "surface", typeLabel: "'transparent' | 'raised'", defaultLabel: "transparent", description: "Integrate into a header, or paint a compact standalone bar matching the panel." }],
  },
  {
    id: "props-root",
    title: "Root",
    description:
      "Native navigation landmark and disclosure policy; not a command menu.",
    rows: [
      {
        name: "viewport",
        typeLabel: "boolean",
        defaultLabel: "true",
        description: "Use false and omit Viewport for inline panel hosts.",
      },
      {
        name: "onValueChange",
        typeLabel: "(value: string | null) => void",
        defaultLabel: "—",
        description: "Reports the next active disclosure or null when closed.",
      },
      {
        name: "loop",
        typeLabel: "boolean",
        defaultLabel: "true",
        description:
          "Wrap top-level keyboard navigation; Content can override its own loop.",
      },
      {
        name: "skipDelayDuration",
        typeLabel: "number",
        defaultLabel: "300",
        description: "Re-entry window in milliseconds after closing.",
      },
      {
        name: "delayDuration",
        typeLabel: "number",
        defaultLabel: "200",
        description:
          "Compatibility fallback for each opening or closing delay not explicitly supplied.",
      },
      {
        name: "hideMode",
        typeLabel: "'display-none' | 'activity'",
        defaultLabel: "display-none",
        description: "Retained host hiding; activity requires React 19.2+.",
      },
      {
        name: "size",
        typeLabel: "'sm' | 'md' | 'lg'",
        defaultLabel: "md",
        description: "Button-aligned control geometry.",
      },
      {
        name: "variant",
        typeLabel: "'subtle' | 'plain'",
        defaultLabel: "subtle",
        description: "Hover and open presentation.",
      },
      {
        name: "tone",
        typeLabel: "NavigationMenuTone",
        defaultLabel: "neutral",
        description: "Neutral, accent or contrast interaction palette inherited by triggers and inner links.",
      },
      {
        name: "value / defaultValue",
        typeLabel: "string | null",
        defaultLabel: "null",
        description: "Controlled or initial active disclosure.",
      },
      {
        name: "openDelay / closeDelay",
        typeLabel: "number",
        defaultLabel: "200 / 200",
        description:
          "Independent milliseconds; explicit values override legacy delayDuration.",
      },
      {
        name: "disableClickTrigger / disableHoverTrigger / disablePointerLeaveClose",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Independent pointer policies; keyboard access remains.",
      },
      {
        name: "lazyMount / unmountOnExit",
        typeLabel: "boolean",
        defaultLabel: "true / true",
        description: "Mounting and retention policy.",
      },
      {
        name: "orientation / dir",
        typeLabel: "'horizontal' | 'vertical' / 'ltr' | 'rtl'",
        defaultLabel: "horizontal / inherited",
        description: "Logical navigation and placement.",
      },
    ],
  },
  {
    id: "props-trigger",
    title: "Trigger",
    description:
      "Native disclosure button; controls and accessible relationships stay component-owned.",
    rows: [
      {
        name: "indicator",
        typeLabel: "ReactNode",
        defaultLabel: "Default chevron",
        description: "undefined default, null none, custom replaces.",
      },
      {
        name: "variant / tone",
        typeLabel: "Root recipe types",
        defaultLabel: "Inherited",
        description: "Per-control presentation.",
      },
      {
        name: "radius",
        typeLabel: "Radius",
        defaultLabel: "control",
        description: "Shared core or semantic corner shape.",
      },
      {
        name: "disabled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Nonactivatable disclosure.",
      },
    ],
  },
  {
    id: "props-content",
    title: "Content",
    description:
      "Real rendered panel host, inline or presented in the shared viewport.",
    rows: [
      {
        name: "loop",
        typeLabel: "boolean",
        defaultLabel: "Inherited",
        description:
          "Wrap keyboard movement among this panel's focusable elements.",
      },
      {
        name: "onEscapeKeyDown",
        typeLabel: "(event: KeyboardEvent) => void",
        defaultLabel: "—",
        description: "Prevent the event to cancel Escape dismissal.",
      },
      {
        name: "onPointerDownOutside / onFocusOutside / onInteractOutside",
        typeLabel: "Cancelable outside-event callbacks",
        defaultLabel: "—",
        description:
          "Prevent the notification to cancel dismissal; native focus is not trapped.",
      },
      {
        name: "inset",
        typeLabel: "'none' | 'sm' | 'md' | 'lg'",
        defaultLabel: "sm",
        description: "Compact 8px default; md for rich grids, none for composed internal surfaces.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        defaultLabel: "false / —",
        description:
          "Forward props, handlers and ref to the actual panel host.",
      },
    ],
  },
  {
    id: "props-link",
    title: "Link",
    description:
      "Native destination with independent current-page and close behavior.",
    rows: [
      {
        name: "tone",
        typeLabel: "NavigationMenuTone",
        defaultLabel: "Inherited",
        description:
          "Override the control state palette; rich panel links keep composed Surface paint ownership.",
      },
      {
        name: "radius",
        typeLabel: "Radius",
        defaultLabel: "Contextual",
        description: "Core or semantic radius; destination defaults to sm, top-level control to control.",
      },
      {
        name: "active",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Marks the current page.",
      },
      {
        name: "variant",
        typeLabel: "'control' | 'destination' | 'panel'",
        defaultLabel: "Contextual",
        description: "Destination inside Content, control outside. Panel delegates paint to a composed Surface. Explicit choices override context.",
      },
      {
        name: "controlVariant",
        typeLabel: "'subtle' | 'plain'",
        defaultLabel: "Inherited",
        description:
          "Control hover/open recipe, independent from panel layout.",
      },
      {
        name: "closeOnClick",
        typeLabel: "boolean",
        defaultLabel: "true",
        description: "Whether accepted selection closes its disclosure.",
      },
      {
        name: "onSelect",
        typeLabel: "(event: Event) => void",
        defaultLabel: "—",
        description:
          "Prevent internal selection/close separately from native navigation.",
      },
    ],
  },
  {
    id: "props-viewport",
    title: "Viewport",
    description: "Optional shared, measured and collision-aware panel shell.",
    rows: [
      {
        name: "anchor",
        typeLabel: '"trigger" | "navigation"',
        defaultLabel: '"trigger"',
        description:
          "Align the shared viewport to the active trigger or the navigation root, retaining collision handling.",
      },
      {
        name: "align",
        typeLabel: "'start' | 'center' | 'end'",
        defaultLabel: "center",
        description: "Logical active-trigger alignment.",
      },
      {
        name: "collisionPadding",
        typeLabel: "number",
        defaultLabel: "8",
        description: "Available viewport boundary padding.",
      },
      {
        name: "radius",
        typeLabel: "Radius",
        defaultLabel: "sm",
        description: "Shared core or semantic radius.",
      },
      {
        name: "forceMount",
        typeLabel: "boolean",
        defaultLabel: "false",
        description:
          "Compatibility shell mounting option; inactive panels remain inaccessible.",
      },
    ],
  },
  {
    id: "props-sub",
    title: "Sub",
    description: "Nested independently controlled navigation scope.",
    rows: [
      {
        name: "value / defaultValue",
        typeLabel: "string | null",
        defaultLabel: "null",
        description: "Own active item value.",
      },
      {
        name: "openDelay / closeDelay",
        typeLabel: "number",
        defaultLabel: "Inherited",
        description: "Local timing overrides.",
      },
    ],
  },
  {
    id: "props-indicator",
    title: "Indicator",
    description:
      "Optional moving marker, separate from each trigger's chevron.",
    rows: [
      {
        name: "forceMount",
        typeLabel: "boolean",
        defaultLabel: "false",
        description:
          "Keep the moving indicator host mounted while no panel is active.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        defaultLabel: "false / —",
        description: "Replace the noninteractive host.",
      },
    ],
  },
  {
    id: "props-item-indicator",
    title: "ItemIndicator",
    description:
      "Decorative per-item state slot, passed through Trigger's indicator prop when custom state-aware artwork is needed.",
    rows: [
      {
        name: "children",
        typeLabel: "ReactNode",
        defaultLabel: "Chevron",
        description:
          "Custom decorative artwork; the slot exposes open/closed state and stays hidden from assistive technology.",
      },
    ],
  },
  {
    id: "props-root-provider",
    title: "RootProvider",
    description:
      "Mounts the state created by useNavigationMenu without duplicating Root's controlled options.",
    rows: [
      {
        name: "value",
        typeLabel: "UseNavigationMenuReturn",
        defaultLabel: "Required",
        description:
          "Controller returned by useNavigationMenu; Root presentation props remain available.",
      },
    ],
  },
  {
    id: "props-context",
    title: "Context",
    description:
      "Reads live navigation state and public actions inside the root.",
    rows: [
      {
        name: "children",
        typeLabel: "(api: NavigationMenuApi) => ReactNode",
        defaultLabel: "Required",
        description:
          "Reads value, open and orientation; exposes setValue, getViewportNode, isViewportRendered and reposition.",
      },
    ],
  },
];
