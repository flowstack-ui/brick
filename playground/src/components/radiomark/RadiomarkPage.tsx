import { useState } from "react";
import { Button, For, HStack, Radiomark, Text, VStack } from "../../../../src/index.js";
import { Scenario } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";

export const radiomarkScenarios = [{
  id: "radiomark.recipes",
  number: 1,
  title: "States and recipes",
  description: "Passive selection marks keep circular geometry across recipes and sizes.",
}, { id: "radiomark.sizes", number: 2, title: "Sizes", description: "Identical selected state at every size." },
{ id: "radiomark.variants", number: 3, title: "Variants", description: "Selected, unselected and disabled states for each recipe." },
{ id: "radiomark.tones", number: 4, title: "Semantic tones", description: "Semantic paint with stable circle geometry." },
{ id: "radiomark.controlled", number: 5, title: "Parent-driven state", description: "The semantic button owns selection; the mark depicts it." }] as const;

export function RadiomarkPage() {
  const [checked, setChecked] = useState(false);
  return (
    <VStack data-component-page="radiomark" gap="6">
      <Scenario {...radiomarkScenarios[0]}>
        <Specimen label="Selected, unselected, and disabled">
          <HStack data-testid="radiomark-output" gap="4">
            <Radiomark checked />
            <Radiomark variant="outline" />
            <Radiomark checked variant="soft" tone="info" size="sm" />
            <Radiomark disabled />
          </HStack>
        </Specimen>
      </Scenario>
      <Scenario {...radiomarkScenarios[1]}><HStack gap="4" wrap><For each={["xs", "sm", "md", "lg"] as const}>{size => <Specimen key={size} label={size}><Radiomark size={size} checked /></Specimen>}</For></HStack></Scenario>
      <Scenario {...radiomarkScenarios[2]}><VStack gap="4"><For each={["solid", "outline", "soft", "inverted"] as const}>{variant => <Specimen key={variant} label={variant}><HStack gap="6" wrap><VStack gap="2" align="start"><Radiomark variant={variant} /><Text variant="body-sm">Unselected</Text></VStack><VStack gap="2" align="start"><Radiomark variant={variant} checked /><Text variant="body-sm">Selected</Text></VStack><VStack gap="2" align="start"><Radiomark variant={variant} checked disabled /><Text variant="body-sm">Disabled</Text></VStack></HStack></Specimen>}</For><Specimen label="Filled unselected"><Radiomark filled /></Specimen></VStack></Scenario>
      <Scenario {...radiomarkScenarios[3]}><HStack gap="4" wrap><For each={["accent", "neutral", "info", "success", "warning", "danger"] as const}>{tone => <Specimen key={tone} label={tone}><Radiomark tone={tone} checked /></Specimen>}</For></HStack></Scenario>
      <Scenario {...radiomarkScenarios[4]}><Specimen label="Toggle button"><Button variant="outline" tone="neutral" aria-pressed={checked} onClick={() => setChecked(!checked)}><Radiomark checked={checked} size="sm" />Use express delivery</Button></Specimen></Scenario>
    </VStack>
  );
}
