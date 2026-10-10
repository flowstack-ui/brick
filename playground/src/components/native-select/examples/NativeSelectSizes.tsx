import { NativeSelect, For, Frame, VStack, Text } from "@flowstack-ui/brick";

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
];
export function NativeSelectSizes() {
  return (
    <VStack gap="4">
      <For each={["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const}>
        {(size) => (
          <Frame key={size} maxInlineSize="20rem">
            <VStack gap="2">
              <Text>{size}</Text>
              <NativeSelect.Root size={size}>
                <NativeSelect.Field aria-label="Size">
                  <For each={items}>
                    {(item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    )}
                  </For>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </VStack>
          </Frame>
        )}
      </For>
    </VStack>
  );
}
