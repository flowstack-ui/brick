import { useState, type CSSProperties, type ReactNode } from "react";
import { Badge, Button, Grid, Table, Text, VStack, type TableDensity, type TableSize, type TableVariant } from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./table.playground.css";

const rows = [{ project: "Atom 0.15", status: "Ready", checks: 128, coverage: 99.4 }, { project: "Brick 0.1", status: "Review", checks: 86, coverage: 96.8 }, { project: "Consumer", status: "Ready", checks: 24, coverage: 100 }];
const customStyle = { "--brick-table-border-color": "var(--brick-color-accent-border)", "--brick-table-header-background": "var(--brick-color-accent-subtle)", "--brick-table-radius": "1rem" } as CSSProperties;

function DataTable({ caption = "Release verification", action = false, ...props }: React.ComponentProps<typeof Table.Root> & { caption?: string; action?: boolean }) {
  return <Table.Root {...props}><Table.Caption>{caption}</Table.Caption><Table.Header><Table.Row><Table.Head>Project</Table.Head><Table.Head>Status</Table.Head><Table.Head numeric>Checks</Table.Head><Table.Head numeric>Coverage</Table.Head>{action && <Table.Head>Action</Table.Head>}</Table.Row></Table.Header><Table.Body>{rows.map((row) => <Table.Row key={row.project}><Table.Head scope="row">{row.project}</Table.Head><Table.Cell className="table-status-cell"><Badge size="sm" tone={row.status === "Ready" ? "success" : "warning"}>{row.status}</Badge></Table.Cell><Table.Cell numeric>{row.checks}</Table.Cell><Table.Cell numeric>{row.coverage}%</Table.Cell>{action && <Table.Cell><Button size="xs" variant="outline">Review {row.project}</Button></Table.Cell>}</Table.Row>)}</Table.Body><Table.Footer><Table.Row><Table.Head scope="row" colSpan={2}>Total checks</Table.Head><Table.Cell numeric>{rows.reduce((sum, row) => sum + row.checks, 0)}</Table.Cell><Table.Cell /><Table.Cell /></Table.Row></Table.Footer></Table.Root>;
}
function Cell({ children, label }: { children: ReactNode; label: string }) { return <EvidenceSurface className="table-cell"><SpecimenLabel>{label}</SpecimenLabel>{children}</EvidenceSurface>; }

function SortTable() {
  const [direction, setDirection] = useState<"ascending" | "descending">("ascending");
  const sorted = [...rows].sort((a, b) => direction === "ascending" ? a.checks - b.checks : b.checks - a.checks);
  return <Table.Root><Table.Caption>Application-controlled sorting</Table.Caption><Table.Header><Table.Row><Table.Head>Project</Table.Head><Table.Head sortDirection={direction}><Button size="xs" variant="ghost" onClick={() => setDirection((value) => value === "ascending" ? "descending" : "ascending")}>Checks<Table.SortIndicator /></Button></Table.Head></Table.Row></Table.Header><Table.Body>{sorted.map((row) => <Table.Row key={row.project}><Table.Head scope="row">{row.project}</Table.Head><Table.Cell numeric>{row.checks}</Table.Cell></Table.Row>)}</Table.Body></Table.Root>;
}

export const tableScenarios = [
  { id: "table.overview", number: 1, title: "Overview", description: "The canonical native line, medium, comfortable Table presents comparable release data." },
  { id: "table.anatomy", number: 2, title: "Anatomy and semantics", navigationTitle: "Anatomy", description: "Caption, header, body, footer, row headers, spans, and rendered native HTML remain explicit." },
  { id: "table.variants", number: 3, title: "Variants and stripe", navigationTitle: "Variants", description: "Line, outline, and striping change only structural paint." },
  { id: "table.sizing", number: 4, title: "Sizes and density", navigationTitle: "Sizing", description: "Size changes typography and row metrics; density independently changes block padding." },
  { id: "table.alignment", number: 5, title: "Alignment and numeric data", navigationTitle: "Alignment", description: "Logical alignment mirrors while numeric cells use tabular figures and logical end by default." },
  { id: "table.sorting", number: 6, title: "Sorting composition", navigationTitle: "Sorting", description: "A real Button owns activation and application state while Head exposes aria-sort and Table supplies decorative artwork." },
  { id: "table.sticky", number: 7, title: "Caption, footer, and sticky header", navigationTitle: "Sticky", description: "Caption placement and sticky header paint remain independent of the authored scroll boundary." },
  { id: "table.appearance", number: 8, title: "Appearance and customization", navigationTitle: "Theme", description: "Appearance scopes and public variables customize the same native Table." },
  { id: "table.stress", number: 9, title: "Responsive and boundary", navigationTitle: "Stress", description: "An explicit Container contains wide localized RTL data and independent row actions without creating grid behavior." },
] as const satisfies readonly ScenarioDefinition[];

