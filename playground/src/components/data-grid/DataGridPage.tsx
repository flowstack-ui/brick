import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { Badge, DataGrid, Grid, Text, VStack, type DataGridDensity, type DataGridSize, type DataGridVariant } from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import { Scenario } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./data-grid.playground.css";

const rows = [{ id: "atom", project: "Atom", status: "Ready", checks: 492 }, { id: "brick", project: "Brick", status: "Review", checks: 238 }, { id: "consumer", project: "Consumer", status: "Ready", checks: 24 }];
const customStyle = { "--brick-data-grid-border-color": "var(--brick-color-accent-border)", "--brick-data-grid-header-background": "var(--brick-color-accent-subtle)", "--brick-data-grid-radius": "1rem" } as CSSProperties;

function Cell({ children, label }: { children: ReactNode; label: string }) { return <EvidenceSurface className="data-grid-cell"><SpecimenLabel>{label}</SpecimenLabel>{children}</EvidenceSurface>; }
function ProjectGrid({ disabled = false, ...props }: React.ComponentProps<typeof DataGrid.Root> & { disabled?: boolean }) {
  return <DataGrid.Root {...props} aria-label="Project verification" columnCount={3} rowCount={rows.length + 2}><DataGrid.Caption>Project verification</DataGrid.Caption><DataGrid.Header><DataGrid.Row rowIndex={1}><DataGrid.ColumnHeader columnIndex={1}>Project</DataGrid.ColumnHeader><DataGrid.ColumnHeader columnIndex={2}>Status</DataGrid.ColumnHeader><DataGrid.ColumnHeader columnIndex={3} numeric>Checks</DataGrid.ColumnHeader></DataGrid.Row></DataGrid.Header><DataGrid.Body>{rows.map((row, index) => <DataGrid.Row disabled={disabled && index === 1} key={row.id} rowIndex={index + 2} selectable value={row.id}><DataGrid.Cell columnIndex={1}>{row.project}</DataGrid.Cell><DataGrid.Cell columnIndex={2}><Badge size="sm" tone={row.status === "Ready" ? "success" : "warning"}>{row.status}</Badge></DataGrid.Cell><DataGrid.Cell columnIndex={3} numeric>{row.checks}</DataGrid.Cell></DataGrid.Row>)}</DataGrid.Body><DataGrid.Footer><DataGrid.Row rowIndex={rows.length + 2}><DataGrid.Cell columnIndex={1}>Total</DataGrid.Cell><DataGrid.Cell columnIndex={2} /><DataGrid.Cell columnIndex={3} numeric>754</DataGrid.Cell></DataGrid.Row></DataGrid.Footer></DataGrid.Root>;
}
function SortingGrid() {
  const [direction, setDirection] = useState<"ascending" | "descending">("ascending");
  const sorted = useMemo(() => [...rows].sort((a, b) => direction === "ascending" ? a.checks - b.checks : b.checks - a.checks), [direction]);
  return <DataGrid.Root aria-label="Sortable verification" columnCount={2} rowCount={4} variant="outline"><DataGrid.Header><DataGrid.Row rowIndex={1}><DataGrid.ColumnHeader columnIndex={1}>Project</DataGrid.ColumnHeader><DataGrid.ColumnHeader columnIndex={2} numeric onAction={() => setDirection(value => value === "ascending" ? "descending" : "ascending")} sortDirection={direction}>Checks<DataGrid.SortIndicator /></DataGrid.ColumnHeader></DataGrid.Row></DataGrid.Header><DataGrid.Body>{sorted.map((row, index) => <DataGrid.Row key={row.id} rowIndex={index + 2} value={row.id}><DataGrid.Cell columnIndex={1}>{row.project}</DataGrid.Cell><DataGrid.Cell columnIndex={2} numeric>{row.checks}</DataGrid.Cell></DataGrid.Row>)}</DataGrid.Body></DataGrid.Root>;
}

