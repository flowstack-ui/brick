import { TooltipBasic } from "./examples/TooltipBasic.js";
import TooltipBasicSource from "./examples/TooltipBasic.tsx?raw";
import { TooltipArrow } from "./examples/TooltipArrow.js";
import TooltipArrowSource from "./examples/TooltipArrow.tsx?raw";
import { TooltipPlacement } from "./examples/TooltipPlacement.js";
import TooltipPlacementSource from "./examples/TooltipPlacement.tsx?raw";
import { TooltipOffset } from "./examples/TooltipOffset.js";
import TooltipOffsetSource from "./examples/TooltipOffset.tsx?raw";
import { TooltipDelay } from "./examples/TooltipDelay.js";
import TooltipDelaySource from "./examples/TooltipDelay.tsx?raw";
import { TooltipControlled } from "./examples/TooltipControlled.js";
import TooltipControlledSource from "./examples/TooltipControlled.tsx?raw";
import { TooltipStore } from "./examples/TooltipStore.js";
import TooltipStoreSource from "./examples/TooltipStore.tsx?raw";
import { TooltipShared } from "./examples/TooltipShared.js";
import TooltipSharedSource from "./examples/TooltipShared.tsx?raw";
import { TooltipInteractive } from "./examples/TooltipInteractive.js";
import TooltipInteractiveSource from "./examples/TooltipInteractive.tsx?raw";
import { TooltipDisabled } from "./examples/TooltipDisabled.js";
import TooltipDisabledSource from "./examples/TooltipDisabled.tsx?raw";
import { TooltipDismissal } from "./examples/TooltipDismissal.js";
import TooltipDismissalSource from "./examples/TooltipDismissal.tsx?raw";
import { TooltipLifecycle } from "./examples/TooltipLifecycle.js";
import TooltipLifecycleSource from "./examples/TooltipLifecycle.tsx?raw";
import { TooltipRadius } from "./examples/TooltipRadius.js";
import TooltipRadiusSource from "./examples/TooltipRadius.tsx?raw";
import { TooltipRich } from "./examples/TooltipRich.js";
import TooltipRichSource from "./examples/TooltipRich.tsx?raw";
import { TooltipBackground } from "./examples/TooltipBackground.js";
import TooltipBackgroundSource from "./examples/TooltipBackground.tsx?raw";
import { TooltipPositioning } from "./examples/TooltipPositioning.js";
import TooltipPositioningSource from "./examples/TooltipPositioning.tsx?raw";
import { TooltipVirtual } from "./examples/TooltipVirtual.js";
import TooltipVirtualSource from "./examples/TooltipVirtual.tsx?raw";
import { TooltipAvatar } from "./examples/TooltipAvatar.js";
import TooltipAvatarSource from "./examples/TooltipAvatar.tsx?raw";
import { TooltipCheckbox } from "./examples/TooltipCheckbox.js";
import TooltipCheckboxSource from "./examples/TooltipCheckbox.tsx?raw";
import { TooltipSwitch } from "./examples/TooltipSwitch.js";
import TooltipSwitchSource from "./examples/TooltipSwitch.tsx?raw";
import { TooltipMenu } from "./examples/TooltipMenu.js";
import TooltipMenuSource from "./examples/TooltipMenu.tsx?raw";
import { TooltipTabs } from "./examples/TooltipTabs.js";
import TooltipTabsSource from "./examples/TooltipTabs.tsx?raw";
import { TooltipDialog } from "./examples/TooltipDialog.js";
import TooltipDialogSource from "./examples/TooltipDialog.tsx?raw";
import { TooltipPopover } from "./examples/TooltipPopover.js";
import TooltipPopoverSource from "./examples/TooltipPopover.tsx?raw";
import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
export const examples: OwnerExample[] = [
{id:"arrow",title:"Arrow",description:"Add the optional pointer; it inherits the content background.",Demo:TooltipArrow,source:TooltipArrowSource},
{id:"placement",title:"Placement",description:"Compare the four sides. Start and end alignments also support RTL.",Demo:TooltipPlacement,source:TooltipPlacementSource},
{id:"offset",title:"Offset",description:"Main-axis distance and cross-axis adjustment are independent.",Demo:TooltipOffset,source:TooltipOffsetSource},
{id:"delay",title:"Shared delays",description:"Provider shares timing between tooltips. Root can override its delays.",Demo:TooltipDelay,source:TooltipDelaySource},
{id:"controlled",title:"Controlled",description:"Keep application state outside the component.",Demo:TooltipControlled,source:TooltipControlledSource},
{id:"store",title:"Store",description:"RootProvider consumes the same controller used by Root.",Demo:TooltipStore,source:TooltipStoreSource},
{id:"shared",title:"Multiple triggers",description:"One tooltip follows the active named trigger.",Demo:TooltipShared,source:TooltipSharedSource},
{id:"interactive",title:"Hover retention",description:"Keep the hint open over its text. Use Popover for buttons and links.",Demo:TooltipInteractive,source:TooltipInteractiveSource},
{id:"disabled",title:"Disabled",description:"Disabling the tooltip does not disable its child control.",Demo:TooltipDisabled,source:TooltipDisabledSource},
{id:"dismissal",title:"Dismissal",description:"Opt out of individual dismissal policies. Leave and blur still dismiss.",Demo:TooltipDismissal,source:TooltipDismissalSource},
{id:"lifecycle",title:"Mounting",description:"Keep closed content mounted but hidden. Activity hiding requires React 19.2+.",Demo:TooltipLifecycle,source:TooltipLifecycleSource},
{id:"radius",title:"Radius",description:"Select core or semantic radius tokens.",Demo:TooltipRadius,source:TooltipRadiusSource},
{id:"rich",title:"Rich content",description:"A short title and supporting text remain supplemental, not interactive.",Demo:TooltipRich,source:TooltipRichSource},
{id:"background",title:"Custom background",description:"Change foreground and background together; the arrow follows.",Demo:TooltipBackground,source:TooltipBackgroundSource},
{id:"positioning",title:"Positioning",description:"Fixed positioning, viewport constraints and reference-width matching.",Demo:TooltipPositioning,source:TooltipPositioningSource},
{id:"virtual",title:"Virtual anchor",description:"Use a measured virtual rectangle without a separate positioning engine.",Demo:TooltipVirtual,source:TooltipVirtualSource},
{id:"avatar",title:"With Avatar",description:"Keep identity independently named and available to keyboard users.",Demo:TooltipAvatar,source:TooltipAvatarSource},
{id:"checkbox",title:"With Checkbox",description:"Compose the existing control without a second focus owner.",Demo:TooltipCheckbox,source:TooltipCheckboxSource},
{id:"switch",title:"With Switch",description:"The switch keeps its accessible name and state.",Demo:TooltipSwitch,source:TooltipSwitchSource},
{id:"menu",title:"With menu",description:"Compose both menu trigger and menu item hints with DropdownMenu.",Demo:TooltipMenu,source:TooltipMenuSource},
{id:"tabs",title:"With Tabs",description:"Tabs retain their roving focus and selected state.",Demo:TooltipTabs,source:TooltipTabsSource},
{id:"dialog",title:"Inside Dialog",description:"The tooltip participates in nested overlay stacking.",Demo:TooltipDialog,source:TooltipDialogSource},
{id:"popover",title:"Inside Popover",description:"A nested hint stays above its owning popover.",Demo:TooltipPopover,source:TooltipPopoverSource}];
export const parts: OwnerPart[] = [
  {
    "id": "props-root",
    "title": "Root",
    "description": "Owns tooltip state, timing and placement. It adds no DOM wrapper.",
    "rows": [
      {
        "name": "open / defaultOpen",
        "typeLabel": "boolean",
        "description": "Controlled or initial open state.",
        "defaultLabel": "false"
      },
      {
        "name": "onOpenChange",
        "typeLabel": "(open: boolean) => void",
        "description": "Receives the requested state."
      },
      {
        "name": "disabled",
        "typeLabel": "boolean",
        "description": "Suppresses content and pending opens.",
        "defaultLabel": "false"
      },
      {
        "name": "openDelay / closeDelay",
        "typeLabel": "number",
        "description": "Override shared timing in milliseconds.",
        "defaultLabel": "400 / 150"
      },
      {
        "name": "interactive",
        "typeLabel": "boolean",
        "description": "Retain content on hover; no focusable descendants.",
        "defaultLabel": "false (rich: true)"
      },
      {
        "name": "closeOnClick",
        "typeLabel": "boolean",
        "description": "Controls this dismissal policy.",
        "defaultLabel": "true"
      },
      {
        "name": "closeOnPointerDown",
        "typeLabel": "boolean",
        "description": "Controls this dismissal policy.",
        "defaultLabel": "true"
      },
      {
        "name": "closeOnScroll",
        "typeLabel": "boolean",
        "description": "Controls this dismissal policy.",
        "defaultLabel": "true"
      },
      {
        "name": "closeOnEscape",
        "typeLabel": "boolean",
        "description": "Controls this dismissal policy.",
        "defaultLabel": "true"
      },
      {
        "name": "triggerValue / defaultTriggerValue",
        "typeLabel": "string",
        "description": "Controlled or initial active trigger."
      },
      {
        "name": "onTriggerValueChange",
        "typeLabel": "(value: string | undefined) => void",
        "description": "Receives active-trigger changes."
      },
      {
        "name": "id / ids",
        "typeLabel": "string / TooltipIds",
        "description": "Stable content, arrow and per-trigger IDs."
      },
      {
        "name": "aria-label",
        "typeLabel": "string",
        "description": "Alternative tooltip text, not the trigger name."
      },
      {
        "name": "positioning",
        "typeLabel": "TooltipPositioningOptions",
        "description": "Placement, offset, fixed strategy, collision, sizing and virtual-anchor controls."
      },
      {
        "name": "lazyMount / unmountOnExit",
        "typeLabel": "boolean",
        "description": "Control initial and exit mounting.",
        "defaultLabel": "true"
      },
      {
        "name": "present",
        "typeLabel": "boolean",
        "description": "Override presence without changing open state."
      },
      {
        "name": "immediate",
        "typeLabel": "boolean",
        "description": "Synchronize presence without the next-frame deferral.",
        "defaultLabel": "false"
      },
      {
        "name": "onExitComplete",
        "typeLabel": "() => void",
        "description": "Called when exit completes."
      },
      {
        "name": "skipAnimationOnMount",
        "typeLabel": "boolean",
        "description": "Skip initial-open motion.",
        "defaultLabel": "false"
      },
      {
        "name": "hideMode",
        "typeLabel": "\"display-none\" | \"activity\"",
        "description": "Activity requires React 19.2+.",
        "defaultLabel": "display-none"
      },
      {
        "name": "variant",
        "typeLabel": "\"plain\" | \"rich\"",
        "description": "Compact hint or title and description.",
        "defaultLabel": "plain"
      }
    ]
  },
  {
    "id": "props-trigger",
    "title": "Trigger",
    "description": "Preserves native focus and activation on the composed control.",
    "rows": [
      {
        "name": "value",
        "typeLabel": "string",
        "description": "Unique value when sharing content."
      },
      {
        "name": "asChild / render",
        "typeLabel": "composition",
        "description": "Compose one named control; preserve its ref and handlers."
      }
    ]
  },
  {
    "id": "props-content",
    "title": "Content",
    "description": "Positioned hint and Brick visual recipe.",
    "rows": [
      {
        "name": "side",
        "typeLabel": "\"top\" | \"right\" | \"bottom\" | \"left\"",
        "description": "Legacy placement fallback.",
        "defaultLabel": "top"
      },
      {
        "name": "align",
        "typeLabel": "\"start\" | \"center\" | \"end\"",
        "description": "Logical alignment fallback.",
        "defaultLabel": "center"
      },
      {
        "name": "sideOffset",
        "typeLabel": "number",
        "description": "Distance fallback.",
        "defaultLabel": "8"
      },
      {
        "name": "radius",
        "typeLabel": "Radius",
        "description": "Core or semantic corner choice."
      },
      {
        "name": "shape",
        "typeLabel": "\"rounded\" | \"pill\"",
        "description": "Legacy radius recipe.",
        "defaultLabel": "rounded"
      },
      {
        "name": "ariaLabel",
        "typeLabel": "string",
        "description": "Alternative text."
      },
      {
        "name": "asChild / render",
        "typeLabel": "composition",
        "description": "Composed host must forward style and ref."
      }
    ]
  },
  {
    "id": "props-arrow",
    "title": "Arrow",
    "description": "Optional SVG pointer, automatically positioned.",
    "rows": [
      {
        "name": "width / height",
        "typeLabel": "number",
        "description": "SVG pointer geometry.",
        "defaultLabel": "10 / 5"
      },
      {
        "name": "asChild / render",
        "typeLabel": "composition",
        "description": "Custom SVG host."
      }
    ]
  },
  {
    "id": "props-provider",
    "title": "Provider",
    "description": "Shares timing across independent roots.",
    "rows": [
      {
        "name": "openDelay / closeDelay / skipDelay",
        "typeLabel": "number",
        "description": "Timing in milliseconds.",
        "defaultLabel": "400 / 150 / 300"
      }
    ]
  },
  {
    "id": "props-root-provider",
    "title": "RootProvider",
    "description": "Uses an external useTooltip controller; do not add another Root.",
    "rows": [
      {
        "name": "value",
        "typeLabel": "UseTooltipReturn",
        "description": "Controller returned by useTooltip."
      }
    ]
  },
  {
    "id": "props-context",
    "title": "Context",
    "description": "Reads public state without mutable internal refs.",
    "rows": [
      {
        "name": "children",
        "typeLabel": "(state: TooltipState) => ReactNode",
        "description": "Receives open/setOpen and triggerValue/setTriggerValue."
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
        "description": "Custom portal container."
      },
      {
        "name": "disabled",
        "typeLabel": "boolean",
        "description": "Keep content inline.",
        "defaultLabel": "false"
      }
    ]
  },
  {
    "id": "props-title",
    "title": "Title",
    "description": "Optional rich-content title.",
    "rows": [
      {
        "name": "asChild / render",
        "typeLabel": "composition",
        "description": "Compose a text host."
      }
    ]
  },
  {
    "id": "props-description",
    "title": "Description",
    "description": "Optional rich-content supporting text.",
    "rows": [
      {
        "name": "asChild / render",
        "typeLabel": "composition",
        "description": "Compose a text host."
      }
    ]
  }
];
export const sections = ownerSections(examples,parts);
export { TooltipBasic, TooltipBasicSource };
