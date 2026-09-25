import { VStack } from "@flowstack-ui/brick";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { examples, parts, IconButtonBasic, basicSource } from "./documentation.js";
export function IconButtonDocumentation(){return <VStack gap={12} data-component-page="icon-button"><ExamplePreview label="IconButton basic" source={basicSource}><IconButtonBasic /></ExamplePreview><OwnerDocumentation name="IconButton" usage={'<IconButton aria-label="Search" />'} examples={examples} parts={parts}/></VStack>;}
