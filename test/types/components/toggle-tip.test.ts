import type { ToggleTipContentProps, ToggleTipRootProps, UseToggleTipOptions } from "../../../src/toggle-tip.js";
const content: ToggleTipContentProps = {children:null,size:"xs",radius:"sm","aria-label":"Storage"};
const root: ToggleTipRootProps = {children:null,positioning:{placement:"top",gutter:8}, closeOnEscape:false};
const controller: UseToggleTipOptions = {defaultOpen:true};
// @ts-expect-error Panel density is not a compact tip recipe.
const density: ToggleTipContentProps = {children:null,density:"compact"};
// @ts-expect-error Independent panel inset is intentionally unavailable.
const inset: ToggleTipContentProps = {children:null,inset:"md"};
// @ts-expect-error Unknown size.
const size: ToggleTipContentProps = {children:null,size:"huge"};
void [content,root,controller,density,inset,size];
