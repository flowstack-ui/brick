import { VStack } from "@flowstack-ui/brick";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { ButtonBasic, basicSource, buttonExamples, buttonParts } from "./documentation.js";
export function ButtonDocumentation() {
  return <VStack gap={12} data-component-page="button">
    <ExamplePreview label="Button basic" source={basicSource}><ButtonBasic /></ExamplePreview>
    <OwnerDocumentation name="Button" usage={'<Button>Save changes</Button>'} examples={buttonExamples} parts={buttonParts} />
  </VStack>;
}
