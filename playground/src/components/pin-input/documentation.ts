import type {OwnerExample,OwnerPart} from "../../shared/OwnerDocumentation.js";
import type {DocsSectionMetadata} from "../../shared/DocsTableOfContents.js";
import {PinInputBasic} from "./examples/PinInputBasic.js";
import BasicSource from "./examples/PinInputBasic.tsx?raw";
import {PinInputOtp} from "./examples/PinInputOtp.js";
import OtpSource from "./examples/PinInputOtp.tsx?raw";
import {PinInputMask} from "./examples/PinInputMask.js";
import MaskSource from "./examples/PinInputMask.tsx?raw";
import {PinInputPlaceholder} from "./examples/PinInputPlaceholder.js";
import PlaceholderSource from "./examples/PinInputPlaceholder.tsx?raw";
import {PinInputAttached} from "./examples/PinInputAttached.js";
import AttachedSource from "./examples/PinInputAttached.tsx?raw";
import {PinInputResponsive} from "./examples/PinInputResponsive.js";
import ResponsiveSource from "./examples/PinInputResponsive.tsx?raw";
import {PinInputSizes} from "./examples/PinInputSizes.js";
import SizesSource from "./examples/PinInputSizes.tsx?raw";
import {PinInputVariants} from "./examples/PinInputVariants.js";
import VariantsSource from "./examples/PinInputVariants.tsx?raw";
import {PinInputTones} from "./examples/PinInputTones.js";
import TonesSource from "./examples/PinInputTones.tsx?raw";
import {PinInputTypes} from "./examples/PinInputTypes.js";
import TypesSource from "./examples/PinInputTypes.tsx?raw";
import {PinInputSeparator} from "./examples/PinInputSeparator.js";
import SeparatorSource from "./examples/PinInputSeparator.tsx?raw";
import {PinInputField} from "./examples/PinInputField.js";
import FieldSource from "./examples/PinInputField.tsx?raw";
import {PinInputControlled} from "./examples/PinInputControlled.js";
import ControlledSource from "./examples/PinInputControlled.tsx?raw";
import {PinInputStore} from "./examples/PinInputStore.js";
import StoreSource from "./examples/PinInputStore.tsx?raw";
import {PinInputSanitizer} from "./examples/PinInputSanitizer.js";
import SanitizerSource from "./examples/PinInputSanitizer.tsx?raw";
import {PinInputCompletion} from "./examples/PinInputCompletion.js";
import CompletionSource from "./examples/PinInputCompletion.tsx?raw";
import {PinInputLocale} from "./examples/PinInputLocale.js";
import LocaleSource from "./examples/PinInputLocale.tsx?raw";
import {PinInputStates} from "./examples/PinInputStates.js";
import StatesSource from "./examples/PinInputStates.tsx?raw";
import {PinInputHookForm} from "./examples/PinInputHookForm.js";
import HookFormSource from "./examples/PinInputHookForm.tsx?raw";
import {PinInputNativeForm} from "./examples/PinInputNativeForm.js";
import NativeFormSource from "./examples/PinInputNativeForm.tsx?raw";
export const Basic=PinInputBasic;
export const basicSource=BasicSource;
export const examples:OwnerExample[]=[
{id:"otp",title:"One-time code",description:"Opt into platform OTP suggestions; availability depends on the device.",Demo:PinInputOtp,source:OtpSource},
{id:"mask",title:"Mask",description:"Use native password masking for visual privacy.",Demo:PinInputMask,source:MaskSource},
{id:"placeholder",title:"Placeholder",description:"Customize the empty-cell placeholder.",Demo:PinInputPlaceholder,source:PlaceholderSource},
{id:"attached",title:"Attached",description:"Join cells without changing value or keyboard order.",Demo:PinInputAttached,source:AttachedSource},
{id:"responsive",title:"Responsive recipes",description:"Resize to change size and restore complete paint at each breakpoint.",Demo:PinInputResponsive,source:ResponsiveSource},
{id:"sizes",title:"Sizes",description:"Default lg matches our fields; md is a compact 40px comparison.",Demo:PinInputSizes,source:SizesSource},
{id:"variants",title:"Variants",description:"Choose the same seven recipes as other form fields.",Demo:PinInputVariants,source:VariantsSource},
{id:"tones",title:"Tones",description:"Neutral and accent affect interaction colors; errors remain semantic.",Demo:PinInputTones,source:TonesSource},
{id:"types",title:"Character types",description:"Allow digits, letters, or both.",Demo:PinInputTypes,source:TypesSource},
{id:"separator",title:"With separator",description:"Keep three-cell runs together with a decorative separator.",Demo:PinInputSeparator,source:SeparatorSource},
{id:"field",title:"Field",description:"Inherit label, description, required and invalid state.",Demo:PinInputField,source:FieldSource},
{id:"controlled",title:"Controlled",description:"Keep the string array intact so empty positions survive.",Demo:PinInputControlled,source:ControlledSource},
{id:"store",title:"Store",description:"Use the public controller for deliberate external actions.",Demo:PinInputStore,source:StoreSource},
{id:"sanitizer",title:"Formatted paste",description:"Strip spaces and dashes before validating the whole paste.",Demo:PinInputSanitizer,source:SanitizerSource},
{id:"completion",title:"Completion",description:"Completion can blur without implicitly submitting a form.",Demo:PinInputCompletion,source:CompletionSource},
{id:"locale",title:"Localized labels",description:"Translate cell labels and preserve logical RTL order.",Demo:PinInputLocale,source:LocaleSource},
{id:"states",title:"States",description:"Disabled fades once; read-only remains readable; errors retain visible focus.",Demo:PinInputStates,source:StatesSource},
{id:"hookform",title:"Hook Form",description:"Use Controller with array values; Root already owns the hidden form value.",Demo:PinInputHookForm,source:HookFormSource},
{id:"nativeform",title:"Native form",description:"Submit one named value and reset all cells together.",Demo:PinInputNativeForm,source:NativeFormSource},
];
const recipes=[{name:"size",typeLabel:"ResponsiveControlSize",defaultLabel:"lg",description:"Seven shared square control sizes."},{name:"variant",typeLabel:"ResponsiveFieldVariant",defaultLabel:"outline",description:"outline, surface, soft, subtle, ghost, plain or underline; supports breakpoint maps."},{name:"tone",typeLabel:"neutral | accent",defaultLabel:"accent",description:"Interaction palette; invalid overrides it."},{name:"layout",typeLabel:"separated | attached",defaultLabel:"separated",description:"Join cells within each run."},{name:"radius",typeLabel:"Radius",description:"Token radius; mutually exclusive with shape, underline and responsive variants."}];
export const parts:OwnerPart[]=[
{id:"props-root",title:"Root",description:"Behavior and visual owner; automatically renders the named hidden value.",rows:[...recipes,{name:"length",typeLabel:"number",defaultLabel:"6",description:"Render exactly this many cells."},{name:"value / defaultValue",typeLabel:"string[]",description:"Preserve empty positions."},{name:"onValueChange",typeLabel:"(details) => void",description:"Receives value, valueAsString and complete."},{name:"onComplete",typeLabel:"(code: string) => void",description:"Accepted changed complete value after commit."},{name:"type / pattern",typeLabel:"numeric | alphabetic | alphanumeric / RegExp",description:"ASCII mode or custom per-character matcher."},{name:"otp / mask / placeholder",typeLabel:"boolean / boolean | string / string",description:"Explicit OTP, native or visual masking and empty-cell text."},{name:"sanitizeValue / onValueInvalid",typeLabel:"functions",description:"Transform paste, then report atomic rejection."},{name:"disabled / readOnly / required / invalid",typeLabel:"boolean",description:"Inherit Field unless explicitly overridden."},{name:"name / form / inputId",typeLabel:"string",description:"Submission and first-cell association."},{name:"autoFocus / autoSubmit / blurOnComplete / selectOnFocus",typeLabel:"boolean",description:"Explicit focus/submission policy; only selectOnFocus defaults true."},{name:"getInputLabel / translations",typeLabel:"function / object",description:"Localize cell, group and required messages."}]},
{id:"props-root-provider",title:"RootProvider",description:"Use the controller returned by usePinInput; shares Root recipes.",rows:[...recipes,{name:"value",typeLabel:"PinInputController",description:"Create the hook inside Field/Form/Direction providers."}]},
{id:"props-control",title:"Control",description:"Wrapping layout for cells or grouped runs.",rows:[{name:"asChild / render",typeLabel:"boolean / RenderProp",description:"Preserve Atom host behavior and refs."}]},
{id:"props-group",title:"Group",description:"Static div keeping one run together. No extra behavioral owner.",rows:[{name:"children",typeLabel:"ReactNode",description:"Adjacent Input parts; avoid wrappers between attached cells."}]},
{id:"props-input",title:"Input",description:"Native cell and actual-host ref.",rows:[{name:"index",typeLabel:"number",description:"Explicit position or registered render order."},{name:"asChild / render",typeLabel:"boolean / RenderProp",description:"Project onto one native input."}]},
{id:"props-label",title:"Label",description:"Associated native label.",rows:[{name:"children",typeLabel:"ReactNode",description:"Visible group name."}]},
{id:"props-separator",title:"Separator",description:"Decorative separator; does not split the value.",rows:[{name:"children",typeLabel:"ReactNode",defaultLabel:"–",description:"Custom separator artwork."}]},
{id:"props-context",title:"Context",description:"Renderless access to the controller.",rows:[{name:"children",typeLabel:"(controller) => ReactNode",description:"Read values or compose explicit actions."}]},
];
export const sections:DocsSectionMetadata[]=[{id:"usage",title:"Usage",level:2},{id:"examples",title:"Examples",level:2},...examples.map(({id,title})=>({id,title,level:3 as const})),{id:"props",title:"Props",level:2},...parts.map(({id,title})=>({id,title,level:3 as const}))];
