import { Button, HStack, Slider, VStack } from "@flowstack-ui/brick";
import { useState } from "react";
import type { SliderCollisionBehavior } from "@flowstack-ui/brick";

export function SliderCollisions() {
  const [mode, setMode] = useState<SliderCollisionBehavior>("none");
  return (
    <VStack align="stretch" gap="4">
      <HStack gap="2">
        {(["none", "push", "swap"] as const).map((next) => (
          <Button
            aria-pressed={mode === next}
            key={next}
            onClick={() => setMode(next)}
            size="sm"
            tone="neutral"
            variant={mode === next ? "solid" : "outline"}
          >
            {next}
          </Button>
        ))}
      </HStack>
      <Slider.Root
        defaultValue={[25, 50, 75]}
        key={mode}
        minStepsBetweenThumbs={10}
        thumbCollisionBehavior={mode}
      >
        <Slider.Label>{mode} collision</Slider.Label>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb aria-label="Low stop" index={0} />
          <Slider.Thumb aria-label="Middle stop" index={1} />
          <Slider.Thumb aria-label="High stop" index={2} />
        </Slider.Control>
      </Slider.Root>
    </VStack>
  );
}
