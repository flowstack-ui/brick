import { Slider } from "@flowstack-ui/brick";

export function SliderLabelValue() {
  return (
    <Slider.Root
      ariaValueText={(value) => `${value} degrees Celsius`}
      defaultValue={22}
      max={40}
      min={-10}
    >
      <Slider.Label>Temperature</Slider.Label>
      <Slider.ValueText>{({ values }) => `${values[0]} °C`}</Slider.ValueText>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb />
      </Slider.Control>
    </Slider.Root>
  );
}
