import { Frame, ColorPicker, VStack } from "@flowstack-ui/brick";
export function ColorPickerStates() {
  return (
    <Frame maxInlineSize="20rem">
      <VStack gap="5">
        <ColorPicker.Root disabled defaultValue="#9333ea">
          <ColorPicker.Label>Disabled</ColorPicker.Label>
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
        <ColorPicker.Root readOnly defaultValue="#9333ea">
          <ColorPicker.Label>Read only</ColorPicker.Label>
          <ColorPicker.Input />
        </ColorPicker.Root>
        <ColorPicker.Root invalid defaultValue="#9333ea">
          <ColorPicker.Label>Invalid</ColorPicker.Label>
          <ColorPicker.Input />
        </ColorPicker.Root>
      </VStack>
    </Frame>
  );
}
