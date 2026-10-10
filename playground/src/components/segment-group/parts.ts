import type { OwnerPart } from "../../shared/OwnerDocumentation.js";
export const parts: OwnerPart[] = [
  {
    id: "props-root",
    title: "Root",
    description: "Selection, form semantics and shared visual recipes.",
    rows: [
      {
        name: "tone",
        typeLabel: "'neutral' | 'accent' | 'contrast'",
        defaultLabel: "neutral",
        description:
          "Selected fill and readable foreground; the track stays neutral.",
      },
      {
        name: "size",
        typeLabel: "'2xs' | 'xs' | 'sm' | 'md' | 'lg'",
        defaultLabel: "md",
        description: "24, 32, 36, 40 and 44px minimum control heights.",
      },
      {
        name: "radius",
        typeLabel: "Radius",
        defaultLabel: "control",
        description: "Shared core or semantic corner token.",
      },
      {
        name: "fullWidth",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Distribute items across the available width.",
      },
      {
        name: "orientation",
        typeLabel: "'horizontal' | 'vertical'",
        defaultLabel: "horizontal",
        description: "Layout and arrow-key axis.",
      },
      {
        name: "value / defaultValue",
        typeLabel: "string",
        defaultLabel: "—",
        description: "Controlled value or uncontrolled initial selection.",
      },
      {
        name: "onValueChange",
        typeLabel: "(value: string) => void",
        defaultLabel: "—",
        description: "Bind application state or a form controller.",
      },
      {
        name: "disabled / readOnly",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Unavailable control or focusable locked value.",
      },
      {
        name: "required / invalid",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Form validity and accessible invalid state.",
      },
      {
        name: "name / form",
        typeLabel: "string",
        defaultLabel: "—",
        description: "Native submission name and optional external form ID.",
      },
      {
        name: "validationBehavior",
        typeLabel: "'aria' | 'native'",
        defaultLabel: "aria",
        description: "Inline validation or browser-native reporting.",
      },
      {
        name: "loop",
        typeLabel: "boolean",
        defaultLabel: "true",
        description: "Wrap arrow navigation.",
      },
      {
        name: "dir",
        typeLabel: "'ltr' | 'rtl'",
        defaultLabel: "inherited",
        description: "Logical navigation direction.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        defaultLabel: "—",
        description: "Compose one host while preserving props and refs.",
      },
    ],
  },
  {
    id: "props-item",
    title: "Item",
    description: "One radio choice; named inputs are created automatically.",
    rows: [
      {
        name: "value",
        typeLabel: "string",
        defaultLabel: "required",
        description: "Unique stable option value.",
      },
      {
        name: "disabled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Disable this choice.",
      },
      {
        name: "iconOnly",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Square geometry; supply an accessible label.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        defaultLabel: "—",
        description: "Preserve radio semantics on a custom host.",
      },
    ],
  },
  {
    id: "props-itemtext",
    title: "ItemText",
    description: "Optional text wrapper for safe long-label wrapping.",
    rows: [
      {
        name: "children",
        typeLabel: "ReactNode",
        defaultLabel: "—",
        description:
          "Visible label content; native span attributes and ref are supported.",
      },
    ],
  },
  {
    id: "props-indicator",
    title: "Indicator",
    description: "One decorative, Atom-measured selected surface.",
    rows: [
      {
        name: "style",
        typeLabel: "CSSProperties",
        defaultLabel: "—",
        description:
          "Native span styling; prefer Root tone, then documented local variables.",
      },
      {
        name: "ref",
        typeLabel: "Ref<HTMLSpanElement>",
        defaultLabel: "—",
        description: "The decorative span, never a focus or selection target.",
      },
    ],
  },
  {
    id: "props-items",
    title: "Items",
    description:
      "Convenience rendering through the existing Item and ItemText parts.",
    rows: [
      {
        name: "items",
        typeLabel:
          "readonly (string | { value: string; label: ReactNode; disabled?: boolean })[]",
        defaultLabel: "required",
        description:
          "Unique values; use manual Item for icon-only or custom native props.",
      },
    ],
  },
];
