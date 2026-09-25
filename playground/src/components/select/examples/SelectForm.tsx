import {
  Select,
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
export function SelectForm() {
  const [result, setResult] = useState("");
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setResult(String(data.get("framework")));
      }}
    >
      <VStack gap="4">
        <Frame maxInlineSize="20rem">
          <Select.Root items={items} name="framework" defaultValue="react">
            <HStack gap="2">
              <Select.Trigger aria-label="Form framework">
                <Select.Value placeholder="Select framework" />
                <Select.Icon />
              </Select.Trigger>
            </HStack>
            <Select.Content>
              <For each={items}>
                {(item) => (
                  <Select.Item
                    key={item.value}
                    value={item.value}
                    label={item.label}
                  >
                    <Select.ItemText>{item.label}</Select.ItemText>
                    <Select.ItemIndicator />
                  </Select.Item>
                )}
              </For>
            </Select.Content>
          </Select.Root>
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
