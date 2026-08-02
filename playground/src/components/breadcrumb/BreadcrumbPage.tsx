import { useState, type CSSProperties, type ReactNode } from "react";
import {
  Breadcrumb,
  Grid,
  Icon,
  Text,
  VStack,
  type BreadcrumbSize,
  type BreadcrumbVariant,
} from "@flowstack-ui/brick";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import {
  FormEvidenceCell as Cell,
  FormEvidenceGroup as EvidenceGroup,
  FormRenderedOutput as RenderedOutput,
} from "../../shared/FormEvidence.js";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import "../../shared/forms-evidence.playground.css";
import "./breadcrumb.playground.css";

const sizes: BreadcrumbSize[] = ["sm", "md", "lg"];
const variants: BreadcrumbVariant[] = ["plain", "underline"];
const customTokens = {
  "--brick-breadcrumb-foreground": "#6b2f88",
  "--brick-breadcrumb-current-foreground": "#18794e",
  "--brick-breadcrumb-list-gap": "0.75rem",
  "--brick-breadcrumb-decoration-thickness": "0.16em",
} as CSSProperties;

function HomeGraphic() {
  return <svg viewBox="0 0 24 24"><path d="M4 11 12 4l8 7v9h-5v-6H9v6H4Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" /></svg>;
}

function ChevronGraphic() {
  return <svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>;
}

