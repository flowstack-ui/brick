import { Checkmark, HStack, Text } from "@flowstack-ui/brick";
export function CheckmarkBasic() {
  return (
    <HStack gap={2}>
      <Checkmark checked />
      <Text>Selected option</Text>
    </HStack>
  );
}
