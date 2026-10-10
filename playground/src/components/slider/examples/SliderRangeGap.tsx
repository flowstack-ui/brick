import { Slider } from "@flowstack-ui/brick";

export function SliderRangeGap() {
  return (
    <Slider.Root defaultValue={[25, 75]} minStepsBetweenThumbs={10}>
      <Slider.Label>Price range</Slider.Label>
      <Slider.ValueText>
        {({ values }) => `$${values[0]}–$${values[1]}`}
      </Slider.ValueText>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb aria-label="Minimum price" index={0} />
        <Slider.Thumb aria-label="Maximum price" index={1} />
      </Slider.Control>
    </Slider.Root>
  );
}
