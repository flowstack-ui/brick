import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { ShowFallback } from "./examples/ShowFallback.js";
import FallbackSource from "./examples/ShowFallback.tsx?raw";
import { ShowValue } from "./examples/ShowValue.js";
import ValueSource from "./examples/ShowValue.tsx?raw";
import { ShowTruthiness } from "./examples/ShowTruthiness.js";
import TruthinessSource from "./examples/ShowTruthiness.tsx?raw";
import { ShowResponsive } from "./examples/ShowResponsive.js";
import ResponsiveSource from "./examples/ShowResponsive.tsx?raw";
import { ShowProjection } from "./examples/ShowProjection.js";
import ProjectionSource from "./examples/ShowProjection.tsx?raw";
import { ShowState } from "./examples/ShowState.js";
import StateSource from "./examples/ShowState.tsx?raw";
import { ShowCombined } from "./examples/ShowCombined.js";
import CombinedSource from "./examples/ShowCombined.tsx?raw";
export const showExamples: OwnerExample[] = [
{ id:"fallback",title:"Fallback",description:"Display alternative content when the condition is falsy.",Demo:ShowFallback,source:FallbackSource },
{ id:"value",title:"Value",description:"Function children receive the truthy value.",Demo:ShowValue,source:ValueSource },
{ id:"truthiness",title:"Truthiness",description:"Zero is falsy. Test collection length explicitly; empty arrays are truthy.",Demo:ShowTruthiness,source:TruthinessSource },
{ id:"responsive",title:"Responsive",description:"Resize the viewport: content appears from md and stays mounted.",Demo:ShowResponsive,source:ResponsiveSource },
{ id:"projection",title:"Projection",description:"Apply responsive visibility to an existing flex host without removing its box.",Demo:ShowProjection,source:ProjectionSource },
{ id:"state",title:"State",description:"Conditional removal resets local state; responsive hiding retains it.",Demo:ShowState,source:StateSource },
{ id:"combined",title:"Combined",description:"Nest separate conditions and responsive visibility intentionally.",Demo:ShowCombined,source:CombinedSource },
];
export const showParts: OwnerPart[] = [
  {
    "id": "props-conditional",
    "title": "Conditional",
    "description": "Wrapper-free rendering. Cannot be combined with responsive or native host props.",
    "rows": [
      {
        "name": "when",
        "typeLabel": "T",
        "defaultLabel": "required",
        "description": "Truthy values render children; falsy values render fallback."
      },
      {
        "name": "fallback",
        "typeLabel": "ReactNode",
        "defaultLabel": "null",
        "description": "Alternative content."
      },
      {
        "name": "children",
        "typeLabel": "ReactNode | ((value: Truthy<T>) => ReactNode)",
        "defaultLabel": "required",
        "description": "Render a node or derive content from the truthy value."
      }
    ]
  },
  {
    "id": "props-responsive",
    "title": "Responsive",
    "description": "CSS visibility; not conditional mounting. Hidden forms remain mounted and portals are outside this host.",
    "rows": [
      {
        "name": "from",
        "typeLabel": "\"sm\" | \"md\" | \"lg\" | \"xl\"",
        "defaultLabel": "required",
        "description": "CSS threshold; children remain mounted."
      },
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Project onto one non-Fragment element. Its visible display is preserved."
      },
      {
        "name": "as",
        "typeLabel": "ShowElement",
        "defaultLabel": "div",
        "description": "Native host for wrapper mode only; omit with asChild."
      },
      {
        "name": "slot",
        "typeLabel": "string",
        "defaultLabel": "show",
        "description": "Wrapper slot; projected child slot is preserved unless explicitly supplied."
      }
    ]
  }
];
export const showSections = ownerSections(showExamples, showParts);
