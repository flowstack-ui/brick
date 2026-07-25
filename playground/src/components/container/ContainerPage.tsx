import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  Button,
  Container,
  Grid,
  Text,
  VStack,
  type ContainerElement,
  type ContainerGutter,
  type ContainerMeasure,
} from "@flowstack-ui/brick";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./container.playground.css";

const measures: ContainerMeasure[] = [
  "narrow", "medium", "wide", "max", "full",
];
const gutters: ContainerGutter[] = ["none", "sm", "md", "lg"];
const hosts: ContainerElement[] = [
  "div", "section", "article", "header", "footer", "nav", "aside",
];

const customStyle = {
  "--brick-container-max-inline-size": "48rem",
  "--brick-container-padding-inline": "2.5rem",
} as CSSProperties;

function Boundary({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <VStack className="container-boundary" gap="2">
      <SpecimenLabel>{label}</SpecimenLabel>
      {children}
    </VStack>
  );
}

function Content() {
  return (
    <div className="container-demo-content">
      <Text variant="body-sm">Identical measured content</Text>
    </div>
  );
}

export const containerScenarios = [
  {
    description:
      "Container defaults to one div, wide measure, medium logical gutters, and no added role or inner wrapper.",
    id: "container.overview", number: 1, title: "Overview",
  },
  {
    description:
      "Identical content shows every closed maximum measure while all other Container defaults remain unchanged.",
    id: "container.measures", number: 2, title: "Measures",
  },
  {
    description:
      "Identical wide Containers isolate the complete logical gutter scale from none through large.",
    id: "container.gutters", number: 3, title: "Gutters",
  },
  {
    description:
      "Every supported semantic host preserves authored meaning and renders exactly one element.",
    id: "container.semantics", number: 4, title: "Semantic hosts",
  },
  {
    description:
      "Container constrains the region while default Stack and Grid continue to own child arrangement.",
    id: "container.composition", number: 5, title: "Composition",
  },
  {
    description:
      "A narrow, gutter-free Container intentionally nests inside a wider parent without duplicating page gutters.",
    id: "container.nesting", number: 6, title: "Nesting",
  },
  {
    description:
      "Appearance leaves geometry unchanged; the customization changes exactly the public maximum and gutter variables shown.",
    id: "container.customization", number: 7, title: "Appearance and customization",
  },
  {
    description:
      "Narrow, RTL, long-content, focus, and vertical-writing evidence preserves logical containment and source order.",
    id: "container.stress", number: 8, title: "Responsive and RTL",
  },
] as const satisfies readonly ScenarioDefinition[];

export function ContainerPage() {
  const semanticRef = useRef<HTMLElement>(null);
  const [host, setHost] = useState("Not inspected");

  return (
    <VStack className="container-page" data-component-page="container" gap="6">
      <Scenario {...containerScenarios[0]}>
        <div className="container-stage">
          <Container data-testid="container-default"><Content /></Container>
        </div>
      </Scenario>

      <Scenario {...containerScenarios[1]}>
        <VStack data-testid="container-measures" gap="4">
          {measures.map((measure) => (
            <Boundary key={measure} label={measure}>
              <Container measure={measure}><Content /></Container>
            </Boundary>
          ))}
        </VStack>
      </Scenario>

      <Scenario {...containerScenarios[2]}>
        <Grid.Root data-testid="container-gutters" gap="4" minItemSize="md">
          {gutters.map((gutter) => (
            <Boundary key={gutter} label={gutter}>
              <Container gutter={gutter} measure="full"><Content /></Container>
            </Boundary>
          ))}
        </Grid.Root>
      </Scenario>

      <Scenario {...containerScenarios[3]}>
        <VStack gap="4">
          <RenderedOutput label="Container semantic output HTML">
            <Container
              aria-label="Project summary"
              as="section"
              gutter="sm"
              id="container-output"
              measure="medium"
              ref={semanticRef}
            >
              <Text as="h3" variant="title-sm">Project summary</Text>
            </Container>
          </RenderedOutput>
          <Grid.Root gap="3" minItemSize="sm">
            {hosts.map((as) => (
              <Boundary key={as} label={as}>
                <Container as={as} gutter="sm" measure="full">
                  <Content />
                </Container>
              </Boundary>
            ))}
          </Grid.Root>
          <Button
            onPress={() => setHost(semanticRef.current?.tagName ?? "Missing")}
            size="sm"
          >
            Inspect ref
          </Button>
          <Text aria-live="polite" variant="body-sm">Ref host: {host}</Text>
        </VStack>
      </Scenario>

      <Scenario {...containerScenarios[4]}>
        <Container className="container-composition" measure="medium">
          <VStack gap="3">
            <Text as="h3" variant="title-sm">Measured project region</Text>
            <Grid.Root gap="3" minItemSize="sm">
              <Content /><Content /><Content />
            </Grid.Root>
          </VStack>
        </Container>
      </Scenario>

      <Scenario {...containerScenarios[5]}>
        <Container className="container-parent" measure="wide">
          <Content />
          <Container gutter="none" measure="narrow">
            <Content />
          </Container>
        </Container>
      </Scenario>

      <Scenario {...containerScenarios[6]}>
        <Grid.Root data-testid="container-customization" gap="4" minItemSize="md">
          <Boundary label="Light scope">
            <div className="container-theme" data-appearance="light">
              <Container><Content /></Container>
            </div>
          </Boundary>
          <Boundary label="Dark scope">
            <div className="container-theme" data-appearance="dark">
              <Container><Content /></Container>
            </div>
          </Boundary>
          <Boundary label="48rem maximum · 2.5rem gutter">
            <Container style={customStyle}><Content /></Container>
          </Boundary>
        </Grid.Root>
      </Scenario>

      <Scenario {...containerScenarios[7]}>
        <Grid.Root
          className="container-stress-grid"
          columns={2}
          data-testid="container-stress"
          gap="4"
        >
          <Boundary label="Narrow RTL">
            <div className="container-narrow" dir="rtl">
              <Container gutter="sm" measure="full">
                <Text>محتوى طويل داخل حاوية ذات حواف منطقية.</Text>
                <Button size="sm">تابع</Button>
              </Container>
            </div>
          </Boundary>
          <Boundary label="Vertical writing">
            <div className="container-vertical">
              <Container gutter="sm" measure="narrow">
                <Text>Logical inline containment</Text>
              </Container>
            </div>
          </Boundary>
        </Grid.Root>
      </Scenario>
    </VStack>
  );
}
