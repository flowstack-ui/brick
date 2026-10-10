import { Slider, VStack } from "@flowstack-ui/brick";

export function SliderSizes() {
  return (
    <VStack gap="4">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Slider.Root defaultValue={40} key={size} size={size}>
          <Slider.Label>{size.toUpperCase()} volume</Slider.Label>
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
