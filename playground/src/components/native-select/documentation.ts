import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { NativeSelectBasic } from "./examples/NativeSelectBasic.js";
import basicSource from "./examples/NativeSelectBasic.tsx?raw";
import { NativeSelectSizes } from "./examples/NativeSelectSizes.js";
import NativeSelectSizesSource from "./examples/NativeSelectSizes.tsx?raw";
import { NativeSelectVariants } from "./examples/NativeSelectVariants.js";
import NativeSelectVariantsSource from "./examples/NativeSelectVariants.tsx?raw";
import { NativeSelectControlled } from "./examples/NativeSelectControlled.js";
import NativeSelectControlledSource from "./examples/NativeSelectControlled.tsx?raw";
import { NativeSelectStates } from "./examples/NativeSelectStates.js";
import NativeSelectStatesSource from "./examples/NativeSelectStates.tsx?raw";
import { NativeSelectResponsive } from "./examples/NativeSelectResponsive.js";
import NativeSelectResponsiveSource from "./examples/NativeSelectResponsive.tsx?raw";
import { NativeSelectForm } from "./examples/NativeSelectForm.js";
import NativeSelectFormSource from "./examples/NativeSelectForm.tsx?raw";
import { NativeSelectMultiple } from "./examples/NativeSelectMultiple.js";
import NativeSelectMultipleSource from "./examples/NativeSelectMultiple.tsx?raw";
import { NativeSelectComposition } from "./examples/NativeSelectComposition.js";
import NativeSelectCompositionSource from "./examples/NativeSelectComposition.tsx?raw";
import { NativeSelectNoIndicator } from "./examples/NativeSelectNoIndicator.js";
import NativeSelectNoIndicatorSource from "./examples/NativeSelectNoIndicator.tsx?raw";
import { NativeSelectGroups } from "./examples/NativeSelectGroups.js";
import NativeSelectGroupsSource from "./examples/NativeSelectGroups.tsx?raw";
export const examples: OwnerExample[] = [
{id:"sizes",title:"Sizes",description:"Seven sizes change control height, type and icon geometry together.",Demo:NativeSelectSizes,source:NativeSelectSizesSource},
{id:"variants",title:"Variants",description:"Choose outline, surface, soft, subtle, ghost or underline without changing the control size.",Demo:NativeSelectVariants,source:NativeSelectVariantsSource},
{id:"controlled",title:"Controlled",description:"Keep the selected value in application state.",Demo:NativeSelectControlled,source:NativeSelectControlledSource},
{id:"states",title:"Disabled and invalid",description:"Use native state props; custom selects also support read-only.",Demo:NativeSelectStates,source:NativeSelectStatesSource},
{id:"responsive",title:"Responsive size",description:"Omit initial to keep the normal default below the breakpoint.",Demo:NativeSelectResponsive,source:NativeSelectResponsiveSource},
{id:"form",title:"Form and reset",description:"Submit and reset using the native form.",Demo:NativeSelectForm,source:NativeSelectFormSource},
{id:"multiple",title:"Multiple and rows",description:"Use the browser's native list selection, not a custom popup.",Demo:NativeSelectMultiple,source:NativeSelectMultipleSource},
{id:"composition",title:"Root composition",description:"Change the visual host while keeping Field as a real select.",Demo:NativeSelectComposition,source:NativeSelectCompositionSource},
{id:"noindicator",title:"Without indicator",description:"Omit the optional indicator for native list-style compositions.",Demo:NativeSelectNoIndicator,source:NativeSelectNoIndicatorSource},
{id:"groups",title:"Grouped options",description:"Group related choices under an accessible label.",Demo:NativeSelectGroups,source:NativeSelectGroupsSource}
];
export const parts: OwnerPart[] = [
  {
    "id": "props-root",
    "title": "Root",
    "description": "Owns the visual recipe and native list state.",
    "rows": [
      {
        "name": "size",
        "typeLabel": "ResponsiveValue<\"2xs\" | \"xs\" | \"sm\" | \"md\" | \"lg\" | \"xl\" | \"2xl\">",
        "defaultLabel": "\"lg\"",
        "description": "Complete responsive control geometry."
      },
      {
        "name": "variant",
        "typeLabel": "\"outline\" | \"surface\" | \"soft\" | \"subtle\" | \"ghost\" | \"plain\" | \"underline\"",
        "defaultLabel": "\"outline\"",
        "description": "Appearance without changing behavior."
      },
      {
        "name": "radius",
        "typeLabel": "Radius",
        "defaultLabel": "theme control",
        "description": "Core or semantic radius. Not applicable to underline."
      },
      {
        "name": "fullWidth",
        "typeLabel": "boolean",
        "defaultLabel": "true",
        "description": "Fill available inline space."
      },
      {
        "name": "disabled / invalid / required",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Control state; Field integration supplies inherited defaults."
      },
      {
        "name": "multiple / rows",
        "typeLabel": "boolean / number",
        "defaultLabel": "false / —",
        "description": "Native list selection and visible row count."
      },
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Compose one visual host; Field remains native."
      }
    ]
  },
  {
    "id": "props-field",
    "title": "Field",
    "description": "The real native select.",
    "rows": [
      {
        "name": "value / defaultValue / onChange",
        "typeLabel": "native select props",
        "defaultLabel": "—",
        "description": "Native controlled or uncontrolled selection."
      },
      {
        "name": "name / form / autoComplete",
        "typeLabel": "string",
        "defaultLabel": "—",
        "description": "Native form and autofill behavior."
      },
      {
        "name": "children",
        "typeLabel": "option / optgroup",
        "defaultLabel": "—",
        "description": "Browser-owned option labels; no interactive custom content."
      }
    ]
  },
  {
    "id": "props-indicator",
    "title": "Indicator",
    "description": "Optional decorative picker artwork.",
    "rows": [
      {
        "name": "children",
        "typeLabel": "ReactNode",
        "defaultLabel": "chevron",
        "description": "Replace the artwork; list mode hides it."
      }
    ]
  }
];
export const sections = ownerSections(examples,parts);
export { NativeSelectBasic, basicSource };
