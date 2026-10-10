import type { AlertRootProps, AlertContentProps, AlertIndicatorProps, AlertTitleProps, AlertDescriptionProps } from "@flowstack-ui/brick";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";
import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { AlertDescription } from "./examples/AlertDescription.js";
import DescriptionSource from "./examples/AlertDescription.tsx?raw";
import { AlertStatuses } from "./examples/AlertStatuses.js";
import StatusesSource from "./examples/AlertStatuses.tsx?raw";
import { AlertVariants } from "./examples/AlertVariants.js";
import VariantsSource from "./examples/AlertVariants.tsx?raw";
import { AlertClose } from "./examples/AlertClose.js";
import CloseSource from "./examples/AlertClose.tsx?raw";
import { AlertSpinner } from "./examples/AlertSpinner.js";
import SpinnerSource from "./examples/AlertSpinner.tsx?raw";
import { AlertCustomIcon } from "./examples/AlertCustomIcon.js";
import CustomIconSource from "./examples/AlertCustomIcon.tsx?raw";
import { AlertTone } from "./examples/AlertTone.js";
import ToneSource from "./examples/AlertTone.tsx?raw";
import { AlertCustomization } from "./examples/AlertCustomization.js";
import CustomizationSource from "./examples/AlertCustomization.tsx?raw";
import { AlertSizes } from "./examples/AlertSizes.js";
import SizesSource from "./examples/AlertSizes.tsx?raw";
import { AlertInline } from "./examples/AlertInline.js";
import InlineSource from "./examples/AlertInline.tsx?raw";
import { AlertResponsive } from "./examples/AlertResponsive.js";
import ResponsiveSource from "./examples/AlertResponsive.tsx?raw";
import { AlertRadius } from "./examples/AlertRadius.js";
import RadiusSource from "./examples/AlertRadius.tsx?raw";
export const examples: OwnerExample[] = [
{id: "description", title: "Description", description: "Add supporting detail to a persistent notice.", Demo: AlertDescription, source: DescriptionSource},
{id: "statuses", title: "Statuses", description: "Status supplies the default glyph and semantic palette.", Demo: AlertStatuses, source: StatusesSource},
{id: "variants", title: "Variants", description: "Compare four visual treatments.", Demo: AlertVariants, source: VariantsSource},
{id: "with-close-button", title: "With close button", description: "Compose dismissal and focus recovery with application state.", Demo: AlertClose, source: CloseSource},
{id: "with-spinner", title: "With spinner", description: "Use inherited-size loading artwork beside visible text.", Demo: AlertSpinner, source: SpinnerSource},
{id: "custom-icon", title: "Custom icon", description: "Replace the default glyph with a decorative Icon.", Demo: AlertCustomIcon, source: CustomIconSource},
{id: "tone", title: "Palette override", description: "Change tone without changing the status glyph.", Demo: AlertTone, source: ToneSource},
{id: "customization", title: "Customization", description: "Add a logical accent stripe and neutral foreground on soft content.", Demo: AlertCustomization, source: CustomizationSource},
{id: "sizes", title: "Sizes", description: "Coordinate padding, typography and indicator geometry.", Demo: AlertSizes, source: SizesSource},
{id: "inline", title: "Inline content", description: "Place title and description in one wrapping row.", Demo: AlertInline, source: InlineSource},
{id: "responsive", title: "Responsive recipes", description: "Change visual recipes without duplicating content.", Demo: AlertResponsive, source: ResponsiveSource},
{id: "radius", title: "Radius", description: "Choose a core radius or a theme-aware role.", Demo: AlertRadius, source: RadiusSource},
];
export const parts: OwnerPart[] = [
{ id: "props-root", title: "Root", description: "The outer div owns status and visual recipes.", rows: [
  {
    "name": "status",
    "typeLabel": "\"info\" | \"warning\" | \"success\" | \"error\" | \"neutral\"",
    "defaultLabel": "\"info\"",
    "description": "Chooses the default glyph and palette, not announcement urgency."
  },
  {
    "name": "tone",
    "typeLabel": "\"neutral\" | \"accent\" | \"info\" | \"success\" | \"warning\" | \"danger\"",
    "defaultLabel": "status",
    "description": "Overrides paint independently from status."
  },
  {
    "name": "variant",
    "typeLabel": "ResponsiveValue<\"soft\" | \"surface\" | \"outline\" | \"solid\">",
    "defaultLabel": "\"soft\"",
    "description": "Controls fill and inset border treatment."
  },
  {
    "name": "size",
    "typeLabel": "ResponsiveValue<\"sm\" | \"md\" | \"lg\">",
    "defaultLabel": "\"md\"",
    "description": "Coordinates text, padding and indicator size."
  },
  {
    "name": "inline",
    "typeLabel": "ResponsiveValue<boolean>",
    "defaultLabel": "false",
    "description": "Arranges Content in a wrapping inline row."
  },
  {
    "name": "align",
    "typeLabel": "ResponsiveValue<\"start\" | \"center\">",
    "defaultLabel": "\"start\"",
    "description": "Aligns indicator, content and peer actions vertically."
  },
  {
    "name": "radius",
    "typeLabel": "\"none\" | \"2xs\" | \"xs\" | \"sm\" | \"md\" | \"lg\" | \"xl\" | \"2xl\" | \"3xl\" | \"4xl\" | \"subtle\" | \"control\" | \"surface\" | \"overlay\" | \"full\"",
    "defaultLabel": "\"surface\"",
    "description": "Shared Radius values; semantic roles follow the theme."
  },
  {
    "name": "accentStart",
    "typeLabel": "boolean",
    "defaultLabel": "false",
    "description": "Paints a logical inset start stripe without changing dimensions."
  },
  {
    "name": "asChild",
    "typeLabel": "boolean",
    "defaultLabel": "false",
    "description": "Compose onto one non-Fragment element, preserving its ref and native attributes."
  }
] satisfies readonly DocsPropDefinition<AlertRootProps>[] },
{ id: "props-content", title: "Content", description: "A flexible div groups title and description.", rows: [
  {
    "name": "tone",
    "typeLabel": "\"inherit\" | \"primary\"",
    "defaultLabel": "\"inherit\"",
    "description": "Use primary on a suitable soft background; retain inherited contrast on solid alerts."
  },
  {
    "name": "asChild",
    "typeLabel": "boolean",
    "defaultLabel": "false",
    "description": "Compose onto one non-Fragment element, preserving its ref and native attributes."
  }
] satisfies readonly DocsPropDefinition<AlertContentProps>[] },
{ id: "props-indicator", title: "Indicator", description: "A fixed span supplies decorative status artwork or your children.", rows: [
  {
    "name": "children",
    "typeLabel": "ReactNode",
    "defaultLabel": "status glyph",
    "description": "Custom artwork replaces the glyph. Icon/Spinner size=inherit follows the slot."
  },
  {
    "name": "asChild",
    "typeLabel": "boolean",
    "defaultLabel": "false",
    "description": "Compose onto one non-Fragment element, preserving its ref and native attributes."
  }
] satisfies readonly DocsPropDefinition<AlertIndicatorProps>[] },
{ id: "props-title", title: "Title", description: "A medium-weight div; compose a heading when document structure needs one.", rows: [
  {
    "name": "asChild",
    "typeLabel": "boolean",
    "defaultLabel": "false",
    "description": "Compose onto one non-Fragment element, preserving its ref and native attributes."
  }
] satisfies readonly DocsPropDefinition<AlertTitleProps>[] },
{ id: "props-description", title: "Description", description: "A div for supporting text, links or richer content.", rows: [
  {
    "name": "asChild",
    "typeLabel": "boolean",
    "defaultLabel": "false",
    "description": "Compose onto one non-Fragment element, preserving its ref and native attributes."
  }
] satisfies readonly DocsPropDefinition<AlertDescriptionProps>[] }
];
export const sections = ownerSections(examples, parts);
