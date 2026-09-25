import { useState } from "react";
import {
  Button,
  CloseButton,
  FloatingPanel,
  Icon,
  IconButton,
  Paragraph,
  createOverlay,
  type OverlayLifecycleProps,
} from "@flowstack-ui/brick";
import { GripHorizontal, Maximize2, Minimize2, Minus } from "lucide-react";
export function FloatingPanelOverlay() {
  const [manager] = useState(() =>
    createOverlay<{ title: string }>(function ManagedPanel({
      title,
      open,
      onOpenChange,
      onExitComplete,
    }: { title: string } & OverlayLifecycleProps) {
      return (
        <FloatingPanel.Root
          open={open}
          onOpenChange={onOpenChange}
          onExitComplete={onExitComplete}
        >
          <FloatingPanel.Portal>
            <FloatingPanel.Positioner>
              <FloatingPanel.Content>
                <FloatingPanel.Header>
                  <FloatingPanel.DragTrigger>
                    <Icon size="sm">
                      <GripHorizontal />
                    </Icon>
                    <FloatingPanel.Title>{title}</FloatingPanel.Title>
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
                    The manager owns instance lifetime; FloatingPanel owns
                    geometry and focus.
                  </Paragraph>
                </FloatingPanel.Body>
                <FloatingPanel.ResizeTriggers />
              </FloatingPanel.Content>
            </FloatingPanel.Positioner>
          </FloatingPanel.Portal>
        </FloatingPanel.Root>
      );
    }),
  );
  return (
    <>
      <Button
        variant="outline"
        onPress={() => {
          void manager.open("inspector", { title: "Managed inspector" });
        }}
      >
        Open managed panel
      </Button>
      <manager.Viewport />
    </>
  );
}
