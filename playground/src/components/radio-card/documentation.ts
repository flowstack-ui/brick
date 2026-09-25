import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { RadioCardSizes } from "./examples/RadioCardSizes.js";
import SizesSource from "./examples/RadioCardSizes.tsx?raw";
import { RadioCardVariants } from "./examples/RadioCardVariants.js";
import VariantsSource from "./examples/RadioCardVariants.tsx?raw";
import { RadioCardTones } from "./examples/RadioCardTones.js";
import TonesSource from "./examples/RadioCardTones.tsx?raw";
import { RadioCardStates } from "./examples/RadioCardStates.js";
import StatesSource from "./examples/RadioCardStates.tsx?raw";
import { RadioCardAddon } from "./examples/RadioCardAddon.js";
import AddonSource from "./examples/RadioCardAddon.tsx?raw";
import { RadioCardNoIndicator } from "./examples/RadioCardNoIndicator.js";
import NoIndicatorSource from "./examples/RadioCardNoIndicator.tsx?raw";
import { RadioCardControlled } from "./examples/RadioCardControlled.js";
import ControlledSource from "./examples/RadioCardControlled.tsx?raw";
import { RadioCardController } from "./examples/RadioCardController.js";
import ControllerSource from "./examples/RadioCardController.tsx?raw";
import { RadioCardAttached } from "./examples/RadioCardAttached.js";
import AttachedSource from "./examples/RadioCardAttached.tsx?raw";
import { RadioCardCustomIndicator } from "./examples/RadioCardCustomIndicator.js";
import CustomIndicatorSource from "./examples/RadioCardCustomIndicator.tsx?raw";
import { RadioCardResponsive } from "./examples/RadioCardResponsive.js";
import ResponsiveSource from "./examples/RadioCardResponsive.tsx?raw";
import { RadioCardForm } from "./examples/RadioCardForm.js";
import FormSource from "./examples/RadioCardForm.tsx?raw";
import { RadioCardAlignment } from "./examples/RadioCardAlignment.js";
import AlignmentSource from "./examples/RadioCardAlignment.tsx?raw";
export const examples: OwnerExample[] = [
{id:"sizes",title:"Sizes",description:"Size coordinates inset, text and the circular indicator.",Demo:RadioCardSizes,source:SizesSource},
{id:"variants",title:"Variants",description:"Each variant has its own resting and selected treatment.",Demo:RadioCardVariants,source:VariantsSource},
{id:"tones",title:"Tones",description:"Use shared form tones. Neutral and contrast share the current monochrome selection palette.",Demo:RadioCardTones,source:TonesSource},
{id:"states",title:"States",description:"Disabled prevents interaction; read-only preserves focus and submission. Invalid marks validation.",Demo:RadioCardStates,source:StatesSource},
{id:"addon",title:"Addon",description:"Keep supporting metadata in a separate addon region.",Demo:RadioCardAddon,source:AddonSource},
{id:"no-indicator",title:"No Indicator",description:"Use icons and vertical content without a visible radio mark.",Demo:RadioCardNoIndicator,source:NoIndicatorSource},
{id:"controlled",title:"Controlled",description:"Keep the selected value in application state.",Demo:RadioCardControlled,source:ControlledSource},
{id:"controller",title:"Controller",description:"Share a controller with RootProvider and read selection through Context.",Demo:RadioCardController,source:ControllerSource},
{id:"attached",title:"Attached",description:"Compose adjacent options with Group attached.",Demo:RadioCardAttached,source:AttachedSource},
{id:"custom-indicator",title:"Custom Indicator",description:"Replace checked artwork and place it before the content.",Demo:RadioCardCustomIndicator,source:CustomIndicatorSource},
{id:"responsive",title:"Responsive",description:"Change visual recipes without changing the group's keyboard orientation.",Demo:RadioCardResponsive,source:ResponsiveSource},
{id:"form",title:"Form",description:"Use Fieldset for required validation and native submission/reset.",Demo:RadioCardForm,source:FormSource},
{id:"alignment",title:"Alignment",description:"Align content independently of option arrangement.",Demo:RadioCardAlignment,source:AlignmentSource},
];
export const parts: OwnerPart[] = [
  {
    "title": "Root",
    "id": "props-root",
    "description": "Single-selection group and shared card recipes.",
    "rows": [
      {
        "name": "value / defaultValue",
        "typeLabel": "string",
        "defaultLabel": "—",
        "description": "Controlled or initial selected value."
      },
      {
        "name": "onValueChange",
        "typeLabel": "(value: string) => void",
        "defaultLabel": "—",
        "description": "Receives the selected option value."
      },
      {
        "name": "size",
        "typeLabel": "ResponsiveValue<\"sm\" | \"md\" | \"lg\">",
        "defaultLabel": "\"md\"",
        "description": "Coordinates inset, type and indicator."
      },
      {
        "name": "variant",
        "typeLabel": "ResponsiveValue<\"outline\" | \"surface\" | \"subtle\" | \"solid\">",
        "defaultLabel": "\"outline\"",
        "description": "Selected and resting paint."
      },
      {
        "name": "tone",
        "typeLabel": "RadioCardTone",
        "defaultLabel": "\"accent\"",
        "description": "Shared form tone; independent of validation."
      },
      {
        "name": "radius",
        "typeLabel": "Radius",
        "defaultLabel": "surface",
        "description": "Token-only card corners."
      },
      {
        "name": "orientation",
        "typeLabel": "\"horizontal\" | \"vertical\"",
        "defaultLabel": "\"horizontal\"",
        "description": "Scalar keyboard navigation axis."
      },
      {
        "name": "contentOrientation",
        "typeLabel": "ResponsiveValue<\"horizontal\" | \"vertical\">",
        "defaultLabel": "orientation",
        "description": "Internal content layout only."
      },
      {
        "name": "align / justify",
        "typeLabel": "ResponsiveValue<\"start\" | \"center\" | \"end\">",
        "defaultLabel": "\"start\"",
        "description": "Logical content alignment."
      },
      {
        "name": "disabled / readOnly / required / invalid",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Availability and group validation."
      },
      {
        "name": "name / form",
        "typeLabel": "string",
        "defaultLabel": "—",
        "description": "Native submission name and optional external form ID."
      },
      {
        "name": "dir / loop",
        "typeLabel": "\"ltr\" | \"rtl\" / boolean",
        "defaultLabel": "inherited / true",
        "description": "Direction and arrow-key wrapping."
      },
      {
        "name": "asChild / render",
        "typeLabel": "boolean / RenderProp",
        "defaultLabel": "—",
        "description": "Compose the group host while preserving behavior."
      }
    ]
  },
  {
    "title": "Item",
    "id": "props-item",
    "description": "Whole-label option. Compose exactly one HiddenInput.",
    "rows": [
      {
        "name": "value",
        "typeLabel": "string",
        "defaultLabel": "required",
        "description": "Unique option value."
      },
      {
        "name": "disabled",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Disables this option."
      },
      {
        "name": "ids",
        "typeLabel": "{ input?, title?, description? }",
        "defaultLabel": "generated",
        "description": "Stable semantic part IDs."
      },
      {
        "name": "ref",
        "typeLabel": "Ref<HTMLLabelElement>",
        "defaultLabel": "—",
        "description": "The card label, not its input."
      },
      {
        "name": "asChild / render",
        "typeLabel": "boolean / RenderProp",
        "defaultLabel": "—",
        "description": "Must preserve valid label/input semantics."
      }
    ]
  },
  {
    "title": "HiddenInput",
    "id": "props-input",
    "description": "Required native radio and focus target; do not hide from accessibility.",
    "rows": [
      {
        "name": "ref",
        "typeLabel": "Ref<HTMLInputElement>",
        "defaultLabel": "—",
        "description": "Native input ref."
      },
      {
        "name": "native input props",
        "typeLabel": "InputHTMLAttributes",
        "defaultLabel": "—",
        "description": "Events and ARIA overrides. Selection/name/form come from Root and Item."
      }
    ]
  },
  {
    "title": "Indicator",
    "id": "props-indicator",
    "description": "Optional decorative radio mark.",
    "rows": [
      {
        "name": "checked",
        "typeLabel": "ReactElement",
        "defaultLabel": "—",
        "description": "Artwork rendered only while checked."
      },
      {
        "name": "children",
        "typeLabel": "ReactNode",
        "defaultLabel": "dot",
        "description": "Custom artwork replacing the dot; hidden unchecked."
      }
    ]
  },
  {
    "title": "RootProvider",
    "id": "props-provider",
    "description": "Controlled group with the same presentation props.",
    "rows": [
      {
        "name": "value",
        "typeLabel": "RadioCardController",
        "defaultLabel": "required",
        "description": "Controller returned by useRadioCard; owner handles reset."
      }
    ]
  },
  {
    "title": "Context and ItemContext",
    "id": "props-context",
    "description": "Read group or individual option state without another store.",
    "rows": [
      {
        "name": "children",
        "typeLabel": "(state) => ReactNode",
        "defaultLabel": "required",
        "description": "Group exposes activeValue; item exposes checked, disabled, readOnly and focus."
      }
    ]
  },
  {
    "title": "Label, Title and Description",
    "id": "props-labels",
    "description": "Group name, concise option name and supporting description respectively.",
    "rows": [
      {
        "name": "asChild / render",
        "typeLabel": "boolean / RenderProp",
        "defaultLabel": "—",
        "description": "Passive semantic host composition."
      }
    ]
  },
  {
    "title": "Control, Content and Addon",
    "id": "props-regions",
    "description": "Control owns inset; Content stacks copy; Addon holds supporting metadata.",
    "rows": [
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Merge onto one passive host."
      },
      {
        "name": "render (Control)",
        "typeLabel": "RenderProp",
        "defaultLabel": "—",
        "description": "Control host rendering. Content/Addon support asChild."
      }
    ]
  }
];
export const sections = ownerSections(examples, parts, true);
