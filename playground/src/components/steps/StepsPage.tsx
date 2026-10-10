import { Paragraph, VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { StepsEvidence } from "./StepsEvidence.js";
import { StepsBasic } from "./examples/StepsBasic.js";
import source from "./examples/StepsBasic.tsx?raw";
import { examples, parts } from "./documentation.js";
export { stepsScenarios } from "./StepsEvidence.js";
export function StepsPage() {
  const preview = usePreviewContext();
  if (
    preview ||
    (typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("qualification") === "1")
  )
    return <StepsEvidence />;
  return (
    <VStack gap={12} data-component-page="steps">
      <ExamplePreview label="Steps basic" source={source}>
        <StepsBasic />
      </ExamplePreview>
      <OwnerDocumentation
        name="Steps"
        usage={
          "<Steps.Root count={1}>\n  <Steps.List>\n    <Steps.Item index={0}>\n      <Steps.Indicator />\n      <Steps.Title>Account</Steps.Title>\n      <Steps.Separator />\n    </Steps.Item>\n  </Steps.List>\n</Steps.Root>"
        }
        usageDescription="Use a known count and zero-based indexes. A step equal to count represents completion."
        examples={examples}
        parts={parts}
        guide={
          <Paragraph tone="secondary">
            Steps describes ordered workflow progress, not tabs or static
            instructions. Applications own asynchronous validation, persistence
            and submission. Keep navigation outside switching panels and provide
            a Title or an explicit accessible name for each Content.
          </Paragraph>
        }
      />
    </VStack>
  );
}
