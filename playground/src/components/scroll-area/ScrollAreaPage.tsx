import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { Scenario } from "../../shared/Scenario.js";
import { ScrollAreaBasic } from "./examples/ScrollAreaBasic.js";
import source from "./examples/ScrollAreaBasic.tsx?raw";
import { ScrollAreaDocumentation } from "./ScrollAreaDocumentation.js";
import {
  ScrollAreaEvidence,
  scrollAreaScenarios,
} from "./ScrollAreaEvidence.js";
export { scrollAreaScenarios } from "./ScrollAreaEvidence.js";
export function ScrollAreaPage() {
  const preview = usePreviewContext();
  if (
    preview ||
    (typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("qualification") === "1")
  )
    return <ScrollAreaEvidence />;
  return (
    <VStack data-component-page="scroll-area" gap={6}>
      <Scenario {...scrollAreaScenarios[0]} hideHeading>
        <ExamplePreview label="ScrollArea" source={source}>
          <ScrollAreaBasic />
        </ExamplePreview>
      </Scenario>
      <ScrollAreaDocumentation />
    </VStack>
  );
}
