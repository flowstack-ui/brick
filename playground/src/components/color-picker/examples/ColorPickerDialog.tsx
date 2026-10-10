import {
  Frame,
  ColorPicker,
  Dialog,
  Button,
  CloseButton,
} from "@flowstack-ui/brick";
export function ColorPickerDialog() {
  return (
    <Frame maxInlineSize="20rem">
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button variant="outline">Edit color</Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Theme color</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <ColorPicker.Root defaultValue="#9333ea">
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
            </Dialog.Body>
            <Dialog.Close placement="corner" asChild>
              <CloseButton />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Frame>
  );
}
