import { Slider, VStack } from "@flowstack-ui/brick";

export function SliderTones() {
  return (
    <VStack gap="4">
      {(["neutral", "accent", "contrast"] as const).map((tone) => (
        <Slider.Root defaultValue={55} key={tone} tone={tone}>
          <Slider.Label>{tone}</Slider.Label>
          <Slider.Control>
            <Slider.Track>
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumb />
          </Slider.Control>
        </Slider.Root>
      ))}
    </VStack>
  );
}
