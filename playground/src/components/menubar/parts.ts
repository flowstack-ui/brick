import type { OwnerPart } from "../../shared/OwnerDocumentation.js";
import { actionMenuBehaviorParts } from "../../shared/ActionMenuParts.js";
export const parts: OwnerPart[] = [
  {
    id: "props-root",
    title: "Root",
    description:
      "Owns the named command strip and roving focus. Each Menu owns its popup behavior.",
    rows: [
      {
        name: "onValueChange",
        typeLabel: "(value: string | null) => void",
        defaultLabel: "—",
        description:
          "Accept the next active command category, or null when closed.",
      },
      {
        name: "radius",
        typeLabel: "Radius",
        defaultLabel: "control",
        description:
          "Shape the optional strip surface; popup and Trigger radius remain independently configurable.",
      },
      {
        name: "menuSize",
        typeLabel: "'sm' | 'md' | 'lg'",
        defaultLabel: "size",
        description: "Popup density independently from strip trigger size.",
      },
      {
        name: "barVariant",
        typeLabel: "'plain' | 'surface'",
        defaultLabel: "plain",
        description: "Optional bounded rail; independent from popup highlight.",
      },
      {
        name: "triggerVariant",
        typeLabel: "'subtle' | 'plain'",
        defaultLabel: "subtle",
        description:
          "Neutral open/hover paint, or no decorative fill; keyboard focus remains.",
      },
      {
        name: "orientation / dir / loop",
        typeLabel: "'horizontal' | 'vertical' / Direction / boolean",
        defaultLabel: "horizontal / inherited / true",
        description: "Command strip keyboard direction and wrapping.",
      },
      {
        name: "size",
        typeLabel: "'sm' | 'md' | 'lg'",
        defaultLabel: "md",
        description:
          "Strip control size; menuSize can independently choose popup density.",
      },
      {
        name: "variant",
        typeLabel: "'subtle' | 'solid' | 'plain'",
        defaultLabel: "subtle",
        description: "Highlight presentation without removing keyboard focus.",
      },
      {
        name: "tone",
        typeLabel: "MenubarItemTone",
        defaultLabel: "neutral",
        description:
          "Inherited highlight palette; set Item tone explicitly to color resting text too.",
      },
      {
        name: "value / defaultValue",
        typeLabel: "string | null",
        defaultLabel: "null",
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
        typeLabel: "MenubarItemTone",
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
    id: "props-menu",
    title: "Menu",
    description:
      "One uniquely named command category in the strip. Shared action-menu behavior belongs here, not on the strip Root.",
    rows: [
      {
        name: "value",
        typeLabel: "string",
        defaultLabel: "Required",
        description: "Unique menu identity in this Menubar.",
      },
      {
        name: "closeOnSelect / closeOnEscape / loop",
        typeLabel: "boolean",
        defaultLabel: "true",
        description:
          "Popup behavior preserves the common action-menu contracts; Menubar popups are nonmodal.",
      },
      {
        name: "positioning",
        typeLabel: "MenuPositioningOptions",
        defaultLabel: "Automatic",
        description:
          "Popup collision, offset, sizing and detached-anchor policy.",
      },
      {
        name: "highlightedValue / onHighlightChange / typeahead",
        typeLabel: "Menu highlight contracts",
        defaultLabel: "Uncontrolled / true",
        description:
          "Highlight and typing are distinct from active strip category.",
      },
      {
        name: "lazyMount / unmountOnExit / onExitComplete",
        typeLabel: "Menu lifecycle contracts",
        defaultLabel: "true / true / —",
        description: "Mount and exit policy for this category's popup.",
      },
      {
        name: "onSelect / navigate / outside callbacks",
        typeLabel: "Menu event contracts",
        defaultLabel: "—",
        description:
          "Cancelable command selection, native routing and dismissal.",
      },
    ],
  },
  {
    id: "props-trigger",
    title: "Trigger",
    description:
      "A roving menuitem in the command strip, not an unrelated button or toggle.",
    rows: [
      {
        name: "disabled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Skip an unavailable category in top-level navigation.",
      },
      {
        name: "radius",
        typeLabel: "Radius",
        defaultLabel: "control",
        description: "Trigger shape independently from rail and popup.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        defaultLabel: "false / —",
        description:
          "Retain one host and Atom's coordinated keyboard behavior.",
      },
    ],
  },
  {
    id: "props-rootprovider",
    title: "RootProvider",
    description:
      "Mount the controller returned by useMenubar without a second Root or behavior engine.",
    rows: [
      {
        name: "value",
        typeLabel: "UseMenubarReturn",
        defaultLabel: "Required",
        description: "The unchanged external controller.",
      },
      {
        name: "size / menuSize / variant / tone / barVariant / triggerVariant / radius",
        typeLabel: "Root recipe types",
        defaultLabel: "Root defaults",
        description:
          "Presentation remains independent from controller-owned state.",
      },
    ],
  },
  {
    id: "props-context",
    title: "Context",
    description:
      "Read live strip state and actions inside Root or RootProvider.",
    rows: [
      {
        name: "children",
        typeLabel: "(state: UseMenubarReturn) => ReactNode",
        defaultLabel: "Required",
        description:
          "Read value and request category changes through setValue.",
      },
    ],
  },
  ...actionMenuBehaviorParts.filter((part) => part.id !== "props-trigger"),
  {
    id: "props-arrow",
    title: "Arrow",
    description:
      "Optional pointer inside Content or SubContent, sharing popup paint and overlay-arrow geometry.",
    rows: [
      {
        name: "width / height",
        typeLabel: "number",
        defaultLabel: "Shared arrow token",
        description:
          "Optional SVG pixel dimensions; omit to retain theme-controlled proportions.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        defaultLabel: "false / —",
        description:
          "Compose one decorative host without replacing owned positioning.",
      },
    ],
  },
];
