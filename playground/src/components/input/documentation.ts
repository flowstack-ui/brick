import type { InputProps, InputAddonProps } from "@flowstack-ui/brick";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";
import type { DocsSectionMetadata } from "../../shared/DocsTableOfContents.js";
import { InputBasic } from "./examples/InputBasic.js";
import InputBasicSource from "./examples/InputBasic.tsx?raw";
import { InputVariants } from "./examples/InputVariants.js";
import InputVariantsSource from "./examples/InputVariants.tsx?raw";
import { InputSizes } from "./examples/InputSizes.js";
import InputSizesSource from "./examples/InputSizes.tsx?raw";
import { InputStates } from "./examples/InputStates.js";
import InputStatesSource from "./examples/InputStates.tsx?raw";
import { InputElements } from "./examples/InputElements.js";
import InputElementsSource from "./examples/InputElements.tsx?raw";
import { InputAddons } from "./examples/InputAddons.js";
import InputAddonsSource from "./examples/InputAddons.tsx?raw";
import { InputClear } from "./examples/InputClear.js";
import InputClearSource from "./examples/InputClear.tsx?raw";
import { InputCounter } from "./examples/InputCounter.js";
import InputCounterSource from "./examples/InputCounter.tsx?raw";
import { InputResponsive } from "./examples/InputResponsive.js";
import InputResponsiveSource from "./examples/InputResponsive.tsx?raw";
import { InputNativeForm } from "./examples/InputNativeForm.js";
import InputNativeFormSource from "./examples/InputNativeForm.tsx?raw";
import { InputHookForm } from "./examples/InputHookForm.js";
import InputHookFormSource from "./examples/InputHookForm.tsx?raw";
import { InputMask } from "./examples/InputMask.js";
import InputMaskSource from "./examples/InputMask.tsx?raw";
import { InputPayment } from "./examples/InputPayment.js";
import InputPaymentSource from "./examples/InputPayment.tsx?raw";
import { InputDomainSelect } from "./examples/InputDomainSelect.js";
import InputDomainSelectSource from "./examples/InputDomainSelect.tsx?raw";
import { InputCardNumber } from "./examples/InputCardNumber.js";
import InputCardNumberSource from "./examples/InputCardNumber.tsx?raw";
export const Basic = InputBasic;
export const basicSource = InputBasicSource;
export const examples = [
{ id: "variants", title: "Variants", description: "Use a recipe that fits the surrounding form.", Demo: InputVariants, source: InputVariantsSource },
{ id: "sizes", title: "Sizes", description: "Seven sizes share geometry with the other form controls.", Demo: InputSizes, source: InputSizesSource },
{ id: "states", title: "Helper text and states", description: "Field owns labels, descriptions and validation messages.", Demo: InputStates, source: InputStatesSource },
{ id: "elements", title: "Interior elements", description: "Use logical adornments for icons, text and shortcuts inside the field.", Demo: InputElements, source: InputElementsSource },
{ id: "addons", title: "Addons and attached actions", description: "Use InputAddon outside the input boundary, or attach a real Button.", Demo: InputAddons, source: InputAddonsSource },
{ id: "select", title: "Select element", description: "Compose an independently named native select inside the input boundary.", Demo: InputDomainSelect, source: InputDomainSelectSource },
{ id: "clear", title: "Clear button", description: "Offer an explicitly named clear action.", Demo: InputClear, source: InputClearSource },
{ id: "counter", title: "Controlled value and counter", description: "Keep the application value controlled and describe its length.", Demo: InputCounter, source: InputCounterSource },
{ id: "responsive", title: "Responsive recipes", description: "Size and variant can follow the shared breakpoints.", Demo: InputResponsive, source: InputResponsiveSource },
{ id: "native-form", title: "Native form", description: "Submit and reset through the native form contract.", Demo: InputNativeForm, source: InputNativeFormSource },
{ id: "hook-form", title: "React Hook Form", description: "Optional integration: install react-hook-form separately. Controller connects one value owner.", Demo: InputHookForm, source: InputHookFormSource },
{ id: "mask", title: "Input mask", description: "Optional integration: install use-mask-input separately. This example uses one national phone format.", Demo: InputMask, source: InputMaskSource },
{ id: "payment", title: "Card formatting", description: "Optional integration: install react-payment-inputs separately. This is not a payment processor or secure hosted-field integration.", Demo: InputPayment, source: InputPaymentSource },
{ id: "card-number", title: "Card number", description: "Use the formatting library's artwork to identify the detected card type. Install react-payment-inputs separately.", Demo: InputCardNumber, source: InputCardNumberSource },
];
export const inputRows: DocsPropDefinition<InputProps>[] = [
 {name:"variant",typeLabel:"ResponsiveValue<InputVariant>",defaultLabel:'"outline"',description:"outline, surface, soft, subtle, ghost, plain or underline. Responsive variants exclude explicit radius/shape."},
 {name:"size",typeLabel:"ResponsiveValue<ControlSize>",defaultLabel:'"lg"',description:"2xs, xs, sm, md, lg, xl or 2xl."},
 {name:"radius",typeLabel:"Radius",description:"Token-based corners; not combined with shape or underline."},
 {name:"fullWidth",typeLabel:"boolean",defaultLabel:"true",description:"Fill the available inline width."},
 {name:"startAdornment",typeLabel:"ReactNode",description:"Content inside the logical start; name interactive content independently."},
 {name:"endAdornment",typeLabel:"ReactNode",description:"Content inside the logical end, before the clear action."},
 {name:"clearable",typeLabel:"boolean",defaultLabel:"false",description:"Offer Atom's clear action."},
 {name:"clearLabel",typeLabel:"string",description:"Localized accessible name for clearing."},
 {name:"onValueChange",typeLabel:"(value: string) => void",description:"Observe or control the native value."},
 {name:"inputClassName",typeLabel:"string",description:"Native input class; className targets the painted wrapper."},
 {name:"inputStyle",typeLabel:"CSSProperties",description:"Native input style; style targets the painted wrapper."}
];
export const addonRows: DocsPropDefinition<InputAddonProps>[] = [
 {name:"size",typeLabel:"ResponsiveValue<ControlSize>",defaultLabel:'"lg"',description:"Match the input's size explicitly."},
 {name:"variant",typeLabel:"ResponsiveValue<FieldVariant>",defaultLabel:'"outline"',description:"Match the field recipe. The addon is noninteractive."}
];
export const sections: DocsSectionMetadata[] = [
 {id:"usage",title:"Usage",level:2},{id:"examples",title:"Examples",level:2},
 ...examples.map(({id,title})=>({id,title,level:3 as const})),
 {id:"props",title:"Props",level:2},{id:"props-input",title:"Input",level:3},{id:"props-addon",title:"InputAddon",level:3}
];
