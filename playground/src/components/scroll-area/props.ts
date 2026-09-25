import type {
  ScrollAreaRootProps,
  ScrollAreaRootProviderProps,
  ScrollAreaViewportProps,
  ScrollAreaContentProps,
  ScrollAreaScrollbarProps,
  ScrollAreaThumbProps,
  ScrollAreaCornerProps,
} from "@flowstack-ui/brick";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";

const composition = [
  {
    name: "asChild",
    defaultLabel: "false",
    typeLabel: "boolean",
    description: "Merge props and refs onto one child host.",
  },
  {
    name: "render",
    typeLabel: "RenderProp",
    description: "Customize the host while preserving its props and ref.",
  },
] as const;
const recipes = [
  {
    name: "scrollbar",
    defaultLabel: "native",
    typeLabel: '"native" | "custom"',
    description: "Native browser controls or measured custom tracks.",
  },
  {
    name: "size",
    defaultLabel: "md",
    typeLabel: '"xs" | "sm" | "md" | "lg"',
    description: "Custom mode only. Track thicknesses are 4, 6, 8 and 12px.",
  },
  {
    name: "scrollbarVisibility",
    defaultLabel: "auto",
    typeLabel: '"auto" | "always" | "interaction"',
    description:
      "Custom auto/interaction reveal on hover, focus, scrolling or dragging. Native mode follows browser policy.",
  },
  {
    name: "scrollbarGutter",
    defaultLabel: "auto",
    typeLabel: '"auto" | "stable"',
    description: "Reserve scrollbar space or allow overlay bars.",
  },
  {
    name: "scrollShadow",
    defaultLabel: "none",
    typeLabel: '"none" | "vertical" | "horizontal" | "both"',
    description:
      "Custom mode only. Fade edges with remaining content; fades disappear during keyboard focus.",
  },
] as const;
export const scrollAreaProps = [
  {
    name: "orientation",
    defaultLabel: "vertical",
    typeLabel: '"vertical" | "horizontal" | "both"',
    description:
      "Enabled native scroll axes. Supply one custom track per enabled axis.",
  },
  {
    name: "ids",
    typeLabel: "ScrollAreaIds",
    description:
      "Optional part IDs. Track and thumb IDs receive axis suffixes.",
  },
  ...recipes,
  ...composition,
] satisfies readonly DocsPropDefinition<ScrollAreaRootProps>[];
const provider = [
  {
    name: "value",
    typeLabel: "ScrollAreaController",
    description:
      "The controller returned by useScrollArea. Orientation and IDs belong to that hook.",
  },
  ...recipes,
  ...composition,
] satisfies readonly DocsPropDefinition<ScrollAreaRootProviderProps>[];
const viewport = [
  {
    name: "focusable",
    defaultLabel: "false",
    typeLabel: "boolean",
    description:
      "Add a native keyboard scroll target. Supply an accessible name when a region landmark is useful.",
  },
  ...composition,
] satisfies readonly DocsPropDefinition<ScrollAreaViewportProps>[];
const content = [
  ...composition,
] satisfies readonly DocsPropDefinition<ScrollAreaContentProps>[];
const scrollbar = [
  {
    name: "orientation",
    defaultLabel: "vertical",
    typeLabel: '"vertical" | "horizontal"',
    description: "Track axis.",
  },
  {
    name: "children",
    defaultLabel: "Thumb",
    typeLabel: "ReactNode",
    description:
      "Omitting children supplies a styled Thumb. Custom children must retain a Thumb.",
  },
  ...composition,
] satisfies readonly DocsPropDefinition<ScrollAreaScrollbarProps>[];
const thumb = [
  {
    name: "orientation",
    defaultLabel: "inherited",
    typeLabel: '"vertical" | "horizontal"',
    description: "Inherits its owning Scrollbar; explicit values must match.",
  },
  ...composition,
] satisfies readonly DocsPropDefinition<ScrollAreaThumbProps>[];
const corner = [
  ...composition,
] satisfies readonly DocsPropDefinition<ScrollAreaCornerProps>[];
export const scrollAreaPartProps = [
  { id: "props-root-provider", title: "RootProvider", rows: provider },
  { id: "props-viewport", title: "Viewport", rows: viewport },
  { id: "props-content", title: "Content", rows: content },
  { id: "props-scrollbar", title: "Scrollbar", rows: scrollbar },
  { id: "props-thumb", title: "Thumb", rows: thumb },
  { id: "props-corner", title: "Corner", rows: corner },
  {
    id: "props-context",
    title: "Context",
    rows: [
      {
        name: "children",
        typeLabel: "(controller: ScrollAreaController) => ReactNode",
        description:
          "Render subscribed edge, overflow and progress state inside Root.",
      },
    ],
  },
] as const;
