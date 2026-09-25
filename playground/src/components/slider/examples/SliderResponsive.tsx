import { Slider, VStack } from "@flowstack-ui/brick";

export function SliderResponsive() {
  return (
    <VStack gap="4">
      <Slider.Root
        defaultValue={55}
        frame="outline"
        size={{ initial: "sm", md: "lg" }}
        variant={{ initial: "outline", md: "soft" }}
      >
        <Slider.Label>Responsive mix</Slider.Label>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb />
        </Slider.Control>
      </Slider.Root>
      <Slider.Root defaultValue={35} frame="panel">
        <Slider.Label>Panel frame</Slider.Label>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb />
        </Slider.Control>
      </Slider.Root>
    </VStack>
  );
}
