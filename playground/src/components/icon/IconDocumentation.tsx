import { VStack } from "@flowstack-ui/brick";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { examples, parts, IconBasic, basicSource } from "./documentation.js";
export function IconDocumentation() { return <VStack gap={12} data-component-page="icon"><ExamplePreview label="Icon basic" source={basicSource}><IconBasic /></ExamplePreview><OwnerDocumentation name="Icon" usage={'<Icon><svg viewBox="0 0 24 24"><path d="m5 12 4 4L19 6" fill="none" stroke="currentColor" /></svg></Icon>'} usageDescription="Provide one noninteractive SVG. Default span, md size, inherited color and text emphasis remain stable." examples={examples} parts={parts} /></VStack>; }
