import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Button, Code, Grid, HStack, Text, VStack, type CodeSize, type CodeTone, type CodeVariant } from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./code.playground.css";

const variants: CodeVariant[] = ["subtle", "plain"];
const tones: CodeTone[] = ["neutral", "inherit"];
const sizes: CodeSize[] = ["inherit", "sm", "md"];
const sample = "aria-label";

function Cell({ children, label }: { children: ReactNode; label: string }) {
  return <EvidenceSurface className="code-cell"><SpecimenLabel>{label}</SpecimenLabel><div className="code-cell__preview">{children}</div></EvidenceSurface>;
}

export const codeScenarios = [
  { id: "code.overview", number: 1, title: "Overview", description: "The canonical Code is one native inline code element using the subtle neutral recipe, inherited size, and a short technical literal." },
  { id: "code.variants", number: 2, title: "Variants", description: "Subtle and plain change only surface treatment while content, neutral tone, and inherited size remain default." },
  { id: "code.tones", number: 3, title: "Tones", description: "Neutral and inherited foreground change only color ownership while the subtle variant and inherited size remain default." },
  { id: "code.sizes", number: 4, title: "Sizes", description: "Inherited, small, and medium change only typography size around identical content." },
  { id: "code.context", number: 5, title: "Inline context", navigationTitle: "Context", description: "Code participates inside real prose, inherits surrounding metrics, and safely wraps one long technical token." },
  { id: "code.native", number: 6, title: "Native attributes and output", navigationTitle: "Native", description: "Native attributes, semantic children, events, slots, styles, and the code-element ref pass through with exact rendered output." },
  { id: "code.appearance", number: 7, title: "Appearance and customization", navigationTitle: "Theme", description: "Default recipes adapt across appearance scopes, while one specimen changes only documented Code CSS properties." },
  { id: "code.stress", number: 8, title: "Responsive and RTL", navigationTitle: "Stress", description: "Long tokens, narrow widths, RTL prose with LTR literals, text spacing, zoom, and forced colors remain readable and contained." },
] as const satisfies readonly ScenarioDefinition[];

export function CodePage() {
  const ref = useRef<HTMLElement>(null);
  const [host, setHost] = useState("not inspected");
  const custom = { "--brick-code-background": "#e8def8", "--brick-code-border-color": "#6750a4", "--brick-code-foreground": "#3f1d78", "--brick-code-radius": "0.5rem" } as CSSProperties;
  return <VStack className="code-page" data-component-page="code" gap="6">
    <Scenario {...codeScenarios[0]}><EvidenceSurface data-testid="code-overview" inset="lg"><Text as="p">Use <Code>{sample}</Code> for the accessible name.</Text></EvidenceSurface></Scenario>
    <Scenario {...codeScenarios[1]}><Grid.Root className="code-grid" columns={2} data-testid="code-variants">{variants.map((variant) => <Cell key={variant} label={variant}><Code variant={variant}>{sample}</Code></Cell>)}</Grid.Root></Scenario>
    <Scenario {...codeScenarios[2]}><Grid.Root className="code-grid" columns={2} data-testid="code-tones">{tones.map((tone) => <Cell key={tone} label={tone}><Code tone={tone}>{sample}</Code></Cell>)}</Grid.Root></Scenario>
    <Scenario {...codeScenarios[3]}><Grid.Root className="code-grid" columns={3} data-testid="code-sizes">{sizes.map((size) => <Cell key={size} label={size}><Code size={size}>{sample}</Code></Cell>)}</Grid.Root></Scenario>
    <Scenario {...codeScenarios[4]}><Grid.Root className="code-grid" columns={2} data-testid="code-context"><Cell label="body-md context"><Text as="p">Set <Code>data-state</Code> on the rendered host.</Text></Cell><Cell label="long token"><Text as="p"><Code>--brick-code-extremely-long-custom-property-name-that-must-wrap-safely</Code></Text></Cell></Grid.Root></Scenario>
    <Scenario {...codeScenarios[5]}><VStack gap="4" data-testid="code-native"><RenderedOutput label="Code HTML"><Code aria-label="CSS property" className="consumer-code" data-owner="playground" id="code-native-property" ref={ref} slot="property"><span>--brick-space-4</span></Code></RenderedOutput><HStack gap="3"><Button onClick={() => setHost(ref.current?.tagName ?? "missing")} tone="neutral" variant="outline">Inspect ref</Button><Text>Ref host: {host}</Text></HStack></VStack></Scenario>
    <Scenario {...codeScenarios[6]}><VStack gap="4"><Grid.Root className="code-grid" columns={2} data-testid="code-appearance"><EvidenceSurface className="code-cell" data-brick-appearance="light"><SpecimenLabel>Light</SpecimenLabel><div className="code-cell__preview"><Code>{sample}</Code></div></EvidenceSurface><EvidenceSurface className="code-cell" data-brick-appearance="dark"><SpecimenLabel>Dark</SpecimenLabel><div className="code-cell__preview"><Code>{sample}</Code></div></EvidenceSurface></Grid.Root><EvidenceSurface className="playground-customization-evidence" inset="none"><Grid.Root className="playground-customization-layout" columns={2} gap="0"><VStack gap="2"><SpecimenLabel>Customized</SpecimenLabel><Text as="h3" variant="title-sm">Code CSS properties</Text><Text tone="secondary" variant="body-sm">The preview uses the exact background, border, foreground, and radius properties shown here.</Text><PlaygroundCodeBlock aria-label="Code customization example">{`.custom-code {
  --brick-code-background: #e8def8;
  --brick-code-border-color: #6750a4;
  --brick-code-foreground: #3f1d78;
  --brick-code-radius: 0.5rem;
}`}</PlaygroundCodeBlock></VStack><div className="playground-customization-preview"><Code style={custom}>custom-token</Code></div></Grid.Root></EvidenceSurface></VStack></Scenario>
    <Scenario {...codeScenarios[7]}><Grid.Root className="code-grid" columns={2} data-testid="code-stress"><Cell label="narrow long token"><div className="code-narrow"><Code>package/really-long-generated-module-name/without-breakpoints.ts</Code></div></Cell><Cell label="RTL prose"><Text as="p" dir="rtl" lang="ar">استخدم <Code dir="ltr">aria-describedby</Code> لربط الوصف.</Text></Cell></Grid.Root></Scenario>
  </VStack>;
}
