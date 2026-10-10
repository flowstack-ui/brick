import { useState } from "react";
import {
  Frame,
  ColorPicker,
  Button,
  VStack,
  HStack,
  Text,
} from "@flowstack-ui/brick";
export function ColorPickerForm() {
  const [submitted, setSubmitted] = useState("");
  return (
    <Frame maxInlineSize="20rem">
      <VStack gap="4" asChild>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(
              String(new FormData(event.currentTarget).get("accent")),
            );
          }}
        >
          <ColorPicker.Root name="accent" defaultValue="#9333ea">
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
            <ColorPicker.HiddenInput />
          </ColorPicker.Root>
          <HStack gap="3">
            <Button type="submit">Save</Button>
            <Button type="reset" variant="outline">
              Reset
            </Button>
          </HStack>
          <Text variant="body-sm" role="status">
            {submitted}
          </Text>
        </form>
      </VStack>
    </Frame>
  );
}
