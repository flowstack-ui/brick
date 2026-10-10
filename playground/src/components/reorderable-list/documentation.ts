import { ReorderableListGrid } from "./examples/ReorderableListGrid.js";
import GridSource from "./examples/ReorderableListGrid.tsx?raw";
import { ReorderableListMixed } from "./examples/ReorderableListMixed.js";
import MixedSource from "./examples/ReorderableListMixed.tsx?raw";
import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { ReorderableListDialog } from "./examples/ReorderableListDialog.js";
import DialogSource from "./examples/ReorderableListDialog.tsx?raw";
import { ReorderableListRichContent } from "./examples/ReorderableListRichContent.js";
import RichContentSource from "./examples/ReorderableListRichContent.tsx?raw";
import { ReorderableListRecipes } from "./examples/ReorderableListRecipes.js";
import RecipesSource from "./examples/ReorderableListRecipes.tsx?raw";
import { ReorderableListDirect } from "./examples/ReorderableListDirect.js";
import DirectSource from "./examples/ReorderableListDirect.tsx?raw";
import { ReorderableListResponsive } from "./examples/ReorderableListResponsive.js";
import ResponsiveSource from "./examples/ReorderableListResponsive.tsx?raw";
import { ReorderableListHorizontal } from "./examples/ReorderableListHorizontal.js";
import HorizontalSource from "./examples/ReorderableListHorizontal.tsx?raw";
import { ReorderableListStates } from "./examples/ReorderableListStates.js";
import StatesSource from "./examples/ReorderableListStates.tsx?raw";
import { ReorderableListPreview } from "./examples/ReorderableListPreview.js";
import PreviewSource from "./examples/ReorderableListPreview.tsx?raw";
import { ReorderableListScroll } from "./examples/ReorderableListScroll.js";
import ScrollSource from "./examples/ReorderableListScroll.tsx?raw";
import { ReorderableListRecovery } from "./examples/ReorderableListRecovery.js";
import RecoverySource from "./examples/ReorderableListRecovery.tsx?raw";
export const examples: OwnerExample[] = [
 { id: "grid", title: "Responsive grid", description: "Drag across rows or use all four arrow keys after picking up an item.", Demo: ReorderableListGrid, source: GridSource },
 { id: "mixed", title: "Wrapping cards", description: "Different card widths retain their natural layout when moving between rows.", Demo: ReorderableListMixed, source: MixedSource },
 { id: "dialog", title: "Inside a dialog", description: "Portal the inert preview into the dialog positioner so the dialog body does not clip it.", Demo: ReorderableListDialog, source: DialogSource },
 { id: "rich-content", title: "Rich content", description: "Independent controls remain usable; only the handle starts dragging.", Demo: ReorderableListRichContent, source: RichContentSource },
 { id: "recipes", title: "Variants", description: "Choose transparent outline, filled surface, or soft rows.", Demo: ReorderableListRecipes, source: RecipesSource },
 { id: "direct", title: "Direct movement", description: "Move an item without dragging; the same keyed control retains focus.", Demo: ReorderableListDirect, source: DirectSource },
 { id: "responsive", title: "Responsive size and surface", description: "Use compact controls on smaller screens and a filled surface at desktop sizes.", Demo: ReorderableListResponsive, source: ResponsiveSource },
 { id: "horizontal", title: "Horizontal", description: "Reorder along the inline axis. Direction follows the surrounding locale.", Demo: ReorderableListHorizontal, source: HorizontalSource },
 { id: "states", title: "Disabled items", description: "Disabled records cannot be moved. Use readOnly on Root to lock the entire order.", Demo: ReorderableListStates, source: StatesSource },
 { id: "preview", title: "Custom preview", description: "Render passive content in the lifted preview, never a second interactive Item.", Demo: ReorderableListPreview, source: PreviewSource },
 { id: "scroll", title: "Scroll container", description: "Holding the pointer near an edge scrolls the nearest eligible container.", Demo: ReorderableListScroll, source: ScrollSource },
 { id: "recovery", title: "Controlled order and Undo", description: "Persistence and recovery remain in the application.", Demo: ReorderableListRecovery, source: RecoverySource },
];
export const parts: OwnerPart[] = [
  {
    "id": "props-root",
    "title": "Root",
    "description": "Controlled ordered list and shared presentation.",
    "rows": [
      { name: "layout", typeLabel: "\"linear\" | \"grid\"", defaultLabel: "linear", description: "Use grid for row-major grids and wrapping flex layouts." },
      { name: "displacement", typeLabel: "\"auto\" | \"none\"", defaultLabel: "auto", description: "Disable tentative displacement for index-dependent sizing or unsupported CSS layouts." },
      {
        "name": "items",
        "typeLabel": "string[]",
        "defaultLabel": "—",
        "description": "Stable item identities in rendered order."
      },
      {
        "name": "onItemsChange",
        "typeLabel": "(items, details) => void",
        "defaultLabel": "—",
        "description": "Called once for a completed move; update controlled order."
      },
      {
        "name": "getItemLabel",
        "typeLabel": "(value: string) => string",
        "defaultLabel": "—",
        "description": "Human labels for assistive announcements."
      },
      {
        "name": "size",
        "typeLabel": "ResponsiveValue<\"sm\" | \"md\" | \"lg\">",
        "defaultLabel": "\"md\"",
        "description": "Item spacing and movement control size."
      },
      {
        "name": "variant",
        "typeLabel": "ResponsiveValue<\"outline\" | \"surface\" | \"soft\">",
        "defaultLabel": "\"outline\"",
        "description": "Transparent border, filled border, or soft fill."
      },
      {
        "name": "radius",
        "typeLabel": "Radius",
        "defaultLabel": "surface",
        "description": "Shared item and preview corner token."
      },
      {
        "name": "orientation",
        "typeLabel": "\"vertical\" | \"horizontal\"",
        "defaultLabel": "\"vertical\"",
        "description": "Linear movement axis; grid uses both axes. Horizontal respects inherited direction."
      },
      {
        "name": "activation",
        "typeLabel": "{ distance?, touchDelay?, touchTolerance? }",
        "defaultLabel": "6px / 220ms / 8px",
        "description": "Finite non-negative gesture activation thresholds."
      },
      {
        "name": "autoScroll",
        "typeLabel": "boolean",
        "defaultLabel": "true",
        "description": "Scroll eligible ancestors near pointer edges."
      },
      {
        "name": "motion",
        "typeLabel": "boolean",
        "defaultLabel": "true",
        "description": "Animate item displacement; respects reduced motion."
      },
      {
        "name": "disabled / readOnly",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Prevent all movement."
      },
      {
        "name": "instructions / messages",
        "typeLabel": "string / DragDropMessages",
        "defaultLabel": "English",
        "description": "Localize keyboard instructions and announcements."
      },
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Merge the ordered-list host onto one suitable child."
      }
    ]
  },
  {
    "id": "props-item",
    "title": "Item",
    "description": "One keyed list item registered for movement.",
    "rows": [
      {
        "name": "value",
        "typeLabel": "string",
        "defaultLabel": "—",
        "description": "Unique stable identity from Root.items."
      },
      {
        "name": "disabled",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Prevent movement of this item."
      },
      {
        "name": "render",
        "typeLabel": "RenderProp",
        "defaultLabel": "li",
        "description": "Custom host renderer; preserve list semantics and forward the ref."
      }
    ]
  },
  {
    "id": "props-handle",
    "title": "Handle",
    "description": "Named button for pointer, touch and keyboard dragging.",
    "rows": [
      {
        "name": "aria-label",
        "typeLabel": "string",
        "defaultLabel": "—",
        "description": "Localized action name including the item label."
      },
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Compose with one ref-forwarding button."
      }
    ]
  },
  {
    "id": "props-content",
    "title": "Content",
    "description": "Flexible content region within the row.",
    "rows": [
      {
        "name": "children",
        "typeLabel": "ReactNode",
        "defaultLabel": "—",
        "description": "Application-owned text or rich content."
      }
    ]
  },
  {
    "id": "props-actions",
    "title": "Actions",
    "description": "Visible movement and independent secondary controls.",
    "rows": [
      {
        "name": "children",
        "typeLabel": "ReactNode",
        "defaultLabel": "—",
        "description": "Compose named movement buttons; do not hide all non-drag alternatives."
      }
    ]
  },
  {
    "id": "props-movebefore",
    "title": "MoveBefore",
    "description": "Direct movement button; unavailable destinations are disabled.",
    "rows": [
      {
        "name": "aria-label",
        "typeLabel": "string",
        "defaultLabel": "—",
        "description": "Localized movement action."
      },
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Compose with one button host."
      }
    ]
  },
  {
    "id": "props-moveafter",
    "title": "MoveAfter",
    "description": "Direct movement button; unavailable destinations are disabled.",
    "rows": [
      {
        "name": "aria-label",
        "typeLabel": "string",
        "defaultLabel": "—",
        "description": "Localized movement action."
      },
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Compose with one button host."
      }
    ]
  },
  {
    "id": "props-movetostart",
    "title": "MoveToStart",
    "description": "Direct movement button; unavailable destinations are disabled.",
    "rows": [
      {
        "name": "aria-label",
        "typeLabel": "string",
        "defaultLabel": "—",
        "description": "Localized movement action."
      },
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Compose with one button host."
      }
    ]
  },
  {
    "id": "props-movetoend",
    "title": "MoveToEnd",
    "description": "Direct movement button; unavailable destinations are disabled.",
    "rows": [
      {
        "name": "aria-label",
        "typeLabel": "string",
        "defaultLabel": "—",
        "description": "Localized movement action."
      },
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Compose with one button host."
      }
    ]
  },
  {
    "id": "props-drop-indicator",
    "title": "DropIndicator",
    "description": "Optional insertion feedback inside Item.",
    "rows": [
      {
        "name": "children",
        "typeLabel": "ReactNode",
        "defaultLabel": "—",
        "description": "Optional decorative artwork."
      }
    ]
  },
  {
    "id": "props-preview",
    "title": "Preview",
    "description": "Optional inert pointer-following duplicate. Does not render for keyboard moves.",
    "rows": [
      {
        "name": "children",
        "typeLabel": "ReactNode | ((value: string) => ReactNode)",
        "defaultLabel": "grip and item label",
        "description": "Passive content only; never another Item or behavior owner."
      },
      {
        "name": "container",
        "typeLabel": "HTMLElement | null",
        "defaultLabel": "source document body",
        "description": "Portal target. Use a same-document, untransformed layer host inside local theme/modal scopes."
      }
    ]
  }
];
export const sections = ownerSections(examples, parts);
