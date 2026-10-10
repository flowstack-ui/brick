import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { RatingEvidence } from "./RatingEvidence.js";
import { RatingBasic } from "./examples/RatingBasic.js";
import source from "./examples/RatingBasic.tsx?raw";
import { examples, parts } from "./documentation.js";
export { ratingScenarios } from "./RatingEvidence.js";
export function RatingPage() {
  const preview = usePreviewContext();
  if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <RatingEvidence />;
  return <VStack gap={12} data-component-page="rating"><ExamplePreview label="Rating basic" source={source}><RatingBasic /></ExamplePreview>
    <OwnerDocumentation name="Rating" usage={'<Rating.Root defaultValue={3}>\n  <Rating.Label>Your rating</Rating.Label>\n  <Rating.Control />\n</Rating.Root>'}
      usageDescription="Collect an ordered score with one keyboard-focusable control. Use Display or Summary for passive review data." examples={examples} parts={parts} />
  </VStack>;
}
