import { useState, type CSSProperties, type ReactNode } from "react";
import {
  Badge,
  Container,
  Grid,
  NavList,
  Text,
  VStack,
  type NavListSize,
  type NavListTone,
  type NavListVariant,
} from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./nav-list.playground.css";

const variants: NavListVariant[] = ["soft", "solid", "outline"];
const tones: NavListTone[] = ["accent", "neutral"];
const sizes: NavListSize[] = ["sm", "md", "lg"];

function DotIcon() {
  return <svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="4" fill="currentColor" /></svg>;
}

function ArrowIcon() {
  return <svg viewBox="0 0 16 16"><path d="m6 3 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>;
}

function BasicList({ disabled = false }: { disabled?: boolean }) {
  return (
    <NavList.List>
      <NavList.Item><NavList.Link href="#workspace" active>Workspace</NavList.Link></NavList.Item>
      <NavList.Item><NavList.Link href="#members">Members</NavList.Link></NavList.Item>
      <NavList.Item><NavList.Link disabled={disabled} href="#billing">Billing</NavList.Link></NavList.Item>
    </NavList.List>
  );
}

function Cell({ children, label }: { children: ReactNode; label: string }) {
  return <EvidenceSurface className="nav-list-cell"><SpecimenLabel>{label}</SpecimenLabel>{children}</EvidenceSurface>;
}

export const navListScenarios = [
  { id: "nav-list.overview", number: 1, title: "Overview", description: "Nav List’s canonical rendering is a vertical soft accent list at the medium size, with one current destination." },
  { id: "nav-list.variants", number: 2, title: "Variants", description: "Soft, solid, and outline change only the current-destination treatment; content, tone, and size remain at their defaults." },
  { id: "nav-list.tones", number: 3, title: "Tones", description: "Accent and neutral are compared across every variant while the destinations and current state remain identical." },
  { id: "nav-list.sizes", number: 4, title: "Sizes", description: "Small, medium, and large change only row density and type scale." },
  { id: "nav-list.content", number: 5, title: "Content and states", navigationTitle: "Content", description: "Leading and trailing content, descriptions, current state, and disabled behavior remain aligned inside the same navigation anatomy." },
  { id: "nav-list.sections", number: 6, title: "Sections and disclosure", navigationTitle: "Sections", description: "Labeled sections and controlled or uncontrolled disclosure preserve native button and region relationships." },
  { id: "nav-list.composition", number: 7, title: "Composition and output", navigationTitle: "Composition", description: "Ordered lists and composed links retain the semantic output and state attributes owned by Atom." },
  { id: "nav-list.appearance", number: 8, title: "Appearance and customization", navigationTitle: "Theme", description: "Semantic tokens adapt across appearance scopes; public CSS properties customize the actual navigation rows." },
  { id: "nav-list.stress", number: 9, title: "Responsive and RTL", navigationTitle: "Stress", description: "Horizontal wrapping, narrow localized labels, and RTL logical icon order remain contained." },
] as const satisfies readonly ScenarioDefinition[];

