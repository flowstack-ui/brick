import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { SkeletonEvidence } from "./SkeletonEvidence.js";
import { SkeletonBasic } from "./examples/SkeletonBasic.js";
import source from "./examples/SkeletonBasic.tsx?raw";
import { examples, parts } from "./documentation.js";
export { skeletonScenarios } from "./SkeletonEvidence.js";
export function SkeletonPage() {
  const preview = usePreviewContext();
  if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <SkeletonEvidence />;
  return (
    <VStack gap={12} data-component-page="skeleton">
      <ExamplePreview label="Skeleton basic" source={source}><SkeletonBasic /></ExamplePreview>
      <OwnerDocumentation name="Skeleton" usage={'<Skeleton height={200} />'} usageDescription="Reserve known content geometry while loading. Keep the owning region’s busy state and announcements outside the decorative placeholder." examples={examples} parts={parts} />
    </VStack>
  );
}
