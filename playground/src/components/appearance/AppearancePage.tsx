import {
  AppBar,
  Appearance,
  Button,
  Drawer,
  Grid,
  HStack,
  Surface,
  Text,
  VStack,
} from "@flowstack-ui/brick";
import { useState } from "react";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./appearance.playground.css";

export const appearanceScenarios = [
  {
    id: "appearance.overview",
    number: 1,
    title: "Overview",
    description:
      "Light and dark apply one complete semantic-token contract to ordinary Brick descendants.",
  },
  {
    id: "appearance.nesting",
    number: 2,
    title: "Nested re-entry",
    description:
      "Light to dark to light and dark to light to dark restore every explicit boundary independently.",
  },
  {
    id: "appearance.composition",
    number: 3,
    title: "Wrapper-free composition",
    description:
      "Appearance places the boundary on one existing App Bar or Surface host without changing its anatomy.",
  },
  {
    id: "appearance.portal",
    number: 4,
    title: "Explicit portal scope",
    description:
      "Portalled Overlay and Content receive the intended appearance without changing Atom portal behavior.",
  },
  {
    id: "appearance.stress",
    number: 5,
    title: "Controls, focus, and reflow",
    description:
      "Actions and native fields inherit the nearest scope through narrow layout, zoom, keyboard focus, and direction changes.",
  },
] as const satisfies readonly ScenarioDefinition[];

function AppearancePanel({
  appearance,
  testId,
}: {
  appearance: "light" | "dark";
  testId: string;
}) {
  return (
    <Appearance value={appearance}>
      <Surface bordered data-testid={testId} inset="md" level="raised">
        <VStack gap="3">
          <SpecimenLabel>{appearance}</SpecimenLabel>
          <Text as="h3" variant="title-sm">
            Release workspace
          </Text>
          <Text tone="secondary" variant="body-sm">
            Surface, text, borders, and actions inherit one semantic scope.
          </Text>
          <HStack gap="2" wrap>
            <Button size="sm">Continue</Button>
            <Button size="sm" variant="outline">
              Review
            </Button>
          </HStack>
        </VStack>
      </Surface>
    </Appearance>
  );
}

function ScopedPortalPanel() {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  return (
    <Appearance value="dark">
      <Surface
        bordered
        data-testid="appearance-scoped-container"
        inset="md"
        level="base"
        ref={setContainer}
      >
        {container ? (
          <Drawer.Root>
            <Drawer.Trigger asChild>
              <Button>Open scoped container</Button>
            </Drawer.Trigger>
            <Drawer.Portal container={container}>
              <Drawer.Overlay />
              <Drawer.Content
                data-testid="appearance-scoped-container-content"
                size="sm"
              >
                <Drawer.Header>
                  <Drawer.Title>Contained release review</Drawer.Title>
                  <Drawer.Description>
                    The portal remains inside the authored dark scope.
                  </Drawer.Description>
                </Drawer.Header>
                <Drawer.Footer>
                  <Drawer.Close asChild>
                    <Button variant="outline">Close contained review</Button>
                  </Drawer.Close>
                </Drawer.Footer>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        ) : null}
      </Surface>
    </Appearance>
  );
}

export function AppearancePage() {
  return (
    <VStack className="appearance-page" data-component-page="appearance" gap="6">
      <Scenario {...appearanceScenarios[0]}>
        <Grid.Root data-testid="appearance-overview" gap="4" minItemSize="sm">
          <AppearancePanel appearance="light" testId="appearance-light" />
          <AppearancePanel appearance="dark" testId="appearance-dark" />
        </Grid.Root>
      </Scenario>

      <Scenario {...appearanceScenarios[1]}>
        <Grid.Root data-testid="appearance-nesting" gap="4" minItemSize="sm">
          <Appearance value="light">
            <Surface bordered data-testid="appearance-light-outer" inset="md">
              <VStack gap="3">
                <SpecimenLabel>light outer</SpecimenLabel>
                <Appearance value="dark">
                  <Surface bordered data-testid="appearance-dark-middle" inset="md">
                    <VStack gap="3">
                      <Text variant="body-sm">Dark middle</Text>
                      <Appearance value="light">
                        <Surface bordered data-testid="appearance-light-inner" inset="sm">
                          <Text variant="body-sm">Light inner</Text>
                        </Surface>
                      </Appearance>
                    </VStack>
                  </Surface>
                </Appearance>
              </VStack>
            </Surface>
          </Appearance>

          <Appearance value="dark">
            <Surface bordered data-testid="appearance-dark-outer" inset="md">
              <VStack gap="3">
                <SpecimenLabel>dark outer</SpecimenLabel>
                <Appearance value="light">
                  <Surface bordered data-testid="appearance-light-middle" inset="md">
                    <VStack gap="3">
                      <Text variant="body-sm">Light middle</Text>
                      <Appearance value="dark">
                        <Surface bordered data-testid="appearance-dark-inner" inset="sm">
                          <Text variant="body-sm">Dark inner</Text>
                        </Surface>
                      </Appearance>
                    </VStack>
                  </Surface>
                </Appearance>
              </VStack>
            </Surface>
          </Appearance>
        </Grid.Root>
      </Scenario>

      <Scenario {...appearanceScenarios[2]}>
        <Appearance value="dark">
          <AppBar.Root aria-label="Appearance composition" data-testid="appearance-app-bar">
            <AppBar.Toolbar>
              <AppBar.Start>
                <Text weight="semibold">Scoped App Bar</Text>
              </AppBar.Start>
              <AppBar.End>
                <Button size="sm">Action</Button>
              </AppBar.End>
            </AppBar.Toolbar>
          </AppBar.Root>
        </Appearance>
      </Scenario>

      <Scenario {...appearanceScenarios[3]}>
        <Grid.Root gap="4" minItemSize="sm">
          <Surface bordered inset="md">
            <Drawer.Root>
              <Drawer.Trigger asChild>
                <Button>Open dark portal</Button>
              </Drawer.Trigger>
              <Drawer.Portal>
                <Appearance value="dark">
                  <Drawer.Overlay data-testid="appearance-drawer-overlay" />
                </Appearance>
                <Appearance value="dark">
                  <Drawer.Content data-testid="appearance-drawer-content" size="sm">
                    <Drawer.Header>
                      <Drawer.Title>Scoped release review</Drawer.Title>
                      <Drawer.Description>
                        The portalled surface receives an explicit dark boundary.
                      </Drawer.Description>
                    </Drawer.Header>
                    <Drawer.Body>
                      <Text>Portal behavior remains owned by Atom.</Text>
                    </Drawer.Body>
                    <Drawer.Footer>
                      <Drawer.Close asChild>
                        <Button variant="outline">Close review</Button>
                      </Drawer.Close>
                    </Drawer.Footer>
                  </Drawer.Content>
                </Appearance>
              </Drawer.Portal>
            </Drawer.Root>
          </Surface>
          <ScopedPortalPanel />
        </Grid.Root>
      </Scenario>

      <Scenario {...appearanceScenarios[4]}>
        <Grid.Root className="appearance-stress" gap="4" minItemSize="sm">
          <AppearancePanel appearance="light" testId="appearance-stress-light" />
          <div dir="rtl">
            <AppearancePanel appearance="dark" testId="appearance-stress-dark" />
          </div>
        </Grid.Root>
      </Scenario>
    </VStack>
  );
}
