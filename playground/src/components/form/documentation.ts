import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { FormBasic } from "./examples/FormBasic.js";
import BasicSource from "./examples/FormBasic.tsx?raw";
import { FormValidation } from "./examples/FormValidation.js";
import ValidationSource from "./examples/FormValidation.tsx?raw";
import { FormAsync } from "./examples/FormAsync.js";
import AsyncSource from "./examples/FormAsync.tsx?raw";
import { FormSpacing } from "./examples/FormSpacing.js";
import SpacingSource from "./examples/FormSpacing.tsx?raw";
import { FormExternal } from "./examples/FormExternal.js";
import ExternalSource from "./examples/FormExternal.tsx?raw";
import { FormAction } from "./examples/FormAction.js";
import ActionSource from "./examples/FormAction.tsx?raw";
import { FormHookForm } from "./examples/FormHookForm.js";
import HookFormSource from "./examples/FormHookForm.tsx?raw";
export const Basic = FormBasic;
export const basicSource = BasicSource;
export const examples: OwnerExample[] = [
{id:"validation",title:"Inline validation",description:"An Error presenter uses inline validation and preserves control focus.",Demo:FormValidation,source:ValidationSource},
{id:"async",title:"Async and reset",description:"Reset clears pending form metadata; requests remain application-owned.",Demo:FormAsync,source:AsyncSource},
{id:"spacing",title:"Responsive spacing",description:"Adjust form rhythm without changing individual field recipes.",Demo:FormSpacing,source:SpacingSource},
{id:"external",title:"External actions",description:"Native form ownership connects an action outside the form.",Demo:FormExternal,source:ExternalSource},
{id:"action",title:"React action",description:"React owns pending state and automatic action resets.",Demo:FormAction,source:ActionSource},
{id:"hookform",title:"React Hook Form",description:"Application validation stays in the form library.",Demo:FormHookForm,source:HookFormSource},];
export const parts: OwnerPart[] = [
  {
    "id": "props-root",
    "title": "Form",
    "description": "State, native props and composition belong to this boundary.",
    "rows": [
      {
        "name": "gap",
        "typeLabel": "ResponsiveValue<SpacingValue>",
        "defaultLabel": "5",
        "description": "Space between children."
      },
      {
        "name": "preventDefaultOnSubmit",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Prevent native navigation."
      },
      {
        "name": "validateOnSubmit",
        "typeLabel": "(event) => boolean | Promise<boolean>",
        "defaultLabel": "—",
        "description": "Callback validation."
      },
      {
        "name": "onSubmit",
        "typeLabel": "(event) => void | Promise<void>",
        "defaultLabel": "—",
        "description": "Latest attempt owns callback metadata."
      },
      {
        "name": "validationBehavior",
        "typeLabel": "inline | native",
        "defaultLabel": "native",
        "description": "Validity presentation."
      },
      {
        "name": "action",
        "typeLabel": "URL | React form action",
        "defaultLabel": "—",
        "description": "Native or React-owned submission."
      },
      {
        "name": "asChild / render",
        "typeLabel": "composition",
        "defaultLabel": "—",
        "description": "Preserve the appropriate native host."
      }
    ]
  }
];
export const sections = ownerSections(examples, parts);
