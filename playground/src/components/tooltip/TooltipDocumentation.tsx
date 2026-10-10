import { VStack } from "@flowstack-ui/brick";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { examples, parts, TooltipBasic, TooltipBasicSource } from "./documentation.js";
export function TooltipDocumentation() {
  return <VStack gap={12} data-component-page="tooltip">
    <ExamplePreview label="Tooltip basic" source={TooltipBasicSource}><TooltipBasic /></ExamplePreview>
    <OwnerDocumentation name="Tooltip" usage={'<Tooltip.Root>\n  <Tooltip.Trigger asChild><Button>Save</Button></Tooltip.Trigger>\n  <Tooltip.Portal><Tooltip.Content>Save your changes</Tooltip.Content></Tooltip.Portal>\n</Tooltip.Root>'} usageDescription="Use a short supplemental hint on an independently named control. Essential help stays visible. Touch opens after a stationary long press; release starts a finite dismissal timer." examples={examples} parts={parts}/>
  </VStack>;
}
