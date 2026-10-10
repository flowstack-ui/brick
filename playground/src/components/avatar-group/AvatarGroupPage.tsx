import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { AvatarGroupEvidence } from "./AvatarGroupEvidence.js";
import { Basic, basicSource, examples, parts, usage } from "./documentation.js";
export { avatarGroupScenarios } from "./AvatarGroupEvidence.js";

export function AvatarGroupPage() {
  const preview = usePreviewContext();
  if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <AvatarGroupEvidence />;
  return (
    <VStack gap={12} data-component-page="avatar-group">
      <ExamplePreview label="AvatarGroup basic" source={basicSource}><Basic /></ExamplePreview>
      <OwnerDocumentation name="AvatarGroup" usage={usage} examples={examples} parts={parts} usageDescription="Keep identities in source order and opt into overflow only when hiding members is intentional." />
    </VStack>
  );
}
