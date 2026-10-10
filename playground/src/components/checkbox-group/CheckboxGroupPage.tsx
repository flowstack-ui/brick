import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { CheckboxGroupEvidence } from "./CheckboxGroupEvidence.js";
import { CheckboxGroupBasic } from "./examples/CheckboxGroupBasic.js";
import source from "./examples/CheckboxGroupBasic.tsx?raw";
import { examples, parts } from "./documentation.js";
export { checkboxGroupScenarios } from "./CheckboxGroupEvidence.js";
export function CheckboxGroupPage() {
  const preview = usePreviewContext();
  if (
    preview ||
    (typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("qualification") === "1")
  )
    return <CheckboxGroupEvidence />;
  return (
    <VStack gap={12} data-component-page="checkbox-group">
      <ExamplePreview label="CheckboxGroup basic" source={source}>
        <CheckboxGroupBasic />
      </ExamplePreview>
      <OwnerDocumentation
        name="CheckboxGroup"
        usage={
          '<CheckboxGroup.Root aria-label="Channels">\n  <CheckboxGroup.Item value="email">Email</CheckboxGroup.Item>\n</CheckboxGroup.Root>'
        }
        usageDescription="Group related choices with stable values. Use Fieldset for a visible legend and shared validation."
        examples={examples}
        parts={parts}
      />
    </VStack>
  );
}
