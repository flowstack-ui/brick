import { Alert, VStack, For } from "@flowstack-ui/brick";
export function AlertSizes() {
  return (
    <VStack gap="4">
      <For each={["sm", "md", "lg"] as const}>
        {(size) => (
          <Alert.Root key={size} size={size}>
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>{size}</Alert.Title>
              <Alert.Description>
                Your workspace is up to date.
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>
        )}
      </For>
    </VStack>
  );
}
