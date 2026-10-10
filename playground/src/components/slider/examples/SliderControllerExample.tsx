import {
  Button,
  HStack,
  Slider,
  Text,
  VStack,
  useSlider,
} from "@flowstack-ui/brick";

export function SliderControllerExample() {
  const slider = useSlider({ defaultValue: 35 });
  return (
    <VStack align="stretch" gap="3">
      <Slider.RootProvider value={slider}>
        <Slider.Label>Mix</Slider.Label>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb />
        </Slider.Control>
      </Slider.RootProvider>
      <HStack gap="2">
        <Button onClick={() => slider.setValue(65)} size="sm">
          Set 65
        </Button>
        <Button
          onClick={() => slider.setValue(35)}
          size="sm"
          tone="neutral"
          variant="outline"
        >
          Reset
        </Button>
      </HStack>
      <Text tone="secondary">Controller value: {slider.values[0]}</Text>
    </VStack>
  );
}
