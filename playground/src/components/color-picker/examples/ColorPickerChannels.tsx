import {
  Frame,
  ColorPicker,
  VStack,
  HStack,
  Text,
  For,
  getColorChannels,
} from "@flowstack-ui/brick";
export function ColorPickerChannels() {
  return (
    <Frame maxInlineSize="20rem">
      <ColorPicker.Root inline defaultValue="#9333ea">
        <ColorPicker.Label>Channels</ColorPicker.Label>
        <ColorPicker.Area />
        <ColorPicker.Sliders />
        <ColorPicker.FormatSelect />
        <ColorPicker.Context>
          {(api) => (
            <HStack gap="2">
              <For each={getColorChannels(api.format)}>
                {(channel) => (
                  <VStack key={channel} gap="2">
                    <Text variant="body-sm">{channel}</Text>
                    <ColorPicker.ChannelInput
                      channel={channel}
                      aria-label={channel}
                    />
                  </VStack>
                )}
              </For>
            </HStack>
          )}
        </ColorPicker.Context>
      </ColorPicker.Root>
    </Frame>
  );
}
