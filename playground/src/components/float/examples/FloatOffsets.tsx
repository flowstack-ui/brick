import { Badge, Float, For, Surface, Text, VStack } from "@flowstack-ui/brick";
export function FloatOffsets() {
  return (
    <VStack gap={8}>
      <For
        each={[
          { label: "Uniform inset", props: { offset: 2 } },
          { label: "Inline inset", props: { offsetInline: 3 } },
          { label: "Block outward", props: { offsetBlock: -2 } },
        ]}
      >
        {({ label, props }) => (
          <Float.Anchor key={label}>
            <Surface level="subtle" inset="lg">
              <Text>{label}</Text>
            </Surface>
            <Float.Root {...props}>
              <Badge tone="accent" variant="solid">
                New
              </Badge>
            </Float.Root>
          </Float.Anchor>
        )}
      </For>
    </VStack>
  );
}
