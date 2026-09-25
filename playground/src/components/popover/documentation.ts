import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { PopoverBasic } from "./examples/PopoverBasic.js";
import PopoverBasicSource from "./examples/PopoverBasic.tsx?raw";
import { PopoverControlled } from "./examples/PopoverControlled.js";
import PopoverControlledSource from "./examples/PopoverControlled.tsx?raw";
import { PopoverShared } from "./examples/PopoverShared.js";
import PopoverSharedSource from "./examples/PopoverShared.tsx?raw";
import { PopoverInsets } from "./examples/PopoverInsets.js";
import PopoverInsetsSource from "./examples/PopoverInsets.tsx?raw";
import { PopoverLazy } from "./examples/PopoverLazy.js";
import PopoverLazySource from "./examples/PopoverLazy.tsx?raw";
import { PopoverPlacement } from "./examples/PopoverPlacement.js";
import PopoverPlacementSource from "./examples/PopoverPlacement.tsx?raw";
import { PopoverOffset } from "./examples/PopoverOffset.js";
import PopoverOffsetSource from "./examples/PopoverOffset.tsx?raw";
import { PopoverSameWidth } from "./examples/PopoverSameWidth.js";
import PopoverSameWidthSource from "./examples/PopoverSameWidth.tsx?raw";
import { PopoverNested } from "./examples/PopoverNested.js";
import PopoverNestedSource from "./examples/PopoverNested.tsx?raw";
import { PopoverFocus } from "./examples/PopoverFocus.js";
import PopoverFocusSource from "./examples/PopoverFocus.tsx?raw";
import { PopoverForm } from "./examples/PopoverForm.js";
import PopoverFormSource from "./examples/PopoverForm.tsx?raw";
import { PopoverBackground } from "./examples/PopoverBackground.js";
import PopoverBackgroundSource from "./examples/PopoverBackground.tsx?raw";
import { PopoverDialog } from "./examples/PopoverDialog.js";
import PopoverDialogSource from "./examples/PopoverDialog.tsx?raw";
import { PopoverWidths } from "./examples/PopoverWidths.js";
import PopoverWidthsSource from "./examples/PopoverWidths.tsx?raw";
import { PopoverDensity } from "./examples/PopoverDensity.js";
import PopoverDensitySource from "./examples/PopoverDensity.tsx?raw";
import { PopoverRadius } from "./examples/PopoverRadius.js";
import PopoverRadiusSource from "./examples/PopoverRadius.tsx?raw";
import { PopoverIndicator } from "./examples/PopoverIndicator.js";
import PopoverIndicatorSource from "./examples/PopoverIndicator.tsx?raw";
import { PopoverStore } from "./examples/PopoverStore.js";
import PopoverStoreSource from "./examples/PopoverStore.tsx?raw";
import { PopoverVirtual } from "./examples/PopoverVirtual.js";
import PopoverVirtualSource from "./examples/PopoverVirtual.tsx?raw";
import { PopoverModal } from "./examples/PopoverModal.js";
import PopoverModalSource from "./examples/PopoverModal.tsx?raw";
import { PopoverDismissal } from "./examples/PopoverDismissal.js";
import PopoverDismissalSource from "./examples/PopoverDismissal.tsx?raw";
import { PopoverScrolling } from "./examples/PopoverScrolling.js";
import PopoverScrollingSource from "./examples/PopoverScrolling.tsx?raw";
import { PopoverFocusReturn } from "./examples/PopoverFocusReturn.js";
import PopoverFocusReturnSource from "./examples/PopoverFocusReturn.tsx?raw";
export const examples: OwnerExample[] = [
{id:"controlled", title:"Controlled", description:"Application-owned open state.", Demo:PopoverControlled, source:PopoverControlledSource},
{id:"shared", title:"Multiple triggers", description:"One panel follows the active trigger.", Demo:PopoverShared, source:PopoverSharedSource},
{id:"insets", title:"Insets", description:"Four internal spacing recipes; width remains independent.", Demo:PopoverInsets, source:PopoverInsetsSource},
{id:"lazy", title:"Lazy mount", description:"Mount on first opening and retain the form draft when closed.", Demo:PopoverLazy, source:PopoverLazySource},
{id:"placement", title:"Placement", description:"Collision-aware preferred sides.", Demo:PopoverPlacement, source:PopoverPlacementSource},
{id:"offset", title:"Offset", description:"Main and cross-axis adjustment.", Demo:PopoverOffset, source:PopoverOffsetSource},
{id:"samewidth", title:"Same width", description:"Match the trigger while retaining viewport bounds.", Demo:PopoverSameWidth, source:PopoverSameWidthSource},
{id:"nested", title:"Nested popover", description:"Nested content stays in the parent's DOM scope.", Demo:PopoverNested, source:PopoverNestedSource},
{id:"focus", title:"Initial focus", description:"Select the initial field; close returns focus to the trigger.", Demo:PopoverFocus, source:PopoverFocusSource},
{id:"form", title:"Form", description:"Compose existing form controls without custom geometry.", Demo:PopoverForm, source:PopoverFormSource},
{id:"background", title:"Custom background", description:"The panel and arrow share the same background token.", Demo:PopoverBackground, source:PopoverBackgroundSource},
{id:"dialog", title:"Open from Dialog", description:"Fixed positioning and detachment handling inside a Dialog.", Demo:PopoverDialog, source:PopoverDialogSource},
{id:"widths", title:"Widths", description:"Existing width recipes remain available separately from inset.", Demo:PopoverWidths, source:PopoverWidthsSource},
{id:"density", title:"Density", description:"Density preserves the existing compact title and spacing contract.", Demo:PopoverDensity, source:PopoverDensitySource},
{id:"radius", title:"Radius", description:"Use core or semantic radius tokens.", Demo:PopoverRadius, source:PopoverRadiusSource},
{id:"indicator", title:"Indicator", description:"Compose a decorative trigger indicator without another button.", Demo:PopoverIndicator, source:PopoverIndicatorSource},
{id:"store", title:"External controller", description:"Control the panel through usePopover and RootProvider.", Demo:PopoverStore, source:PopoverStoreSource},
{id:"virtual", title:"Virtual anchor", description:"Position against an independently measured reference.", Demo:PopoverVirtual, source:PopoverVirtualSource},
{id:"modal", title:"Modal", description:"Trap focus and isolate the outside only when required.", Demo:PopoverModal, source:PopoverModalSource},
{id:"dismissal", title:"Dismissal", description:"Disable outside and Escape dismissal with an explicit Close action.", Demo:PopoverDismissal, source:PopoverDismissalSource},
{id:"focus-return", title:"Focus return and persistent elements", description:"An explicit destination can remain interactive without outside dismissal.", Demo:PopoverFocusReturn, source:PopoverFocusReturnSource},
{id:"scrolling", title:"Scrolling", description:"Body scrolls while the final action remains reachable.", Demo:PopoverScrolling, source:PopoverScrollingSource}];
export const parts: OwnerPart[] = [
  {
    "id": "props-root",
    "title": "Root",
    "description": "State, lifecycle and behavior; no DOM wrapper.",
    "rows": [
      {
        "name": "open / defaultOpen",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Controlled or initial open state."
      },
      {
        "name": "onOpenChange",
        "typeLabel": "(open, reason?) => void",
        "defaultLabel": "—",
        "description": "Reports requested changes without mutating controlled state."
      },
      {
        "name": "triggerValue / defaultTriggerValue",
        "typeLabel": "string",
        "defaultLabel": "—",
        "description": "Active shared trigger."
      },
      {
        "name": "onTriggerValueChange",
        "typeLabel": "(value) => void",
        "defaultLabel": "—",
        "description": "Tracks active trigger changes."
      },
      {
        "name": "modal",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Traps focus, isolates the background and locks scrolling."
      },
      {
        "name": "disabled",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Suppresses disclosure and activation."
      },
      {
        "name": "closeOnEscape / closeOnInteractOutside",
        "typeLabel": "boolean",
        "defaultLabel": "true",
        "description": "Independent Escape and outside pointer/focus policies."
      },
      {
        "name": "positioning",
        "typeLabel": "PopoverPositioningOptions",
        "defaultLabel": "—",
        "description": "Placement, offset, collision, virtual reference, listeners and size matching."
      },
      {
        "name": "lazyMount / unmountOnExit",
        "typeLabel": "boolean",
        "defaultLabel": "true",
        "description": "Controls content creation and retention."
      },
      {
        "name": "immediate",
        "typeLabel": "boolean",
        "defaultLabel": "true",
        "description": "Preserves immediate disclosure scheduling."
      },
      {
        "name": "present",
        "typeLabel": "boolean",
        "defaultLabel": "—",
        "description": "External presence override."
      },
      {
        "name": "hideMode",
        "typeLabel": "\"display-none\" | \"activity\"",
        "defaultLabel": "\"display-none\"",
        "description": "Activity falls back to hidden display when unavailable."
      },
      {
        "name": "skipAnimationOnMount",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Skips initial-open motion."
      },
      {
        "name": "onExitComplete",
        "typeLabel": "() => void",
        "defaultLabel": "—",
        "description": "Called when exit finishes."
      },
      {
        "name": "onInteractOutside / onPointerDownOutside / onFocusOutside",
        "typeLabel": "event callback",
        "defaultLabel": "—",
        "description": "Cancellable outside notifications."
      },
      {
        "name": "onEscapeKeyDown / onRequestDismiss",
        "typeLabel": "event callback",
        "defaultLabel": "—",
        "description": "Escape notification, or a retained ancestor closing; cancellation of the latter affects this child only."
      },
      {
        "name": "persistentElements",
        "typeLabel": "Array<() => HTMLElement | null>",
        "defaultLabel": "—",
        "description": "Exceptions to outside dismissal."
      },
      {
        "name": "portalled",
        "typeLabel": "boolean",
        "defaultLabel": "true",
        "description": "Enables non-modal portal tab-order guards; does not create a portal."
      },
      {
        "name": "id / ids",
        "typeLabel": "string / PopoverIds",
        "defaultLabel": "generated",
        "description": "Deterministic content and part identifiers."
      }
    ]
  },
  {
    "id": "props-trigger",
    "title": "Trigger",
    "description": "The actual named activation control.",
    "rows": [
      {
        "name": "value",
        "typeLabel": "string",
        "defaultLabel": "generated",
        "description": "Unique value for shared triggers."
      },
      {
        "name": "disabled",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Disables this trigger."
      },
      {
        "name": "asChild / render",
        "typeLabel": "boolean / RenderProp",
        "defaultLabel": "false / —",
        "description": "Compose a Button or IconButton with owned handlers and refs."
      }
    ]
  },
  {
    "id": "props-content",
    "title": "Content",
    "description": "Positioned dialog and visual recipe; contains the owned viewport.",
    "rows": [
      {
        "name": "size",
        "typeLabel": "\"sm\" | \"md\" | \"lg\"",
        "defaultLabel": "\"md\"",
        "description": "Preferred maximum width."
      },
      {
        "name": "inset",
        "typeLabel": "\"xs\" | \"sm\" | \"md\" | \"lg\"",
        "defaultLabel": "density",
        "description": "Independent internal padding."
      },
      {
        "name": "density",
        "typeLabel": "\"comfortable\" | \"compact\"",
        "defaultLabel": "\"comfortable\"",
        "description": "Legacy spacing and title density."
      },
      {
        "name": "radius",
        "typeLabel": "Radius",
        "defaultLabel": "overlay",
        "description": "Core or semantic radius token."
      },
      {
        "name": "side / align",
        "typeLabel": "PopoverSide / PopoverAlign",
        "defaultLabel": "bottom / center",
        "description": "Legacy positioning shorthands."
      },
      {
        "name": "sideOffset",
        "typeLabel": "number",
        "defaultLabel": "8",
        "description": "Distance from the reference."
      },
      {
        "name": "initialFocus / finalFocus",
        "typeLabel": "ref | callback | false",
        "defaultLabel": "automatic",
        "description": "Select or suppress owned focus operations."
      },
      {
        "name": "asChild / render",
        "typeLabel": "boolean / RenderProp",
        "defaultLabel": "false / —",
        "description": "Keep the internal viewport and direct Arrow when composing."
      },
      {
        "name": "onInteractOutside / onFocusOutside",
        "typeLabel": "event callback",
        "defaultLabel": "—",
        "description": "Content-local preventable notifications."
      }
    ]
  },
  {
    "id": "props-portal",
    "title": "Portal",
    "description": "Optional DOM relocation.",
    "rows": [
      {
        "name": "container",
        "typeLabel": "HTMLElement | null",
        "defaultLabel": "owner document body",
        "description": "Portal target; use a scoped container to preserve local Appearance."
      },
      {
        "name": "disabled",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Render content in place."
      }
    ]
  },
  {
    "id": "props-structure",
    "title": "Header, Body and Footer",
    "description": "Padded presentation regions. Body owns bounded scrolling.",
    "rows": [
      {
        "name": "asChild / render",
        "typeLabel": "boolean / ReactElement",
        "defaultLabel": "false / —",
        "description": "Merge native handlers, refs and presentation props."
      }
    ]
  },
  {
    "id": "props-anchor",
    "title": "Anchor",
    "description": "Optional reference distinct from the trigger.",
    "rows": [
      {
        "name": "asChild / render",
        "typeLabel": "boolean / RenderProp",
        "defaultLabel": "false / —",
        "description": "Preserve the reference element's layout."
      }
    ]
  },
  {
    "id": "props-title",
    "title": "Title and Description",
    "description": "Automatic accessible name and description relationships.",
    "rows": [
      {
        "name": "native ARIA and element props",
        "typeLabel": "native props",
        "defaultLabel": "—",
        "description": "Use a single Title; override Content native ARIA when appropriate."
      }
    ]
  },
  {
    "id": "props-close",
    "title": "Close",
    "description": "Explicit dismissal control, not an automatically styled icon.",
    "rows": [
      {
        "name": "asChild / render",
        "typeLabel": "boolean / RenderProp",
        "defaultLabel": "false / —",
        "description": "Compose Button or an independently named CloseButton."
      }
    ]
  },
  {
    "id": "props-arrow",
    "title": "Arrow",
    "description": "Decorative pointer; keep directly under Content.",
    "rows": [
      {
        "name": "width / height",
        "typeLabel": "number",
        "defaultLabel": "10 / 5",
        "description": "Pointer geometry."
      },
      {
        "name": "asChild / render",
        "typeLabel": "boolean / RenderProp",
        "defaultLabel": "false / —",
        "description": "Custom SVG composition."
      }
    ]
  },
  {
    "id": "props-state",
    "title": "State and RootProvider",
    "description": "Public state facade and external controller composition.",
    "rows": [
      {
        "name": "State.children",
        "typeLabel": "(state) => ReactNode",
        "defaultLabel": "—",
        "description": "Reads open/triggerValue and setOpen/setTriggerValue/reposition."
      },
      {
        "name": "RootProvider.value",
        "typeLabel": "UsePopoverReturn",
        "defaultLabel": "required",
        "description": "Controller created with Brick usePopover."
      }
    ]
  },
  {
    "id": "props-indicator",
    "title": "Indicator",
    "description": "Decorative state artwork.",
    "rows": [
      {
        "name": "children",
        "typeLabel": "ReactNode",
        "defaultLabel": "—",
        "description": "Custom icon; aria-hidden and data-state are supplied."
      }
    ]
  }
];
export const sections = [...ownerSections(examples, parts), { id: "guide", title: "Guide", level: 2 as const }];
export { PopoverBasic, PopoverBasicSource };
