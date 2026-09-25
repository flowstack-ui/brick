import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { AvatarEvidence } from "./AvatarEvidence.js";
import { Basic, basicSource, examples, parts, usage } from "./documentation.js";
export { avatarScenarios } from "./AvatarEvidence.js";

export function AvatarPage() {
  const preview = usePreviewContext();
  if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <AvatarEvidence />;
  return (
    <VStack gap={12} data-component-page="avatar">
      <ExamplePreview label="Avatar basic" source={basicSource}><Basic /></ExamplePreview>
      <OwnerDocumentation name="Avatar" usage={usage} examples={examples} parts={parts} usageDescription="Provide an explicit accessible identity and localized fallback, or omit fallback for a generic person icon." />
    </VStack>
  );
}
