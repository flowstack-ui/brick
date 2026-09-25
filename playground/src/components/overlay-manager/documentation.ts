import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { OverlayManagerBasic } from "./examples/OverlayManagerBasic.js";
import basicSource from "./examples/OverlayManagerBasic.tsx?raw";
export { basicSource };
export const Basic = OverlayManagerBasic;
import { OverlayManagerDrawer } from "./examples/OverlayManagerDrawer.js";
import DrawerSource from "./examples/OverlayManagerDrawer.tsx?raw";
import { OverlayManagerUpdate } from "./examples/OverlayManagerUpdate.js";
import UpdateSource from "./examples/OverlayManagerUpdate.tsx?raw";
import { OverlayManagerResult } from "./examples/OverlayManagerResult.js";
import ResultSource from "./examples/OverlayManagerResult.tsx?raw";
import { OverlayManagerMenu } from "./examples/OverlayManagerMenu.js";
import MenuSource from "./examples/OverlayManagerMenu.tsx?raw";
import { OverlayManagerForm } from "./examples/OverlayManagerForm.js";
import FormSource from "./examples/OverlayManagerForm.tsx?raw";
import { OverlayManagerLifetime } from "./examples/OverlayManagerLifetime.js";
import LifetimeSource from "./examples/OverlayManagerLifetime.tsx?raw";
import { OverlayManagerProviders } from "./examples/OverlayManagerProviders.js";
import ProvidersSource from "./examples/OverlayManagerProviders.tsx?raw";
import { OverlayManagerPanel } from "./examples/OverlayManagerPanel.js";
import PanelSource from "./examples/OverlayManagerPanel.tsx?raw";
export const examples: OwnerExample[] = [
{id:"drawer",title:"Drawer",description:"Use the same lifecycle contract with a side sheet.",Demo:OverlayManagerDrawer,source:DrawerSource},
{id:"update",title:"Update props",description:"Change authored properties without resetting the input draft.",Demo:OverlayManagerUpdate,source:UpdateSource},
{id:"result",title:"Return value",description:"Await the answer, then wait for exit before opening the next dialog.",Demo:OverlayManagerResult,source:ResultSource},
{id:"menu",title:"Open from a menu",description:"Restore focus to a persistent launcher; nested menus retain their own behavior.",Demo:OverlayManagerMenu,source:MenuSource},
{id:"form",title:"Form submission",description:"Return a typed value from native form submission. Validation belongs to the form.",Demo:OverlayManagerForm,source:FormSource},
{id:"lifetime",title:"Instance lifetime",description:"Independent IDs, replacement, removal, host disposal and cancellation before display.",Demo:OverlayManagerLifetime,source:LifetimeSource},
{id:"providers",title:"Providers",description:"Place Viewport under locale providers and scope appearance inside the portal.",Demo:OverlayManagerProviders,source:ProvidersSource},
{id:"panel",title:"Floating panel",description:"Coordinate a nonmodal inspector without introducing a focus trap.",Demo:OverlayManagerPanel,source:PanelSource}
];
export const parts: OwnerPart[] = [
  {
    "id": "props-factory",
    "title": "Factory",
    "description": "createOverlay<P, R>(Component) creates a stable controller; it is not a visual component.",
    "rows": [
      {
        "name": "Component",
        "typeLabel": "ComponentType<P & OverlayLifecycleProps>",
        "defaultLabel": "—",
        "description": "Receives authored props and injected lifecycle. Put default authored values in the component."
      }
    ]
  },
  {
    "id": "props-viewport",
    "title": "Viewport",
    "description": "Mount exactly one manager.Viewport below the providers its authored overlays need.",
    "rows": [
      {
        "name": "Viewport",
        "typeLabel": "ComponentType",
        "defaultLabel": "—",
        "description": "No DOM props, styles or ref. Renders keyed instances without a wrapper; permanent unmount cancels pending work."
      }
    ]
  },
  {
    "id": "props-lifecycle",
    "title": "Injected lifecycle",
    "description": "Manager-owned props forwarded unchanged to the authored overlay Root.",
    "rows": [
      {
        "name": "open",
        "typeLabel": "boolean",
        "defaultLabel": "—",
        "description": "Current disclosure state."
      },
      {
        "name": "onOpenChange",
        "typeLabel": "(open: boolean) => void",
        "defaultLabel": "—",
        "description": "A false value requests dismissal with an undefined result."
      },
      {
        "name": "onExitComplete",
        "typeLabel": "() => void",
        "defaultLabel": "—",
        "description": "Notifies the manager when the authored overlay finishes exiting. Never replace with a guessed timeout."
      }
    ]
  },
  {
    "id": "props-controller",
    "title": "Controller",
    "description": "Imperative methods returned by createOverlay. Snapshot queries do not subscribe React renders.",
    "rows": [
      {
        "name": "open(id, props)",
        "typeLabel": "Promise<R | undefined>",
        "defaultLabel": "—",
        "description": "Requires a mounted Viewport and nonempty ID. An already-open ID merges props and shares its result; an exiting ID gets a new generation."
      },
      {
        "name": "close(id, result?)",
        "typeLabel": "Promise<void>",
        "defaultLabel": "—",
        "description": "Settles the answer when closure is requested; waits for visual exit. A never-committed instance is removed automatically."
      },
      {
        "name": "update(id, partialProps)",
        "typeLabel": "void",
        "defaultLabel": "—",
        "description": "Merges authored props without resetting child state. A missing ID throws."
      },
      {
        "name": "waitForExit(id)",
        "typeLabel": "Promise<void>",
        "defaultLabel": "—",
        "description": "Waits for exit, even if called before close. A missing ID resolves immediately."
      },
      {
        "name": "remove(id) / removeAll()",
        "typeLabel": "void",
        "defaultLabel": "—",
        "description": "Skip animation and settle pending results and exits."
      },
      {
        "name": "has(id)",
        "typeLabel": "boolean",
        "defaultLabel": "—",
        "description": "Check whether an open or exiting instance exists."
      },
      {
        "name": "get(id)",
        "typeLabel": "OverlaySnapshotEntry<P>",
        "defaultLabel": "—",
        "description": "Readonly id, props and open snapshot. A missing ID throws."
      },
      {
        "name": "getSnapshot()",
        "typeLabel": "readonly OverlaySnapshotEntry<P>[]",
        "defaultLabel": "—",
        "description": "Stable array until entries change; imperative, not a reactive hook."
      }
    ]
  }
];
export const sections = ownerSections(examples, parts);
export const usage = `const [manager] = useState(() => createOverlay(Notice));

// Mount once below the required providers:
<manager.Viewport />

// Call from an event handler:
const answer = await manager.open("notice", { title: "Continue?" });
await manager.waitForExit("notice");`;
