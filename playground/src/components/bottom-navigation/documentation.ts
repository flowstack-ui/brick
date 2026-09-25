import { BottomNavigationSurfaceEffects } from "./examples/BottomNavigationSurfaceEffects.js";
import surfaceEffectsSource from "./examples/BottomNavigationSurfaceEffects.tsx?raw";
import {
  ownerSections,
  type OwnerExample,
  type OwnerPart,
} from "../../shared/OwnerDocumentation.js";
import { BottomNavigationVariants } from "./examples/BottomNavigationVariants.js";
import { BottomNavigationPosition } from "./examples/BottomNavigationPosition.js";
import PositionSource from "./examples/BottomNavigationPosition.tsx?raw";
import VariantsSource from "./examples/BottomNavigationVariants.tsx?raw";
import { BottomNavigationTones } from "./examples/BottomNavigationTones.js";
import TonesSource from "./examples/BottomNavigationTones.tsx?raw";
import { BottomNavigationSizes } from "./examples/BottomNavigationSizes.js";
import SizesSource from "./examples/BottomNavigationSizes.tsx?raw";
import { BottomNavigationResponsive } from "./examples/BottomNavigationResponsive.js";
import ResponsiveSource from "./examples/BottomNavigationResponsive.tsx?raw";
import { BottomNavigationLabels } from "./examples/BottomNavigationLabels.js";
import LabelsSource from "./examples/BottomNavigationLabels.tsx?raw";
import { BottomNavigationSelection } from "./examples/BottomNavigationSelection.js";
import SelectionSource from "./examples/BottomNavigationSelection.tsx?raw";
import { BottomNavigationFloating } from "./examples/BottomNavigationFloating.js";
import FloatingSource from "./examples/BottomNavigationFloating.tsx?raw";
import { BottomNavigationBadge } from "./examples/BottomNavigationBadge.js";
import BadgeSource from "./examples/BottomNavigationBadge.tsx?raw";
import { BottomNavigationComposition } from "./examples/BottomNavigationComposition.js";
import CompositionSource from "./examples/BottomNavigationComposition.tsx?raw";
import { BottomNavigationControlled } from "./examples/BottomNavigationControlled.js";
import ControlledSource from "./examples/BottomNavigationControlled.tsx?raw";
import { BottomNavigationEffects } from "./examples/BottomNavigationEffects.js";
import EffectsSource from "./examples/BottomNavigationEffects.tsx?raw";
export const examples: OwnerExample[] = [
  {
    id: "surface-effects",
    description:
      "Tune fill alpha, exact blur and the structural edge independently. The backdrop is diagnostic artwork; the component owns the surface.",
    title: "Surface effects",
    Demo: BottomNavigationSurfaceEffects,
    source: surfaceEffectsSource,
  },
  {
    id: "position",
    title: "Positioning",
    description:
      "Preview a real fixed bar. Static and sticky retain flow space; absolute and fixed require application-owned content compensation.",
    Demo: BottomNavigationPosition,
    source: PositionSource,
  },
  {
    id: "variants",
    title: "Variants",
    description:
      "Outline is transparent. Surface keeps an opaque background for content beneath the bar.",
    Demo: BottomNavigationVariants,
    source: VariantsSource,
  },
  {
    id: "tones",
    title: "Tones",
    description:
      "Accent emphasizes destinations; neutral keeps a monochrome palette.",
    Demo: BottomNavigationTones,
    source: TonesSource,
  },
  {
    id: "sizes",
    title: "Sizes",
    description: "Sizes coordinate the bar, targets, icons and labels.",
    Demo: BottomNavigationSizes,
    source: SizesSource,
  },
  {
    id: "responsive",
    title: "Responsive sizing",
    description:
      "Use a compact bar on small screens and centered destinations at larger widths.",
    Demo: BottomNavigationResponsive,
    source: ResponsiveSource,
  },
  {
    id: "labels",
    title: "Label visibility",
    description:
      "Always, active-only and hidden presentations keep every destination name accessible.",
    Demo: BottomNavigationLabels,
    source: LabelsSource,
  },
  {
    id: "selection",
    title: "Selection treatment",
    description:
      "Change selected paint independently of the root surface. Plain retains an underline cue.",
    Demo: BottomNavigationSelection,
    source: SelectionSource,
  },
  {
    id: "floating",
    title: "Floating and radius",
    description:
      "Floating layout is inset and centered. Root and selected-area radii are independent.",
    Demo: BottomNavigationFloating,
    source: FloatingSource,
  },
  {
    id: "badge",
    title: "Notification badge",
    description:
      "Anchor the badge to the glyph inside Icon, not to the wider selection area.",
    Demo: BottomNavigationBadge,
    source: BadgeSource,
  },
  {
    id: "composition",
    title: "Composed links",
    description:
      "Use asChild for router-compatible links. The unavailable destination retains its label but cannot navigate.",
    Demo: BottomNavigationComposition,
    source: CompositionSource,
  },
  {
    id: "controlled",
    title: "Controlled views",
    description:
      "Buttons can switch application-owned views. For routes, derive value from the router instead.",
    Demo: BottomNavigationControlled,
    source: ControlledSource,
  },
  {
    id: "effects",
    title: "Elevation and blur",
    description:
      "Named elevation uses shared shadow roles; blur has an opaque reduced-transparency fallback.",
    Demo: BottomNavigationEffects,
    source: EffectsSource,
  },
];
export const parts: OwnerPart[] = [
  {
    id: "props-root",
    title: "Root",
    description: "The navigation landmark owns state and visual recipes.",
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
        name: "variant",
        typeLabel: "'solid' | 'soft' | 'outline' | 'surface' | 'ghost'",
        defaultLabel: "'outline'",
        description: "Root surface; outline is transparent, surface is opaque.",
      },
      {
        name: "tone",
        typeLabel: "'accent' | 'neutral'",
        defaultLabel: "'accent'",
        description: "Navigation palette, not a status.",
      },
      {
        name: "size",
        typeLabel: "ResponsiveValue<'sm' | 'md' | 'lg'>",
        defaultLabel: "'md'",
        description: "Coordinated bar, icon, target and typography geometry.",
      },
      {
        name: "arrangement",
        typeLabel: "ResponsiveValue<'equal' | 'centered'>",
        defaultLabel: "'equal'",
        description: "Available-space distribution.",
      },
      {
        name: "layout",
        typeLabel: "'full' | 'floating'",
        defaultLabel: "'full'",
        description: "Attached width or inset centered geometry.",
      },
      {
        name: "position",
        typeLabel: "'static' | 'sticky' | 'absolute' | 'fixed'",
        defaultLabel: "'static'",
        description: "Overlay positioning does not reserve content space.",
      },
      {
        name: "radius",
        typeLabel: "Radius",
        defaultLabel: "layout-dependent",
        description: "Root corner curvature.",
      },
      {
        name: "selection",
        typeLabel: "'indicator' | 'item'",
        defaultLabel: "'indicator'",
        description: "Selected paint targets the icon area or whole item.",
      },
      {
        name: "selectionVariant",
        typeLabel: "'soft' | 'outline' | 'plain'",
        defaultLabel: "'soft'",
        description: "Selected paint, independent from root surface.",
      },
      {
        name: "selectionRadius",
        typeLabel: "Radius",
        defaultLabel: "shape-dependent",
        description:
          "Selection corners; explicit value overrides shape curvature.",
      },
      {
        name: "selectionShape",
        typeLabel:
          "'circle' | 'rounded' | 'pill' (indicator); 'square' | 'rounded' | 'pill' (item)",
        defaultLabel: "'pill'",
        description:
          "Compatibility geometry; circle controls dimensions as well as curvature.",
      },
      {
        name: "labelVisibility",
        typeLabel: "'always' | 'active' | 'hidden'",
        defaultLabel: "'always'",
        description: "Labels stay accessible even when visually hidden.",
      },
      {
        name: "showLabels",
        typeLabel: "boolean",
        defaultLabel: "—",
        description: "Deprecated: false maps to active-only labels.",
      },
      {
        name: "elevation",
        typeLabel: "'none' | 'low' | 'medium' | 'high'",
        defaultLabel: "—",
        description: "Shared shadow role; overrides elevated.",
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
        description: "Opt-in backdrop blur with opaque preference fallback.",
      },
      {
        name: "safeArea",
        typeLabel: "boolean",
        defaultLabel: "true",
        description: "Stable maximum safe-area insets on positioned bars.",
      },
      {
        name: "value / defaultValue",
        typeLabel: "string | null",
        defaultLabel: "— / null",
        description: "Controlled or initial destination.",
      },
      {
        name: "onChange",
        typeLabel: "(value: string) => void",
        defaultLabel: "—",
        description: "Current-document destination activation.",
      },
      {
        name: "aria-label / aria-labelledby / ariaLabel",
        typeLabel: "string",
        defaultLabel: "'Bottom navigation' fallback",
        description:
          "Native naming takes precedence over the compatibility alias.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        defaultLabel: "false / —",
        description: "Compose a host without adding wrappers.",
      },
    ],
  },
  {
    id: "props-item",
    title: "Item",
    description: "Native destination link or view-change button.",
    rows: [
      {
        name: "value",
        typeLabel: "string",
        defaultLabel: "required",
        description: "Unique destination identity.",
      },
      {
        name: "href / target / rel",
        typeLabel: "string",
        defaultLabel: "—",
        description: "Native link destination and browsing context.",
      },
      {
        name: "download",
        typeLabel: "string | boolean",
        defaultLabel: "—",
        description: "Download without changing the active destination.",
      },
      {
        name: "disabled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Prevent navigation and leave the tab order.",
      },
      {
        name: "type",
        typeLabel: "'button' | 'submit' | 'reset'",
        defaultLabel: "'button'",
        description:
          "Native button type; keep the default for view navigation.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        defaultLabel: "false / —",
        description:
          "Native hosts preserve defaults; custom adapters forward behavior props.",
      },
    ],
  },
  {
    id: "props-icon",
    title: "Icon",
    description:
      "Decorative artwork layout and selected indicator area; use Brick Icon inside.",
    rows: [
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        defaultLabel: "false / —",
        description:
          "Compose the span host; native props and refs are forwarded.",
      },
    ],
  },
  {
    id: "props-label",
    title: "Label",
    description: "Short destination text retained in the accessible name.",
    rows: [
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        defaultLabel: "false / —",
        description:
          "Compose the text host; native props and refs are forwarded.",
      },
    ],
  },
];
export const sections = ownerSections(examples, parts);
