import { Slider, VStack } from "@flowstack-ui/brick";

export function SliderOrigins() {
  return (
    <VStack gap="4">
      {(["start", "center", "end"] as const).map((origin) => (
        <Slider.Root
          defaultValue={25}
          key={origin}
          max={100}
          min={-100}
          origin={origin}
        >
          <Slider.Label>{origin} origin</Slider.Label>
          <Slider.ValueText />
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
