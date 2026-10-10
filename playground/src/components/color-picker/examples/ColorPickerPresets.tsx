import { Frame, ColorPicker, For } from "@flowstack-ui/brick";
export function ColorPickerPresets() {
  return (
    <Frame maxInlineSize="20rem">
      <ColorPicker.Root defaultValue="#9333ea">
        <ColorPicker.Label>Palette</ColorPicker.Label>
        <ColorPicker.SwatchGroup>
          <For each={["#9333ea", "#22c55e", "#f59e0b", "#ef4444"]}>
            {(value) => (
              <ColorPicker.SwatchTrigger key={value} value={value}>
                <ColorPicker.Swatch value={value}>
                  <ColorPicker.SwatchIndicator />
                </ColorPicker.Swatch>
              </ColorPicker.SwatchTrigger>
            )}
          </For>
        </ColorPicker.SwatchGroup>
        <ColorPicker.ValueText />
      </ColorPicker.Root>
    </Frame>
  );
}
