import type { DocsPropDefinition } from "../../shared/PropsTable.js";
import type { DocsSectionMetadata } from "../../shared/DocsTableOfContents.js";
import { RadioGroupBasic } from "./examples/RadioGroupBasic.js";
import basicSource from "./examples/RadioGroupBasic.tsx?raw";
import { RadioGroupControlled } from "./examples/RadioGroupControlled.js";
import controlledSource from "./examples/RadioGroupControlled.tsx?raw";
import { RadioGroupSizes } from "./examples/RadioGroupSizes.js";
import sizesSource from "./examples/RadioGroupSizes.tsx?raw";
import { RadioGroupVariants } from "./examples/RadioGroupVariants.js";
import variantsSource from "./examples/RadioGroupVariants.tsx?raw";
import { RadioGroupTones } from "./examples/RadioGroupTones.js";
import tonesSource from "./examples/RadioGroupTones.tsx?raw";
import { RadioGroupStates } from "./examples/RadioGroupStates.js";
import statesSource from "./examples/RadioGroupStates.tsx?raw";
import { RadioGroupLayout } from "./examples/RadioGroupLayout.js";
import layoutSource from "./examples/RadioGroupLayout.tsx?raw";
import { RadioGroupDensity } from "./examples/RadioGroupDensity.js";
import densitySource from "./examples/RadioGroupDensity.tsx?raw";
import { RadioGroupOpen } from "./examples/RadioGroupOpen.js";
import openSource from "./examples/RadioGroupOpen.tsx?raw";
import { RadioGroupIndicator } from "./examples/RadioGroupIndicator.js";
import indicatorSource from "./examples/RadioGroupIndicator.tsx?raw";
import { RadioGroupController } from "./examples/RadioGroupController.js";
import controllerSource from "./examples/RadioGroupController.tsx?raw";
import { RadioGroupNativeForm } from "./examples/RadioGroupNativeForm.js";
import nativeformSource from "./examples/RadioGroupNativeForm.tsx?raw";
import { RadioGroupResponsive } from "./examples/RadioGroupResponsive.js";
import responsiveSource from "./examples/RadioGroupResponsive.tsx?raw";
import { RadioGroupHookForm } from "./examples/RadioGroupHookForm.js";
import hookformSource from "./examples/RadioGroupHookForm.tsx?raw";
export const Basic = RadioGroupBasic;
export { basicSource };
export const examples = [
{ id: "controlled", title: "Controlled", description: "Pair value with onValueChange to own the selection.", Demo: RadioGroupControlled, source: controlledSource },
{ id: "sizes", title: "Sizes", description: "Use size for the shared selection-control scale.", Demo: RadioGroupSizes, source: sizesSource },
{ id: "variants", title: "Variants", description: "Choose solid, outline or subtle presentation.", Demo: RadioGroupVariants, source: variantsSource },
{ id: "tones", title: "Tones", description: "Use semantic tones. Neutral and contrast share the current selection palette; danger is not validation.", Demo: RadioGroupTones, source: tonesSource },
{ id: "states", title: "Disabled and read-only", description: "Disabled options cannot be selected. Read-only choices stay focusable and submitted.", Demo: RadioGroupStates, source: statesSource },
{ id: "orientation", title: "Orientation and spacing", description: "Use horizontal orientation and gap for a wrapping row of choices.", Demo: RadioGroupLayout, source: layoutSource },
{ id: "density", title: "Density and label placement", description: "Use compact targets and logical label placement when space is limited.", Demo: RadioGroupDensity, source: densitySource },
{ id: "open", title: "Descriptions and links", description: "Use native input parts for descriptions and independently interactive label links.", Demo: RadioGroupOpen, source: openSource },
{ id: "indicator", title: "Custom indicator", description: "Replace the checked dot with one decorative mark.", Demo: RadioGroupIndicator, source: indicatorSource },
{ id: "controller", title: "Controller", description: "Share one controller with RootProvider and external actions.", Demo: RadioGroupController, source: controllerSource },
{ id: "native-form", title: "Native form", description: "Use name for submission, required for validation, and reset to restore the initial value.", Demo: RadioGroupNativeForm, source: nativeformSource },
{ id: "responsive", title: "Responsive presentation and ref", description: "Change size and variant at breakpoints. Open input refs reach the native radio.", Demo: RadioGroupResponsive, source: responsiveSource },
{ id: "hook-form", title: "React Hook Form", description: "Connect Controller to value and onValueChange. Install react-hook-form separately.", Demo: RadioGroupHookForm, source: hookformSource },
];
export const propGroups: { id: string; title: string; description: string; rows: DocsPropDefinition<Record<string, unknown>>[] }[] = [
{"id":"props-root","title":"Root","description":"Root and RootProvider share presentation; RootProvider takes controller instead of value props.","rows":[{"name":"size","typeLabel":"ResponsiveValue<RadioGroupSize>","defaultLabel":"\"md\"","description":"xs, sm, md or lg."},{"name":"variant","typeLabel":"ResponsiveValue<RadioGroupVariant>","defaultLabel":"\"solid\"","description":"solid, outline or subtle."},{"name":"tone","typeLabel":"RadioGroupTone","defaultLabel":"\"accent\"","description":"accent, neutral, contrast, info, success, warning or danger."},{"name":"density","typeLabel":"\"comfortable\" | \"compact\"","defaultLabel":"\"comfortable\"","description":"Target spacing; compact retains a 24px minimum."},{"name":"labelPlacement","typeLabel":"\"start\" | \"end\"","defaultLabel":"\"end\"","description":"Logical position of the option text."},{"name":"gap","typeLabel":"ResponsiveValue<SpacingValue>","defaultLabel":"—","description":"Spacing between direct options."},{"name":"orientation","typeLabel":"\"vertical\" | \"horizontal\"","defaultLabel":"\"vertical\"","description":"Layout and directional keyboard navigation."},{"name":"value","typeLabel":"string","defaultLabel":"—","description":"Controlled value; stable nonempty item values are required."},{"name":"defaultValue","typeLabel":"string","defaultLabel":"\"\"","description":"Initial uncontrolled selection."},{"name":"onValueChange","typeLabel":"(value: string) => void","defaultLabel":"—","description":"Receives the selected value."},{"name":"disabled","typeLabel":"boolean","defaultLabel":"false","description":"Disables every option."},{"name":"readOnly","typeLabel":"boolean","defaultLabel":"false","description":"Prevents changes while preserving focus and submission."},{"name":"required","typeLabel":"boolean","defaultLabel":"false","description":"Requires an available selected option."},{"name":"invalid","typeLabel":"boolean","defaultLabel":"false","description":"Sets error semantics and boundary styling."},{"name":"validationBehavior","typeLabel":"\"native\" | \"inline\"","defaultLabel":"\"native\"","description":"Native validity or application-managed feedback."},{"name":"name","typeLabel":"string","defaultLabel":"—","description":"Native submission name."},{"name":"form","typeLabel":"string","defaultLabel":"—","description":"External form ID."},{"name":"loop","typeLabel":"boolean","defaultLabel":"true","description":"Wrap directional navigation."},{"name":"asChild","typeLabel":"boolean","defaultLabel":"false","description":"Compose the group host."}]},
{"id":"props-item","title":"Item","description":"Closed button convenience with one automatic mark. Children must be noninteractive. Supports group presentation overrides.","rows":[{"name":"value","typeLabel":"string","defaultLabel":"—","description":"Unique nonempty option value."},{"name":"disabled","typeLabel":"boolean","defaultLabel":"false","description":"Make this choice unavailable."},{"name":"indicator","typeLabel":"ReactNode","defaultLabel":"—","description":"Replace the checked dot."},{"name":"asChild","typeLabel":"boolean","defaultLabel":"false","description":"Compose a button-compatible host; ref remains a button."}]},
{"id":"props-item-root","title":"ItemRoot","description":"Noninteractive option wrapper. Add exactly one ItemHiddenInput, ItemControl/ItemIndicator and ItemText.","rows":[{"name":"value","typeLabel":"string","defaultLabel":"—","description":"Unique nonempty option value."},{"name":"disabled","typeLabel":"boolean","defaultLabel":"false","description":"Disable this option."},{"name":"size","typeLabel":"ResponsiveValue<RadioGroupSize>","defaultLabel":"inherited","description":"Override group size; variant, tone, density and labelPlacement also inherit."}]},
{"id":"props-input","title":"ItemHiddenInput","description":"Native input props and ref; value, checked, name and state belong to Root/ItemRoot.","rows":[{"name":"ref","typeLabel":"Ref<HTMLInputElement>","defaultLabel":"—","description":"Access the native radio."},{"name":"aria-label","typeLabel":"string","defaultLabel":"—","description":"Optional explicit name instead of ItemText."},{"name":"onChange","typeLabel":"ChangeEventHandler<HTMLInputElement>","defaultLabel":"—","description":"Native change callback; preventDefault cancels selection."}]},
{"id":"props-parts","title":"Label and item parts","description":"Label names the group. ItemText names the radio; ItemDescription describes it. ItemControl is decorative and forwards clicks to the input.","rows":[{"name":"children","typeLabel":"ReactNode","defaultLabel":"—","description":"Part content. ItemIndicator children replace the checked dot."},{"name":"asChild","typeLabel":"boolean","defaultLabel":"false","description":"Compose a compatible host; do not give control/indicator a second role or Tab stop."}]},
{"id":"props-controller","title":"Controller and contexts","description":"useRadioGroup options match Atom Root behavior; RootProvider adds Brick presentation. Context and ItemContext use render-function children.","rows":[{"name":"controller","typeLabel":"RadioGroupController","defaultLabel":"—","description":"Pass the object returned by useRadioGroup to RootProvider."},{"name":"setValue","typeLabel":"(value: string) => void","defaultLabel":"—","description":"Select from an external action; disabled/read-only guards apply."},{"name":"reset","typeLabel":"() => void","defaultLabel":"—","description":"Restore the controller default."},{"name":"children","typeLabel":"(state) => ReactNode","defaultLabel":"—","description":"Read group or item state through Context/ItemContext."}]},
];
export const sections: DocsSectionMetadata[] = [{ id: "usage", title: "Usage", level: 2 }, { id: "examples", title: "Examples", level: 2 }, ...examples.map(({id,title}) => ({id,title,level:3 as const})), {id:"props",title:"Props",level:2}, ...propGroups.map(({id,title}) => ({id,title,level:3 as const}))];
