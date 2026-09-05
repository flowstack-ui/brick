import { For, List, Text, VStack } from "../../../../src/index.js";
import { Scenario } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";

export const forScenarios = [{
  id: "for.collection",
  number: 1,
  title: "Collection and fallback",
  description: "For preserves authored collection structure and adds no wrapper.",
}] as const;

const items = [{ id: "a", label: "First item" }, { id: "b", label: "Second item" }];

export function ForPage() {
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
    </VStack>
  );
}
