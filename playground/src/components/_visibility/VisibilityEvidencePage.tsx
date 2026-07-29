import { useRef, useState, type ComponentType, type RefAttributes } from "react";
import { Badge, Button, Grid, HStack, Hide, Show, Surface, Text, VStack, type HideProps, type ShowProps } from "@flowstack-ui/brick";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./visibility.playground.css";

type VisibilityProps = ShowProps | HideProps;

export function createVisibilityScenarios(id: "show" | "hide") {
  const label = id === "show" ? "Show" : "Hide";
  return [
    { id: `${id}.overview`, number: 1, title: "Overview", description: `${label} applies one CSS-only responsive visibility direction without changing React mounting.` },
    { id: `${id}.breakpoints`, number: 2, title: "Breakpoints", description: "The fixed sm, md, lg, and xl thresholds remain explicit and deterministic." },
    { id: `${id}.edges`, number: 3, title: "Exact edges and live resize", description: "Show and Hide are exact complements at the selected threshold." },
    { id: `${id}.display`, number: 4, title: "Native display preservation", description: "Visible block, inline, flex, and grid hosts retain authored display." },
    { id: `${id}.hosts`, number: 5, title: "Hosts, props, and refs", description: "Semantic hosts, native attributes, slots, events, and refs target one root." },
    { id: `${id}.composition`, number: 6, title: "Show and Hide composition", description: "The independent utilities compose without a public Visibility mode API." },
    { id: `${id}.mounted`, number: 7, title: "Mounted state and accessibility output", description: "State remains mounted while display controls focus and accessibility-tree availability." },
    { id: `${id}.stress`, number: 8, title: "Reflow, localization, and RTL", description: "Viewport thresholds stay physical while authored content and direction remain intact." },
  ] as const satisfies readonly ScenarioDefinition[];
}

function Card({ children, label }: { children: React.ReactNode; label: string }) {
  return <Surface bordered className="visibility-card" inset="md"><SpecimenLabel>{label}</SpecimenLabel>{children}</Surface>;
}

export function VisibilityEvidencePage({ component: Component, id, scenarios }: { component: ComponentType<VisibilityProps & RefAttributes<HTMLElement>>; id: "show" | "hide"; scenarios: readonly ScenarioDefinition[] }) {
  const ref = useRef<HTMLElement>(null); const [count, setCount] = useState(0); const [host, setHost] = useState("Not inspected");
  return <VStack className="visibility-page" data-component-page={id} gap="6">
    <Scenario {...scenarios[0]}><Surface bordered className="visibility-stage" data-testid={`${id}-overview`} inset="lg"><div><Badge className="visibility-badge" size="sm" tone="accent">CSS layout utility</Badge></div><Component from="md" data-testid={`${id}-primary`}><Text as="p">Workspace navigation at the md boundary</Text></Component></Surface></Scenario>
    <Scenario {...scenarios[1]}><Grid.Root data-testid={`${id}-breakpoints`} gap="3" minItemSize="sm">{(["sm", "md", "lg", "xl"] as const).map(from => <Card key={from} label={from}><Component from={from}><Text>{id} from {from}</Text></Component></Card>)}</Grid.Root></Scenario>
    <Scenario {...scenarios[2]}><HStack className="visibility-pair" data-testid={`${id}-pair`} gap="3" wrap><Show from="md"><Badge tone="success">Show from md</Badge></Show><Hide from="md"><Badge tone="warning">Hide from md</Badge></Hide></HStack></Scenario>
    <Scenario {...scenarios[3]}><Grid.Root data-testid={`${id}-display`} gap="3" minItemSize="sm"><Card label="block"><Component from="md" style={{ display: "block" }}>Block</Component></Card><Card label="inline"><Component as="span" from="md" style={{ display: "inline" }}>Inline</Component></Card><Card label="flex"><Component from="md" style={{ display: "flex" }}>Flex</Component></Card><Card label="grid"><Component from="md" style={{ display: "grid" }}>Grid</Component></Card></Grid.Root></Scenario>
    <Scenario {...scenarios[4]}><Surface bordered inset="md"><Component aria-label={`${id} semantic region`} as="section" data-purpose="native" from="md" ref={ref} slot={`${id}-custom`}><Text as="h3" variant="title-sm">Semantic region</Text></Component><Button onPress={() => setHost(ref.current?.tagName ?? "Missing")} size="sm">Inspect ref</Button><Text aria-live="polite">Ref host: {host}</Text></Surface></Scenario>
    <Scenario {...scenarios[5]}><Surface bordered inset="md"><Show from="sm"><Hide from="lg"><Text>Visible from sm until lg</Text></Hide></Show></Surface></Scenario>
    <Scenario {...scenarios[6]}><Surface bordered data-testid={`${id}-mounted`} inset="md"><Component from="md"><Button onPress={() => setCount(value => value + 1)}>Increment retained state</Button></Component><Text>Retained count: {count}</Text></Surface></Scenario>
    <Scenario {...scenarios[7]}><Grid.Root className="visibility-stress" data-testid={`${id}-stress`} gap="3" minItemSize="sm"><Card label="Narrow LTR"><Component from="md"><Text as="p">A long localized workspace explanation remains mounted and wraps naturally.</Text></Component></Card><Card label="RTL"><div dir="rtl"><Component from="md"><Text as="p" lang="ar">تظل أدوات مساحة العمل متاحة وفق عرض الشاشة</Text></Component></div></Card></Grid.Root></Scenario>
  </VStack>;
}
