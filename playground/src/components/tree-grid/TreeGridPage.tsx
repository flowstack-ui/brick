import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { Badge, Button, Grid, Text, TreeGrid, VStack, type TreeGridDensity, type TreeGridSize, type TreeGridVariant } from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import { Scenario } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./tree-grid.playground.css";

type FileRow = { id: string; parent?: string; level: number; name: string; type: string; bytes: number | null; expandable?: boolean; disabled?: boolean };
const files: FileRow[] = [
  { id: "src", level: 1, name: "src", type: "Folder", bytes: null, expandable: true },
  { id: "components", parent: "src", level: 2, name: "components", type: "Folder", bytes: null, expandable: true },
  { id: "tree-grid", parent: "components", level: 3, name: "TreeGrid.tsx", type: "TypeScript", bytes: 6842 },
  { id: "styles", parent: "components", level: 3, name: "tree-grid.css", type: "CSS", bytes: 4312, disabled: true },
  { id: "readme", level: 1, name: "README.md", type: "Markdown", bytes: 2874 },
];
const customStyle = { "--brick-tree-grid-border-color": "var(--brick-color-accent-border)", "--brick-tree-grid-header-background": "var(--brick-color-accent-subtle)", "--brick-tree-grid-selected-background": "var(--brick-color-accent-subtle)", "--brick-tree-grid-radius": "1rem" } as CSSProperties;

function Cell({ children, label }: { children: ReactNode; label: string }) { return <EvidenceSurface className="tree-grid-cell"><SpecimenLabel>{label}</SpecimenLabel>{children}</EvidenceSurface>; }

function FileGrid({ rows = files, caption = "Release files", captionSide = "bottom", footer = true, ...props }: React.ComponentProps<typeof TreeGrid.Root> & { rows?: FileRow[]; caption?: string; captionSide?: "top" | "bottom"; footer?: boolean }) {
  return <TreeGrid.Root {...props} aria-label={caption} columnCount={3} rowCount={rows.length + 1 + (footer ? 1 : 0)} defaultExpandedValue={["src", "components"]}>
    <TreeGrid.Caption side={captionSide}>{caption}</TreeGrid.Caption>
    <TreeGrid.Header><TreeGrid.Row value="header" rowIndex={1} selectable={false}><TreeGrid.ColumnHeader columnIndex={1}>Name</TreeGrid.ColumnHeader><TreeGrid.ColumnHeader columnIndex={2}>Type</TreeGrid.ColumnHeader><TreeGrid.ColumnHeader columnIndex={3} numeric>Bytes</TreeGrid.ColumnHeader></TreeGrid.Row></TreeGrid.Header>
    <TreeGrid.Body>{rows.map((row, index) => <TreeGrid.Row disabled={row.disabled} expandable={row.expandable} key={row.id} level={row.level} parentValue={row.parent} rowIndex={index + 2} selectable value={row.id}><TreeGrid.RowHeader columnIndex={1}><TreeGrid.Indicator />{row.name}</TreeGrid.RowHeader><TreeGrid.Cell columnIndex={2}>{row.type}</TreeGrid.Cell><TreeGrid.Cell columnIndex={3} numeric>{row.bytes?.toLocaleString("en-US") ?? "—"}</TreeGrid.Cell></TreeGrid.Row>)}</TreeGrid.Body>
    {footer ? <TreeGrid.Footer><TreeGrid.Row value="footer" rowIndex={rows.length + 2} selectable={false}><TreeGrid.Cell columnIndex={1}>Total files</TreeGrid.Cell><TreeGrid.Cell columnIndex={2}><Badge size="sm" tone="neutral" variant="soft">5 records</Badge></TreeGrid.Cell><TreeGrid.Cell columnIndex={3} numeric>14,028</TreeGrid.Cell></TreeGrid.Row></TreeGrid.Footer> : null}
  </TreeGrid.Root>;
}

