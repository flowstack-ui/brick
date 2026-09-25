import { Radiomark, HStack, Text } from "@flowstack-ui/brick";
export function RadiomarkBasic() {
  return (
    <HStack gap={2}>
      <Radiomark checked />
      <Text>Selected option</Text>
    </HStack>
  );
}
