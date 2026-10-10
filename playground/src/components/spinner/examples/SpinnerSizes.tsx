import { For, HStack, Spinner, Text, VStack } from "@flowstack-ui/brick";
export function SpinnerSizes() {
  return (
    <HStack gap="6" wrap>
      <For each={["xs", "sm", "md", "lg", "xl"] as const}>
        {(size) => (
          <VStack key={size} gap="3" align="center">
            <Spinner size={size} />
            <Text tone="secondary" variant="body-sm">
              {size}
            </Text>
          </VStack>
        )}
      </For>
    </HStack>
  );
}
