import { Rating, HStack, VStack, Text } from "@flowstack-ui/brick";
export function RatingSizes() {
  return (
    <VStack gap="6">
      <HStack gap="8" wrap="wrap">
        {(["xs", "sm", "md", "lg"] as const).map((size) => (
          <VStack key={size} gap="2">
            <Text>{size}</Text>
            <Rating.Root
              aria-label={size + " rating"}
              size={size}
              defaultValue={3}
            />
          </VStack>
        ))}
      </HStack>
      <Rating.Root density="compact" defaultValue={3}>
        <Rating.Label>Compact targets</Rating.Label>
        <Rating.Control />
      </Rating.Root>
    </VStack>
  );
}