function Trail({
  ariaLabel,
  current = "Quarterly report",
  homeContent = "Home",
  separator,
  size = "md",
  variant = "plain",
}: {
  ariaLabel: string;
  current?: string;
  homeContent?: ReactNode;
  separator?: ReactNode;
  size?: BreadcrumbSize;
  variant?: BreadcrumbVariant;
}) {
  return (
    <Breadcrumb.Root ariaLabel={ariaLabel} size={size} variant={variant}>
      <Breadcrumb.List>
        <Breadcrumb.Item><Breadcrumb.Link href="#breadcrumb-home">{homeContent}</Breadcrumb.Link></Breadcrumb.Item>
        <Breadcrumb.Separator>{separator}</Breadcrumb.Separator>
        <Breadcrumb.Item><Breadcrumb.Link href="#breadcrumb-projects">Projects</Breadcrumb.Link></Breadcrumb.Item>
        <Breadcrumb.Separator>{separator}</Breadcrumb.Separator>
        <Breadcrumb.Item><Breadcrumb.Page>{current}</Breadcrumb.Page></Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
}

export const breadcrumbScenarios = [
  { description: "Breadcrumb’s default is one medium plain hierarchy with two native ancestor links and one current page.", id: "breadcrumb.overview", number: 1, title: "Overview" },
  { description: "Plain and underline change only the resting ancestor-link decoration; hierarchy, content, size, and spacing stay identical.", id: "breadcrumb.variants", number: 2, title: "Variants" },
  { description: "Small, medium, and large change shared typography, spacing, and separator metrics only.", id: "breadcrumb.sizes", number: 3, title: "Sizes" },
  { description: "Custom decorative separators, contextual icons, and long localized titles remain within the same compound anatomy.", id: "breadcrumb.content", number: 4, title: "Content" },
  { description: "Ellipsis remains explicit: it can describe collapsed levels or compose a named control that reveals application-owned items.", id: "breadcrumb.collapse", navigationTitle: "Collapse", number: 5, title: "Collapse composition" },
  { description: "Ancestor links preserve native destination attributes while Page remains the non-link current location.", id: "breadcrumb.native", navigationTitle: "Links", number: 6, title: "Native links" },
  { description: "render and asChild replace final hosts while retaining landmark, hierarchy, links, current state, hidden separators, classes, and slots.", id: "breadcrumb.composition", navigationTitle: "Compose", number: 7, title: "Composition" },
  { description: "Adjacent appearance scopes preserve defaults; supported variables visibly customize one exact trail and match the shown code.", id: "breadcrumb.appearance", navigationTitle: "Theme", number: 8, title: "Appearance and customization" },
  { description: "Long paths wrap inside narrow widths, while genuine RTL content retains logical hierarchy without mirrored text.", id: "breadcrumb.stress", navigationTitle: "Stress", number: 9, title: "Responsive and RTL" },
] as const satisfies readonly ScenarioDefinition[];

export function BreadcrumbPage() {
  const [expanded, setExpanded] = useState(false);

  return (
    <VStack className="forms-page breadcrumb-page" data-component-page="breadcrumb" data-testid="breadcrumb-workbench">
      <Scenario {...breadcrumbScenarios[0]}>
        <EvidenceSurface className="forms-overview" data-testid="breadcrumb-overview" inset="lg"><Trail ariaLabel="Overview path" /></EvidenceSurface>
      </Scenario>

      <Scenario {...breadcrumbScenarios[1]}>
        <Grid.Root columns={2} className="forms-grid forms-grid--two" data-testid="breadcrumb-variants">
          {variants.map((variant) => <Cell key={variant} label={variant}><Trail ariaLabel={`${variant} variant path`} variant={variant} /></Cell>)}
        </Grid.Root>
      </Scenario>

      <Scenario {...breadcrumbScenarios[2]}>
        <Grid.Root columns={3} className="forms-grid forms-grid--three" data-testid="breadcrumb-sizes">
          {sizes.map((size) => <Cell key={size} label={size}><Trail ariaLabel={`${size} size path`} size={size} /></Cell>)}
        </Grid.Root>
      </Scenario>

      <Scenario {...breadcrumbScenarios[3]}>
        <Grid.Root columns={3} className="forms-grid forms-grid--three forms-grid--preview-start" data-testid="breadcrumb-content">
          <Cell label="custom separator"><Trail ariaLabel="Custom separator path" separator={<Icon directional size="xs"><ChevronGraphic /></Icon>} /></Cell>
          <Cell label="contextual icon"><Trail ariaLabel="Icon content path" homeContent={<><Icon size="xs"><HomeGraphic /></Icon><span>Home</span></>} /></Cell>
          <Cell label="long title"><Trail ariaLabel="Long content path" current="Internationalized publishing workspace ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" /></Cell>
        </Grid.Root>
      </Scenario>

      <Scenario {...breadcrumbScenarios[4]}>
        <Grid.Root columns={2} className="forms-grid forms-grid--two forms-grid--preview-start" data-testid="breadcrumb-collapse">
          <Cell label="static ellipsis">
            <Breadcrumb.Root ariaLabel="Static collapsed path"><Breadcrumb.List><Breadcrumb.Item><Breadcrumb.Link href="#breadcrumb-home">Home</Breadcrumb.Link></Breadcrumb.Item><Breadcrumb.Separator /><Breadcrumb.Item><Breadcrumb.Ellipsis aria-label="Two collapsed pages" /></Breadcrumb.Item><Breadcrumb.Separator /><Breadcrumb.Item><Breadcrumb.Page>Quarterly report</Breadcrumb.Page></Breadcrumb.Item></Breadcrumb.List></Breadcrumb.Root>
          </Cell>
          <Cell label="interactive ellipsis">
            <VStack gap="2">
              <Breadcrumb.Root ariaLabel="Interactive collapsed path"><Breadcrumb.List><Breadcrumb.Item><Breadcrumb.Link href="#breadcrumb-home">Home</Breadcrumb.Link></Breadcrumb.Item><Breadcrumb.Separator />{expanded ? <><Breadcrumb.Item><Breadcrumb.Link href="#breadcrumb-library">Library</Breadcrumb.Link></Breadcrumb.Item><Breadcrumb.Separator /><Breadcrumb.Item><Breadcrumb.Link href="#breadcrumb-reports">Reports</Breadcrumb.Link></Breadcrumb.Item><Breadcrumb.Separator /></> : <><Breadcrumb.Item><Breadcrumb.Ellipsis asChild><button type="button" aria-label="Show two collapsed pages" onClick={() => setExpanded(true)}>…</button></Breadcrumb.Ellipsis></Breadcrumb.Item><Breadcrumb.Separator /></>}<Breadcrumb.Item><Breadcrumb.Page>Quarterly report</Breadcrumb.Page></Breadcrumb.Item></Breadcrumb.List></Breadcrumb.Root>
              <output><Text as="span" tone="secondary" variant="body-sm">{expanded ? "Two ancestor pages shown" : "Two ancestor pages collapsed"}</Text></output>
            </VStack>
          </Cell>
        </Grid.Root>
      </Scenario>

      <Scenario {...breadcrumbScenarios[5]}>
        <Grid.Root columns={2} className="forms-grid forms-grid--two" data-testid="breadcrumb-native">
          <Cell label="target and rel"><Breadcrumb.Root ariaLabel="External reference path"><Breadcrumb.List><Breadcrumb.Item><Breadcrumb.Link href="https://example.com" rel="noopener" target="_blank">Reference (new tab)</Breadcrumb.Link></Breadcrumb.Item><Breadcrumb.Separator /><Breadcrumb.Item><Breadcrumb.Page>Details</Breadcrumb.Page></Breadcrumb.Item></Breadcrumb.List></Breadcrumb.Root></Cell>
          <Cell label="download"><Breadcrumb.Root ariaLabel="Export path"><Breadcrumb.List><Breadcrumb.Item><Breadcrumb.Link download="report.csv" href="data:text/csv,name%0AReport">Download report</Breadcrumb.Link></Breadcrumb.Item><Breadcrumb.Separator /><Breadcrumb.Item><Breadcrumb.Page>Export details</Breadcrumb.Page></Breadcrumb.Item></Breadcrumb.List></Breadcrumb.Root></Cell>
        </Grid.Root>
      </Scenario>

      <Scenario {...breadcrumbScenarios[6]}>
        <VStack className="forms-evidence-stack" data-testid="breadcrumb-composition">
          <EvidenceGroup description="render supplies semantic hosts while every Brick part retains its class, slot, and Atom-owned attributes." title="render output"><RenderedOutput label="Rendered Breadcrumb HTML"><Breadcrumb.Root ariaLabel="Rendered path" data-adapter="render-root" render={<nav />}><Breadcrumb.List data-adapter="render-list" render={<ol />}><Breadcrumb.Item render={<li />}><Breadcrumb.Link href="#rendered" data-adapter="render-link" render={<a />}>Rendered ancestor</Breadcrumb.Link></Breadcrumb.Item><Breadcrumb.Separator data-adapter="render-separator" render={<li />}>›</Breadcrumb.Separator><Breadcrumb.Item render={<li />}><Breadcrumb.Page data-adapter="render-page" render={<Text as="span" weight="semibold">{null}</Text>}>Rendered page</Breadcrumb.Page></Breadcrumb.Item></Breadcrumb.List></Breadcrumb.Root></RenderedOutput></EvidenceGroup>
          <EvidenceGroup description="asChild merges the same hierarchy into consumer hosts without adding wrappers or losing native semantics." title="asChild output"><RenderedOutput label="Composed Breadcrumb HTML"><Breadcrumb.Root ariaLabel="Composed path" asChild><nav data-adapter="composed-root"><Breadcrumb.List asChild><ol data-adapter="composed-list"><Breadcrumb.Item asChild><li><Breadcrumb.Link asChild><a href="#composed" data-adapter="composed-link">Composed ancestor</a></Breadcrumb.Link></li></Breadcrumb.Item><Breadcrumb.Separator asChild><li data-adapter="composed-separator">/</li></Breadcrumb.Separator><Breadcrumb.Item asChild><li><Breadcrumb.Page asChild><span data-adapter="composed-page">Composed page</span></Breadcrumb.Page></li></Breadcrumb.Item></ol></Breadcrumb.List></nav></Breadcrumb.Root></RenderedOutput></EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...breadcrumbScenarios[7]}>
        <VStack className="forms-evidence-stack">
          <EvidenceGroup description="The same default medium plain trail composes inside adjacent local appearance scopes." title="Scoped appearances"><Grid.Root columns={2} className="forms-scoped-grid" data-testid="breadcrumb-appearance"><EvidenceSurface data-brick-appearance="light"><SpecimenLabel>Light</SpecimenLabel><Trail ariaLabel="Light appearance path" /></EvidenceSurface><EvidenceSurface data-brick-appearance="dark"><SpecimenLabel>Dark</SpecimenLabel><Trail ariaLabel="Dark appearance path" /></EvidenceSurface></Grid.Root></EvidenceGroup>
          <EvidenceGroup description="The code names supported hooks and exactly matches the purple ancestors, green current page, wider spacing, and thicker underline." title="Consumer customization"><EvidenceSurface as="article" className="forms-customization" inset="lg"><div><Text as="h4" variant="title-sm">Hierarchy properties</Text><Text as="p" tone="secondary" variant="body-sm">Public variables customize paint, rhythm, and decoration without replacing hierarchy semantics.</Text><PlaygroundCodeBlock aria-label="Breadcrumb customization example" tabIndex={0}>{`<Breadcrumb.Root\n  variant="underline"\n  style={{\n    "--brick-breadcrumb-foreground": "#6b2f88",\n    "--brick-breadcrumb-current-foreground": "#18794e",\n    "--brick-breadcrumb-list-gap": "0.75rem",\n    "--brick-breadcrumb-decoration-thickness": "0.16em",\n  }}\n>`}</PlaygroundCodeBlock></div><EvidenceSurface className="forms-customization__preview"><div><Breadcrumb.Root ariaLabel="Customized path" style={customTokens} variant="underline"><Breadcrumb.List><Breadcrumb.Item><Breadcrumb.Link href="#custom-home">Home</Breadcrumb.Link></Breadcrumb.Item><Breadcrumb.Separator /><Breadcrumb.Item><Breadcrumb.Link href="#custom-projects">Projects</Breadcrumb.Link></Breadcrumb.Item><Breadcrumb.Separator /><Breadcrumb.Item><Breadcrumb.Page>Quarterly report</Breadcrumb.Page></Breadcrumb.Item></Breadcrumb.List></Breadcrumb.Root></div></EvidenceSurface></EvidenceSurface></EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...breadcrumbScenarios[8]}>
        <VStack className="forms-evidence-stack" data-testid="breadcrumb-stress">
          <EvidenceGroup description="The complete long hierarchy wraps without clipping inside a 20rem application-owned frame." title="Constrained-width stress"><EvidenceSurface className="forms-stress-panel"><div className="forms-phone-frame"><Breadcrumb.Root ariaLabel="Constrained path"><Breadcrumb.List><Breadcrumb.Item><Breadcrumb.Link href="#workspace">Publishing workspace</Breadcrumb.Link></Breadcrumb.Item><Breadcrumb.Separator /><Breadcrumb.Item><Breadcrumb.Link href="#international">International account administration</Breadcrumb.Link></Breadcrumb.Item><Breadcrumb.Separator /><Breadcrumb.Item><Breadcrumb.Page>Quarterly performance and compliance report</Breadcrumb.Page></Breadcrumb.Item></Breadcrumb.List></Breadcrumb.Root></div></EvidenceSurface></EvidenceGroup>
          <EvidenceGroup description="Genuine right-to-left text keeps ancestor-to-current DOM order while the directional custom separator mirrors through Brick Icon." title="RTL inheritance"><EvidenceSurface className="forms-stress-panel"><div className="forms-phone-frame" dir="rtl"><Breadcrumb.Root ariaLabel="مسار الصفحة"><Breadcrumb.List><Breadcrumb.Item><Breadcrumb.Link href="#rtl-home">الرئيسية</Breadcrumb.Link></Breadcrumb.Item><Breadcrumb.Separator><Icon directional size="xs"><ChevronGraphic /></Icon></Breadcrumb.Separator><Breadcrumb.Item><Breadcrumb.Link href="#rtl-projects">المشاريع</Breadcrumb.Link></Breadcrumb.Item><Breadcrumb.Separator><Icon directional size="xs"><ChevronGraphic /></Icon></Breadcrumb.Separator><Breadcrumb.Item><Breadcrumb.Page>التقرير الفصلي</Breadcrumb.Page></Breadcrumb.Item></Breadcrumb.List></Breadcrumb.Root></div></EvidenceSurface></EvidenceGroup>
        </VStack>
      </Scenario>
    </VStack>
  );
}
