import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  Button,
  Container,
  Grid,
  HStack,
  ImageContent,
  ImageFallback,
  ImageRoot,
  List,
  Surface,
  Text,
  VStack,
  type SurfaceElement,
  type SurfaceElevation,
  type SurfaceInset,
  type SurfaceLevel,
  type SurfaceRadius,
  type SurfaceScrimStrength,
} from "@flowstack-ui/brick";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./surface.playground.css";

const levels: SurfaceLevel[] = ["canvas", "base", "subtle", "raised"];
const elevations: SurfaceElevation[] = ["none", "low", "medium", "high"];
const radii: SurfaceRadius[] = ["none", "subtle", "surface"];
const insets: SurfaceInset[] = ["none", "sm", "md", "lg", "xl", "2xl"];
const scrimStrengths: SurfaceScrimStrength[] = ["soft", "medium", "strong"];
const hosts: SurfaceElement[] = [
  "div", "section", "article", "aside", "nav", "main", "header", "footer",
  "form",
];
const customStyle = {
  "--brick-surface-background": "var(--brick-color-accent-soft)",
  "--brick-surface-border-color": "var(--brick-color-accent-border)",
  "--brick-surface-radius": "0.25rem",
} as CSSProperties;

function Content({ children = "Release readiness" }: { children?: ReactNode }) {
  return (
    <VStack className="surface-content" gap="1">
      <Text as="h3" variant="title-sm">{children}</Text>
      <Text tone="secondary" variant="body-sm">
        Identical content keeps the painted dimension isolated.
      </Text>
    </VStack>
  );
}

function Cell({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <VStack className="surface-cell" gap="3">
      <SpecimenLabel>{label}</SpecimenLabel>
      {children}
    </VStack>
  );
}

function AppearanceLadder({ appearance }: { appearance: "light" | "dark" }) {
  return (
    <Surface
      bordered
      className="surface-appearance"
      data-brick-appearance={appearance}
      inset="md"
      level="canvas"
    >
      <SpecimenLabel>{appearance === "light" ? "Light" : "Dark"}</SpecimenLabel>
      <Grid.Root columns={2} gap="3">
        {levels.map((level) => (
          <Surface
            bordered
            data-testid={`surface-${appearance}-${level}`}
            inset="sm"
            key={level}
            level={level}
          >
            <Text variant="body-sm">{level}</Text>
          </Surface>
        ))}
      </Grid.Root>
    </Surface>
  );
}

export const surfaceScenarios = [
  {
    description:
      "Surface defaults to one neutral base div with surface radius, no border, no elevation, no inset, and no invented semantics.",
    id: "surface.overview", number: 1, title: "Overview",
  },
  {
    description:
      "Identical content isolates the canvas, base, subtle, and raised neutral levels plus the paired accent-subtle plane; no other recipe changes.",
    id: "surface.levels", number: 2, title: "Levels",
  },
  {
    description:
      "Border changes only the structural edge while level, elevation, radius, inset, and content remain at their defaults.",
    id: "surface.borders", number: 3, title: "Borders",
  },
  {
    description:
      "The semantic elevation scale changes only shadow depth on identical raised surfaces.",
    id: "surface.elevation", number: 4, title: "Elevation",
  },
  {
    description:
      "Radius changes only corner geometry from square through the default surface radius.",
    id: "surface.radius", number: 5, title: "Radius",
  },
  {
    description:
      "Inset changes only logical internal padding; child content and every paint recipe remain identical.",
    id: "surface.inset", number: 6, title: "Inset",
  },
  {
    description:
      "Every semantic host remains one element; Stack, Grid, and Container retain their independent layout responsibilities.",
    id: "surface.composition", number: 7, title: "Semantic hosts and composition",
  },
  {
    description:
      "Light and dark scopes preserve the same hierarchy; customization changes exactly the documented variables shown.",
    id: "surface.appearance", number: 8, title: "Appearance and customization",
  },
  {
    description:
      "Narrow, RTL, nested, focus, long-content, and forced-color evidence preserves content and meaningful boundaries.",
    id: "surface.stress", number: 9, title: "Responsive, nesting, and forced colors",
  },
  {
    description:
      "Optional Media, Scrim, and Content parts layer decorative authored media behind readable foreground content without changing ordinary Surface output.",
    id: "surface.media", number: 10, title: "Layered media",
  },
] as const satisfies readonly ScenarioDefinition[];

