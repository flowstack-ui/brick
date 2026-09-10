import { type DownloadTriggerProps } from "../../../src/download-trigger.js";
const good:DownloadTriggerProps={data:async({signal})=>{void signal;return new Blob(["data"]);},fileName:"a.txt",size:{lg:"sm"},focusRing:"inside"};void good;
// @ts-expect-error generated downloads cannot navigate
const bad:DownloadTriggerProps={data:"x",fileName:"a",href:"/a"};void bad;
// @ts-expect-error do not start eager work
const eager:DownloadTriggerProps={data:Promise.resolve("x"),fileName:"a"};void eager;