export const dataGridScenarios = [
  { id: "data-grid.overview", number: 1, title: "Overview", description: "The canonical navigable, selectable project grid." },
  { id: "data-grid.anatomy", number: 2, title: "Anatomy and semantics", navigationTitle: "Anatomy", description: "Native table anatomy, grid roles, indexes, counts, caption, and footer remain inspectable." },
  { id: "data-grid.variants", number: 3, title: "Variants", description: "Line and outline change structural paint only." },
  { id: "data-grid.sizing", number: 4, title: "Sizes and density", navigationTitle: "Sizing", description: "Typography and row metrics vary independently from block padding." },
  { id: "data-grid.navigation", number: 5, title: "Navigation and disabled state", navigationTitle: "Navigation", description: "One root focus target tracks an active cell and skips disabled content." },
  { id: "data-grid.selection", number: 6, title: "Row selection", navigationTitle: "Selection", description: "Controlled multiple row selection is visibly and semantically stable." },
  { id: "data-grid.sorting", number: 7, title: "Sorting activation", navigationTitle: "Sorting", description: "Enter and pointer activation request an application-controlled sort." },
  { id: "data-grid.appearance", number: 8, title: "Appearance and customization", navigationTitle: "Theme", description: "Appearance scopes and public variables customize the same behavior." },
  { id: "data-grid.stress", number: 9, title: "Responsive, RTL, and boundary", navigationTitle: "Stress", description: "Explicit overflow and logical RTL remain separate from layout Grid, static Table, and Tree Grid." },
];

export function DataGridPage() {
  const [selection, setSelection] = useState<string[]>(["atom"]);
  const variants: DataGridVariant[] = ["line", "outline"];
  const sizes: DataGridSize[] = ["sm", "md", "lg"];
  const densities: DataGridDensity[] = ["compact", "comfortable", "spacious"];
  return <VStack className="data-grid-page" data-component-page="data-grid" gap="6">
    <Scenario {...dataGridScenarios[0]}><EvidenceSurface><ProjectGrid selectionMode="single" defaultValue="atom" selectOnRowClick /></EvidenceSurface></Scenario>
    <Scenario {...dataGridScenarios[1]}><VStack gap="4"><Cell label="complete anatomy"><ProjectGrid /></Cell><RenderedOutput label="Rendered Data Grid HTML"><ProjectGrid /></RenderedOutput></VStack></Scenario>
    <Scenario {...dataGridScenarios[2]}><Grid.Root className="data-grid-specimens" columns={2} gap="4">{variants.map(variant => <Cell key={variant} label={variant}><ProjectGrid variant={variant} /></Cell>)}</Grid.Root></Scenario>
    <Scenario {...dataGridScenarios[3]}><VStack gap="4"><Grid.Root className="data-grid-specimens" columns={3} gap="4">{sizes.map(size => <Cell key={size} label={size}><ProjectGrid size={size} /></Cell>)}</Grid.Root><Grid.Root className="data-grid-specimens" columns={3} gap="4">{densities.map(density => <Cell key={density} label={density}><ProjectGrid density={density} /></Cell>)}</Grid.Root></VStack></Scenario>
    <Scenario {...dataGridScenarios[4]}><Cell label="arrow-key navigation with one disabled row"><ProjectGrid defaultActiveCell={{ rowIndex: 1, columnIndex: 1 }} disabled /></Cell></Scenario>
    <Scenario {...dataGridScenarios[5]}><Cell label="multiple selection"><ProjectGrid selectionMode="multiple" value={selection} onValueChange={value => setSelection(Array.isArray(value) ? value : value ? [value] : [])} selectOnRowClick /></Cell></Scenario>
    <Scenario {...dataGridScenarios[6]}><Cell label="actionable Checks header"><SortingGrid /></Cell></Scenario>
    <Scenario {...dataGridScenarios[7]}><Grid.Root className="data-grid-specimens" columns={2} gap="4"><EvidenceSurface data-brick-appearance="light"><ProjectGrid variant="outline" /></EvidenceSurface><EvidenceSurface data-brick-appearance="dark"><ProjectGrid variant="outline" style={customStyle} /></EvidenceSurface></Grid.Root></Scenario>
    <Scenario {...dataGridScenarios[8]}><VStack gap="4"><Text tone="secondary" variant="body-sm">Data Grid owns cell navigation and selection. Table is static, Grid is layout, and Tree Grid adds hierarchy.</Text><Cell label="responsive overflow"><DataGrid.Container><ProjectGrid style={{ "--brick-data-grid-inline-size": "52rem", "--brick-data-grid-min-inline-size": "52rem" } as CSSProperties} /></DataGrid.Container></Cell><Cell label="RTL logical layout"><div dir="rtl"><DataGrid.Container><ProjectGrid variant="outline" /></DataGrid.Container></div></Cell></VStack></Scenario>
  </VStack>;
}
