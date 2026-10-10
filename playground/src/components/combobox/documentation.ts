import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { ComboboxAnimation } from "./examples/ComboboxAnimation.js";
import AnimationSource from "./examples/ComboboxAnimation.tsx?raw";
import { ComboboxArtwork } from "./examples/ComboboxArtwork.js";
import ArtworkSource from "./examples/ComboboxArtwork.tsx?raw";
import { ComboboxRichItems } from "./examples/ComboboxRichItems.js";
import RichItemsSource from "./examples/ComboboxRichItems.tsx?raw";
import { ComboboxDialog } from "./examples/ComboboxDialog.js";
import DialogSource from "./examples/ComboboxDialog.tsx?raw";
import { ComboboxCreatable } from "./examples/ComboboxCreatable.js";
import CreatableSource from "./examples/ComboboxCreatable.tsx?raw";
import { ComboboxHookForm } from "./examples/ComboboxHookForm.js";
import HookFormSource from "./examples/ComboboxHookForm.tsx?raw";
import { ComboboxVirtual } from "./examples/ComboboxVirtual.js";
import VirtualSource from "./examples/ComboboxVirtual.tsx?raw";
import { ComboboxSizes } from "./examples/ComboboxSizes.js";
import SizesSource from "./examples/ComboboxSizes.tsx?raw";
import { ComboboxVariants } from "./examples/ComboboxVariants.js";
import VariantsSource from "./examples/ComboboxVariants.tsx?raw";
import { ComboboxResponsive } from "./examples/ComboboxResponsive.js";
import ResponsiveSource from "./examples/ComboboxResponsive.tsx?raw";
import { ComboboxOpen } from "./examples/ComboboxOpen.js";
import OpenSource from "./examples/ComboboxOpen.tsx?raw";
import { ComboboxField } from "./examples/ComboboxField.js";
import FieldSource from "./examples/ComboboxField.tsx?raw";
import { ComboboxRehydrate } from "./examples/ComboboxRehydrate.js";
import RehydrateSource from "./examples/ComboboxRehydrate.tsx?raw";
import { ComboboxAsync } from "./examples/ComboboxAsync.js";
import AsyncSource from "./examples/ComboboxAsync.tsx?raw";
import { ComboboxCustomFilter } from "./examples/ComboboxCustomFilter.js";
import CustomFilterSource from "./examples/ComboboxCustomFilter.tsx?raw";
import { ComboboxNativeForm } from "./examples/ComboboxNativeForm.js";
import NativeFormSource from "./examples/ComboboxNativeForm.tsx?raw";
import { ComboboxBasic } from "./examples/ComboboxBasic.js";
import BasicSource from "./examples/ComboboxBasic.tsx?raw";
import { ComboboxClick } from "./examples/ComboboxClick.js";
import ClickSource from "./examples/ComboboxClick.tsx?raw";
import { ComboboxMinimum } from "./examples/ComboboxMinimum.js";
import MinimumSource from "./examples/ComboboxMinimum.tsx?raw";
import { ComboboxDisabled } from "./examples/ComboboxDisabled.js";
import DisabledSource from "./examples/ComboboxDisabled.tsx?raw";
import { ComboboxDisabledItem } from "./examples/ComboboxDisabledItem.js";
import DisabledItemSource from "./examples/ComboboxDisabledItem.tsx?raw";
import { ComboboxInvalid } from "./examples/ComboboxInvalid.js";
import InvalidSource from "./examples/ComboboxInvalid.tsx?raw";
import { ComboboxFreeSolo } from "./examples/ComboboxFreeSolo.js";
import FreeSoloSource from "./examples/ComboboxFreeSolo.tsx?raw";
import { ComboboxReadonly } from "./examples/ComboboxReadonly.js";
import ReadonlySource from "./examples/ComboboxReadonly.tsx?raw";
import { ComboboxLimit } from "./examples/ComboboxLimit.js";
import LimitSource from "./examples/ComboboxLimit.tsx?raw";
import { ComboboxCustomObjects } from "./examples/ComboboxCustomObjects.js";
import CustomObjectsSource from "./examples/ComboboxCustomObjects.tsx?raw";
import { ComboboxMultiple } from "./examples/ComboboxMultiple.js";
import MultipleSource from "./examples/ComboboxMultiple.tsx?raw";
import { ComboboxControlled } from "./examples/ComboboxControlled.js";
import ControlledSource from "./examples/ComboboxControlled.tsx?raw";
import { ComboboxControllerExample } from "./examples/ComboboxController.js";
import ControllerSource from "./examples/ComboboxController.tsx?raw";
import { ComboboxHighlight } from "./examples/ComboboxHighlight.js";
import HighlightSource from "./examples/ComboboxHighlight.tsx?raw";
import { ComboboxLinks } from "./examples/ComboboxLinks.js";
import LinksSource from "./examples/ComboboxLinks.tsx?raw";
import { ComboboxInputBehavior } from "./examples/ComboboxInputBehavior.js";
import InputBehaviorSource from "./examples/ComboboxInputBehavior.tsx?raw";
export const examples: OwnerExample[] = [
{id:"basic", title:"Basic",description:"Search and select one framework.", Demo:ComboboxBasic,source:BasicSource},
{ id:"sizes",title:"Sizes",description:"Choose from the shared seven-size form scale.",Demo:ComboboxSizes,source:SizesSource },
{ id:"variants",title:"Variants",description:"Match the seven form-field recipes without changing selection behavior.",Demo:ComboboxVariants,source:VariantsSource },
{id:"multiple", title:"Multiple selection",description:"Select several values and remove them with Chip actions.", Demo:ComboboxMultiple,source:MultipleSource},
{ id:"async",title:"Async loading",description:"Cancel stale application requests when the query changes. This demo uses deterministic local data.",Demo:ComboboxAsync,source:AsyncSource },
{id:"highlight", title:"Highlight matches",description:"Compose Highlight with ItemText to emphasize matching text.", Demo:ComboboxHighlight,source:HighlightSource},
{id:"click", title:"Open on click",description:"Open by clicking the input, without opening on focus.", Demo:ComboboxClick,source:ClickSource},
{id:"customobjects", title:"Custom objects",description:"Map business objects to stable values and display labels. Selection retains the value, not the label.", Demo:ComboboxCustomObjects,source:CustomObjectsSource},
{id:"minimum", title:"Minimum characters",description:"Start showing suggestions after two characters.", Demo:ComboboxMinimum,source:MinimumSource},
{ id:"field",title:"Field",description:"Field owns the label, help text and validation relationships.",Demo:ComboboxField,source:FieldSource },
{ id:"nativeform",title:"Native form",description:"Submit the committed value, not the search text, and reset to the initial selection.",Demo:ComboboxNativeForm,source:NativeFormSource },
{id:"hookform",title:"React Hook Form",description:"Connect the selected value, input ref and blur handler to an optional Controller integration.",Demo:ComboboxHookForm,source:HookFormSource},
{id:"disabled", title:"Disabled",description:"Disable the complete field with one Root prop.", Demo:ComboboxDisabled,source:DisabledSource},
{id:"disableditem", title:"Disabled item",description:"Unavailable options stay visible and are skipped by keyboard selection.", Demo:ComboboxDisabledItem,source:DisabledItemSource},
{id:"artwork",title:"Input artwork",description:"Place decorative artwork beside the input without adding another input boundary.",Demo:ComboboxArtwork,source:ArtworkSource},
{id:"invalid", title:"Invalid",description:"Use Field error text with the invalid presentation.", Demo:ComboboxInvalid,source:InvalidSource},
{id:"controlled", title:"Controlled value",description:"Keep committed selection separate from the text used to search.", Demo:ComboboxControlled,source:ControlledSource},
{id:"controller", title:"Controller",description:"Own the state outside the component with useCombobox and RootProvider.", Demo:ComboboxControllerExample,source:ControllerSource},
{ id:"open",title:"Controlled open",description:"Control popup visibility independently from the selected value.",Demo:ComboboxOpen,source:OpenSource },
{id:"limit", title:"Limited results",description:"Limit the filtered result set before rendering large collections.", Demo:ComboboxLimit,source:LimitSource},
{id:"virtual",title:"Virtualization",description:"Use optional TanStack Virtual for large lists. The scroll callback brings keyboard-highlighted items into the mounted window.",Demo:ComboboxVirtual,source:VirtualSource},
{id:"links", title:"Links",description:"Compose the option itself as a link, rather than nesting a link inside an option.", Demo:ComboboxLinks,source:LinksSource},
{ id:"rehydrate",title:"Rehydrate value",description:"Load an option label after the saved value is already available.",Demo:ComboboxRehydrate,source:RehydrateSource },
{id:"richitems",title:"Custom items",description:"Keep each option as one selectable target while composing a title and secondary description.",Demo:ComboboxRichItems,source:RichItemsSource},
{ id:"customfilter",title:"Custom filter",description:"Search across application-owned names and keywords.",Demo:ComboboxCustomFilter,source:CustomFilterSource },
{id:"animation",title:"Custom animation",description:"Customize the Content animation duration. Reduced-motion settings still disable animation.",Demo:ComboboxAnimation,source:AnimationSource},
{id:"dialog",title:"Inside a dialog",description:"Use fixed positioning and keep the popup inside the dialog's layer.",Demo:ComboboxDialog,source:DialogSource},
{id:"creatable",title:"Create an option",description:"The application owns new records; selecting the create choice adds one to the collection.",Demo:ComboboxCreatable,source:CreatableSource},
{ id:"responsive",title:"Responsive recipes",description:"Sizes and variants follow the same breakpoints as other form fields.",Demo:ComboboxResponsive,source:ResponsiveSource },
{id:"freesolo", title:"Free-form entry",description:"Allow a typed value outside the supplied options.", Demo:ComboboxFreeSolo,source:FreeSoloSource},
{id:"readonly", title:"Read-only",description:"Keep the selected value readable and focusable without permitting changes.", Demo:ComboboxReadonly,source:ReadonlySource},
{id:"input-behavior",title:"Input behavior",description:"Automatically highlight the first match, or update the selection while navigating with arrow keys.",Demo:ComboboxInputBehavior,source:InputBehaviorSource},
];
export const parts: OwnerPart[] = [
{ id:"props-root",title:"Root",description:"One state owner for selection, search text, popup state and form participation.",rows:[
{name:"options",typeLabel:"ComboboxOption[]",description:"Stable values, labels, availability and optional groups."},
{name:"value / defaultValue / onValueChange",typeLabel:"string | null",description:"Single committed selection; controlled changes use the callback."},
{name:"multiple / values / defaultValues / onValuesChange",typeLabel:"boolean / string[]",description:"Multiple collection selection, separate from scalar value."},
{name:"inputValue / onInputValueChange",typeLabel:"string / (value: string) => void",description:"Independent editable search text."},
{name:"open / onOpenChange",typeLabel:"boolean / (open: boolean) => void",description:"Controlled popup state."},
{name:"size",typeLabel:"ResponsiveControlSize",defaultLabel:'"lg"',description:"2xs through 2xl, shared with form fields."},
{name:"variant",typeLabel:"ResponsiveFieldVariant",defaultLabel:'"outline"',description:"outline, surface, soft, subtle, ghost, plain or underline."},
{name:"tone",typeLabel:'"neutral" | "accent"',defaultLabel:'"neutral"',description:"Option selection and highlight paint."},
{name:"openOnClick / openOnFocus",typeLabel:"boolean",description:"Independent click and focus opening policies."},
{name:"openOnChange",typeLabel:"boolean | (details) => boolean",defaultLabel:"true",description:"Control whether edited text opens results."},
{name:"closeOnSelect",typeLabel:"boolean",description:"Defaults to false for multiple selection and true otherwise."},
{name:"inputBehavior",typeLabel:'"none" | "autohighlight" | "autocomplete"',defaultLabel:'"none"',description:"Automatic first-result highlight or keyboard-driven value completion."},
{name:"selectionBehavior / clearOnSelect",typeLabel:'"replace" | "clear" | "preserve" / boolean',description:"Choose the post-selection text policy. Multiple always clears. clearOnSelect is the compatible shortcut."},
{name:"openOnKeyPress / loopFocus",typeLabel:"boolean",defaultLabel:"true",description:"Arrow-key opening and wrapping at collection boundaries."},
{name:"highlightedValue / defaultHighlightedValue / onHighlightChange",typeLabel:"string | null",description:"Control the highlighted option independently from committed selection."},
{name:"onSelect",typeLabel:"(option: ComboboxOption) => void",description:"Observe a committed item selection, including a repeated choice."},
{name:"freeSolo / loading / noOptionsText / loadingText",typeLabel:"boolean / boolean / string / string",description:"Free-form values and application-owned loading and empty states."},
{name:"groupBy",typeLabel:"(option) => string",description:"Partition filtered options for Group and Label composition."},
{name:"filterOptions",typeLabel:"(options, inputValue) => options",description:"Application filtering, custom-object mapping and result limits."},
{name:"scrollToIndexFn",typeLabel:"(details: { index, value }) => void",description:"Scroll an application-owned virtualized list to the highlighted option."},
{name:"name / form / required / disabled / readOnly / invalid",typeLabel:"native field metadata",description:"Committed-value validation and native form ownership."}
]},
{ id:"props-content",title:"Content",description:"Owns floating geometry, dismissal and exit presence; Listbox owns option semantics.",rows:[
{name:"placement / strategy",typeLabel:"Placement / absolute | fixed",defaultLabel:"bottom-start / absolute",description:"Collision-aware placement; use fixed inside scrolling dialogs."},
{name:"sideOffset",typeLabel:"number",defaultLabel:"4",description:"Distance from the complete control."},
{name:"sameWidth / hideWhenDetached",typeLabel:"boolean",description:"Match the reference width and optionally hide detached references."},
{name:"forceMount / onExitComplete",typeLabel:"boolean / () => void",description:"Mounted content and animation lifecycle."},
{name:"onInteractOutside",typeLabel:"(event) => void",description:"Prevent default to cancel outside dismissal."}
]},
...["Control","Input","Clear","Trigger","IndicatorGroup","Indicator","Listbox","Group","Label","Item","ItemText","ItemIndicator","Empty","Loading","Portal","RootProvider"].map(title=>({id:"props-"+title.toLowerCase(),title,description:title==="RootProvider"?"Supply the controller returned by useCombobox.":"Compose this public part inside its owning Combobox.",rows:[{name:title==="RootProvider"?"value":title==="Item"?"value / disabled / asChild / render":"native props / ref",typeLabel:title==="RootProvider"?"ComboboxController":"part props",description:title==="RootProvider"?"The external state controller.":"Preserve native attributes, accessible naming and the part's ownership."}]}))
];
export const sections=ownerSections(examples,parts);
