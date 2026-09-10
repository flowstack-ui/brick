import { AspectRatio, Button, Center, Frame, Surface, Text, VStack } from "@flowstack-ui/brick";
import { Scenario } from "../../shared/Scenario.js";

export const aspectRatioResponsiveScenario = {
  id: "aspect-ratio.responsive-contract", number: 12, title: "Responsive contract",
  description: "All breakpoints, sparse defaults, nested independence, and the natural-flow opt-out.",
} as const;

export function AspectRatioQualification() {
  return <Scenario {...aspectRatioResponsiveScenario}>
    <Frame maxInlineSize={300}>
      <VStack gap="4">
        <AspectRatio.Root data-testid="ratio-breakpoints" ratio={{ initial: 1, sm: 4 / 3, md: 16 / 9, lg: 2, xl: 3 }} variant="subtle">
          <Center><Text>Every breakpoint</Text></Center>
        </AspectRatio.Root>
        <AspectRatio.Root data-testid="ratio-sparse" ratio={{ lg: 1 }} variant="subtle">
          <Center><Frame inlineSize={80}>
            <AspectRatio.Root data-testid="ratio-nested" ratio={{ md: 2 }} variant="outline" />
          </Frame></Center>
        </AspectRatio.Root>
        <AspectRatio.Root data-testid="ratio-flow" ratio={1} contentLayout="flow" variant="subtle">
          <Text>Natural flow</Text>
        </AspectRatio.Root>
      </VStack>
    </Frame>
    <VStack data-testid="same-host-trial" gap={4}>
      <Frame asChild inlineSize={{ initial: 120, md: 180 }}>
        <AspectRatio.Root data-testid="same-host-ratio" ratio={2} variant="subtle"><Center><Text>Ratio</Text></Center></AspectRatio.Root>
      </Frame>
      <Frame asChild inlineSize={{ initial: 120, md: 180 }}>
        <Surface data-testid="same-host-surface" inset="sm"><Text>Surface</Text></Surface>
      </Frame>
      <Frame asChild inlineSize={{ initial: 120, md: 180 }}>
        <Button data-testid="same-host-button">Action</Button>
      </Frame>
    </VStack>
  </Scenario>;
}
