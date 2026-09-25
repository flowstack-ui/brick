import { Checkmark, HStack, VStack, Text } from "@flowstack-ui/brick";
export function CheckmarkRadius() {
  return (
    <HStack gap={6} wrap>
      {(["none", "full"] as const).map((radius) => (
        <VStack gap={2} align="start" key={radius}>
          <Checkmark checked radius={radius} />
          <Text variant="body-sm">{radius}</Text>
        </VStack>
      ))}
    </HStack>
  );
}
