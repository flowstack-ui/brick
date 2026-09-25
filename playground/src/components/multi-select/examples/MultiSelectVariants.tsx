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
export function MultiSelectVariants() {
  return (
    <VStack gap="4">
      <For
        each={
          [
            "outline",
            "surface",
            "soft",
            "subtle",
            "ghost",
            "underline",
          ] as const
        }
      >
        {(variant) => (
          <Frame key={variant} maxInlineSize="20rem">
            <VStack gap="2">
              <Text>{variant}</Text>
              <MultiSelect.Root items={items} variant={variant}>
                <HStack gap="2">
                  <MultiSelect.Trigger aria-label="Variant">
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
