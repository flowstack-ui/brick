import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { AlertDialogBasic } from "./examples/AlertDialogBasic.js";
import BasicSource from "./examples/AlertDialogBasic.tsx?raw";
import { AlertDialogSizes } from "./examples/AlertDialogSizes.js";
import SizesSource from "./examples/AlertDialogSizes.tsx?raw";
import { AlertDialogResponsive } from "./examples/AlertDialogResponsive.js";
import ResponsiveSource from "./examples/AlertDialogResponsive.tsx?raw";
import { AlertDialogPlacement } from "./examples/AlertDialogPlacement.js";
import PlacementSource from "./examples/AlertDialogPlacement.tsx?raw";
import { AlertDialogScrolling } from "./examples/AlertDialogScrolling.js";
import ScrollingSource from "./examples/AlertDialogScrolling.tsx?raw";
import { AlertDialogMotion } from "./examples/AlertDialogMotion.js";
import MotionSource from "./examples/AlertDialogMotion.tsx?raw";
import { AlertDialogRetained } from "./examples/AlertDialogRetained.js";
import RetainedSource from "./examples/AlertDialogRetained.tsx?raw";
import { AlertDialogRadius } from "./examples/AlertDialogRadius.js";
import RadiusSource from "./examples/AlertDialogRadius.tsx?raw";
import { AlertDialogControlled } from "./examples/AlertDialogControlled.js";
import ControlledSource from "./examples/AlertDialogControlled.tsx?raw";
import { AlertDialogNested } from "./examples/AlertDialogNested.js";
import NestedSource from "./examples/AlertDialogNested.tsx?raw";
export const Basic = AlertDialogBasic;
export const basicSource = BasicSource;
export const examples: OwnerExample[] = [
{ id: "sizes", title: "Sizes", description: "Choose the same width and viewport recipes as Dialog.", Demo: AlertDialogSizes, source: SizesSource },
{ id: "responsive", title: "Responsive", description: "Use CSS-only sizing: fullscreen below md, then a large panel.", Demo: AlertDialogResponsive, source: ResponsiveSource },
{ id: "placement", title: "Placement", description: "Top, center and bottom use the shared Dialog positioner.", Demo: AlertDialogPlacement, source: PlacementSource },
{ id: "scrolling", title: "Scrolling", description: "Scroll the body or the whole decision without losing the actions.", Demo: AlertDialogScrolling, source: ScrollingSource },
{ id: "motion", title: "Motion", description: "Use the shared entrance presets, including no motion.", Demo: AlertDialogMotion, source: MotionSource },
{ id: "retained", title: "Retained state", description: "Close and reopen without losing the reviewed count.", Demo: AlertDialogRetained, source: RetainedSource },
{ id: "radius", title: "Radius", description: "Choose a core or semantic radius while retaining shared styling.", Demo: AlertDialogRadius, source: RadiusSource },
{ id: "controlled", title: "Controlled", description: "Application state and prevented Action closure coordinate the operation.", Demo: AlertDialogControlled, source: ControlledSource },
{ id: "nested", title: "Nested", description: "A confirmation owns focus above its parent Dialog.", Demo: AlertDialogNested, source: NestedSource },
];
export const parts: OwnerPart[] = [
{ id:"props-root", title:"Root", description:"Controlled state and strict modal behavior.", rows:[
{name:"open", typeLabel:"boolean",description:"Controlled open state."},
{name:"defaultOpen",typeLabel:"boolean",defaultLabel:"false",description:"Initial uncontrolled state."},
{name:"onOpenChange",typeLabel:"(open, reason?) => void",description:"Open changes with distinct Cancel and Action reasons."},
{name:"keepMounted",typeLabel:"boolean",defaultLabel:"false",description:"Preserve hidden child state."},
{name:"closeOnEscape",typeLabel:"boolean",defaultLabel:"true",description:"Allow Escape. Outside clicks are always blocked."},
{name:"disabled",typeLabel:"boolean",defaultLabel:"false",description:"Prevent trigger opening."},
{name:"onExitComplete",typeLabel:"() => void",description:"Called when exit surfaces finish."}
]},
{ id:"props-positioner",title:"Positioner",description:"Owned viewport alignment and scrolling.",rows:[
{name:"placement",typeLabel:'"top" | "center" | "bottom"',defaultLabel:'"top"',description:"Viewport alignment."},
{name:"scrollBehavior",typeLabel:'"inside" | "outside"',defaultLabel:'"outside"',description:"Body or whole-panel scrolling."}
]},
{id:"props-content",title:"Content",description:"Fixed alertdialog semantics and shared Dialog recipes.",rows:[
{name:"size",typeLabel:'ResponsiveValue<"xs" | "sm" | "md" | "lg" | "xl" | "cover" | "full">',defaultLabel:'"md"',description:"Sparse responsive values start at md. Viewport modes require Positioner."},
{name:"radius",typeLabel:"Radius",defaultLabel:'"control"',description:"Core or semantic corners. Fullscreen stays square."},
{name:"motionPreset",typeLabel:'"scale" | "slide-in-top" | "slide-in-bottom" | "slide-in-left" | "slide-in-right" | "none"',defaultLabel:'"scale"',description:"Content motion; reduced motion removes movement."},
{name:"initialFocus",typeLabel:"ref | callback | false",description:"Override only when another target is safer than Cancel."},
{name:"finalFocus",typeLabel:"ref | callback | false",description:"Explicit focus restoration target."}
]},
{id:"props-portal",title:"Portal",description:"Portal destination; keep theme and appearance ownership intact.",rows:[
{name:"container",typeLabel:"HTMLElement",description:"Same-document portal destination."},
{name:"disabled",typeLabel:"boolean",defaultLabel:"false",description:"Render inline."}
]},
{id:"props-cancel",title:"Cancel",description:"Safe initial focus and cancellation.",rows:[
{name:"asChild",typeLabel:"boolean",defaultLabel:"false",description:"Compose a Brick Button."},
{name:"render",typeLabel:"RenderProp",description:"Custom rendering with merged props and ref."},
{name:"autoFocus",typeLabel:"boolean",defaultLabel:"true",description:"Safe initial focus target."}
]},
{id:"props-action",title:"Action",description:"Affirmative response; application work remains external.",rows:[
{name:"asChild",typeLabel:"boolean",defaultLabel:"false",description:"Compose the affirmative Button."},
{name:"render",typeLabel:"RenderProp",description:"Custom rendering with merged props and ref."},
{name:"onClick",typeLabel:"MouseEventHandler",description:"Prevent default to keep the dialog open while work completes."}
]},
{id:"props-footer",title:"Footer",description:"Logical action distribution in source order.",rows:[
{name:"justify",typeLabel:'"start" | "center" | "end" | "between"',defaultLabel:'"end"',description:"Response alignment."}
]}
];
export const sections = ownerSections(examples, parts);
export const usage = `<AlertDialog.Root>
  <AlertDialog.Trigger />
  <AlertDialog.Portal>
    <AlertDialog.Overlay />
    <AlertDialog.Positioner>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Remove project?</AlertDialog.Title>
          <AlertDialog.Description>This cannot be undone.</AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action>Remove</AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Positioner>
  </AlertDialog.Portal>
</AlertDialog.Root>`;
