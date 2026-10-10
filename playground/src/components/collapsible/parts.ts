import type { OwnerPart } from "../../shared/OwnerDocumentation.js";

const composition = [
  {
    name: "asChild",
    defaultLabel: "false",
    typeLabel: "boolean",
    description: "Merge into one child host; do not nest interactive controls.",
  },
  {
    name: "render",
    typeLabel: "RenderProp",
    description: "Use an alternate host while preserving behavior and refs.",
  },
];
export const collapsibleParts: OwnerPart[] = [
  {
    id: "props-root",
    title: "Root",
    description: "Disclosure state, lifecycle and containing recipe.",
    rows: [
      {
        name: "open",
        typeLabel: "boolean",
        description: "Controlled expanded state.",
      },
      {
        name: "defaultOpen",
        defaultLabel: "false",
        typeLabel: "boolean",
        description: "Initial uncontrolled state.",
      },
      {
        name: "onOpenChange",
        typeLabel: "(open: boolean) => void",
        description: "Receives requested state changes.",
      },
      {
        name: "disabled",
        defaultLabel: "false",
        typeLabel: "boolean",
        description: "Prevent trigger activation.",
      },
      {
        name: "orientation",
        defaultLabel: '"vertical"',
        typeLabel: '"vertical" | "horizontal"',
        description: "Choose the measured reveal axis.",
      },
      {
        name: "lazyMount",
        defaultLabel: "true",
        typeLabel: "boolean",
        description:
          "Wait until the first opening to mount content. Unlike Chakra, Brick preserves its lazy default.",
      },
      {
        name: "unmountOnExit",
        defaultLabel: "true",
        typeLabel: "boolean",
        description: "Remove content after its exit completes.",
      },
      {
        name: "collapsedHeight",
        defaultLabel: "0",
        typeLabel: "number | string",
        description:
          "Nonnegative pixels or unit length for a visible, inert collapsed preview.",
      },
      {
        name: "collapsedWidth",
        defaultLabel: "0",
        typeLabel: "number | string",
        description:
          "Horizontal preview width. Partial previews remain mounted.",
      },
      {
        name: "hideMode",
        defaultLabel: '"display-none"',
        typeLabel: '"display-none" | "activity"',
        description:
          "React 19.2+ pauses hidden effects. Earlier React versions retain hidden state without pausing effects. Set unmountOnExit=false.",
      },
      {
        name: "onExitComplete",
        typeLabel: "() => void",
        description:
          "Called after a completed exit, not an interrupted closing animation.",
      },
      {
        name: "ids",
        typeLabel: "{ root?: string; trigger?: string; content?: string }",
        description: "Override generated relationship IDs.",
      },
      {
        name: "variant",
        defaultLabel: '"plain"',
        typeLabel: 'ResponsiveValue<"plain" | "soft" | "outline">',
        description: "Containing surface; independent of trigger highlighting.",
      },
      {
        name: "size",
        defaultLabel: '"md"',
        typeLabel: 'ResponsiveValue<"sm" | "md" | "lg">',
        description: "Trigger, icon and content density.",
      },
      {
        name: "radius",
        defaultLabel: '"control"',
        typeLabel: "Radius",
        description: "Shared core radius tokens or semantic roles.",
      },
      {
        name: "unstyled",
        defaultLabel: "false",
        typeLabel: "boolean",
        description:
          "Remove Root visual and layout styling. Content still clips and hides correctly. Does not unstyle Trigger.",
      },
      ...composition,
    ],
  },
  {
    id: "root-provider",
    title: "RootProvider",
    description:
      "The same containing recipe driven by a useCollapsible store. State options belong in the hook.",
    rows: [
      {
        name: "value",
        typeLabel: "UseCollapsibleReturn",
        description: "Required store returned by useCollapsible.",
      },
      ...["variant", "size", "radius", "unstyled"].map((name) => ({
        name,
        typeLabel: `CollapsibleRootProps["${name}"]`,
        description: "Same presentation option as Root.",
      })),
      ...composition,
    ],
  },
  {
    id: "trigger",
    title: "Trigger",
    description: "One accessible disclosure control.",
    rows: [
      {
        name: "highlight",
        defaultLabel: '"both"',
        typeLabel: '"none" | "hover" | "open" | "both"',
        description:
          "Select optional background feedback. None preserves keyboard focus.",
      },
      {
        name: "unstyled",
        defaultLabel: "false",
        typeLabel: "boolean",
        description:
          "Delegate all trigger visuals to a composed Button or IconButton. Use together with asChild.",
      },
      {
        name: "iconOnly",
        defaultLabel: "false",
        typeLabel: "boolean",
        description:
          "Square styled trigger. Supply an accessible name. Not used with unstyled.",
      },
      ...composition,
    ],
  },
  {
    id: "content",
    title: "Content",
    description: "Measured, padding-free visibility boundary.",
    rows: [
      {
        name: "motion",
        defaultLabel: '"auto"',
        typeLabel: '"auto" | "none"',
        description:
          "Disable animation explicitly; reduced motion also disables animation.",
      },
      {
        name: "keepMounted",
        typeLabel: "boolean (deprecated)",
        description:
          "Legacy override. Prefer Root lazyMount/unmountOnExit. Explicit legacy values win conflicting Root options with a warning.",
      },
      ...composition,
    ],
  },
  {
    id: "content-inner",
    title: "ContentInner",
    description: "Owns content padding outside the measured boundary.",
    rows: [
      {
        name: "inset",
        defaultLabel: '"auto"',
        typeLabel: '"auto" | "none"',
        description:
          "Use Root size padding, or let a composed layout own spacing.",
      },
      composition[0],
    ],
  },
  {
    id: "indicator",
    title: "Indicator",
    description: "Decorative artwork follows the nearest disclosure state.",
    rows: [
      {
        name: "placement",
        defaultLabel: '"end"',
        typeLabel: '"start" | "end" | "inline"',
        description:
          "End uses automatic start margin. Start and inline keep artwork adjacent to its label; place the part in the desired DOM order.",
      },
      {
        name: "children",
        typeLabel: "ReactNode",
        description: "Optional artwork replacing the default down/up chevron.",
      },
      ...composition,
    ],
  },
  {
    id: "context",
    title: "Context",
    description: "Read the nearest controller without managing another state.",
    rows: [
      {
        name: "children",
        typeLabel: "(value: UseCollapsibleReturn) => ReactNode",
        description:
          "Render callback with open, setOpen, onToggle and the disclosure lifecycle.",
      },
    ],
  },
  {
    id: "use-collapsible",
    title: "useCollapsible",
    description:
      "External state controller; useCollapsibleContext reads the nearest Root or RootProvider.",
    rows: [
      {
        name: "options",
        typeLabel: "UseCollapsibleOptions",
        description:
          "Root behavior options: open, defaultOpen, onOpenChange, disabled, orientation, ids, lazyMount, unmountOnExit, collapsedHeight, collapsedWidth, hideMode, onExitComplete.",
      },
      {
        name: "return",
        typeLabel: "UseCollapsibleReturn",
        description:
          "open, setOpen, onOpen, onClose, onToggle, IDs and lifecycle state. Pass the complete value to RootProvider.",
      },
    ],
  },
];
