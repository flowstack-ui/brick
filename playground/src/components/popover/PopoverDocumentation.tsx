import { VStack } from "@flowstack-ui/brick";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { examples, parts, PopoverBasic, PopoverBasicSource } from "./documentation.js";
import { PopoverGuide } from "./PopoverGuide.js";
export function PopoverDocumentation() {
  return <VStack gap={12} data-component-page="popover">
    <ExamplePreview label="Popover basic" source={PopoverBasicSource}><PopoverBasic /></ExamplePreview>
    <OwnerDocumentation name="Popover" usage={'<Popover.Root>\n  <Popover.Trigger asChild><Button>Settings</Button></Popover.Trigger>\n  <Popover.Portal>\n    <Popover.Content>\n      <Popover.Header><Popover.Title>Settings</Popover.Title></Popover.Header>\n      <Popover.Body>Interactive content</Popover.Body>\n      <Popover.Arrow />\n    </Popover.Content>\n  </Popover.Portal>\n</Popover.Root>'} usageDescription="Use Popover for compact interactive content. Header and Body own their padding; Body owns scrolling. Size sets width, inset sets spacing. Provide a Title or accessible label. Use Tooltip for passive hints and Dialog for larger workflows." examples={examples} parts={parts} />
    <PopoverGuide />
  </VStack>;
}
