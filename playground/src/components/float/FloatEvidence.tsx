import { Float, For, Frame, Surface, Text, VStack, type FloatPlacement } from "@flowstack-ui/brick";
import { Scenario } from "../../shared/Scenario.js";
const placements: FloatPlacement[] = ["top-start", "top-center", "top-end", "middle-start", "middle-center", "middle-end", "bottom-start", "bottom-center", "bottom-end"];
export function FloatEvidence() {
 return <Scenario id="float.basic" number={1} title="Float geometry" description="Controlled unequal dimensions and nested anchors.">
 <VStack gap={10} startSpacing={8}>
 <For each={placements}>{placement => <Frame key={placement} inlineSize={240} blockSize={120} asChild><Float.Anchor data-placement-case={placement}><Surface level="subtle"><Text>{placement}</Text></Surface><Float.Root placement={placement}><Frame inlineSize={40} blockSize={24}><Surface level="subtle"><Text>New</Text></Surface></Frame></Float.Root></Float.Anchor></Frame>}</For>
 <Frame inlineSize={240} blockSize={120} asChild><Float.Anchor data-offset-case=""><Float.Root offset="10px" offsetInline={{ md: "20px", lg: 0 }} offsetBlock="-5px" placement={{ xl: "bottom-start" }}><Frame inlineSize={40} blockSize={24}><Text>Offset</Text></Frame></Float.Root></Float.Anchor></Frame>
 <Frame inlineSize={240} blockSize={120} asChild><Float.Anchor data-nested-case=""><Float.Root offset="20px"><Frame inlineSize={100} blockSize={60} asChild><Float.Anchor><Text>Outer</Text><Float.Root><Text>Inner</Text></Float.Root></Float.Anchor></Frame></Float.Root></Float.Anchor></Frame>
 </VStack></Scenario>;
}
