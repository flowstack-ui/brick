import { useState } from "react";
import {
  Button,
  CloseButton,
  FloatingPanel,
  Icon,
  IconButton,
  Paragraph,
  Frame,
  Float,
} from "@flowstack-ui/brick";
import { GripHorizontal, Maximize2, Minimize2, Minus } from "lucide-react";
export function FloatingPanelBoundary() {
  const [boundary, setBoundary] = useState<HTMLElement | null>(null);
  return (
    <Frame blockSize="24rem" asChild>
      <Float.Anchor ref={setBoundary}>
        <FloatingPanel.Root
          strategy="absolute"
          getBoundaryEl={() => boundary}
          allowOverflow={false}
          defaultPosition={{ x: 12, y: 48 }}
        >
          <FloatingPanel.Trigger asChild>
            <Button variant="outline">Bounded panel</Button>
          </FloatingPanel.Trigger>
          {boundary && (
            <FloatingPanel.Portal container={boundary}>
              <FloatingPanel.Positioner>
                <FloatingPanel.Content>
                  <FloatingPanel.Header>
                    <FloatingPanel.DragTrigger>
                      <Icon size="sm">
                        <GripHorizontal />
                      </Icon>
                      <FloatingPanel.Title>Bounded panel</FloatingPanel.Title>
                    </FloatingPanel.DragTrigger>
                    <FloatingPanel.Control>
                      <FloatingPanel.StageTrigger stage="minimized" asChild>
                        <IconButton size="2xs" aria-label="Minimize panel">
                          <Minus />
                        </IconButton>
                      </FloatingPanel.StageTrigger>
                      <FloatingPanel.StageTrigger stage="maximized" asChild>
                        <IconButton size="2xs" aria-label="Maximize panel">
                          <Maximize2 />
                        </IconButton>
                      </FloatingPanel.StageTrigger>
                      <FloatingPanel.StageTrigger stage="default" asChild>
                        <IconButton size="2xs" aria-label="Restore panel">
                          <Minimize2 />
                        </IconButton>
                      </FloatingPanel.StageTrigger>
                      <FloatingPanel.CloseTrigger asChild>
                        <CloseButton size="2xs" aria-label="Close panel" />
                      </FloatingPanel.CloseTrigger>
                    </FloatingPanel.Control>
                  </FloatingPanel.Header>
                  <FloatingPanel.Body>
                    <Paragraph variant="body-sm">
                      This positioned region owns the panel boundary,
                      independently of the document.
                    </Paragraph>
                  </FloatingPanel.Body>
                  <FloatingPanel.ResizeTriggers />
                </FloatingPanel.Content>
              </FloatingPanel.Positioner>
            </FloatingPanel.Portal>
          )}
        </FloatingPanel.Root>
      </Float.Anchor>
    </Frame>
  );
}
