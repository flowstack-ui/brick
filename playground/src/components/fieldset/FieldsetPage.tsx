import type { CSSProperties } from "react";
import {
  Grid,
  CheckboxGroup,
  Field,
  Fieldset,
  Text,
  VStack,
} from "@flowstack-ui/brick";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import {
  FormEvidenceCell as Cell,
  FormEvidenceControl as Control,
  FormEvidenceGroup as EvidenceGroup,
  FormRenderedOutput as RenderedOutput,
} from "../../shared/FormEvidence.js";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import "../../shared/forms-evidence.playground.css";

const customFieldsetTokens = {
  "--brick-fieldset-control-gap": "1.5rem",
  "--brick-fieldset-error-foreground": "#7a102f",
  "--brick-fieldset-gap": "1rem",
  "--brick-fieldset-legend-foreground": "#123b5d",
} as CSSProperties;

export const fieldsetScenarios = [
  { description: "Fieldset’s canonical rendering is an unboxed native group with one Legend, one Description, and related controls. It adds no Card surface or generic section role.", id: "fieldset.overview", number: 1, title: "Overview" },
  { description: "Root, Legend, Description, and Error remain explicit native/group parts. Required and optional indicators belong to Legend without invalid fieldset ARIA.", id: "fieldset.anatomy", number: 2, title: "Anatomy" },
  { description: "Required, optional, disabled, and invalid examples change only the named state while preserving native grouping and source order.", id: "fieldset.states", number: 3, title: "States" },
  { description: "CheckboxGroup and nested Fields remain independent descendants while Legend and group messages retain their shared relationship.", id: "fieldset.descendants", navigationTitle: "Descendants", number: 4, title: "Descendant composition" },
  { description: "Generated Legend, Description, and Error relationships expose the matched invalid state; forceMatch shows the same Error without making the group invalid.", id: "fieldset.relationships", navigationTitle: "Relations", number: 5, title: "Relationships and errors" },
  { description: "Default, render, and asChild paths preserve real fieldset/legend semantics when native grouping is required, plus classes, slots, parts, and refs.", id: "fieldset.composition", navigationTitle: "Compose", number: 6, title: "Composition" },
  { description: "Adjacent appearance scopes preserve plain grouping. Public part classes, slots, native style, and Fieldset tokens customize one group only.", id: "fieldset.appearance", navigationTitle: "Theme", number: 7, title: "Appearance and customization" },
  { description: "Long legends, unbroken descriptions, grouped choices, genuine RTL content, logical Error cues, and narrow widths remain contained.", id: "fieldset.stress", navigationTitle: "Stress", number: 8, title: "Responsive and RTL" },
] as const satisfies readonly ScenarioDefinition[];

function ChoiceGroup({ id, label = "Notification methods" }: { id: string; label?: string }) {
  return (
    <Fieldset.Root id={id}>
      <Fieldset.Legend>{label}</Fieldset.Legend>
      <Fieldset.Description>Select the methods you check most often.</Fieldset.Description>
      <CheckboxGroup.Root defaultValue={["email"]} name={`${id}-choice`}>
        <CheckboxGroup.Item value="email">Email</CheckboxGroup.Item>
        <CheckboxGroup.Item value="push">Push notification</CheckboxGroup.Item>
      </CheckboxGroup.Root>
    </Fieldset.Root>
  );
}

