import { NativeSelect, For, Frame, VStack, Text } from "@flowstack-ui/brick";
import { useState } from "react";

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
];
export function NativeSelectControlled() {
  const [value, setValue] = useState("react");
  return (
    <Frame maxInlineSize="20rem">
      <VStack gap="3">
        <NativeSelect.Root>
          <NativeSelect.Field
            aria-label="Controlled framework"
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
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
        <Text tone="secondary">Selected: {value}</Text>
      </VStack>
    </Frame>
  );
}
