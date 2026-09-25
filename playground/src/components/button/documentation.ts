import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { ButtonSplitMenu } from "./examples/ButtonSplitMenu.js";
import splitMenuSource from "./examples/ButtonSplitMenu.tsx?raw";
import { ButtonBasic } from "./examples/ButtonBasic.js";
import basicSource from "./examples/ButtonBasic.tsx?raw";
import { ButtonSizes } from "./examples/ButtonSizes.js";
import sizesSource from "./examples/ButtonSizes.tsx?raw";
import { ButtonVariants } from "./examples/ButtonVariants.js";
import variantsSource from "./examples/ButtonVariants.tsx?raw";
import { ButtonIcons } from "./examples/ButtonIcons.js";
import iconsSource from "./examples/ButtonIcons.tsx?raw";
import { ButtonTones } from "./examples/ButtonTones.js";
import tonesSource from "./examples/ButtonTones.tsx?raw";
import { ButtonDisabled } from "./examples/ButtonDisabled.js";
import disabledSource from "./examples/ButtonDisabled.tsx?raw";
import { ButtonLoading } from "./examples/ButtonLoading.js";
import loadingSource from "./examples/ButtonLoading.tsx?raw";
import { ButtonSpinnerPlacement } from "./examples/ButtonSpinnerPlacement.js";
import spinnerplacementSource from "./examples/ButtonSpinnerPlacement.tsx?raw";
import { ButtonCustomSpinner } from "./examples/ButtonCustomSpinner.js";
import customspinnerSource from "./examples/ButtonCustomSpinner.tsx?raw";
import { ButtonGroups } from "./examples/ButtonGroups.js";
import groupsSource from "./examples/ButtonGroups.tsx?raw";
import { ButtonAttached } from "./examples/ButtonAttached.js";
import attachedSource from "./examples/ButtonAttached.tsx?raw";
import { ButtonResponsive } from "./examples/ButtonResponsive.js";
import responsiveSource from "./examples/ButtonResponsive.tsx?raw";
import { ButtonRadius } from "./examples/ButtonRadius.js";
import radiusSource from "./examples/ButtonRadius.tsx?raw";
import { ButtonLinks } from "./examples/ButtonLinks.js";
import linksSource from "./examples/ButtonLinks.tsx?raw";
import { ButtonWidth } from "./examples/ButtonWidth.js";
import widthSource from "./examples/ButtonWidth.tsx?raw";
import { ButtonExpanded } from "./examples/ButtonExpanded.js";
import expandedSource from "./examples/ButtonExpanded.tsx?raw";
export const buttonExamples: OwnerExample[] = [
{ id: "sizes", title: "Sizes", description: "Seven coordinated size recipes. Compact targets need adequate surrounding space.", Demo: ButtonSizes, source: sizesSource },
{ id: "variants", title: "Variants", description: "Soft preserves its existing border; subtle is borderless, surface has an inset boundary, and plain has no hover fill.", Demo: ButtonVariants, source: variantsSource },
{ id: "icons", title: "Icons", description: "Logical icon slots follow writing direction and the button size.", Demo: ButtonIcons, source: iconsSource },
{ id: "tones", title: "Tones", description: "Choose semantic meaning rather than decorative status colors.", Demo: ButtonTones, source: tonesSource },
{ id: "disabled", title: "Disabled and disabled links", description: "Atom blocks unavailable actions and navigation.", Demo: ButtonDisabled, source: disabledSource },
{ id: "loading", title: "Loading", description: "The default loader preserves width. Loading text replaces visible copy and may change width.", Demo: ButtonLoading, source: loadingSource },
{ id: "spinnerplacement", title: "Spinner placement", description: "Place a decorative loader at the logical start or end of loading text.", Demo: ButtonSpinnerPlacement, source: spinnerplacementSource },
{ id: "customspinner", title: "Custom spinner", description: "Supply a decorative indicator; the button continues to own its busy state.", Demo: ButtonCustomSpinner, source: customspinnerSource },
{ id: "groups", title: "Group", description: "Set shared visual defaults once; child props win. Group does not share loading or disabled state.", Demo: ButtonGroups, source: groupsSource },
{ id: "attached", title: "Attached", description: "Use Group geometry without introducing selection or toolbar behavior.", Demo: ButtonAttached, source: attachedSource },
{ id:"split-menu",title:"Split menu",description:"Compose Group geometry with the existing menu behavior.",Demo:ButtonSplitMenu,source:splitMenuSource },
{ id: "responsive", title: "Responsive size", description: "Sparse objects use the normal lg default before the first breakpoint.", Demo: ButtonResponsive, source: responsiveSource },
{ id: "radius", title: "Radius", description: "Choose core corners or semantic theme roles.", Demo: ButtonRadius, source: radiusSource },
{ id: "links", title: "Links and refs", description: "Keep navigation as a native link. Refs point to the rendered host.", Demo: ButtonLinks, source: linksSource },
{ id: "width", title: "Full width", description: "Width is independent of the size recipe.", Demo: ButtonWidth, source: widthSource },
{ id: "expanded", title: "Expanded state", description: "An expanded trigger retains hover emphasis. Plain intentionally has no fill.", Demo: ButtonExpanded, source: expandedSource },
];
export const buttonParts: OwnerPart[] = [
{ id: "props-button", title: "Button", description: "The action or native link host.", rows: [
{name:"variant",typeLabel:'"solid" | "soft" | "subtle" | "surface" | "outline" | "ghost" | "plain"',defaultLabel:"solid",description:"Visual hierarchy; soft retains its existing border."},
{name:"tone",typeLabel:'"neutral" | "contrast" | "accent" | "info" | "success" | "warning" | "danger"',defaultLabel:"accent",description:"Semantic color."},
{name:"size",typeLabel:"ResponsiveValue<ButtonSize>",defaultLabel:"lg",description:"2xs, xs, sm, md, lg, xl or 2xl."},
{name:"radius",typeLabel:"Radius",description:"Shared core or semantic radius; cannot combine with shape."},
{name:"shape",typeLabel:'"sharp" | "rounded" | "pill"',defaultLabel:"rounded",description:"Legacy corner recipe. Prefer radius."},
{name:"focusRing",typeLabel:'"outside" | "inside"',defaultLabel:"outside",description:"Focus presentation only."},
{name:"fullWidth",typeLabel:"boolean",defaultLabel:"false",description:"Fill available inline space."},
{name:"startIcon / endIcon",typeLabel:"ReactNode",description:"Decorative logical icon slots; unavailable with asChild."},
{name:"loading",typeLabel:"boolean",defaultLabel:"false",description:"Blocks activation and retains focus with aria-busy."},
{name:"loadingText",typeLabel:"ReactNode",description:"Visible loading copy on normal/render paths. May change width."},
{name:"spinner",typeLabel:"ReactNode",description:"Custom decorative loading indicator, normal/render paths only."},
{name:"spinnerPlacement",typeLabel:'"start" | "end"',defaultLabel:"start",description:"Position alongside loadingText."},
{name:"disabled",typeLabel:"boolean",defaultLabel:"false",description:"Disable the action or destination."},
{name:"href",typeLabel:"string",description:"Render a native navigation link."},
{name:"type",typeLabel:'"button" | "submit" | "reset"',defaultLabel:"button",description:"Native form action."},
{name:"asChild",typeLabel:"boolean",defaultLabel:"false",description:"Compose one host without replacing its content."},
{name:"render",typeLabel:"AtomButtonRootProps['render']",description:"Atom host composition, mutually exclusive with asChild."}
]},
{ id:"props-button-group",title:"ButtonGroup",description:"Existing Group layout plus visual defaults for Button and IconButton; no selection state.",rows:[
{name:"size / variant / tone / radius / focusRing",typeLabel:"Button visual props",description:"Shared defaults. Individual props override them; nested groups reset the scope."},
{name:"attached",typeLabel:"boolean",defaultLabel:"false",description:"Join adjacent control boundaries."},
{name:"orientation",typeLabel:'ResponsiveValue<"horizontal" | "vertical">',defaultLabel:"horizontal",description:"Group direction."},
{name:"gap",typeLabel:"ResponsiveValue<SpacingValue>",defaultLabel:"2",description:"Spacing between unattached items."},
{name:"grow",typeLabel:"ResponsiveValue<boolean>",defaultLabel:"false",description:"Distribute available width."},
{name:"align / justify / wrap",typeLabel:"GroupProps",description:"Responsive Group alignment, distribution and wrapping."},
{name:"stacking / skip",typeLabel:"GroupProps",description:"Control overlap order and exclude children from attachment."},
{name:"as / asChild",typeLabel:"GroupProps",description:"Group host composition; ref targets that host."}
]}];
export const buttonSections = ownerSections(buttonExamples, buttonParts);
export { ButtonBasic, basicSource };
