import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { DrawerBasic } from "./examples/DrawerBasic.js";
import { DrawerNested } from "./examples/DrawerNested.js";
import DrawerNestedSource from "./examples/DrawerNested.tsx?raw";
import { DrawerScrolling } from "./examples/DrawerScrolling.js";
import DrawerScrollingSource from "./examples/DrawerScrolling.tsx?raw";
import DrawerBasicSource from "./examples/DrawerBasic.tsx?raw";
import { DrawerControlled } from "./examples/DrawerControlled.js";
import DrawerControlledSource from "./examples/DrawerControlled.tsx?raw";
import { DrawerSizes } from "./examples/DrawerSizes.js";
import DrawerSizesSource from "./examples/DrawerSizes.tsx?raw";
import { DrawerContext } from "./examples/DrawerContext.js";
import DrawerContextSource from "./examples/DrawerContext.tsx?raw";
import { DrawerOffset } from "./examples/DrawerOffset.js";
import DrawerOffsetSource from "./examples/DrawerOffset.tsx?raw";
import { DrawerPlacement } from "./examples/DrawerPlacement.js";
import DrawerPlacementSource from "./examples/DrawerPlacement.tsx?raw";
import { DrawerInitialFocus } from "./examples/DrawerInitialFocus.js";
import DrawerInitialFocusSource from "./examples/DrawerInitialFocus.tsx?raw";
import { DrawerHeaderActions } from "./examples/DrawerHeaderActions.js";
import DrawerHeaderActionsSource from "./examples/DrawerHeaderActions.tsx?raw";
import { DrawerResponsive } from "./examples/DrawerResponsive.js";
import DrawerResponsiveSource from "./examples/DrawerResponsive.tsx?raw";
import { DrawerNonmodal } from "./examples/DrawerNonmodal.js";
import DrawerNonmodalSource from "./examples/DrawerNonmodal.tsx?raw";
import { DrawerRetained } from "./examples/DrawerRetained.js";
import DrawerRetainedSource from "./examples/DrawerRetained.tsx?raw";
import { DrawerContainer } from "./examples/DrawerContainer.js";
import DrawerContainerSource from "./examples/DrawerContainer.tsx?raw";
export const Basic = DrawerBasic;
export const basicSource = DrawerBasicSource;
export const examples: OwnerExample[] = [
{"id":"controlled","title":"Controlled","description":"Let application state coordinate opening and closing.", Demo: DrawerControlled, source: DrawerControlledSource },
{"id":"sizes","title":"Sizes","description":"Choose xs, sm, md, lg, xl or full. The viewport safely caps each width.", Demo: DrawerSizes, source: DrawerSizesSource },
{"id":"context","title":"Context","description":"Read the existing open state and close from inside the panel.", Demo: DrawerContext, source: DrawerContextSource },
{"id":"offset","title":"Offset","description":"Add a token inset without application positioning CSS.", Demo: DrawerOffset, source: DrawerOffsetSource },
{"id":"placement","title":"Placement","description":"Start and end follow writing direction; top and bottom grow to their content cap.", Demo: DrawerPlacement, source: DrawerPlacementSource },
{"id":"initial-focus","title":"Initial Focus","description":"Choose the first focus target explicitly.", Demo: DrawerInitialFocus, source: DrawerInitialFocusSource },
{"id":"custom-container","title":"Container","description":"Render within a positioned region. Container geometry does not limit document modality.", Demo: DrawerContainer, source: DrawerContainerSource },
{"id":"header-actions","title":"Header Actions","description":"Compose a close control, title and actions with Stack.", Demo: DrawerHeaderActions, source: DrawerHeaderActionsSource },
{"id":"responsive","title":"Responsive","description":"Change size and edge using CSS-only responsive values.", Demo: DrawerResponsive, source: DrawerResponsiveSource },
{"id":"nonmodal","title":"Nonmodal","description":"Explicitly allow background interaction for a temporary tool panel.", Demo: DrawerNonmodal, source: DrawerNonmodalSource },
{"id":"retained","title":"Retained","description":"Preserve the same uncontrolled input and draft across closure.", Demo: DrawerRetained, source: DrawerRetainedSource },
{id:"nested",title:"Nested",description:"Keep nested panels within the existing layer and focus ownership.",Demo:DrawerNested,source:DrawerNestedSource},
{id:"scrolling",title:"Scrolling",description:"Body owns long-content scrolling without a custom height or application CSS.",Demo:DrawerScrolling,source:DrawerScrollingSource},
];
export const parts: OwnerPart[] = [
 { id:"props-root", title:"Root", description:"State, modality and dismissal policy.", rows:[
 {name:"open", typeLabel:"boolean", description:"Controlled opening."},
 {name:"defaultOpen", typeLabel:"boolean", defaultLabel:"false", description:"Initial uncontrolled state."},
 {name:"onOpenChange", typeLabel:"(open, reason?) => void", description:"State changes with the dismissal reason."},
 {name:"modal", typeLabel:"boolean", defaultLabel:"true", description:"Isolate background interaction. Omit Overlay for nonmodal panels."},
 {name:"trapFocus", typeLabel:"boolean", defaultLabel:"modal", description:"Contain keyboard focus."},
 {name:"preventScroll", typeLabel:"boolean", defaultLabel:"modal", description:"Lock background document scrolling."},
 {name:"keepMounted", typeLabel:"boolean", defaultLabel:"false", description:"Preserve hidden content and child state."},
 {name:"closeOnEscape", typeLabel:"boolean", defaultLabel:"true", description:"Enable Escape dismissal."},
 {name:"closeOnBackdropClick", typeLabel:"boolean", defaultLabel:"true", description:"Enable outside pointer dismissal."},
 {name:"onEscapeKeyDown", typeLabel:"(event: KeyboardEvent) => void", description:"Prevent default to cancel Escape dismissal."},
 {name:"onInteractOutside", typeLabel:"(event: Event) => void", description:"Prevent default to cancel outside pointer dismissal."},
 {name:"disabled", typeLabel:"boolean", defaultLabel:"false", description:"Prevent trigger opening."},
 {name:"onExitComplete", typeLabel:"() => void", description:"Runs after the owned exit animations finish."}
 ]},
 {id:"props-positioner", title:"Positioner", description:"Owned containing block and inset, beside Overlay.",rows:[
 {name:"positioning",typeLabel:'"fixed" | "absolute"',defaultLabel:'"fixed"',description:"Viewport or positioned-container geometry."},
 {name:"inset",typeLabel:'"none" | "sm" | "md" | "lg"',defaultLabel:'"none"',description:"Token spacing around the panel."}
 ]},
 {id:"props-content",title:"Content",description:"Panel recipes and accessible focus targets.",rows:[
 {name:"size",typeLabel:'ResponsiveValue<"xs" | "sm" | "md" | "lg" | "xl" | "full">',defaultLabel:'"xs"',description:"Sparse values inherit the xs baseline; full fills the available region."},
 {name:"placement",typeLabel:'ResponsiveValue<"start" | "end" | "top" | "bottom">',defaultLabel:'"end"',description:"CSS-only edge placement, with RTL logical edges."},
 {name:"radius",typeLabel:"Radius",description:"Flush panels are square; inset panels use control radius unless overridden."},
 {name:"initialFocus",typeLabel:"ref | callback | false",description:"Initial focus target."},
 {name:"finalFocus",typeLabel:"ref | callback | false",description:"Focus restoration target."}
 ]},
 {id:"props-overlay",title:"Overlay",description:"Optional scrim and backdrop dismissal.",rows:[
 {name:"positioning",typeLabel:'"fixed" | "absolute"',defaultLabel:'"fixed"',description:"Match the Positioner geometry."},
 {name:"disabled",typeLabel:"boolean",defaultLabel:"false",description:"Disable this scrim's dismissal."}
 ]},
 {id:"props-portal",title:"Portal",description:"DOM destination, independent from geometric containment.",rows:[
 {name:"container",typeLabel:"HTMLElement",description:"Portal destination."},
 {name:"disabled",typeLabel:"boolean",defaultLabel:"false",description:"Render children inline."}
 ]},
 {id:"props-close",title:"Close",description:"Dismissal behavior composed with Button or CloseButton.",rows:[
 {name:"placement",typeLabel:'"inline" | "corner"',defaultLabel:'"inline"',description:"Normal flow or logical top-end corner."},
 {name:"asChild",typeLabel:"boolean",defaultLabel:"false",description:"Merge behavior into the supplied action."},
 {name:"render",typeLabel:"RenderProp",description:"Custom rendering with merged props and refs."}
 ]},
 {id:"props-context",title:"Context",description:"Read and update the Root state without another store.",rows:[
 {name:"children",typeLabel:"({ open, setOpen }) => ReactNode",description:"Render-function access to Root."}
 ]},
 {id:"props-footer",title:"Footer",description:"Logical action distribution.",rows:[
 {name:"justify",typeLabel:'"start" | "center" | "end" | "between"',defaultLabel:'"end"',description:"Action alignment. Use Button fullWidth only when desired."}
 ]}
];
export const sections = ownerSections(examples, parts);
export const usage = `<Drawer.Root>
  <Drawer.Trigger />
  <Drawer.Portal>
    <Drawer.Overlay />
    <Drawer.Positioner>
      <Drawer.Content>
        <Drawer.Header><Drawer.Title>Title</Drawer.Title></Drawer.Header>
        <Drawer.Body>Content</Drawer.Body>
        <Drawer.Footer><Drawer.Close>Close</Drawer.Close></Drawer.Footer>
      </Drawer.Content>
    </Drawer.Positioner>
  </Drawer.Portal>
</Drawer.Root>`;
