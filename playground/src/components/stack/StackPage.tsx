import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  Grid,
  Badge,
  Button,
  HStack,
  ScrollArea,
  Stack,
  Text,
  VStack,
  type StackAlign,
  type StackElement,
  type StackGap,
  type StackJustify,
} from "@flowstack-ui/brick";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./stack.playground.css";

const gaps: StackGap[] = ["0", "1", "2", "3", "4", "5", "6"];
const aligns: StackAlign[] = ["stretch", "start", "center", "end", "baseline"];
const justifies: StackJustify[] = [
  "start", "center", "end", "between", "around", "evenly",
];
const semanticHosts: StackElement[] = ["div", "section", "nav", "ul"];

const customStackStyle = {
  "--brick-stack-gap": "1.5rem",
  border: "2px dashed var(--brick-color-accent-border)",
  padding: "var(--brick-space-4)",
} as CSSProperties;

function Item({ children }: { children: ReactNode }) {
  return <span className="stack-demo-item">{children}</span>;
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
    <VStack as="section" className="stack-evidence-group" gap="3">
      <VStack gap="1">
        <Text as="h3" variant="title-sm">{title}</Text>
        <Text as="p" tone="secondary" variant="body-sm">{description}</Text>
      </VStack>
      {children}
    </VStack>
  );
}

function Cell({ children, label }: { children: ReactNode; label: string }) {
  return (
    <EvidenceSurface className="stack-cell">
      <SpecimenLabel>{label}</SpecimenLabel>
      <div className="stack-cell__preview">{children}</div>
    </EvidenceSurface>
  );
}

export const stackScenarios = [
  {
    description:
      "Stack’s canonical rendering is a semantic-neutral div with column direction, zero gap, stretched children, start distribution, and no wrapping.",
    id: "stack.overview",
    number: 1,
    title: "Overview",
  },
  {
    description:
      "Stack and VStack share the column default. HStack changes only the direction and uses centered cross-axis alignment for ordinary rows.",
    id: "stack.family",
    number: 2,
    title: "Stack family",
  },
  {
    description:
      "The complete spacing scale changes only the gap between identical children. Zero through six map directly to Brick space tokens.",
    id: "stack.gaps",
    number: 3,
    title: "Gaps",
  },
  {
    description:
      "Cross-axis alignment changes only where identical children sit across a fixed preview width. Baseline uses intentionally different text sizes.",
    id: "stack.alignment",
    number: 4,
    title: "Alignment",
  },
  {
    description:
      "Main-axis distribution changes only the use of available inline space across otherwise identical horizontal rows.",
    id: "stack.distribution",
    number: 5,
    title: "Distribution",
  },
  {
    description:
      "Wrapping remains opt-in. Identical controls either stay on one line or form additional flex lines inside the same constrained width.",
    id: "stack.wrapping",
    number: 6,
    title: "Wrapping and constraints",
  },
  {
    description:
      "The semantic host changes independently from layout. Rendered output confirms that Stack adds no role, label, wrapper, or reordered content.",
    id: "stack.semantics",
    number: 7,
    title: "Semantic hosts",
  },
  {
    description:
      "Light and dark scopes preserve the canonical layout. The public gap variable and ordinary native styles customize one exact specimen.",
    id: "stack.appearance",
    navigationTitle: "Theme",
    number: 8,
    title: "Appearance and customization",
  },
  {
    description:
      "Long content, genuine RTL, narrow screens, zoom, text spacing, and forced colors preserve DOM order and remain contained.",
    id: "stack.stress",
    number: 9,
    title: "Responsive and RTL",
  },
] as const satisfies readonly ScenarioDefinition[];

