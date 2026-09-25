import type { ForProps } from "@flowstack-ui/brick";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";
import { ownerSections, type OwnerExample } from "../../shared/OwnerDocumentation.js";
import { ForObjects } from "./examples/ForObjects.js";
import objectsSource from "./examples/ForObjects.tsx?raw";
import { ForFallback } from "./examples/ForFallback.js";
import fallbackSource from "./examples/ForFallback.tsx?raw";
import { ForStableKeys } from "./examples/ForStableKeys.js";
import keysSource from "./examples/ForStableKeys.tsx?raw";

export const forExamples: OwnerExample[] = [
  { id: "object", title: "Object", description: "Render an array of objects with inferred item types, including readonly arrays. Use stable identifiers as keys.", Demo: ForObjects, source: objectsSource },
  { id: "fallback", title: "Fallback", description: "Render fallback content when the collection is empty or undefined. Without a fallback, nothing is rendered.", Demo: ForFallback, source: fallbackSource },
  { id: "stable-keys", title: "Stable keys", description: "Type a note, then reverse the items. Stable keys keep the input state with its item; For does not choose keys for you.", Demo: ForStableKeys, source: keysSource },
];
export const forSections = ownerSections(forExamples, []);
export const forProps: DocsPropDefinition<ForProps<readonly unknown[] | undefined>>[] = [
  { name: "each", typeLabel: "readonly T[] | undefined", description: "Required collection. Mutable arrays are also supported. Item order and source indices are preserved." },
  { name: "children", typeLabel: "(item: T, index: number) => ReactNode", description: "Required render function. Put a stable key on each returned item root." },
  { name: "fallback", typeLabel: "ReactNode", defaultLabel: "null", description: "Content returned for empty or undefined collections. Values such as 0 are preserved." },
];
