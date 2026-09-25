import {
  Button,
  CloseButton,
  FloatingPanel,
  Icon,
  IconButton,
  Grid,
  For,
  VStack,
  Text,
  NumberInput,
} from "@flowstack-ui/brick";
import { GripHorizontal, Maximize2, Minimize2, Minus } from "lucide-react";

export function FloatingPanelKeyboard() {
  return (
    <FloatingPanel.Root>
      <FloatingPanel.Trigger asChild>
        <Button variant="outline">Keyboard and numeric controls</Button>
      </FloatingPanel.Trigger>
      <FloatingPanel.Portal>
        <FloatingPanel.Positioner>
          <FloatingPanel.Content>
            <FloatingPanel.Header>
              <FloatingPanel.DragTrigger>
                <Icon size="sm">
                  <GripHorizontal />
                </Icon>
                <FloatingPanel.Title>
                  Keyboard and numeric controls
                </FloatingPanel.Title>
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
                  <Grid.Root columns={2} gap="3">
                    <For each={["x", "y", "width", "height"] as const}>
                      {(key) => (
                        <VStack gap="1" key={key}>
                          <Text variant="body-sm">{key}</Text>
                          <NumberInput.Root
                            size="sm"
                            value={
                              key === "x" || key === "y"
                                ? panel.position[key]
                                : panel.size[key]
                            }
                            min={
                              key === "width" || key === "height"
                                ? 1
                                : undefined
                            }
                            onValueChange={(value) => {
                              if (value === null) return;
                              key === "x" || key === "y"
                                ? panel.setPosition({
                                    ...panel.position,
                                    [key]: value,
                                  })
                                : panel.setSize({
                                    ...panel.size,
                                    [key]: value,
                                  });
                            }}
                          >
                            <NumberInput.Input aria-label={key} />
                            <NumberInput.Increment
                              aria-label={`Increase ${key}`}
                            />
                            <NumberInput.Decrement
                              aria-label={`Decrease ${key}`}
                            />
                          </NumberInput.Root>
                        </VStack>
                      )}
                    </For>
                  </Grid.Root>
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
