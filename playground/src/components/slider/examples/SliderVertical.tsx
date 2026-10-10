import { HStack, Slider } from "@flowstack-ui/brick";

export function SliderVertical() {
  return (
    <HStack gap="12" justify="center" style={{ blockSize: "16rem" }}>
      <Slider.Root defaultValue={40} orientation="vertical">
        <Slider.Label>Level</Slider.Label>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Marks marks={[0, 50, 100]} />
          <Slider.Thumb />
        </Slider.Control>
      </Slider.Root>
      <Slider.Root defaultValue={65} dir="rtl" orientation="vertical">
        <Slider.Label>RTL level</Slider.Label>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb />
        </Slider.Control>
      </Slider.Root>
    </HStack>
  );
}
