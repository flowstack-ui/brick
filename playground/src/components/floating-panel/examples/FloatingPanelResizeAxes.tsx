import {
  Button,
  CloseButton,
  FloatingPanel,
  Icon,
  IconButton,
  Paragraph,
} from "@flowstack-ui/brick";
import { GripHorizontal, Maximize2, Minimize2, Minus } from "lucide-react";

export function FloatingPanelResizeAxes() {
  return (
    <FloatingPanel.Root>
      <FloatingPanel.Trigger asChild>
        <Button variant="outline">Resize axes</Button>
      </FloatingPanel.Trigger>
      <FloatingPanel.Portal>
        <FloatingPanel.Positioner>
          <FloatingPanel.Content>
            <FloatingPanel.Header>
              <FloatingPanel.DragTrigger>
                <Icon size="sm">
                  <GripHorizontal />
                </Icon>
                <FloatingPanel.Title>Resize axes</FloatingPanel.Title>
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
                Resize from the bottom, right or bottom-right corner.
              </Paragraph>
            </FloatingPanel.Body>
            <FloatingPanel.ResizeTriggers axes={["s", "e", "se"]} />
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
      </FloatingPanel.Portal>
    </FloatingPanel.Root>
  );
}
