import {
  Select,
  useSelect,
  Frame,
  VStack,
  Button,
  For,
} from "@flowstack-ui/brick";
const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
];
export function SelectStore() {
  const controller = useSelect({ items });
  return (
    <Frame maxInlineSize="20rem">
      <VStack gap="3">
        <Button variant="outline" onClick={() => controller.context.onOpen()}>
          Open selector
        </Button>
        <Select.RootProvider value={controller}>
          <Select.Trigger aria-label="Controller framework">
            <Select.Value placeholder="Choose framework" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Content>
            <For each={items}>
              {(item) => (
                <Select.Item key={item.value} value={item.value}>
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>
              )}
            </For>
          </Select.Content>
        </Select.RootProvider>
      </VStack>
    </Frame>
  );
}
