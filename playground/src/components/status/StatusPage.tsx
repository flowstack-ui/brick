import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { StatusEvidence } from "./StatusEvidence.js";
import { StatusBasic } from "./examples/StatusBasic.js";
import basicSource from "./examples/StatusBasic.tsx?raw";
import { examples, parts } from "./documentation.js";
export { statusScenarios } from "./StatusEvidence.js";
export function StatusPage() {
  const preview = usePreviewContext();
  if (
    preview ||
    (typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("qualification") === "1")
  )
    return <StatusEvidence />;
  return (
    <VStack gap={12} data-component-page="status">
      <ExamplePreview label="Status basic" source={basicSource}>
        <StatusBasic />
      </ExamplePreview>
      <OwnerDocumentation
        name="Status"
        usage={
          '<Status.Root tone="success">\n  <Status.Indicator />\n  Available\n</Status.Root>'
        }
        usageDescription="Pair a decorative indicator with readable state text. Label is optional; Status does not announce updates automatically."
        examples={examples}
        parts={parts}
      />
    </VStack>
  );
}
