import { Alert, VStack, For } from "@flowstack-ui/brick";
export function AlertVariants() {
  return (
    <VStack gap="4">
      <For each={["soft", "surface", "outline", "solid"] as const}>
        {(variant) => (
          <Alert.Root key={variant} variant={variant}>
            <Alert.Indicator />
            <Alert.Title>{variant}</Alert.Title>
          </Alert.Root>
        )}
      </For>
    </VStack>
  );
}
