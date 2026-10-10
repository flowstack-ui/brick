import { Container, Heading, HStack, Link, Paragraph, ScrollArea, Stack, VStack } from "@flowstack-ui/brick";
import type { PlaygroundEntry } from "../app/component-registry.js";
import { scenarioDomId, type ScenarioDefinition } from "../shared/Scenario.js";
import { PlaygroundResourceLinks } from "./PlaygroundResourceLinks.js";
import { PlaygroundAiTip } from "./PlaygroundAiTip.js";
import { docsRoutes } from "../app/docs-routes.js";

export function PlaygroundPageHeader({ entry, scenarios }: {
  entry: PlaygroundEntry;
  scenarios: readonly ScenarioDefinition[];
}) {
  const pageTitle = entry.title;
  return (
    <div className="evidence-review-header">
      <Stack
        className="evidence-page-header"
        direction={{ initial: "column", md: "row" }}
        gap="6"
        justify="between"
      >
        <Stack.Item flex={{ initial: "content", md: 1 }}>
          <VStack className="evidence-page-heading" gap="4">
            <Heading level={1} variant="title-xl">
              {pageTitle}
            </Heading>
            <Paragraph tone="secondary">
              {entry.description}
            </Paragraph>
            {entry.kind !== "composition" && <PlaygroundResourceLinks componentId={entry.id} />}
            <PlaygroundAiTip />
          </VStack>
        </Stack.Item>
      </Stack>

      {!docsRoutes[entry.id] && <Container
        aria-label={`${pageTitle} scenarios`}
        as="nav"
        className="scenario-nav"
        gutter="none"
        measure="wide"
      >
        <ScrollArea.Root
          className="scenario-nav-scroll"
          orientation="horizontal"
          scrollbarVisibility="interaction"
        >
          <ScrollArea.Viewport>
            <HStack as="ol" gap="1">
              {scenarios.map((scenario) => (
                <li key={scenario.id}>
                  <Link asChild tone="inherit" variant="plain">
                    <a href={`#${scenarioDomId(scenario.id)}`}>
                      <span>
                        {String(scenario.number).padStart(2, "0")}
                      </span>
                      {scenario.navigationTitle ?? scenario.title}
                    </a>
                  </Link>
                </li>
              ))}
            </HStack>
          </ScrollArea.Viewport>
        </ScrollArea.Root>
      </Container>}
    </div>
  );
}