export function FieldsetPage() {
  return (
    <VStack className="forms-page" data-component-page="fieldset" data-testid="fieldset-workbench">
      <Scenario {...fieldsetScenarios[0]}>
        <EvidenceSurface className="forms-overview" data-testid="fieldset-overview" inset="lg"><ChoiceGroup id="fieldset-overview-methods" /></EvidenceSurface>
      </Scenario>

      <Scenario {...fieldsetScenarios[1]}>
        <Grid.Root columns={2} className="forms-grid forms-grid--two forms-grid--preview-start" data-testid="fieldset-anatomy">
          <Cell label="complete matched anatomy"><Fieldset.Root id="fieldset-complete" invalid required><Fieldset.Legend>Notification methods</Fieldset.Legend><Fieldset.Description>Select the methods you check most often.</Fieldset.Description><CheckboxGroup.Root><CheckboxGroup.Item value="email">Email</CheckboxGroup.Item><CheckboxGroup.Item value="push">Push notification</CheckboxGroup.Item></CheckboxGroup.Root><Fieldset.Error>Select at least one method.</Fieldset.Error></Fieldset.Root></Cell>
          <Cell label="optional indicator fallback"><Fieldset.Root id="fieldset-optional"><Fieldset.Legend optionalIndicator=" (optional)">Notification methods</Fieldset.Legend><Fieldset.Description>Select the methods you check most often.</Fieldset.Description><CheckboxGroup.Root><CheckboxGroup.Item value="email">Email</CheckboxGroup.Item><CheckboxGroup.Item value="push">Push notification</CheckboxGroup.Item></CheckboxGroup.Root></Fieldset.Root></Cell>
        </Grid.Root>
      </Scenario>

      <Scenario {...fieldsetScenarios[2]}>
        <Grid.Root columns={4} className="forms-grid forms-grid--four forms-grid--preview-start" data-testid="fieldset-states">
          <Cell label="required"><Fieldset.Root id="fieldset-required" required><Fieldset.Legend>Delivery methods</Fieldset.Legend><Fieldset.Description>Choose preferred methods.</Fieldset.Description><CheckboxGroup.Root><CheckboxGroup.Item value="email">Email</CheckboxGroup.Item></CheckboxGroup.Root></Fieldset.Root></Cell>
          <Cell label="optional"><Fieldset.Root id="fieldset-optional-state"><Fieldset.Legend optionalIndicator=" (optional)">Delivery methods</Fieldset.Legend><Fieldset.Description>Choose preferred methods.</Fieldset.Description><CheckboxGroup.Root><CheckboxGroup.Item value="email">Email</CheckboxGroup.Item></CheckboxGroup.Root></Fieldset.Root></Cell>
          <Cell label="disabled"><Fieldset.Root disabled id="fieldset-disabled"><Fieldset.Legend>Delivery methods</Fieldset.Legend><Fieldset.Description>Choose preferred methods.</Fieldset.Description><CheckboxGroup.Root><CheckboxGroup.Item value="email">Email</CheckboxGroup.Item></CheckboxGroup.Root></Fieldset.Root></Cell>
          <Cell label="invalid"><Fieldset.Root id="fieldset-invalid" invalid><Fieldset.Legend>Delivery methods</Fieldset.Legend><Fieldset.Description>Choose preferred methods.</Fieldset.Description><CheckboxGroup.Root><CheckboxGroup.Item value="email">Email</CheckboxGroup.Item></CheckboxGroup.Root><Fieldset.Error>Select an option.</Fieldset.Error></Fieldset.Root></Cell>
        </Grid.Root>
      </Scenario>

      <Scenario {...fieldsetScenarios[3]}>
        <VStack className="forms-evidence-stack" data-testid="fieldset-descendants">
          <EvidenceGroup description="Legend and messages describe the related multi-selection while CheckboxGroup owns values." title="CheckboxGroup">
            <EvidenceSurface className="forms-overview" inset="lg"><ChoiceGroup id="fieldset-checkbox-group" label="Publishing channels" /></EvidenceSurface>
          </EvidenceGroup>
          <EvidenceGroup description="Fieldset provides the related address group; each nested Field retains one control relationship." title="Nested Fields">
            <EvidenceSurface className="forms-overview" inset="lg"><Fieldset.Root id="fieldset-address"><Fieldset.Legend>Address details</Fieldset.Legend><Field.Root id="fieldset-city"><Field.Label>City</Field.Label><Control /></Field.Root><Field.Root id="fieldset-postal"><Field.Label>Postal code</Field.Label><Control /></Field.Root></Fieldset.Root></EvidenceSurface>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...fieldsetScenarios[4]}>
        <VStack className="forms-evidence-stack" data-testid="fieldset-relationships">
          <EvidenceGroup description="Atom derives stable Legend, Description, and Error IDs from Root, connects the group, and exposes the matched invalid state." title="Generated group relationships">
            <RenderedOutput label="Generated Fieldset HTML"><Fieldset.Root id="notification-methods" invalid required><Fieldset.Legend>Notification methods</Fieldset.Legend><Fieldset.Description>Select the methods you check most often.</Fieldset.Description><CheckboxGroup.Root><CheckboxGroup.Item value="email">Email</CheckboxGroup.Item><CheckboxGroup.Item value="push">Push notification</CheckboxGroup.Item></CheckboxGroup.Root><Fieldset.Error>Select at least one method.</Fieldset.Error></Fieldset.Root></RenderedOutput>
          </EvidenceGroup>
          <EvidenceGroup description="forceMatch exposes an application-owned Error without marking the otherwise identical group invalid or adding a live role automatically." title="Forced application Error">
            <RenderedOutput label="Forced Error Fieldset HTML"><Fieldset.Root id="fieldset-forced"><Fieldset.Legend>Notification methods</Fieldset.Legend><Fieldset.Description>Select the methods you check most often.</Fieldset.Description><CheckboxGroup.Root><CheckboxGroup.Item value="email">Email</CheckboxGroup.Item><CheckboxGroup.Item value="push">Push notification</CheckboxGroup.Item></CheckboxGroup.Root><Fieldset.Error forceMatch>Select at least one method.</Fieldset.Error></Fieldset.Root></RenderedOutput>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...fieldsetScenarios[5]}>
        <VStack className="forms-evidence-stack" data-testid="fieldset-composition">
          <EvidenceGroup description="render supplies native fieldset, legend, and paragraph hosts while preserving Fieldset classes, slots, relationships, and content." title="render output">
            <RenderedOutput label="Rendered adapter HTML"><Fieldset.Root data-testid="fieldset-render" id="fieldset-rendered" render={<fieldset data-adapter="rendered-fieldset" />}><Fieldset.Legend render={<legend data-adapter="rendered-legend" />}>Notification methods</Fieldset.Legend><Fieldset.Description render={<p data-adapter="rendered-fieldset-description" />}>Select the methods you check most often.</Fieldset.Description><CheckboxGroup.Root><CheckboxGroup.Item value="email">Email</CheckboxGroup.Item><CheckboxGroup.Item value="push">Push notification</CheckboxGroup.Item></CheckboxGroup.Root></Fieldset.Root></RenderedOutput>
          </EvidenceGroup>
          <EvidenceGroup description="asChild merges Fieldset behavior into consumer-owned native fieldset, legend, and paragraph elements with identical visible anatomy." title="asChild output">
            <RenderedOutput label="Composed adapter HTML"><Fieldset.Root asChild data-testid="fieldset-as-child" id="fieldset-composed"><fieldset data-adapter="composed-fieldset"><Fieldset.Legend asChild><legend data-adapter="composed-legend">Notification methods</legend></Fieldset.Legend><Fieldset.Description asChild><p data-adapter="composed-fieldset-description">Select the methods you check most often.</p></Fieldset.Description><CheckboxGroup.Root><CheckboxGroup.Item value="email">Email</CheckboxGroup.Item><CheckboxGroup.Item value="push">Push notification</CheckboxGroup.Item></CheckboxGroup.Root></fieldset></Fieldset.Root></RenderedOutput>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...fieldsetScenarios[6]}>
        <VStack className="forms-evidence-stack">
          <EvidenceGroup description="The same plain native group composes inside adjacent local appearance scopes." title="Scoped appearances">
            <Grid.Root columns={2} className="forms-scoped-grid" data-testid="fieldset-appearance"><EvidenceSurface data-brick-appearance="light"><code>light</code><ChoiceGroup id="fieldset-light" /></EvidenceSurface><EvidenceSurface data-brick-appearance="dark"><code>dark</code><ChoiceGroup id="fieldset-dark" /></EvidenceSurface></Grid.Root>
          </EvidenceGroup>
          <EvidenceGroup description="The code names supported hooks and exactly matches the rendered result." title="Consumer customization">
            <EvidenceSurface as="article" className="forms-customization" inset="lg"><div><Text as="h4" variant="title-sm">Fieldset anatomy properties</Text><Text as="p" tone="secondary" variant="body-sm">Slot, native style, and public Fieldset tokens visibly change this group only.</Text><pre aria-label="Fieldset customization example" tabIndex={0}><code>{`<Fieldset.Root
  data-slot="custom-fieldset"
  invalid
  style={{
    "--brick-fieldset-gap": "1rem",
    "--brick-fieldset-control-gap": "1.5rem",
    "--brick-fieldset-legend-foreground": "#123b5d",
    "--brick-fieldset-error-foreground": "#7a102f",
  }}
>
  ...
</Fieldset.Root>`}</code></pre></div><EvidenceSurface className="forms-customization__preview"><Fieldset.Root data-slot="custom-fieldset" id="fieldset-custom" invalid style={customFieldsetTokens}><Fieldset.Legend>Customized delivery group</Fieldset.Legend><Fieldset.Description>Local spacing and hierarchy.</Fieldset.Description><CheckboxGroup.Root><CheckboxGroup.Item value="one">Option one</CheckboxGroup.Item><CheckboxGroup.Item value="two">Option two</CheckboxGroup.Item></CheckboxGroup.Root><Fieldset.Error>Customized group error.</Fieldset.Error></Fieldset.Root></EvidenceSurface></EvidenceSurface>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...fieldsetScenarios[7]}>
        <VStack className="forms-evidence-stack" data-testid="fieldset-stress">
          <EvidenceGroup description="Long group text and choices wrap inside a 20rem application-owned frame." title="Constrained-width stress">
            <EvidenceSurface className="forms-stress-panel"><div className="forms-phone-frame"><Fieldset.Root id="fieldset-long" invalid required><Fieldset.Legend>Extremely detailed localized publishing and emergency-notification preferences</Fieldset.Legend><Fieldset.Description>ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-without-a-natural-break remains contained.</Fieldset.Description><CheckboxGroup.Root><CheckboxGroup.Item value="long">Detailed translated notification preference</CheckboxGroup.Item></CheckboxGroup.Root><Fieldset.Error>The translated group error remains reachable.</Fieldset.Error></Fieldset.Root></div></EvidenceSurface>
          </EvidenceGroup>
          <EvidenceGroup description="Legend, descriptions, choices, and logical Error cues inherit genuine right-to-left direction." title="RTL inheritance">
            <EvidenceSurface className="forms-stress-panel"><div className="forms-phone-frame" dir="rtl"><Fieldset.Root id="fieldset-rtl" invalid required><Fieldset.Legend>طرق الاتصال المفضلة للحساب</Fieldset.Legend><Fieldset.Description>اختر طريقة واحدة على الأقل.</Fieldset.Description><CheckboxGroup.Root><CheckboxGroup.Item value="email">البريد الإلكتروني</CheckboxGroup.Item><CheckboxGroup.Item value="phone">الهاتف</CheckboxGroup.Item></CheckboxGroup.Root><Fieldset.Error>يرجى اختيار طريقة اتصال واحدة.</Fieldset.Error></Fieldset.Root></div></EvidenceSurface>
          </EvidenceGroup>
        </VStack>
      </Scenario>
    </VStack>
  );
}
