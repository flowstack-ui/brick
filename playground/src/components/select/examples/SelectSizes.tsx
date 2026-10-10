import { Select, For, Frame, VStack, HStack, Text } from "@flowstack-ui/brick";

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
];
export function SelectSizes() {
  return (
    <VStack gap="4">
      <For each={["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const}>
        {(size) => (
          <Frame key={size} maxInlineSize="20rem">
            <VStack gap="2">
              <Text>{size}</Text>
              <Select.Root items={items} size={size}>
                <HStack gap="2">
                  <Select.Trigger aria-label="Size">
                    <Select.Value placeholder="Select framework" />
                    <Select.Icon />
                  </Select.Trigger>
                </HStack>
                <Select.Content>
                  <For each={items}>
                    {(item) => (
                      <Select.Item
                        key={item.value}
                        value={item.value}
                        label={item.label}
                      >
                        <Select.ItemText>{item.label}</Select.ItemText>
                        <Select.ItemIndicator />
                      </Select.Item>
                    )}
                  </For>
                </Select.Content>
              </Select.Root>
            </VStack>
          </Frame>
        )}
      </For>
    </VStack>
  );
}