function ControlledGrid() {
  const [expanded, setExpanded] = useState(["src", "components"]);
  const [selection, setSelection] = useState<string | null>("tree-grid");
  const [direction, setDirection] = useState<"ascending" | "descending">("ascending");
  const sorted = useMemo(() => direction === "ascending" ? files : [...files].reverse(), [direction]);
  return <VStack gap="3"><Button onClick={() => setExpanded(value => value.includes("components") ? value.filter(item => item !== "components") : [...value, "components"])} size="sm" variant="outline">Toggle components branch</Button><TreeGrid.Root aria-label="Controlled release files" columnCount={3} rowCount={6} expandedValue={expanded} onExpandedValueChange={setExpanded} selectionMode="single" value={selection} onValueChange={value => setSelection(typeof value === "string" ? value : null)} selectOnRowClick variant="outline"><TreeGrid.Header><TreeGrid.Row value="header" rowIndex={1} selectable={false}><TreeGrid.ColumnHeader columnIndex={1} onAction={() => setDirection(value => value === "ascending" ? "descending" : "ascending")} sortDirection={direction}>Name<TreeGrid.SortIndicator /></TreeGrid.ColumnHeader><TreeGrid.ColumnHeader columnIndex={2}>Type</TreeGrid.ColumnHeader><TreeGrid.ColumnHeader columnIndex={3} numeric>Bytes</TreeGrid.ColumnHeader></TreeGrid.Row></TreeGrid.Header><TreeGrid.Body>{sorted.map((row, index) => <TreeGrid.Row disabled={row.disabled} expandable={row.expandable} key={row.id} level={row.level} parentValue={row.parent} rowIndex={index + 2} selectable value={row.id}><TreeGrid.RowHeader columnIndex={1}><TreeGrid.Indicator />{row.name}</TreeGrid.RowHeader><TreeGrid.Cell columnIndex={2}>{row.type}</TreeGrid.Cell><TreeGrid.Cell columnIndex={3} numeric>{row.bytes?.toLocaleString("en-US") ?? "—"}</TreeGrid.Cell></TreeGrid.Row>)}</TreeGrid.Body></TreeGrid.Root><Text aria-live="polite" data-tree-grid-log tone="secondary" variant="body-sm">Expanded: {expanded.join(", ") || "none"}; selected: {selection ?? "none"}; sort: {direction}</Text></VStack>;
}

function RtlGrid() {
  const rows: FileRow[] = [{ id: "src", level: 1, name: "المصدر", type: "مجلد", bytes: null, expandable: true }, { id: "component", parent: "src", level: 2, name: "المكوّنات", type: "مجلد", bytes: null }, { id: "readme", level: 1, name: "اقرأني.md", type: "ماركداون", bytes: 2874 }];
  return <FileGrid caption="ملفات الإصدار" dir="rtl" footer={false} rows={rows} variant="outline" />;
}

export const treeGridScenarios = [
  { id: "tree-grid.overview", number: 1, title: "Overview", description: "The canonical hierarchical, navigable, selectable release-file grid." },
  { id: "tree-grid.anatomy", number: 2, title: "Anatomy and semantics", navigationTitle: "Anatomy", description: "Twelve public parts preserve native table anatomy, treegrid roles, coordinates, counts, caption, and footer." },
  { id: "tree-grid.variants", number: 3, title: "Variants", description: "Line and outline change structural paint only." },
  { id: "tree-grid.sizing", number: 4, title: "Sizes and density", navigationTitle: "Sizing", description: "Typography, hierarchy indent, and row metrics vary independently from block padding." },
  { id: "tree-grid.hierarchy", number: 5, title: "Hierarchy and selection", navigationTitle: "Hierarchy", description: "Deep hierarchy, expansion, active cells, selection, disabled rows, and read-only state remain distinct." },
  { id: "tree-grid.controlled", number: 6, title: "Sorting and controlled behavior", navigationTitle: "Controlled", description: "The application owns sorting, expansion, and selection while Atom owns activation and focus." },
  { id: "tree-grid.content", number: 7, title: "Caption, alignment, numeric, header, and footer", navigationTitle: "Content", description: "Logical alignment and tabular numbers coexist with complete authored table content." },
  { id: "tree-grid.appearance", number: 8, title: "Appearance and customization", navigationTitle: "Theme", description: "Light and dark badges identify appearance scopes; the titled accent specimen documents its exact override." },
  { id: "tree-grid.stress", number: 9, title: "Responsive, localization, RTL, and preferences", navigationTitle: "Stress", description: "Container overflow, localized RTL hierarchy, reduced motion, and forced colors preserve the same contract." },
];

