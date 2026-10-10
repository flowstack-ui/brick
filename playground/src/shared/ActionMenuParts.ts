import type { OwnerPart } from "./OwnerDocumentation.js";

/** Shared popup contracts; invocation-specific props stay in the owner's file. */
export const actionMenuBehaviorParts: OwnerPart[] = [
  {
    id: "props-triggerindicator",
    title: "TriggerIndicator",
    description: "Optional decorative artwork inside Trigger. It does not add a second control or change invocation behavior.",
    rows: [
      { name: "children", typeLabel: "ReactNode", defaultLabel: "Down chevron", description: "Replace the default artwork explicitly; omit the entire part when no indicator is wanted." },
      { name: "asChild", typeLabel: "boolean", defaultLabel: "false", description: "Merge presentation into one supplied decorative host." },
    ],
  },
  {
    id: "props-trigger",
    title: "Trigger",
    description:
      "Preserves the invocation semantics of this menu's trigger and the supplied host when using asChild.",
    rows: [
      {
        name: "value",
        typeLabel: "string",
        defaultLabel: "'default'",
        description:
          "Stable identity when several triggers share one popup; focus returns to the actual opener.",
      },
      {
        name: "disabled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description:
          "Disable invocation; composed controls preserve their native disabled behavior.",
      },
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Compose one native host with merged events and refs.",
      },
      { name: "render", typeLabel: "RenderProp", defaultLabel: "—", description: "Customize the single rendered host." },
    ],
  },
  {
    id: "props-checkboxitem",
    title: "CheckboxItem",
    description:
      "A checkable command, not a nested Checkbox control. ItemIndicator supplies state-aware artwork.",
    rows: [
      {
        name: "value",
        typeLabel: "string",
        defaultLabel: "Required",
        description: "Unique command identity.",
      },
      {
        name: "checked",
        typeLabel: "boolean | 'indeterminate'",
        defaultLabel: "false",
        description: "Application-owned checked state.",
      },
      {
        name: "onCheckedChange",
        typeLabel: "(checked: boolean) => void",
        defaultLabel: "—",
        description: "Accept the next checked state.",
      },
      {
        name: "closeOnSelect",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Keep preference menus open, or opt into closing.",
      },
      {
        name: "onSelect",
        typeLabel: "(event: MenuSelectionEvent) => void",
        defaultLabel: "—",
        description:
          "Cancel selection with preventDefault before checked state or dismissal changes.",
      },
      {
        name: "tone",
        typeLabel: "ActionMenuTone",
        defaultLabel: "Inherited",
        description: "The same row presentation and disabled policy as Item.",
      },
      { name: "itemInset", typeLabel: "'default' | 'none'", defaultLabel: "Inherited", description: "Inline row padding." },
      { name: "disabled", typeLabel: "boolean", defaultLabel: "false", description: "Keep discoverable without allowing activation." },
    ],
  },
  {
    id: "props-radiogroup",
    title: "RadioGroup",
    description:
      "Owns one exclusive value. Use a stable id to scope controlled highlight when several groups repeat values.",
    rows: [
      {
        name: "value",
        typeLabel: "string",
        defaultLabel: "—",
        description: "Application-owned exclusive setting.",
      },
      { name: "onValueChange", typeLabel: "(value: string) => void", defaultLabel: "—", description: "Accept the selected setting." },
      {
        name: "id",
        typeLabel: "string",
        defaultLabel: "Generated",
        description: "Group identity for { value, groupId } highlighting.",
      },
    ],
  },
  {
    id: "props-radioitem",
    title: "RadioItem",
    description:
      "An exclusive menu choice inside RadioGroup; compose ItemIndicator rather than a nested radio input.",
    rows: [
      {
        name: "value",
        typeLabel: "string",
        defaultLabel: "Required",
        description: "Choice identity within the group.",
      },
      {
        name: "closeOnSelect",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Whether accepting this setting closes the menu.",
      },
      {
        name: "onSelect",
        typeLabel: "(event: MenuSelectionEvent) => void",
        defaultLabel: "—",
        description:
          "Cancellation, accessibility and presentation match command rows.",
      },
      { name: "disabled", typeLabel: "boolean", defaultLabel: "false", description: "Prevent activation while remaining discoverable." },
      { name: "tone", typeLabel: "ActionMenuTone", defaultLabel: "Inherited", description: "Semantic row palette." },
      { name: "itemInset", typeLabel: "'default' | 'none'", defaultLabel: "Inherited", description: "Inline row padding." },
    ],
  },
  {
    id: "props-sub",
    title: "Sub",
    description:
      "Owns a nested command branch; pair SubTrigger and SubContent within it.",
    rows: [
      {
        name: "open",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Controlled or initial submenu expansion.",
      },
      { name: "defaultOpen", typeLabel: "boolean", defaultLabel: "false", description: "Initial uncontrolled submenu expansion." },
      { name: "onOpenChange", typeLabel: "(open: boolean) => void", defaultLabel: "—", description: "Accept submenu expansion changes." },
      {
        name: "positioning",
        typeLabel: "MenuPositioningOptions",
        defaultLabel: "Inherited",
        description:
          "Configure collision handling and placement for this branch; SubContent can override it.",
      },
      {
        name: "lazyMount",
        typeLabel: "boolean",
        defaultLabel: "Inherited",
        description:
          "Control retained content and observe this branch's completed exit independently of its parent.",
      },
      { name: "unmountOnExit", typeLabel: "boolean", defaultLabel: "Inherited", description: "Remove branch content after exit." },
      { name: "onExitComplete", typeLabel: "() => void", defaultLabel: "—", description: "Observe this branch's completed exit." },
    ],
  },
  {
    id: "props-subcontent",
    title: "SubContent",
    description:
      "Uses Content's visual and positioning contracts. Omitted visual props inherit the nearest popup, including explicit inset overrides.",
    rows: [
      {
        name: "size",
        typeLabel: "'sm' | 'md' | 'lg'",
        defaultLabel: "Inherited",
        description:
          "Override only the nested popup that needs a different presentation.",
      },
      { name: "variant", typeLabel: "'subtle' | 'solid' | 'plain'", defaultLabel: "Inherited", description: "Highlight recipe." },
      { name: "tone", typeLabel: "ActionMenuTone", defaultLabel: "Inherited", description: "Semantic highlight palette." },
      { name: "inset", typeLabel: "'none' | 'sm' | 'md' | 'lg'", defaultLabel: "Inherited", description: "Popup padding." },
      { name: "itemInset", typeLabel: "'default' | 'none'", defaultLabel: "Inherited", description: "Row inline padding." },
      { name: "leadingSpace", typeLabel: "'auto' | 'reserve'", defaultLabel: "Inherited", description: "Reserve space for icons or choice indicators." },
      {
        name: "radius",
        typeLabel: "Radius",
        defaultLabel: "overlay",
        description: "Theme-relative popup shape.",
      },
      {
        name: "positioning",
        typeLabel: "MenuPositioningOptions",
        defaultLabel: "Automatic",
        description:
          "Collision-aware placement within the viewport and nested menu geometry.",
      },
      {
        name: "loop",
        typeLabel: "boolean",
        defaultLabel: "true",
        description:
          "Control keyboard wrapping or prevent an outside interaction from dismissing this branch.",
      },
      { name: "onInteractOutside", typeLabel: "(event: OutsideInteractionEvent) => void", defaultLabel: "—", description: "Observe or prevent outside dismissal." },
    ],
  },
  {
    id: "props-portal",
    title: "Portal",
    description:
      "Selects an optional portal destination. Content already owns its default portalling and overlay scope.",
    rows: [
      {
        name: "container",
        typeLabel: "HTMLElement | null",
        defaultLabel: "Overlay environment",
        description:
          "Use a host in the same document; preserve the local appearance and modal owner.",
      },
      {
        name: "disabled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description:
          "Render in place when the composition requires it; ensure ancestors do not clip the popup.",
      },
    ],
  },
];
