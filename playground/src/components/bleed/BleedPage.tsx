import {
  Bleed,
  Frame,
  Grid,
  Heading,
  Paragraph,
  Surface,
  VStack,
} from "../../../../src/index.js";
import { Scenario } from "../../shared/Scenario.js";

export const bleedScenarios = [
  {
    id: "bleed.edge-media",
    number: 1,
    title: "Edge media",
    description: "A painted parent keeps its inset while selected media crosses it.",
  },
  {
    id: "bleed.responsive",
    number: 2,
    title: "Responsive logical edges",
    description: "Axis and edge values follow Brick's mobile-first spacing grammar.",
  },
  {
    id: "bleed.composition",
    number: 3,
    title: "One-host composition",
    description: "asChild preserves the authored semantic host and its content.",
  },
];

export function BleedPage() {
  return (
    <VStack data-component-page="bleed" gap="6">
      <Scenario {...bleedScenarios[0]}>
        <Grid.Root columns={{ initial: 1, md: 2 }} gap="6">
          <Surface data-testid="bleed-inline-owner" inset="lg">
            <VStack gap="4">
              <Heading level={2} variant="title-md">Inline edge media</Heading>
              <Paragraph tone="secondary">The copy follows the Surface inset.</Paragraph>
              <Bleed data-testid="bleed-inline" inline={6}>
                <Frame blockSize="10rem" asChild>
                  <Surface tone="accent" radius="none" />
                </Frame>
              </Bleed>
            </VStack>
          </Surface>
          <Surface data-testid="bleed-block-owner" inset="lg">
            <VStack gap="4">
              <Heading level={2} variant="title-md">Block edge media</Heading>
              <Bleed data-testid="bleed-block" blockEnd={6}>
                <Frame blockSize="10rem" asChild>
                  <Surface tone="accent" radius="none" />
                </Frame>
              </Bleed>
            </VStack>
          </Surface>
        </Grid.Root>
      </Scenario>

      <Scenario {...bleedScenarios[1]}>
        <Surface inset="lg">
          <Bleed
            data-testid="bleed-responsive"
            inline={{ initial: 2, md: 6 }}
            blockStart={{ initial: 2, lg: 8 }}
          >
            <Frame blockSize="8rem" asChild>
              <Surface tone="accent" radius="none" />
            </Frame>
          </Bleed>
        </Surface>
      </Scenario>

      <Scenario {...bleedScenarios[2]}>
        <Surface inset="lg">
          <Bleed asChild inline={6}>
            <figure data-testid="bleed-composed">
              <Frame blockSize="8rem" asChild>
                <Surface tone="accent" radius="none" />
              </Frame>
            </figure>
          </Bleed>
        </Surface>
      </Scenario>
    </VStack>
  );
}
