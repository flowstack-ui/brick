import { type CSSProperties } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Plus } from "lucide-react";
import {
  Button,
  Grid,
  Group,
  IconButton,
  Text,
  VStack,
} from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./group.playground.css";

const customStyle = {
  "--brick-group-gap": "1.5rem",
  "--brick-group-overlap": "2px",
} as CSSProperties;

export const groupScenarios = [
  { id: "group.overview", number: 1, title: "Overview", description: "A compact visual cluster preserves each control's independent semantics and keyboard behavior." },
  { id: "group.anatomy", number: 2, title: "Anatomy and semantics", navigationTitle: "Anatomy", description: "One role-free layout host leaves direct child order, names, events, and focus untouched." },
  { id: "group.attached", number: 3, title: "Attached borders and states", navigationTitle: "Attached", description: "Logical outside corners, one shared interior border, and local stacking form a continuous silhouette." },
  { id: "group.orientation", number: 4, title: "Orientation and growth", navigationTitle: "Orientation", description: "Horizontal and vertical axes plus equal growth change only the visual relationship." },
  { id: "group.composition", number: 5, title: "Mixed composition", navigationTitle: "Composition", description: "Buttons and IconButtons retain their own recipes, semantics, accessible names, and states." },
  { id: "group.appearance", number: 6, title: "Appearance and customization", navigationTitle: "Theme", description: "Theme paint remains child-owned while documented Group variables adjust relationship geometry." },
  { id: "group.stress", number: 7, title: "Narrow, RTL, and long content", navigationTitle: "Stress", description: "Unwrapped logical attachment remains cohesive across constrained widths and direction changes." },
] as const satisfies readonly ScenarioDefinition[];

function Actions({ attached = false }: { attached?: boolean }) {
  return (
    <Group aria-label="Sequence controls" attached={attached} role="group">
      <IconButton aria-label="Previous item" tone="neutral" variant="outline"><ArrowLeft /></IconButton>
      <IconButton aria-label="Add item" tone="neutral" variant="outline"><Plus /></IconButton>
      <IconButton aria-label="Next item" tone="neutral" variant="outline"><ArrowRight /></IconButton>
    </Group>
  );
}

function Cell({ children, label }: { children: React.ReactNode; label: string }) {
  return <EvidenceSurface className="group-cell"><SpecimenLabel>{label}</SpecimenLabel><div className="group-cell__preview">{children}</div></EvidenceSurface>;
}

export function GroupPage() {
  return (
    <VStack className="group-page" data-component-page="group" gap="6">
      <Scenario {...groupScenarios[0]}><EvidenceSurface className="group-overview" inset="lg"><Actions /></EvidenceSurface></Scenario>
      <Scenario {...groupScenarios[1]}><EvidenceSurface><Group data-testid="group-default"><Button tone="neutral" variant="outline">Copy</Button><Button tone="neutral" variant="outline">Move</Button></Group></EvidenceSurface></Scenario>
      <Scenario {...groupScenarios[2]}><Grid.Root className="group-grid" columns={2} gap="4"><Cell label="separated"><Actions /></Cell><Cell label="attached"><div data-testid="group-attached"><Actions attached /></div></Cell></Grid.Root></Scenario>
      <Scenario {...groupScenarios[3]}><Grid.Root className="group-grid" columns={2} gap="4"><Cell label="vertical attached"><Group aria-label="Move controls" attached orientation="vertical" role="group"><IconButton aria-label="Move up" tone="neutral" variant="outline"><ArrowUp /></IconButton><IconButton aria-label="Move down" tone="neutral" variant="outline"><ArrowDown /></IconButton></Group></Cell><Cell label="equal growth"><Group grow><Button tone="neutral" variant="outline">Draft</Button><Button tone="neutral" variant="outline">Published</Button></Group></Cell></Grid.Root></Scenario>
      <Scenario {...groupScenarios[4]}><Cell label="mixed controls"><Group aria-label="Project actions" attached role="group"><Button tone="neutral" variant="outline">Duplicate project</Button><IconButton aria-label="Add project" tone="neutral" variant="outline"><Plus /></IconButton><Button disabled tone="neutral" variant="outline">Archive</Button></Group></Cell></Scenario>
      <Scenario {...groupScenarios[5]}><VStack data-testid="group-customization" gap="4"><Grid.Root className="group-grid" columns={2} gap="4"><EvidenceSurface className="group-cell" data-brick-appearance="light"><SpecimenLabel>light</SpecimenLabel><div className="group-cell__preview"><Actions attached /></div></EvidenceSurface><EvidenceSurface className="group-cell" data-brick-appearance="dark"><SpecimenLabel>dark</SpecimenLabel><div className="group-cell__preview"><Actions attached /></div></EvidenceSurface></Grid.Root><EvidenceSurface className="playground-customization-evidence" inset="none"><Grid.Root className="playground-customization-layout" columns={2} gap="0"><VStack gap="2"><Text as="h3" variant="title-sm">Group CSS properties</Text><Text as="p" tone="secondary" variant="body-sm">Only spacing and overlap change; child paint and behavior stay the same.</Text><PlaygroundCodeBlock>{`--brick-group-gap: 1.5rem;\n--brick-group-overlap: 2px;`}</PlaygroundCodeBlock></VStack><div className="group-customization__preview"><Group style={customStyle}><Button tone="neutral" variant="outline">First</Button><Button tone="neutral" variant="outline">Second</Button></Group></div></Grid.Root></EvidenceSurface></VStack></Scenario>
      <Scenario {...groupScenarios[6]}><Grid.Root className="group-grid" columns={2} data-testid="group-stress" gap="4"><Cell label="narrow long content"><div className="group-narrow"><Group aria-label="Document actions" attached role="group"><Button tone="neutral" variant="outline">Duplicate translated document</Button><IconButton aria-label="Add document" tone="neutral" variant="outline"><Plus /></IconButton></Group></div></Cell><Cell label="right-to-left"><div dir="rtl"><Group aria-label="عناصر التحكم" attached role="group"><IconButton aria-label="التالي" tone="neutral" variant="outline"><ArrowRight /></IconButton><IconButton aria-label="إضافة" tone="neutral" variant="outline"><Plus /></IconButton><IconButton aria-label="السابق" tone="neutral" variant="outline"><ArrowLeft /></IconButton></Group></div></Cell></Grid.Root></Scenario>
    </VStack>
  );
}
