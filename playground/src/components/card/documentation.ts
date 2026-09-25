import {
  ownerSections,
  type OwnerPart,
} from "../../shared/OwnerDocumentation.js";
import { CardBasic } from "./examples/CardBasic.js";
import basic from "./examples/CardBasic.tsx?raw";
import { SelectableInventory } from "./SelectableInventory.js";
import selection from "./SelectableInventory.tsx?raw";
import { CardVariants } from "./examples/CardVariants.js";
import CardVariantsSource from "./examples/CardVariants.tsx?raw";
import { CardForm } from "./examples/CardForm.js";
import CardFormSource from "./examples/CardForm.tsx?raw";
import { CardSizes } from "./examples/CardSizes.js";
import CardSizesSource from "./examples/CardSizes.tsx?raw";
import { CardImage } from "./examples/CardImage.js";
import CardImageSource from "./examples/CardImage.tsx?raw";
import { CardMedia } from "./examples/CardMedia.js";
import CardMediaSource from "./examples/CardMedia.tsx?raw";
import { CardAvatar } from "./examples/CardAvatar.js";
import CardAvatarSource from "./examples/CardAvatar.tsx?raw";
import { CardAction } from "./examples/CardAction.js";
import CardActionSource from "./examples/CardAction.tsx?raw";
import { CardEqualHeight } from "./examples/CardEqualHeight.js";
import CardEqualHeightSource from "./examples/CardEqualHeight.tsx?raw";
import { CardProfile } from "./examples/CardProfile.js";
import CardProfileSource from "./examples/CardProfile.tsx?raw";
import { CardRadius } from "./examples/CardRadius.js";
import CardRadiusSource from "./examples/CardRadius.tsx?raw";
import { CardBorders } from "./examples/CardBorders.js";
import CardBordersSource from "./examples/CardBorders.tsx?raw";
import { CardResponsive } from "./examples/CardResponsive.js";
import CardResponsiveSource from "./examples/CardResponsive.tsx?raw";
import { CardParts } from "./examples/CardParts.js";
import CardPartsSource from "./examples/CardParts.tsx?raw";
import { CardCustomization } from "./examples/CardCustomization.js";
import CardCustomizationSource from "./examples/CardCustomization.tsx?raw";
export const Basic = CardBasic;
export const basicSource = basic;
export const cardExamples = [
  {
    id: "variants",
    title: "Variants",
    description: "Choose the prominence of a subject.",
    Demo: CardVariants,
    source: CardVariantsSource,
  },
  {
    id: "form",
    title: "Within a form",
    description: "Compose a real form with visible field labels.",
    Demo: CardForm,
    source: CardFormSource,
  },
  {
    id: "sizes",
    title: "Sizes",
    description: "Coordinate section inset and title scale.",
    Demo: CardSizes,
    source: CardSizesSource,
  },
  {
    id: "image",
    title: "With image",
    description: "Media owns its crop; Card clips outside corners.",
    Demo: CardImage,
    source: CardImageSource,
  },
  {
    id: "media",
    title: "Horizontal",
    description: "Grid owns the responsive media and content arrangement.",
    Demo: CardMedia,
    source: CardMediaSource,
  },
  {
    id: "avatar",
    title: "With avatar",
    description: "Keep identity and related actions together.",
    Demo: CardAvatar,
    source: CardAvatarSource,
  },
  {
    id: "action",
    title: "Header action",
    description: "Reserve the trailing column for a compact control.",
    Demo: CardAction,
    source: CardActionSource,
  },
  {
    id: "equal-height",
    title: "Equal-height cards",
    description: "Growing Content aligns footers without a fixed height.",
    Demo: CardEqualHeight,
    source: CardEqualHeightSource,
  },
  {
    id: "profile",
    title: "Overflow",
    description: "Visible overflow lets authored content cross the boundary.",
    Demo: CardProfile,
    source: CardProfileSource,
  },
  {
    id: "radius",
    title: "Radius",
    description: "Use shared core or semantic corner tokens.",
    Demo: CardRadius,
    source: CardRadiusSource,
  },
  {
    id: "borders",
    title: "Border override",
    description: "An explicit border stays visible on every variant.",
    Demo: CardBorders,
    source: CardBordersSource,
  },
  {
    id: "responsive",
    title: "Responsive recipes",
    description: "Change density, prominence and region spacing.",
    Demo: CardResponsive,
    source: CardResponsiveSource,
  },
  {
    id: "parts",
    title: "Part composition",
    description: "Merge onto one semantic or Brick layout host.",
    Demo: CardParts,
    source: CardPartsSource,
  },
  {
    id: "customization",
    title: "Local recipe",
    description: "Use documented paired paint and typography hooks.",
    Demo: CardCustomization,
    source: CardCustomizationSource,
  },
  {
    id: "selection",
    title: "Record selection",
    description: "Selection and opening a record remain separate actions.",
    Demo: SelectableInventory,
    source: selection,
  },
];
export const cardParts = [
  {
    id: "card-root-props",
    title: "Root",
    description: "A bounded subject, not an interactive widget.",
    rows: [
      {
        name: "variant",
        typeLabel: "ResponsiveValue<CardVariant>",
        defaultLabel: "outline",
        description: "Surface prominence.",
      },
      {
        name: "size",
        typeLabel: "ResponsiveValue<CardSize>",
        defaultLabel: "md",
        description: "16/24/28px reference insets and coordinated titles.",
      },
      {
        name: "bordered",
        typeLabel: "boolean",
        description: "Override recipe border.",
      },
      {
        name: "overflow",
        typeLabel: "'clip' | 'visible'",
        defaultLabel: "clip",
        description:
          "Use visible for protruding compositions; clip media separately.",
      },
      {
        name: "radius",
        typeLabel: "Radius",
        description: "Core or semantic corner token.",
      },
      {
        name: "selected",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Visual selection alongside a named Checkbox.",
      },
      {
        name: "as",
        typeLabel: "'div' | 'article' | 'section' | 'li'",
        defaultLabel: "div",
        description: "Native host.",
      },
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Merge onto one host, mutually exclusive with as.",
      },
    ],
  },
  {
    id: "card-header-props",
    title: "Header",
    description: "Optional styled region with native attributes and refs.",
    rows: [
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Merge onto one semantic host forwarding props and refs.",
      },
      {
        name: "gap",
        typeLabel: "ResponsiveValue<SpacingValue>",
        description: "Space between region children, not inset.",
      },
      {
        name: "children",
        typeLabel: "ReactNode",
        description: "Authored content.",
      },
    ],
  },
  {
    id: "card-content-props",
    title: "Content",
    description: "Complete body inset and flex growth.",
    rows: [
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Merge onto one semantic host forwarding props and refs.",
      },
      {
        name: "gap",
        typeLabel: "ResponsiveValue<SpacingValue>",
        description: "Space between region children, not inset.",
      },
      {
        name: "children",
        typeLabel: "ReactNode",
        description: "Authored content.",
      },
    ],
  },
  {
    id: "card-footer-props",
    title: "Footer",
    description: "Optional styled region with native attributes and refs.",
    rows: [
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Merge onto one semantic host forwarding props and refs.",
      },
      {
        name: "gap",
        typeLabel: "ResponsiveValue<SpacingValue>",
        description: "Space between region children, not inset.",
      },
      {
        name: "justify",
        typeLabel:
          "ResponsiveValue<'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'>",
        defaultLabel: "start",
        description: "Logical distribution of footer children.",
      },
      {
        name: "children",
        typeLabel: "ReactNode",
        description: "Authored content.",
      },
    ],
  },
  {
    id: "card-title-props",
    title: "Title",
    description: "Optional styled region with native attributes and refs.",
    rows: [
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Merge onto one semantic host forwarding props and refs.",
      },
      {
        name: "as",
        typeLabel: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'",
        defaultLabel: "h3",
        description: "Semantic heading level.",
      },
    ],
  },
  {
    id: "card-description-props",
    title: "Description",
    description: "Optional styled region with native attributes and refs.",
    rows: [
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Merge onto one semantic host forwarding props and refs.",
      },
      {
        name: "children",
        typeLabel: "ReactNode",
        description: "Authored content.",
      },
    ],
  },
  {
    id: "card-action-props",
    title: "Action",
    description: "Trailing header layout region, not a control.",
    rows: [
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Merge onto one semantic host forwarding props and refs.",
      },
      {
        name: "gap",
        typeLabel: "ResponsiveValue<SpacingValue>",
        description: "Space between region children, not inset.",
      },
      {
        name: "children",
        typeLabel: "ReactNode",
        description: "Authored content.",
      },
    ],
  },
] satisfies readonly OwnerPart[];
export const cardSections = ownerSections(cardExamples, cardParts);
