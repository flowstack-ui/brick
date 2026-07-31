import { type CSSProperties, type ReactNode } from "react";
import {
  Button,
  Grid,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
  type IconSize,
  type IconTone,
} from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import { Scenario } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./icon.playground.css";

function SearchGraphic() {
  return <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" strokeWidth="2"/><path d="m16 16 4 4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2"/></svg>;
}

function ArrowGraphic() {
  return <svg viewBox="0 0 24 24"><path d="M5 12h14m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>;
}

function BrandGraphic() {
  return <svg viewBox="0 0 24 24"><path d="M4 5h9v9H4z" fill="#7c3aed"/><circle cx="16.5" cy="16.5" r="4.5" fill="#22c55e"/></svg>;
}

function Cell({ children, label }: { children: ReactNode; label: string }) {
  return <EvidenceSurface className="icon-cell"><SpecimenLabel>{label}</SpecimenLabel><div className="icon-cell__preview">{children}</div></EvidenceSurface>;
}

const sizes: IconSize[] = ["2xs", "xs", "sm", "md", "lg", "xl"];
const tones: IconTone[] = ["inherit", "primary", "secondary", "muted", "accent", "info", "success", "warning", "danger"];
const customStyle = { "--brick-icon-size": "3rem", "--brick-icon-color": "#6b2f88" } as CSSProperties;

export const iconScenarios = [
  { id: "icon.overview", number: 1, title: "Overview", description: "Icon’s canonical rendering is one decorative medium SVG that inherits the surrounding foreground." },
  { id: "icon.accessibility", number: 2, title: "Accessibility", description: "Decorative, direct-label, and label-reference modes change accessibility output without changing the graphic recipe." },
  { id: "icon.sizes", number: 3, title: "Sizes", description: "Six closed sizes change only the square visual dimensions of the same decorative inherited graphic." },
  { id: "icon.tones", number: 4, title: "Tones", description: "Semantic foreground tones change only currentColor; the same default-size source stays comparable." },
  { id: "icon.sources", number: 5, title: "SVG sources", navigationTitle: "Sources", description: "Inline SVG, a reusable React SVG component, and intentionally fixed multicolor fills remain consumer-owned sources." },
  { id: "icon.composition", number: 6, title: "Composition", description: "The wrapper, SVG-only asChild host, inline text, and named controls preserve their respective ownership." },
  { id: "icon.direction", number: 7, title: "Direction", description: "Only explicitly directional graphics mirror in RTL; non-directional graphics remain unchanged." },
  { id: "icon.appearance", number: 8, title: "Appearance and customization", navigationTitle: "Theme", description: "Semantic tones adapt to appearance while documented properties visibly customize size and foreground." },
  { id: "icon.stress", number: 9, title: "Responsive and stress", navigationTitle: "Stress", description: "Small containers, large icons, long referenced labels, zoom, and forced colors remain contained and understandable." },
] as const;

