import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  Button,
  Grid,
  HStack,
  Text,
  VStack,
  type GridAlign,
  type GridColumns,
  type GridGap,
  type GridJustify,
  type GridMinItemSize,
} from "@flowstack-ui/brick";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import "./grid.playground.css";

const columns: GridColumns[] = [1, 2, 3, 4, 5, 6];
const sizes: GridMinItemSize[] = ["xs", "sm", "md", "lg", "xl"];
const gaps: GridGap[] = ["0", "1", "2", "3", "4", "5", "6"];
const aligns: GridAlign[] = ["stretch", "start", "center", "end", "baseline"];
const justifies: GridJustify[] = ["stretch", "start", "center", "end"];

const customGridStyle = {
  "--brick-grid-column-gap": "2rem",
  "--brick-grid-row-gap": "0.5rem",
  border: "2px dashed var(--brick-color-accent-border)",
  padding: "var(--brick-space-4)",
} as CSSProperties;

function Tile({ children }: { children: ReactNode }) {
  return <div className="grid-demo-tile">{children}</div>;
}

function Cell({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <EvidenceSurface className="grid-cell">
      <VStack gap="4">
        <SpecimenLabel>{label}</SpecimenLabel>
        <div className="grid-cell__preview">{children}</div>
      </VStack>
    </EvidenceSurface>
  );
}

function EvidenceGroup({
  children,
  description,
  title,
}: {
  children: ReactNode;
  description: string;
  title: string;
}) {
  return (
    <VStack as="section" gap="3">
      <VStack gap="1">
        <Text as="h3" variant="title-sm">{title}</Text>
        <Text as="p" tone="secondary" variant="body-sm">{description}</Text>
      </VStack>
      {children}
    </VStack>
  );
}

function IdenticalTiles({ count = 4 }: { count?: number }) {
  return Array.from({ length: count }, (_, index) => (
    <Tile key={index}>Item {index + 1}</Tile>
  ));
}

export const gridScenarios = [
  {
    description:
      "Grid’s canonical rendering is a semantic-neutral div with one equal column, zero gap, stretched items, sparse row auto-placement, and no added item wrappers.",
    id: "grid.overview",
    number: 1,
    title: "Overview",
  },
  {
    description:
      "Explicit mode holds an exact equal column count. Intrinsic mode adds equal columns from available component width without JavaScript or application breakpoints.",
    id: "grid.modes",
    number: 2,
    title: "Layout modes",
  },
  {
    description:
      "Identical content proves exact equal columns from one through six. The public type and automated tests cover seven through twelve.",
    id: "grid.columns",
    number: 3,
    title: "Columns",
  },
  {
    description:
      "The minimum item-size tokens change only the intrinsic track threshold while content, gap, alignment, and available width remain constant.",
    id: "grid.intrinsic",
    number: 4,
    title: "Intrinsic sizes",
  },
  {
    description:
      "The complete gap scale changes both axes. Axis overrides then change only row or column spacing.",
    id: "grid.gaps",
    number: 5,
    title: "Gaps",
  },
  {
    description:
      "Root alignment and justification change only where identical items sit inside deliberately oversized grid areas.",
    id: "grid.alignment",
    number: 6,
    title: "Alignment",
  },
  {
    description:
      "Optional Items provide spans, explicit lines, full-width regions, and self-alignment while ordinary children still auto-place in source order.",
    id: "grid.placement",
    number: 7,
    title: "Item placement",
  },
  {
    description:
      "Root and Item semantic hosts preserve authored content and native attributes. The captured HTML proves there are no automatic wrappers or grid roles.",
    id: "grid.semantics",
    number: 8,
    title: "Semantics and composition",
  },
  {
    description:
      "Light and dark scopes preserve layout. Public variables and ordinary native styles customize exactly the result shown beside the code.",
    id: "grid.appearance",
    navigationTitle: "Theme",
    number: 9,
    title: "Appearance and customization",
  },
  {
    description:
      "Intrinsic reflow, long localized content, focusable children, narrow widths, and RTL remain contained while DOM and focus order stay unchanged.",
    id: "grid.stress",
    number: 10,
    title: "Responsive and RTL",
  },
] as const satisfies readonly ScenarioDefinition[];

