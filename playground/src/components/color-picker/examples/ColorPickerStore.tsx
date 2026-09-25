import {
  Frame,
  ColorPicker,
  useColorPicker,
  Button,
  VStack,
} from "@flowstack-ui/brick";
export function ColorPickerStore() {
  const controller = useColorPicker({ defaultValue: "#9333ea" });
  return (
    <Frame maxInlineSize="20rem">
      <VStack gap="3">
        <Button
          variant="outline"
          onClick={() => controller.api.setValue("#22c55e")}
        >
          Use green
        </Button>
        <ColorPicker.RootProvider value={controller}>
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
          <ColorPicker.ChannelText channel="hex" />
        </ColorPicker.RootProvider>
      </VStack>
    </Frame>
  );
}
