import { Checkmark, HStack, VStack, Text } from "@flowstack-ui/brick";
export function CheckmarkVariants() {
  return (
    <HStack gap={6} wrap>
      {(
        ["solid", "outline", "subtle", "soft", "plain", "inverted"] as const
      ).map((variant) => (
        <VStack key={variant} align="start" gap={2}>
          <HStack gap={2}>
            <Checkmark variant={variant} />
            <Checkmark variant={variant} checked />
            <Checkmark variant={variant} indeterminate />
          </HStack>
          <Text variant="body-sm">{variant}</Text>
        </VStack>
      ))}
    </HStack>
  );
}
