import { Slider, VStack } from "@flowstack-ui/brick";

export function SliderMarks() {
  return (
    <VStack gap="5">
      <Slider.Root aria-label="Simple marks" defaultValue={50}>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Marks marks={[0, { value: 50, label: "Mid" }, 100]} />
          <Slider.Thumb />
        </Slider.Control>
      </Slider.Root>
      <Slider.Root aria-label="Custom marks" defaultValue={25}>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.MarkerGroup>
            <Slider.Marker value={25}>
              <Slider.MarkerIndicator style={{ borderRadius: 0 }} />
              <Slider.MarkerLabel>Quarter</Slider.MarkerLabel>
            </Slider.Marker>
          </Slider.MarkerGroup>
          <Slider.Thumb />
        </Slider.Control>
      </Slider.Root>
    </VStack>
  );
}
