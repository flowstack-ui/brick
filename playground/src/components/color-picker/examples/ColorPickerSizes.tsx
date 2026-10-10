import { Frame, ColorPicker, VStack, For } from "@flowstack-ui/brick";
export function ColorPickerSizes() {
  return (
    <Frame maxInlineSize="20rem">
      <VStack gap="5">
        <For each={["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const}>
          {(size) => (
            <ColorPicker.Root key={size} size={size} defaultValue="#9333ea">
              <ColorPicker.Label>{size}</ColorPicker.Label>
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
