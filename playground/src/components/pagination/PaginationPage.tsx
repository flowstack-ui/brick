import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { PaginationEvidence } from "./PaginationEvidence.js";
import { Basic, basicSource, examples, parts, usage } from "./documentation.js";
export { paginationScenarios } from "./PaginationEvidence.js";
export function PaginationPage() {
  const preview = usePreviewContext();
  if (
    preview ||
    (typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("qualification") === "1")
  )
    return <PaginationEvidence />;
  return (
    <VStack gap={12} data-component-page="pagination">
      <ExamplePreview label="Pagination basic" source={basicSource}>
        <Basic />
      </ExamplePreview>
      <OwnerDocumentation
        name="Pagination"
        usage={usage}
        examples={examples}
        parts={parts}
        usageDescription="Use count and pageSize for record totals, or totalPages for page totals. Keep routing and data fetching in your application."
      />
    </VStack>
  );
}
