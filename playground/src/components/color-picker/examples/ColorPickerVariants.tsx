import { Frame, ColorPicker, VStack, For } from "@flowstack-ui/brick";
export function ColorPickerVariants() {
  return (
    <Frame maxInlineSize="20rem">
      <VStack gap="5">
        <For each={["outline", "surface", "soft", "subtle"] as const}>
          {(variant) => (
            <ColorPicker.Root
              key={variant}
              variant={variant}
              defaultValue="#9333ea"
            >
              <ColorPicker.Label>{variant}</ColorPicker.Label>
              <ColorPicker.Control>
                <ColorPicker.Input />
                <ColorPicker.Trigger>
                  <ColorPicker.ValueSwatch />
                </ColorPicker.Trigger>
              </ColorPicker.Control>
              <ColorPicker.Positioner>
                <ColorPicker.Content>
                  <ColorPicker.Area />
                  <ColorPicker.Sliders />
                </ColorPicker.Content>
              </ColorPicker.Positioner>
            </ColorPicker.Root>
          )}
        </For>
      </VStack>
    </Frame>
  );
}