export function IconPage() {
  return <VStack className="icon-page" data-component-page="icon">
    <Scenario {...iconScenarios[0]}><EvidenceSurface className="icon-hero"><Icon><SearchGraphic /></Icon></EvidenceSurface></Scenario>
    <Scenario {...iconScenarios[1]}><Grid.Root columns={3} className="icon-grid"><Cell label="decorative"><Icon data-testid="icon-decorative"><SearchGraphic /></Icon></Cell><Cell label="direct label"><Icon label="Search"><SearchGraphic /></Icon></Cell><Cell label="label reference"><Text id="icon-warning-label" variant="body-sm">System warning</Text><Icon aria-labelledby="icon-warning-label" tone="warning"><SearchGraphic /></Icon></Cell></Grid.Root><RenderedOutput label="Informative Icon HTML"><Icon label="Search"><SearchGraphic /></Icon></RenderedOutput></Scenario>
    <Scenario {...iconScenarios[2]}><Grid.Root columns={6} className="icon-grid icon-grid--sizes">{sizes.map((size) => <Cell key={size} label={size}><Icon size={size}><SearchGraphic /></Icon></Cell>)}</Grid.Root></Scenario>
    <Scenario {...iconScenarios[3]}><Grid.Root columns={3} className="icon-grid">{tones.map((tone) => <Cell key={tone} label={tone}><Icon tone={tone}><SearchGraphic /></Icon></Cell>)}</Grid.Root></Scenario>
    <Scenario {...iconScenarios[4]}><Grid.Root columns={3} className="icon-grid"><Cell label="inline SVG"><Icon><svg viewBox="0 0 24 24"><path d="M5 12h14" stroke="currentColor" strokeWidth="2"/></svg></Icon></Cell><Cell label="React component"><Icon><SearchGraphic /></Icon></Cell><Cell label="fixed multicolor"><Icon><BrandGraphic /></Icon></Cell></Grid.Root></Scenario>
    <Scenario {...iconScenarios[5]}><VStack gap="4"><Grid.Root columns={2} className="icon-grid"><Cell label="default wrapper"><Icon><SearchGraphic /></Icon></Cell><Cell label="SVG asChild"><Icon asChild tone="success"><svg data-source="composed" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2"/></svg></Icon></Cell><Cell label="inline with Text"><Text><Icon size="xs"><SearchGraphic /></Icon> Search projects</Text></Cell><Cell label="named controls"><HStack gap="3"><Button startIcon={<Icon size="xs"><SearchGraphic /></Icon>}>Search</Button><IconButton aria-label="Search"><Icon><SearchGraphic /></Icon></IconButton></HStack></Cell></Grid.Root><RenderedOutput label="Composed SVG HTML"><Icon asChild tone="success"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/></svg></Icon></RenderedOutput></VStack></Scenario>
    <Scenario {...iconScenarios[6]}><Grid.Root columns={2} className="icon-grid"><Cell label="LTR"><HStack gap="4"><Icon directional><ArrowGraphic /></Icon><Icon><SearchGraphic /></Icon></HStack></Cell><Cell label="RTL"><HStack dir="rtl" gap="4"><Icon directional><ArrowGraphic /></Icon><Icon><SearchGraphic /></Icon></HStack></Cell></Grid.Root></Scenario>
    <Scenario {...iconScenarios[7]}><VStack gap="4"><Grid.Root columns={2} className="icon-grid"><EvidenceSurface data-brick-appearance="light"><SpecimenLabel>light</SpecimenLabel><Icon tone="accent"><SearchGraphic /></Icon></EvidenceSurface><EvidenceSurface data-brick-appearance="dark"><SpecimenLabel>dark</SpecimenLabel><Icon tone="accent"><SearchGraphic /></Icon></EvidenceSurface></Grid.Root><EvidenceSurface className="playground-customization-evidence" inset="none"><Grid.Root columns={2} className="icon-customization playground-customization-layout" gap="0"><VStack gap="3"><Text as="h3" variant="title-sm">Icon CSS properties</Text><Text tone="secondary" variant="body-sm">The preview sets a custom 3rem size and purple foreground.</Text><PlaygroundCodeBlock tabIndex={0}>{`--brick-icon-size: 3rem;\n--brick-icon-color: #6b2f88;`}</PlaygroundCodeBlock></VStack><div className="icon-customization__preview"><Icon style={customStyle}><SearchGraphic /></Icon></div></Grid.Root></EvidenceSurface></VStack></Scenario>
    <Scenario {...iconScenarios[8]}><Grid.Root columns={2} className="icon-grid"><Cell label="narrow frame"><div className="icon-narrow-frame"><Icon size="xl" tone="accent"><SearchGraphic /></Icon></div></Cell><Cell label="long referenced label"><Text id="icon-long-label" variant="body-sm">تنبيه مهم لمساحة العمل المشتركة ذات الاسم الطويل</Text><Icon aria-labelledby="icon-long-label" tone="danger"><SearchGraphic /></Icon></Cell></Grid.Root></Scenario>
  </VStack>;
}
