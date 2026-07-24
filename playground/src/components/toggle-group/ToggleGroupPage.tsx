import { useState, type ReactNode } from "react";
import {
  VStack,
  Text,
  ToggleGroup,
  type ToggleShape,
  type ToggleSize,
  type ToggleVariant,
} from "@flowstack-ui/brick";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./toggle-group.playground.css";

const variants: ToggleVariant[] = ["solid", "soft", "outline", "ghost"];
const sizes: ToggleSize[] = ["sm", "md", "lg"];
const shapes: ToggleShape[] = ["rounded", "pill"];
function GridIcon() {
  return <svg aria-hidden="true" fill="none" viewBox="0 0 20 20"><path d="M3 3h5v5H3V3Zm9 0h5v5h-5V3ZM3 12h5v5H3v-5Zm9 0h5v5h-5v-5Z" stroke="currentColor" strokeWidth="1.4" /></svg>;
}

function EvidenceGroup({ children, description, title }: { children: ReactNode; description: string; title: string }) {
  return <VStack as="section" className="toggle-group-evidence-group"><VStack className="toggle-group-evidence-group__heading"><Text as="h3" variant="title-sm">{title}</Text><Text as="p" tone="secondary" variant="body-sm">{description}</Text></VStack>{children}</VStack>;
}

function Cell({ children, label }: { children: ReactNode; label: string }) {
  return <div className="toggle-group-specimen-cell"><SpecimenLabel>{label}</SpecimenLabel><div className="toggle-group-specimen-cell__preview">{children}</div></div>;
}

