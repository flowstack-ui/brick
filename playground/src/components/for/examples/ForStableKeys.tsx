import { useState } from "react";
import { Button, For, Input, List, VStack } from "@flowstack-ui/brick";

const initial = [
  { id: "first", label: "First item" },
  { id: "second", label: "Second item" },
];

export function ForStableKeys() {
  const [items, setItems] = useState(initial);
  return (
    <VStack gap="4">
      <Button
        variant="outline"
        onClick={() => setItems((current) => [...current].reverse())}
      >
        Reverse items
      </Button>
      <List.Root>
        <For each={items}>
          {(item) => (
            <List.Item key={item.id}>
              <Input
                aria-label={`Note for ${item.label}`}
                placeholder={item.label}
              />
            </List.Item>
          )}
        </For>
      </List.Root>
    </VStack>
  );
}
