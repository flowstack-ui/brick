import type { OwnerPart } from "../../shared/OwnerDocumentation.js";
export const parts: OwnerPart[] = [
  {
    id: "props-root",
    title: "Root",
    description: "Passive value boundary and recipe owner.",
    rows: [
      {
        name: "variant",
        typeLabel:
          "ResponsiveValue<'soft' | 'subtle' | 'outline' | 'surface' | 'solid'>",
        defaultLabel: "soft",
        description: "Surface adds a border; subtle equals soft.",
      },
      {
        name: "tone",
        typeLabel:
          "'neutral' | 'contrast' | 'accent' | 'info' | 'success' | 'warning' | 'danger'",
        defaultLabel: "neutral",
        description: "Paired palette without implied status semantics.",
      },
      {
        name: "size",
        typeLabel: "ResponsiveValue<'sm' | 'md' | 'lg' | 'xl'>",
        defaultLabel: "md",
        description: "Text and artwork geometry.",
      },
      {
        name: "density",
        typeLabel: "ResponsiveValue<'comfortable' | 'compact'>",
        defaultLabel: "comfortable",
        description:
          "Compact passive tokens may be smaller than interactive tokens.",
      },
      {
        name: "radius / shape",
        typeLabel: "Radius / 'rounded' | 'pill'",
        defaultLabel: "pill",
        description: "Choose a theme radius or the legacy shape, not both.",
      },
      {
        name: "unstyled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description:
          "Delegate Chip presentation for this root and its parts; nested roots reset.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        description:
          "Project onto one passive host. Preserve native props and actual-host refs.",
      },
    ],
  },
  {
    id: "label",
    title: "Label",
    description: "Shrinkable single-line value.",
    rows: [
      {
        name: "unstyled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Delegate this part's paint to the consumer.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        description:
          "One projected host; native props, consumer handlers and refs are preserved.",
      },
    ],
  },
  {
    id: "start-element",
    title: "StartElement",
    description: "Coordinates decorative artwork.",
    rows: [
      {
        name: "unstyled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Delegate this part's paint to the consumer.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        description:
          "One projected host; native props, consumer handlers and refs are preserved.",
      },
    ],
  },
  {
    id: "end-element",
    title: "EndElement",
    description: "Coordinates decorative artwork.",
    rows: [
      {
        name: "unstyled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Delegate this part's paint to the consumer.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        description:
          "One projected host; native props, consumer handlers and refs are preserved.",
      },
    ],
  },
  {
    id: "action-trigger",
    title: "ActionTrigger",
    description: "Optional primary action; keep removal beside it.",
    rows: [
      {
        name: "onPress",
        typeLabel: "Atom Button onPress",
        description: "Activation callback; no automatic removal or state.",
      },
      {
        name: "disabled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Disable only this action.",
      },
      {
        name: "type",
        typeLabel: "'button' | 'submit' | 'reset'",
        defaultLabel: "button",
        description: "Native button type.",
      },
      {
        name: "unstyled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Delegate this part's paint to the consumer.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        description:
          "One projected host; native props, consumer handlers and refs are preserved.",
      },
    ],
  },
  {
    id: "remove-trigger",
    title: "RemoveTrigger",
    description: "Optional removal request; parent owns state and focus.",
    rows: [
      {
        name: "ariaLabel",
        typeLabel: "string",
        description: "Required localized action and value name.",
      },
      {
        name: "onPress",
        typeLabel: "Atom Button onPress",
        description: "Activation callback; no automatic removal or state.",
      },
      {
        name: "disabled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Disable only this action.",
      },
      {
        name: "type",
        typeLabel: "'button' | 'submit' | 'reset'",
        defaultLabel: "button",
        description: "Native button type.",
      },
      {
        name: "unstyled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Delegate this part's paint to the consumer.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        description:
          "One projected host; native props, consumer handlers and refs are preserved.",
      },
    ],
  },
];
