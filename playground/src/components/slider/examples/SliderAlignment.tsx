import { Slider, VStack } from "@flowstack-ui/brick";

export function SliderAlignment() {
  return (
    <VStack gap="4" style={{ paddingInline: "var(--brick-space-4)" }}>
      {(["contain", "center"] as const).map((thumbAlignment) => (
        <Slider.Root
          defaultValue={thumbAlignment === "contain" ? 0 : 100}
          key={thumbAlignment}
          thumbAlignment={thumbAlignment}
        >
          <Slider.Label>{thumbAlignment} alignment</Slider.Label>
          <Slider.Control>
            <Slider.Track>
              <Slider.Range />
            </Slider.Track>
            <Slider.Marks marks={[0, 100]} />
            <Slider.Thumb />
          </Slider.Control>
        </Slider.Root>
      ))}
    </VStack>
  );
}
