import { useState } from "react";
import { Button, For, Input, List, Text, VStack } from "../../../../src/index.js";
import { Scenario } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ForDocumentation } from "./ForDocumentation.js";

export const forScenarios = [{
  id: "for.collection",
  number: 1,
  title: "Collection and fallback",
  description: "For preserves authored collection structure and adds no wrapper.",
}, { id: "for.empty", number: 2, title: "Empty and undefined", description: "Both absent and empty collections render their explicit fallback." },
{ id: "for.keys", number: 3, title: "Stable keys and nesting", description: "Reordering keeps each keyed child's input value with its item." }] as const;

const items = [{ id: "a", label: "First item" }, { id: "b", label: "Second item" }];

export function ForPage() {
  const preview = usePreviewContext();
  if (!preview && new URLSearchParams(window.location.search).get("qualification") !== "1") return <ForDocumentation />;
  return <ForEvidence />;
}

function ForEvidence() {
  const [reversed, setReversed] = useState(false);
  return (
    <VStack data-component-page="for" gap="6">
      <Scenario {...forScenarios[0]}>
        <Specimen label="Rendered list">
          <List.Root data-testid="for-output">
            <For each={items}>{(item) => <List.Item key={item.id}>{item.label}</List.Item>}</For>
          </List.Root>
          <Text data-testid="for-fallback"><For each={[] as string[]} fallback="No items">{(item) => item}</For></Text>
        </Specimen>
      </Scenario>
      <Scenario {...forScenarios[1]}><Specimen label="No results"><Text><For each={undefined as string[] | undefined} fallback="No results loaded">{item => item}</For></Text></Specimen></Scenario>
      <Scenario {...forScenarios[2]}><Specimen label="Keyed editors"><VStack gap="3"><Button variant="outline" onClick={() => setReversed(!reversed)}>Reverse items</Button><List.Root data-testid="for-keyed"><For each={reversed ? [...items].reverse() : items}>{item => <List.Item key={item.id}><VStack gap="2"><Text>{item.label}</Text><Input aria-label={`Note for ${item.label}`} defaultValue="" /><List.Root><For each={["Draft", "Review"]}>{stage => <List.Item key={stage}>{stage}</List.Item>}</For></List.Root></VStack></List.Item>}</For></List.Root></VStack></Specimen></Scenario>
    </VStack>
  );
}
