import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { HideProjection } from "./examples/HideProjection.js";
import ProjectionSource from "./examples/HideProjection.tsx?raw";
import { HidePair } from "./examples/HidePair.js";
import PairSource from "./examples/HidePair.tsx?raw";
import { HideState } from "./examples/HideState.js";
import StateSource from "./examples/HideState.tsx?raw";
export const hideExamples: OwnerExample[] = [
{ id:"projection",title:"Projection",description:"Preserve the existing flex host while hiding it from lg upward.",Demo:HideProjection,source:ProjectionSource },
{ id:"pair",title:"Pair",description:"Show and Hide use complementary thresholds.",Demo:HidePair,source:PairSource },
{ id:"state",title:"State",description:"CSS visibility retains state. Applications own focus recovery if resize hides a control.",Demo:HideState,source:StateSource },
];
export const hideParts: OwnerPart[] = [
  {
    "id": "props-responsive",
    "title": "Hide",
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
        "typeLabel": "HideElement",
        "defaultLabel": "div",
        "description": "Native host for wrapper mode only; omit with asChild."
      },
      {
        "name": "slot",
        "typeLabel": "string",
        "defaultLabel": "hide",
        "description": "Wrapper slot; projected child slot is preserved unless explicitly supplied."
      }
    ]
  }
];
export const hideSections = ownerSections(hideExamples, hideParts);
