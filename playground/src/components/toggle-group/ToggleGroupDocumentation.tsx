import { VStack } from "@flowstack-ui/brick";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import {
  examples,
  parts,
  ToggleGroupBasic,
  basicSource,
} from "./documentation.js";
export function ToggleGroupDocumentation() {
  return (
    <VStack gap={12} data-component-page="toggle-group">
      <ExamplePreview label="ToggleGroup basic" source={basicSource}>
        <ToggleGroupBasic />
      </ExamplePreview>
      <OwnerDocumentation
        name="ToggleGroup"
        usage={
          '<ToggleGroup.Root  aria-label="Formatting"><ToggleGroup.Item value="bold" >Bold</ToggleGroup.Item><ToggleGroup.Item value="italic" >Italic</ToggleGroup.Item></ToggleGroup.Root>'
        }
        examples={examples}
        parts={parts}
      />
    </VStack>
  );
}
