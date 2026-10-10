import {
  MultiSelect,
  For,
  Frame,
  VStack,
  HStack,
  Text,
  Button,
} from "@flowstack-ui/brick";
import { useState } from "react";

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
];
export function MultiSelectForm() {
  const [result, setResult] = useState("");
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setResult(data.getAll("framework").join(", "));
      }}
    >
      <VStack gap="4">
        <Frame maxInlineSize="20rem">
          <MultiSelect.Root
            items={items}
            name="framework"
            defaultValue={["react"]}
          >
            <HStack gap="2">
              <MultiSelect.Trigger aria-label="Form framework">
                <MultiSelect.Value placeholder="Select framework" />
                <MultiSelect.Icon />
              </MultiSelect.Trigger>
            </HStack>
            <MultiSelect.Content>
              <For each={items}>
                {(item) => (
                  <MultiSelect.Item
                    key={item.value}
                    value={item.value}
                    label={item.label}
                  >
                    <MultiSelect.ItemText>{item.label}</MultiSelect.ItemText>
                    <MultiSelect.ItemIndicator />
                  </MultiSelect.Item>
                )}
              </For>
            </MultiSelect.Content>
          </MultiSelect.Root>
        </Frame>
        <HStack gap="2">
          <Button type="submit">Submit</Button>
          <Button type="reset" variant="outline">
            Reset
          </Button>
        </HStack>
        <Text tone="secondary">
          {result || "Submit to see the selected value"}
        </Text>
      </VStack>
    </form>
  );
}
