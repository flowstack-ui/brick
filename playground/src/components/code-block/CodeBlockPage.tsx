import { useState, type CSSProperties, type ReactNode } from "react";
import { Button, Checkbox, CodeBlock, Frame, Grid, Text, VStack, type CodeBlockSize, type CodeBlockVariant } from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./code-block.playground.css";

const source = `import { Button } from "@flowstack-ui/brick";\n\nexport function SaveAction() {\n  return <Button>Save changes</Button>;\n}`;
const longSource = `const endpoint = "https://api.example.test/projects/flowstack/releases/2026-07-25/artifacts/component-source";`;
const variants: CodeBlockVariant[] = ["subtle", "bordered", "plain"];
const sizes: CodeBlockSize[] = ["sm", "md"];

function Cell({ children, label }: { children: ReactNode; label: string }) { return <EvidenceSurface className="code-block-cell"><SpecimenLabel>{label}</SpecimenLabel><Frame inlineSize="100%" minInlineSize={0}>{children}</Frame></EvidenceSurface>; }
function Basic({ label, ...props }: { label: string } & Partial<React.ComponentProps<typeof CodeBlock.Root>>) { return <CodeBlock.Root value={source} {...props}><CodeBlock.Content aria-label={label} /></CodeBlock.Root>; }

export const codeBlockScenarios = [
  { id: "code-block.overview", number: 1, title: "Overview", description: "The canonical Code Block is a medium subtle technical surface containing one named horizontal Scroll Area and canonical pre/code source." },
  { id: "code-block.variants", number: 2, title: "Variants", description: "Subtle, bordered, and plain change only root surface treatment while size, content, scrolling, and source remain default." },
  { id: "code-block.sizes", number: 3, title: "Sizes", description: "Small and medium change only header/content density and mono size around identical source." },
  { id: "code-block.anatomy", number: 4, title: "Optional anatomy", navigationTitle: "Anatomy", description: "Header, title, explicit language, actions, copy trigger, status, and indicators render only when authored." },
  { id: "code-block.content", number: 5, title: "Content and language", navigationTitle: "Content", description: "Raw strings escape safely; trusted highlighted React nodes remain presentation while Root value stays authoritative for copy." },
  { id: "code-block.overflow", number: 6, title: "Wrapping and overflow", navigationTitle: "Overflow", description: "Scroll preserves source lines in the only focusable viewport; wrap deliberately reflows the identical long source." },
  { id: "code-block.copy", number: 7, title: "Copy states", description: "Atom-backed copy exposes pending, success, rejection, disabled behavior, truthful status, timeout reset, and stable trigger focus." },
  { id: "code-block.appearance", number: 8, title: "Appearance and customization", navigationTitle: "Theme", description: "The complete default adapts across appearance scopes; one block changes only documented Code Block CSS properties." },
  { id: "code-block.stress", number: 9, title: "Responsive and RTL", navigationTitle: "Stress", description: "Mobile widths, many lines, RTL page chrome with LTR source, zoom, text spacing, selection, and forced colors stay contained." },
] as const satisfies readonly ScenarioDefinition[];

