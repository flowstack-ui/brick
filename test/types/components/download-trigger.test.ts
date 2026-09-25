import { type DownloadTriggerProps } from "../../../src/download-trigger.js";
const icon:DownloadTriggerProps={iconOnly:true,"aria-label":"Download",children:null,data:"x",fileName:"a.txt",mimeType:"text/plain",shape:"circle",spinner:null};void icon;
// @ts-expect-error icon-only controls require an accessible name
const unnamed:DownloadTriggerProps={iconOnly:true,children:null,data:"x",fileName:"a.txt"};void unnamed;
const loading:DownloadTriggerProps={loadingText:"Preparing",spinner:null,spinnerPlacement:"end",data:"x",fileName:"a.txt"};void loading;
const good:DownloadTriggerProps={data:async({signal})=>{void signal;return new Blob(["data"]);},fileName:"a.txt",size:{lg:"sm"},focusRing:"inside"};void good;
// @ts-expect-error generated downloads cannot navigate
const bad:DownloadTriggerProps={data:"x",fileName:"a",href:"/a"};void bad;
// @ts-expect-error do not start eager work
const eager:DownloadTriggerProps={data:Promise.resolve("x"),fileName:"a"};void eager;
