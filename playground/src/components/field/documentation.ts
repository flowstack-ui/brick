import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { FieldBasic } from "./examples/FieldBasic.js";
import BasicSource from "./examples/FieldBasic.tsx?raw";
import { FieldHelper } from "./examples/FieldHelper.js";
import HelperSource from "./examples/FieldHelper.tsx?raw";
import { FieldError } from "./examples/FieldError.js";
import ErrorSource from "./examples/FieldError.tsx?raw";
import { FieldHorizontal } from "./examples/FieldHorizontal.js";
import HorizontalSource from "./examples/FieldHorizontal.tsx?raw";
import { FieldStates } from "./examples/FieldStates.js";
import StatesSource from "./examples/FieldStates.tsx?raw";
import { FieldControls } from "./examples/FieldControls.js";
import ControlsSource from "./examples/FieldControls.tsx?raw";
import { FieldTarget } from "./examples/FieldTarget.js";
import TargetSource from "./examples/FieldTarget.tsx?raw";
import { FieldSizes } from "./examples/FieldSizes.js";
import SizesSource from "./examples/FieldSizes.tsx?raw";
import { FieldIds } from "./examples/FieldIds.js";
import IdsSource from "./examples/FieldIds.tsx?raw";
export const Basic = FieldBasic;
export const basicSource = BasicSource;
export const examples: OwnerExample[] = [
{id:"helper",title:"Helper text",description:"Explain the expected value.",Demo:FieldHelper,source:HelperSource},
{id:"error",title:"Error text and icon",description:"Use a clear message to explain how to correct the value.",Demo:FieldError,source:ErrorSource},
{id:"horizontal",title:"Horizontal",description:"Align labels using a shared width; reflow on smaller screens.",Demo:FieldHorizontal,source:HorizontalSource},
{id:"states",title:"States",description:"Required, optional, disabled and read-only remain distinct.",Demo:FieldStates,source:StatesSource},
{id:"controls",title:"Control composition",description:"The same Field anatomy supports textarea and native select.",Demo:FieldControls,source:ControlsSource},
{id:"target",title:"Target control",description:"The Price label activates Amount; Currency has its own accessible name.",Demo:FieldTarget,source:TargetSource},
{id:"sizes",title:"Sizes",description:"Adjust label density without changing the control recipe.",Demo:FieldSizes,source:SizesSource},
{id:"ids",title:"Explicit IDs",description:"Supply the control ID through Field so its label stays connected.",Demo:FieldIds,source:IdsSource},];
export const parts: OwnerPart[] = [
  {
    "id": "props-root",
    "title": "Root",
    "description": "State, native props and composition belong to this boundary.",
    "rows": [
      {
        "name": "size",
        "typeLabel": "ResponsiveValue<xs | sm | md>",
        "defaultLabel": "md",
        "description": "Label density."
      },
      {
        "name": "orientation",
        "typeLabel": "ResponsiveValue<vertical | horizontal>",
        "defaultLabel": "vertical",
        "description": "Layout direction."
      },
      {
        "name": "tone",
        "typeLabel": "primary | secondary",
        "defaultLabel": "primary",
        "description": "Label emphasis."
      },
      {
        "name": "labelWidth",
        "typeLabel": "CSS inline size",
        "defaultLabel": "—",
        "description": "Horizontal label width."
      },
      {
        "name": "ids",
        "typeLabel": "{control,label,description,error}",
        "defaultLabel": "—",
        "description": "Explicit relationship IDs."
      },
      {
        "name": "target",
        "typeLabel": "string",
        "defaultLabel": "—",
        "description": "Item activated by the label."
      },
      {
        "name": "invalid / required / disabled / readOnly",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Field state."
      },
      {
        "name": "validationBehavior",
        "typeLabel": "inline | native",
        "defaultLabel": "inherited",
        "description": "Native validity presentation."
      },
      {
        "name": "asChild / render",
        "typeLabel": "composition",
        "defaultLabel": "—",
        "description": "Preserve the appropriate native host."
      }
    ]
  },
  {
    "id": "props-label",
    "title": "Label",
    "description": "Activates the intended control.",
    "rows": [
      {
        "name": "htmlFor",
        "typeLabel": "string",
        "defaultLabel": "resolved",
        "description": "Override the target."
      },
      {
        "name": "requiredIndicator / optionalIndicator",
        "typeLabel": "ReactNode",
        "defaultLabel": "automatic required marker",
        "description": "Replace or disable the marker."
      }
    ]
  },
  {
    "id": "props-description",
    "title": "Description",
    "description": "Helper text associated with the control.",
    "rows": [
      {
        "name": "children",
        "typeLabel": "ReactNode",
        "defaultLabel": "—",
        "description": "Content; native props and composition are forwarded."
      }
    ]
  },
  {
    "id": "props-error",
    "title": "Error",
    "description": "Conditional error text.",
    "rows": [
      {
        "name": "match / forceMatch",
        "typeLabel": "boolean",
        "defaultLabel": "—",
        "description": "Control error visibility."
      }
    ]
  },
  {
    "id": "props-requiredindicator",
    "title": "RequiredIndicator",
    "description": "Required marker or optional fallback.",
    "rows": [
      {
        "name": "fallback",
        "typeLabel": "ReactNode",
        "defaultLabel": "—",
        "description": "Content when not required."
      }
    ]
  },
  {
    "id": "props-item",
    "title": "Item",
    "description": "One identified control in a compound entry.",
    "rows": [
      {
        "name": "value",
        "typeLabel": "string",
        "defaultLabel": "required",
        "description": "Unique item value; give secondary controls accessible names."
      }
    ]
  },
  {
    "id": "props-erroricon",
    "title": "ErrorIcon",
    "description": "Decorative Icon artwork.",
    "rows": [
      {
        "name": "size",
        "typeLabel": "Icon size",
        "defaultLabel": "inherit",
        "description": "Inherits surrounding text size."
      }
    ]
  },
  {
    "id": "props-context",
    "title": "Context",
    "description": "Read resolved state and relationships.",
    "rows": [
      {
        "name": "children",
        "typeLabel": "(context) => ReactNode",
        "defaultLabel": "required",
        "description": "Render-prop access."
      }
    ]
  }
];
export const sections = ownerSections(examples, parts);
