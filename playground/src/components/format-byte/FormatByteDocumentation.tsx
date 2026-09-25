import { VStack } from "@flowstack-ui/brick";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { FormatByteBasic } from "./examples/FormatByteBasic.js";
import source from "./examples/FormatByteBasic.tsx?raw";
import { examples, parts } from "./documentation.js";
export function FormatByteDocumentation() { return <VStack gap={12} data-component-page="format-byte"><ExamplePreview label="FormatByte basic" source={source}><FormatByteBasic /></ExamplePreview><OwnerDocumentation name="FormatByte" usage={"<Text><FormatByte value={1450} /></Text>"} examples={examples.slice(1)} parts={parts} usageDescription="Provide a byte quantity as a number." /></VStack>; }
