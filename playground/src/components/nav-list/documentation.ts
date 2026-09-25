import {
  ownerSections,
  type OwnerExample,
} from "../../shared/OwnerDocumentation.js";
import { parts } from "./parts.js";
export { parts };
import { NavListBasic } from "./examples/NavListBasic.js";
import basicSource from "./examples/NavListBasic.tsx?raw";
import { NavListVariants } from "./examples/NavListVariants.js";
import variantsSource from "./examples/NavListVariants.tsx?raw";
import { NavListDensity } from "./examples/NavListDensity.js";
import densitySource from "./examples/NavListDensity.tsx?raw";
import { NavListContent } from "./examples/NavListContent.js";
import contentSource from "./examples/NavListContent.tsx?raw";
import { NavListGroups } from "./examples/NavListGroups.js";
import groupsSource from "./examples/NavListGroups.tsx?raw";
import { NavListDisclosure } from "./examples/NavListDisclosure.js";
import disclosureSource from "./examples/NavListDisclosure.tsx?raw";
import { NavListIndicators } from "./examples/NavListIndicators.js";
import indicatorsSource from "./examples/NavListIndicators.tsx?raw";
import { NavListComposition } from "./examples/NavListComposition.js";
import compositionSource from "./examples/NavListComposition.tsx?raw";
import { NavListRadius } from "./examples/NavListRadius.js";
import radiusSource from "./examples/NavListRadius.tsx?raw";
import { NavListHorizontal } from "./examples/NavListHorizontal.js";
import horizontalSource from "./examples/NavListHorizontal.tsx?raw";
export const Basic = NavListBasic;
export { basicSource };
export const examples: OwnerExample[] = [
  {
    id: "variants",
    title: "Variants",
    description:
      "Choose current-destination paint. Plain removes decorative fills without removing current weight or keyboard focus.",
    Demo: NavListVariants,
    source: variantsSource,
  },
  {
    id: "sizes",
    title: "Sizes and density",
    description:
      "Size controls text and icons; compact density reduces spacing without shrinking them.",
    Demo: NavListDensity,
    source: densitySource,
  },
  {
    id: "content",
    title: "Icons and metadata",
    description:
      "Decorative icons and meaningful trailing badges have separate slots. Keep every row one destination.",
    Demo: NavListContent,
    source: contentSource,
  },
  {
    id: "groups",
    title: "Groups and spacing",
    description:
      "Root gap separates groups. Section gap and content indent independently align headings and links.",
    Demo: NavListGroups,
    source: groupsSource,
  },
  {
    id: "disclosure",
    title: "Controlled disclosure",
    description:
      "Control an expandable group while Atom handles visibility and focus. forceMount retains hidden content.",
    Demo: NavListDisclosure,
    source: disclosureSource,
  },
  {
    id: "indicators",
    title: "Custom indicators",
    description:
      "Replace the default chevron with state-aware artwork, or pass null to omit it.",
    Demo: NavListIndicators,
    source: indicatorsSource,
  },
  {
    id: "composition",
    title: "Composed links",
    description:
      "Use asChild with an anchor or router adapter. aria-current controls emphasis; disabled removes the destination.",
    Demo: NavListComposition,
    source: compositionSource,
  },
  {
    id: "radius",
    title: "Radius",
    description:
      "Choose shared core or semantic radius tokens without overriding CSS.",
    Demo: NavListRadius,
    source: radiusSource,
  },
  {
    id: "horizontal",
    title: "Horizontal navigation",
    description:
      "Keep native link behavior in a wrapping horizontal list. This is navigation, not a menu or tab panel.",
    Demo: NavListHorizontal,
    source: horizontalSource,
  },
];
export const sections = ownerSections(examples, parts);
export const usage = `<NavList.Root aria-label="Workspace">
  <NavList.List>
    <NavList.Item>
      <NavList.Link href="/overview" active>Overview</NavList.Link>
    </NavList.Item>
    <NavList.Item>
      <NavList.Link href="/settings">Settings</NavList.Link>
    </NavList.Item>
  </NavList.List>
</NavList.Root>`;
