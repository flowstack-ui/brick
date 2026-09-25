import type { OwnerPart } from "../../shared/OwnerDocumentation.js";
export const parts: OwnerPart[] = [
  {
    id: "props-root",
    title: "Root",
    description: "The navigation landmark and inherited visual recipes.",
    rows: [
      {
        name: "variant",
        typeLabel: "'soft' | 'solid' | 'outline' | 'ghost' | 'plain'",
        defaultLabel: "soft",
        description:
          "Current and interactive paint. Plain retains focus and current weight without fill.",
      },
      {
        name: "tone",
        typeLabel: "'accent' | 'neutral'",
        defaultLabel: "accent",
        description: "Current-destination palette.",
      },
      {
        name: "size",
        typeLabel: "'sm' | 'md' | 'lg'",
        defaultLabel: "md",
        description: "Typography, artwork and row geometry.",
      },
      {
        name: "density",
        typeLabel: "'comfortable' | 'compact'",
        defaultLabel: "comfortable",
        description: "Spacing independently from typography.",
      },
      {
        name: "radius",
        typeLabel: "Radius",
        defaultLabel: "control",
        description: "Shared corner tokens.",
      },
      {
        name: "inset",
        typeLabel: "'default' | 'none'",
        defaultLabel: "default",
        description: "Inline row padding only.",
      },
      {
        name: "gap",
        typeLabel: "SpacingValue",
        defaultLabel: "Theme recipe",
        description: "Gap between direct groups.",
      },
      {
        name: "orientation",
        typeLabel: "'vertical' | 'horizontal'",
        defaultLabel: "vertical",
        description: "Layout only; native link keyboard behavior is unchanged.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        defaultLabel: "false / —",
        description:
          "Compose one semantic host; preserve its label and native props.",
      },
    ],
  },
  {
    id: "props-list",
    title: "List",
    description: "The unordered or ordered destination list.",
    rows: [
      {
        name: "ordered",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Render ol instead of ul.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        defaultLabel: "false / —",
        description: "Preserve list semantics.",
      },
    ],
  },
  {
    id: "props-item",
    title: "Item",
    description: "One list item; Link owns destination behavior.",
    rows: [
      {
        name: "disabled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description:
          "Item metadata only. Disable the Link itself to prevent navigation.",
      },
    ],
  },
  {
    id: "props-link",
    title: "Link",
    description: "One native destination with optional supporting content.",
    rows: [
      {
        name: "active / current",
        typeLabel: "boolean / NavListCurrentValue",
        defaultLabel: "false / page",
        description: "Current state shorthand and its ARIA token.",
      },
      {
        name: "aria-current",
        typeLabel: "NavListCurrentValue",
        defaultLabel: "—",
        description:
          "Explicit current state overrides active; false clears emphasis.",
      },
      {
        name: "disabled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description:
          "Remove navigation and sequential focus, including composed anchors.",
      },
      {
        name: "startIcon / endIcon",
        typeLabel: "ReactNode",
        defaultLabel: "—",
        description: "Decorative artwork, hidden from assistive technology.",
      },
      {
        name: "description",
        typeLabel: "ReactNode",
        defaultLabel: "—",
        description: "Supporting destination text.",
      },
      {
        name: "trailingContent",
        typeLabel: "ReactNode",
        defaultLabel: "—",
        description:
          "Meaningful noninteractive metadata; not an aria-hidden icon.",
      },
      {
        name: "href / target / rel",
        typeLabel: "Native anchor props",
        defaultLabel: "—",
        description: "Native navigation, external links and modified clicks.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        defaultLabel: "false / —",
        description:
          "asChild delegates complete child anatomy and excludes supporting-content props.",
      },
    ],
  },
  {
    id: "props-section",
    title: "Section",
    description: "A static group or controlled/uncontrolled disclosure.",
    rows: [
      {
        name: "collapsible",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Enable disclosure behavior.",
      },
      {
        name: "open / defaultOpen",
        typeLabel: "boolean",
        defaultLabel: "uncontrolled / true",
        description: "Controlled or initial visibility.",
      },
      {
        name: "onOpenChange",
        typeLabel: "(open: boolean) => void",
        defaultLabel: "—",
        description: "Accept the requested open state.",
      },
      {
        name: "disabled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Disable trigger interaction.",
      },
      {
        name: "gap",
        typeLabel: "SpacingValue",
        defaultLabel: "Theme recipe",
        description: "Heading/trigger-to-content spacing.",
      },
    ],
  },
  {
    id: "props-sectionlabel",
    title: "SectionLabel",
    description: "A static section heading, not an interactive trigger.",
    rows: [
      {
        name: "as",
        typeLabel: "Heading element",
        defaultLabel: "h2",
        description: "Choose the appropriate heading level.",
      },
    ],
  },
  {
    id: "props-sectiontrigger",
    title: "SectionTrigger",
    description: "The separate button controlling its section.",
    rows: [
      {
        name: "startIcon",
        typeLabel: "ReactNode",
        defaultLabel: "—",
        description: "Decorative leading artwork.",
      },
      {
        name: "indicator",
        typeLabel: "ReactNode",
        defaultLabel: "Default chevron",
        description: "Replace artwork; null hides it.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        defaultLabel: "false / —",
        description:
          "asChild supplies its own content and indicator, without an automatic chevron.",
      },
    ],
  },
  {
    id: "props-sectioncontent",
    title: "SectionContent",
    description:
      "The section body, with Atom-owned presence and focus recovery.",
    rows: [
      {
        name: "indent",
        typeLabel: "'default' | 'none'",
        defaultLabel: "default",
        description: "Logical nesting independently from row padding.",
      },
      {
        name: "forceMount",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Keep closed content mounted but hidden and inert.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        defaultLabel: "false / —",
        description: "Compose one body host without replacing behavior.",
      },
    ],
  },
];