export function StackPage() {
  const semanticRef = useRef<HTMLElement>(null);
  const [refHost, setRefHost] = useState("Not inspected");

  return (
    <VStack
      className="stack-page"
      data-component-page="stack"
      data-testid="stack-workbench"
      gap="6"
    >
      <Scenario {...stackScenarios[0]}>
        <EvidenceSurface className="stack-overview" data-testid="stack-overview" inset="lg">
          <Stack data-testid="stack-default">
            <Item>First item</Item>
            <Item>Second item</Item>
            <Item>Third item</Item>
          </Stack>
        </EvidenceSurface>
      </Scenario>

      <Scenario {...stackScenarios[1]}>
        <Grid.Root columns={3} className="stack-grid stack-grid--three" data-testid="stack-family">
          <Cell label="Stack">
            <Stack gap="2"><Item>First</Item><Item>Second</Item></Stack>
          </Cell>
          <Cell label="HStack">
            <HStack gap="2"><Item>First</Item><Item>Second</Item></HStack>
          </Cell>
          <Cell label="VStack">
            <VStack gap="2"><Item>First</Item><Item>Second</Item></VStack>
          </Cell>
        </Grid.Root>
      </Scenario>

      <Scenario {...stackScenarios[2]}>
        <Grid.Root columns={4} className="stack-grid stack-grid--four" data-testid="stack-gaps">
          {gaps.map((gap) => (
            <Cell key={gap} label={gap}>
              <VStack data-gap-example={gap} gap={gap}>
                <Item>First</Item><Item>Second</Item>
              </VStack>
            </Cell>
          ))}
        </Grid.Root>
      </Scenario>

      <Scenario {...stackScenarios[3]}>
        <Grid.Root columns={3} className="stack-grid stack-grid--three" data-testid="stack-alignments">
          {aligns.map((align) => (
            <Cell key={align} label={align}>
              <HStack
                align={align}
                className="stack-fixed-row"
                data-align-example={align}
                gap="2"
              >
                <Item><Text variant="body-sm">Small</Text></Item>
                <Item><Text variant={align === "baseline" ? "title-md" : "body-sm"}>Large</Text></Item>
              </HStack>
            </Cell>
          ))}
        </Grid.Root>
      </Scenario>

      <Scenario {...stackScenarios[4]}>
        <Grid.Root columns={3} className="stack-grid stack-grid--three" data-testid="stack-justifications">
          {justifies.map((justify) => (
            <Cell key={justify} label={justify}>
              <HStack
                className="stack-fixed-row"
                data-justify-example={justify}
                gap="2"
                justify={justify}
              >
                <Item>First</Item><Item>Second</Item>
              </HStack>
            </Cell>
          ))}
        </Grid.Root>
      </Scenario>

      <Scenario {...stackScenarios[5]}>
        <VStack data-testid="stack-wrapping" gap="6">
          <EvidenceGroup
            description="The unwrapped row keeps one line and may overflow its deliberately narrow evidence frame."
            title="No wrapping"
          >
            <ScrollArea.Root className="stack-constraint" orientation="horizontal" scrollbarVisibility="interaction">
              <ScrollArea.Viewport>
                <HStack data-testid="stack-nowrap" gap="2">
                  <Button>Approve changes</Button>
                  <Button tone="neutral">Save draft</Button>
                  <Button variant="outline">Cancel review</Button>
                </HStack>
              </ScrollArea.Viewport>
            </ScrollArea.Root>
          </EvidenceGroup>
          <EvidenceGroup
            description="Only wrap changes; content, defaults, order, width, and gaps remain identical."
            title="Wrapping"
          >
            <div className="stack-constraint">
              <HStack data-testid="stack-wrap" gap="2" wrap>
                <Button>Approve changes</Button>
                <Button tone="neutral">Save draft</Button>
                <Button variant="outline">Cancel review</Button>
              </HStack>
            </div>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...stackScenarios[6]}>
        <VStack data-testid="stack-semantics" gap="6">
          <Grid.Root columns={4} className="stack-grid stack-grid--four">
            {semanticHosts.map((as) => (
              <Cell key={as} label={as}>
                <Stack
                  aria-label={as === "nav" ? "Project actions" : undefined}
                  as={as}
                  gap="1"
                >
                  {as === "ul"
                    ? <><li>First item</li><li>Second item</li></>
                    : <><Item>First item</Item><Item>Second item</Item></>}
                </Stack>
              </Cell>
            ))}
          </Grid.Root>
          <EvidenceGroup
            description="The live section keeps source order and exposes only authored native attributes plus Stack layout metadata."
            title="Rendered semantic output"
          >
            <RenderedOutput label="Stack semantic host HTML">
              <VStack as="section" gap="2" id="stack-output-section" ref={semanticRef}>
                <Text as="h2" variant="title-sm">Project status</Text>
                <Text as="p">Ready for review</Text>
              </VStack>
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
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...stackScenarios[7]}>
        <VStack gap="6">
          <EvidenceGroup
            description="Both scopes use identical canonical Stack recipes."
            title="Scoped appearances"
          >
            <Grid.Root columns={2} className="stack-scoped-grid" data-testid="stack-appearance">
              <EvidenceSurface data-brick-appearance="light">
                <VStack gap="2"><Badge>light</Badge><Item>First</Item><Item>Second</Item></VStack>
              </EvidenceSurface>
              <EvidenceSurface data-brick-appearance="dark">
                <VStack gap="2"><Badge>dark</Badge><Item>First</Item><Item>Second</Item></VStack>
              </EvidenceSurface>
            </Grid.Root>
          </EvidenceGroup>
          <EvidenceGroup
            description="The shown public gap variable and native styles exactly match the live result."
            title="Consumer customization"
          >
            <EvidenceSurface as="article" className="stack-customization" inset="lg">
              <VStack gap="2">
                <Text as="h4" variant="title-sm">Local Stack variables</Text>
                <Text as="p" tone="secondary" variant="body-sm">
                  Gap, border, and padding change on this instance only.
                </Text>
                <pre aria-label="Stack customization example" tabIndex={0}>
                  <code>{`<VStack
  gap="2"
  style={{
    "--brick-stack-gap": "1.5rem",
    border: "2px dashed var(--brick-color-accent-border)",
    padding: "var(--brick-space-4)",
  }}
>
  <Item>First</Item>
  <Item>Second</Item>
</VStack>`}</code>
                </pre>
              </VStack>
              <EvidenceSurface className="stack-customization__preview">
                <VStack gap="2" style={customStackStyle}>
                  <Item>First</Item><Item>Second</Item>
                </VStack>
              </EvidenceSurface>
            </EvidenceSurface>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...stackScenarios[8]}>
        <VStack data-testid="stack-stress" gap="6">
          <EvidenceGroup
            description="A narrow wrapping row preserves source order and contains long localized actions."
            title="Constrained localization"
          >
            <EvidenceSurface className="stack-stress-panel">
              <HStack className="stack-phone-frame" gap="2" wrap>
                <Button>Review internationalization changes</Button>
                <Button tone="neutral">Donaudampfschifffahrtsgesellschaft</Button>
                <Button variant="outline">保存して続行</Button>
              </HStack>
            </EvidenceSurface>
          </EvidenceGroup>
          <EvidenceGroup
            description="RTL changes logical row placement while DOM, reading, and focus order remain First, Second, Third."
            title="RTL inheritance"
          >
            <EvidenceSurface className="stack-stress-panel">
              <HStack className="stack-phone-frame" dir="rtl" gap="2" wrap>
                <Item>الأول</Item><Item>الثاني</Item><Item>الثالث</Item>
              </HStack>
            </EvidenceSurface>
          </EvidenceGroup>
        </VStack>
      </Scenario>
    </VStack>
  );
}
