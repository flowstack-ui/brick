import { NativeSelect, For, Frame, VStack } from "@flowstack-ui/brick";

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
];
export function NativeSelectStates() {
  return (
    <VStack gap="4">
      <Frame maxInlineSize="20rem">
        <NativeSelect.Root disabled>
          <NativeSelect.Field aria-label="Disabled framework">
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
      </Frame>
      <Frame maxInlineSize="20rem">
        <NativeSelect.Root invalid>
          <NativeSelect.Field aria-label="Invalid framework">
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
      </Frame>
    </VStack>
  );
}
