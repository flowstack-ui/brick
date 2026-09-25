import { PaginationBasic } from "./examples/PaginationBasic.js";
import PaginationBasicSource from "./examples/PaginationBasic.tsx?raw";
import { PaginationSiblings } from "./examples/PaginationSiblings.js";
import PaginationSiblingsSource from "./examples/PaginationSiblings.tsx?raw";
import { PaginationVariants } from "./examples/PaginationVariants.js";
import PaginationVariantsSource from "./examples/PaginationVariants.tsx?raw";
import { PaginationBoundaries } from "./examples/PaginationBoundaries.js";
import PaginationBoundariesSource from "./examples/PaginationBoundaries.tsx?raw";
import { PaginationSizes } from "./examples/PaginationSizes.js";
import PaginationSizesSource from "./examples/PaginationSizes.tsx?raw";
import { PaginationCompact } from "./examples/PaginationCompact.js";
import PaginationCompactSource from "./examples/PaginationCompact.tsx?raw";
import { PaginationCountText } from "./examples/PaginationCountText.js";
import PaginationCountTextSource from "./examples/PaginationCountText.tsx?raw";
import { PaginationAttached } from "./examples/PaginationAttached.js";
import PaginationAttachedSource from "./examples/PaginationAttached.tsx?raw";
import { PaginationControlled } from "./examples/PaginationControlled.js";
import PaginationControlledSource from "./examples/PaginationControlled.tsx?raw";
import { PaginationController } from "./examples/PaginationController.js";
import PaginationControllerSource from "./examples/PaginationController.tsx?raw";
import { PaginationData } from "./examples/PaginationData.js";
import PaginationDataSource from "./examples/PaginationData.tsx?raw";
import { PaginationCustomization } from "./examples/PaginationCustomization.js";
import PaginationCustomizationSource from "./examples/PaginationCustomization.tsx?raw";
import { PaginationLinks } from "./examples/PaginationLinks.js";
import PaginationLinksSource from "./examples/PaginationLinks.tsx?raw";
import { PaginationPageSize } from "./examples/PaginationPageSize.js";
import PaginationPageSizeSource from "./examples/PaginationPageSize.tsx?raw";
import {
  ownerSections,
  type OwnerExample,
} from "../../shared/OwnerDocumentation.js";
import { parts } from "./parts.js";
export { parts };
export const Basic = PaginationBasic;
export const basicSource = PaginationBasicSource;
export const usage =
  "<Pagination.Root count={100} pageSize={10}>\n  <Pagination.List>\n    <Pagination.Previous />\n    <Pagination.Items />\n    <Pagination.Next />\n  </Pagination.List>\n</Pagination.Root>";
export const examples: OwnerExample[] = [
  {
    id: "sizes",
    title: "Sizes",
    description: "Use the same named size as neighboring Buttons.",
    Demo: PaginationSizes,
    source: PaginationSizesSource,
  },
  {
    id: "variants",
    title: "Variants",
    description: "Choose the normal and current-page treatments independently.",
    Demo: PaginationVariants,
    source: PaginationVariantsSource,
  },
  {
    id: "controlled",
    title: "Controlled",
    description: "Manage the current page with application state.",
    Demo: PaginationControlled,
    source: PaginationControlledSource,
  },
  {
    id: "siblings",
    title: "Sibling count",
    description: "Show nearby pages while retaining boundary destinations.",
    Demo: PaginationSiblings,
    source: PaginationSiblingsSource,
  },
  {
    id: "compact",
    title: "Compact",
    description: "Use page text instead of a long numbered row.",
    Demo: PaginationCompact,
    source: PaginationCompactSource,
  },
  {
    id: "links",
    title: "As links",
    description:
      "Native destinations preserve browser navigation and modified clicks.",
    Demo: PaginationLinks,
    source: PaginationLinksSource,
  },
  {
    id: "attached",
    title: "Attached",
    description: "Compose direct controls with ButtonGroup for joined borders.",
    Demo: PaginationAttached,
    source: PaginationAttachedSource,
  },
  {
    id: "count-text",
    title: "Count text",
    description: "Display the current record range from count and pageSize.",
    Demo: PaginationCountText,
    source: PaginationCountTextSource,
  },
  {
    id: "data",
    title: "Data driven",
    description: "Slice a complete local collection using controller state.",
    Demo: PaginationData,
    source: PaginationDataSource,
  },
  {
    id: "page-size",
    title: "Page size",
    description: "Compose NativeSelect with the shared page-size controller.",
    Demo: PaginationPageSize,
    source: PaginationPageSizeSource,
  },
  {
    id: "controller",
    title: "Root provider",
    description: "Control pagination from outside its visual root.",
    Demo: PaginationController,
    source: PaginationControllerSource,
  },
  {
    id: "customization",
    title: "Custom content",
    description: "Render custom controls and decorative ellipsis content.",
    Demo: PaginationCustomization,
    source: PaginationCustomizationSource,
  },
  {
    id: "boundaries",
    title: "First and last",
    description: "Add explicit boundary actions for longer collections.",
    Demo: PaginationBoundaries,
    source: PaginationBoundariesSource,
  },
];
export const sections = ownerSections(examples, parts);
