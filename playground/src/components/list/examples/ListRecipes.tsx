import { For, List, Text, VStack } from "@flowstack-ui/brick";
export function ListRecipes() {
  return (
    <VStack gap="8">
      <For each={["plain", "divided", "bordered"] as const}>
        {(variant) => (
          <VStack key={variant} gap="2">
            <Text>{variant}</Text>
            <List.Root variant={variant} marker="none">
              <List.Item>Workspace</List.Item>
              <List.Item>Members</List.Item>
            </List.Root>
          </VStack>
        )}
      </For>
      <For each={["sm", "md", "lg"] as const}>
        {(size) => (
          <List.Root key={size} size={size} marker="none" density="compact">
            <List.Item>
              <List.Content>
                <List.Title>{size}</List.Title>
                <List.Description>
                  Compact density keeps the text scale.
                </List.Description>
              </List.Content>
            </List.Item>
          </List.Root>
        )}
      </For>
    </VStack>
  );
}
