import { NativeSelect, For, Frame } from "@flowstack-ui/brick";

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
];
export function NativeSelectMultiple() {
  return (
    <Frame maxInlineSize="20rem">
      <NativeSelect.Root multiple rows={3}>
        <NativeSelect.Field
          aria-label="Multiple frameworks"
          defaultValue={["react", "vue"]}
        >
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
  );
}
