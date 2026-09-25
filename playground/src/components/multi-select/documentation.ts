import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { MultiSelectBasic } from "./examples/MultiSelectBasic.js";
import { MultiSelectPeople } from "./examples/MultiSelectPeople.js";
import MultiSelectPeopleSource from "./examples/MultiSelectPeople.tsx?raw";
import basicSource from "./examples/MultiSelectBasic.tsx?raw";
import { MultiSelectCustomTrigger } from "./examples/MultiSelectCustomTrigger.js";
import MultiSelectCustomTriggerSource from "./examples/MultiSelectCustomTrigger.tsx?raw";
import { MultiSelectPopover } from "./examples/MultiSelectPopover.js";
import MultiSelectPopoverSource from "./examples/MultiSelectPopover.tsx?raw";
import { MultiSelectDialog } from "./examples/MultiSelectDialog.js";
import MultiSelectDialogSource from "./examples/MultiSelectDialog.tsx?raw";
import { MultiSelectSizes } from "./examples/MultiSelectSizes.js";
import MultiSelectSizesSource from "./examples/MultiSelectSizes.tsx?raw";
import { MultiSelectVariants } from "./examples/MultiSelectVariants.js";
import MultiSelectVariantsSource from "./examples/MultiSelectVariants.tsx?raw";
import { MultiSelectControlled } from "./examples/MultiSelectControlled.js";
import MultiSelectControlledSource from "./examples/MultiSelectControlled.tsx?raw";
import { MultiSelectStates } from "./examples/MultiSelectStates.js";
import MultiSelectStatesSource from "./examples/MultiSelectStates.tsx?raw";
import { MultiSelectResponsive } from "./examples/MultiSelectResponsive.js";
import MultiSelectResponsiveSource from "./examples/MultiSelectResponsive.tsx?raw";
import { MultiSelectForm } from "./examples/MultiSelectForm.js";
import MultiSelectFormSource from "./examples/MultiSelectForm.tsx?raw";
import { MultiSelectClear } from "./examples/MultiSelectClear.js";
import MultiSelectClearSource from "./examples/MultiSelectClear.tsx?raw";
import { MultiSelectPositioning } from "./examples/MultiSelectPositioning.js";
import MultiSelectPositioningSource from "./examples/MultiSelectPositioning.tsx?raw";
import { MultiSelectLifecycle } from "./examples/MultiSelectLifecycle.js";
import MultiSelectLifecycleSource from "./examples/MultiSelectLifecycle.tsx?raw";
import { MultiSelectPolicy } from "./examples/MultiSelectPolicy.js";
import MultiSelectPolicySource from "./examples/MultiSelectPolicy.tsx?raw";
import { MultiSelectHighlight } from "./examples/MultiSelectHighlight.js";
import MultiSelectHighlightSource from "./examples/MultiSelectHighlight.tsx?raw";
import { MultiSelectAsync } from "./examples/MultiSelectAsync.js";
import MultiSelectAsyncSource from "./examples/MultiSelectAsync.tsx?raw";
import { MultiSelectGroups } from "./examples/MultiSelectGroups.js";
import MultiSelectGroupsSource from "./examples/MultiSelectGroups.tsx?raw";
import { MultiSelectDescriptions } from "./examples/MultiSelectDescriptions.js";
import MultiSelectDescriptionsSource from "./examples/MultiSelectDescriptions.tsx?raw";
import { MultiSelectOverflow } from "./examples/MultiSelectOverflow.js";
import MultiSelectOverflowSource from "./examples/MultiSelectOverflow.tsx?raw";
import { MultiSelectStore } from "./examples/MultiSelectStore.js";
import MultiSelectStoreSource from "./examples/MultiSelectStore.tsx?raw";
export const examples: OwnerExample[] = [
{id:"people",title:"Rich options and summary",description:"Compose decorative avatars while preserving a plain option label and a custom selection count.",Demo:MultiSelectPeople,source:MultiSelectPeopleSource},
{id:"sizes",title:"Sizes",description:"Seven sizes change control height, type and icon geometry together.",Demo:MultiSelectSizes,source:MultiSelectSizesSource},
{id:"variants",title:"Variants",description:"Choose outline, surface, soft, subtle, ghost or underline without changing the control size.",Demo:MultiSelectVariants,source:MultiSelectVariantsSource},
{id:"groups",title:"Grouped options",description:"Group related choices under an accessible label.",Demo:MultiSelectGroups,source:MultiSelectGroupsSource},
{id:"controlled",title:"Controlled",description:"Keep the selected value in application state.",Demo:MultiSelectControlled,source:MultiSelectControlledSource},
{id:"async",title:"Dynamic options",description:"The application owns loading. Pass the same records to Root and rendered options.",Demo:MultiSelectAsync,source:MultiSelectAsyncSource},
{id:"states",title:"Disabled and invalid",description:"Use native state props; custom selects also support read-only.",Demo:MultiSelectStates,source:MultiSelectStatesSource},
{id:"positioning",title:"Positioning",description:"Choose placement and gutter; collision handling keeps the popup in view.",Demo:MultiSelectPositioning,source:MultiSelectPositioningSource},
{id:"clear",title:"Clear selection",description:"ClearTrigger is a separately named sibling, not an interactive child of Trigger.",Demo:MultiSelectClear,source:MultiSelectClearSource},
{id:"overflow",title:"Scrollable options",description:"Viewport owns scrolling; scroll buttons stay outside it.",Demo:MultiSelectOverflow,source:MultiSelectOverflowSource},
{id:"descriptions",title:"Option descriptions",description:"Keep the selectable label separate from secondary explanatory text.",Demo:MultiSelectDescriptions,source:MultiSelectDescriptionsSource},
{id:"popover",title:"Inside a popover",description:"Preserve the original selection behavior and compose the appropriate visual owner.",Demo:MultiSelectPopover,source:MultiSelectPopoverSource},
{id:"dialog",title:"Inside a dialog",description:"Preserve the original selection behavior and compose the appropriate visual owner.",Demo:MultiSelectDialog,source:MultiSelectDialogSource},
{id:"customtrigger",title:"Custom icon trigger",description:"Preserve the original selection behavior and compose the appropriate visual owner.",Demo:MultiSelectCustomTrigger,source:MultiSelectCustomTriggerSource},
{id:"responsive",title:"Responsive size",description:"Omit initial to keep the normal default below the breakpoint.",Demo:MultiSelectResponsive,source:MultiSelectResponsiveSource},
{id:"form",title:"Form and reset",description:"Read repeated values with FormData.getAll.",Demo:MultiSelectForm,source:MultiSelectFormSource},
{id:"lifecycle",title:"Retain content",description:"Keep hidden content mounted after first opening. Closed content is inert.",Demo:MultiSelectLifecycle,source:MultiSelectLifecycleSource},
{id:"policy",title:"Selection policy",description:"Close the popup after each toggle when the workflow calls for it.",Demo:MultiSelectPolicy,source:MultiSelectPolicySource},
{id:"highlight",title:"Controlled highlight",description:"Observe highlight separately from the selected value; disable wrapping at list edges.",Demo:MultiSelectHighlight,source:MultiSelectHighlightSource},
{id:"store",title:"External controller",description:"Use the original Atom-owned controller through Brick's visual provider.",Demo:MultiSelectStore,source:MultiSelectStoreSource}
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
        "typeLabel": "string[]",
        "defaultLabel": "—",
        "description": "Controlled or initial selection."
      },
      {
        "name": "onValueChange",
        "typeLabel": "(value: string[]) => void",
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
        "defaultLabel": "false / true",
        "description": "Closing policy and keyboard wrapping."
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
      },
      {
        "name": "renderValue",
        "typeLabel": "(values, labels) => ReactNode",
        "defaultLabel": "—",
        "description": "Customize the multiple-value summary."
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
        "typeLabel": "UseMultiSelectReturn",
        "defaultLabel": "required",
        "description": "Original useMultiSelect return."
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
export { MultiSelectBasic, basicSource };
