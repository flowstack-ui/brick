import { useState } from "react";
import { Archive, Search } from "lucide-react";
import { Appearance, Button, Card, EmptyState, For, Frame, HStack, Icon, Input, List, Table, Text, VStack, type EmptyStateRootProps } from "../../../../src/index.js";
import { Scenario } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";
export const emptyStateScenarios = [
  { id: "empty-state.basic", number: 1, title: "Basic", description: "An authored message with no data or loading state in the component." },
  { id: "empty-state.sizes", number: 2, title: "Sizes", description: "Coordinated padding, title size, spacing and icon diameter." },
  { id: "empty-state.actions", number: 3, title: "Actions", description: "Application-owned primary and secondary actions." },
  { id: "empty-state.list", number: 4, title: "Suggested remedies", description: "Compose a real List for useful next steps." },
  { id: "empty-state.icon", number: 5, title: "Custom icon", description: "The indicator owns geometry; Icon supplies SVG presentation." },
  { id: "empty-state.illustration", number: 6, title: "Custom illustration", description: "Artwork is authored content, outside the fixed glyph slot." },
  { id: "empty-state.optional", number: 7, title: "Optional parts", description: "No phantom icon column or fixed height when parts are absent." },
  { id: "empty-state.heading", number: 8, title: "Heading levels", description: "Heading semantics are independent of visual size." },
  { id: "empty-state.alignment", number: 9, title: "Alignment", description: "Centered or logically start-aligned content." },
  { id: "empty-state.surfaces", number: 10, title: "Surfaces and tables", description: "The parent owns paint; tables retain valid cell structure." },
  { id: "empty-state.search", number: 11, title: "Search results", description: "Application-owned filtering and localized feedback." },
  { id: "empty-state.narrow", number: 12, title: "Narrow and RTL", description: "Long localized copy wraps without shrinking its icon." },
  { id: "empty-state.appearance", number: 13, title: "Appearances", description: "Matched light/dark content with system-color support." },
] as const;
function EmptyProjects(props: EmptyStateRootProps) {
  return <EmptyState.Root {...props}><EmptyState.Content><EmptyState.Indicator><Icon size="inherit"><Archive /></Icon></EmptyState.Indicator><VStack gap="2"><EmptyState.Title>No projects yet</EmptyState.Title><EmptyState.Description>Create a project to organize your team’s work.</EmptyState.Description></VStack></EmptyState.Content></EmptyState.Root>;
}
export function EmptyStateEvidence() {
  const [query, setQuery] = useState("archive");
  const [created, setCreated] = useState(false);
  return <VStack data-component-page="empty-state" gap="6">
    <Scenario {...emptyStateScenarios[0]}><Specimen label="First use"><EmptyProjects /></Specimen></Scenario>
    <Scenario {...emptyStateScenarios[1]}><VStack gap="4"><For each={["sm", "md", "lg"] as const}>{size => <Specimen key={size} label={size}><EmptyProjects size={size} /></Specimen>}</For></VStack></Scenario>
    <Scenario {...emptyStateScenarios[2]}><Specimen label="Create a project"><EmptyState.Root><EmptyState.Content><EmptyState.Title>{created ? "Project created" : "No projects yet"}</EmptyState.Title><EmptyState.Description>Start with a blank project or a template.</EmptyState.Description><HStack wrap gap="3"><Button onClick={() => setCreated(true)}>Create project</Button><Button variant="outline" tone="neutral" onClick={() => setCreated(false)}>Reset example</Button></HStack></EmptyState.Content></EmptyState.Root></Specimen></Scenario>
    <Scenario {...emptyStateScenarios[3]}><Specimen label="Suggestions"><EmptyState.Root><EmptyState.Content><EmptyState.Title>No matching projects</EmptyState.Title><List.Root><List.Item>Try a shorter search.</List.Item><List.Item>Remove filters.</List.Item><List.Item>Check archived projects.</List.Item></List.Root></EmptyState.Content></EmptyState.Root></Specimen></Scenario>
    <Scenario {...emptyStateScenarios[4]}><Specimen label="Search"><EmptyState.Root><EmptyState.Content><EmptyState.Indicator><Icon size="inherit"><Search /></Icon></EmptyState.Indicator><EmptyState.Title>No results</EmptyState.Title></EmptyState.Content></EmptyState.Root></Specimen></Scenario>
    <Scenario {...emptyStateScenarios[5]}><Specimen label="Authored artwork"><EmptyState.Root><EmptyState.Content><Frame inlineSize="10rem"><svg aria-hidden="true" viewBox="0 0 160 80" fill="none"><rect x="30" y="20" width="100" height="50" rx="8" fill="currentColor" opacity=".08" /><path d="M20 20h45l10 10h65v40H20Z" stroke="currentColor" strokeWidth="2" /></svg></Frame><EmptyState.Title>Your archive is empty</EmptyState.Title></EmptyState.Content></EmptyState.Root></Specimen></Scenario>
    <Scenario {...emptyStateScenarios[6]}><Specimen label="Title only"><EmptyState.Root><EmptyState.Title>No projects yet</EmptyState.Title></EmptyState.Root></Specimen><Specimen label="Description only"><EmptyState.Root><EmptyState.Description>No projects match the current filters.</EmptyState.Description></EmptyState.Root></Specimen></Scenario>
    <Scenario {...emptyStateScenarios[7]}><Specimen label="Section heading"><EmptyState.Root><EmptyState.Title as="h2">No projects yet</EmptyState.Title></EmptyState.Root></Specimen></Scenario>
    <Scenario {...emptyStateScenarios[8]}><VStack gap="4"><For each={["start", "center"] as const}>{align => <Specimen key={align} label={align}><EmptyProjects align={align} /></Specimen>}</For></VStack></Scenario>
    <Scenario {...emptyStateScenarios[9]}><Specimen label="Outlined Card"><Card.Root><EmptyProjects /></Card.Root></Specimen><Specimen label="Table cell"><Table.Root><Table.Header><Table.Row><Table.Head>Project</Table.Head><Table.Head>Owner</Table.Head></Table.Row></Table.Header><Table.Body><Table.Row><Table.Cell colSpan={2}><EmptyProjects size="sm" /></Table.Cell></Table.Row></Table.Body></Table.Root></Specimen></Scenario>
    <Scenario {...emptyStateScenarios[10]}><Specimen label="Filter projects"><VStack gap="3"><Input aria-label="Find projects" value={query} onChange={event => setQuery(event.currentTarget.value)} /><Text role="status">{query ? "No matching projects." : "Showing all projects."}</Text>{query ? <EmptyState.Root><EmptyState.Content><EmptyState.Title>No matching projects</EmptyState.Title><EmptyState.Description>Try another term or reset your search.</EmptyState.Description><Button variant="outline" tone="neutral" onClick={() => setQuery("")}>Clear search</Button></EmptyState.Content></EmptyState.Root> : <Text>Website redesign</Text>}</VStack></Specimen></Scenario>
    <Scenario {...emptyStateScenarios[11]}><Specimen label="Arabic"><Frame maxInlineSize="20rem"><EmptyState.Root dir="rtl" lang="ar"><EmptyState.Content><EmptyState.Indicator><Icon size="inherit"><Archive /></Icon></EmptyState.Indicator><EmptyState.Title>لا توجد مشاريع بعد</EmptyState.Title><EmptyState.Description>أنشئ مشروعًا لتنظيم عمل فريقك ومشاركة المستندات.</EmptyState.Description></EmptyState.Content></EmptyState.Root></Frame></Specimen></Scenario>
    <Scenario {...emptyStateScenarios[12]}><VStack gap="4"><For each={["light", "dark"] as const}>{appearance => <Appearance key={appearance} value={appearance}><Specimen label={appearance}><EmptyProjects /></Specimen></Appearance>}</For></VStack></Scenario>
  </VStack>;
}
