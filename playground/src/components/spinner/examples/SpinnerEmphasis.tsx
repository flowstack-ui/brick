import { HStack, Spinner, Text, VStack } from "@flowstack-ui/brick";
export function SpinnerEmphasis() {
  return (
    <HStack gap="6">
      <VStack gap="3" align="center">
        <Spinner tone="accent" />
        <Text tone="secondary" variant="body-sm">
          Text
        </Text>
      </VStack>
      <VStack gap="3" align="center">
        <Spinner tone="accent" emphasis="solid" />
        <Text tone="secondary" variant="body-sm">
          Solid
        </Text>
      </VStack>
    </HStack>
  );
}
