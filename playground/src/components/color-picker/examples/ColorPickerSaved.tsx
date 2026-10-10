import { useState } from "react";
import { Frame, ColorPicker, Button, VStack, For } from "@flowstack-ui/brick";
export function ColorPickerSaved() {
  const [colors, setColors] = useState(["#9333ea"]);
  return (
    <Frame maxInlineSize="20rem">
      <ColorPicker.Root defaultValue="#9333ea">
        <VStack gap="4">
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
          <ColorPicker.Context>
            {(api) => (
              <Button
                variant="outline"
                onClick={() =>
                  setColors((previous) =>
                    Array.from(
                      new Set([...previous, api.value.toString("hex")]),
                    ),
                  )
                }
              >
                Save current color
              </Button>
            )}
          </ColorPicker.Context>
          <ColorPicker.SwatchGroup>
            <For each={colors}>
              {(value) => (
                <ColorPicker.SwatchTrigger key={value} value={value}>
                  <ColorPicker.Swatch value={value}>
                    <ColorPicker.SwatchIndicator />
                  </ColorPicker.Swatch>
                </ColorPicker.SwatchTrigger>
              )}
            </For>
          </ColorPicker.SwatchGroup>
        </VStack>
      </ColorPicker.Root>
    </Frame>
  );
}
