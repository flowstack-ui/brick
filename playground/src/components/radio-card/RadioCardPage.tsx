import { Code, Paragraph, VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { RadioCardBasic } from "./examples/RadioCardBasic.js";
import source from "./examples/RadioCardBasic.tsx?raw";
import { examples, parts } from "./documentation.js";
export const radioCardScenarios: ScenarioDefinition[] = [{id:"radio-card.basic",number:1,title:"Basic",description:"Native rich radio options"},...examples.map((example,index)=>({id:`radio-card.${example.id}`,number:index+2,title:example.title,description:example.description}))];
export function RadioCardPage() {
  const preview=usePreviewContext();
  if(preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification")==="1")) return <VStack gap="8"><Scenario {...radioCardScenarios[0]}><RadioCardBasic /></Scenario>{examples.map(({Demo,id},index)=><Scenario key={id} {...radioCardScenarios[index+1]}><Demo /></Scenario>)}</VStack>;
  return <VStack gap={12} data-component-page="radio-card"><ExamplePreview label="Radio card basic" source={source}><RadioCardBasic /></ExamplePreview><OwnerDocumentation name="RadioCard" usage={"<RadioCard.Root>\n  <RadioCard.Label>Choose a plan</RadioCard.Label>\n  <RadioCard.Item value=\"team\">\n    <RadioCard.HiddenInput />\n    <RadioCard.Control>\n      <RadioCard.Title>Team</RadioCard.Title>\n      <RadioCard.Indicator />\n    </RadioCard.Control>\n  </RadioCard.Item>\n</RadioCard.Root>"} usageDescription="Use one group for mutually exclusive rich options. Each Item requires one native HiddenInput." examples={examples} parts={parts} guide={<VStack gap="3"><Paragraph tone="secondary">Keep card content noninteractive. Use Card with a separate radio for records with links or actions.</Paragraph><Paragraph tone="secondary"><Code>orientation</Code> controls keyboard navigation; <Code>contentOrientation</Code> controls the layout inside each card. Keep one semantic group at every breakpoint.</Paragraph></VStack>} /></VStack>;
}
