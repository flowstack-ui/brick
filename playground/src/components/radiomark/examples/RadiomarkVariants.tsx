import { Radiomark, HStack, VStack, Text } from "@flowstack-ui/brick";
export function RadiomarkVariants() {
  return (
    <HStack gap={6} wrap>
      {(["solid", "outline", "subtle", "soft", "inverted"] as const).map(
        (variant) => (
          <VStack key={variant} align="start" gap={2}>
            <HStack gap={2}>
              <Radiomark variant={variant} />
              <Radiomark variant={variant} checked />
            </HStack>
            <Text variant="body-sm">{variant}</Text>
          </VStack>
        ),
      )}
    </HStack>
  );
}
