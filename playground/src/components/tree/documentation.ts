import { ownerSections, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { TreeWindowing } from "./examples/TreeWindowing.js";
import TreeWindowingSource from "./examples/TreeWindowing.tsx?raw";
import { TreeForm } from "./examples/TreeForm.js";
import TreeFormSource from "./examples/TreeForm.tsx?raw";
import { TreeArtwork } from "./examples/TreeArtwork.js";
import TreeArtworkSource from "./examples/TreeArtwork.tsx?raw";
import { TreeSizes } from "./examples/TreeSizes.js";
import TreeSizesSource from "./examples/TreeSizes.tsx?raw";
import { TreeRecipes } from "./examples/TreeRecipes.js";
import TreeRecipesSource from "./examples/TreeRecipes.tsx?raw";
import { TreeTones } from "./examples/TreeTones.js";
import TreeTonesSource from "./examples/TreeTones.tsx?raw";
import { TreeDensity } from "./examples/TreeDensity.js";
import TreeDensitySource from "./examples/TreeDensity.tsx?raw";
import { TreeSurface } from "./examples/TreeSurface.js";
import TreeSurfaceSource from "./examples/TreeSurface.tsx?raw";
import { TreeResponsive } from "./examples/TreeResponsive.js";
import TreeResponsiveSource from "./examples/TreeResponsive.tsx?raw";
import { TreeControlled } from "./examples/TreeControlled.js";
import TreeControlledSource from "./examples/TreeControlled.tsx?raw";
import { TreeDisclosure } from "./examples/TreeDisclosure.js";
import TreeDisclosureSource from "./examples/TreeDisclosure.tsx?raw";
import { TreeChecking } from "./examples/TreeChecking.js";
import TreeCheckingSource from "./examples/TreeChecking.tsx?raw";
import { TreeController } from "./examples/TreeController.js";
import TreeControllerSource from "./examples/TreeController.tsx?raw";
import { TreeAnimation } from "./examples/TreeAnimation.js";
import TreeAnimationSource from "./examples/TreeAnimation.tsx?raw";
import { TreeStates } from "./examples/TreeStates.js";
import TreeStatesSource from "./examples/TreeStates.tsx?raw";
import { TreeRtl } from "./examples/TreeRtl.js";
import TreeRtlSource from "./examples/TreeRtl.tsx?raw";
import { TreeActions } from "./examples/TreeActions.js";
import TreeActionsSource from "./examples/TreeActions.tsx?raw";
import { TreeFiltering } from "./examples/TreeFiltering.js";
import TreeFilteringSource from "./examples/TreeFiltering.tsx?raw";
import { TreeLoading } from "./examples/TreeLoading.js";
import TreeLoadingSource from "./examples/TreeLoading.tsx?raw";
export const treeExamples = [
  { id: "windowing", title: "Windowing integration", description: "Use Atom Virtualizer for fixed-row geometry. Keep the parent and active item mounted, preserve sibling metadata, and mount and scroll a requested target before changing focus. This adapter handles one loaded branch; remote trees need their own loading policy.", Demo: TreeWindowing, source: TreeWindowingSource },
  { id: "artwork", title: "Artwork and indentation", description: "Replace decorative artwork and choose guides or zero indentation with the public depth token.", Demo: TreeArtwork, source: TreeArtworkSource },
  { id: "form", title: "Native form", description: "Submit selection with name. A nonselectable branch remains navigable and expandable without becoming a destination.", Demo: TreeForm, source: TreeFormSource },
  { id: "sizes", title: "Sizes", description: "Use xs, sm or md; compact density reveals the size-specific row heights.", Demo: TreeSizes, source: TreeSizesSource },
  { id: "selection-variants", title: "Selection variants", description: "Subtle and solid change selected-row paint independently from the root surface.", Demo: TreeRecipes, source: TreeRecipesSource },
  { id: "tones", title: "Selection tones", description: "Choose neutral or accent without assigning status semantics to file navigation.", Demo: TreeTones, source: TreeTonesSource },
  { id: "density", title: "Density", description: "Comfortable preserves 44px targets. Compact is an explicit dense desktop option.", Demo: TreeDensity, source: TreeDensitySource },
  { id: "variants", title: "Surface variants", description: "Plain, soft and outline change the container, not the selection policy.", Demo: TreeSurface, source: TreeSurfaceSource },
  { id: "responsive", title: "Responsive sizing", description: "Sparse size, density and variant values inherit across shared breakpoints.", Demo: TreeResponsive, source: TreeResponsiveSource },
  { id: "controlled", title: "Controlled focus and multiple selection", description: "Click selects one item; Ctrl/Command-click toggles additional items. Shift-click or Shift+arrow extends a range; Ctrl/Command+A selects all eligible visible nodes.", Demo: TreeControlled, source: TreeControlledSource },
  { id: "disclosure", title: "Independent disclosure", description: "Disable row-click expansion and use Trigger. selectionMode=none leaves navigation without selection.", Demo: TreeDisclosure, source: TreeDisclosureSource },
  { id: "checking", title: "Checkbox selection", description: "Check state is independent from row selection. A complete collection includes unmounted descendants when propagating checks.", Demo: TreeChecking, source: TreeCheckingSource },
  { id: "controller", title: "Expand and collapse all", description: "Use the controller to operate on known branches from external buttons.", Demo: TreeController, source: TreeControllerSource },
  { id: "animation", title: "Content animation", description: "Group animate retains closing content for height motion, with immediate inertness and reduced-motion support.", Demo: TreeAnimation, source: TreeAnimationSource },
  { id: "states", title: "Disabled and read-only", description: "Disabled prevents interaction. Read-only preserves navigation without mutating selection.", Demo: TreeStates, source: TreeStatesSource },
  { id: "rtl", title: "Right-to-left", description: "Logical indentation, disclosure indicators and keyboard direction follow dir.", Demo: TreeRtl, source: TreeRtlSource },
  { id: "actions", title: "Links and rename controls", description: "Use interactive items for native controls. Enter/F2 enters, Escape returns, and editing keys stay inside the field.", Demo: TreeActions, source: TreeActionsSource },
  { id: "filtering", title: "Filtering and mutation", description: "Collection filtering retains ancestor paths; immutable updates keep durable values while names change.", Demo: TreeFiltering, source: TreeFilteringSource },
  { id: "loading", title: "Lazy loading and retry", description: "This example fails its first load so you can try retry. Loaders honor cancellation before publishing children.", Demo: TreeLoading, source: TreeLoadingSource },
];
export const treeParts: OwnerPart[] = [
  { id: "tree-root-props", title: "Root", description: "Named hierarchical navigation with independent state owners.", rows: [
    { name: "size / density / variant", typeLabel: "ResponsiveValue", defaultLabel: "md / comfortable / plain", description: "xs/sm/md, compact/comfortable, and plain/soft/outline presentation." },
    { name: "tone / selectionVariant", typeLabel: "'neutral' | 'accent' / 'subtle' | 'solid'", defaultLabel: "neutral / subtle", description: "Selected-row paint, separate from the container." },
    { name: "value / defaultValue / onValueChange", typeLabel: "string | string[] | null / callback", description: "Controlled or uncontrolled selection." },
    { name: "selectionMode / multiple", typeLabel: "'none' | 'single' | 'multiple' / boolean", description: "selectionMode takes precedence over the legacy multiple flag." },
    { name: "focusedValue / defaultFocusedValue / onFocusedValueChange", typeLabel: "string | null / callback", description: "Active item independent from selection." },
    { name: "expandedValue / defaultExpandedValue / onExpandedValueChange", typeLabel: "string[] / callback", description: "Open branch identities." },
    { name: "expandOnClick / loop", typeLabel: "boolean", defaultLabel: "true / false", description: "Pointer expansion and navigation wrapping." },
    { name: "checkedValue / defaultCheckedValue / onCheckedValueChange", typeLabel: "string[] / callback", description: "Independent check state." },
    { name: "checkable / checkPropagation / collection", typeLabel: "boolean / 'none' | 'descendants' / TreeCollection", description: "Optional checking over logical descendants." },
    { name: "loadChildren / onLoadError", typeLabel: "async loader / callback", description: "Application-owned data loading with AbortSignal, busy state and explicit retry." },
    { name: "disabled / readOnly / required / invalid / name / form", typeLabel: "form props", description: "Field state and selection form submission. Checked values need explicit submission." },
    { name: "dir / showGuide / borderTone / radius", typeLabel: "direction and presentation props", description: "Logical layout and documented visual choices." }
  ] },
  { id: "tree-item-props", title: "Item", description: "A uniquely valued node with automatic parent and depth relationships.", rows: [
    { name: "value / label / expandable / disabled / selectable", typeLabel: "identity and policy props", description: "Identity, typeahead text and availability. selectable=false preserves navigation and disclosure." },
    { name: "interactive", typeLabel: "boolean", defaultLabel: "false", description: "Opt into managed child-control entry and return." }
  ] },
  { id: "tree-group-props", title: "Group", description: "Children of an expandable Item.", rows: [
    { name: "animate / forceMount / onExitComplete", typeLabel: "boolean / boolean / callback", defaultLabel: "false / false", description: "Presence-aware motion, hidden retention and exit completion." }
  ] },
  { id: "tree-parts-props", title: "Trigger, Checkbox and artwork", description: "Trigger discloses; Checkbox checks; ItemContent arranges; ItemText names; Indicator is decorative.", rows: [
    { name: "children / aria-label / disabled", typeLabel: "native part props", description: "Name interactive parts and replace decorative artwork when needed." },
    { name: "ref / render / asChild", typeLabel: "composition props", description: "Atom-backed parts preserve composition; ItemContent and Indicator are native Brick elements." }
  ] },
  { id: "tree-controller-props", title: "Collection and controller", description: "Public exports createTreeCollection, useTreeController, useTreeContext and useTreeItemContext.", rows: [
    { name: "collection.find / visible / filter / remove / update", typeLabel: "collection methods", description: "Logical hierarchy, ancestor-preserving filtering and immutable mutations." },
    { name: "RootProvider.value / controller.rootProps / expandAll / collapseAll", typeLabel: "root props / callbacks", description: "Spread rootProps on Root and call operations from external controls." },
    { name: "context.loadingValues / loadErrors / retryLoad", typeLabel: "loading state / callback", description: "Render honest pending/error states and explicit retry." }
  ] }
];
export const treeSections = ownerSections(treeExamples, treeParts);
