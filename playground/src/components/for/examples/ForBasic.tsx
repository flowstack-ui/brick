import { For, HStack, Text } from "@flowstack-ui/brick";

export function ForBasic() {
  return (
    <HStack gap="6">
      <For each={["One", "Two", "Three"]}>
        {(item) => <Text key={item}>{item}</Text>}
      </For>
    </HStack>
  );
}
