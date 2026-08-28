import { useState, type CSSProperties, type ReactNode } from "react";
import { Grid, Pagination, Text, VStack, type PaginationSize, type PaginationVariant } from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./pagination.playground.css";

const variants: PaginationVariant[] = ["plain", "soft", "outline"];
const sizes: PaginationSize[] = ["sm", "md", "lg"];
const customStyle = { "--brick-pagination-current-background": "var(--brick-color-success-solid)", "--brick-pagination-root-radius": "1rem", "--brick-pagination-list-gap": "0.5rem" } as CSSProperties;
export const paginationScenarios = [
  { id: "pagination.overview", number: 1, title: "Overview", description: "Generated page controls navigate a bounded release-results set." },
  { id: "pagination.anatomy", number: 2, title: "Anatomy and semantics", navigationTitle: "Anatomy", description: "Seven public parts preserve the labelled navigation landmark, ordered list, buttons, current page, and decorative gaps." },
  { id: "pagination.variants", number: 3, title: "Variants", description: "Plain, soft, and outline change only containing and control paint." },
  { id: "pagination.sizes", number: 4, title: "Sizes", description: "Small, medium, and large coordinate target and label geometry." },
  { id: "pagination.state", number: 5, title: "State and boundaries", navigationTitle: "State", description: "Controlled navigation, current state, boundary disabling, and complete disabled state remain Atom-owned." },
  { id: "pagination.localization", number: 6, title: "Localization and custom content", navigationTitle: "Localization", description: "Root-generated labels localize without rebuilding Items; explicit controls can show text." },
  { id: "pagination.appearance", number: 7, title: "Appearance and customization", navigationTitle: "Theme", description: "Semantic appearances and public variables customize the same behavior." },
  { id: "pagination.stress", number: 8, title: "Responsive overflow and RTL", navigationTitle: "Stress", description: "A constrained no-wrap list scrolls inline and directional artwork mirrors in RTL." },
  { id: "pagination.urls", number: 9, title: "URL-backed results", navigationTitle: "URLs", description: "Native destinations preserve reload, sharing, history, and modified clicks while the route owns the current page." },
] as const satisfies readonly ScenarioDefinition[];

function Standard(props: Omit<React.ComponentProps<typeof Pagination.Root>, "children">) { return <Pagination.Root aria-label="Release result pages" {...props}><Pagination.List><Pagination.Previous /><Pagination.Items /><Pagination.Next /></Pagination.List></Pagination.Root>; }
function Cell({ children, label }: { children: ReactNode; label: string }) { return <EvidenceSurface className="pagination-cell"><SpecimenLabel>{label}</SpecimenLabel><div className="pagination-cell__preview">{children}</div></EvidenceSurface>; }
function EvidenceGroup({ children, description, title }: { children: ReactNode; description: string; title: string }) { return <VStack as="section" gap="4"><VStack gap="2"><Text as="h3" variant="title-sm">{title}</Text><Text as="p" tone="secondary" variant="body-sm">{description}</Text></VStack>{children}</VStack>; }
function Controlled() { const [page, setPage] = useState(4); return <VStack gap="2"><Text aria-live="polite" variant="body-sm">Selected page {page}</Text><Standard onPageChange={setPage} page={page} totalPages={9} variant="outline" /></VStack>; }
function UrlBacked() {
  const routePage = typeof window === "undefined" ? 2 : Number(new URLSearchParams(window.location.search).get("page") ?? 2);
  const page = Number.isInteger(routePage) && routePage >= 1 && routePage <= 5 ? routePage : 2;
  return <Pagination.Root aria-label="Incident result pages" getPageHref={({ page: destination }) => `/pagination?page=${destination}#scenario-pagination-urls`} page={page} totalPages={5} variant="outline"><Pagination.List><Pagination.Previous /><Pagination.Items /><Pagination.Next /></Pagination.List></Pagination.Root>;
}