function StandardGroup({ label = "Project view", variant, size, shape }: { label?: string; variant?: ToggleVariant; size?: ToggleSize; shape?: ToggleShape }) {
  return (
    <ToggleGroup.Root ariaLabel={label} defaultValue="cards" size={size} shape={shape} variant={variant}>
      <ToggleGroup.Item value="cards">Cards</ToggleGroup.Item>
      <ToggleGroup.Item value="list">List</ToggleGroup.Item>
      <ToggleGroup.Item value="timeline">Timeline</ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}

export const toggleGroupScenarios = [
  { description: "ToggleGroup’s canonical rendering is a separated horizontal single-selection group with soft medium rounded Items. One roving tab stop and native pressed buttons remain Atom-owned.", id: "toggle-group.overview", number: 1, title: "Overview" },
  { description: "Single mode owns one string and permits empty selection; multiple mode owns a string array. Both keep the same default separated recipe.", id: "toggle-group.selection", navigationTitle: "Selection", number: 2, title: "Selection modes" },
  { description: "Variant changes only the shared Item paint treatment. Selection, size, shape, orientation, attachment, and content remain identical.", id: "toggle-group.variants", number: 3, title: "Variants" },
  { description: "Size changes only shared target geometry and typography. Every group retains the default soft rounded separated recipe and identical values.", id: "toggle-group.sizes", number: 4, title: "Sizes" },
  { description: "Shape changes group Item radius only. Icon-only is an Item content mode with a complete name, not a divergent group recipe.", id: "toggle-group.shapes", navigationTitle: "Shapes", number: 5, title: "Shapes and icon content" },
  { description: "Attached removes gaps and joins logical edges; full-width distributes equal flexible Items. Each comparison changes only its named layout dimension.", id: "toggle-group.layout", navigationTitle: "Layout", number: 6, title: "Attachment and width" },
  { description: "Vertical orientation changes arrow-key axis and stacking. Disabled Root and disabled Item preserve visible state while Atom skips unavailable commands.", id: "toggle-group.interaction", navigationTitle: "States", number: 7, title: "Orientation and disabled state" },
  { description: "Local appearance scopes and public group, Item, slot, style, and component-token hooks customize geometry without replacing selection behavior.", id: "toggle-group.appearance", navigationTitle: "Theme", number: 8, title: "Appearance and customization" },
  { description: "Separated groups wrap long content, attached groups expose fit pressure honestly, and logical corners plus arrow navigation mirror in genuine RTL.", id: "toggle-group.stress", navigationTitle: "Stress", number: 9, title: "Responsive and RTL" },
] as const satisfies readonly ScenarioDefinition[];

export function ToggleGroupPage() {
  const [view, setView] = useState("cards");
  const [filters, setFilters] = useState<string[]>(["active"]);
  return (
    <VStack className="toggle-group-page" data-component-page="toggle-group" data-testid="toggle-group-workbench">
      <Scenario {...toggleGroupScenarios[0]}>
        <div className="toggle-group-overview" data-testid="toggle-group-overview"><StandardGroup /></div>
      </Scenario>

      <Scenario {...toggleGroupScenarios[1]}>
        <div className="toggle-group-specimen-grid toggle-group-specimen-grid--two" data-testid="toggle-group-selection">
          <Cell label="single">
            <VStack className="toggle-group-readout">
              <ToggleGroup.Root ariaLabel="Controlled project view" onValueChange={setView} value={view}>
                <ToggleGroup.Item value="cards">Cards</ToggleGroup.Item>
                <ToggleGroup.Item value="list">List</ToggleGroup.Item>
                <ToggleGroup.Item value="timeline">Timeline</ToggleGroup.Item>
              </ToggleGroup.Root>
              <span>Current view: {view || "none"}</span>
            </VStack>
          </Cell>
          <Cell label="multiple">
            <VStack className="toggle-group-readout">
              <ToggleGroup.Root ariaLabel="Project filters" onValueChange={setFilters} type="multiple" value={filters}>
                <ToggleGroup.Item value="active">Active</ToggleGroup.Item>
                <ToggleGroup.Item value="owned">Owned</ToggleGroup.Item>
                <ToggleGroup.Item value="shared">Shared</ToggleGroup.Item>
              </ToggleGroup.Root>
              <span>Filters: {filters.length ? filters.join(", ") : "none"}</span>
            </VStack>
          </Cell>
        </div>
      </Scenario>

      <Scenario {...toggleGroupScenarios[2]}>
        <div className="toggle-group-specimen-grid toggle-group-specimen-grid--four" data-testid="toggle-group-variants">
          {variants.map((variant) => <Cell key={variant} label={variant}><StandardGroup label={`${variant} project view`} variant={variant} /></Cell>)}
        </div>
      </Scenario>

      <Scenario {...toggleGroupScenarios[3]}>
        <div className="toggle-group-specimen-grid toggle-group-specimen-grid--sizes" data-testid="toggle-group-sizes">
          {sizes.map((size) => <Cell key={size} label={size}><StandardGroup label={`${size} project view`} size={size} /></Cell>)}
        </div>
      </Scenario>

      <Scenario {...toggleGroupScenarios[4]}>
        <VStack className="toggle-group-evidence-stack" data-testid="toggle-group-shapes">
          <EvidenceGroup description="Both groups keep the same values, default size, variant, and separated layout." title="Shapes">
            <div className="toggle-group-specimen-grid toggle-group-specimen-grid--two">
              {shapes.map((shape) => <Cell key={shape} label={shape}><StandardGroup label={`${shape} project view`} shape={shape} /></Cell>)}
            </div>
          </EvidenceGroup>
          <EvidenceGroup description="Every Item is square and independently named while the Root recipe remains default." title="Icon-only Items">
            <div className="toggle-group-overview">
              <ToggleGroup.Root ariaLabel="Canvas view" defaultValue="grid">
                <ToggleGroup.Item ariaLabel="Grid view" iconOnly value="grid"><GridIcon /></ToggleGroup.Item>
                <ToggleGroup.Item ariaLabel="List view" iconOnly value="list"><span aria-hidden="true">≡</span></ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...toggleGroupScenarios[5]}>
        <VStack className="toggle-group-evidence-stack" data-testid="toggle-group-layout">
          <EvidenceGroup description="Only attachment changes; Items remain intrinsically sized." title="Attached">
            <div className="toggle-group-specimen-grid toggle-group-specimen-grid--two">
              <Cell label="separated"><StandardGroup label="Separated project view" /></Cell>
              <Cell label="attached"><ToggleGroup.Root ariaLabel="Attached project view" attached defaultValue="cards"><ToggleGroup.Item value="cards">Cards</ToggleGroup.Item><ToggleGroup.Item value="list">List</ToggleGroup.Item><ToggleGroup.Item value="timeline">Timeline</ToggleGroup.Item></ToggleGroup.Root></Cell>
            </div>
          </EvidenceGroup>
          <EvidenceGroup description="Only distribution changes; both groups occupy the same application-owned frame." title="Full width">
            <div className="toggle-group-specimen-grid toggle-group-specimen-grid--two">
              <Cell label="intrinsic"><StandardGroup label="Intrinsic project view" /></Cell>
              <Cell label="fullWidth"><ToggleGroup.Root ariaLabel="Full-width project view" defaultValue="cards" fullWidth><ToggleGroup.Item value="cards">Cards</ToggleGroup.Item><ToggleGroup.Item value="list">List</ToggleGroup.Item><ToggleGroup.Item value="timeline">Timeline</ToggleGroup.Item></ToggleGroup.Root></Cell>
            </div>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...toggleGroupScenarios[6]}>
        <VStack className="toggle-group-evidence-stack" data-testid="toggle-group-interaction">
          <EvidenceGroup description="Only arrow-key axis and visual flow change; selection mode and recipe remain default." title="Orientation">
            <div className="toggle-group-overview">
              <ToggleGroup.Root ariaLabel="Text alignment" defaultValue="start" orientation="vertical"><ToggleGroup.Item value="start">Start</ToggleGroup.Item><ToggleGroup.Item value="center">Center</ToggleGroup.Item><ToggleGroup.Item value="end">End</ToggleGroup.Item></ToggleGroup.Root>
            </div>
          </EvidenceGroup>
          <EvidenceGroup description="Root and Item unavailability remain distinct while selected values stay visible." title="Disabled states">
            <div className="toggle-group-specimen-grid toggle-group-specimen-grid--two">
              <Cell label="disabled Root"><ToggleGroup.Root ariaLabel="Disabled modes" defaultValue="one" disabled><ToggleGroup.Item value="one">One</ToggleGroup.Item><ToggleGroup.Item value="two">Two</ToggleGroup.Item></ToggleGroup.Root></Cell>
              <Cell label="disabled Item"><ToggleGroup.Root ariaLabel="Availability" defaultValue="ready"><ToggleGroup.Item value="ready">Ready</ToggleGroup.Item><ToggleGroup.Item disabled value="archived">Archived</ToggleGroup.Item><ToggleGroup.Item value="draft">Draft</ToggleGroup.Item></ToggleGroup.Root></Cell>
            </div>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...toggleGroupScenarios[7]}>
        <VStack className="toggle-group-evidence-stack">
          <EvidenceGroup description="Adjacent light and dark scopes preserve the default group recipe." title="Scoped appearances">
            <div className="toggle-group-scoped-grid" data-testid="toggle-group-appearance"><div data-brick-appearance="light"><code>light</code><StandardGroup label="Light project view" /></div><div data-brick-appearance="dark"><code>dark</code><StandardGroup label="Dark project view" /></div></div>
          </EvidenceGroup>
          <EvidenceGroup description="The code names supported hooks and exactly matches the rendered result." title="Consumer customization">
            <article className="toggle-group-customization"><div><Text as="h4" variant="title-sm">Group and shared Item CSS properties</Text><Text as="p" tone="secondary" variant="body-sm">The Root gap and each Item’s radius, padding, and selected paint are customized visibly.</Text><pre aria-label="ToggleGroup customization example" tabIndex={0}><code>{`.custom-toggle-group {
  --brick-toggle-group-gap: 1rem;
}

.custom-toggle-group .brick-toggle-group-item {
  --brick-toggle-padding-inline: 1.5rem;
  --brick-toggle-radius: 0.75rem;
}

.custom-toggle-group
  .brick-toggle-group-item[data-state="on"] {
  border-color: var(--brick-color-accent-solid);
  background: var(--brick-color-accent-solid);
  color: var(--brick-color-accent-on-solid);
  box-shadow: none;
}

<ToggleGroup.Root
  ariaLabel="Custom project view"
  className="custom-toggle-group"
  data-slot="custom-toggle-group"
  defaultValue="cards"
>
  <ToggleGroup.Item value="cards">Cards</ToggleGroup.Item>
  <ToggleGroup.Item value="list">List</ToggleGroup.Item>
</ToggleGroup.Root>`}</code></pre></div><div className="toggle-group-customization__preview"><ToggleGroup.Root ariaLabel="Custom project view" className="custom-toggle-group" data-slot="custom-toggle-group" defaultValue="cards"><ToggleGroup.Item value="cards">Cards</ToggleGroup.Item><ToggleGroup.Item value="list">List</ToggleGroup.Item></ToggleGroup.Root></div></article>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...toggleGroupScenarios[8]}>
        <VStack className="toggle-group-evidence-stack" data-testid="toggle-group-stress">
          <EvidenceGroup description="Separated Items wrap inside a 20rem frame without shrinking target geometry." title="Constrained-width stress">
            <div className="toggle-group-stress-panel"><div className="toggle-group-phone-frame"><ToggleGroup.Root ariaLabel="Localized filters" defaultValue={["long"]} type="multiple"><ToggleGroup.Item value="long">ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789</ToggleGroup.Item><ToggleGroup.Item value="ready">Ready</ToggleGroup.Item></ToggleGroup.Root></div></div>
          </EvidenceGroup>
          <EvidenceGroup description="Attached logical corners and horizontal arrow order mirror in a genuine right-to-left context." title="RTL inheritance">
            <div className="toggle-group-stress-panel"><div className="toggle-group-phone-frame" dir="rtl"><ToggleGroup.Root ariaLabel="طريقة عرض المشروع" attached defaultValue="cards"><ToggleGroup.Item value="cards">بطاقات</ToggleGroup.Item><ToggleGroup.Item value="list">قائمة</ToggleGroup.Item></ToggleGroup.Root></div></div>
          </EvidenceGroup>
        </VStack>
      </Scenario>
    </VStack>
  );
}
