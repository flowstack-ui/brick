import { MultiSelect, Frame, VStack, Text, For } from "@flowstack-ui/brick";
const items = [
  {
    value: "personal",
    label: "Personal",
    description: "For individual projects",
  },
  { value: "team", label: "Team", description: "For shared workspaces" },
];
export function MultiSelectDescriptions() {
  return (
    <Frame maxInlineSize="20rem">
      <MultiSelect.Root items={items}>
        <MultiSelect.Trigger aria-label="Plan">
          <MultiSelect.Value placeholder="Choose plan" />
          <MultiSelect.Icon />
        </MultiSelect.Trigger>
        <MultiSelect.Content>
          <For each={items}>
            {(item) => (
              <MultiSelect.Item
                key={item.value}
                value={item.value}
                label={item.label}
              >
                <VStack align="start" gap="1">
                  <MultiSelect.ItemText>{item.label}</MultiSelect.ItemText>
                  <Text tone="secondary" variant="body-sm">
                    {item.description}
                  </Text>
                </VStack>
                <MultiSelect.ItemIndicator />
              </MultiSelect.Item>
            )}
          </For>
        </MultiSelect.Content>
      </MultiSelect.Root>
    </Frame>
  );
}
