import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { MenubarGuide } from "./MenubarGuide.js";
import { MenubarEvidence } from "./MenubarEvidence.js";
import { Basic, basicSource, examples, parts, usage } from "./documentation.js";
export { menubarScenarios } from "./MenubarEvidence.js";
export function MenubarPage() {
  const preview = usePreviewContext();
  if (
    preview ||
    (typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("qualification") === "1")
  )
    return <MenubarEvidence />;
  return (
    <VStack gap={12} data-component-page="menubar">
      <ExamplePreview label="Menubar basic" source={basicSource}>
        <Basic />
      </ExamplePreview>
      <OwnerDocumentation
        name="Menubar"
        usage={usage}
        examples={examples}
        parts={parts}
        guide={<MenubarGuide />}
        usageDescription="Persistent application commands use a named menubar, not website navigation."
      />
    </VStack>
  );
}
