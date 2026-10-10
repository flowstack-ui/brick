import { List, VStack, Text } from "@flowstack-ui/brick";
export function ListSpacing() {
  return (
    <VStack gap="6">
      <Text>Flush text with responsive peer spacing</Text>
      <List.Root density="none" inset="none" gap={{ initial: "2", md: "4" }}>
        <List.Item>Design the component</List.Item>
        <List.Item asChild>
          <li>Review the implementation</li>
        </List.Item>
        <List.Item>Ship the verified result</List.Item>
      </List.Root>
    </VStack>
  );
}
