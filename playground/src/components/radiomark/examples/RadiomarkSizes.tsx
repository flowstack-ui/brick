import { Radiomark, HStack, VStack, Text } from "@flowstack-ui/brick";
export function RadiomarkSizes() {
  return (
    <HStack gap={6} wrap>
      {(["xs", "sm", "md", "lg"] as const).map((size) => (
        <VStack key={size} align="start" gap={2}>
          <Radiomark size={size} checked />
          <Text variant="body-sm">{size}</Text>
        </VStack>
      ))}
    </HStack>
  );
}
