import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { FloatingPanelBasic } from "./examples/FloatingPanelBasic.js";
import BasicSource from "./examples/FloatingPanelBasic.tsx?raw";
import { FloatingPanelControlled } from "./examples/FloatingPanelControlled.js";
import ControlledSource from "./examples/FloatingPanelControlled.tsx?raw";
import { FloatingPanelStore } from "./examples/FloatingPanelStore.js";
import StoreSource from "./examples/FloatingPanelStore.tsx?raw";
import { FloatingPanelStages } from "./examples/FloatingPanelStages.js";
import StagesSource from "./examples/FloatingPanelStages.tsx?raw";
import { FloatingPanelMultiple } from "./examples/FloatingPanelMultiple.js";
import MultipleSource from "./examples/FloatingPanelMultiple.tsx?raw";
import { FloatingPanelOverlay } from "./examples/FloatingPanelOverlay.js";
import OverlaySource from "./examples/FloatingPanelOverlay.tsx?raw";
import { FloatingPanelContext } from "./examples/FloatingPanelContext.js";
import ContextSource from "./examples/FloatingPanelContext.tsx?raw";
import { FloatingPanelDisableDrag } from "./examples/FloatingPanelDisableDrag.js";
import DisableDragSource from "./examples/FloatingPanelDisableDrag.tsx?raw";
import { FloatingPanelDisableResize } from "./examples/FloatingPanelDisableResize.js";
import DisableResizeSource from "./examples/FloatingPanelDisableResize.tsx?raw";
import { FloatingPanelResizeAxes } from "./examples/FloatingPanelResizeAxes.js";
import ResizeAxesSource from "./examples/FloatingPanelResizeAxes.tsx?raw";
import { FloatingPanelConstraints } from "./examples/FloatingPanelConstraints.js";
import ConstraintsSource from "./examples/FloatingPanelConstraints.tsx?raw";
import { FloatingPanelAnchor } from "./examples/FloatingPanelAnchor.js";
import AnchorSource from "./examples/FloatingPanelAnchor.tsx?raw";
import { FloatingPanelBoundary } from "./examples/FloatingPanelBoundary.js";
import BoundarySource from "./examples/FloatingPanelBoundary.tsx?raw";
import { FloatingPanelPosition } from "./examples/FloatingPanelPosition.js";
import PositionSource from "./examples/FloatingPanelPosition.tsx?raw";
import { FloatingPanelSize } from "./examples/FloatingPanelSize.js";
import SizeSource from "./examples/FloatingPanelSize.tsx?raw";
import { FloatingPanelOverflow } from "./examples/FloatingPanelOverflow.js";
import OverflowSource from "./examples/FloatingPanelOverflow.tsx?raw";
import { FloatingPanelRTL } from "./examples/FloatingPanelRTL.js";
import RTLSource from "./examples/FloatingPanelRTL.tsx?raw";
import { FloatingPanelKeyboard } from "./examples/FloatingPanelKeyboard.js";
import KeyboardSource from "./examples/FloatingPanelKeyboard.tsx?raw";
import { FloatingPanelRetained } from "./examples/FloatingPanelRetained.js";
import RetainedSource from "./examples/FloatingPanelRetained.tsx?raw";
export const Basic = FloatingPanelBasic;
export const basicSource = BasicSource;
export const examples: OwnerExample[] = [
{id:"controlled",title:"Controlled open",description:"Keep open state in your application.",Demo:FloatingPanelControlled,source:ControlledSource},
{id:"store",title:"Store",description:"Use one controller with RootProvider for outside commands.",Demo:FloatingPanelStore,source:StoreSource},
{id:"stages",title:"Stages",description:"Restore appears while minimized or maximized; normal mode offers both stage actions.",Demo:FloatingPanelStages,source:StagesSource},
{id:"multiple",title:"Multiple panels",description:"Each panel has its own position, size and activation.",Demo:FloatingPanelMultiple,source:MultipleSource},
{id:"overlay",title:"Overlay manager",description:"Create instances imperatively without replacing panel behavior.",Demo:FloatingPanelOverlay,source:OverlaySource},
{id:"context",title:"Context",description:"Read and update geometry inside the existing Root.",Demo:FloatingPanelContext,source:ContextSource},
{id:"disable-drag",title:"Disable drag",description:"Keep the panel fixed while retaining other controls.",Demo:FloatingPanelDisableDrag,source:DisableDragSource},
{id:"disable-resize",title:"Disable resize",description:"Disable resize handles and user stage controls.",Demo:FloatingPanelDisableResize,source:DisableResizeSource},
{id:"resize-axes",title:"Resize axes",description:"Choose physical edges and corners. Shared handle props may be passed to ResizeTriggers.",Demo:FloatingPanelResizeAxes,source:ResizeAxesSource},
{id:"constraints",title:"Min and max size",description:"Constrain the border-box dimensions without application CSS.",Demo:FloatingPanelConstraints,source:ConstraintsSource},
{id:"anchor",title:"Anchor position",description:"Compute initial coordinates from the trigger; fixed coordinates are viewport-relative.",Demo:FloatingPanelAnchor,source:AnchorSource},
{id:"boundary",title:"Boundary",description:"Use an absolute panel inside a positioned element; portal destination and geometry are distinct.",Demo:FloatingPanelBoundary,source:BoundarySource},
{id:"position",title:"Controlled position",description:"Accept proposed coordinates through onPositionChange.",Demo:FloatingPanelPosition,source:PositionSource},
{id:"size",title:"Controlled size",description:"Accept proposed dimensions through onSizeChange.",Demo:FloatingPanelSize,source:SizeSource},
{id:"overflow",title:"Prevent overflow",description:"Constrain dragging and resizing to the available boundary.",Demo:FloatingPanelOverflow,source:OverflowSource},
{id:"rtl",title:"RTL",description:"Layout follows direction; physical arrow and resize-axis directions do not reverse.",Demo:FloatingPanelRTL,source:RTLSource},
{id:"keyboard",title:"Keyboard and numeric controls",description:"Use arrows on the panel or drag region; Control/Command resizes and Shift increases the step. Numeric fields offer precise click/tap alternatives.",Demo:FloatingPanelKeyboard,source:KeyboardSource},
{id:"retained",title:"Retained state",description:"Keep the body mounted and preserve geometry across closure.",Demo:FloatingPanelRetained,source:RetainedSource},
];
export const parts: OwnerPart[] = [
  {
    "id": "props-root",
    "title": "Root",
    "description": "Behavior options shared with useFloatingPanel; geometry is not a visual-size recipe.",
    "rows": [
      {
        "name": "open / defaultOpen",
        "typeLabel": "boolean",
        "description": "Controlled or initial open state.",
        "defaultLabel": "false"
      },
      {
        "name": "onOpenChange",
        "typeLabel": "(open, reason?) => void",
        "description": "Accept or reject a disclosure proposal."
      },
      {
        "name": "position / defaultPosition",
        "typeLabel": "FloatingPanelPoint",
        "description": "Controlled or initial CSS-pixel coordinates. Omitted initial placement is centered."
      },
      {
        "name": "size / defaultSize",
        "typeLabel": "FloatingPanelSize",
        "description": "Controlled or initial border-box dimensions.",
        "defaultLabel": "{ width: 320, height: 240 }"
      },
      {
        "name": "minSize",
        "typeLabel": "FloatingPanelSize",
        "description": "Minimum dimensions, capped by a strict smaller boundary.",
        "defaultLabel": "{ width: 240, height: 100 }"
      },
      {
        "name": "maxSize",
        "typeLabel": "FloatingPanelSize",
        "description": "Optional maximum dimensions."
      },
      {
        "name": "onPositionChange / onPositionChangeEnd",
        "typeLabel": "(point, details) => void",
        "description": "Proposals and accepted completion coordinates."
      },
      {
        "name": "onSizeChange / onSizeChangeEnd",
        "typeLabel": "(size, details) => void",
        "description": "Proposals and accepted completion dimensions."
      },
      {
        "name": "onStageChange",
        "typeLabel": "(stage) => void",
        "description": "Observe default, minimized or maximized stage."
      },
      {
        "name": "draggable / resizable",
        "typeLabel": "boolean",
        "description": "Enable manipulation. resizable=false also disables user staging.",
        "defaultLabel": "true"
      },
      {
        "name": "disabled",
        "typeLabel": "boolean",
        "description": "Disable panel actions.",
        "defaultLabel": "false"
      },
      {
        "name": "closeOnEscape",
        "typeLabel": "boolean",
        "description": "Allow Escape dismissal after manipulation cancellation.",
        "defaultLabel": "false"
      },
      {
        "name": "gridSize",
        "typeLabel": "number",
        "description": "Movement increment in CSS pixels.",
        "defaultLabel": "1"
      },
      {
        "name": "scale",
        "typeLabel": "number",
        "description": "Positive uniform containing-block scale.",
        "defaultLabel": "1"
      },
      {
        "name": "lockAspectRatio",
        "typeLabel": "boolean",
        "description": "Preserve the current ratio while resizing.",
        "defaultLabel": "false"
      },
      {
        "name": "allowOverflow",
        "typeLabel": "boolean",
        "description": "Permit geometry outside the boundary.",
        "defaultLabel": "true"
      },
      {
        "name": "strategy",
        "typeLabel": "\"fixed\" | \"absolute\"",
        "description": "Viewport or positioned-container coordinates.",
        "defaultLabel": "\"fixed\""
      },
      {
        "name": "getBoundaryEl",
        "typeLabel": "() => HTMLElement | null",
        "description": "Optional movement/resize boundary."
      },
      {
        "name": "getAnchorPosition",
        "typeLabel": "({ triggerRect, boundaryRect }) => FloatingPanelPoint",
        "description": "Initial placement resolver in the selected coordinate space."
      },
      {
        "name": "persistRect",
        "typeLabel": "boolean",
        "description": "Keep accepted normal geometry on reopening.",
        "defaultLabel": "false"
      },
      {
        "name": "initialFocus / finalFocus",
        "typeLabel": "FloatingPanelFocusTarget",
        "description": "Ref, resolver or false; initial fallback is Content."
      },
      {
        "name": "restoreFocus",
        "typeLabel": "boolean",
        "description": "Return focus on close.",
        "defaultLabel": "true"
      },
      {
        "name": "id / ids",
        "typeLabel": "string / part ID map",
        "description": "Stable IDs for relationships."
      },
      {
        "name": "dir",
        "typeLabel": "\"ltr\" | \"rtl\"",
        "description": "Inherited or explicit writing direction."
      },
      {
        "name": "translations",
        "typeLabel": "FloatingPanelOptions[\"translations\"]",
        "description": "Localized close, stage, move and resize labels."
      },
      {
        "name": "lazyMount / unmountOnExit",
        "typeLabel": "boolean",
        "description": "Mount on first opening and remove after exit.",
        "defaultLabel": "true"
      },
      {
        "name": "onExitComplete",
        "typeLabel": "() => void",
        "description": "Called after owned exit completion."
      },
      {
        "name": "present",
        "typeLabel": "boolean",
        "description": "Advanced presentation override; independent of open state."
      },
      {
        "name": "immediate / skipAnimationOnMount",
        "typeLabel": "boolean",
        "description": "Presentation scheduling and initial-animation policy.",
        "defaultLabel": "false"
      },
      {
        "name": "hideMode",
        "typeLabel": "\"display-none\" | \"activity\"",
        "description": "Activity requires React 19.2+; use display-none on earlier runtimes.",
        "defaultLabel": "\"display-none\""
      }
    ]
  },
  {
    "id": "props-provider",
    "title": "RootProvider",
    "description": "Use one real controller from the Brick hook.",
    "rows": [
      {
        "name": "value",
        "typeLabel": "FloatingPanelController",
        "description": "Controller returned by useFloatingPanel."
      }
    ]
  },
  {
    "id": "props-context",
    "title": "Context",
    "description": "Read state and invoke commands inside Root.",
    "rows": [
      {
        "name": "children",
        "typeLabel": "(controller: FloatingPanelController) => ReactNode",
        "description": "Access open, geometry, stage, dragging/resizing and activation; invoke setOpen, setPosition, setSize, minimize, maximize, restore and bringToFront."
      }
    ]
  },
  {
    "id": "props-content",
    "title": "Content",
    "description": "Named nonmodal dialog. All rendered parts also accept native props, asChild/render and an individual ref.",
    "rows": [
      {
        "name": "radius",
        "typeLabel": "Radius",
        "description": "Core or semantic radius token; omitted uses overlay."
      },
      {
        "name": "tabIndex",
        "typeLabel": "number",
        "description": "Keyboard target for movement/resizing.",
        "defaultLabel": "0"
      },
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "description": "Merge into one compatible child.",
        "defaultLabel": "false"
      },
      {
        "name": "render",
        "typeLabel": "RenderProp",
        "description": "Replace the native host while preserving merged behavior."
      }
    ]
  },
  {
    "id": "props-stage",
    "title": "StageTrigger",
    "description": "Native action; compose IconButton using asChild.",
    "rows": [
      {
        "name": "stage",
        "typeLabel": "\"default\" | \"minimized\" | \"maximized\"",
        "description": "Required target stage. Default restores; both other triggers hide while staged."
      }
    ]
  },
  {
    "id": "props-resize",
    "title": "ResizeTrigger",
    "description": "One pointer handle, outside the default tab order. Explicit semantics remain available.",
    "rows": [
      {
        "name": "axis",
        "typeLabel": "\"n\" | \"s\" | \"e\" | \"w\" | \"ne\" | \"nw\" | \"se\" | \"sw\"",
        "description": "Required physical resize direction."
      },
      {
        "name": "tabIndex",
        "typeLabel": "number",
        "description": "Opt into a bespoke keyboard composition if necessary.",
        "defaultLabel": "-1"
      }
    ]
  },
  {
    "id": "props-resizes",
    "title": "ResizeTriggers",
    "description": "Shortcut: one handle for each axis; no wrapper or shared ref.",
    "rows": [
      {
        "name": "axes",
        "typeLabel": "readonly FloatingPanelAxis[]",
        "description": "Subset of handles.",
        "defaultLabel": "all eight"
      },
      {
        "name": "…handleProps",
        "typeLabel": "Omit<FloatingPanelResizeTriggerProps, \"axis\">",
        "description": "Shared classes, styles, labeling, rendering and event handlers. Use individual handles for distinct refs or labels."
      }
    ]
  },
  {
    "id": "props-portal",
    "title": "Portal",
    "description": "Optional DOM destination, independent of positioning strategy.",
    "rows": [
      {
        "name": "container",
        "typeLabel": "HTMLElement | null",
        "description": "Host element; default is the environment document body."
      },
      {
        "name": "disabled",
        "typeLabel": "boolean",
        "description": "Render inline.",
        "defaultLabel": "false"
      }
    ]
  }
];
export const sections = ownerSections(examples, parts);
export const usage = `<FloatingPanel.Root>
  <FloatingPanel.Trigger />
  <FloatingPanel.Portal>
    <FloatingPanel.Positioner>
      <FloatingPanel.Content>
        <FloatingPanel.Header>
          <FloatingPanel.DragTrigger><FloatingPanel.Title>Title</FloatingPanel.Title></FloatingPanel.DragTrigger>
          <FloatingPanel.Control><FloatingPanel.CloseTrigger>Close</FloatingPanel.CloseTrigger></FloatingPanel.Control>
        </FloatingPanel.Header>
        <FloatingPanel.Body>Content</FloatingPanel.Body>
        <FloatingPanel.ResizeTriggers />
      </FloatingPanel.Content>
    </FloatingPanel.Positioner>
  </FloatingPanel.Portal>
</FloatingPanel.Root>`;
