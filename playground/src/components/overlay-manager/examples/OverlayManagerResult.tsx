import { useEffect, useRef, useState } from "react";
import {
  Button,
  CloseButton,
  Dialog,
  Text,
  VStack,
  createOverlay,
} from "@flowstack-ui/brick";
export function OverlayManagerResult() {
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  const [answer, setAnswer] = useState("No answer yet.");
  const [manager] = useState(() =>
    createOverlay<{ title: string; confirmation: boolean }, boolean>(
      ({ title, confirmation, ...lifecycle }) => (
        <Dialog.Root {...lifecycle}>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>{title}</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <Dialog.Description>
                    {confirmation
                      ? "Would you like to continue?"
                      : "The previous overlay finished exiting before this one opened."}
                  </Dialog.Description>
                </Dialog.Body>
                <Dialog.Footer>
                  <Button onPress={() => void manager.close("flow", true)}>
                    {confirmation ? "Continue" : "Done"}
                  </Button>
                </Dialog.Footer>
                <Dialog.Close placement="corner" asChild>
                  <CloseButton size="sm" />
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Positioner>
          </Dialog.Portal>
        </Dialog.Root>
      ),
    ),
  );
  async function launch() {
    const result = await manager.open("flow", {
      title: "Confirm action",
      confirmation: true,
    });
    setAnswer(result === true ? "Confirmed." : "Dismissed.");
    await manager.waitForExit("flow");
    if (result === true && mounted.current)
      await manager.open("flow", { title: "Completed", confirmation: false });
  }
  return (
    <VStack gap="3" align="start">
      <Button variant="outline" onPress={() => void launch()}>
        Open confirmation
      </Button>
      <Text role="status">{answer}</Text>
      <manager.Viewport />
    </VStack>
  );
}
