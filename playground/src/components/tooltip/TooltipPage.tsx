import { Code } from "@flowstack-ui/brick/code";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { useState, type CSSProperties, type ReactNode } from "react";
import {
  Grid,
  HStack,
  VStack,
  Button,
  IconButton,
  Tooltip,
  Text,
} from "@flowstack-ui/brick";
import type { TooltipShape } from "@flowstack-ui/brick/tooltip";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import "./tooltip.playground.css";

const sides = ["top", "right", "bottom", "left"] as const;
const aligns = ["start", "center", "end"] as const;
const shapes: TooltipShape[] = ["rounded", "pill"];
const customTokens = {
  "--brick-tooltip-background": "var(--brick-color-accent-solid)",
  "--brick-tooltip-foreground": "var(--brick-color-accent-on-solid)",
  "--brick-tooltip-radius": "0.25rem",
} as CSSProperties;

function SearchIcon() {
  return <svg aria-hidden="true" fill="none" viewBox="0 0 20 20"><circle cx="8.5" cy="8.5" r="5" stroke="currentColor" strokeWidth="1.5" /><path d="m12.3 12.3 4 4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" /></svg>;
}

function EvidenceGroup({ children, description, title }: { children: ReactNode; description: string; title: string }) {
  return <VStack as="section" className="tooltip-evidence-group"><VStack className="tooltip-evidence-group__heading"><Text as="h3" variant="title-sm">{title}</Text><Text as="p" tone="secondary" variant="body-sm">{description}</Text></VStack>{children}</VStack>;
}

function Cell({ children, label }: { children: ReactNode; label: string }) {
  return <EvidenceSurface className="tooltip-specimen-cell"><SpecimenLabel>{label}</SpecimenLabel><div className="tooltip-specimen-cell__preview">{children}</div></EvidenceSurface>;
}

function Hint({ align = "center", arrow = true, label, shape, side = "top" }: {
  align?: "start" | "center" | "end";
  arrow?: boolean;
  label: string;
  shape?: TooltipShape;
  side?: "top" | "right" | "bottom" | "left";
}) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild><IconButton aria-label={label} tone="neutral" variant="outline"><SearchIcon /></IconButton></Tooltip.Trigger>
      <Tooltip.Portal><Tooltip.Content align={align} shape={shape} side={side}>{label}{arrow ? <Tooltip.Arrow /> : null}</Tooltip.Content></Tooltip.Portal>
    </Tooltip.Root>
  );
}

function ScopedTooltip({ appearance }: { appearance: "light" | "dark" }) {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  return (
    <EvidenceSurface className="tooltip-appearance-panel" data-brick-appearance={appearance} ref={setContainer}>
      <Code>{appearance}</Code>
      {container ? <Tooltip.Provider closeDelay={0} openDelay={0}><Tooltip.Root><Tooltip.Trigger asChild><Button tone="neutral" variant="outline">{appearance} trigger</Button></Tooltip.Trigger><Tooltip.Portal container={container}><Tooltip.Content>{appearance} tooltip<Tooltip.Arrow /></Tooltip.Content></Tooltip.Portal></Tooltip.Root></Tooltip.Provider> : null}
    </EvidenceSurface>
  );
}

export const tooltipScenarios = [
  { description: "Tooltip’s canonical example is a short plain rounded description for an independently named IconButton. Focus, hover, touch hold, timing, Escape, and positioning remain Atom-owned.", id: "tooltip.overview", number: 1, title: "Overview" },
  { description: "Plain is concise text; rich adds presentational Title and Description while remaining strictly non-interactive. Arrow is optional in both recipes.", id: "tooltip.recipes", navigationTitle: "Recipes", number: 2, title: "Recipes and anatomy" },
  { description: "Shape changes only radius. Rounded is the default readable treatment; pill is reserved for compact single-line content.", id: "tooltip.shapes", number: 3, title: "Shapes" },
  { description: "Preferred side changes only initial placement. The shared Arrow follows the final collision-resolved side and overlaps the surface boundary.", id: "tooltip.sides", number: 4, title: "Sides" },
  { description: "Alignment changes only the cross-axis relationship. Side, content, shape, recipe, Arrow, and trigger geometry remain identical.", id: "tooltip.alignments", number: 5, title: "Alignments" },
  { description: "Provider timing, controlled state, default-open state, disabled blocking, focus retention, and Escape remain observable without inventing an interactive Tooltip mode.", id: "tooltip.states", navigationTitle: "States", number: 6, title: "Timing and state" },
  { description: "Trigger supports its native, render, and asChild paths while remaining the actual named focus owner. Content contains no focusable descendants.", id: "tooltip.composition", navigationTitle: "Composition", number: 7, title: "Trigger composition" },
  { description: "Custom portal containers preserve local appearance scopes. Public Content class, slot, style, and component tokens customize presentation only.", id: "tooltip.appearance", navigationTitle: "Theme", number: 8, title: "Appearance and customization" },
  { description: "Long localized and unbroken content remains viewport-contained at narrow widths, while genuine RTL direction and reduced preferences preserve placement and reading order.", id: "tooltip.stress", navigationTitle: "Stress", number: 9, title: "Responsive and RTL" },
] as const satisfies readonly ScenarioDefinition[];

