import {
  MultiSelect,
  useMultiSelect,
  Frame,
  VStack,
  Button,
  For,
} from "@flowstack-ui/brick";
const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
];
export function MultiSelectStore() {
  const controller = useMultiSelect({ items });
  return (
    <Frame maxInlineSize="20rem">
      <VStack gap="3">
        <Button variant="outline" onClick={() => controller.context.onOpen()}>
          Open selector
        </Button>
        <MultiSelect.RootProvider value={controller}>
          <MultiSelect.Trigger aria-label="Controller framework">
            <MultiSelect.Value placeholder="Choose framework" />
            <MultiSelect.Icon />
          </MultiSelect.Trigger>
          <MultiSelect.Content>
            <For each={items}>
              {(item) => (
                <MultiSelect.Item key={item.value} value={item.value}>
                  <MultiSelect.ItemText>{item.label}</MultiSelect.ItemText>
                  <MultiSelect.ItemIndicator />
                </MultiSelect.Item>
              )}
            </For>
          </MultiSelect.Content>
        </MultiSelect.RootProvider>
      </VStack>
    </Frame>
  );
}