export function TreeGridPage() {
  const variants: TreeGridVariant[] = ["line", "outline"];
  const sizes: TreeGridSize[] = ["sm", "md", "lg"];
  const densities: TreeGridDensity[] = ["compact", "comfortable", "spacious"];
  return <VStack className="tree-grid-page" data-component-page="tree-grid" gap="6">
    <Scenario {...treeGridScenarios[0]}><EvidenceSurface><TreeGrid.Container><FileGrid defaultValue="tree-grid" selectOnRowClick selectionMode="single" variant="outline" /></TreeGrid.Container></EvidenceSurface></Scenario>
    <Scenario {...treeGridScenarios[1]}><RenderedOutput label="Rendered Tree Grid HTML"><TreeGrid.Container><FileGrid /></TreeGrid.Container></RenderedOutput></Scenario>
    <Scenario {...treeGridScenarios[2]}><Grid.Root className="tree-grid-specimens" columns={2} gap="4">{variants.map(variant => <Cell key={variant} label={variant}><TreeGrid.Container><FileGrid variant={variant} /></TreeGrid.Container></Cell>)}</Grid.Root></Scenario>
    <Scenario {...treeGridScenarios[3]}><VStack gap="4"><Grid.Root className="tree-grid-specimens" columns={3} gap="4">{sizes.map(size => <Cell key={size} label={size}><TreeGrid.Container><FileGrid footer={false} size={size} rows={files.slice(0, 3)} /></TreeGrid.Container></Cell>)}</Grid.Root><Grid.Root className="tree-grid-specimens" columns={3} gap="4">{densities.map(density => <Cell key={density} label={density}><TreeGrid.Container><FileGrid density={density} footer={false} rows={files.slice(0, 3)} /></TreeGrid.Container></Cell>)}</Grid.Root></VStack></Scenario>
    <Scenario {...treeGridScenarios[4]}><Grid.Root className="tree-grid-specimens" columns={2} gap="4"><Cell label="selected deep row"><TreeGrid.Container><FileGrid defaultActiveCell={{ rowIndex: 4, columnIndex: 1 }} defaultValue="tree-grid" selectionMode="single" /></TreeGrid.Container></Cell><Cell label="read-only selection"><TreeGrid.Container><FileGrid defaultValue="readme" readOnly selectionMode="single" /></TreeGrid.Container></Cell></Grid.Root></Scenario>
    <Scenario {...treeGridScenarios[5]}><Cell label="controlled expansion, selection, and Name sort"><TreeGrid.Container><ControlledGrid /></TreeGrid.Container></Cell></Scenario>
    <Scenario {...treeGridScenarios[6]}><Cell label="top caption, logical alignment, numeric cells, and total footer"><TreeGrid.Container><FileGrid captionSide="top" /></TreeGrid.Container></Cell></Scenario>
    <Scenario {...treeGridScenarios[7]}><VStack gap="5"><Grid.Root className="tree-grid-specimens" columns={2} gap="4"><EvidenceSurface data-brick-appearance="light"><SpecimenLabel>light</SpecimenLabel><TreeGrid.Container><FileGrid footer={false} variant="outline" /></TreeGrid.Container></EvidenceSurface><EvidenceSurface data-brick-appearance="dark"><SpecimenLabel>dark</SpecimenLabel><TreeGrid.Container><FileGrid footer={false} variant="outline" /></TreeGrid.Container></EvidenceSurface></Grid.Root><EvidenceSurface className="playground-customization-evidence" inset="none"><Grid.Root className="tree-grid-customization playground-customization-layout" columns={2} gap="0"><VStack gap="2"><SpecimenLabel>customized</SpecimenLabel><Text as="h3" variant="title-sm">Tree Grid CSS properties</Text><Text tone="secondary" variant="body-sm">The accent boundary, header and selected surfaces, and larger radius remain clipped to the rounded outline.</Text><PlaygroundCodeBlock tabIndex={0}>{`--brick-tree-grid-border-color: var(--brick-color-accent-border);\n--brick-tree-grid-header-background: var(--brick-color-accent-subtle);\n--brick-tree-grid-selected-background: var(--brick-color-accent-subtle);\n--brick-tree-grid-radius: 1rem;`}</PlaygroundCodeBlock></VStack><div className="playground-customization-preview"><TreeGrid.Container><FileGrid defaultValue="tree-grid" selectionMode="single" style={customStyle} variant="outline" /></TreeGrid.Container></div></Grid.Root></EvidenceSurface></VStack></Scenario>
    <Scenario {...treeGridScenarios[8]}><VStack gap="4"><Text tone="secondary" variant="body-sm">Tree Grid adds cell navigation to hierarchical rows. Tree has one value per node, Data Grid is flat, and Table is static.</Text><Cell label="320px overflow boundary"><div className="tree-grid-constrained"><TreeGrid.Container><FileGrid style={{ "--brick-tree-grid-min-inline-size": "52rem" } as CSSProperties} /></TreeGrid.Container></div></Cell><Cell label="RTL localized hierarchy"><div dir="rtl"><TreeGrid.Container><RtlGrid /></TreeGrid.Container></div></Cell></VStack></Scenario>
  </VStack>;
}
