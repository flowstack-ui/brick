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
        name: "modal",
        typeLabel: "boolean",
        defaultLabel: "true",
        description: "Constrain interaction to the open menu.",
      },
      {
        name: "loop",
        typeLabel: "boolean",
        defaultLabel: "true",
        description:
          "Wrap arrow-key navigation between the first and last items.",
      },
      {
        name: "closeOnEscape",
        typeLabel: "boolean",
        defaultLabel: "true",
        description: "Dismiss the menu with Escape.",
      },
      {
        name: "closeOnSelect",
        typeLabel: "boolean",
        defaultLabel: "true",
        description:
          "Close after a command; checkbox and radio items default to staying open.",
      },
      {
        name: "highlightedValue",
        typeLabel: "string | { value: string; groupId: string } | null",
        defaultLabel: "null",
        description:
          "Control or initialize the highlighted command. Scope repeated radio values by group id.",
      },
      {
        name: "defaultHighlightedValue",
        typeLabel: "string | { value: string; groupId: string } | null",
        defaultLabel: "null",
        description: "Initial uncontrolled highlighted item.",
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
        name: "onSelect",
        typeLabel: "(event: MenuSelectionEvent) => void",
        defaultLabel: "—",
        description:
          "Observe or cancel commands; route plain same-window links without intercepting native modified, target or download activation.",
      },
      {
        name: "navigate",
        typeLabel: "(details: MenuNavigateDetails) => void",
        defaultLabel: "—",
        description:
          "Handle ordinary same-window link navigation without intercepting modified clicks.",
      },
      {
        name: "positioning",
        typeLabel: "MenuPositioningOptions",
        defaultLabel: "Automatic",
        description:
          "Placement, strategy, offsets, collisions, sameWidth, detached hiding, virtual anchors and positioning notification.",
      },
      {
        name: "lazyMount",
        typeLabel: "boolean",
        defaultLabel: "true",
        description:
          "Mount on first opening and remove after exit, or retain hidden inert content.",
      },
      {
        name: "unmountOnExit",
        typeLabel: "boolean",
        defaultLabel: "true",
        description: "Remove content after its exit completes.",
      },
      {
        name: "present",
        typeLabel: "boolean",
        defaultLabel: "Automatic",
        description:
          "Explicit presence and first-mount scheduling policies; hidden content must remain noninteractive.",
      },
      {
        name: "immediate",
        typeLabel: "boolean",
        defaultLabel: "true",
        description: "Apply presence changes immediately.",
      },
      {
        name: "skipAnimationOnMount",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Skip the initial entry animation.",
      },
      {
        name: "hideMode",
        typeLabel: "'display-none' | 'activity'",
        defaultLabel: "display-none",
        description: "Choose how retained content is hidden.",
      },
      {
        name: "onExitComplete",
        typeLabel: "() => void",
        defaultLabel: "—",
        description:
          "Called after a completed exit, not an interrupted close/reopen.",
      },
      {
        name: "onInteractOutside",
        typeLabel: "(event: OutsideInteractionEvent | FocusEvent) => void",
        defaultLabel: "—",
        description: "Observe or prevent dismissal in the owning layer.",
      },
      {
        name: "onPointerDownOutside",
        typeLabel: "(event: OutsideInteractionEvent) => void",
        defaultLabel: "—",
        description: "Observe or prevent an outside pointer interaction.",
      },
      {
        name: "onFocusOutside",
        typeLabel: "(event: FocusEvent) => void",
        defaultLabel: "—",
        description: "Observe or prevent outside focus dismissal.",
      },
      {
        name: "onEscapeKeyDown",
        typeLabel: "(event: KeyboardEvent) => void",
        defaultLabel: "—",
        description: "Observe or prevent Escape dismissal.",
      },
      {
        name: "onRequestDismiss",
        typeLabel: "(event: Event) => void",
        defaultLabel: "—",
        description: "Observe ancestor-layer dismissal requests.",
      },
      {
        name: "persistentElements",
        typeLabel: "Array<() => HTMLElement | null>",
        defaultLabel: "—",
        description:
          "Explicit external elements treated as inside the interaction boundary.",
      },
      {
        name: "triggerValue",
        typeLabel: "string",
        defaultLabel: "Actual opener",
        description:
          "Track which trigger owns one shared popup and its focus-return target.",
      },
      {
        name: "defaultTriggerValue",
        typeLabel: "string",
        defaultLabel: "—",
        description: "Initial identity for a shared menu's trigger.",
      },
      {
        name: "onTriggerValueChange",
        typeLabel: "(value: string | undefined) => void",
        defaultLabel: "—",
        description: "Receive changes to the active trigger identity.",
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
        typeLabel: "DropdownMenuItemTone",
        defaultLabel: "neutral",
        description:
          "Inherited highlight palette; set Item tone explicitly to color resting text too.",
      },
      {
        name: "open",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Controlled or initial state.",
      },
      {
        name: "defaultOpen",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Initial uncontrolled open state.",
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
        name: "side",
        typeLabel: "'top' | 'right' | 'bottom' | 'left'",
        defaultLabel: "bottom",
        description:
          "Compatible placement shorthands; prefer positioning for the complete policy.",
      },
      {
        name: "align",
        typeLabel: "'start' | 'center' | 'end'",
        defaultLabel: "start",
        description: "Alignment along the chosen side.",
      },
      {
        name: "sideOffset",
        typeLabel: "number",
        defaultLabel: "4",
        description: "Gap from the anchor in pixels.",
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
        name: "size",
        typeLabel: "DropdownMenuSize",
        defaultLabel: "Inherited",
        description: "Override the nearest popup scope.",
      },
      {
        name: "variant",
        typeLabel: "DropdownMenuVariant",
        defaultLabel: "Inherited",
        description: "Override this popup's highlight recipe.",
      },
      {
        name: "tone",
        typeLabel: "DropdownMenuTone",
        defaultLabel: "Inherited",
        description: "Override this popup's semantic palette.",
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
        typeLabel: "(event: MenuSelectionEvent) => void",
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
        typeLabel: "DropdownMenuItemTone",
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
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Preserve one native host, events and ref.",
      },
      {
        name: "render",
        typeLabel: "RenderProp",
        defaultLabel: "—",
        description: "Custom single-host rendering.",
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
        typeLabel: "UseDropdownMenuReturn",
        defaultLabel: "Required",
        description: "Controller returned by useDropdownMenu.",
      },
      {
        name: "size",
        typeLabel: "DropdownMenuSize",
        defaultLabel: "md",
        description:
          "Finished presentation independently from externally owned state.",
      },
      {
        name: "variant",
        typeLabel: "DropdownMenuVariant",
        defaultLabel: "subtle",
        description: "Finished highlight recipe.",
      },
      {
        name: "tone",
        typeLabel: "DropdownMenuTone",
        defaultLabel: "neutral",
        description: "Finished semantic palette.",
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
];