export function PaginationPage() {
  return <VStack className="pagination-page" data-component-page="pagination" gap="6">
    <Scenario {...paginationScenarios[0]}><EvidenceSurface inset="lg"><Standard boundaryVariant="outline" defaultPage={6} totalPages={20} /></EvidenceSurface></Scenario>
    <Scenario {...paginationScenarios[1]}><RenderedOutput label="Rendered Pagination HTML"><Standard defaultPage={6} totalPages={20} variant="outline" /></RenderedOutput></Scenario>
    <Scenario {...paginationScenarios[2]}><Grid.Root className="pagination-grid" columns={3} gap="4">{variants.map(variant => <Cell key={variant} label={variant}><Standard defaultPage={4} totalPages={8} variant={variant} /></Cell>)}</Grid.Root></Scenario>
    <Scenario {...paginationScenarios[3]}><Grid.Root className="pagination-grid" columns={3} gap="4">{sizes.map(size => <Cell key={size} label={size}><Standard defaultPage={3} size={size} totalPages={5} /></Cell>)}</Grid.Root></Scenario>
    <Scenario {...paginationScenarios[4]}><Grid.Root className="pagination-grid pagination-grid--two" columns={2} gap="4"><Cell label="controlled"><Controlled /></Cell><Cell label="disabled"><Standard defaultPage={3} disabled totalPages={6} variant="soft" /></Cell></Grid.Root></Scenario>
    <Scenario {...paginationScenarios[5]}><Grid.Root className="pagination-grid pagination-grid--two" columns={2} gap="4"><Cell label="localized generated labels"><Pagination.Root aria-label="Páginas de resultados" defaultPage={2} getItemAriaLabel={({page,isCurrent}) => isCurrent ? `Página ${page}, actual` : `Ir a la página ${page}`} nextAriaLabel="Página siguiente" previousAriaLabel="Página anterior" totalPages={5}><Pagination.List><Pagination.Previous /><Pagination.Items /><Pagination.Next /></Pagination.List></Pagination.Root></Cell><Cell label="explicit text controls"><Pagination.Root defaultPage={2} totalPages={3}><Pagination.List><Pagination.Previous>Previous</Pagination.Previous><Pagination.Items /><Pagination.Next>Next</Pagination.Next></Pagination.List></Pagination.Root></Cell></Grid.Root></Scenario>
    <Scenario {...paginationScenarios[6]}><VStack gap="6"><EvidenceGroup title="Scoped appearances" description="The same soft Pagination uses semantic colors in adjacent light and dark scopes."><Grid.Root className="pagination-grid pagination-grid--two" columns={2} gap="4"><EvidenceSurface className="pagination-cell" data-brick-appearance="light"><SpecimenLabel>light</SpecimenLabel><div className="pagination-cell__preview"><Standard defaultPage={4} totalPages={8} variant="soft" /></div></EvidenceSurface><EvidenceSurface className="pagination-cell" data-brick-appearance="dark"><SpecimenLabel>dark</SpecimenLabel><div className="pagination-cell__preview"><Standard defaultPage={4} totalPages={8} variant="soft" /></div></EvidenceSurface></Grid.Root></EvidenceGroup><EvidenceGroup title="Consumer customization" description="The current-page surface, rounded container, and item spacing use the exact documented properties shown in code."><EvidenceSurface className="playground-customization-evidence" inset="none"><Grid.Root className="pagination-customization playground-customization-layout" columns={2} gap="0"><VStack gap="2"><Text as="h4" variant="title-sm">Pagination CSS properties</Text><Text as="p" tone="secondary" variant="body-sm">Only paint, radius, and spacing change; navigation behavior and page semantics remain the same.</Text><PlaygroundCodeBlock>{`--brick-pagination-current-background: var(--brick-color-success-solid);\n--brick-pagination-root-radius: 1rem;\n--brick-pagination-list-gap: 0.5rem;`}</PlaygroundCodeBlock></VStack><div className="pagination-customization__preview"><Standard defaultPage={4} style={customStyle} totalPages={8} variant="outline" /></div></Grid.Root></EvidenceSurface></EvidenceGroup></VStack></Scenario>
    <Scenario {...paginationScenarios[7]}><VStack gap="4"><Cell label="constrained width"><div className="pagination-narrow"><Standard defaultPage={12} siblingCount={3} totalPages={24} variant="outline" /></div></Cell><Cell label="right-to-left"><div dir="rtl" className="pagination-rtl"><Pagination.Root aria-label="صفحات النتائج" defaultPage={4} nextAriaLabel="الصفحة التالية" previousAriaLabel="الصفحة السابقة" totalPages={8}><Pagination.List><Pagination.Previous /><Pagination.Items /><Pagination.Next /></Pagination.List></Pagination.Root></div></Cell></VStack></Scenario>
    <Scenario {...paginationScenarios[8]}><EvidenceSurface inset="lg"><UrlBacked /></EvidenceSurface></Scenario>
  </VStack>;
}
