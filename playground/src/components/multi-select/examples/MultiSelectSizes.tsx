import {
  MultiSelect,
  For,
  Frame,
  VStack,
  HStack,
  Text,
} from "@flowstack-ui/brick";

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
];
export function MultiSelectSizes() {
  return (
    <VStack gap="4">
      <For each={["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const}>
        {(size) => (
          <Frame key={size} maxInlineSize="20rem">
            <VStack gap="2">
              <Text>{size}</Text>
              <MultiSelect.Root items={items} size={size}>
                <HStack gap="2">
                  <MultiSelect.Trigger aria-label="Size">
                    <MultiSelect.Value placeholder="Select framework" />
                    <MultiSelect.Icon />
                  </MultiSelect.Trigger>
                </HStack>
                <MultiSelect.Content>
                  <For each={items}>
                    {(item) => (
                      <MultiSelect.Item
                        key={item.value}
                        value={item.value}
                        label={item.label}
                      >
                        <MultiSelect.ItemText>
                          {item.label}
                        </MultiSelect.ItemText>
                        <MultiSelect.ItemIndicator />
                      </MultiSelect.Item>
                    )}
                  </For>
                </MultiSelect.Content>
              </MultiSelect.Root>
            </VStack>
          </Frame>
        )}
      </For>
    </VStack>
  );
}