export function TooltipPage() {
  const [controlledOpen, setControlledOpen] = useState(false);
  return (
    <Tooltip.Provider closeDelay={0} openDelay={0}>
      <VStack className="tooltip-page" data-component-page="tooltip" data-testid="tooltip-workbench">
        <Scenario {...tooltipScenarios[0]}>
          <EvidenceSurface className="tooltip-overview" data-testid="tooltip-overview" inset="lg">
            <Hint label="Search workspace" side="bottom" />
            <Text as="p" tone="secondary" variant="body-sm">Search remains independently named; Tooltip is supplemental.</Text>
          </EvidenceSurface>
        </Scenario>

        <Scenario {...tooltipScenarios[1]}>
          <Grid.Root columns={3} className="tooltip-specimen-grid tooltip-specimen-grid--three" data-testid="tooltip-recipes">
            <Cell label="plain + Arrow"><Hint label="Plain tooltip" /></Cell>
            <Cell label="plain · no Arrow"><Hint arrow={false} label="Plain without arrow" /></Cell>
            <Cell label="rich + Arrow">
              <Tooltip.Root variant="rich"><Tooltip.Trigger asChild><Button tone="neutral" variant="outline">Project status</Button></Tooltip.Trigger><Tooltip.Portal><Tooltip.Content side="bottom"><Tooltip.Title>Ready for review</Tooltip.Title><Tooltip.Description>All required checks have passed.</Tooltip.Description><Tooltip.Arrow /></Tooltip.Content></Tooltip.Portal></Tooltip.Root>
            </Cell>
          </Grid.Root>
        </Scenario>

        <Scenario {...tooltipScenarios[2]}>
          <Grid.Root columns={2} className="tooltip-specimen-grid tooltip-specimen-grid--two" data-testid="tooltip-shapes">
            {shapes.map((shape) => <Cell key={shape} label={shape}><Hint label={`${shape[0].toUpperCase()}${shape.slice(1)} tooltip`} shape={shape} /></Cell>)}
          </Grid.Root>
        </Scenario>

        <Scenario {...tooltipScenarios[3]}>
          <Grid.Root columns={4} className="tooltip-specimen-grid tooltip-specimen-grid--four" data-testid="tooltip-placement">
            {sides.map((side) => <Cell key={side} label={side}><Hint label={side === "top" ? "Above" : side === "right" ? "To the right" : side === "bottom" ? "Below" : "To the left"} side={side} /></Cell>)}
          </Grid.Root>
        </Scenario>

        <Scenario {...tooltipScenarios[4]}>
          <Grid.Root columns={3} className="tooltip-specimen-grid tooltip-specimen-grid--three" data-testid="tooltip-alignments">
            {aligns.map((align) => <Cell key={align} label={align}><Hint align={align} label={`${align} aligned tooltip`} side="bottom" /></Cell>)}
          </Grid.Root>
        </Scenario>

        <Scenario {...tooltipScenarios[5]}>
          <Grid.Root columns={3} className="tooltip-specimen-grid tooltip-specimen-grid--three" data-testid="tooltip-states">
            <Cell label="controlled">
              <HStack className="tooltip-state-example"><Button onPress={() => setControlledOpen((open) => !open)} tone="neutral" variant="outline">Toggle controlled tooltip</Button><Tooltip.Root onOpenChange={setControlledOpen} open={controlledOpen}><Tooltip.Trigger asChild><IconButton aria-label="Controlled help" tone="neutral" variant="outline"><SearchIcon /></IconButton></Tooltip.Trigger><Tooltip.Portal><Tooltip.Content>Controlled state<Tooltip.Arrow /></Tooltip.Content></Tooltip.Portal></Tooltip.Root></HStack>
            </Cell>
            <Cell label="defaultOpen"><Tooltip.Root defaultOpen><Tooltip.Trigger asChild><Button tone="neutral" variant="outline">Default-open trigger</Button></Tooltip.Trigger><Tooltip.Portal><Tooltip.Content className="tooltip-default-open">Default-open state<Tooltip.Arrow /></Tooltip.Content></Tooltip.Portal></Tooltip.Root></Cell>
            <Cell label="disabled"><Tooltip.Root disabled><Tooltip.Trigger asChild><Button tone="neutral" variant="outline">Disabled tooltip</Button></Tooltip.Trigger><Tooltip.Portal><Tooltip.Content>Must not open</Tooltip.Content></Tooltip.Portal></Tooltip.Root></Cell>
          </Grid.Root>
        </Scenario>

        <Scenario {...tooltipScenarios[6]}>
          <Grid.Root className="playground-output-stack" data-testid="tooltip-composition">
            <RenderedOutput label="asChild Tooltip Trigger HTML"><Tooltip.Root><Tooltip.Trigger asChild data-testid="tooltip-as-child"><Button tone="neutral" variant="outline">As-child trigger</Button></Tooltip.Trigger><Tooltip.Portal><Tooltip.Content>As-child composition</Tooltip.Content></Tooltip.Portal></Tooltip.Root></RenderedOutput>
            <RenderedOutput label="render Tooltip Trigger HTML"><Tooltip.Root><Tooltip.Trigger data-testid="tooltip-render" render={<button type="button" />}>Render trigger</Tooltip.Trigger><Tooltip.Portal><Tooltip.Content>Render composition</Tooltip.Content></Tooltip.Portal></Tooltip.Root></RenderedOutput>
            <RenderedOutput label="Native Tooltip Trigger HTML"><Tooltip.Root><Tooltip.Trigger data-testid="tooltip-native">Native trigger</Tooltip.Trigger><Tooltip.Portal><Tooltip.Content>Advanced native span</Tooltip.Content></Tooltip.Portal></Tooltip.Root></RenderedOutput>
          </Grid.Root>
        </Scenario>

        <Scenario {...tooltipScenarios[7]}>
          <VStack className="tooltip-evidence-stack">
            <EvidenceGroup description="Focus or hover each trigger to inspect its same-document portal inside the local light or dark token scope." title="Scoped appearances"><Grid.Root columns={2} className="tooltip-scoped-grid" data-testid="tooltip-appearance"><ScopedTooltip appearance="light" /><ScopedTooltip appearance="dark" /></Grid.Root></EvidenceGroup>
            <EvidenceGroup description="The code names supported hooks and exactly matches the rendered result." title="Consumer customization">
              <EvidenceSurface as="article" className="tooltip-customization" inset="lg"><div><Text as="h4" variant="title-sm">Content CSS properties</Text><Text as="p" tone="secondary" variant="body-sm">Focus or hover the trigger to inspect the customized Content class, slot, native style, and public Tooltip tokens.</Text><PlaygroundCodeBlock aria-label="Tooltip customization example" tabIndex={0}>{`<Tooltip.Content
  className="custom-tooltip"
  data-slot="custom-tooltip"
  style={{
    "--brick-tooltip-background":
      "var(--brick-color-accent-solid)",
    "--brick-tooltip-foreground":
      "var(--brick-color-accent-on-solid)",
    "--brick-tooltip-radius": "0.25rem",
  }}
>
  Customized tooltip
  <Tooltip.Arrow />
</Tooltip.Content>`}</PlaygroundCodeBlock></div><EvidenceSurface className="tooltip-customization__preview"><Tooltip.Provider closeDelay={0} openDelay={0}><Tooltip.Root><Tooltip.Trigger asChild><Button tone="neutral" variant="outline">Custom trigger</Button></Tooltip.Trigger><Tooltip.Portal><Tooltip.Content className="custom-tooltip" data-slot="custom-tooltip" style={customTokens}>Customized tooltip<Tooltip.Arrow /></Tooltip.Content></Tooltip.Portal></Tooltip.Root></Tooltip.Provider></EvidenceSurface></EvidenceSurface>
            </EvidenceGroup>
          </VStack>
        </Scenario>

        <Scenario {...tooltipScenarios[8]}>
          <VStack className="tooltip-evidence-stack" data-testid="tooltip-stress">
            <EvidenceGroup description="Long accessible and visible content remains inside a 20rem application-owned frame." title="Constrained-width stress"><EvidenceSurface className="tooltip-stress-panel"><div className="tooltip-phone-frame"><Hint label="Search projects, files, and localized workspace commands" side="bottom" /></div></EvidenceSurface></EvidenceGroup>
            <EvidenceGroup description="Tooltip inherits genuine right-to-left content and remains within the dynamic viewport." title="RTL inheritance"><EvidenceSurface className="tooltip-stress-panel"><div className="tooltip-phone-frame" dir="rtl"><Hint label="البحث في المشاريع والملفات" side="bottom" /></div></EvidenceSurface></EvidenceGroup>
          </VStack>
        </Scenario>
      </VStack>
    </Tooltip.Provider>
  );
}
