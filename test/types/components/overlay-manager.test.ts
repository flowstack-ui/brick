import { createOverlay,type OverlayLifecycleProps } from "../../../src/overlay-manager.js";
const manager=createOverlay<{title:string},boolean>((_props:{title:string}&OverlayLifecycleProps)=>null);
const result:Promise<boolean|undefined>=manager.open("confirm",{title:"Confirm"});
// @ts-expect-error Lifecycle fields belong to the manager.
manager.open("confirm",{title:"Confirm",open:true});
// @ts-expect-error Result type is checked.
manager.close("confirm","wrong");
void result;
