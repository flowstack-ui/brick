import type { OwnerPart } from "../../shared/OwnerDocumentation.js";
import { actionMenuBehaviorParts } from "../../shared/ActionMenuParts.js";
export const parts: OwnerPart[] = [
  {
    id: "props-root",
    title: "Root",
    description:
      "Coordinates behavior and shared presentation. Popup styling belongs on Content, not a DOM-less provider.",
    rows: [
      {
        name: "onOpenChange",
        typeLabel: "(open: boolean) => void",
        defaultLabel: "—",
        description: "Accept requested changes to controlled open state.",
      },
      {
        name: "modal / loop / closeOnEscape / closeOnSelect",
        typeLabel: "boolean",
        defaultLabel: "true",
        description:
          "Modal ownership, keyboard wrapping and command-dismissal defaults; choice items keep their own close policy.",
      },
      {
        name: "highlightedValue / defaultHighlightedValue",
        typeLabel: "string | { value: string; groupId: string } | null",
        defaultLabel: "null",
        description:
          "Control or initialize the highlighted command. Scope repeated radio values by group id.",
      },
      {
        name: "onHighlightChange",
        typeLabel: "(details: MenuHighlightChangeDetails) => void",
        defaultLabel: "—",
        description:
          "Accept the proposed highlightedValue without conflating it with checked state.",
      },
      {
        name: "typeahead",
        typeLabel: "boolean",
        defaultLabel: "true",
        description:
          "Allow typing labels to move focus; false leaves arrow navigation available.",
      },
      {
        name: "onSelect / navigate",
        typeLabel: "MenuSelectionEvent / MenuNavigateDetails callbacks",
        defaultLabel: "—",
        description:
          "Observe or cancel commands; route plain same-window links without intercepting native modified, target or download activation.",
      },
      {
        name: "positioning",
        typeLabel: "MenuPositioningOptions",
        defaultLabel: "Automatic",
        description:
          "Placement, strategy, offsets, collisions, sameWidth, detached hiding, virtual anchors and positioning notification.",
      },
      {
        name: "lazyMount / unmountOnExit",
        typeLabel: "boolean",
        defaultLabel: "true / true",
        description:
          "Mount on first opening and remove after exit, or retain hidden inert content.",
      },
      {
        name: "present / immediate / skipAnimationOnMount / hideMode",
        typeLabel: "boolean / boolean / boolean / 'display-none' | 'activity'",
        defaultLabel: "Automatic / true / false / display-none",
        description:
          "Explicit presence and first-mount scheduling policies; hidden content must remain noninteractive.",
      },
      {
        name: "onExitComplete",
        typeLabel: "() => void",
        defaultLabel: "—",
        description:
          "Called after a completed exit, not an interrupted close/reopen.",
      },
      {
        name: "onInteractOutside / onPointerDownOutside / onFocusOutside / onEscapeKeyDown / onRequestDismiss",
        typeLabel: "Cancelable event callbacks",
        defaultLabel: "—",
        description: "Observe or prevent dismissal in the owning layer.",
      },
      {
        name: "persistentElements",
        typeLabel: "Array<() => HTMLElement | null>",
        defaultLabel: "—",
        description:
          "Explicit external elements treated as inside the interaction boundary.",
      },
      {
        name: "triggerValue / defaultTriggerValue / onTriggerValueChange",
        typeLabel: "string / string / callback",
        defaultLabel: "Actual opener",
        description:
          "Track which trigger owns one shared popup and its focus-return target.",
      },
      {
        name: "size",
        typeLabel: "'sm' | 'md' | 'lg'",
        defaultLabel: "md",
        description: "Coordinates popup row typography, artwork and spacing.",
      },
      {
        name: "variant",
        typeLabel: "'subtle' | 'solid' | 'plain'",
        defaultLabel: "subtle",
        description: "Highlight presentation without removing keyboard focus.",
      },
      {
        name: "tone",
        typeLabel: "ContextMenuItemTone",
        defaultLabel: "neutral",
        description:
          "Inherited highlight palette; set Item tone explicitly to color resting text too.",
      },
      {
        name: "open / defaultOpen",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Controlled or initial state.",
      },
    ],
  },
  {
    id: "props-content",
    title: "Content",
    description:
      "Owns popup inset, scroll containment and optional visual overrides; SubContent uses the same recipes.",
    rows: [
      {
        name: "positioning",
        typeLabel: "MenuPositioningOptions",
        defaultLabel: "Inherited",
        description:
          "Override root placement, collisions, offsets and sizing. sameWidth is explicit, not the popup default.",
      },
      {
        name: "side / align / sideOffset",
        typeLabel: "Side / Align / number",
        defaultLabel: "Automatic",
        description:
          "Compatible placement shorthands; prefer positioning for the complete policy.",
      },
      {
        name: "inset",
        typeLabel: "'none' | 'sm' | 'md' | 'lg'",
        defaultLabel: "By size",
        description: "Panel padding: 0, 4, 6 or 8px.",
      },
      {
        name: "itemInset",
        typeLabel: "'default' | 'none'",
        defaultLabel: "default",
        description: "Remove inline row padding only.",
      },
      {
        name: "leadingSpace",
        typeLabel: "'auto' | 'reserve'",
        defaultLabel: "auto",
        description: "Reserve a consistent leading column when needed.",
      },
      {
        name: "radius",
        typeLabel: "Radius",
        defaultLabel: "overlay",
        description: "Core or semantic radius.",
      },
      {
        name: "size / variant / tone",
        typeLabel: "Root recipe types",
        defaultLabel: "Inherited",
        description: "Override the nearest popup scope.",
      },
    ],
  },
  {
    id: "props-item",
    title: "Item",
    description:
      "One command or native destination host; no nested interactive controls.",
    rows: [
      {
        name: "textValue",
        typeLabel: "string",
        defaultLabel: "Visible label",
        description: "Typeahead text for complex or icon-rich labels.",
      },
      {
        name: "closeOnSelect",
        typeLabel: "boolean",
        defaultLabel: "Root policy",
        description: "Override whether accepting this command closes the menu.",
      },
      {
        name: "value",
        typeLabel: "string",
        defaultLabel: "Required",
        description: "Stable unique command identity.",
      },
      {
        name: "onSelect",
        typeLabel: "Callback",
        defaultLabel: "—",
        description: "Application command, not a registered keyboard shortcut.",
      },
      {
        name: "disabled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Remains discoverable but cannot activate.",
      },
      {
        name: "tone",
        typeLabel: "ContextMenuItemTone",
        defaultLabel: "Inherited",
        description:
          "Use danger for destructive meaning; neutral resets the palette.",
      },
      {
        name: "layout",
        typeLabel: "'row' | 'stack'",
        defaultLabel: "row",
        description: "Visual arrangement, not keyboard navigation mode.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        defaultLabel: "false / —",
        description: "Preserve one native host, events and ref.",
      },
    ],
  },
  {
    id: "props-subtrigger",
    title: "SubTrigger",
    description: "Opens the paired SubContent within one Sub.",
    rows: [
      {
        name: "indicator",
        typeLabel: "ReactNode",
        defaultLabel: "Default chevron",
        description: "Custom content replaces the chevron; null removes it.",
      },
      {
        name: "value",
        typeLabel: "string",
        defaultLabel: "Required",
        description: "Stable submenu command identity.",
      },
    ],
  },
  {
    id: "props-rootprovider",
    title: "RootProvider",
    description:
      "Render the unchanged controller returned by the public owner hook; do not create a second Root around it.",
    rows: [
      {
        name: "value",
        typeLabel: "UseContextMenuReturn",
        defaultLabel: "Required",
        description: "Controller returned by useContextMenu.",
      },
      {
        name: "size / variant / tone",
        typeLabel: "Root recipe types",
        defaultLabel: "md / subtle / neutral",
        description:
          "Finished presentation independently from externally owned state.",
      },
    ],
  },
  {
    id: "props-context",
    title: "Context",
    description:
      "Read public state inside Root or RootProvider without reaching into internal contexts.",
    rows: [
      {
        name: "children",
        typeLabel: "(state: MenuState) => ReactNode",
        defaultLabel: "Required",
        description:
          "Open, highlight and trigger identity with the public state actions.",
      },
    ],
  },
  ...actionMenuBehaviorParts,
  {
    id: "props-arrow",
    title: "Arrow",
    description:
      "Optional pointer composed inside Content or SubContent. It inherits popup paint and shares Brick's overlay-arrow geometry.",
    rows: [
      {
        name: "width / height",
        typeLabel: "number",
        defaultLabel: "Shared arrow token",
        description:
          "Optional SVG dimension overrides in pixels; omit both for theme-controlled proportions.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        defaultLabel: "false / —",
        description:
          "Compose one decorative host while preserving owned positioning.",
      },
    ],
  },
];
