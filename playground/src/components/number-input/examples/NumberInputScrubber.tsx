import { Frame } from "@flowstack-ui/brick";
import { Icon, NumberInput } from "@flowstack-ui/brick";
import { ArrowRightLeft } from "lucide-react";

export function NumberInputScrubber() {
  return (
    <Frame maxInlineSize={200}>
      <NumberInput.Root defaultValue={3}>
        <NumberInput.Group>
          <NumberInput.Element>
            <NumberInput.Scrubber>
              <Icon size="sm">
                <ArrowRightLeft aria-hidden="true" />
              </Icon>
            </NumberInput.Scrubber>
          </NumberInput.Element>
          <NumberInput.Input aria-label="Scrub quantity" />
          <NumberInput.Control />
        </NumberInput.Group>
      </NumberInput.Root>
    </Frame>
  );
}
