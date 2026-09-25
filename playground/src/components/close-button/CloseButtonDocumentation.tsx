import { VStack } from "@flowstack-ui/brick";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { examples, parts, CloseButtonBasic, basicSource } from "./documentation.js";
export function CloseButtonDocumentation(){return <VStack gap={12} data-component-page="close-button"><ExamplePreview label="CloseButton basic" source={basicSource}><CloseButtonBasic /></ExamplePreview><OwnerDocumentation name="CloseButton" usage={'<CloseButton />'} examples={examples} parts={parts}/></VStack>;}
