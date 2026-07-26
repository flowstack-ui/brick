export interface PlaygroundEntry {
  category: string;
  description: string;
  id: string;
  route: string;
  title: string;
}

export const componentEntries = [
  {
    category: "Actions",
    description: "Finished actions with native Button semantics.",
    id: "button",
    route: "/button",
    title: "Button",
  },
  {
    category: "Actions",
    description: "Compact named actions and links.",
    id: "icon-button",
    route: "/icon-button",
    title: "Icon Button",
  },
  {
    category: "Navigation",
    description: "Application-level header structure and surfaces.",
    id: "app-bar",
    route: "/app-bar",
    title: "App Bar",
  },
  {
    category: "Navigation",
    description: "Inline and standalone native navigation.",
    id: "link",
    route: "/link",
    title: "Link",
  },
  {
    category: "Navigation",
    description: "Finished destination lists, sections, and disclosure.",
    id: "nav-list",
    route: "/nav-list",
    title: "Nav List",
  },
  {
    category: "Layout",
    description: "Persistent complementary panel and coordinated main content.",
    id: "sidebar",
    route: "/sidebar",
    title: "Sidebar",
  },
  {
    category: "Data display",
    description: "Semantic text with finished visual typography.",
    id: "text",
    route: "/text",
    title: "Text",
  },
  {
    category: "Data display",
    description: "Sized, semantic, accessible SVG presentation.",
    id: "icon",
    route: "/icon",
    title: "Icon",
  },
  {
    category: "Data display",
    description: "Responsive media with authored fallback and finished framing.",
    id: "image",
    route: "/image",
    title: "Image",
  },
  {
    category: "Data display",
    description: "Native ordered and unordered content with structured rows.",
    id: "list",
    route: "/list",
    title: "List",
  },
  {
    category: "Data display",
    description: "Inline technical literals with native code semantics.",
    id: "code",
    route: "/code",
    title: "Code",
  },
  {
    category: "Data display",
    description: "Structured source, overflow, language, and copy.",
    id: "code-block",
    route: "/code-block",
    title: "Code Block",
  },
  {
    category: "Layout",
    description: "Tokenized one-dimensional rows and columns.",
    id: "stack",
    route: "/stack",
    title: "Stack",
  },
  {
    category: "Layout",
    description: "Tokenized two-dimensional tracks and item placement.",
    id: "grid",
    route: "/grid",
    title: "Grid",
  },
  {
    category: "Layout",
    description: "Centered content measures and logical page gutters.",
    id: "container",
    route: "/container",
    title: "Container",
  },
  {
    category: "Layout",
    description: "Neutral surface levels, borders, elevation, radius, and inset.",
    id: "surface",
    route: "/surface",
    title: "Surface",
  },
  {
    category: "Data display",
    description: "Decorative and semantic structural separators.",
    id: "divider",
    route: "/divider",
    title: "Divider",
  },
  {
    category: "Layout",
    description: "Constrained native scrolling with explicit axes and visibility.",
    id: "scroll-area",
    route: "/scroll-area",
    title: "Scroll Area",
  },
  {
    category: "Data display",
    description: "Static grouped content with finished surfaces.",
    id: "card",
    route: "/card",
    title: "Card",
  },
  {
    category: "Overlays",
    description: "Focused modal tasks and decisions.",
    id: "dialog",
    route: "/dialog",
    title: "Dialog",
  },
  {
    category: "Overlays",
    description: "Urgent modal confirmation.",
    id: "alert-dialog",
    route: "/alert-dialog",
    title: "Alert Dialog",
  },
  {
    category: "Overlays",
    description: "Edge-attached modal content.",
    id: "drawer",
    route: "/drawer",
    title: "Drawer",
  },
  {
    category: "Data display",
    description: "Passive status and category labels.",
    id: "badge",
    route: "/badge",
    title: "Badge",
  },
  {
    category: "Data display",
    description: "Contextual counts and notification dots.",
    id: "notification-badge",
    route: "/notification-badge",
    title: "Notification Badge",
  },
  {
    category: "Data display",
    description: "Identity imagery, fallback, and status.",
    id: "avatar",
    route: "/avatar",
    title: "Avatar",
  },
  {
    category: "Actions",
    description: "Standalone pressed-state actions.",
    id: "toggle",
    route: "/toggle",
    title: "Toggle",
  },
  {
    category: "Actions",
    description: "Single and multiple grouped toggles.",
    id: "toggle-group",
    route: "/toggle-group",
    title: "Toggle Group",
  },
  {
    category: "Overlays",
    description: "Supplemental noninteractive labels.",
    id: "tooltip",
    route: "/tooltip",
    title: "Tooltip",
  },
  {
    category: "Overlays",
    description: "Preview content for genuine links.",
    id: "hover-card",
    route: "/hover-card",
    title: "Hover Card",
  },
  {
    category: "Overlays",
    description: "Intentional compact floating interaction.",
    id: "popover",
    route: "/popover",
    title: "Popover",
  },
  {
    category: "Forms",
    description: "Finished native single-line text entry.",
    id: "input",
    route: "/input",
    title: "Input",
  },
  {
    category: "Forms",
    description: "Styled native form submission boundary.",
    id: "form",
    route: "/form",
    title: "Form",
  },
  {
    category: "Forms",
    description: "One labeled control and its messages.",
    id: "field",
    route: "/field",
    title: "Field",
  },
  {
    category: "Forms",
    description: "Native related-control grouping.",
    id: "fieldset",
    route: "/fieldset",
    title: "Fieldset",
  },
  {
    category: "Forms",
    description: "Standalone binary and mixed selection.",
    id: "checkbox",
    route: "/checkbox",
    title: "Checkbox",
  },
  {
    category: "Forms",
    description: "Related checkbox selection and parent state.",
    id: "checkbox-group",
    route: "/checkbox-group",
    title: "Checkbox Group",
  },
] as const satisfies readonly PlaygroundEntry[];

export const playgroundEntries: readonly PlaygroundEntry[] = componentEntries;

export function resolvePlaygroundEntry(path: string): PlaygroundEntry {
  return (
    componentEntries.find((entry) => entry.route === path) ??
    componentEntries[0]
  );
}
