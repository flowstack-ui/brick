import { useState, type CSSProperties, type ReactNode } from "react";
import { Badge, Grid, Text, Tree, VStack, type TreeSize, type TreeVariant } from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import { Scenario } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./tree.playground.css";

const customStyle = { "--brick-tree-border-color": "var(--brick-color-accent-border)", "--brick-tree-selected-background": "var(--brick-color-accent-subtle)", "--brick-tree-radius": "1rem" } as CSSProperties;
function Cell({ children, label }: { children: ReactNode; label: string }) { return <EvidenceSurface className="tree-cell"><SpecimenLabel>{label}</SpecimenLabel>{children}</EvidenceSurface>; }
function RepositoryTree({ longLabel = false, ...props }: React.ComponentProps<typeof Tree.Root> & { longLabel?: boolean }) {
  return <Tree.Root aria-label="Repository files" defaultExpandedValue={["src", "components"]} {...props}>
    <Tree.Item value="src"><Tree.ItemContent><Tree.Indicator /><span aria-hidden="true">📁</span><Tree.ItemText>src</Tree.ItemText><Badge className="tree-meta" size="sm" tone="neutral" variant="soft">12</Badge></Tree.ItemContent><Tree.Group>
      <Tree.Item value="components"><Tree.ItemContent><Tree.Indicator /><span aria-hidden="true">📁</span><Tree.ItemText>components</Tree.ItemText></Tree.ItemContent><Tree.Group>
        <Tree.Item value="tree"><Tree.ItemContent><Tree.Indicator /><span aria-hidden="true">TS</span><Tree.ItemText>Tree.tsx</Tree.ItemText></Tree.ItemContent></Tree.Item>
        <Tree.Item value="styles" disabled><Tree.ItemContent><Tree.Indicator /><span aria-hidden="true">CSS</span><Tree.ItemText>tree.css</Tree.ItemText></Tree.ItemContent></Tree.Item>
      </Tree.Group></Tree.Item>
      <Tree.Item value="index"><Tree.ItemContent><Tree.Indicator /><span aria-hidden="true">TS</span><Tree.ItemText>index.ts</Tree.ItemText></Tree.ItemContent></Tree.Item>
    </Tree.Group></Tree.Item>
    <Tree.Item value="readme"><Tree.ItemContent><Tree.Indicator /><span aria-hidden="true">MD</span><Tree.ItemText>{longLabel ? "A deliberately long README file name that can wrap safely.md" : "README.md"}</Tree.ItemText></Tree.ItemContent></Tree.Item>
  </Tree.Root>;
}
function RtlRepositoryTree() {
  return <Tree.Root aria-label="ملفات المشروع" defaultExpandedValue={["src", "components"]} dir="rtl" showGuide variant="outline">
    <Tree.Item value="src"><Tree.ItemContent><Tree.Indicator /><span aria-hidden="true">📁</span><Tree.ItemText>المصدر</Tree.ItemText><Badge className="tree-meta" size="sm" tone="neutral" variant="soft">12</Badge></Tree.ItemContent><Tree.Group>
      <Tree.Item value="components"><Tree.ItemContent><Tree.Indicator /><span aria-hidden="true">📁</span><Tree.ItemText>المكوّنات</Tree.ItemText></Tree.ItemContent><Tree.Group>
        <Tree.Item value="tree"><Tree.ItemContent><Tree.Indicator /><span aria-hidden="true">TS</span><Tree.ItemText>الشجرة.tsx</Tree.ItemText></Tree.ItemContent></Tree.Item>
        <Tree.Item value="styles" disabled><Tree.ItemContent><Tree.Indicator /><span aria-hidden="true">CSS</span><Tree.ItemText>الشجرة.css</Tree.ItemText></Tree.ItemContent></Tree.Item>
      </Tree.Group></Tree.Item>
      <Tree.Item value="index"><Tree.ItemContent><Tree.Indicator /><span aria-hidden="true">TS</span><Tree.ItemText>الفهرس.ts</Tree.ItemText></Tree.ItemContent></Tree.Item>
    </Tree.Group></Tree.Item>
    <Tree.Item value="readme"><Tree.ItemContent><Tree.Indicator /><span aria-hidden="true">MD</span><Tree.ItemText>دليل المشروع الطويل يلتف بأمان.md</Tree.ItemText></Tree.ItemContent></Tree.Item>
  </Tree.Root>;
}
export const treeScenarios = [
  { id: "tree.overview", number: 1, title: "Overview", description: "A selected branch opens as a finished, keyboard-navigable repository tree." },
  { id: "tree.anatomy", number: 2, title: "Anatomy and semantics", navigationTitle: "Anatomy", description: "All six parts and their generated tree relationships remain inspectable." },
  { id: "tree.variants", number: 3, title: "Variants", description: "Plain, soft, and outline change only the root surface treatment." },
  { id: "tree.sizing", number: 4, title: "Sizes and guides", navigationTitle: "Sizing", description: "Compact and ordinary rows preserve stable indicators, indentation, and optional hierarchy guides." },
  { id: "tree.selection", number: 5, title: "Selection and interaction", navigationTitle: "Selection", description: "Active focus, selection, expansion, multiple selection, and disabled items remain distinct." },
  { id: "tree.appearance", number: 6, title: "Appearance and customization", navigationTitle: "Theme", description: "Light, dark, and public-token customization preserve the same behavior." },
  { id: "tree.stress", number: 7, title: "Responsive, RTL, and content stress", navigationTitle: "Stress", description: "Long content wraps and logical indentation, guides, and chevrons mirror in RTL." },
  { id: "tree.preferences", number: 8, title: "Preference boundaries", navigationTitle: "Preferences", description: "Reduced motion and forced colors retain meaningful state boundaries." },
];
export function TreePage() {
  const [selection, setSelection] = useState<string[]>(["tree"]); const variants: TreeVariant[] = ["plain", "soft", "outline"]; const sizes: TreeSize[] = ["sm", "md"];
  return <VStack className="tree-page" data-component-page="tree" gap="6">
    <Scenario {...treeScenarios[0]}><EvidenceSurface><RepositoryTree defaultValue="components" variant="outline" /></EvidenceSurface></Scenario>
    <Scenario {...treeScenarios[1]}><VStack gap="4"><Cell label="six-part composition"><RepositoryTree /></Cell><RenderedOutput label="Rendered Tree HTML"><RepositoryTree /></RenderedOutput></VStack></Scenario>
    <Scenario {...treeScenarios[2]}><Grid.Root className="tree-specimens" columns={3} gap="4">{variants.map(variant => <Cell key={variant} label={variant}><RepositoryTree variant={variant} /></Cell>)}</Grid.Root></Scenario>
    <Scenario {...treeScenarios[3]}><Grid.Root className="tree-specimens" columns={2} gap="4">{sizes.map(size => <Cell key={size} label={`${size} with guides`}><RepositoryTree showGuide size={size} /></Cell>)}</Grid.Root></Scenario>
    <Scenario {...treeScenarios[4]}><Cell label="controlled multiple selection"><RepositoryTree multiple value={selection} onValueChange={value => setSelection(Array.isArray(value) ? value : value ? [value] : [])} /></Cell></Scenario>
    <Scenario {...treeScenarios[5]}><VStack gap="5"><Grid.Root className="tree-specimens" columns={2} gap="4"><EvidenceSurface data-brick-appearance="light"><SpecimenLabel>light</SpecimenLabel><RepositoryTree variant="outline" /></EvidenceSurface><EvidenceSurface data-brick-appearance="dark"><SpecimenLabel>dark</SpecimenLabel><RepositoryTree variant="outline" /></EvidenceSurface></Grid.Root><EvidenceSurface><Grid.Root className="tree-customization" columns={2} gap="5"><VStack gap="2"><SpecimenLabel>customized</SpecimenLabel><Text as="h3" variant="title-sm">Tree CSS properties</Text><Text tone="secondary" variant="body-sm">The preview uses an accent boundary, selected fill, and larger radius while preserving focus and hierarchy.</Text><PlaygroundCodeBlock tabIndex={0}>{`--brick-tree-border-color: var(--brick-color-accent-border);\n--brick-tree-selected-background: var(--brick-color-accent-subtle);\n--brick-tree-radius: 1rem;`}</PlaygroundCodeBlock></VStack><RepositoryTree style={customStyle} variant="outline" /></Grid.Root></EvidenceSurface></VStack></Scenario>
    <Scenario {...treeScenarios[6]}><Grid.Root className="tree-specimens" columns={2} gap="4"><Cell label="320px constrained content"><div className="tree-constrained"><RepositoryTree longLabel showGuide variant="outline" /></div></Cell><Cell label="RTL localized hierarchy"><div dir="rtl"><RtlRepositoryTree /></div></Cell></Grid.Root></Scenario>
    <Scenario {...treeScenarios[7]}><Text tone="secondary" variant="body-sm">Indicator motion is removed under reduced motion; forced colors retain focus, selection, disabled text, guides, and outline boundaries.</Text></Scenario>
  </VStack>;
}
