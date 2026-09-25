import type {
  OwnerExample,
  OwnerPart,
} from "../../shared/OwnerDocumentation.js";
import type { DocsSectionMetadata } from "../../shared/DocsTableOfContents.js";
import { FeedBasic } from "./examples/FeedBasic.js";
import basicSource from "./examples/FeedBasic.tsx?raw";
export { basicSource };
export const Basic = FeedBasic;
import { FeedVariants } from "./examples/FeedVariants.js";
import VariantsSource from "./examples/FeedVariants.tsx?raw";
import { FeedResponsive } from "./examples/FeedResponsive.js";
import ResponsiveSource from "./examples/FeedResponsive.tsx?raw";
import { FeedDividers } from "./examples/FeedDividers.js";
import DividersSource from "./examples/FeedDividers.tsx?raw";
import { FeedRich } from "./examples/FeedRich.js";
import RichSource from "./examples/FeedRich.tsx?raw";
import { FeedKeyboard } from "./examples/FeedKeyboard.js";
import KeyboardSource from "./examples/FeedKeyboard.tsx?raw";
import { FeedUpdates } from "./examples/FeedUpdates.js";
import UpdatesSource from "./examples/FeedUpdates.tsx?raw";
import { FeedPositions } from "./examples/FeedPositions.js";
import PositionsSource from "./examples/FeedPositions.tsx?raw";
import { FeedDefaults } from "./examples/FeedDefaults.js";
import DefaultsSource from "./examples/FeedDefaults.tsx?raw";
import { FeedRtl } from "./examples/FeedRtl.js";
import RtlSource from "./examples/FeedRtl.tsx?raw";
export const examples: OwnerExample[] = [
  {
    id: "variants",
    title: "Variants",
    description:
      "Choose continuous separators, individual outlines, or a plain stream.",
    Demo: FeedVariants,
    source: VariantsSource,
  },
  {
    id: "responsive",
    title: "Density and responsive recipes",
    description:
      "Use compact padding in smaller layouts. Resize to see plain, outline and divided boundaries without changing the article tree.",
    Demo: FeedResponsive,
    source: ResponsiveSource,
  },
  {
    id: "dividers",
    title: "Divider strength",
    description:
      "Subtle is the default. Use default when a utility stream needs clearer separation.",
    Demo: FeedDividers,
    source: DividersSource,
  },
  {
    id: "rich",
    title: "Rich content",
    description:
      "Compose headings, timestamps and independent actions inside each article.",
    Demo: FeedRich,
    source: RichSource,
  },
  {
    id: "keyboard",
    title: "Keyboard navigation",
    description:
      "Focus an article and use Page Up or Page Down. Control/Command + Home or End moves outside the feed. Native editors keep their own shortcuts.",
    Demo: FeedKeyboard,
    source: KeyboardSource,
  },
  {
    id: "updates",
    title: "Loading, empty and retry",
    description:
      "The application owns loading and errors. Keep article keys stable, scope busy to the update, and announce results outside the feed.",
    Demo: FeedUpdates,
    source: UpdatesSource,
  },
  {
    id: "positions",
    title: "Logical positions",
    description:
      "Use full-stream positions for a loaded page. Set the total to unknown only when it is genuinely unknown.",
    Demo: FeedPositions,
    source: PositionsSource,
  },
  {
    id: "defaults",
    title: "Defaults and customization",
    description:
      "Share styling defaults with PropsProvider and inherit public CSS tokens from a surrounding scope. Explicit Root props take precedence.",
    Demo: FeedDefaults,
    source: DefaultsSource,
  },
  {
    id: "rtl",
    title: "Right-to-left",
    description: "Logical spacing follows the feed direction.",
    Demo: FeedRtl,
    source: RtlSource,
  },
];
const native = [
  {
    name: "render / asChild",
    typeLabel: "ReactElement | render function / boolean",
    description: "Compose a compatible semantic host without adding wrappers.",
  },
  {
    name: "className / style",
    typeLabel: "string / CSSProperties",
    description: "Custom classes and documented token overrides.",
  },
  {
    name: "ref",
    typeLabel: "Ref<HTMLElement>",
    description: "References the rendered host.",
  },
  {
    name: "data-slot",
    typeLabel: "string",
    description: "Override the public slot identifier.",
  },
];
export const parts: OwnerPart[] = [
  {
    id: "props-root",
    title: "Root",
    description: "A named feed containing direct Item articles.",
    rows: [
      {
        name: "variant",
        typeLabel: "ResponsiveValue<'plain' | 'divided' | 'outline'>",
        defaultLabel: "divided",
        description: "Article boundary recipe.",
      },
      {
        name: "density",
        typeLabel: "ResponsiveValue<'compact' | 'comfortable'>",
        defaultLabel: "comfortable",
        description: "Article padding and separated-item spacing.",
      },
      {
        name: "dividerStrength",
        typeLabel: "ResponsiveValue<'subtle' | 'default'>",
        defaultLabel: "subtle",
        description: "Continuous separator contrast.",
      },
      {
        name: "radius",
        typeLabel: "Radius",
        description: "Shared radius token for outlined articles.",
      },
      {
        name: "busy",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "True while the application updates feed content.",
      },
      {
        name: "setSize",
        typeLabel: "number | 'unknown'",
        description: "Logical full-stream total, not the rendered window size.",
      },
      {
        name: "aria-label / aria-labelledby",
        typeLabel: "string",
        description: "Give the feed an accessible name.",
      },
      ...native,
    ],
  },
  {
    id: "props-item",
    title: "Item",
    description:
      "A focusable article. Compose its heading and content yourself.",
    rows: [
      {
        name: "position",
        typeLabel: "number",
        description: "One-based logical position; takes precedence over index.",
      },
      {
        name: "index",
        typeLabel: "number",
        description: "Zero-based logical index.",
      },
      {
        name: "setSize",
        typeLabel: "number | 'unknown'",
        description: "Override the inherited logical total.",
      },
      {
        name: "tabIndex",
        typeLabel: "number",
        defaultLabel: "0",
        description:
          "Native focus order; -1 retains programmatic article navigation.",
      },
      {
        name: "aria-labelledby / aria-describedby",
        typeLabel: "string",
        description: "Connect the article to its heading and optional summary.",
      },
      ...native,
    ],
  },
  {
    id: "props-provider",
    title: "PropsProvider",
    description:
      "Styling defaults only; does not create a DOM element or own feed behavior.",
    rows: [
      {
        name: "value",
        typeLabel: "FeedRecipeProps",
        description:
          "variant, density, dividerStrength and radius defaults; explicit Root props override them.",
      },
    ],
  },
];
export const sections: DocsSectionMetadata[] = [
  { id: "usage", title: "Usage", level: 2 },
  { id: "examples", title: "Examples", level: 2 },
  ...examples.map(({ id, title }) => ({ id, title, level: 3 as const })),
  { id: "props", title: "Props", level: 2 },
  ...parts.map(({ id, title }) => ({ id, title, level: 3 as const })),
];
