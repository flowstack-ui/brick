import { useState } from "react";
import {
  Button,
  CloseButton,
  Dialog,
  Form,
  Input,
  Text,
  VStack,
  createOverlay,
} from "@flowstack-ui/brick";
export function OverlayManagerForm() {
  const [answer, setAnswer] = useState("Nothing submitted.");
  const [manager] = useState(() =>
    createOverlay<{ title: string }, string>(({ title, ...lifecycle }) => (
      <Dialog.Root {...lifecycle}>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>{title}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Form
                  onSubmit={(event) => {
                    event.preventDefault();
                    const name = String(
                      new FormData(event.currentTarget).get("name") ?? "",
                    ).trim();
                    if (name) void manager.close("form", name);
                  }}
                >
                  <VStack gap="4">
                    <Dialog.Description>
                      Submit a workspace name with the button or Enter.
                    </Dialog.Description>
                    <Input name="name" aria-label="Workspace name" required />
                    <Button type="submit">Save workspace</Button>
                  </VStack>
                </Form>
              </Dialog.Body>
              <Dialog.Close placement="corner" asChild>
                <CloseButton size="sm" />
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Positioner>
        </Dialog.Portal>
      </Dialog.Root>
    )),
  );
  return (
    <VStack gap="3" align="start">
      <Button
        variant="outline"
        onPress={() =>
          void manager
            .open("form", { title: "New workspace" })
            .then((value) =>
              setAnswer(value === undefined ? "Cancelled." : "Saved: " + value),
            )
        }
      >
        Open form
      </Button>
      <Text role="status">{answer}</Text>
      <manager.Viewport />
    </VStack>
  );
}
