import type { OwnerPart } from "../../shared/OwnerDocumentation.js";
export const parts: OwnerPart[] = [
  {
    id: "props-root",
    title: "Root",
    description:
      "State and visual defaults. Use count or totalPages, never both.",
    rows: [
      {
        name: "ids",
        typeLabel: "PaginationIds",
        defaultLabel: "—",
        description:
          "Root, list and control IDs, plus item(page) and ellipsis(rangeIndex) functions for distinct generated hosts.",
      },
      {
        name: "focusRing",
        typeLabel: "'inside' | 'outside'",
        defaultLabel: "inside",
        description: "Inside focus stays visible within the scrolling List.",
      },
      {
        name: "count",
        typeLabel: "number",
        defaultLabel: "—",
        description: "Record count; enables page-size state and result ranges.",
      },
      {
        name: "totalPages",
        typeLabel: "number",
        defaultLabel: "—",
        description: "Page count alternative without record arithmetic.",
      },
      {
        name: "page / defaultPage",
        typeLabel: "number",
        defaultLabel: "1",
        description: "Controlled or initial one-based page.",
      },
      {
        name: "onPageChange",
        typeLabel: "(page: number) => void",
        defaultLabel: "—",
        description: "Requested page changes; routing stays application-owned.",
      },
      {
        name: "pageSize / defaultPageSize",
        typeLabel: "number",
        defaultLabel: "10",
        description: "Controlled or initial records per page in count mode.",
      },
      {
        name: "onPageSizeChange",
        typeLabel: "(size: number) => void",
        defaultLabel: "—",
        description: "Requested page-size changes.",
      },
      {
        name: "siblingCount / boundaryCount",
        typeLabel: "number",
        defaultLabel: "1",
        description: "Nearby and boundary page counts.",
      },
      {
        name: "size",
        typeLabel: "ResponsiveValue<ButtonSize>",
        defaultLabel: "md",
        description: "Shared Button geometry.",
      },
      {
        name: "variant / selectedVariant",
        typeLabel: "ButtonVariant",
        defaultLabel: "ghost / outline",
        description: "Ordinary and current-page paint.",
      },
      {
        name: "tone",
        typeLabel: "ButtonTone",
        defaultLabel: "neutral",
        description: "Paired theme colors and interaction states.",
      },
      {
        name: "radius",
        typeLabel: "Radius",
        defaultLabel: "control",
        description: "Shared radius recipe.",
      },
      {
        name: "disabled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Disable every control.",
      },
      {
        name: "getPageHref",
        typeLabel: "(details) => string",
        defaultLabel: "—",
        description: "Switch to native URL destinations.",
      },
      {
        name: "previousAriaLabel / nextAriaLabel / firstAriaLabel / lastAriaLabel",
        typeLabel: "string",
        defaultLabel: "English labels",
        description: "Localized action labels.",
      },
      {
        name: "getItemAriaLabel",
        typeLabel: "(details) => string",
        defaultLabel: "English page labels",
        description: "Localized destination and current-page labels.",
      },
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Merge Root onto one compatible host.",
      },
    ],
  },
  {
    id: "props-provider",
    title: "RootProvider",
    description:
      "Shares an externally created usePagination controller. Accepts Root visual defaults.",
    rows: [
      {
        name: "value",
        typeLabel: "UsePaginationReturn",
        defaultLabel: "—",
        description: "Controller returned by usePagination.",
      },
    ],
  },
  {
    id: "props-items",
    title: "Items",
    description: "Generates the controller range without application mapping.",
    rows: [
      {
        name: "render",
        typeLabel: "({ page, isCurrent }) => ReactElement",
        defaultLabel: "—",
        description: "Custom control host receiving page semantics.",
      },
      {
        name: "ellipsis",
        typeLabel: "ReactNode",
        defaultLabel: "…",
        description: "Decorative gap content.",
      },
      {
        name: "itemProps / ellipsisProps",
        typeLabel: "part props",
        defaultLabel: "—",
        description: "Shared generated-part props.",
      },
    ],
  },
  {
    id: "props-item",
    title: "Item",
    description:
      "An explicit page control. Accepts visual overrides and asChild.",
    rows: [
      {
        name: "page",
        typeLabel: "number",
        defaultLabel: "—",
        description: "Destination page.",
      },
      {
        name: "children",
        typeLabel: "ReactNode",
        defaultLabel: "Localized number",
        description: "Custom visible content.",
      },
    ],
  },
  {
    id: "props-controls",
    title: "Previous / Next / First / Last",
    description:
      "Boundary-aware controls with optional authored content and visual overrides.",
    rows: [
      {
        name: "children",
        typeLabel: "ReactNode",
        defaultLabel: "Directional icon",
        description: "Replaces the default icon.",
      },
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Merge semantics into a custom button or link host.",
      },
    ],
  },
  {
    id: "props-list",
    title: "List",
    description:
      "Optional ordered-list and bounded horizontal layout. Omit for direct ButtonGroup composition.",
    rows: [
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Compose a compatible ordered-list host.",
      },
    ],
  },
  {
    id: "props-text",
    title: "PageText",
    description:
      "Typography for the shared page or record range. Use a formatter to translate connecting words.",
    rows: [
      {
        name: "format",
        typeLabel: "'short' | 'compact' | 'long' | formatter",
        defaultLabel: "compact",
        description:
          "Long format requires count mode; numbers inherit LocaleProvider.",
      },
    ],
  },
  {
    id: "props-ellipsis",
    title: "Ellipsis",
    description: "Decorative gap aligned with page controls.",
    rows: [
      {
        name: "children",
        typeLabel: "ReactNode",
        defaultLabel: "…",
        description: "Custom decorative content.",
      },
    ],
  },
  {
    id: "props-context",
    title: "Context",
    description: "Read the current controller inside Root.",
    rows: [
      {
        name: "children",
        typeLabel: "(controller) => ReactNode",
        defaultLabel: "—",
        description: "Render content from current state and actions.",
      },
    ],
  },
];
