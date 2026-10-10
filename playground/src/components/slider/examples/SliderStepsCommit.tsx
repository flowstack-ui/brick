import { Slider, Text, VStack } from "@flowstack-ui/brick";
import { useState } from "react";

export function SliderStepsCommit() {
  const [live, setLive] = useState(1.5);
  const [committed, setCommitted] = useState(1.5);
  return (
    <VStack align="stretch" gap="3">
      <Slider.Root
        defaultValue={1.5}
        largeStep={1}
        max={3}
        min={0}
        onValueChange={(value) =>
          setLive(Number(Array.isArray(value) ? value[0] : value))
        }
        onValueCommit={(value) =>
          setCommitted(Number(Array.isArray(value) ? value[0] : value))
        }
        step={0.25}
      >
        <Slider.Label>Playback speed</Slider.Label>
        <Slider.ValueText>{({ values }) => `${values[0]}×`}</Slider.ValueText>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb />
        </Slider.Control>
      </Slider.Root>
      <Text tone="secondary">
        Live {live}× · committed {committed}×
      </Text>
    </VStack>
  );
}
