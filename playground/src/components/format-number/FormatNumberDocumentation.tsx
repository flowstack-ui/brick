import { VStack } from "@flowstack-ui/brick";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { FormatNumberBasic } from "./examples/FormatNumberBasic.js";
import source from "./examples/FormatNumberBasic.tsx?raw";
import { examples, parts } from "./documentation.js";
export function FormatNumberDocumentation() { return <VStack gap={12} data-component-page="format-number"><ExamplePreview label="FormatNumber basic" source={source}><FormatNumberBasic /></ExamplePreview><OwnerDocumentation name="FormatNumber" usage={"<Text><FormatNumber value={1450.45} /></Text>"} examples={examples.slice(1)} parts={parts} usageDescription="Format numbers where they are rendered." /></VStack>; }
