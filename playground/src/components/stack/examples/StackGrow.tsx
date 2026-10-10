import { HStack, Stack, Surface, Text } from "@flowstack-ui/brick";

export function StackGrow() {
  return (
    <HStack gap={3}>
      <Stack.Item grow={0.5} basis={0}>
        <Surface level="subtle" inset="sm">
          <Text>0.5</Text>
        </Surface>
      </Stack.Item>
      <Stack.Item grow={1.5} basis={0}>
        <Surface level="subtle" inset="sm">
          <Text>1.5</Text>
        </Surface>
      </Stack.Item>
    </HStack>
  );
}
