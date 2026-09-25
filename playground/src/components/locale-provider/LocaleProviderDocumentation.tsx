import { VStack } from "@flowstack-ui/brick";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { LocaleProviderBasic } from "./examples/LocaleProviderBasic.js";
import source from "./examples/LocaleProviderBasic.tsx?raw";
import { examples, parts } from "./documentation.js";
export function LocaleProviderDocumentation() { return <VStack gap={12} data-component-page="locale-provider"><ExamplePreview label="LocaleProvider basic" source={source}><LocaleProviderBasic /></ExamplePreview><OwnerDocumentation name="LocaleProvider" usage={"<LocaleProvider locale=\"de-DE\"><Text><FormatNumber value={1234.5} /></Text></LocaleProvider>"} examples={examples.slice(1)} parts={parts} usageDescription="Formatting is not product-copy translation." /></VStack>; }
