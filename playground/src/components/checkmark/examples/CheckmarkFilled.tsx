import { Checkmark, HStack, VStack, Text, Surface } from "@flowstack-ui/brick";
export function CheckmarkFilled() {
  return (
    <Surface level="subtle" inset="md">
      <HStack gap={6} wrap>
        <VStack align="start" gap={2}>
          <Checkmark variant="outline" checked />
          <Text variant="body-sm">Transparent</Text>
        </VStack>
        <VStack align="start" gap={2}>
          <Checkmark variant="outline" filled checked />
          <Text variant="body-sm">Filled</Text>
        </VStack>
      </HStack>
    </Surface>
  );
}
