import {
  ownerSections,
  type OwnerExample,
  type OwnerPart,
} from "../../shared/OwnerDocumentation.js";
import { BreadcrumbBasic } from "./examples/BreadcrumbBasic.js";
import BasicSource from "./examples/BreadcrumbBasic.tsx?raw";
import { BreadcrumbSizes } from "./examples/BreadcrumbSizes.js";
import SizesSource from "./examples/BreadcrumbSizes.tsx?raw";
import { BreadcrumbVariants } from "./examples/BreadcrumbVariants.js";
import VariantsSource from "./examples/BreadcrumbVariants.tsx?raw";
import { BreadcrumbSeparator } from "./examples/BreadcrumbSeparator.js";
import SeparatorSource from "./examples/BreadcrumbSeparator.tsx?raw";
import { BreadcrumbIcons } from "./examples/BreadcrumbIcons.js";
import IconsSource from "./examples/BreadcrumbIcons.tsx?raw";
import { BreadcrumbMenu } from "./examples/BreadcrumbMenu.js";
import MenuSource from "./examples/BreadcrumbMenu.tsx?raw";
import { BreadcrumbEllipsis } from "./examples/BreadcrumbEllipsis.js";
import EllipsisSource from "./examples/BreadcrumbEllipsis.tsx?raw";
import { BreadcrumbCollapsedMenu } from "./examples/BreadcrumbCollapsedMenu.js";
import CollapsedMenuSource from "./examples/BreadcrumbCollapsedMenu.tsx?raw";
import { BreadcrumbRouting } from "./examples/BreadcrumbRouting.js";
import RoutingSource from "./examples/BreadcrumbRouting.tsx?raw";
import { BreadcrumbClosed } from "./examples/BreadcrumbClosed.js";
import ClosedSource from "./examples/BreadcrumbClosed.tsx?raw";
import { BreadcrumbCurrent } from "./examples/BreadcrumbCurrent.js";
import CurrentSource from "./examples/BreadcrumbCurrent.tsx?raw";
import { BreadcrumbTones } from "./examples/BreadcrumbTones.js";
import TonesSource from "./examples/BreadcrumbTones.tsx?raw";
import { BreadcrumbCustomization } from "./examples/BreadcrumbCustomization.js";
import CustomizationSource from "./examples/BreadcrumbCustomization.tsx?raw";
import { BreadcrumbResponsive } from "./examples/BreadcrumbResponsive.js";
import ResponsiveSource from "./examples/BreadcrumbResponsive.tsx?raw";
import { BreadcrumbDirection } from "./examples/BreadcrumbDirection.js";
import DirectionSource from "./examples/BreadcrumbDirection.tsx?raw";
export const Basic = BreadcrumbBasic;
export const basicSource = BasicSource;
export const examples: OwnerExample[] = [
  {
    id: "sizes",
    title: "Sizes",
    description: "Compare compact text and target sizes.",
    Demo: BreadcrumbSizes,
    source: SizesSource,
  },
  {
    id: "variants",
    title: "Variants",
    description: "Plain, underline and interaction-only subtle decoration.",
    Demo: BreadcrumbVariants,
    source: VariantsSource,
  },
  {
    id: "separator",
    title: "Custom separator",
    description: "Replace the directional chevron with decorative content.",
    Demo: BreadcrumbSeparator,
    source: SeparatorSource,
  },
  {
    id: "icons",
    title: "Icons",
    description: "Leading and trailing artwork share owned spacing.",
    Demo: BreadcrumbIcons,
    source: IconsSource,
  },
  {
    id: "menu",
    title: "Menu",
    description: "A real button opens a menu of ancestor destinations.",
    Demo: BreadcrumbMenu,
    source: MenuSource,
  },
  {
    id: "ellipsis",
    title: "Ellipsis",
    description: "A static indicator represents intentionally hidden levels.",
    Demo: BreadcrumbEllipsis,
    source: EllipsisSource,
  },
  {
    id: "collapsedmenu",
    title: "Collapsed menu",
    description: "A named button reveals hidden ancestor destinations.",
    Demo: BreadcrumbCollapsedMenu,
    source: CollapsedMenuSource,
  },
  {
    id: "routing",
    title: "Routing library",
    description:
      "Forward native props and anchor refs; preserve modified clicks.",
    Demo: BreadcrumbRouting,
    source: RoutingSource,
  },
  {
    id: "closed",
    title: "Closed component",
    description: "Map application-owned data into one complete trail.",
    Demo: BreadcrumbClosed,
    source: ClosedSource,
  },
  {
    id: "current",
    title: "Linked current page",
    description: "An explicit current destination remains a real native link.",
    Demo: BreadcrumbCurrent,
    source: CurrentSource,
  },
  {
    id: "tones",
    title: "Tones",
    description: "Use neutral navigation, accent links, or inherit the surrounding text color.",
    Demo: BreadcrumbTones,
    source: TonesSource,
  },
  {
    id: "customization",
    title: "Customization",
    description: "Local semantic token overrides preserve the chosen recipe.",
    Demo: BreadcrumbCustomization,
    source: CustomizationSource,
  },
  {
    id: "responsive",
    title: "Responsive",
    description: "Size and decoration follow shared Brick breakpoints.",
    Demo: BreadcrumbResponsive,
    source: ResponsiveSource,
  },
  {
    id: "direction",
    title: "Direction",
    description:
      "Only directional artwork mirrors; nested direction remains local.",
    Demo: BreadcrumbDirection,
    source: DirectionSource,
  },
];
export const parts: OwnerPart[] = [
  {
    id: "props-root",
    title: "Root",
    description:
      "Default host: nav. Native attributes, className, style and refs are forwarded.",
    rows: [
      {
        name: "size",
        typeLabel: 'ResponsiveValue<"sm" | "md" | "lg">',
        defaultLabel: '"md"',
        description: "Compact typography, spacing and target recipe.",
      },
      {
        name: "variant",
        typeLabel: 'ResponsiveValue<"plain" | "underline" | "subtle">',
        defaultLabel: '"plain"',
        description: "Destination decoration; inherit adds an interaction underline to links and triggers.",
      },
      {
        name: "tone",
        typeLabel: '"neutral" | "accent" | "inherit"',
        defaultLabel: '"neutral"',
        description: "Navigation foreground: neutral, accent links, or inherited color.",
      },
      {
        name: "ariaLabel",
        typeLabel: "string",
        defaultLabel: '"Breadcrumb"',
        description:
          "Legacy name alias; native aria-label takes precedence. aria-labelledby is supported.",
      },
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description:
          "Merge onto one host preserving this part\u2019s semantics and ref.",
      },
      {
        name: "render",
        typeLabel: "RenderProp",
        defaultLabel: "\u2014",
        description: "Atom-owned custom final-host rendering.",
      },
    ],
  },
  {
    id: "props-list",
    title: "List",
    description:
      "Default host: ol. Native attributes, className, style and refs are forwarded.",
    rows: [
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description:
          "Merge onto one host preserving this part\u2019s semantics and ref.",
      },
      {
        name: "render",
        typeLabel: "RenderProp",
        defaultLabel: "\u2014",
        description: "Atom-owned custom final-host rendering.",
      },
    ],
  },
  {
    id: "props-item",
    title: "Item",
    description:
      "Default host: li. Native attributes, className, style and refs are forwarded.",
    rows: [
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description:
          "Merge onto one host preserving this part\u2019s semantics and ref.",
      },
      {
        name: "render",
        typeLabel: "RenderProp",
        defaultLabel: "\u2014",
        description: "Atom-owned custom final-host rendering.",
      },
    ],
  },
  {
    id: "props-link",
    title: "Link",
    description:
      "Default host: a. Native attributes, className, style and refs are forwarded.",
    rows: [
      {
        name: "href",
        typeLabel: "string",
        defaultLabel: "\u2014",
        description:
          "Native destination; may be supplied by the composed router anchor.",
      },
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description:
          "Merge onto one host preserving this part\u2019s semantics and ref.",
      },
      {
        name: "render",
        typeLabel: "RenderProp",
        defaultLabel: "\u2014",
        description: "Atom-owned custom final-host rendering.",
      },
    ],
  },
  {
    id: "props-page",
    title: "Page",
    description:
      "Default host: span with aria-current=page; may compose a real anchor. Native attributes, className, style and refs are forwarded.",
    rows: [
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description:
          "Merge onto one host preserving this part\u2019s semantics and ref.",
      },
      {
        name: "render",
        typeLabel: "RenderProp",
        defaultLabel: "\u2014",
        description: "Atom-owned custom final-host rendering.",
      },
    ],
  },
  {
    id: "props-separator",
    title: "Separator",
    description:
      "Default host: decorative li. Native attributes, className, style and refs are forwarded.",
    rows: [
      {
        name: "children",
        typeLabel: "ReactNode",
        defaultLabel: "Directional chevron",
        description: "Custom decorative separator; null suppresses artwork.",
      },
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description:
          "Merge onto one host preserving this part\u2019s semantics and ref.",
      },
      {
        name: "render",
        typeLabel: "RenderProp",
        defaultLabel: "\u2014",
        description: "Atom-owned custom final-host rendering.",
      },
    ],
  },
  {
    id: "props-ellipsis",
    title: "Ellipsis",
    description:
      "Default host: span. Native attributes, className, style and refs are forwarded.",
    rows: [
      {
        name: "children",
        typeLabel: "ReactNode",
        defaultLabel: "Ellipsis icon",
        description:
          "Static by default; place inside Item. Name interactive controls.",
      },
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description:
          "Merge onto one host preserving this part\u2019s semantics and ref.",
      },
      {
        name: "render",
        typeLabel: "RenderProp",
        defaultLabel: "\u2014",
        description: "Atom-owned custom final-host rendering.",
      },
    ],
  },
  {
    id: "props-trigger",
    title: "Trigger",
    description:
      "Default host: button. Native attributes, className, style and refs are forwarded.",
    rows: [
      {
        name: "type",
        typeLabel: '"button" | "submit" | "reset"',
        defaultLabel: '"button"',
        description: "Native button type.",
      },
      {
        name: "disabled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Native disabled action; no href or loading API.",
      },
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description:
          "Merge onto one host preserving this part\u2019s semantics and ref.",
      },
      {
        name: "render",
        typeLabel: "RenderProp",
        defaultLabel: "\u2014",
        description: "Atom-owned custom final-host rendering.",
      },
    ],
  },
];
export const sections = ownerSections(examples, parts, true);
