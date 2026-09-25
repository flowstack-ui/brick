import {
  Button,
  CloseButton,
  FloatingPanel,
  Icon,
  IconButton,
} from "@flowstack-ui/brick";
import { GripHorizontal, Maximize2, Minimize2, Minus } from "lucide-react";

export function FloatingPanelContext() {
  return (
    <FloatingPanel.Root>
      <FloatingPanel.Trigger asChild>
        <Button variant="outline">Context</Button>
      </FloatingPanel.Trigger>
      <FloatingPanel.Portal>
        <FloatingPanel.Positioner>
          <FloatingPanel.Content>
            <FloatingPanel.Header>
              <FloatingPanel.DragTrigger>
                <Icon size="sm">
                  <GripHorizontal />
                </Icon>
                <FloatingPanel.Title>Context</FloatingPanel.Title>
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
              <FloatingPanel.Context>
                {(panel) => (
                  <Button
                    size="sm"
                    onPress={() => panel.setSize({ width: 420, height: 300 })}
                  >
                    Resize through Context
                  </Button>
                )}
              </FloatingPanel.Context>
            </FloatingPanel.Body>
            <FloatingPanel.ResizeTriggers />
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
      </FloatingPanel.Portal>
    </FloatingPanel.Root>
  );
}
