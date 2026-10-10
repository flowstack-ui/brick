import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { ToastTypes } from "./examples/ToastTypes.js";
import TypesSource from "./examples/ToastTypes.tsx?raw";
import { ToastDismiss } from "./examples/ToastDismiss.js";
import DismissSource from "./examples/ToastDismiss.tsx?raw";
import { ToastActionExample } from "./examples/ToastAction.js";
import ActionSource from "./examples/ToastAction.tsx?raw";
import { ToastPromise } from "./examples/ToastPromise.js";
import PromiseSource from "./examples/ToastPromise.tsx?raw";
import { ToastUpdate } from "./examples/ToastUpdate.js";
import UpdateSource from "./examples/ToastUpdate.tsx?raw";
import { ToastPause } from "./examples/ToastPause.js";
import PauseSource from "./examples/ToastPause.tsx?raw";
import { ToastLifecycle } from "./examples/ToastLifecycle.js";
import LifecycleSource from "./examples/ToastLifecycle.tsx?raw";
import { ToastRecipes } from "./examples/ToastRecipes.js";
import RecipesSource from "./examples/ToastRecipes.tsx?raw";
import { ToastPlacement } from "./examples/ToastPlacement.js";
import PlacementSource from "./examples/ToastPlacement.tsx?raw";
import { ToastQueue } from "./examples/ToastQueue.js";
import QueueSource from "./examples/ToastQueue.tsx?raw";
import { ToastOverlap } from "./examples/ToastOverlap.js";
import OverlapSource from "./examples/ToastOverlap.tsx?raw";
import { ToastCustom } from "./examples/ToastCustom.js";
import CustomSource from "./examples/ToastCustom.tsx?raw";
import { ToastTrack } from "./examples/ToastTrack.js";
import TrackSource from "./examples/ToastTrack.tsx?raw";
import { ToastDuration } from "./examples/ToastDuration.js";
import DurationSource from "./examples/ToastDuration.tsx?raw";
import { ToastPageIdle } from "./examples/ToastPageIdle.js";
import PageIdleSource from "./examples/ToastPageIdle.tsx?raw";
import { ToastWidth } from "./examples/ToastWidth.js";
import WidthSource from "./examples/ToastWidth.tsx?raw";
import { ToastDialog } from "./examples/ToastDialog.js";
import DialogSource from "./examples/ToastDialog.tsx?raw";
export const examples: OwnerExample[] = [
{id:"dialog",title:"Within a dialog",description:"Mount a scoped Toaster inside the dialog React tree so portalled notifications share its focus and isolation scope.",Demo:ToastDialog,source:DialogSource},
{id:"duration",title:"Duration",description:"Set a custom reading duration; loading and Infinity remain persistent.",Demo:ToastDuration,source:DurationSource},
{id:"pageidle",title:"Page idle",description:"The timer pauses while the page is hidden or its window loses focus.",Demo:ToastPageIdle,source:PageIdleSource},
{id:"width",title:"Width",description:"Use full width when the notification needs more available space; safe gutters remain.",Demo:ToastWidth,source:WidthSource},

{id:"types", title:"Types", description:"Status selects artwork and announcement priority; it does not force a solid background.", Demo:ToastTypes, source:TypesSource},
{id:"dismiss", title:"Dismissal", description:"Dismiss animates out; remove deletes immediately. Keep a dismissal path for persistent notifications.", Demo:ToastDismiss, source:DismissSource},
{id:"action", title:"Action", description:"A trailing action runs its callback once, then dismisses the toast.", Demo:ToastActionExample, source:ActionSource},
{id:"promise", title:"Promise", description:"Track loading, success and error while retaining access to the original result.", Demo:ToastPromise, source:PromiseSource},
{id:"update", title:"Update", description:"Use a stable ID to replace content and reset the duration.", Demo:ToastUpdate, source:UpdateSource},
{id:"pause", title:"Pause and resume", description:"Manual pause composes with hover, focus and page pauses; resuming one does not cancel the others.", Demo:ToastPause, source:PauseSource},
{id:"lifecycle", title:"Lifecycle", description:"Observe queued, visible, dismissing and unmounted status without owning the timer.", Demo:ToastLifecycle, source:LifecycleSource},
{id:"recipes", title:"Recipes", description:"Choose panel or solid presentation and tone independently from announcement semantics.", Demo:ToastRecipes, source:RecipesSource},
{id:"placement", title:"Placement and offsets", description:"Use logical placement and responsive spacing factors. Scoped examples have their own manager.", Demo:ToastPlacement, source:PlacementSource},
{id:"queue", title:"Queue limit", description:"Queued notifications receive their full duration when promoted into view.", Demo:ToastQueue, source:QueueSource},
{id:"overlap", title:"Overlapping stack", description:"Measured heights keep different-length messages stable. Hover or focus expands the stack.", Demo:ToastOverlap, source:OverlapSource},
{id:"custom", title:"Custom content", description:"Compose the public parts while keeping the manager’s text as the announcement source.", Demo:ToastCustom, source:CustomSource},
{id:"track", title:"Tracked promise", description:"Retain an ID for controls and unwrap the underlying async result.", Demo:ToastTrack, source:TrackSource}
];
export const parts: OwnerPart[] = [
  {
    "id": "props-toaster",
    "title": "Toaster",
    "description": "One viewport per manager. Native direction, style and ref target the viewport.",
    "rows": [
      {
        "name": "toaster",
        "typeLabel": "ToastApi",
        "defaultLabel": "default toast",
        "description": "Scoped manager created with createToaster."
      },
      {
        "name": "position",
        "typeLabel": "ToastPosition",
        "defaultLabel": "\"bottom-end\"",
        "description": "top/bottom with start, center or end; logical edges mirror in RTL."
      },
      {
        "name": "maxVisible",
        "typeLabel": "number",
        "defaultLabel": "3",
        "description": "Maximum visible notifications; overflow waits in the queue."
      },
      {
        "name": "width",
        "typeLabel": "\"responsive\" | \"compact\" | \"full\"",
        "defaultLabel": "\"responsive\"",
        "description": "24rem, 20rem or available viewport width, constrained to safe edges."
      },
      {
        "name": "stacking",
        "typeLabel": "\"separated\" | \"overlap\"",
        "defaultLabel": "\"separated\"",
        "description": "Measured stack; overlap expands on hover and focus."
      },
      {
        "name": "gap / offset",
        "typeLabel": "ResponsiveValue<number | string>",
        "defaultLabel": "4",
        "description": "Stack gap and all-edge offset; numbers are spacing factors."
      },
      {
        "name": "offsetBlockStart / offsetBlockEnd / offsetInlineStart / offsetInlineEnd",
        "typeLabel": "ResponsiveValue<number | string>",
        "defaultLabel": "offset",
        "description": "Per-edge overrides, safe-area insets are added."
      },
      {
        "name": "variant / tone / radius",
        "typeLabel": "ToastVariant / ToastTone / Radius",
        "defaultLabel": "surface / status / overlay",
        "description": "Default presentation for built-in cards; per-toast values override."
      },
      {
        "name": "pauseOnHover / pauseOnFocus / pauseOnFocusLoss",
        "typeLabel": "boolean",
        "defaultLabel": "true",
        "description": "Independent pauses; focus loss also observes page visibility."
      },
      {
        "name": "closeButton",
        "typeLabel": "boolean",
        "defaultLabel": "true",
        "description": "Default close control policy."
      },
      {
        "name": "hotkey",
        "typeLabel": "readonly string[]",
        "defaultLabel": "[\"F8\"]",
        "description": "Shortcut to notification viewport; [] disables."
      },
      {
        "name": "label / closeLabel",
        "typeLabel": "string",
        "defaultLabel": "LocaleProvider",
        "description": "Accessible viewport and close names."
      },
      {
        "name": "swipeDirection / swipeThreshold",
        "typeLabel": "ToastSwipeDirection / number",
        "defaultLabel": "— / 50",
        "description": "Optional directional swipe and distance in CSS pixels."
      },
      {
        "name": "renderToast",
        "typeLabel": "(ToastRenderState) => ReactNode",
        "defaultLabel": "—",
        "description": "Compose Root, icon/content/action/close. Pass toast/index/expanded through."
      },
      {
        "name": "container / portalDisabled",
        "typeLabel": "HTMLElement | null / boolean",
        "defaultLabel": "— / false",
        "description": "Portal destination, or inline rendering."
      }
    ]
  },
  {
    "id": "props-api",
    "title": "toast / createToaster",
    "description": "Imperative calls delegate lifecycle and timers to Atom. Create scopes once, never on each render.",
    "rows": [
      {
        "name": "createToaster(options)",
        "typeLabel": "{ duration?: number; removeDelay?: number }",
        "defaultLabel": "5000 / 200",
        "description": "Creates an isolated callable manager. No viewport is mounted automatically."
      },
      {
        "name": "toast(message, options) / toast(options)",
        "typeLabel": "ToastOptions",
        "defaultLabel": "—",
        "description": "Create a notification and return its stable ID."
      },
      {
        "name": "title / description",
        "typeLabel": "string",
        "defaultLabel": "—",
        "description": "At least one concise accessible message."
      },
      {
        "name": "type",
        "typeLabel": "ToastType",
        "defaultLabel": "default",
        "description": "default, success, error, warning, info or loading."
      },
      {
        "name": "variant",
        "typeLabel": "\"surface\" | \"solid\"",
        "defaultLabel": "\"surface\"",
        "description": "Panel or solid presentation."
      },
      {
        "name": "tone",
        "typeLabel": "ToastTone",
        "defaultLabel": "status",
        "description": "neutral, contrast, accent, success, danger, warning or info; presentation only."
      },
      {
        "name": "radius",
        "typeLabel": "Radius",
        "defaultLabel": "overlay",
        "description": "Shared core or semantic radius."
      },
      {
        "name": "duration / removeDelay",
        "typeLabel": "number",
        "defaultLabel": "5000 / 200",
        "description": "Reading duration (error 8000, loading Infinity) and exit retention."
      },
      {
        "name": "action / icon / closeButton",
        "typeLabel": "ToastActionData / ReactNode / boolean",
        "defaultLabel": "—",
        "description": "Optional action, decorative artwork and close override."
      },
      {
        "name": "dismissible",
        "typeLabel": "boolean",
        "defaultLabel": "true",
        "description": "Allow Escape and swipe dismissal."
      },
      {
        "name": "onStatusChange / onDismiss / onAutoClose",
        "typeLabel": "callbacks",
        "defaultLabel": "—",
        "description": "Lifecycle, final removal and elapsed-time notifications."
      },
      {
        "name": "meta",
        "typeLabel": "Record<string, unknown>",
        "defaultLabel": "—",
        "description": "Opaque application metadata."
      },
      {
        "name": "success / error / warning / info / loading",
        "typeLabel": "(message, options) => ToastId",
        "defaultLabel": "—",
        "description": "Status shortcuts."
      },
      {
        "name": "update / dismiss / remove",
        "typeLabel": "methods",
        "defaultLabel": "—",
        "description": "Update one ID; dismiss exits; remove deletes immediately. Omit ID to clear all."
      },
      {
        "name": "pause / resume",
        "typeLabel": "(id?: ToastId) => void",
        "defaultLabel": "—",
        "description": "Control manual pause for one ID or all; environmental pauses remain independent."
      },
      {
        "name": "promise / track",
        "typeLabel": "Promise or async factory, ToastPromiseOptions",
        "defaultLabel": "—",
        "description": "promise returns the result; track returns { id, unwrap }. Removed records stay removed."
      },
      {
        "name": "isVisible / isDismissed / getCount / getVisibleToasts / subscribe",
        "typeLabel": "inspection methods",
        "defaultLabel": "—",
        "description": "Read manager state or subscribe to changes."
      },
      {
        "name": "expand / collapse",
        "typeLabel": "() => void",
        "defaultLabel": "—",
        "description": "Control stack expansion."
      }
    ]
  },
  {
    "id": "props-root",
    "title": "Root",
    "description": "Styled card; use Toaster for queue and announcements.",
    "rows": [
      {
        "name": "toast / index / expanded",
        "typeLabel": "ToastData / number / boolean",
        "defaultLabel": "—",
        "description": "Pass renderer state unchanged for measured stacks."
      },
      {
        "name": "variant / tone / radius",
        "typeLabel": "ToastVariant / ToastTone / Radius",
        "defaultLabel": "surface / status / overlay",
        "description": "Finished card recipes."
      },
      {
        "name": "type / duration / paused / closeButton / dismissible",
        "typeLabel": "declarative controls",
        "defaultLabel": "inherited",
        "description": "Standalone root controls; manager records own store timers."
      },
      {
        "name": "forceMount / removeDelay",
        "typeLabel": "boolean / number",
        "defaultLabel": "false / 200",
        "description": "Standalone retention and exit timing."
      },
      {
        "name": "asChild / render",
        "typeLabel": "boolean / render function",
        "defaultLabel": "—",
        "description": "Compose a host while preserving Atom props and ref."
      }
    ]
  },
  {
    "id": "props-parts",
    "title": "Content and controls",
    "description": "Title, Description, Actions, Action and Close retain their native attributes and refs.",
    "rows": [
      {
        "name": "Icon.type",
        "typeLabel": "ToastType",
        "defaultLabel": "Root type",
        "description": "Override inherited artwork or supply decorative children."
      },
      {
        "name": "Content / Actions",
        "typeLabel": "native div props",
        "defaultLabel": "—",
        "description": "Arrange message and trailing actions."
      },
      {
        "name": "Title / Description",
        "typeLabel": "native paragraph props",
        "defaultLabel": "record message",
        "description": "Default to the corresponding toast message."
      },
      {
        "name": "Action",
        "typeLabel": "native button props",
        "defaultLabel": "record action",
        "description": "Runs callback then dismisses."
      },
      {
        "name": "Close",
        "typeLabel": "native button props",
        "defaultLabel": "—",
        "description": "Provide an accessible name in custom compositions."
      }
    ]
  }
];
export const sections = ownerSections(examples, parts);
