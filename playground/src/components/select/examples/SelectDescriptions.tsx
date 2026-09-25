import { Select, Frame, VStack, Text, For } from "@flowstack-ui/brick";
const items = [
  {
    value: "personal",
    label: "Personal",
    description: "For individual projects",
  },
  { value: "team", label: "Team", description: "For shared workspaces" },
];
export function SelectDescriptions() {
  return (
    <Frame maxInlineSize="20rem">
      <Select.Root items={items}>
        <Select.Trigger aria-label="Plan">
          <Select.Value placeholder="Choose plan" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content>
          <For each={items}>
            {(item) => (
              <Select.Item
                key={item.value}
                value={item.value}
                label={item.label}
              >
                <VStack align="start" gap="1">
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Text tone="secondary" variant="body-sm">
                    {item.description}
                  </Text>
                </VStack>
                <Select.ItemIndicator />
              </Select.Item>
            )}
          </For>
        </Select.Content>
      </Select.Root>
    </Frame>
  );
}
