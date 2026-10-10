import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { DropdownMenuGuide } from "./DropdownMenuGuide.js";
import { DropdownMenuEvidence } from "./DropdownMenuEvidence.js";
import { Basic, basicSource, examples, parts, usage } from "./documentation.js";
export { dropdownMenuScenarios } from "./DropdownMenuEvidence.js";
export function DropdownMenuPage() {
  const preview = usePreviewContext();
  if (
    preview ||
    (typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("qualification") === "1")
  )
    return <DropdownMenuEvidence />;
  return (
    <VStack gap={12} data-component-page="dropdown-menu">
      <ExamplePreview label="DropdownMenu basic" source={basicSource}>
        <Basic />
      </ExamplePreview>
      <OwnerDocumentation
        name="DropdownMenu"
        usage={usage}
        examples={examples}
        parts={parts}
        guide={<DropdownMenuGuide />}
        usageDescription="Use a named Button trigger for commands, or Select for a form value."
      />
    </VStack>
  );
}
