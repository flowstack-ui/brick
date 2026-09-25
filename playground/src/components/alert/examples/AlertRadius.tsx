import { Alert, VStack, For } from "@flowstack-ui/brick";
export function AlertRadius() {
  return (
    <VStack gap="4">
      <For each={["none", "sm", "surface"] as const}>
        {(radius) => (
          <Alert.Root key={radius} radius={radius}>
            <Alert.Indicator />
            <Alert.Title>{radius}</Alert.Title>
          </Alert.Root>
        )}
      </For>
    </VStack>
  );
}