export function SurfacePage() {
  const semanticRef = useRef<HTMLElement>(null);
  const [host, setHost] = useState("Not inspected");

  return (
    <VStack className="surface-page" data-component-page="surface" gap="6">
      <Scenario {...surfaceScenarios[0]}>
        <div className="surface-stage">
          <Surface data-testid="surface-default">
            <Content />
          </Surface>
        </div>
      </Scenario>

      <Scenario {...surfaceScenarios[1]}>
        <VStack gap="4">
          <Grid.Root
            className="surface-grid surface-grid--four"
            columns={4}
            data-testid="surface-levels"
            gap="4"
          >
            {levels.map((level) => (
              <Cell key={level} label={level}>
                <Surface level={level}><Content /></Surface>
              </Cell>
            ))}
          </Grid.Root>
          <Surface
            data-testid="surface-accent-subtle"
            inset="sm"
            level="subtle"
            tone="accent"
          >
            <Content>Accent-subtle conversion plane</Content>
          </Surface>
        </VStack>
      </Scenario>

      <Scenario {...surfaceScenarios[2]}>
        <Grid.Root
          className="surface-grid surface-grid--two"
          columns={2}
          data-testid="surface-borders"
          gap="4"
        >
          <Cell label="default edge">
            <Surface><Content /></Surface>
          </Cell>
          <Cell label="bordered">
            <Surface bordered><Content /></Surface>
          </Cell>
        </Grid.Root>
      </Scenario>

      <Scenario {...surfaceScenarios[3]}>
        <Grid.Root
          className="surface-elevation-stage surface-grid surface-grid--four"
          columns={4}
          data-testid="surface-elevations"
          gap="5"
        >
          {elevations.map((elevation) => (
            <Cell key={elevation} label={elevation}>
              <Surface elevation={elevation} level="raised">
                <Content />
              </Surface>
            </Cell>
          ))}
        </Grid.Root>
      </Scenario>

      <Scenario {...surfaceScenarios[4]}>
        <Grid.Root
          className="surface-grid surface-grid--three"
          columns={3}
          data-testid="surface-radii"
          gap="4"
        >
          {radii.map((radius) => (
            <Cell key={radius} label={radius}>
              <Surface bordered radius={radius}><Content /></Surface>
            </Cell>
          ))}
        </Grid.Root>
      </Scenario>

      <Scenario {...surfaceScenarios[5]}>
        <VStack gap="4">
          <Grid.Root
            className="surface-grid surface-grid--three"
            columns={3}
            data-testid="surface-insets"
            gap="4"
          >
            {insets.map((inset) => (
              <Cell key={inset} label={inset}>
                <Surface bordered inset={inset}>
                  <div className="surface-inset-marker"><Content /></div>
                </Surface>
              </Cell>
            ))}
          </Grid.Root>
          <Surface
            bordered
            data-testid="surface-responsive-inset"
            inset={{ initial: "sm", md: "lg", xl: "2xl" }}
          >
            <div className="surface-inset-marker">
              <Content>Responsive page-panel inset</Content>
            </div>
          </Surface>
        </VStack>
      </Scenario>

      <Scenario {...surfaceScenarios[6]}>
        <VStack gap="4">
          <RenderedOutput label="Surface semantic output HTML">
            <Surface
              aria-label="Release readiness"
              as="section"
              bordered
              data-testid="surface-output"
              inset="sm"
              level="raised"
              ref={semanticRef}
            >
              <Text as="h3" variant="title-sm">Release readiness</Text>
            </Surface>
          </RenderedOutput>
          <Grid.Root
            className="surface-grid surface-grid--hosts"
            gap="3"
            minItemSize="sm"
          >
            {hosts.map((as) => (
              <Cell key={as} label={as}>
                <Surface as={as} bordered inset="sm">
                  <Text variant="body-sm">{as} host</Text>
                </Surface>
              </Cell>
            ))}
            <Cell label="li">
              <List.Root className="surface-host-list" marker="none">
                <List.Item asChild>
                  <Surface as="li" bordered inset="sm">
                    <Text variant="body-sm">li host</Text>
                  </Surface>
                </List.Item>
              </List.Root>
            </Cell>
          </Grid.Root>
          <Button onPress={() => setHost(semanticRef.current?.tagName ?? "Missing")} size="sm">
            Inspect ref
          </Button>
          <Text aria-live="polite" variant="body-sm">Ref host: {host}</Text>
          <Surface
            bordered
            data-testid="surface-composition"
            inset="lg"
            level="raised"
          >
            <Container gutter="none" measure="medium">
              <VStack gap="3">
                <Text as="h3" variant="title-sm">Measured release region</Text>
                <Grid.Root gap="3" minItemSize="sm">
                  <Surface inset="sm" level="subtle"><Text>Package</Text></Surface>
                  <Surface inset="sm" level="subtle"><Text>Browser</Text></Surface>
                  <Surface inset="sm" level="subtle"><Text>Consumer</Text></Surface>
                </Grid.Root>
              </VStack>
            </Container>
          </Surface>
        </VStack>
      </Scenario>

      <Scenario {...surfaceScenarios[7]}>
        <VStack gap="5">
          <Grid.Root
            className="surface-grid surface-grid--two"
            columns={2}
            data-testid="surface-appearance"
            gap="4"
          >
            <AppearanceLadder appearance="light" />
            <AppearanceLadder appearance="dark" />
          </Grid.Root>
          <EvidenceSurface
            className="playground-customization-evidence"
            data-testid="surface-customization"
            inset="none"
          >
            <Grid.Root className="playground-customization-layout" columns={2} gap="0">
            <VStack gap="2">
              <SpecimenLabel>Customized</SpecimenLabel>
              <Text as="h3" variant="title-sm">Surface CSS properties</Text>
              <Text tone="secondary" variant="body-sm">
                The code changes only background, border color, and radius.
              </Text>
              <PlaygroundCodeBlock tabIndex={0}>{`<Surface
  bordered
  inset="md"
  style={{
    "--brick-surface-background":
      "var(--brick-color-accent-soft)",
    "--brick-surface-border-color":
      "var(--brick-color-accent-border)",
    "--brick-surface-radius": "0.25rem",
  }}
>
  Customized surface
</Surface>`}</PlaygroundCodeBlock>
            </VStack>
            <div className="playground-customization-preview surface-customization__preview">
              <Surface bordered inset="md" style={customStyle}>
                <Content>Customized surface</Content>
              </Surface>
            </div>
            </Grid.Root>
          </EvidenceSurface>
        </VStack>
      </Scenario>

      <Scenario {...surfaceScenarios[8]}>
        <Grid.Root
          className="surface-grid surface-grid--stress"
          columns={2}
          data-testid="surface-stress"
          gap="4"
        >
          <Cell label="Narrow RTL">
            <div className="surface-phone-frame" dir="rtl">
              <Surface bordered inset="md" level="raised">
                <VStack gap="3">
                  <Text>محتوى طويل داخل سطح يحافظ على الحواف المنطقية.</Text>
                  <Button size="sm">تابع</Button>
                </VStack>
              </Surface>
            </div>
          </Cell>
          <Cell label="Nested hierarchy">
            <Surface bordered inset="md" level="base">
              <VStack gap="3">
                <Text>Base parent</Text>
                <Surface elevation="low" inset="sm" level="raised">
                  <HStack gap="2" wrap>
                    <Text>Raised child</Text>
                    <Button size="sm" tone="neutral" variant="outline">
                      Focus boundary
                    </Button>
                  </HStack>
                </Surface>
              </VStack>
            </Surface>
          </Cell>
        </Grid.Root>
      </Scenario>

      <Scenario {...surfaceScenarios[9]}>
        <Grid.Root
          className="surface-scrim-grid"
          columns={3}
          data-testid="surface-scrim-comparison"
          gap="3"
        >
          {scrimStrengths.map((strength) => (
            <VStack gap="2" key={strength}>
              <SpecimenLabel>
                {strength[0].toUpperCase() + strength.slice(1)}
              </SpecimenLabel>
              <Surface
                className="surface-scrim-comparison"
                radius="surface"
              >
                <Surface.Media>
                  <ImageRoot
                    fill
                    fit="cover"
                    position="center"
                    src="/assets/image/workspace-landscape.png"
                  >
                    <ImageContent alt="" height={675} width={1200} />
                    <ImageFallback>Background unavailable</ImageFallback>
                  </ImageRoot>
                </Surface.Media>
                <Surface.Scrim
                  data-testid={`surface-scrim-${strength}`}
                  direction="inline-start"
                  strength={strength}
                />
              </Surface>
            </VStack>
          ))}
        </Grid.Root>

        <Surface
          className="surface-layered"
          data-testid="surface-layered"
          radius="surface"
          style={{
            "--brick-surface-foreground": "var(--brick-color-accent-on-solid)",
          } as CSSProperties}
        >
          <Surface.Media data-testid="surface-layered-media">
            <ImageRoot
              fill
              fit="cover"
              position="center"
              src="/assets/image/workspace-landscape.png"
            >
              <ImageContent alt="" height={675} width={1200} />
              <ImageFallback>Background unavailable</ImageFallback>
            </ImageRoot>
          </Surface.Media>
          <Surface.Scrim
            data-testid="surface-layered-scrim"
            direction="inline-start"
            strength="strong"
          />
          <Surface.Content data-testid="surface-layered-content">
            <VStack className="surface-layered__copy" gap="3" justify="center">
              <Text as="h3" tone="inherit" variant="title-lg">
                Media stays behind the message.
              </Text>
              <Text tone="inherit" variant="body-md">
                Surface owns the visual layers. Image keeps its loading and
                fitting contract. The application still owns the content.
              </Text>
              <Button size="sm">Review the composition</Button>
            </VStack>
          </Surface.Content>
        </Surface>
      </Scenario>
    </VStack>
  );
}