export function NavListPage() {
  const [sectionOpen, setSectionOpen] = useState(true);
  const customStyle = {
    "--brick-nav-list-row-radius": "0.25rem",
    "--brick-nav-list-current-border": "var(--brick-color-accent-solid)",
    "--brick-nav-list-link-surface-current": "var(--brick-color-surface-raised)",
  } as CSSProperties;

  return (
    <VStack className="nav-list-page" data-component-page="nav-list">
      <Scenario {...navListScenarios[0]}><EvidenceSurface data-testid="nav-list-overview"><NavList.Root aria-label="Workspace navigation"><BasicList /></NavList.Root></EvidenceSurface></Scenario>
      <Scenario {...navListScenarios[1]}><Grid.Root columns={3} className="nav-list-grid">{variants.map((variant) => <Cell key={variant} label={variant}><NavList.Root aria-label={`${variant} navigation`} variant={variant}><BasicList /></NavList.Root></Cell>)}</Grid.Root></Scenario>
      <Scenario {...navListScenarios[2]}><VStack gap="4">{variants.map((variant) => <VStack gap="2" key={variant}><Text as="h3" variant="title-sm">{variant[0].toUpperCase() + variant.slice(1)} tones</Text><Grid.Root columns={2} className="nav-list-grid">{tones.map((tone) => <Cell key={tone} label={tone}><NavList.Root aria-label={`${tone} ${variant} navigation`} tone={tone} variant={variant}><BasicList /></NavList.Root></Cell>)}</Grid.Root></VStack>)}</VStack></Scenario>
      <Scenario {...navListScenarios[3]}><Grid.Root columns={3} className="nav-list-grid">{sizes.map((size) => <Cell key={size} label={size}><NavList.Root aria-label={`${size} navigation`} size={size}><BasicList /></NavList.Root></Cell>)}</Grid.Root></Scenario>
      <Scenario {...navListScenarios[4]}><Grid.Root columns={2} className="nav-list-grid"><Cell label="icons and description"><NavList.Root aria-label="Project navigation"><NavList.List><NavList.Item><NavList.Link active description="Project status and activity" endIcon={<ArrowIcon />} href="#overview" startIcon={<DotIcon />}>Overview</NavList.Link></NavList.Item><NavList.Item><NavList.Link description="People with access" endIcon={<ArrowIcon />} href="#team" startIcon={<DotIcon />}>Team</NavList.Link></NavList.Item></NavList.List></NavList.Root></Cell><Cell label="current and disabled"><NavList.Root aria-label="Account navigation"><BasicList disabled /></NavList.Root></Cell></Grid.Root></Scenario>
      <Scenario {...navListScenarios[5]}><Grid.Root columns={2} className="nav-list-grid"><Cell label="labeled section"><NavList.Root aria-label="Settings"><NavList.Section><NavList.SectionLabel>Account</NavList.SectionLabel><NavList.SectionContent><BasicList /></NavList.SectionContent></NavList.Section></NavList.Root></Cell><Cell label="controlled disclosure"><NavList.Root aria-label="Documentation"><NavList.Section collapsible open={sectionOpen} onOpenChange={setSectionOpen}><NavList.SectionTrigger>Foundations</NavList.SectionTrigger><NavList.SectionContent><BasicList /></NavList.SectionContent></NavList.Section></NavList.Root></Cell></Grid.Root></Scenario>
      <Scenario {...navListScenarios[6]}><VStack gap="4"><RenderedOutput label="Ordered Nav List HTML"><NavList.Root aria-label="Setup steps"><NavList.List ordered><NavList.Item><NavList.Link active href="#install">Install</NavList.Link></NavList.Item><NavList.Item><NavList.Link href="#configure">Configure</NavList.Link></NavList.Item></NavList.List></NavList.Root></RenderedOutput><RenderedOutput label="Composed Nav List link HTML"><NavList.Root aria-label="Composed navigation"><NavList.List><NavList.Item><NavList.Link active asChild><a href="#composed">Composed destination</a></NavList.Link></NavList.Item></NavList.List></NavList.Root></RenderedOutput></VStack></Scenario>
      <Scenario {...navListScenarios[7]}><VStack gap="4"><Grid.Root columns={2} className="nav-list-grid"><EvidenceSurface data-brick-appearance="light"><NavList.Root aria-label="Light navigation"><BasicList /></NavList.Root></EvidenceSurface><EvidenceSurface data-brick-appearance="dark"><NavList.Root aria-label="Dark navigation"><BasicList /></NavList.Root></EvidenceSurface></Grid.Root><EvidenceSurface className="nav-list-customization"><VStack gap="3"><Text as="h3" variant="title-sm">Nav List CSS properties</Text><Text tone="secondary" variant="body-sm">Sharper rows, stronger current border, and a raised current surface use documented public variables.</Text><PlaygroundCodeBlock tabIndex={0}>--brick-nav-list-row-radius; --brick-nav-list-current-border; --brick-nav-list-link-surface-current</PlaygroundCodeBlock><NavList.Root aria-label="Customized navigation" style={customStyle} variant="outline"><BasicList /></NavList.Root></VStack></EvidenceSurface></VStack></Scenario>
      <Scenario {...navListScenarios[8]}><Container gutter="sm" measure="narrow"><Grid.Root columns={2} className="nav-list-grid"><Cell label="horizontal wrap"><NavList.Root aria-label="Product navigation" orientation="horizontal"><BasicList /></NavList.Root></Cell><Cell label="RTL and long content"><NavList.Root aria-label="التنقل" dir="rtl"><NavList.List><NavList.Item><NavList.Link active endIcon={<ArrowIcon />} href="#one" startIcon={<DotIcon />}>مساحة العمل الدولية ذات الاسم الطويل</NavList.Link></NavList.Item><NavList.Item><NavList.Link href="#two">أعضاء الفريق</NavList.Link></NavList.Item></NavList.List></NavList.Root></Cell></Grid.Root></Container></Scenario>
    </VStack>
  );
}
