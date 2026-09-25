import { HStack, Kbd, Text } from "@flowstack-ui/brick";
export function KbdCombinations() {
  return (
    <HStack gap="2" wrap="wrap">
      <Kbd>Ctrl</Kbd>
      <Text>+</Text>
      <Kbd>Shift</Kbd>
      <Text>+</Text>
      <Kbd>P</Kbd>
    </HStack>
  );
}
