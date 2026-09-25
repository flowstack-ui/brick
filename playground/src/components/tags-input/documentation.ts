import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { TagsInputSizes } from "./examples/TagsInputSizes.js";
import SizesSource from "./examples/TagsInputSizes.tsx?raw";
import { TagsInputVariants } from "./examples/TagsInputVariants.js";
import VariantsSource from "./examples/TagsInputVariants.tsx?raw";
import { TagsInputControlled } from "./examples/TagsInputControlled.js";
import ControlledSource from "./examples/TagsInputControlled.tsx?raw";
import { TagsInputStore } from "./examples/TagsInputStore.js";
import StoreSource from "./examples/TagsInputStore.tsx?raw";
import { TagsInputMaximum } from "./examples/TagsInputMaximum.js";
import MaximumSource from "./examples/TagsInputMaximum.tsx?raw";
import { TagsInputEditable } from "./examples/TagsInputEditable.js";
import EditableSource from "./examples/TagsInputEditable.tsx?raw";
import { TagsInputValidate } from "./examples/TagsInputValidate.js";
import ValidateSource from "./examples/TagsInputValidate.tsx?raw";
import { TagsInputStates } from "./examples/TagsInputStates.js";
import StatesSource from "./examples/TagsInputStates.tsx?raw";
import { TagsInputField } from "./examples/TagsInputField.js";
import FieldSource from "./examples/TagsInputField.tsx?raw";
import { TagsInputForm } from "./examples/TagsInputForm.js";
import FormSource from "./examples/TagsInputForm.tsx?raw";
import { TagsInputPaste } from "./examples/TagsInputPaste.js";
import PasteSource from "./examples/TagsInputPaste.tsx?raw";
import { TagsInputSanitize } from "./examples/TagsInputSanitize.js";
import SanitizeSource from "./examples/TagsInputSanitize.tsx?raw";
import { TagsInputBlur } from "./examples/TagsInputBlur.js";
import BlurSource from "./examples/TagsInputBlur.tsx?raw";
import { TagsInputDelimiter } from "./examples/TagsInputDelimiter.js";
import DelimiterSource from "./examples/TagsInputDelimiter.tsx?raw";
import { TagsInputColors } from "./examples/TagsInputColors.js";
import ColorsSource from "./examples/TagsInputColors.tsx?raw";
import { TagsInputCombobox } from "./examples/TagsInputCombobox.js";
import ComboboxSource from "./examples/TagsInputCombobox.tsx?raw";
import { TagsInputHookForm } from "./examples/TagsInputHookForm.js";
import HookFormSource from "./examples/TagsInputHookForm.tsx?raw";
import { TagsInputResponsive } from "./examples/TagsInputResponsive.js";
import ResponsiveSource from "./examples/TagsInputResponsive.tsx?raw";
import { TagsInputDisabledItems } from "./examples/TagsInputDisabledItems.js";
import DisabledItemsSource from "./examples/TagsInputDisabledItems.tsx?raw";
import { TagsInputComposition } from "./examples/TagsInputComposition.js";
import CompositionSource from "./examples/TagsInputComposition.tsx?raw";
import { TagsInputDialog } from "./examples/TagsInputDialog.js";
import DialogSource from "./examples/TagsInputDialog.tsx?raw";
export const examples: OwnerExample[] = [
{id:"sizes",title:"Sizes",description:"Use the same seven sizes as Input and Select; wrapped tags grow the field naturally.",Demo:TagsInputSizes,source:SizesSource},
{id:"variants",title:"Variants",description:"Choose from the seven shared form recipes. Underline keeps focus on the bottom edge.",Demo:TagsInputVariants,source:VariantsSource},
{id:"controlled",title:"Controlled",description:"Control committed values and the unfinished draft independently.",Demo:TagsInputControlled,source:ControlledSource},
{id:"store",title:"Store",description:"Use the controller and RootProvider when external actions need to update the collection.",Demo:TagsInputStore,source:StoreSource},
{id:"maximum",title:"Maximum tags",description:"Set max to limit committed tags; rejected additions keep their draft.",Demo:TagsInputMaximum,source:MaximumSource},
{id:"editable",title:"Editable",description:"Enable editable, then double-click a tag or highlight it and press Enter. Escape cancels.",Demo:TagsInputEditable,source:EditableSource},
{id:"validate",title:"Validate",description:"Validate each candidate before accepting it. Invalid input stays available for correction.",Demo:TagsInputValidate,source:ValidateSource},
{id:"states",title:"States",description:"Disabled fades once and prevents interaction; read-only keeps focus without mutation actions.",Demo:TagsInputStates,source:StatesSource},
{id:"field",title:"Field",description:"Compose a persistent label, required marker, description and validation feedback.",Demo:TagsInputField,source:FieldSource},
{id:"form",title:"Native form",description:"HiddenInput submits one JSON array. Native reset restores the initial collection and draft.",Demo:TagsInputForm,source:FormSource},
{id:"paste",title:"Paste",description:"Enable addOnPaste for delimiter-separated values. A rejected candidate rejects the whole batch.",Demo:TagsInputPaste,source:PasteSource},
{id:"sanitize",title:"Sanitize values",description:"Normalize before checking duplicates and validation; the same policy applies to edits and paste.",Demo:TagsInputSanitize,source:SanitizeSource},
{id:"blur",title:"Blur behavior",description:"Use add to commit on leaving the field or clear to discard the unfinished draft.",Demo:TagsInputBlur,source:BlurSource},
{id:"delimiter",title:"Custom delimiter",description:"Accept commas or semicolons with a RegExp delimiter; a string delimiter also works.",Demo:TagsInputDelimiter,source:DelimiterSource},
{id:"colors",title:"Item colors",description:"Color tags independently of the field boundary using neutral, accent or contrast.",Demo:TagsInputColors,source:ColorsSource},
{id:"combobox",title:"Combobox",description:"Offer suggestions while Tags Input owns the collection and the shared draft.",Demo:TagsInputCombobox,source:ComboboxSource},
{id:"hook-form",title:"React Hook Form",description:"Connect the array through Controller and forward its focus ref to the draft input.",Demo:TagsInputHookForm,source:HookFormSource},
{id:"responsive",title:"Responsive",description:"Change size and recipe at breakpoints without replacing the control or its value.",Demo:TagsInputResponsive,source:ResponsiveSource},
{id:"disabled-items",title:"Disabled items",description:"Keep a locked value in the collection; clear removes only enabled tags.",Demo:TagsInputDisabledItems,source:DisabledItemsSource},
{id:"composition",title:"Item composition",description:"Use explicit parts and ItemContext for custom content without adding another value owner.",Demo:TagsInputComposition,source:CompositionSource},
{id:"dialog",title:"Inside Dialog",description:"Keep editing and Escape behavior scoped to the field inside a dialog.",Demo:TagsInputDialog,source:DialogSource},
];
export const parts: OwnerPart[] = [
  {
    "id": "props-root",
    "title": "Root",
    "description": "Owns the collection, draft, behavior and visual recipe.",
    "rows": [
      {
        "name": "size",
        "typeLabel": "ResponsiveValue<2xs | xs | sm | md | lg | xl | 2xl>",
        "description": "Shared form-control sizes.",
        "defaultLabel": "lg"
      },
      {
        "name": "variant",
        "typeLabel": "ResponsiveValue<outline | surface | soft | subtle | ghost | plain | underline>",
        "description": "Seven field recipes; responsive variants exclude radius/shape.",
        "defaultLabel": "outline"
      },
      {
        "name": "shape",
        "typeLabel": "sharp | rounded | pill",
        "description": "Legacy corner recipe for scalar boxed variants.",
        "defaultLabel": "rounded"
      },
      {
        "name": "radius",
        "typeLabel": "RadiusToken",
        "description": "Token-only radius for scalar boxed recipes; cannot combine with shape."
      },
      {
        "name": "fullWidth",
        "typeLabel": "boolean",
        "description": "Fill the available inline measure.",
        "defaultLabel": "true"
      },
      {
        "name": "value",
        "typeLabel": "string[]",
        "description": "Controlled collection."
      },
      {
        "name": "defaultValue",
        "typeLabel": "string[]",
        "description": "Initial uncontrolled collection.",
        "defaultLabel": "[]"
      },
      {
        "name": "inputValue",
        "typeLabel": "string",
        "description": "Controlled unfinished draft."
      },
      {
        "name": "defaultInputValue",
        "typeLabel": "string",
        "description": "Initial draft.",
        "defaultLabel": "\"\""
      },
      {
        "name": "onValueChange",
        "typeLabel": "(details: { value: string[] }) => void",
        "description": "Accept collection changes in controlled usage."
      },
      {
        "name": "onInputValueChange",
        "typeLabel": "(details: { inputValue: string }) => void",
        "description": "Accept draft changes independently."
      },
      {
        "name": "editable",
        "typeLabel": "boolean",
        "description": "Allow editing existing tags.",
        "defaultLabel": "false"
      },
      {
        "name": "delimiter",
        "typeLabel": "string | RegExp",
        "description": "Commit on a delimiter; also splits pasted values.",
        "defaultLabel": "\",\""
      },
      {
        "name": "addOnPaste",
        "typeLabel": "boolean",
        "description": "Accept atomic delimiter-separated pasted batches.",
        "defaultLabel": "false"
      },
      {
        "name": "sanitizeValue",
        "typeLabel": "(value: string) => string",
        "description": "Normalize creation and edits before validation.",
        "defaultLabel": "trim"
      },
      {
        "name": "validate",
        "typeLabel": "(details: { inputValue: string; value: string[] }) => boolean",
        "description": "Validate each proposed tag."
      },
      {
        "name": "max",
        "typeLabel": "number",
        "description": "Maximum count.",
        "defaultLabel": "Infinity"
      },
      {
        "name": "maxLength",
        "typeLabel": "number",
        "description": "Maximum candidate length."
      },
      {
        "name": "allowDuplicates",
        "typeLabel": "boolean",
        "description": "Allow repeated occurrences with distinct indexes.",
        "defaultLabel": "false"
      },
      {
        "name": "allowOverflow",
        "typeLabel": "boolean",
        "description": "Accept values beyond max while exposing invalid state.",
        "defaultLabel": "false"
      },
      {
        "name": "blurBehavior",
        "typeLabel": "add | clear",
        "description": "Commit or discard the draft outside the field. Omit to preserve."
      },
      {
        "name": "disabled",
        "typeLabel": "boolean",
        "description": "Prevent interaction and omit the named form value.",
        "defaultLabel": "false"
      },
      {
        "name": "readOnly",
        "typeLabel": "boolean",
        "description": "Prevent mutations while retaining focus and submission.",
        "defaultLabel": "false"
      },
      {
        "name": "invalid",
        "typeLabel": "boolean",
        "description": "Expose an invalid field and error paint."
      },
      {
        "name": "required",
        "typeLabel": "boolean",
        "description": "Require at least one committed value.",
        "defaultLabel": "false"
      },
      {
        "name": "name",
        "typeLabel": "string",
        "description": "Name of the JSON HiddenInput."
      },
      {
        "name": "form",
        "typeLabel": "string",
        "description": "External form ID."
      },
      {
        "name": "validationBehavior",
        "typeLabel": "inline | native",
        "description": "Use the existing Form validation contract."
      },
      {
        "name": "id",
        "typeLabel": "string",
        "description": "Base ID for generated relationships."
      },
      {
        "name": "ids",
        "typeLabel": "root IDs + indexed item/itemInput/itemDeleteTrigger callbacks",
        "description": "Customize part identities while preserving occurrence indexes."
      },
      {
        "name": "dir",
        "typeLabel": "ltr | rtl",
        "description": "Logical navigation direction."
      },
      {
        "name": "autoFocus",
        "typeLabel": "boolean",
        "description": "Focus the draft on mount.",
        "defaultLabel": "false"
      },
      {
        "name": "placeholder",
        "typeLabel": "string",
        "description": "Optional draft hint; not an accessible label."
      },
      {
        "name": "translations",
        "typeLabel": "TagsInputTranslations",
        "description": "Localized action names, announcements and validation messages."
      },
      {
        "name": "onHighlightChange",
        "typeLabel": "(details) => void",
        "description": "Observe highlighted index/value."
      },
      {
        "name": "onValueInvalid",
        "typeLabel": "(details: TagsInputInvalidDetails) => void",
        "description": "Report rejected reason, candidate and existing values."
      },
      {
        "name": "onFocusOutside",
        "typeLabel": "(event: TagsInputOutsideEvent) => void",
        "description": "Cancelable outside-interaction policy."
      },
      {
        "name": "onPointerDownOutside",
        "typeLabel": "(event: TagsInputOutsideEvent) => void",
        "description": "Cancelable outside-interaction policy."
      },
      {
        "name": "onInteractOutside",
        "typeLabel": "(event: TagsInputOutsideEvent) => void",
        "description": "Cancelable outside-interaction policy."
      },
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "description": "Merge into one semantic child host; preserve props/ref.",
        "defaultLabel": "false"
      },
      {
        "name": "render",
        "typeLabel": "RenderProp",
        "description": "Render a custom host forwarding the owner props and ref."
      }
    ]
  },
  {
    "id": "props-root-provider",
    "title": "RootProvider",
    "description": "Uses an existing controller, with the same visual recipes.",
    "rows": [
      {
        "name": "value",
        "typeLabel": "TagsInputController",
        "description": "Controller returned by useTagsInput."
      },
      {
        "name": "size",
        "typeLabel": "ResponsiveValue<2xs | xs | sm | md | lg | xl | 2xl>",
        "description": "Shared form-control sizes.",
        "defaultLabel": "lg"
      },
      {
        "name": "variant",
        "typeLabel": "ResponsiveValue<outline | surface | soft | subtle | ghost | plain | underline>",
        "description": "Seven field recipes; responsive variants exclude radius/shape.",
        "defaultLabel": "outline"
      },
      {
        "name": "shape",
        "typeLabel": "sharp | rounded | pill",
        "description": "Legacy corner recipe for scalar boxed variants.",
        "defaultLabel": "rounded"
      },
      {
        "name": "radius",
        "typeLabel": "RadiusToken",
        "description": "Token-only radius for scalar boxed recipes; cannot combine with shape."
      },
      {
        "name": "fullWidth",
        "typeLabel": "boolean",
        "description": "Fill the available inline measure.",
        "defaultLabel": "true"
      },
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "description": "Merge into one semantic child host; preserve props/ref.",
        "defaultLabel": "false"
      },
      {
        "name": "render",
        "typeLabel": "RenderProp",
        "description": "Render a custom host forwarding the owner props and ref."
      }
    ]
  },
  {
    "id": "props-context",
    "title": "Context",
    "description": "Render access to the root controller.",
    "rows": [
      {
        "name": "children",
        "typeLabel": "(api: TagsInputController) => ReactNode",
        "description": "Read state and invoke public controller actions."
      }
    ]
  },
  {
    "id": "props-label",
    "title": "Label",
    "description": "Native label linked to Input.",
    "rows": [
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "description": "Merge into one semantic child host; preserve props/ref.",
        "defaultLabel": "false"
      },
      {
        "name": "render",
        "typeLabel": "RenderProp",
        "description": "Render a custom host forwarding the owner props and ref."
      }
    ]
  },
  {
    "id": "props-control",
    "title": "Control",
    "description": "Wrapping field boundary; contains items, input and optional actions.",
    "rows": [
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "description": "Merge into one semantic child host; preserve props/ref.",
        "defaultLabel": "false"
      },
      {
        "name": "render",
        "typeLabel": "RenderProp",
        "description": "Render a custom host forwarding the owner props and ref."
      }
    ]
  },
  {
    "id": "props-input",
    "title": "Input",
    "description": "Native, unnamed draft editor.",
    "rows": [
      {
        "name": "placeholder",
        "typeLabel": "string",
        "description": "Optional entry hint; suppressed in read-only mode."
      },
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "description": "Merge into one semantic child host; preserve props/ref.",
        "defaultLabel": "false"
      },
      {
        "name": "render",
        "typeLabel": "RenderProp",
        "description": "Render a custom host forwarding the owner props and ref."
      }
    ]
  },
  {
    "id": "props-item",
    "title": "Item",
    "description": "One indexed occurrence.",
    "rows": [
      {
        "name": "index",
        "typeLabel": "number",
        "description": "Current collection index."
      },
      {
        "name": "value",
        "typeLabel": "string",
        "description": "Value at that index."
      },
      {
        "name": "disabled",
        "typeLabel": "boolean",
        "description": "Prevent this occurrence from being edited or removed."
      },
      {
        "name": "tone",
        "typeLabel": "neutral | accent | contrast | info | success | warning | danger",
        "description": "Independent tag palette.",
        "defaultLabel": "neutral"
      },
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "description": "Merge into one semantic child host; preserve props/ref.",
        "defaultLabel": "false"
      },
      {
        "name": "render",
        "typeLabel": "RenderProp",
        "description": "Render a custom host forwarding the owner props and ref."
      }
    ]
  },
  {
    "id": "props-items",
    "title": "Items",
    "description": "Convenience anatomy for the current collection.",
    "rows": [
      {
        "name": "tone",
        "typeLabel": "TagsInputItemTone",
        "description": "Apply a shared item palette.",
        "defaultLabel": "neutral"
      },
      {
        "name": "disabled",
        "typeLabel": "(value, index) => boolean",
        "description": "Lock selected occurrences."
      },
      {
        "name": "children",
        "typeLabel": "(value, index) => ReactNode",
        "description": "Custom text content, not another interactive token owner."
      },
      {
        "name": "className",
        "typeLabel": "string",
        "description": "Forwarded to each Item."
      },
      {
        "name": "style",
        "typeLabel": "CSSProperties",
        "description": "Forwarded to each Item for local token overrides."
      }
    ]
  },
  {
    "id": "props-item-context",
    "title": "ItemContext",
    "description": "Render access within one Item.",
    "rows": [
      {
        "name": "children",
        "typeLabel": "(state) => ReactNode",
        "description": "Receives index, value, id, editing, highlighted and disabled."
      }
    ]
  },
  {
    "id": "props-item-preview",
    "title": "ItemPreview",
    "description": "Visible tag, hidden during editing.",
    "rows": [
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "description": "Merge into one semantic child host; preserve props/ref.",
        "defaultLabel": "false"
      },
      {
        "name": "render",
        "typeLabel": "RenderProp",
        "description": "Render a custom host forwarding the owner props and ref."
      }
    ]
  },
  {
    "id": "props-item-text",
    "title": "ItemText",
    "description": "Tag text; visually truncates without changing the complete value.",
    "rows": [
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "description": "Merge into one semantic child host; preserve props/ref.",
        "defaultLabel": "false"
      },
      {
        "name": "render",
        "typeLabel": "RenderProp",
        "description": "Render a custom host forwarding the owner props and ref."
      }
    ]
  },
  {
    "id": "props-item-input",
    "title": "ItemInput",
    "description": "Native editor, sibling of ItemPreview.",
    "rows": [
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "description": "Merge into one semantic child host; preserve props/ref.",
        "defaultLabel": "false"
      },
      {
        "name": "render",
        "typeLabel": "RenderProp",
        "description": "Render a custom host forwarding the owner props and ref."
      }
    ]
  },
  {
    "id": "props-item-delete-trigger",
    "title": "ItemDeleteTrigger",
    "description": "Named removal action; native button or composed button.",
    "rows": [
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "description": "Merge into one semantic child host; preserve props/ref.",
        "defaultLabel": "false"
      },
      {
        "name": "render",
        "typeLabel": "RenderProp",
        "description": "Render a custom host forwarding the owner props and ref."
      }
    ]
  },
  {
    "id": "props-clear-trigger",
    "title": "ClearTrigger",
    "description": "Named clear action; disabled occurrences remain.",
    "rows": [
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "description": "Merge into one semantic child host; preserve props/ref.",
        "defaultLabel": "false"
      },
      {
        "name": "render",
        "typeLabel": "RenderProp",
        "description": "Render a custom host forwarding the owner props and ref."
      }
    ]
  },
  {
    "id": "props-hidden-input",
    "title": "HiddenInput",
    "description": "One native proxy serializing the committed array as JSON.",
    "rows": [
      {
        "name": "ref",
        "typeLabel": "Ref<HTMLInputElement>",
        "description": "Native form proxy ref; use Input's ref for visible focus."
      }
    ]
  }
];
export const sections = ownerSections(examples, parts);
