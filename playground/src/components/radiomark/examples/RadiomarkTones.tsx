import { Radiomark, HStack, VStack, Text } from "@flowstack-ui/brick";
export function RadiomarkTones() {
  return (
    <HStack gap={6} wrap>
      {(
        [
          "accent",
          "neutral",
          "contrast",
          "info",
          "success",
          "warning",
          "danger",
        ] as const
      ).map((tone) => (
        <VStack key={tone} align="start" gap={2}>
          <Radiomark tone={tone} checked />
          <Text variant="body-sm">{tone}</Text>
        </VStack>
      ))}
    </HStack>
  );
}
