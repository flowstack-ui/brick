import { AppBarSurfaceEffects } from "./examples/AppBarSurfaceEffects.js";
import surfaceEffectsSource from "./examples/AppBarSurfaceEffects.tsx?raw";
import {
  ownerSections,
  type OwnerExample,
  type OwnerPart,
} from "../../shared/OwnerDocumentation.js";
import { AppBarContained } from "./examples/AppBarContained.js";
import ContainedSource from "./examples/AppBarContained.tsx?raw";
import { AppBarLayout } from "./examples/AppBarLayout.js";
import LayoutSource from "./examples/AppBarLayout.tsx?raw";
import { AppBarDensity } from "./examples/AppBarDensity.js";
import DensitySource from "./examples/AppBarDensity.tsx?raw";
import { AppBarSurfaces } from "./examples/AppBarSurfaces.js";
import SurfacesSource from "./examples/AppBarSurfaces.tsx?raw";
import { AppBarEffects } from "./examples/AppBarEffects.js";
import EffectsSource from "./examples/AppBarEffects.tsx?raw";
import { AppBarResponsive } from "./examples/AppBarResponsive.js";
import ResponsiveSource from "./examples/AppBarResponsive.tsx?raw";
import { AppBarSearch } from "./examples/AppBarSearch.js";
import SearchSource from "./examples/AppBarSearch.tsx?raw";
import { AppBarSticky } from "./examples/AppBarSticky.js";
import StickySource from "./examples/AppBarSticky.tsx?raw";
import { AppBarFixed } from "./examples/AppBarFixed.js";
import FixedSource from "./examples/AppBarFixed.tsx?raw";
import { AppBarRows } from "./examples/AppBarRows.js";
import RowsSource from "./examples/AppBarRows.tsx?raw";
import { AppBarActions } from "./examples/AppBarActions.js";
import ActionsSource from "./examples/AppBarActions.tsx?raw";
export const examples: OwnerExample[] = [
  {
    id: "surface-effects",
    description:
      "Tune fill alpha, exact blur and the structural edge independently. The backdrop is diagnostic artwork; the component owns the surface.",
    title: "Surface effects",
    Demo: AppBarSurfaceEffects,
    source: surfaceEffectsSource,
  },
  {
    id: "contained",
    title: "Contained width",
    description:
      "Container owns the content gutter; the bar surface stays full width.",
    Demo: AppBarContained,
    source: ContainedSource,
  },
  {
    id: "layout",
    title: "Layout",
    description:
      "Balanced centers the title geometrically. Flex allocates the remaining space to Center.",
    Demo: AppBarLayout,
    source: LayoutSource,
  },
  {
    id: "density",
    title: "Density and spacing",
    description:
      "Use compact or comfortable rhythm, including sparse responsive overrides.",
    Demo: AppBarDensity,
    source: DensitySource,
  },
  {
    id: "surfaces",
    title: "Surfaces",
    description: "Choose paint independently from border and child semantics.",
    Demo: AppBarSurfaces,
    source: SurfacesSource,
  },
  {
    id: "effects",
    title: "Elevation and blur",
    description:
      "Elevation shares Surface shadow roles; blur retains the selected material and an opaque preference fallback.",
    Demo: AppBarEffects,
    source: EffectsSource,
  },
  {
    id: "responsive",
    title: "Responsive navigation",
    description:
      "Keep the label and action available; optional navigation moves into an independently named drawer on narrow screens.",
    Demo: AppBarResponsive,
    source: ResponsiveSource,
  },
  {
    id: "search",
    title: "Search and actions",
    description:
      "Flex gives the search field available space. Keep control sizes consistent.",
    Demo: AppBarSearch,
    source: SearchSource,
  },
  {
    id: "sticky",
    title: "Sticky offset",
    description:
      "The scroll region owns its bounds; the bar owns its logical top offset.",
    Demo: AppBarSticky,
    source: StickySource,
  },
  {
    id: "fixed",
    title: "Fixed positioning",
    description:
      "This temporary bar attaches to the real viewport. Fixed positioning does not reserve document space.",
    Demo: AppBarFixed,
    source: FixedSource,
  },
  {
    id: "rows",
    title: "Multiple rows",
    description:
      "Compose a second structural row without turning AppBar into a navigation system.",
    Demo: AppBarRows,
    source: RowsSource,
  },
  {
    id: "actions",
    title: "Colored actions and overlays",
    description:
      "Neutral ghost actions follow the accent surface; explicit variants keep their own recipes.",
    Demo: AppBarActions,
    source: ActionsSource,
  },
];
export const parts: OwnerPart[] = [
  {
    id: "props-root",
    title: "Root",
    description:
      "Semantic header, surface and positioning. Native props, refs, asChild and render are forwarded.",
    rows: [
      {
        name: "treatment",
        typeLabel: '"none" | "translucent"',
        defaultLabel: "—",
        description:
          "Opt-in surface preset; explicit parameters remain independent.",
      },
      {
        name: "backgroundOpacity",
        typeLabel: "number (0–1)",
        defaultLabel: "recipe",
        description: "Fill alpha multiplier; does not fade children.",
      },
      {
        name: "backdropBlur",
        typeLabel: '"none" | "sm" | "md" | "lg" | "0" | px/rem/em length',
        defaultLabel: "recipe",
        description: "Named or precise backdrop blur, for example 18px.",
      },
      {
        name: "backdropSaturate",
        typeLabel: "number ≥ 0",
        defaultLabel: "recipe",
        description: "Backdrop saturation; 1 leaves saturation unchanged.",
      },
      {
        name: "borderColor",
        typeLabel: "CSS color",
        defaultLabel: "semantic role",
        description:
          "Existing structural border color; does not create a border.",
      },
      {
        name: "borderOpacity",
        typeLabel: "number (0–1)",
        defaultLabel: "1",
        description:
          "Border alpha multiplier; independent of focus and selection.",
      },
      {
        name: "position",
        typeLabel: "'static' | 'absolute' | 'sticky' | 'fixed'",
        defaultLabel: "'static'",
        description:
          "Position relative to normal flow, a containing block or the viewport.",
      },
      {
        name: "variant",
        typeLabel: "'surface' | 'solid' | 'transparent'",
        defaultLabel: "'surface'",
        description: "The surface material.",
      },
      {
        name: "tone",
        typeLabel: "'neutral' | 'accent'",
        defaultLabel: "'neutral'",
        description: "The semantic color treatment.",
      },
      {
        name: "bordered",
        typeLabel: "boolean",
        defaultLabel: "true",
        description: "Logical bottom boundary.",
      },
      {
        name: "elevation",
        typeLabel: "'none' | 'low' | 'medium' | 'high'",
        defaultLabel: "—",
        description: "Named semantic shadow; overrides elevated.",
      },
      {
        name: "elevated",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Compatibility shorthand for low elevation.",
      },
      {
        name: "blurred",
        typeLabel: "boolean",
        defaultLabel: "false",
        description:
          "Opt-in translucency with an opaque reduced-transparency fallback.",
      },
      {
        name: "offset",
        typeLabel: "ResponsiveValue<SpacingValue>",
        defaultLabel: "0",
        description:
          "Logical top inset for positioned bars; numeric spacing factors.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        defaultLabel: "false / —",
        description:
          "Use an intentional alternative host without adding a wrapper.",
      },
    ],
  },
  {
    id: "props-toolbar",
    title: "Toolbar",
    description:
      "One structural row—not an ARIA toolbar or automatic navigation system.",
    rows: [
      {
        name: "layout",
        typeLabel: "ResponsiveValue<'balanced' | 'flex'>",
        defaultLabel: "'balanced'",
        description:
          "Balanced keeps true centering; flex gives Center the remaining space.",
      },
      {
        name: "density",
        typeLabel: "ResponsiveValue<'comfortable' | 'compact'>",
        defaultLabel: "'comfortable'",
        description:
          "64px or 48px minimum at the default root font size; larger content can grow.",
      },
      {
        name: "inset",
        typeLabel: "ResponsiveValue<'default' | 'none'>",
        defaultLabel: "'default'",
        description: "Use none when Container owns the gutter.",
      },
      {
        name: "gap",
        typeLabel: "ResponsiveValue<SpacingValue>",
        defaultLabel: "density-dependent",
        description:
          "Space between the three regions; does not configure gaps inside them.",
      },
    ],
  },
  {
    id: "props-sections",
    title: "Start, Center, End",
    description:
      "Logical regions preserve DOM order and forward native props, refs and composition.",
    rows: [
      {
        name: "gap",
        typeLabel: "ResponsiveValue<SpacingValue>",
        defaultLabel: "2",
        description: "Spacing between children of this region.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        defaultLabel: "false / —",
        description:
          "Compose a nav or other intentional host while preserving region layout.",
      },
    ],
  },
];
export const sections = ownerSections(examples, parts);
