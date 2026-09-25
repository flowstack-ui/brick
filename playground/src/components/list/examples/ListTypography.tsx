import { For, List, Text, VStack } from "@flowstack-ui/brick";
export function ListTypography() {
  return (
    <VStack gap="6">
      <For each={["body-sm", "body-md", "body-xl"] as const}>
        {(variant) => (
          <Text key={variant} as="div" variant={variant} weight="medium">
            <List.Root size="inherit" density="none" inset="none" gap="2">
              <List.Item>{variant}</List.Item>
              <List.Item>
                <List.Content>
                  <List.Title>Title inherits the text recipe</List.Title>
                  <List.Description>
                    Description keeps its secondary color
                  </List.Description>
                </List.Content>
              </List.Item>
            </List.Root>
          </Text>
        )}
      </For>
    </VStack>
  );
}
