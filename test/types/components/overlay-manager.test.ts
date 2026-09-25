import { createOverlay,type OverlayLifecycleProps } from "../../../src/overlay-manager.js";
const manager=createOverlay<{title:string},boolean>((_props:{title:string}&OverlayLifecycleProps)=>null);
const result:Promise<boolean|undefined>=manager.open("confirm",{title:"Confirm"});
// @ts-expect-error Lifecycle fields belong to the manager.
manager.open("confirm",{title:"Confirm",open:true});
// @ts-expect-error Result type is checked.
manager.close("confirm","wrong");
void result;
const exit: Promise<void> = manager.close("confirm", true);
const waiting: Promise<void> = manager.waitForExit("confirm");
manager.update("confirm", { title: "Updated" });
// @ts-expect-error Updates cannot override lifecycle callbacks.
manager.update("confirm", { onExitComplete() {} });
// @ts-expect-error Authored props remain typed during updates.
manager.update("confirm", { title: 42 });
// @ts-expect-error Snapshots are readonly.
manager.get("confirm").open = false;
// @ts-expect-error The snapshot array cannot be mutated.
manager.getSnapshot().push(manager.get("confirm"));
void exit;
void waiting;
