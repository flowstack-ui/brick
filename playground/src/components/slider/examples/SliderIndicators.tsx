import { Icon, Slider, VStack } from "@flowstack-ui/brick";
import { ChevronsLeftRight } from "lucide-react";

export function SliderIndicators() {
  return (
    <VStack gap="5">
      <Slider.Root defaultValue={45}>
        <Slider.Label>Drag output</Slider.Label>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb />
          <Slider.DraggingIndicator>
            {({ value }) => `${value}%`}
          </Slider.DraggingIndicator>
        </Slider.Control>
      </Slider.Root>
      <Slider.Root aria-label="Pan" defaultValue={60} size="lg">
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb>
            <Icon size="inherit" tone="inherit">
              <ChevronsLeftRight aria-hidden="true" />
            </Icon>
          </Slider.Thumb>
        </Slider.Control>
      </Slider.Root>
    </VStack>
  );
}
