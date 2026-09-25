import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { LinkBoxBasic } from "./examples/LinkBoxBasic.js";
import BasicSource from "./examples/LinkBoxBasic.tsx?raw";
import { LinkBoxArticle } from "./examples/LinkBoxArticle.js";
import ArticleSource from "./examples/LinkBoxArticle.tsx?raw";
import { LinkBoxActions } from "./examples/LinkBoxActions.js";
import ActionsSource from "./examples/LinkBoxActions.tsx?raw";
import { LinkBoxVariants } from "./examples/LinkBoxVariants.js";
import VariantsSource from "./examples/LinkBoxVariants.tsx?raw";
import { LinkBoxRadius } from "./examples/LinkBoxRadius.js";
import RadiusSource from "./examples/LinkBoxRadius.tsx?raw";
import { LinkBoxComposition } from "./examples/LinkBoxComposition.js";
import CompositionSource from "./examples/LinkBoxComposition.tsx?raw";

export const Basic = LinkBoxBasic;
export const basicSource = BasicSource;
export const examples: OwnerExample[] = [
  { id: "article", title: "Article", description: "Use the article host for standalone editorial content.", Demo: LinkBoxArticle, source: ArticleSource },
  { id: "actions", title: "Actions", description: "Secondary buttons and links remain outside the primary anchor and above its stretched hit target.", Demo: LinkBoxActions, source: ActionsSource },
  { id: "variants", title: "Variants", description: "Compare decoration and interaction treatments without changing semantics.", Demo: LinkBoxVariants, source: VariantsSource },
  { id: "radius", title: "Radius", description: "Choose a shared radius for the focus region and match the independently painted Surface.", Demo: LinkBoxRadius, source: RadiusSource },
  { id: "composition", title: "Composition", description: "Compose one real anchor. Router components must forward native props and their anchor ref.", Demo: LinkBoxComposition, source: CompositionSource },
];
export const parts: OwnerPart[] = [
  {
    "id": "props-root",
    "title": "Root",
    "description": "Owns the stretched target and focus boundary, not content padding.",
    "rows": [
      {
        "name": "as",
        "typeLabel": "\"div\" | \"article\" | \"section\" | \"li\"",
        "defaultLabel": "\"div\"",
        "description": "Noninteractive semantic host."
      },
      {
        "name": "variant",
        "typeLabel": "\"outline\" | \"plain\"",
        "defaultLabel": "\"outline\"",
        "description": "Hover/press boundary treatment; both retain focus indication."
      },
      {
        "name": "radius",
        "typeLabel": "\"none\" | \"2xs\" | \"xs\" | \"sm\" | \"md\" | \"lg\" | \"xl\" | \"2xl\" | \"3xl\" | \"4xl\" | \"subtle\" | \"control\" | \"surface\" | \"overlay\" | \"full\"",
        "defaultLabel": "\"surface\"",
        "description": "Shared radius token for the hit-target and focus boundary."
      }
    ]
  },
  {
    "id": "props-link",
    "title": "Link",
    "description": "Exactly one primary native destination. Supports Link props with these default differences.",
    "rows": [
      {
        "name": "tone",
        "typeLabel": "LinkTone",
        "defaultLabel": "\"inherit\"",
        "description": "Inherits its title foreground."
      },
      {
        "name": "variant",
        "typeLabel": "LinkVariant",
        "defaultLabel": "\"plain\"",
        "description": "No underline by default; inherits title weight."
      },
      {
        "name": "href",
        "typeLabel": "string",
        "defaultLabel": "—",
        "description": "Native destination; optional only when a composed anchor owns it."
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
  },
  {
    "id": "props-action",
    "title": "Action",
    "description": "Neutral div wrapper elevating independent secondary controls above the destination.",
    "rows": [
      {
        "name": "children",
        "typeLabel": "ReactNode",
        "defaultLabel": "—",
        "description": "Independent buttons, links or other controls; never place Action inside Link."
      }
    ]
  }
];
export const sections = ownerSections(examples, parts);
