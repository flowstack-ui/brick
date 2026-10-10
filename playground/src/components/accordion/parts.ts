import type { OwnerPart } from "../../shared/OwnerDocumentation.js";
export const accordionParts: OwnerPart[] = [
  {
    id: "props-root",
    title: "Root",
    description: "Owns disclosure state, lifecycle and visual recipes.",
    rows: [
      {
        name: "type",
        typeLabel: "'single' | 'multiple'",
        defaultLabel: "single",
        description:
          "Selection model; single values are strings, multiple values are arrays.",
      },
      {
        name: "value / defaultValue",
        typeLabel: "string | string[]",
        description:
          "Controlled value or initial uncontrolled value, matching type.",
      },
      {
        name: "onValueChange",
        typeLabel: "(value: string | string[]) => void",
        description: "Callback shape follows type.",
      },
      {
        name: "collapsible",
        typeLabel: "boolean",
        defaultLabel: "true",
        description: "Allow the last open item to close in single mode.",
      },
      {
        name: "disabled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Disable all items.",
      },
      {
        name: "orientation",
        typeLabel: "'vertical' | 'horizontal'",
        defaultLabel: "vertical",
        description: "Measured reveal axis and keyboard direction.",
      },
      {
        name: "dir",
        typeLabel: "'ltr' | 'rtl'",
        defaultLabel: "inherited",
        description: "Local reading direction.",
      },
      {
        name: "size",
        typeLabel: "ResponsiveValue<'sm' | 'md' | 'lg' | 'xl'>",
        defaultLabel: "md",
        description: "Coordinated geometry and typography.",
      },
      {
        name: "variant",
        typeLabel:
          "ResponsiveValue<'plain' | 'ghost' | 'soft' | 'outline' | 'subtle' | 'enclosed'>",
        defaultLabel: "plain",
        description:
          "Existing recipes are preserved; subtle and enclosed are additive.",
      },
      {
        name: "radius",
        typeLabel: "Radius",
        defaultLabel: "control",
        description: "Shared radius token, not a CSS length.",
      },
      {
        name: "indicatorPlacement",
        typeLabel: "'start' | 'end'",
        defaultLabel: "end",
        description: "Nearest-root indicator alignment.",
      },
      {
        name: "unstyled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description:
          "Delegate root, item and trigger paint; behavior and measured motion remain.",
      },
      {
        name: "lazyMount / unmountOnExit",
        typeLabel: "boolean",
        defaultLabel: "true",
        description:
          "Independent mounting policies. Both defaults preserve Brick behavior.",
      },
      {
        name: "hideMode",
        typeLabel: "'display-none' | 'activity'",
        defaultLabel: "display-none",
        description:
          "Activity pauses effects on React 19.2+; older runtimes use ordinary hiding.",
      },
      {
        name: "ids",
        typeLabel: "{ root?, item?, itemTrigger?, itemContent? }",
        description:
          "Functions receive each item value for coordinated relationships.",
      },
      {
        name: "onFocusChange",
        typeLabel: "({ value: string | null }) => void",
        description: "Reports focused item changes.",
      },
      {
        name: "onExitComplete",
        typeLabel: "(value: string) => void",
        description:
          "Runs after an item finishes exiting; reopening cancels completion.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        description:
          "Project onto one host while preserving semantics, handlers and refs.",
      },
    ],
  },
  {
    id: "root-provider",
    title: "RootProvider",
    description: "Binds an external controller to the same visual recipes.",
    rows: [
      {
        name: "value",
        typeLabel: "UseAccordionReturn",
        description:
          "Result of useAccordion; recipe props are shared with Root.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        description:
          "Project onto one host while preserving semantics, handlers and refs.",
      },
    ],
  },
  {
    id: "item",
    title: "Item",
    description: "Groups one heading and panel.",
    rows: [
      {
        name: "value",
        typeLabel: "string",
        description: "Required unique, stable item value.",
      },
      {
        name: "disabled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Disable this item.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        description:
          "Project onto one host while preserving semantics, handlers and refs.",
      },
    ],
  },
  {
    id: "header",
    title: "Header",
    description: "Keeps a real heading in the document outline.",
    rows: [
      {
        name: "as",
        typeLabel: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'",
        defaultLabel: "h3",
        description:
          "Choose the document heading level; keep Trigger as its only child.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        description:
          "Project onto one host while preserving semantics, handlers and refs.",
      },
    ],
  },
  {
    id: "trigger",
    title: "Trigger",
    description: "Owns the disclosure action and focus.",
    rows: [
      {
        name: "unstyled",
        typeLabel: "boolean",
        defaultLabel: "inherited",
        description: "Use with asChild to delegate visuals to Button.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        description:
          "Project onto one host while preserving semantics, handlers and refs.",
      },
    ],
  },
  {
    id: "indicator",
    title: "Indicator",
    description: "Decorative nearest-item artwork.",
    rows: [
      {
        name: "children",
        typeLabel: "ReactNode",
        defaultLabel: "chevron",
        description: "Replace only the artwork. ItemContext supplies isOpen.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        description:
          "Project onto one host while preserving semantics, handlers and refs.",
      },
    ],
  },
  {
    id: "content",
    title: "Content",
    description: "Padding-free measured motion and presence boundary.",
    rows: [
      {
        name: "keepMounted",
        typeLabel: "boolean",
        defaultLabel: "undefined",
        description:
          "Compatibility override: true eagerly retains, false lazily unmounts; prefer Root policy.",
      },
      {
        name: "landmark",
        typeLabel: "boolean",
        defaultLabel: "true",
        description: "Omit excessive region landmarks in large groups.",
      },
      {
        name: "motion",
        typeLabel: "'auto' | 'none'",
        defaultLabel: "auto",
        description: "Disable visual motion without changing state ownership.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        description:
          "Project onto one host while preserving semantics, handlers and refs.",
      },
    ],
  },
  {
    id: "content-inner",
    title: "ContentInner",
    description: "Owns stable panel padding and layout.",
    rows: [
      {
        name: "inset",
        typeLabel: "'auto' | 'none'",
        defaultLabel: "auto",
        description: "Let a layout child own spacing with none.",
      },
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Project onto one layout host.",
      },
    ],
  },
  {
    id: "context",
    title: "Context",
    description: "Reads the nearest root controller.",
    rows: [
      {
        name: "children",
        typeLabel: "(api: UseAccordionReturn) => ReactNode",
        description: "Render state without duplicating it.",
      },
    ],
  },
  {
    id: "item-context",
    title: "ItemContext",
    description: "Reads the nearest item's state.",
    rows: [
      {
        name: "children",
        typeLabel: "(item: AccordionItemContextValue) => ReactNode",
        description:
          "Includes value, isOpen, disabled, onToggle and relationship IDs.",
      },
    ],
  },
  {
    id: "use-accordion",
    title: "useAccordion",
    description: "Creates an external disclosure controller.",
    rows: [
      {
        name: "options",
        typeLabel: "UseAccordionOptions",
        description:
          "Root state options; returns value array, setValue(array), onToggle and navigation state.",
      },
    ],
  },
];
