import { NativeSelect, For, Frame } from "@flowstack-ui/brick";

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
];
export function NativeSelectNoIndicator() {
  return (
    <Frame maxInlineSize="20rem">
      <NativeSelect.Root>
        <NativeSelect.Field aria-label="Framework without indicator">
          <For each={items}>
            {(item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            )}
          </For>
        </NativeSelect.Field>
      </NativeSelect.Root>
    </Frame>
  );
}
