import type {
  OwnerExample,
  OwnerPart,
} from "../../shared/OwnerDocumentation.js";
import type { DocsSectionMetadata } from "../../shared/DocsTableOfContents.js";
import { DataListBasic } from "./examples/DataListBasic.js";
import basicSource from "./examples/DataListBasic.tsx?raw";
export { basicSource };
export const Basic = DataListBasic;
import { DataListSizes } from "./examples/DataListSizes.js";
import SizesSource from "./examples/DataListSizes.tsx?raw";
import { DataListVariants } from "./examples/DataListVariants.js";
import VariantsSource from "./examples/DataListVariants.tsx?raw";
import { DataListOrientation } from "./examples/DataListOrientation.js";
import OrientationSource from "./examples/DataListOrientation.tsx?raw";
import { DataListResponsive } from "./examples/DataListResponsive.js";
import ResponsiveSource from "./examples/DataListResponsive.tsx?raw";
import { DataListSeparator } from "./examples/DataListSeparator.js";
import SeparatorSource from "./examples/DataListSeparator.tsx?raw";
import { DataListInfo } from "./examples/DataListInfo.js";
import InfoSource from "./examples/DataListInfo.tsx?raw";
import { DataListRichValues } from "./examples/DataListRichValues.js";
import RichValuesSource from "./examples/DataListRichValues.tsx?raw";
import { DataListLabelMeasures } from "./examples/DataListLabelMeasures.js";
import LabelMeasuresSource from "./examples/DataListLabelMeasures.tsx?raw";
import { DataListGrouped } from "./examples/DataListGrouped.js";
import GroupedSource from "./examples/DataListGrouped.tsx?raw";
import { DataListComposition } from "./examples/DataListComposition.js";
import CompositionSource from "./examples/DataListComposition.tsx?raw";
import { DataListLongContent } from "./examples/DataListLongContent.js";
import LongContentSource from "./examples/DataListLongContent.tsx?raw";
export const examples: OwnerExample[] = [
  {
    id: "sizes",
    title: "Sizes",
    description:
      "Choose sm, md or lg. Only the size changes; the facts stay the same.",
    Demo: DataListSizes,
    source: SizesSource,
  },
  {
    id: "variants",
    title: "Variants",
    description: "Subtle emphasizes values; bold emphasizes labels.",
    Demo: DataListVariants,
    source: VariantsSource,
  },
  {
    id: "orientation",
    title: "Orientation",
    description:
      "Stack labels above values or align them in two logical columns.",
    Demo: DataListOrientation,
    source: OrientationSource,
  },
  {
    id: "responsive",
    title: "Responsive recipes",
    description:
      "Resize the viewport to compare both orientation directions and responsive text emphasis.",
    Demo: DataListResponsive,
    source: ResponsiveSource,
  },
  {
    id: "separator",
    title: "Separator",
    description: "Use divide for borders and spacing between visible items.",
    Demo: DataListSeparator,
    source: SeparatorSource,
  },
  {
    id: "info",
    title: "Info tip",
    description:
      "Compose ToggleTip inside Label for additional context by click, keyboard or touch.",
    Demo: DataListInfo,
    source: InfoSource,
  },
  {
    id: "rich-values",
    title: "Rich values",
    description:
      "Compose badges, links and formatters without replacing description-list semantics.",
    Demo: DataListRichValues,
    source: RichValuesSource,
  },
  {
    id: "label-measures",
    title: "Label measures",
    description:
      "Choose a shared label measure. All measures stay bounded to preserve space for values.",
    Demo: DataListLabelMeasures,
    source: LabelMeasuresSource,
  },
  {
    id: "grouped",
    title: "Grouped terms and nested facts",
    description:
      "Multiple terms precede their descriptions in the source. Nested lists own their own recipes.",
    Demo: DataListGrouped,
    source: GroupedSource,
  },
  {
    id: "composition",
    title: "Shared defaults and closed composition",
    description:
      "PropsProvider supplies recipe defaults; Root can override them. A local Fact wrapper keeps data mapping concise.",
    Demo: DataListComposition,
    source: CompositionSource,
  },
  {
    id: "long-content",
    title: "Long content and RTL",
    description:
      "Long identifiers wrap within their column. Logical label placement mirrors in RTL.",
    Demo: DataListLongContent,
    source: LongContentSource,
  },
];
const native = [
  {
    name: "slot",
    typeLabel: "string",
    description: "Overrides data-slot, not the native HTML slot attribute.",
  },
  {
    name: "className",
    typeLabel: "string",
    description: "Public class composition.",
  },
  {
    name: "style",
    typeLabel: "CSSProperties",
    description: "Documented component-token overrides or local composition.",
  },
];
export const parts: OwnerPart[] = [
  {
    id: "props-root",
    title: "Root",
    description:
      "Native dl. Responsive recipes preserve a single semantic source tree.",
    rows: [
      {
        name: "size",
        typeLabel: "ResponsiveValue<'sm' | 'md' | 'lg'>",
        defaultLabel: "md",
        description:
          "12/14/16px default-theme text and 12/16/20px item spacing.",
      },
      {
        name: "variant",
        typeLabel: "ResponsiveValue<'subtle' | 'bold'>",
        defaultLabel: "subtle",
        description: "Choose label/value emphasis.",
      },
      {
        name: "orientation",
        typeLabel: "ResponsiveValue<'vertical' | 'horizontal'>",
        defaultLabel: "vertical",
        description: "Stacked or two-column presentation.",
      },
      {
        name: "labelWidth",
        typeLabel: "ResponsiveValue<'auto' | 'sm' | 'md' | 'lg'>",
        defaultLabel: "auto",
        description:
          "120/96/144/192px preferred measure, capped at 40% of the item.",
      },
      {
        name: "divide",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Separate visible items with borders.",
      },
      ...native,
    ],
  },
  {
    id: "props-item",
    title: "Item",
    description:
      "Native div grouping one or more labels before one or more values.",
    rows: native,
  },
  {
    id: "props-label",
    title: "Label",
    description:
      "Native dt with aligned text and optional info artwork/control.",
    rows: native,
  },
  {
    id: "props-value",
    title: "Value",
    description:
      "Native dd retaining rich content and nested control semantics.",
    rows: native,
  },
  {
    id: "props-provider",
    title: "PropsProvider",
    description: "Styling defaults only; adds no DOM element.",
    rows: [
      {
        name: "value",
        typeLabel: "DataListRecipeProps",
        description:
          "size, variant, orientation, labelWidth and divide defaults; Root overrides them.",
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