export function TablePage() {
  const variants: TableVariant[] = ["line", "outline"];
  const sizes: TableSize[] = ["sm", "md", "lg"];
  const densities: TableDensity[] = ["compact", "comfortable"];
  return <VStack className="table-page" data-component-page="table" gap="6">
    <Scenario {...tableScenarios[0]}><EvidenceSurface><DataTable /></EvidenceSurface></Scenario>
    <Scenario {...tableScenarios[1]}><VStack gap="4"><Cell label="complete anatomy"><DataTable caption="Quarterly package report" /></Cell><RenderedOutput label="Rendered Table HTML"><DataTable caption="Native report structure" /></RenderedOutput></VStack></Scenario>
    <Scenario {...tableScenarios[2]}><Grid.Root className="table-grid" columns={3} gap="4">{variants.map((variant) => <Cell key={variant} label={variant}><DataTable variant={variant} /></Cell>)}<Cell label="striped"><DataTable striped /></Cell></Grid.Root></Scenario>
    <Scenario {...tableScenarios[3]}><VStack gap="5"><Grid.Root className="table-grid" columns={3} gap="4">{sizes.map((size) => <Cell key={size} label={size}><DataTable size={size} /></Cell>)}</Grid.Root><Grid.Root className="table-grid table-grid--two" columns={2} gap="4">{densities.map((density) => <Cell key={density} label={density}><DataTable density={density} /></Cell>)}</Grid.Root></VStack></Scenario>
    <Scenario {...tableScenarios[4]}><Cell label="start, center, end, numeric"><Table.Root dir="rtl"><Table.Caption>RTL logical alignment</Table.Caption><Table.Body><Table.Row><Table.Cell align="start">Start</Table.Cell><Table.Cell align="center">Center</Table.Cell><Table.Cell align="end">End</Table.Cell><Table.Cell numeric>1,234.50</Table.Cell></Table.Row></Table.Body></Table.Root></Cell></Scenario>
    <Scenario {...tableScenarios[5]}><Cell label="interactive sort header"><SortTable /></Cell></Scenario>
    <Scenario {...tableScenarios[6]}><div aria-label="Scrollable release inventory" className="table-sticky" tabIndex={0}><DataTable caption="Sticky release inventory" stickyHeader /></div><Cell label="bottom caption"><Table.Root><Table.Caption side="bottom">Summary appears below the data</Table.Caption><Table.Body><Table.Row><Table.Cell>Complete</Table.Cell></Table.Row></Table.Body></Table.Root></Cell></Scenario>
    <Scenario {...tableScenarios[7]}><VStack gap="4"><Grid.Root className="table-grid table-grid--two" columns={2} gap="4"><EvidenceSurface data-brick-appearance="light"><DataTable /></EvidenceSurface><EvidenceSurface data-brick-appearance="dark"><DataTable /></EvidenceSurface></Grid.Root><EvidenceSurface><PlaygroundCodeBlock>{`--brick-table-border-color: var(--brick-color-accent-border);\n--brick-table-header-background: var(--brick-color-accent-subtle);\n--brick-table-radius: 1rem;`}</PlaygroundCodeBlock><DataTable style={customStyle} variant="outline" /></EvidenceSurface></VStack></Scenario>
    <Scenario {...tableScenarios[8]}><VStack gap="3"><Text tone="secondary" variant="body-sm">Table stays native and static. Selection, cell navigation, filtering, resizing, editing, and virtualization belong to Data Grid.</Text><div className="table-narrow" dir="rtl"><Table.Container><DataTable action caption="نتائج التحقق من الإصدار مع محتوى مترجم واسع" style={{ "--brick-table-min-inline-size": "46rem" } as CSSProperties} /></Table.Container></div></VStack></Scenario>
  </VStack>;
}
