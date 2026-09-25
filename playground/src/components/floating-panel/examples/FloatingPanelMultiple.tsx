import {
  Button,
  CloseButton,
  FloatingPanel,
  Icon,
  IconButton,
  Paragraph,
  For,
  HStack,
} from "@flowstack-ui/brick";
import { GripHorizontal, Maximize2, Minimize2, Minus } from "lucide-react";
export function FloatingPanelMultiple() {
  return (
    <HStack gap="3" wrap>
      <For each={["Inspector", "Layers", "History"]}>
        {(title) => (
          <FloatingPanel.Root key={title}>
            <FloatingPanel.Trigger asChild>
              <Button variant="outline">{title}</Button>
            </FloatingPanel.Trigger>
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
                      Click this panel to bring it to the front.
                    </Paragraph>
                  </FloatingPanel.Body>
                  <FloatingPanel.ResizeTriggers />
                </FloatingPanel.Content>
              </FloatingPanel.Positioner>
            </FloatingPanel.Portal>
          </FloatingPanel.Root>
        )}
      </For>
    </HStack>
  );
}
