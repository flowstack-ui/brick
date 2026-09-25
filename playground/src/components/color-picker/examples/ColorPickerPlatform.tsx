import { Frame, ColorPicker, HStack } from "@flowstack-ui/brick";
export function ColorPickerPlatform() {
  return (
    <Frame maxInlineSize="20rem">
      <ColorPicker.Root defaultValue="#9333ea">
        <ColorPicker.Label>Color</ColorPicker.Label>
        <HStack gap="3">
          <ColorPicker.EyeDropper />
          <ColorPicker.NativeInput aria-label="Browser opaque color chooser" />
        </HStack>
        <ColorPicker.ValueText />
      </ColorPicker.Root>
    </Frame>
  );
}