export function GridPage() {
  const semanticRef = useRef<HTMLElement>(null);
  const [refHost, setRefHost] = useState("Not inspected");

  return (
    <VStack className="grid-page" data-component-page="grid" gap="6">
      <Scenario {...gridScenarios[0]}>
        <div className="grid-frame grid-frame--center" data-testid="grid-overview">
          <Grid.Root data-testid="grid-default">
            <Tile>Default item</Tile>
          </Grid.Root>
        </div>
      </Scenario>

      <Scenario {...gridScenarios[1]}>
        <Grid.Root data-testid="grid-modes" gap="4" minItemSize="md">
          <Cell label="Explicit: 3 columns">
            <Grid.Root columns={3} data-mode-example="explicit" gap="2">
              <IdenticalTiles />
            </Grid.Root>
          </Cell>
          <Cell label="Intrinsic: md">
            <Grid.Root data-mode-example="intrinsic" gap="2" minItemSize="md">
              <IdenticalTiles />
            </Grid.Root>
          </Cell>
        </Grid.Root>
      </Scenario>

      <Scenario {...gridScenarios[2]}>
        <Grid.Root data-testid="grid-columns" gap="4" minItemSize="md">
          {columns.map((value) => (
            <Cell key={value} label={`${value} column${value === 1 ? "" : "s"}`}>
              <Grid.Root columns={value} data-columns-example={value} gap="1">
                <IdenticalTiles count={value} />
              </Grid.Root>
            </Cell>
          ))}
        </Grid.Root>
      </Scenario>

      <Scenario {...gridScenarios[3]}>
        <Grid.Root data-testid="grid-intrinsic" gap="4" minItemSize="md">
          {sizes.map((value) => (
            <Cell key={value} label={value}>
              <Grid.Root data-size-example={value} gap="2" minItemSize={value}>
                <IdenticalTiles />
              </Grid.Root>
            </Cell>
          ))}
        </Grid.Root>
      </Scenario>

      <Scenario {...gridScenarios[4]}>
        <VStack data-testid="grid-gaps" gap="6">
          <EvidenceGroup
            description="Only uniform gap changes across the complete token scale."
            title="Uniform gaps"
          >
            <Grid.Root gap="4" minItemSize="sm">
              {gaps.map((value) => (
                <Cell key={value} label={value}>
                  <Grid.Root columns={2} data-gap-example={value} gap={value}>
                    <IdenticalTiles />
                  </Grid.Root>
                </Cell>
              ))}
            </Grid.Root>
          </EvidenceGroup>
          <EvidenceGroup
            description="Both use gap 2; the first changes only rows and the second only columns."
            title="Axis overrides"
          >
            <Grid.Root columns={2} gap="4">
              <Cell label="rowGap 6">
                <Grid.Root columns={2} data-axis-example="row" gap="2" rowGap="6">
                  <IdenticalTiles />
                </Grid.Root>
              </Cell>
              <Cell label="columnGap 6">
                <Grid.Root columnGap="6" columns={2} data-axis-example="column" gap="2">
                  <IdenticalTiles />
                </Grid.Root>
              </Cell>
            </Grid.Root>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...gridScenarios[5]}>
        <VStack data-testid="grid-alignments" gap="6">
          <EvidenceGroup
            description="Only block-axis item alignment changes."
            title="Item alignment"
          >
            <Grid.Root gap="4" minItemSize="sm">
              {aligns.map((value) => (
                <Cell key={value} label={value}>
                  <Grid.Root
                    align={value}
                    className="grid-oversized"
                    columns={2}
                    data-align-example={value}
                    gap="2"
                  >
                    <Tile>Small</Tile><Tile>Two-line item<br />content</Tile>
                  </Grid.Root>
                </Cell>
              ))}
            </Grid.Root>
          </EvidenceGroup>
          <EvidenceGroup
            description="Only inline-axis item justification changes."
            title="Item justification"
          >
            <Grid.Root columns={2} gap="4">
              {justifies.map((value) => (
                <Cell key={value} label={value}>
                  <Grid.Root
                    className="grid-oversized"
                    columns={2}
                    data-justify-example={value}
                    gap="2"
                    justify={value}
                  >
                    <Tile>Item</Tile><Tile>Item</Tile>
                  </Grid.Root>
                </Cell>
              ))}
            </Grid.Root>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...gridScenarios[6]}>
        <Grid.Root
          className="grid-placement"
          columns={4}
          data-testid="grid-placement"
          gap="3"
        >
          <Tile>1 · ordinary</Tile>
          <Grid.Item columnSpan={2}><Tile>2 · span two</Tile></Grid.Item>
          <Tile>3 · ordinary</Tile>
          <Grid.Item columnStart={2} columnEnd={5}><Tile>4 · lines 2–5</Tile></Grid.Item>
          <Grid.Item columnSpan="full"><Tile>5 · full width</Tile></Grid.Item>
          <Grid.Item align="center" justify="end" rowSpan={2}>
            <Tile>6 · self aligned</Tile>
          </Grid.Item>
          <Tile>7 · ordinary</Tile>
          <Tile>8 · ordinary</Tile>
        </Grid.Root>
      </Scenario>

      <Scenario {...gridScenarios[7]}>
        <VStack data-testid="grid-semantics" gap="5">
          <RenderedOutput label="Grid semantic output HTML">
            <Grid.Root
              aria-label="Project summaries"
              as="section"
              columns={2}
              gap="2"
              id="grid-output-section"
              ref={semanticRef}
            >
              <article>Current release</article>
              <Grid.Item as="article" columnSpan="full">
                Next milestone
              </Grid.Item>
            </Grid.Root>
          </RenderedOutput>
          <HStack gap="3">
            <Button
              onClick={() => setRefHost(semanticRef.current?.tagName ?? "Missing")}
              type="button"
            >
              Inspect ref
            </Button>
            <Text as="span" tone="secondary" variant="body-sm">
              Ref host: {refHost}
            </Text>
          </HStack>
        </VStack>
      </Scenario>

      <Scenario {...gridScenarios[8]}>
        <VStack gap="6">
          <Grid.Root columns={2} data-testid="grid-appearance" gap="4">
            <EvidenceSurface className="grid-appearance-cell" data-brick-appearance="light"><SpecimenLabel>Light</SpecimenLabel><Grid.Root gap="2" minItemSize="xs"><Tile>Light one</Tile><Tile>Light two</Tile></Grid.Root></EvidenceSurface>
            <EvidenceSurface className="grid-appearance-cell" data-brick-appearance="dark"><SpecimenLabel>Dark</SpecimenLabel><Grid.Root gap="2" minItemSize="xs"><Tile>Dark one</Tile><Tile>Dark two</Tile></Grid.Root></EvidenceSurface>
          </Grid.Root>
          <EvidenceSurface as="article" className="playground-customization-evidence" inset="none"><Grid.Root className="playground-customization-layout" columns={2} gap="0">
            <VStack gap="2">
              <SpecimenLabel>Customized</SpecimenLabel>
              <Text as="h3" variant="title-sm">Local Grid variables</Text>
              <Text as="p" tone="secondary" variant="body-sm">
                Row gap, column gap, border, and padding change on this instance.
              </Text>
              <PlaygroundCodeBlock aria-label="Grid customization example" tabIndex={0}>{`<Grid.Root
  columns={2}
  gap="2"
  style={{
    "--brick-grid-column-gap": "2rem",
    "--brick-grid-row-gap": "0.5rem",
    border: "2px dashed var(--brick-color-accent-border)",
    padding: "var(--brick-space-4)",
  }}
>`}</PlaygroundCodeBlock>
            </VStack>
            <Grid.Root className="playground-customization-preview" columns={2} gap="2" style={customGridStyle}>
              <IdenticalTiles />
            </Grid.Root>
          </Grid.Root></EvidenceSurface>
        </VStack>
      </Scenario>

      <Scenario {...gridScenarios[9]}>
        <VStack data-testid="grid-stress" gap="6">
          <EvidenceGroup title="Responsive boundaries" description="Intrinsic tracks reflow long localized actions without widening the constrained application-owned frame."><Grid.Root className="grid-narrow" gap="2" minItemSize="xs">
            <Button>Review localization</Button>
            <Button tone="neutral">Donaudampfschifffahrtsgesellschaft</Button>
            <Button variant="outline">保存して続行</Button>
            <Grid.Item columnSpan="full"><Tile>Full intrinsic summary</Tile></Grid.Item>
          </Grid.Root></EvidenceGroup>
          <EvidenceGroup title="RTL inheritance" description="Explicit columns preserve source order while alignment and inline flow follow the inherited right-to-left direction."><Grid.Root className="grid-narrow" columns={3} dir="rtl" gap="2">
            <Button>الأول</Button>
            <Button tone="neutral">الثاني</Button>
            <Button variant="outline">الثالث</Button>
          </Grid.Root></EvidenceGroup>
        </VStack>
      </Scenario>
    </VStack>
  );
}
