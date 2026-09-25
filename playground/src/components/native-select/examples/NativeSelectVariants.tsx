import { NativeSelect, For, Frame, VStack, Text } from "@flowstack-ui/brick";

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
];
export function NativeSelectVariants() {
  return (
    <VStack gap="4">
      <For
        each={
          [
            "outline",
            "surface",
            "soft",
            "subtle",
            "ghost",
            "plain",
            "underline",
          ] as const
        }
      >
        {(variant) => (
          <Frame key={variant} maxInlineSize="20rem">
            <VStack gap="2">
              <Text>{variant}</Text>
              <NativeSelect.Root
                {...(variant === "underline" ? { variant } : { variant })}
              >
                <NativeSelect.Field aria-label="Variant">
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
