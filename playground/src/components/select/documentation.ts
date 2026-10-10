import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { SelectBasic } from "./examples/SelectBasic.js";
import { SelectPeople } from "./examples/SelectPeople.js";
import SelectPeopleSource from "./examples/SelectPeople.tsx?raw";
import basicSource from "./examples/SelectBasic.tsx?raw";
import { SelectCustomTrigger } from "./examples/SelectCustomTrigger.js";
import SelectCustomTriggerSource from "./examples/SelectCustomTrigger.tsx?raw";
import { SelectPopover } from "./examples/SelectPopover.js";
import SelectPopoverSource from "./examples/SelectPopover.tsx?raw";
import { SelectDialog } from "./examples/SelectDialog.js";
import SelectDialogSource from "./examples/SelectDialog.tsx?raw";
import { SelectSizes } from "./examples/SelectSizes.js";
import SelectSizesSource from "./examples/SelectSizes.tsx?raw";
import { SelectVariants } from "./examples/SelectVariants.js";
import SelectVariantsSource from "./examples/SelectVariants.tsx?raw";
import { SelectControlled } from "./examples/SelectControlled.js";
import SelectControlledSource from "./examples/SelectControlled.tsx?raw";
import { SelectStates } from "./examples/SelectStates.js";
import SelectStatesSource from "./examples/SelectStates.tsx?raw";
import { SelectResponsive } from "./examples/SelectResponsive.js";
import SelectResponsiveSource from "./examples/SelectResponsive.tsx?raw";
import { SelectForm } from "./examples/SelectForm.js";
import SelectFormSource from "./examples/SelectForm.tsx?raw";
import { SelectClear } from "./examples/SelectClear.js";
import SelectClearSource from "./examples/SelectClear.tsx?raw";
import { SelectPositioning } from "./examples/SelectPositioning.js";
import SelectPositioningSource from "./examples/SelectPositioning.tsx?raw";
import { SelectLifecycle } from "./examples/SelectLifecycle.js";
import SelectLifecycleSource from "./examples/SelectLifecycle.tsx?raw";
import { SelectPolicy } from "./examples/SelectPolicy.js";
import SelectPolicySource from "./examples/SelectPolicy.tsx?raw";
import { SelectHighlight } from "./examples/SelectHighlight.js";
import SelectHighlightSource from "./examples/SelectHighlight.tsx?raw";
import { SelectAsync } from "./examples/SelectAsync.js";
import SelectAsyncSource from "./examples/SelectAsync.tsx?raw";
import { SelectGroups } from "./examples/SelectGroups.js";
import SelectGroupsSource from "./examples/SelectGroups.tsx?raw";
import { SelectDescriptions } from "./examples/SelectDescriptions.js";
import SelectDescriptionsSource from "./examples/SelectDescriptions.tsx?raw";
import { SelectOverflow } from "./examples/SelectOverflow.js";
import SelectOverflowSource from "./examples/SelectOverflow.tsx?raw";
import { SelectStore } from "./examples/SelectStore.js";
import SelectStoreSource from "./examples/SelectStore.tsx?raw";
export const examples: OwnerExample[] = [
{id:"people",title:"Rich options",description:"Compose decorative avatars while preserving a plain option label.",Demo:SelectPeople,source:SelectPeopleSource},
{id:"sizes",title:"Sizes",description:"Seven sizes change control height, type and icon geometry together.",Demo:SelectSizes,source:SelectSizesSource},
{id:"variants",title:"Variants",description:"Choose outline, surface, soft, subtle, ghost or underline without changing the control size.",Demo:SelectVariants,source:SelectVariantsSource},
{id:"groups",title:"Grouped options",description:"Group related choices under an accessible label.",Demo:SelectGroups,source:SelectGroupsSource},
{id:"controlled",title:"Controlled",description:"Keep the selected value in application state.",Demo:SelectControlled,source:SelectControlledSource},
{id:"async",title:"Dynamic options",description:"The application owns loading. Pass the same records to Root and rendered options.",Demo:SelectAsync,source:SelectAsyncSource},
{id:"states",title:"Disabled and invalid",description:"Use native state props; custom selects also support read-only.",Demo:SelectStates,source:SelectStatesSource},
{id:"positioning",title:"Positioning",description:"Choose placement and gutter; collision handling keeps the popup in view.",Demo:SelectPositioning,source:SelectPositioningSource},
{id:"clear",title:"Clear selection",description:"ClearTrigger is a separately named sibling, not an interactive child of Trigger.",Demo:SelectClear,source:SelectClearSource},
{id:"overflow",title:"Scrollable options",description:"Viewport owns scrolling; scroll buttons stay outside it.",Demo:SelectOverflow,source:SelectOverflowSource},
{id:"descriptions",title:"Option descriptions",description:"Keep the selectable label separate from secondary explanatory text.",Demo:SelectDescriptions,source:SelectDescriptionsSource},
{id:"popover",title:"Inside a popover",description:"Preserve the original selection behavior and compose the appropriate visual owner.",Demo:SelectPopover,source:SelectPopoverSource},
{id:"dialog",title:"Inside a dialog",description:"Preserve the original selection behavior and compose the appropriate visual owner.",Demo:SelectDialog,source:SelectDialogSource},
{id:"customtrigger",title:"Custom icon trigger",description:"Preserve the original selection behavior and compose the appropriate visual owner.",Demo:SelectCustomTrigger,source:SelectCustomTriggerSource},
{id:"responsive",title:"Responsive size",description:"Omit initial to keep the normal default below the breakpoint.",Demo:SelectResponsive,source:SelectResponsiveSource},
{id:"form",title:"Form and reset",description:"Submit and reset using the native form.",Demo:SelectForm,source:SelectFormSource},
{id:"lifecycle",title:"Retain content",description:"Keep hidden content mounted after first opening. Closed content is inert.",Demo:SelectLifecycle,source:SelectLifecycleSource},
{id:"policy",title:"Selection policy",description:"Allow deselection and keep the popup open after choosing.",Demo:SelectPolicy,source:SelectPolicySource},
{id:"highlight",title:"Controlled highlight",description:"Observe highlight separately from the selected value; disable wrapping at list edges.",Demo:SelectHighlight,source:SelectHighlightSource},
{id:"store",title:"External controller",description:"Use the original Atom-owned controller through Brick's visual provider.",Demo:SelectStore,source:SelectStoreSource}
];
export const parts: OwnerPart[] = [
  {
    "id": "props-root",
    "title": "Root",
    "description": "Owns the visual recipe, selection policy and form integration.",
    "rows": [
      {
        "name": "size",
        "typeLabel": "ResponsiveValue<\"2xs\" | \"xs\" | \"sm\" | \"md\" | \"lg\" | \"xl\" | \"2xl\">",
        "defaultLabel": "\"lg\"",
        "description": "Complete responsive control geometry."
      },
      {
        "name": "variant",
        "typeLabel": "\"outline\" | \"surface\" | \"soft\" | \"subtle\" | \"ghost\" | \"underline\"",
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
        "name": "value / defaultValue",
        "typeLabel": "string",
        "defaultLabel": "—",
        "description": "Controlled or initial selection."
      },
      {
        "name": "onValueChange",
        "typeLabel": "(value: string) => void",
        "defaultLabel": "—",
        "description": "Accept requested selection."
      },
      {
        "name": "open / defaultOpen / onOpenChange",
        "typeLabel": "boolean / (open: boolean) => void",
        "defaultLabel": "false",
        "description": "Controlled or initial popup state."
      },
      {
        "name": "items",
        "typeLabel": "readonly SelectOption[]",
        "defaultLabel": "derived static children",
        "description": "Explicit value/label/disabled records for async or opaque children and SSR."
      },
      {
        "name": "readOnly",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Prevent edits without disabling navigation to the control."
      },
      {
        "name": "name / form / autoComplete",
        "typeLabel": "string",
        "defaultLabel": "—",
        "description": "Native submission, external form association and autofill."
      },
      {
        "name": "closeOnSelect / loopFocus",
        "typeLabel": "boolean",
        "defaultLabel": "true / true",
        "description": "Closing policy and keyboard wrapping."
      },
      {
        "name": "deselectable",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Selecting the current option clears it."
      },
      {
        "name": "highlightedValue / defaultHighlightedValue",
        "typeLabel": "string | null",
        "defaultLabel": "null",
        "description": "Highlight separately from selected value."
      },
      {
        "name": "onHighlightChange",
        "typeLabel": "(value: string | null) => void",
        "defaultLabel": "—",
        "description": "Observe or control highlighting."
      },
      {
        "name": "onSelect / scrollToIndexFn",
        "typeLabel": "((value: string) => void) / ((details: { index: number; value: string }) => void)",
        "defaultLabel": "—",
        "description": "Observe activation or delegate scrolling; this does not add virtualized keyboard registration."
      },
      {
        "name": "positioning",
        "typeLabel": "SelectPositioningOptions",
        "defaultLabel": "bottom-start, gutter 4",
        "description": "Placement, strategy, collisions, width and detached-anchor policy."
      },
      {
        "name": "ids",
        "typeLabel": "SelectIds",
        "defaultLabel": "generated",
        "description": "Root, trigger and content IDs."
      },
      {
        "name": "lazyMount / unmountOnExit",
        "typeLabel": "boolean",
        "defaultLabel": "true",
        "description": "Mount on demand; optionally retain closed inert content."
      },
      {
        "name": "present / onExitComplete",
        "typeLabel": "boolean / (() => void)",
        "defaultLabel": "open / —",
        "description": "Override visual presence and observe completed exit."
      },
      {
        "name": "onFocusOutside / onPointerDownOutside / onEscapeKeyDown",
        "typeLabel": "event callbacks",
        "defaultLabel": "—",
        "description": "Call preventDefault to cancel the corresponding dismissal."
      }
    ]
  },
  {
    "id": "props-trigger",
    "title": "Trigger",
    "description": "The named interactive trigger.",
    "rows": [
      {
        "name": "asChild / render",
        "typeLabel": "boolean / RenderProp",
        "defaultLabel": "false / —",
        "description": "Compose one accessible button host."
      },
      {
        "name": "unstyled",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Delegate appearance to a composed Button or IconButton."
      }
    ]
  },
  {
    "id": "props-value",
    "title": "Value",
    "description": "Selected label or summary.",
    "rows": [
      {
        "name": "placeholder / children",
        "typeLabel": "ReactNode",
        "defaultLabel": "—",
        "description": "Empty label or custom selected content."
      }
    ]
  },
  {
    "id": "props-content",
    "title": "Content",
    "description": "The positioned listbox. Listbox is an alias.",
    "rows": [
      {
        "name": "disablePortal / container",
        "typeLabel": "boolean / HTMLElement",
        "defaultLabel": "false / owner body",
        "description": "Inline or explicit portal destination."
      },
      {
        "name": "onInteractOutside",
        "typeLabel": "event callback",
        "defaultLabel": "—",
        "description": "Prevent completed outside activation from dismissing."
      },
      {
        "name": "radius",
        "typeLabel": "Radius",
        "defaultLabel": "theme",
        "description": "Popup corner recipe."
      }
    ]
  },
  {
    "id": "props-item",
    "title": "Item",
    "description": "One predefined option.",
    "rows": [
      {
        "name": "value / label",
        "typeLabel": "string",
        "defaultLabel": "required / derived",
        "description": "Stable value and plain-text name."
      },
      {
        "name": "disabled",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Skip unavailable options."
      }
    ]
  },
  {
    "id": "props-cleartrigger",
    "title": "ClearTrigger",
    "description": "An independent sibling action.",
    "rows": [
      {
        "name": "aria-label",
        "typeLabel": "string",
        "defaultLabel": "Clear selection",
        "description": "Localize the accessible action name."
      },
      {
        "name": "children",
        "typeLabel": "ReactElement",
        "defaultLabel": "CloseButton",
        "description": "Replace the button presentation, not the clear behavior."
      }
    ]
  },
  {
    "id": "props-rootprovider-and-state",
    "title": "RootProvider and State",
    "description": "Controller and render-state composition.",
    "rows": [
      {
        "name": "value",
        "typeLabel": "UseSelectReturn",
        "defaultLabel": "required",
        "description": "Original useSelect return."
      },
      {
        "name": "children",
        "typeLabel": "ReactNode / (state) => ReactNode",
        "defaultLabel": "—",
        "description": "Provider content or State render function."
      }
    ]
  },
  {
    "id": "props-supporting-parts",
    "title": "Supporting parts",
    "description": "ItemText, ItemIndicator, Group, Label, Separator, Icon, Arrow, Viewport, ScrollUpButton, ScrollDownButton and Portal.",
    "rows": [
      {
        "name": "native props / children",
        "typeLabel": "part-specific HTML props",
        "defaultLabel": "—",
        "description": "Keep indicators decorative, group labels visible and scroll buttons outside Viewport."
      },
      {
        "name": "Portal container / disabled",
        "typeLabel": "HTMLElement / boolean",
        "defaultLabel": "owner body / false",
        "description": "Optional explicit portal composition."
      }
    ]
  }
];
export const sections = ownerSections(examples,parts);
export { SelectBasic, basicSource };
