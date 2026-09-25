import { Checkmark, HStack, VStack, Text } from "@flowstack-ui/brick";
export function CheckmarkSizes() {
  return (
    <HStack gap={6} wrap>
      {(["xs", "sm", "md", "lg"] as const).map((size) => (
        <VStack key={size} align="start" gap={2}>
          <Checkmark size={size} checked />
          <Text variant="body-sm">{size}</Text>
        </VStack>
      ))}
    </HStack>
  );
}
