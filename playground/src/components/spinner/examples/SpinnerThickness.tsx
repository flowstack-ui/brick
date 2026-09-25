import { For, HStack, Spinner, Text, VStack } from "@flowstack-ui/brick";
export function SpinnerThickness() {
  return (
    <HStack gap="6">
      <For each={["thin", "regular", "thick"] as const}>
        {(thickness) => (
          <VStack key={thickness} gap="3" align="center">
            <Spinner thickness={thickness} />
            <Text tone="secondary" variant="body-sm">
              {thickness}
            </Text>
          </VStack>
        )}
      </For>
    </HStack>
  );
}
