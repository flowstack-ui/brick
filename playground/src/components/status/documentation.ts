import {
  ownerSections,
  type OwnerExample,
  type OwnerPart,
} from "../../shared/OwnerDocumentation.js";
import { StatusLabels } from "./examples/StatusLabels.js";
import StatusLabelsSource from "./examples/StatusLabels.tsx?raw";
import { StatusSizes } from "./examples/StatusSizes.js";
import StatusSizesSource from "./examples/StatusSizes.tsx?raw";
import { StatusResponsive } from "./examples/StatusResponsive.js";
import StatusResponsiveSource from "./examples/StatusResponsive.tsx?raw";
import { StatusComposition } from "./examples/StatusComposition.js";
import StatusCompositionSource from "./examples/StatusComposition.tsx?raw";
import { StatusDecorative } from "./examples/StatusDecorative.js";
import StatusDecorativeSource from "./examples/StatusDecorative.tsx?raw";
import { StatusCustomization } from "./examples/StatusCustomization.js";
import StatusCustomizationSource from "./examples/StatusCustomization.tsx?raw";
import { StatusLive } from "./examples/StatusLive.js";
import StatusLiveSource from "./examples/StatusLive.tsx?raw";
export const examples: OwnerExample[] = [
  {
    id: "labels",
    title: "Label",
    description:
      "Readable text carries the state; tone colors only the indicator.",
    Demo: StatusLabels,
    source: StatusLabelsSource,
  },
  {
    id: "sizes",
    title: "Sizes",
    description: "Compare the three text sizes with proportionally sized dots.",
    Demo: StatusSizes,
    source: StatusSizesSource,
  },
  {
    id: "responsive",
    title: "Responsive",
    description:
      "Sparse sizes inherit the default until the next declared breakpoint.",
    Demo: StatusResponsive,
    source: StatusResponsiveSource,
  },
  {
    id: "composition",
    title: "Composition",
    description:
      "Project onto one host or use Label to wrap longer state text.",
    Demo: StatusComposition,
    source: StatusCompositionSource,
  },
  {
    id: "decorative",
    title: "Decorative indicator",
    description: "Hide the marker when adjacent text already names the state.",
    Demo: StatusDecorative,
    source: StatusDecorativeSource,
  },
  {
    id: "customization",
    title: "Customization",
    description:
      "Use documented local hooks for intentional indicator geometry.",
    Demo: StatusCustomization,
    source: StatusCustomizationSource,
  },
  {
    id: "live",
    title: "Live updates",
    description:
      "The application explicitly opts this changing message into announcements.",
    Demo: StatusLive,
    source: StatusLiveSource,
  },
];
const host = {
  name: "asChild",
  typeLabel: "boolean",
  defaultLabel: "false",
  description: "Merge onto one element that forwards props and refs.",
};
export const parts: OwnerPart[] = [
  {
    id: "props-root",
    title: "Root",
    description: "Owns inline layout, typography, tone and native attributes.",
    rows: [
      {
        name: "size",
        typeLabel: 'ResponsiveValue<"sm" | "md" | "lg">',
        defaultLabel: '"md"',
        description: "Text scale; the dot scales proportionally.",
      },
      {
        name: "tone",
        typeLabel:
          '"neutral" | "accent" | "info" | "success" | "warning" | "danger"',
        defaultLabel: '"neutral"',
        description: "Semantic indicator color; label stays readable.",
      },
      host,
    ],
  },
  {
    id: "props-indicator",
    title: "Indicator",
    description: "Decorative dot, always hidden from assistive technology.",
    rows: [host],
  },
  {
    id: "props-label",
    title: "Label",
    description:
      "Optional text wrapper for composition and constrained wrapping.",
    rows: [host],
  },
];
export const sections = ownerSections(examples, parts);
