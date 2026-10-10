import { HStack, Stack, Surface, Text, Frame } from "@flowstack-ui/brick";

export function StackItemAlignment() {
  return (
    <Frame blockSize="10rem" asChild>
      <HStack gap={3} align="start">
        <Surface inset="sm" level="subtle">
          <Text>Start</Text>
        </Surface>
        <Stack.Item align="center">
          <Surface inset="sm" level="subtle">
            <Text>Center</Text>
          </Surface>
        </Stack.Item>
        <Stack.Item align="end">
          <Surface inset="sm" level="subtle">
            <Text>End</Text>
          </Surface>
        </Stack.Item>
      </HStack>
    </Frame>
  );
}
