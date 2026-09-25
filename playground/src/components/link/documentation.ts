import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { LinkBasic } from "./examples/LinkBasic.js";
import BasicSource from "./examples/LinkBasic.tsx?raw";
import { LinkVariants } from "./examples/LinkVariants.js";
import VariantsSource from "./examples/LinkVariants.tsx?raw";
import { LinkWithinText } from "./examples/LinkWithinText.js";
import WithinTextSource from "./examples/LinkWithinText.tsx?raw";
import { LinkExternal } from "./examples/LinkExternal.js";
import ExternalSource from "./examples/LinkExternal.tsx?raw";
import { LinkSizes } from "./examples/LinkSizes.js";
import SizesSource from "./examples/LinkSizes.tsx?raw";
import { LinkResponsive } from "./examples/LinkResponsive.js";
import ResponsiveSource from "./examples/LinkResponsive.tsx?raw";
import { LinkIcons } from "./examples/LinkIcons.js";
import IconsSource from "./examples/LinkIcons.tsx?raw";
import { LinkCurrent } from "./examples/LinkCurrent.js";
import CurrentSource from "./examples/LinkCurrent.tsx?raw";
import { LinkComposition } from "./examples/LinkComposition.js";
import CompositionSource from "./examples/LinkComposition.tsx?raw";
import { LinkTones } from "./examples/LinkTones.js";
import TonesSource from "./examples/LinkTones.tsx?raw";

export const Basic = LinkBasic;
export const basicSource = BasicSource;
export const examples: OwnerExample[] = [
  { id: "variants", title: "Variants", description: "Compare decoration and interaction treatments without changing semantics.", Demo: LinkVariants, source: VariantsSource },
  { id: "withintext", title: "Within text", description: "Keep a sentence in one Paragraph and let the inline Link inherit typography.", Demo: LinkWithinText, source: WithinTextSource },
  { id: "external", title: "External", description: "Provide a destination and an explicit decorative external icon; opening a new tab is an authored choice.", Demo: LinkExternal, source: ExternalSource },
  { id: "sizes", title: "Sizes", description: "Compare the closed typography sizes.", Demo: LinkSizes, source: SizesSource },
  { id: "responsive", title: "Responsive", description: "Sparse sizes use inherited typography below sm; xl explicitly returns to the parent recipe.", Demo: LinkResponsive, source: ResponsiveSource },
  { id: "icons", title: "Icons", description: "Use logical start and end icon slots with the link label.", Demo: LinkIcons, source: IconsSource },
  { id: "current", title: "Current", description: "Use native aria-current to identify the current destination.", Demo: LinkCurrent, source: CurrentSource },
  { id: "composition", title: "Composition", description: "Compose one real anchor. Router components must forward native props and their anchor ref.", Demo: LinkComposition, source: CompositionSource },
  { id: "tones", title: "Tones", description: "Compare semantic tones without changing the underline affordance.", Demo: LinkTones, source: TonesSource },
];
export const parts: OwnerPart[] = [
  {
    "id": "props-link",
    "title": "Link",
    "description": "Native anchor attributes are forwarded; these are the component-owned options.",
    "rows": [
      {
        "name": "href",
        "typeLabel": "string",
        "defaultLabel": "—",
        "description": "Native destination; optional only when a composed anchor owns it."
      },
      {
        "name": "variant",
        "typeLabel": "\"underline\" | \"subtle\" | \"plain\" | \"theme\"",
        "defaultLabel": "\"underline\"",
        "description": "Persistent, interaction-only, or absent decoration. theme is deprecated."
      },
      {
        "name": "tone",
        "typeLabel": "\"accent\" | \"neutral\" | \"inherit\"",
        "defaultLabel": "\"accent\"",
        "description": "Semantic link foreground."
      },
      {
        "name": "size",
        "typeLabel": "ResponsiveValue<LinkSize>",
        "defaultLabel": "\"inherit\"",
        "description": "inherit, sm, md or lg; sparse breakpoints inherit the normal default."
      },
      {
        "name": "startIcon",
        "typeLabel": "ReactNode",
        "defaultLabel": "—",
        "description": "Decorative icon slots; excluded with asChild."
      },
      {
        "name": "endIcon",
        "typeLabel": "ReactNode",
        "defaultLabel": "—",
        "description": "Decorative end icon; excluded with asChild."
      },
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Compose one anchor element without extra content wrappers; mutually exclusive with render."
      },
      {
        "name": "render",
        "typeLabel": "LinkRenderProp",
        "defaultLabel": "—",
        "description": "Atom-owned custom renderer retaining the normal content anatomy."
      }
    ]
  }
];
export const sections = ownerSections(examples, parts);
