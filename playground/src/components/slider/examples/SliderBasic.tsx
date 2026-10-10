import { Slider } from "@flowstack-ui/brick";

export function SliderBasic() {
  return (
    <Slider.Root defaultValue={40}>
      <Slider.Label>Volume</Slider.Label>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb />
      </Slider.Control>
    </Slider.Root>
  );
}