export function CodeBlockPage() {
  const [result, setResult] = useState<"success" | "error">("success");
  const [disabled, setDisabled] = useState(false);
  const writer = async () => { await new Promise((resolve) => setTimeout(resolve, 250)); if (result === "error") throw new Error("Playground rejection"); };
  const custom = { "--brick-code-block-background": "#1e1e2e", "--brick-code-block-foreground": "#f5e0dc", "--brick-code-block-border-color": "#cba6f7", "--brick-code-block-radius": "1rem" } as CSSProperties;
  return <VStack className="code-block-page" data-component-page="code-block" gap="6">
    <Scenario {...codeBlockScenarios[0]}><EvidenceSurface inset="lg" data-testid="code-block-overview"><Basic label="Overview Button source" /></EvidenceSurface></Scenario>
    <Scenario {...codeBlockScenarios[1]}><Grid.Root className="code-block-grid" columns={3} data-testid="code-block-variants">{variants.map((variant) => <Cell key={variant} label={variant}><Basic label={`${variant} source`} variant={variant} /></Cell>)}</Grid.Root></Scenario>
    <Scenario {...codeBlockScenarios[2]}><Grid.Root className="code-block-grid" columns={2} data-testid="code-block-sizes">{sizes.map((size) => <Cell key={size} label={size}><Basic label={`${size} source`} size={size} /></Cell>)}</Grid.Root></Scenario>
    <Scenario {...codeBlockScenarios[3]}><EvidenceSurface data-testid="code-block-anatomy"><CodeBlock.Root language="tsx" value={source} writeValue={writer}><CodeBlock.Header><CodeBlock.Title>Button example</CodeBlock.Title><CodeBlock.Language /><CodeBlock.Actions><CodeBlock.CopyTrigger>Copy source</CodeBlock.CopyTrigger></CodeBlock.Actions></CodeBlock.Header><CodeBlock.Content aria-label="Anatomy Button source" /><CodeBlock.CopyStatus><CodeBlock.CopyIndicator when="copying">Copying…</CodeBlock.CopyIndicator><CodeBlock.CopyIndicator when="copied">Copied</CodeBlock.CopyIndicator><CodeBlock.CopyIndicator when="error">Copy failed</CodeBlock.CopyIndicator></CodeBlock.CopyStatus></CodeBlock.Root></EvidenceSurface></Scenario>
    <Scenario {...codeBlockScenarios[4]}><Grid.Root className="code-block-grid" columns={2} data-testid="code-block-content"><Cell label="raw escaped string"><CodeBlock.Root language="html" value={'<Button aria-label="Save" />'}><CodeBlock.Content aria-label="Raw HTML source" /></CodeBlock.Root></Cell><Cell label="highlighted React nodes"><CodeBlock.Root language="tsx" value={source}><CodeBlock.Content aria-label="Highlighted TypeScript source"><span className="code-token-keyword">import</span>{' { Button } from "@flowstack-ui/brick";'}</CodeBlock.Content></CodeBlock.Root></Cell></Grid.Root></Scenario>
    <Scenario {...codeBlockScenarios[5]}><Grid.Root className="code-block-grid" columns={2} data-testid="code-block-overflow"><Cell label="scroll"><CodeBlock.Root value={longSource}><CodeBlock.Content aria-label="Scrollable endpoint source" /></CodeBlock.Root></Cell><Cell label="wrap"><CodeBlock.Root value={longSource}><CodeBlock.Content aria-label="Wrapped endpoint source" wrap="wrap" /></CodeBlock.Root></Cell></Grid.Root></Scenario>
    <Scenario {...codeBlockScenarios[6]}><EvidenceSurface data-testid="code-block-copy"><VStack gap="3"><div className="code-block-test-controls"><Button onClick={() => setResult("success")} size="sm" tone="neutral" variant={result === "success" ? "solid" : "outline"}>Success</Button><Button onClick={() => setResult("error")} size="sm" tone="neutral" variant={result === "error" ? "solid" : "outline"}>Error</Button><Checkbox checked={disabled} onCheckedChange={(checked) => setDisabled(checked === true)} size="sm">Disabled</Checkbox></div><CodeBlock.Root disabled={disabled} language="sh" timeout={1500} value="npm install @flowstack-ui/brick" writeValue={writer}><CodeBlock.Header><CodeBlock.Title>Install command</CodeBlock.Title><CodeBlock.Actions><CodeBlock.CopyTrigger>Copy command</CodeBlock.CopyTrigger></CodeBlock.Actions></CodeBlock.Header><CodeBlock.Content aria-label="Install command source" /><CodeBlock.CopyStatus><CodeBlock.CopyIndicator when="copying">Copying…</CodeBlock.CopyIndicator><CodeBlock.CopyIndicator when="copied">Copied command</CodeBlock.CopyIndicator><CodeBlock.CopyIndicator when="error">Copy failed</CodeBlock.CopyIndicator></CodeBlock.CopyStatus></CodeBlock.Root></VStack></EvidenceSurface></Scenario>
    <Scenario {...codeBlockScenarios[7]}><VStack gap="4"><Grid.Root className="code-block-grid" columns={2} data-testid="code-block-appearance"><EvidenceSurface className="code-block-cell" data-brick-appearance="light"><SpecimenLabel>Light</SpecimenLabel><Basic label="Light source" /></EvidenceSurface><EvidenceSurface className="code-block-cell" data-brick-appearance="dark"><SpecimenLabel>Dark</SpecimenLabel><Basic label="Dark source" /></EvidenceSurface></Grid.Root><EvidenceSurface className="playground-customization-evidence" inset="none"><Grid.Root className="playground-customization-layout" columns={2} gap="0"><VStack gap="2"><SpecimenLabel>Customized</SpecimenLabel><Text as="h3" variant="title-sm">Code Block CSS properties</Text><Text tone="secondary" variant="body-sm">The preview uses the exact surface, foreground, border, and radius properties shown here.</Text><PlaygroundCodeBlock aria-label="Code Block customization example">{`.custom-code-block {
  --brick-code-block-background: #1e1e2e;
  --brick-code-block-foreground: #f5e0dc;
  --brick-code-block-border-color: #cba6f7;
  --brick-code-block-radius: 1rem;
}`}</PlaygroundCodeBlock></VStack><div className="playground-customization-preview"><CodeBlock.Root style={custom} value={source}><CodeBlock.Content aria-label="Customized source" /></CodeBlock.Root></div></Grid.Root></EvidenceSurface></VStack></Scenario>
    <Scenario {...codeBlockScenarios[8]}><Grid.Root className="code-block-grid" columns={2} data-testid="code-block-stress"><Cell label="mobile many lines"><div className="code-block-phone"><CodeBlock.Root value={Array.from({ length: 20 }, (_, i) => `line ${i + 1}: ${longSource}`).join("\n")}><CodeBlock.Content aria-label="Long source" /></CodeBlock.Root></div></Cell><Cell label="RTL chrome, LTR source"><div dir="rtl"><Text as="p">مثال الشفرة</Text><CodeBlock.Root language="tsx" value={source}><CodeBlock.Header><CodeBlock.Title>مثال الزر</CodeBlock.Title><CodeBlock.Language /></CodeBlock.Header><CodeBlock.Content aria-label="مصدر المثال" /></CodeBlock.Root></div></Cell></Grid.Root></Scenario>
  </VStack>;
}
