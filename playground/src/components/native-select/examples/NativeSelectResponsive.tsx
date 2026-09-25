import { NativeSelect, For, Frame } from "@flowstack-ui/brick";

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
];
export function NativeSelectResponsive() {
  return (
    <Frame maxInlineSize="20rem">
      <NativeSelect.Root size={{ lg: "xl" }}>
        <NativeSelect.Field aria-label="Responsive framework">
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
