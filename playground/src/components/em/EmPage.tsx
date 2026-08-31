import type { CSSProperties } from "react";
import { Em, Grid, Heading, Text, VStack } from "@flowstack-ui/brick";
import { CustomizationEvidence } from "../../shared/CustomizationEvidence.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";

export const emScenarios = [
  {
    id: "em.overview",
    number: 1,
    title: "Overview",
    description:
      "Native stress emphasis stays inside a complete sentence and inherits its surrounding visual recipe.",
  },
  {
    id: "em.context",
    number: 2,
    title: "Typography contexts",
    navigationTitle: "Contexts",
    description:
      "The same Em owner inherits body, heading, muted, and RTL contexts without introducing its own type scale.",
  },
  {
    id: "em.native",
    number: 3,
    title: "Native output and stress",
    navigationTitle: "Native",
    description:
      "Native attributes, public hooks, selection, and copy remain on the single em host.",
  },
] as const satisfies readonly ScenarioDefinition[];

export function EmPage() {
  return (
    <VStack data-component-page="em" gap="6">
      <Scenario {...emScenarios[0]}>
        <Specimen data-testid="em-overview" inset="lg" label="body emphasis">
          <Text as="p">
            Review the migration <Em>before</Em> publishing.
          </Text>
        </Specimen>
      </Scenario>
      <Scenario {...emScenarios[1]}>
        <VStack data-testid="em-context" gap="4">
          <Specimen label="body">
            <Text as="p">
              This is <Em>especially</Em> important.
            </Text>
          </Specimen>
          <Specimen label="heading">
            <Heading level={3} variant="title-md">
              Read this <Em>first</Em>
            </Heading>
          </Specimen>
          <Specimen label="secondary tone">
            <Text as="p" tone="secondary">
              Keep the <Em>exact</Em> released version.
            </Text>
          </Specimen>
          <Specimen dir="rtl" label="RTL">
            <Text as="p" lang="ar">
              راجع هذا <Em>قبل</Em> النشر.
            </Text>
          </Specimen>
        </VStack>
      </Scenario>
      <Scenario {...emScenarios[2]}>
        <VStack gap="5">
          <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
            <Specimen data-brick-appearance="light" label="light">
              <Text>
                Read this <Em>carefully</Em>.
              </Text>
            </Specimen>
            <Specimen data-brick-appearance="dark" label="dark">
              <Text>
                Read this <Em>carefully</Em>.
              </Text>
            </Specimen>
          </Grid.Root>
          <Specimen
            data-testid="em-native"
            inset="lg"
            label="native em host + public hooks"
          >
            <Text as="p">
              Select{" "}
              <Em
                aria-label="native emphasis"
                className="consumer-em"
                data-owner="playground"
                slot="stress"
              >
                this emphasized phrase
              </Em>{" "}
              and copy it.
            </Text>
          </Specimen>
          <CustomizationEvidence
            code={`--brick-em-font-style: oblique 12deg;`}
            description="The live Em changes only its documented emphasis style."
            title="Em CSS property"
          >
            <Text>
              Review{" "}
              <Em
                style={
                  { "--brick-em-font-style": "oblique 12deg" } as CSSProperties
                }
              >
                before publishing
              </Em>
              .
            </Text>
          </CustomizationEvidence>
        </VStack>
      </Scenario>
    </VStack>
  );
}
