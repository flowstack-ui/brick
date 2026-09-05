import {
  Center,
  Circle,
  Frame,
  Grid,
  HStack,
  Icon,
  Square,
  Surface,
  Text,
  VStack,
} from "../../../../src/index.js";
import { Scenario } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";

export const centerScenarios = [
  {
    id: "center.identities",
    number: 1,
    title: "Center, Square, and Circle",
    description: "Three public intents keep alignment, geometry, and paint ownership distinct.",
  },
  {
    id: "center.composition",
    number: 2,
    title: "Surface and Icon composition",
    description: "A painted icon well remains one exact square host with independently sized content.",
  },
  {
    id: "center.responsive",
    number: 3,
    title: "Responsive and flex pressure",
    description: "Equal geometry carries forward at breakpoints and never collapses beside long content.",
  },
  {
    id: "center.stress",
    number: 4,
    title: "Inline, RTL, and zoom",
    description: "Logical geometry remains stable without adding semantics or changing source order.",
  },
] as const;

function FeatureIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M6 12h12M12 6v12" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

export function CenterPage() {
  return (
    <VStack data-component-page="center" gap="6">
      <Scenario {...centerScenarios[0]}>
        <Grid.Root columns={{ initial: 1, md: 3 }} gap="4" data-testid="center-identities">
          <Specimen label="Center">
            <Frame blockSize="8rem">
              <Surface asChild inset="sm">
                <Center data-testid="center-default">
                  <Text weight="semibold">Centered</Text>
                </Center>
              </Surface>
            </Frame>
          </Specimen>
          <Specimen label="Square">
            <Surface asChild level="subtle" radius="subtle" tone="accent">
              <Square data-testid="square-default" size="3rem">
                <Text weight="semibold">S</Text>
              </Square>
            </Surface>
          </Specimen>
          <Specimen label="Circle">
            <Surface asChild level="subtle" tone="accent">
              <Circle data-testid="circle-default" size="3rem">
                <Text weight="semibold">C</Text>
              </Circle>
            </Surface>
          </Specimen>
        </Grid.Root>
      </Scenario>

      <Scenario {...centerScenarios[1]}>
        <HStack data-testid="center-icon-wells" gap="4">
          <Surface asChild level="subtle" radius="subtle" tone="accent">
            <Square data-testid="square-icon-well" size="2rem">
              <Icon aria-hidden size="xs" tone="accent"><FeatureIcon /></Icon>
            </Square>
          </Surface>
          <Surface asChild level="subtle" tone="accent">
            <Circle data-testid="circle-icon-well" size="2rem">
              <Icon aria-hidden size="xs" tone="accent"><FeatureIcon /></Icon>
            </Circle>
          </Surface>
        </HStack>
      </Scenario>

      <Scenario {...centerScenarios[2]}>
        <VStack gap="4">
          <Square
            data-testid="square-responsive"
            size={{ initial: "2rem", md: "2.5rem", xl: "3rem" }}
          >
            <Text>R</Text>
          </Square>
          <Frame maxInlineSize="14rem">
            <HStack data-testid="center-flex-pressure" gap="3">
              <Surface asChild level="subtle" radius="subtle" tone="accent">
                <Square data-testid="square-flex-fixed" size="2rem">
                  <Icon aria-hidden size="xs" tone="accent"><FeatureIcon /></Icon>
                </Square>
              </Surface>
              <Text>Long adjacent content must never squeeze the icon well into a rectangle.</Text>
            </HStack>
          </Frame>
        </VStack>
      </Scenario>

      <Scenario {...centerScenarios[3]}>
        <VStack gap="4">
          <Text>
            Before <Circle as="span" data-testid="circle-inline" inline size="1.5rem">•</Circle> after
          </Text>
          <HStack data-testid="center-rtl" dir="rtl" gap="3">
            <Square size="2rem"><Text>أ</Text></Square>
            <Text>المحتوى يحافظ على الترتيب المنطقي.</Text>
          </HStack>
        </VStack>
      </Scenario>
    </VStack>
  );
}
