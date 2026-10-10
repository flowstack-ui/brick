import { VStack } from "@flowstack-ui/brick";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { examples, parts, ToggleBasic, basicSource } from "./documentation.js";
export function ToggleDocumentation() {
  return (
    <VStack gap={12} data-component-page="toggle">
      <ExamplePreview label="Toggle basic" source={basicSource}>
        <ToggleBasic />
      </ExamplePreview>
      <OwnerDocumentation
        name="Toggle"
        usage={"<Toggle >Bold</Toggle>"}
        examples={examples}
        parts={parts}
      />
    </VStack>
  );
}
