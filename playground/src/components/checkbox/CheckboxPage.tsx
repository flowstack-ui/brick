import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { CheckboxEvidence } from "./CheckboxEvidence.js";
import { CheckboxBasic } from "./examples/CheckboxBasic.js";
import source from "./examples/CheckboxBasic.tsx?raw";
import { examples, parts } from "./documentation.js";
export { checkboxScenarios } from "./CheckboxEvidence.js";
export function CheckboxPage() {
  const preview = usePreviewContext();
  if (
    preview ||
    (typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("qualification") === "1")
  )
    return <CheckboxEvidence />;
  return (
    <VStack gap={12} data-component-page="checkbox">
      <ExamplePreview label="Checkbox basic" source={source}>
        <CheckboxBasic />
      </ExamplePreview>
      <OwnerDocumentation
        name="Checkbox"
        usage={"<Checkbox>Accept terms</Checkbox>"}
        usageDescription="Use a checkbox for an independent choice. Compose Root, Control and Label when text includes a link or description."
        examples={examples}
        parts={parts}
      />
    </VStack>
  );
}
