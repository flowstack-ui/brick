import { Slider, VStack } from "@flowstack-ui/brick";

export function SliderVariants() {
  return (
    <VStack gap="4">
      {(["outline", "solid", "soft"] as const).map((variant) => (
        <Slider.Root defaultValue={55} key={variant} variant={variant}>
          <Slider.Label>{variant}</Slider.Label>
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
