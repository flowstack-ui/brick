import type { FloatingPanelOptions,FloatingPanelStageTriggerProps,FloatingPanelResizeTriggerProps } from "../../../src/floating-panel.js";
const options:FloatingPanelOptions={position:{x:1,y:2},size:{width:320,height:240},hideMode:"activity",onSizeChange:(_size,details)=>{void details.reason;}};
const stage:FloatingPanelStageTriggerProps={stage:"maximized",children:null};
const axis:FloatingPanelResizeTriggerProps={axis:"nw",children:null};
// @ts-expect-error Geometry is not a visual control recipe.
const invalid:FloatingPanelOptions={size:"lg"};
// @ts-expect-error Only physical resize axes are accepted.
const invalidAxis:FloatingPanelResizeTriggerProps={axis:"start"};
void [options,stage,axis,invalid,invalidAxis];
