import { Frame, ColorPicker } from "@flowstack-ui/brick";
export function ColorPickerIntegrated() {
  return (
    <Frame maxInlineSize="20rem">
      <ColorPicker.Root defaultValue="#9333ea">
        <ColorPicker.Label>Accent</ColorPicker.Label>
        <ColorPicker.Control layout="integrated">
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
