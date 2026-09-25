import { VStack } from "@flowstack-ui/brick";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { NumberInputBasic } from "./examples/NumberInputBasic.js";
import source from "./examples/NumberInputBasic.tsx?raw";
import { examples, parts } from "./documentation.js";
export function NumberInputDocumentation() { return <VStack gap={12} data-component-page="number-input"><ExamplePreview label="NumberInput basic" source={source}><NumberInputBasic /></ExamplePreview><OwnerDocumentation name="NumberInput" usage={"<NumberInput.Root defaultValue={3}><NumberInput.Input aria-label=\"Quantity\" /><NumberInput.Control /></NumberInput.Root>"} examples={examples.slice(1)} parts={parts} usageDescription="Compose one input and the built-in step controls." /></VStack>; }
