import { For, Text, VStack } from "@flowstack-ui/brick";
import { ReorderableList } from "@flowstack-ui/brick";
import { useState } from "react";
export function ReorderableListRecipes() {
  return (
    <VStack gap={6}>
      <For each={["outline", "surface", "soft"] as const}>
        {(variant) => <Recipe key={variant} variant={variant} />}
      </For>
    </VStack>
  );
}
function Recipe({ variant }: { variant: "outline" | "surface" | "soft" }) {
  const [items, setItems] = useState(["First", "Second"]);
  return (
    <ReorderableList.Root
      items={items}
      onItemsChange={setItems}
      getItemLabel={(value) => value}
      variant={variant}
    >
      <For each={items}>
        {(value) => (
          <ReorderableList.Item key={value} value={value}>
            <ReorderableList.Content>
              <Text>
                {variant} · {value}
              </Text>
            </ReorderableList.Content>
            <ReorderableList.Actions>
              <ReorderableList.MoveBefore aria-label={`Move ${value} earlier`}>
                ↑
              </ReorderableList.MoveBefore>
              <ReorderableList.MoveAfter aria-label={`Move ${value} later`}>
                ↓
              </ReorderableList.MoveAfter>
            </ReorderableList.Actions>
          </ReorderableList.Item>
        )}
      </For>
    </ReorderableList.Root>
  );
}
