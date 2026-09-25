import { HStack, Stack, Text } from "@flowstack-ui/brick";

export function StackSpacer() {
  return (
    <HStack>
      <Text>A</Text>
      <Stack.Item flex={1} aria-hidden="true" />
      <Text>B</Text>
      <Stack.Item flex={2} aria-hidden="true" />
      <Text>C</Text>
    </HStack>
  );
}
