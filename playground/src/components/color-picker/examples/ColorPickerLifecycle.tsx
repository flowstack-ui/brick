import { Frame, ColorPicker } from "@flowstack-ui/brick";
export function ColorPickerLifecycle() {
  return (
    <Frame maxInlineSize="20rem">
      <ColorPicker.Root lazyMount unmountOnExit defaultValue="#9333ea">
        <ColorPicker.Label>Color</ColorPicker.Label>
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
    </Frame>
  );
}
