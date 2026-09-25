import { Frame, ColorPicker } from "@flowstack-ui/brick";
export function ColorPickerInline() {
  return (
    <Frame maxInlineSize="20rem">
      <ColorPicker.Root inline defaultValue="#9333ea">
        <ColorPicker.Label>Accent</ColorPicker.Label>
        <ColorPicker.Area />
        <ColorPicker.Sliders />
        <ColorPicker.Input />
      </ColorPicker.Root>
    </Frame>
  );
}
