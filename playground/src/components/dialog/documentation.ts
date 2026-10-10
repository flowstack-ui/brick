import type { DialogRootProps, DialogPositionerProps, DialogContentProps, DialogPortalProps, DialogCloseProps, DialogFooterProps } from "@flowstack-ui/brick";
import type { OwnerExample } from "../../shared/OwnerDocumentation.js";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";
import type { DocsSectionMetadata } from "../../shared/DocsTableOfContents.js";
import { DialogBasic } from "./examples/DialogBasic.js";
import basicRaw from "./examples/DialogBasic.tsx?raw";
import { DialogSizes } from "./examples/DialogSizes.js";
import DialogSizesRaw from "./examples/DialogSizes.tsx?raw";
import { DialogCover } from "./examples/DialogCover.js";
import DialogCoverRaw from "./examples/DialogCover.tsx?raw";
import { DialogFull } from "./examples/DialogFull.js";
import DialogFullRaw from "./examples/DialogFull.tsx?raw";
import { DialogResponsive } from "./examples/DialogResponsive.js";
import DialogResponsiveRaw from "./examples/DialogResponsive.tsx?raw";
import { DialogPlacement } from "./examples/DialogPlacement.js";
import DialogPlacementRaw from "./examples/DialogPlacement.tsx?raw";
import { DialogControlled } from "./examples/DialogControlled.js";
import DialogControlledRaw from "./examples/DialogControlled.tsx?raw";
import { DialogRetained } from "./examples/DialogRetained.js";
import DialogRetainedRaw from "./examples/DialogRetained.tsx?raw";
import { DialogNested } from "./examples/DialogNested.js";
import DialogNestedRaw from "./examples/DialogNested.tsx?raw";
import { DialogInitialFocus } from "./examples/DialogInitialFocus.js";
import DialogInitialFocusRaw from "./examples/DialogInitialFocus.tsx?raw";
import { DialogInside } from "./examples/DialogInside.js";
import DialogInsideRaw from "./examples/DialogInside.tsx?raw";
import { DialogOutside } from "./examples/DialogOutside.js";
import DialogOutsideRaw from "./examples/DialogOutside.tsx?raw";
import { DialogMotion } from "./examples/DialogMotion.js";
import DialogMotionRaw from "./examples/DialogMotion.tsx?raw";
import { DialogRadius } from "./examples/DialogRadius.js";
import DialogRadiusRaw from "./examples/DialogRadius.tsx?raw";
import { DialogFooter } from "./examples/DialogFooter.js";
import DialogFooterRaw from "./examples/DialogFooter.tsx?raw";
export const Basic = DialogBasic;
export const basicSource = basicRaw;
export const examples: OwnerExample[] = [
{id:"sizes",title:"Sizes",description:"Choose a content width; insets stay consistent across sizes.",Demo:DialogSizes,source:DialogSizesRaw},
{id:"cover",title:"Cover",description:"Fill the viewport with an inset around the panel.",Demo:DialogCover,source:DialogCoverRaw},
{id:"full",title:"Fullscreen",description:"Use the entire viewport for a larger task.",Demo:DialogFull,source:DialogFullRaw},
{id:"responsive",title:"Responsive size",description:"Start fullscreen and switch to a large panel from md upward.",Demo:DialogResponsive,source:DialogResponsiveRaw},
{id:"placement",title:"Placement",description:"Place the panel at the top, center or bottom.",Demo:DialogPlacement,source:DialogPlacementRaw},
{id:"controlled",title:"Controlled",description:"Let application state control opening and closing.",Demo:DialogControlled,source:DialogControlledRaw},
{id:"retained",title:"Retained state",description:"Close and reopen: the counter is preserved by keepMounted.",Demo:DialogRetained,source:DialogRetainedRaw},
{id:"nested",title:"Nested dialogs",description:"Only the top dialog handles dismissal and focus containment.",Demo:DialogNested,source:DialogNestedRaw},
{id:"initial-focus",title:"Initial focus",description:"Focus a specific field when the dialog opens.",Demo:DialogInitialFocus,source:DialogInitialFocusRaw},
{id:"inside",title:"Inside scroll",description:"Keep actions available while the body scrolls.",Demo:DialogInside,source:DialogInsideRaw},
{id:"outside",title:"Outside scroll",description:"Scroll the whole dialog within the owned viewport boundary.",Demo:DialogOutside,source:DialogOutsideRaw},
{id:"motion",title:"Motion preset",description:"Choose an entrance direction or disable the content transition.",Demo:DialogMotion,source:DialogMotionRaw},
{id:"radius",title:"Radius",description:"Use a core or semantic radius without changing global theme defaults.",Demo:DialogRadius,source:DialogRadiusRaw},
{id:"footer",title:"Footer alignment",description:"Distribute actions without custom layout CSS.",Demo:DialogFooter,source:DialogFooterRaw},
];
export const rootRows: DocsPropDefinition<DialogRootProps>[] = [
{name:"open",typeLabel:"boolean",description:"Controlled open state."},
{name:"defaultOpen",typeLabel:"boolean",defaultLabel:"false",description:"Initial uncontrolled state."},
{name:"onOpenChange",typeLabel:"(open, reason?) => void",description:"Receive open changes and dismissal reasons."},
{name:"keepMounted",typeLabel:"boolean",defaultLabel:"false",description:"Retain hidden child state after closing."},
{name:"closeOnEscape",typeLabel:"boolean",defaultLabel:"true",description:"Allow top-layer Escape dismissal."},
{name:"closeOnBackdropClick",typeLabel:"boolean",defaultLabel:"true",description:"Allow direct scrim or positioner dismissal."},
{name:"disabled",typeLabel:"boolean",defaultLabel:"false",description:"Prevent trigger opening."},
{name:"onExitComplete",typeLabel:"() => void",description:"Called when owned exit surfaces finish."}
];
export const positionerRows: DocsPropDefinition<DialogPositionerProps>[] = [
{name:"placement",typeLabel:'"top" | "center" | "bottom"',defaultLabel:'"top"',description:"Viewport alignment."},
{name:"scrollBehavior",typeLabel:'"outside" | "inside"',defaultLabel:'"outside"',description:"Choose whole-panel or body scrolling."}
];
export const contentRows: DocsPropDefinition<DialogContentProps>[] = [
{name:"size",typeLabel:'ResponsiveValue<"xs" | "sm" | "md" | "lg" | "xl" | "cover" | "full">',defaultLabel:'"md"',description:"Width or viewport recipe. Sparse objects use md below their first breakpoint. Use Positioner for viewport modes."},
{name:"radius",typeLabel:"Radius",defaultLabel:'"control"',description:"Core or semantic corner radius; fullscreen remains square."},
{name:"motionPreset",typeLabel:'"scale" | "slide-in-top" | "slide-in-bottom" | "slide-in-left" | "slide-in-right" | "none"',defaultLabel:'"scale"',description:"Content transition; reduced motion removes movement."},
{name:"initialFocus",typeLabel:"ref | callback | false",description:"Explicit initial focus target."},
{name:"finalFocus",typeLabel:"ref | callback | false",description:"Explicit return focus target."},
{name:"role",typeLabel:'"dialog" | "alertdialog"',defaultLabel:'"dialog"',description:"Use the dedicated AlertDialog component for urgent confirmations."}
];
export const portalRows: DocsPropDefinition<DialogPortalProps>[] = [
{name:"container",typeLabel:"HTMLElement",description:"Same-document portal destination."},
{name:"disabled",typeLabel:"boolean",defaultLabel:"false",description:"Render inline instead of portalling."}
];
export const closeRows: DocsPropDefinition<DialogCloseProps>[] = [
{name:"placement",typeLabel:'"inline" | "corner"',defaultLabel:'"inline"',description:"Corner close is a direct Content child."},
{name:"asChild",typeLabel:"boolean",defaultLabel:"false",description:"Compose Button or a named CloseButton."}
];
export const footerRows: DocsPropDefinition<DialogFooterProps>[] = [
{name:"justify",typeLabel:'"start" | "center" | "end" | "between"',defaultLabel:'"end"',description:"Logical action distribution."}
];
export const parts = [
{id:"props-root",title:"Root",description:"State and modal behavior."},
{id:"props-positioner",title:"Positioner",description:"Owned viewport alignment and scrolling."},
{id:"props-content",title:"Content",description:"Accessible panel and visual recipes."},
{id:"props-portal",title:"Portal",description:"Portal destination."},
{id:"props-close",title:"Close",description:"Dismiss control composition."},
{id:"props-footer",title:"Footer",description:"Action layout."}
] as const;
export const sections: DocsSectionMetadata[] = [{id:"usage",title:"Usage",level:2},{id:"examples",title:"Examples",level:2},...examples.map(({id,title})=>({id,title,level:3 as const})),{id:"props",title:"Props",level:2},...parts.map(({id,title})=>({id,title,level:3 as const}))];
