import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { TimelineEvidence } from "./TimelineEvidence.js";
import { TimelineBasic } from "./examples/TimelineBasic.js";
import basicSource from "./examples/TimelineBasic.tsx?raw";
import { examples, parts } from "./documentation.js";
export { timelineScenarios } from "./TimelineEvidence.js";
export function TimelinePage() {
  const preview = usePreviewContext();
  if (
    preview ||
    (typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("qualification") === "1")
  )
    return <TimelineEvidence />;
  return (
    <VStack gap={12} data-component-page="timeline">
      <ExamplePreview label="Timeline basic" source={basicSource}>
        <TimelineBasic />
      </ExamplePreview>
      <OwnerDocumentation
        name="Timeline"
        usage={
          "<Timeline.Root>\\n  <Timeline.Item>\\n    <Timeline.Connector>\\n      <Timeline.Indicator />\\n      <Timeline.Separator />\\n    </Timeline.Connector>\\n    <Timeline.Content>\\n      <Timeline.Title>Order placed</Timeline.Title>\\n    </Timeline.Content>\\n  </Timeline.Item>\\n</Timeline.Root>"
        }
        usageDescription="Show events in chronological order. Markers are decorative; keep dates, status and actions in Content."
        examples={examples}
        parts={parts}
      />
    </VStack>
  );
}
