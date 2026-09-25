import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { AccordionEvidence } from "./AccordionEvidence.js";
import { accordionExamples } from "./documentation.js";
import { accordionParts } from "./parts.js";
import { AccordionBasic } from "./examples/AccordionBasic.js";
import source from "./examples/AccordionBasic.tsx?raw";
export { accordionScenarios } from "./AccordionEvidence.js";
export function AccordionPage() {
  const preview = usePreviewContext();
  if (preview || new URLSearchParams(window.location.search).get("qualification") === "1") return <AccordionEvidence />;
  return <VStack gap={12} data-component-page="accordion">
    <ExamplePreview label="Accordion basic" source={source}><AccordionBasic /></ExamplePreview>
    <OwnerDocumentation name="Accordion" usage={'<Accordion.Root>\n  <Accordion.Item value="details">\n    <Accordion.Header><Accordion.Trigger>Details<Accordion.Indicator /></Accordion.Trigger></Accordion.Header>\n    <Accordion.Content><Accordion.ContentInner>Content</Accordion.ContentInner></Accordion.Content>\n  </Accordion.Item>\n</Accordion.Root>'} examples={accordionExamples} parts={accordionParts} />
  </VStack>;
}
