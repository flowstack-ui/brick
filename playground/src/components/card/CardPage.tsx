import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { CardEvidence } from "./CardEvidence.js";
import { Basic, basicSource, cardExamples, cardParts } from "./documentation.js";
export { cardScenarios } from "./CardEvidence.js";
export function CardPage() {
  const preview = usePreviewContext();
  if (preview || new URLSearchParams(window.location.search).get("qualification") === "1") return <CardEvidence />;
  return <VStack gap={12} data-component-page="card">
    <ExamplePreview label="Card basic" source={basicSource}><Basic /></ExamplePreview>
    <OwnerDocumentation name="Card" usage={'<Card.Root>\n  <Card.Header />\n  <Card.Content />\n  <Card.Footer />\n</Card.Root>'} examples={cardExamples} parts={cardParts} />
  </VStack>;
}
