import { useState } from "react";
import { Frame, ColorPicker, Text, VStack } from "@flowstack-ui/brick";
export function ColorPickerControlled() {
  const [value, setValue] = useState("#9333ea");
  const [committed, setCommitted] = useState("No committed change");
  return (
    <Frame maxInlineSize="20rem">
      <VStack gap="3">
        <ColorPicker.Root
          value={value}
          onValueChange={(details) => setValue(details.valueAsString)}
          onValueChangeEnd={(details) => setCommitted(details.valueAsString)}
        >
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
        <Text variant="body-sm">Last completed edit: {committed}</Text>
      </VStack>
    </Frame>
  );
}
