import {
  ownerSections,
  type OwnerExample,
  type OwnerPart,
} from "../../shared/OwnerDocumentation.js";
import { TabsVariants } from "./examples/TabsVariants.js";
import VariantsSource from "./examples/TabsVariants.tsx?raw";
import { TabsSizes } from "./examples/TabsSizes.js";
import SizesSource from "./examples/TabsSizes.tsx?raw";
import { TabsAlignment } from "./examples/TabsAlignment.js";
import AlignmentSource from "./examples/TabsAlignment.tsx?raw";
import { TabsVertical } from "./examples/TabsVertical.js";
import VerticalSource from "./examples/TabsVertical.tsx?raw";
import { TabsResponsive } from "./examples/TabsResponsive.js";
import ResponsiveSource from "./examples/TabsResponsive.tsx?raw";
import { TabsStates } from "./examples/TabsStates.js";
import StatesSource from "./examples/TabsStates.tsx?raw";
import { TabsControlled } from "./examples/TabsControlled.js";
import ControlledSource from "./examples/TabsControlled.tsx?raw";
import { TabsController } from "./examples/TabsController.js";
import ControllerSource from "./examples/TabsController.tsx?raw";
import { TabsManual } from "./examples/TabsManual.js";
import ManualSource from "./examples/TabsManual.tsx?raw";
import { TabsLifecycle } from "./examples/TabsLifecycle.js";
import LifecycleSource from "./examples/TabsLifecycle.tsx?raw";
import { TabsIndicator } from "./examples/TabsIndicator.js";
import IndicatorSource from "./examples/TabsIndicator.tsx?raw";
import { TabsDeselectable } from "./examples/TabsDeselectable.js";
import DeselectableSource from "./examples/TabsDeselectable.tsx?raw";
import { TabsAnimation } from "./examples/TabsAnimation.js";
import AnimationSource from "./examples/TabsAnimation.tsx?raw";
import { TabsDynamic } from "./examples/TabsDynamic.js";
import DynamicSource from "./examples/TabsDynamic.tsx?raw";
import { TabsLinks } from "./examples/TabsLinks.js";
import LinksSource from "./examples/TabsLinks.tsx?raw";
export const examples: OwnerExample[] = [
  {
    id: "variants",
    title: "Variants",
    description:
      "Use line, subtle, solid, outline, plain or enclosed. Soft retains its existing subtle recipe.",
    Demo: TabsVariants,
    source: VariantsSource,
  },
  {
    id: "sizes",
    title: "Sizes",
    description:
      "Small, medium and large coordinate target height, typography and spacing.",
    Demo: TabsSizes,
    source: SizesSource,
  },
  {
    id: "alignment",
    title: "Fitted and alignment",
    description:
      "Distribute tabs equally with fullWidth, or align intrinsic-width tabs with justify.",
    Demo: TabsAlignment,
    source: AlignmentSource,
  },
  {
    id: "vertical",
    title: "Vertical",
    description:
      "Vertical orientation uses Up and Down keys; panel spacing follows the list.",
    Demo: TabsVertical,
    source: VerticalSource,
  },
  {
    id: "responsive",
    title: "Responsive layout",
    description:
      "Adapt recipes and visual placement while keeping a stable keyboard orientation.",
    Demo: TabsResponsive,
    source: ResponsiveSource,
  },
  {
    id: "states",
    title: "Icons and disabled tabs",
    description:
      "Compose artwork alongside labels. Disabled tabs remain visible and are skipped.",
    Demo: TabsStates,
    source: StatesSource,
  },
  {
    id: "controlled",
    title: "Controlled value",
    description: "Keep the selected value in application state.",
    Demo: TabsControlled,
    source: ControlledSource,
  },
  {
    id: "controller",
    title: "External controller",
    description:
      "Share one controller with RootProvider and controls outside the tab list.",
    Demo: TabsController,
    source: ControllerSource,
  },
  {
    id: "manual",
    title: "Manual activation",
    description:
      "Move focus with arrows, then select with Enter or Space. Looping is disabled here.",
    Demo: TabsManual,
    source: ManualSource,
  },
  {
    id: "lifecycle",
    title: "Lazy mounting and retention",
    description:
      "Mount a panel on its first visit and keep its draft when switching away.",
    Demo: TabsLifecycle,
    source: LifecycleSource,
  },
  {
    id: "indicator",
    title: "Moving indicator",
    description:
      "Plain uses a filled moving indicator; shared radius tokens keep the rounded parts aligned.",
    Demo: TabsIndicator,
    source: IndicatorSource,
  },
  {
    id: "deselectable",
    title: "Deselectable",
    description: "Activate the selected tab again to clear selection.",
    Demo: TabsDeselectable,
    source: DeselectableSource,
  },
  {
    id: "animation",
    title: "Content animation",
    description:
      "Opt into a short fade. Reduced-motion preferences remove the animation.",
    Demo: TabsAnimation,
    source: AnimationSource,
  },
  {
    id: "dynamic",
    title: "Dynamic tabs",
    description:
      "Keep adding and removing documents in application state. Actions stay outside the tablist.",
    Demo: TabsDynamic,
    source: DynamicSource,
  },
  {
    id: "links",
    title: "Links",
    description:
      "Compose native anchors for URL-backed peer panels. An application router owns URL synchronization.",
    Demo: TabsLinks,
    source: LinksSource,
  },
];
export const parts: OwnerPart[] = [
  {
    id: "props-root",
    title: "Root",
    description: "Selection, lifecycle and presentation for related panels.",
    rows: [
      {
        name: "value / defaultValue",
        typeLabel: "string",
        defaultLabel: "— / ''",
        description:
          "Controlled or initial selection; values must be nonempty and unique.",
      },
      {
        name: "onValueChange",
        typeLabel: "(value: string) => void",
        defaultLabel: "—",
        description: "Called when selection changes.",
      },
      {
        name: "size",
        typeLabel: "ResponsiveValue<'sm' | 'md' | 'lg'>",
        defaultLabel: "'md'",
        description: "36, 40 or 44px minimum trigger height.",
      },
      {
        name: "variant",
        typeLabel: "ResponsiveValue<TabsVariant>",
        defaultLabel: "'line'",
        description: "line, solid, soft, subtle, enclosed, outline or plain.",
      },
      {
        name: "tone",
        typeLabel: "ResponsiveValue<'accent' | 'neutral'>",
        defaultLabel: "'accent'",
        description: "Selected palette, independent of the shared focus ring.",
      },
      {
        name: "fullWidth",
        typeLabel: "ResponsiveValue<boolean>",
        defaultLabel: "false",
        description: "Distribute available list width equally.",
      },
      {
        name: "layout",
        typeLabel: "ResponsiveValue<'auto' | 'stacked' | 'side'>",
        defaultLabel: "'auto'",
        description: "Visual list/panel placement; auto follows orientation.",
      },
      {
        name: "orientation",
        typeLabel: "'horizontal' | 'vertical'",
        defaultLabel: "'horizontal'",
        description: "Semantic keyboard direction, not a CSS-only breakpoint.",
      },
      {
        name: "dir",
        typeLabel: "'ltr' | 'rtl'",
        defaultLabel: "inherited",
        description: "Logical horizontal navigation.",
      },
      {
        name: "activationMode",
        typeLabel: "'automatic' | 'manual'",
        defaultLabel: "'automatic'",
        description:
          "Select during arrow navigation or wait for explicit activation.",
      },
      {
        name: "loopFocus / loop",
        typeLabel: "boolean",
        defaultLabel: "true",
        description: "Arrow-key wrapping; loopFocus takes precedence.",
      },
      {
        name: "deselectable",
        typeLabel: "boolean",
        defaultLabel: "false",
        description:
          "Reactivating the selected tab clears to the empty string.",
      },
      {
        name: "onFocusChange",
        typeLabel: "(details: { focusedValue: string }) => void",
        defaultLabel: "—",
        description: "Observe tab focus changes.",
      },
      {
        name: "navigate",
        typeLabel:
          "(details: { value: string; node: HTMLAnchorElement; href: string }) => void",
        defaultLabel: "—",
        description: "Router callback for composed peer-panel links.",
      },
      {
        name: "id / ids",
        typeLabel: "string / TabsIds",
        defaultLabel: "generated",
        description: "Coordinate stable, unique part IDs.",
      },
      {
        name: "lazyMount / unmountOnExit",
        typeLabel: "boolean",
        defaultLabel: "legacy inactive unmount",
        description:
          "Explicit flags control first mounting and retention independently.",
      },
      {
        name: "hideMode",
        typeLabel: "'display-none' | 'activity'",
        defaultLabel: "'display-none'",
        description:
          "Activity requires React support; otherwise display-none retention.",
      },
      {
        name: "onExitComplete",
        typeLabel: "() => void",
        defaultLabel: "—",
        description: "Called after a Content exit completes.",
      },
      {
        name: "composite",
        typeLabel: "boolean",
        defaultLabel: "true",
        description:
          "Advanced integration: false leaves focus ownership outside Tabs.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        defaultLabel: "false / —",
        description: "Compose a single host without an extra wrapper.",
      },
    ],
  },
  {
    id: "props-root-provider",
    title: "RootProvider",
    description:
      "Use a controller created by useTabs. Accepts the same Brick recipe props as Root.",
    rows: [
      {
        name: "value",
        typeLabel: "UseTabsReturn",
        defaultLabel: "required",
        description:
          "The shared controller; do not pass the selected string here.",
      },
    ],
  },
  {
    id: "props-list",
    title: "List",
    description: "Contains tab triggers and an optional indicator.",
    rows: [
      {
        name: "ariaLabel / aria-label",
        typeLabel: "string",
        defaultLabel: "—",
        description: "Accessible name for the tablist.",
      },
      {
        name: "columns",
        typeLabel: "ResponsiveValue<'auto' | 1 | 2 | 3 | 4>",
        defaultLabel: "'auto'",
        description:
          "Equal visual tracks or a one-axis flex list; does not change keyboard orientation.",
      },
      {
        name: "justify",
        typeLabel: "ResponsiveValue<'start' | 'center' | 'end'>",
        defaultLabel: "'start'",
        description: "Align tabs while keeping overflowing content reachable.",
      },
      {
        name: "radius",
        typeLabel: "Radius | 'default'",
        defaultLabel: "'default'",
        description: "List curvature.",
      },
      {
        name: "triggerRadius",
        typeLabel: "Radius | 'default'",
        defaultLabel: "variant-dependent",
        description: "Independent trigger and filled-indicator curvature.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        defaultLabel: "false / —",
        description: "Preserve tablist semantics on the composed host.",
      },
    ],
  },
  {
    id: "props-trigger",
    title: "Trigger",
    description: "A tab button or composed peer-panel link.",
    rows: [
      {
        name: "value",
        typeLabel: "string",
        defaultLabel: "required",
        description: "Matches one panel value.",
      },
      {
        name: "disabled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Prevent selection and native navigation.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        defaultLabel: "false / —",
        description:
          "Compose a button or anchor while retaining tab semantics.",
      },
    ],
  },
  {
    id: "props-content-group",
    title: "ContentGroup",
    description: "Optional structural wrapper around related panels.",
    rows: [
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description:
          "Merge layout onto one host. Native props and refs are forwarded.",
      },
    ],
  },
  {
    id: "props-content",
    title: "Content",
    description: "The panel linked to a Trigger.",
    rows: [
      {
        name: "value",
        typeLabel: "string",
        defaultLabel: "required",
        description: "Corresponding tab value.",
      },
      {
        name: "inset",
        typeLabel: "'none' | 'sm' | 'md' | 'lg'",
        defaultLabel: "size-derived",
        description: "Panel padding.",
      },
      {
        name: "spacing",
        typeLabel: "'inset' | 'adjacent'",
        defaultLabel: "'inset'",
        description: "Adjacent keeps only the space facing the list.",
      },
      {
        name: "animation",
        typeLabel: "'none' | 'fade'",
        defaultLabel: "'none'",
        description: "Opt-in enter/exit fade respecting reduced motion.",
      },
      {
        name: "keepMounted",
        typeLabel: "boolean",
        defaultLabel: "false",
        description:
          "Legacy eager retention; explicit lifecycle flags take precedence.",
      },
      {
        name: "lazyMount / unmountOnExit",
        typeLabel: "boolean",
        defaultLabel: "inherited",
        description: "Per-panel lifecycle override.",
      },
      {
        name: "hideMode / onExitComplete",
        typeLabel: "'display-none' | 'activity' / (() => void)",
        defaultLabel: "inherited",
        description: "Per-panel hiding and exit callback.",
      },
      {
        name: "focusable / tabIndex",
        typeLabel: "boolean / number",
        defaultLabel: "automatic",
        description:
          "Text-only panels enter Tab order; explicit tabIndex wins.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        defaultLabel: "false / —",
        description: "Preserve linked panel semantics.",
      },
    ],
  },
  {
    id: "props-indicator",
    title: "Indicator",
    description:
      "Decorative measured selection artwork; optional on all variants.",
    rows: [
      {
        name: "radius",
        typeLabel: "Radius",
        defaultLabel: "trigger-dependent",
        description: "Filled indicator curvature.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        defaultLabel: "false / —",
        description:
          "Compose artwork; coordinates and readiness remain Atom-owned.",
      },
    ],
  },
  {
    id: "props-context",
    title: "Context",
    description: "Read the nearest controller without a host element.",
    rows: [
      {
        name: "children",
        typeLabel: "(context: UseTabsReturn) => ReactNode",
        defaultLabel: "required",
        description: "Render from the current selection or focus state.",
      },
    ],
  },
];
export const sections = ownerSections(examples, parts, true);
