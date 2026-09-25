import { useState } from "react";
import {
  Button,
  CloseButton,
  FloatingPanel,
  Paragraph,
  createOverlay,
} from "@flowstack-ui/brick";
export function OverlayManagerPanel() {
  const [manager] = useState(() =>
    createOverlay<{ title: string }, void>(({ title, ...lifecycle }) => (
      <FloatingPanel.Root {...lifecycle} allowOverflow={false}>
        <FloatingPanel.Portal>
          <FloatingPanel.Positioner>
            <FloatingPanel.Content>
              <FloatingPanel.Header>
                <FloatingPanel.DragTrigger>
                  <FloatingPanel.Title>{title}</FloatingPanel.Title>
                </FloatingPanel.DragTrigger>
                <FloatingPanel.CloseTrigger asChild>
                  <CloseButton size="xs" />
                </FloatingPanel.CloseTrigger>
              </FloatingPanel.Header>
              <FloatingPanel.Body>
                <Paragraph>
                  Drag or resize this nonmodal inspector. The manager does not
                  add modal behavior.
                </Paragraph>
              </FloatingPanel.Body>
              <FloatingPanel.ResizeTriggers />
            </FloatingPanel.Content>
          </FloatingPanel.Positioner>
        </FloatingPanel.Portal>
      </FloatingPanel.Root>
    )),
  );
  return (
    <>
      <Button
        variant="outline"
        onPress={() => void manager.open("inspector", { title: "Inspector" })}
      >
        Open inspector
      </Button>
      <manager.Viewport />
    </>
  );
}
