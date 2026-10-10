import { NativeSelect, For, Frame } from "@flowstack-ui/brick";

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
];
export function NativeSelectComposition() {
  return (
    <Frame maxInlineSize="20rem">
      <NativeSelect.Root asChild>
        <section>
          <NativeSelect.Field aria-label="Composed framework">
            <For each={items}>
              {(item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              )}
            </For>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </section>
      </NativeSelect.Root>
    </Frame>
  );
}
