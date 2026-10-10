import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { NavListEvidence } from "./NavListEvidence.js";
import { Basic, basicSource, examples, parts, usage } from "./documentation.js";
export { navListScenarios } from "./NavListEvidence.js";
export function NavListPage() {
  const preview = usePreviewContext();
  if (
    preview ||
    (typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("qualification") === "1")
  )
    return <NavListEvidence />;
  return (
    <VStack gap={12} data-component-page="nav-list">
      <ExamplePreview label="NavList basic" source={basicSource}>
        <Basic />
      </ExamplePreview>
      <OwnerDocumentation
        name="NavList"
        usage={usage}
        examples={examples}
        parts={parts}
        usageDescription="Compose persistent destinations with native links. Your application decides which route is current."
      />
    </VStack>
  );
}
