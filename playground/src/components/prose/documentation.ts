import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { ProseBasic } from "./examples/ProseBasic.js";
import ProseBasicSource from "./examples/ProseBasic.tsx?raw";
import { ProseSizes } from "./examples/ProseSizes.js";
import ProseSizesSource from "./examples/ProseSizes.tsx?raw";
import { ProseLists } from "./examples/ProseLists.js";
import ProseListsSource from "./examples/ProseLists.tsx?raw";
import { ProseQuote } from "./examples/ProseQuote.js";
import ProseQuoteSource from "./examples/ProseQuote.tsx?raw";
import { ProseTable } from "./examples/ProseTable.js";
import ProseTableSource from "./examples/ProseTable.tsx?raw";
import { ProseCode } from "./examples/ProseCode.js";
import ProseCodeSource from "./examples/ProseCode.tsx?raw";
import { ProseMedia } from "./examples/ProseMedia.js";
import ProseMediaSource from "./examples/ProseMedia.tsx?raw";
import { ProseMeasure } from "./examples/ProseMeasure.js";
import ProseMeasureSource from "./examples/ProseMeasure.tsx?raw";
import { ProseTone } from "./examples/ProseTone.js";
import ProseToneSource from "./examples/ProseTone.tsx?raw";
import { ProseBoundaries } from "./examples/ProseBoundaries.js";
import ProseBoundariesSource from "./examples/ProseBoundaries.tsx?raw";
import { ProseResponsive } from "./examples/ProseResponsive.js";
import ProseResponsiveSource from "./examples/ProseResponsive.tsx?raw";
export const Basic = ProseBasic;
export const basicSource = ProseBasicSource;
export const examples: OwnerExample[] = [
{ id: "sizes", title: "Sizes", description: "Compare the available visual recipes without changing semantics.", Demo: ProseSizes, source: ProseSizesSource },
{ id: "lists", title: "Lists", description: "Nested list paragraphs, ordered steps and description lists keep their own rhythm.", Demo: ProseLists, source: ProseListsSource },
{ id: "quote", title: "Quote", description: "Quotes and inline emphasis use the document's typography.", Demo: ProseQuote, source: ProseQuoteSource },
{ id: "table", title: "Table", description: "Native tables use transparent headers; automatic column layout is optional.", Demo: ProseTable, source: ProseTableSource },
{ id: "code", title: "Code", description: "Choose wrapped code or a named, keyboard-reachable scrolling region.", Demo: ProseCode, source: ProseCodeSource },
{ id: "media", title: "Media", description: "Figures and captions remain within the reading measure.", Demo: ProseMedia, source: ProseMediaSource },
{ id: "measure", title: "Measure", description: "Reading measure limits line length; available parent width still constrains every choice.", Demo: ProseMeasure, source: ProseMeasureSource },
{ id: "tone", title: "Tone", description: "Choose a foreground role without changing the type scale.", Demo: ProseTone, source: ProseToneSource },
{ id: "boundaries", title: "Boundaries", description: "Content trims document edges; Exclude protects embedded interface components from descendant styles.", Demo: ProseBoundaries, source: ProseBoundariesSource },
{ id: "responsive", title: "Responsive", description: "Change presentation at shared breakpoints without replacing the content tree.", Demo: ProseResponsive, source: ProseResponsiveSource },
];
export const parts: OwnerPart[] = [
  {
    "id": "props-prose",
    "title": "Prose",
    "description": "The document root owns visual recipes and reading measure.",
    "rows": [
      {
        "name": "as",
        "typeLabel": "\"div\" | \"article\" | \"section\"",
        "defaultLabel": "\"div\"",
        "description": "Select a document-region host."
      },
      {
        "name": "size",
        "typeLabel": "ResponsiveValue<\"sm\" | \"md\" | \"lg\">",
        "defaultLabel": "\"md\"",
        "description": "Coordinated document scale; sparse objects inherit the default below their first breakpoint."
      },
      {
        "name": "measure",
        "typeLabel": "\"narrow\" | \"default\" | \"wide\" | \"reading\" | \"none\"",
        "defaultLabel": "\"default\"",
        "description": "40rem, 48rem, 64rem, 65ch or unconstrained maximum."
      },
      {
        "name": "tone",
        "typeLabel": "\"primary\" | \"secondary\" | \"inherit\"",
        "defaultLabel": "\"secondary\"",
        "description": "Body foreground; headings remain primary."
      },
      {
        "name": "codeOverflow",
        "typeLabel": "\"wrap\" | \"scroll\"",
        "defaultLabel": "\"wrap\"",
        "description": "Raw code presentation. Name and make scrolling pre elements keyboard reachable where needed."
      },
      {
        "name": "tableLayout",
        "typeLabel": "\"fixed\" | \"auto\"",
        "defaultLabel": "\"fixed\"",
        "description": "Native table column layout."
      },
      {
        "name": "children",
        "typeLabel": "ReactNode",
        "defaultLabel": "—",
        "description": "Trusted rendered content; no parser or sanitizer."
      }
    ]
  },
  {
    "id": "props-content",
    "title": "Content",
    "description": "A static div at the immediate parent of document nodes. It trims first and last margins; it is not an editor adapter.",
    "rows": [
      {
        "name": "children",
        "typeLabel": "ReactNode",
        "defaultLabel": "—",
        "description": "Trusted native document descendants. Native div attributes and ref pass through."
      }
    ]
  },
  {
    "id": "props-exclude",
    "title": "Exclude",
    "description": "A static div that excludes its subtree from document selectors and restores UI typography. Nested Prose does not re-enter inside exclusion.",
    "rows": [
      {
        "name": "children",
        "typeLabel": "ReactNode",
        "defaultLabel": "—",
        "description": "Embedded interface content. Native div attributes and ref pass through."
      }
    ]
  }
];
export const sections = ownerSections(examples, parts);
