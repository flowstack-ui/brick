import type { CSSProperties } from "react";
import { Field, Text } from "@flowstack-ui/brick";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import {
  FormEvidenceCell as Cell,
  FormEvidenceControl as Control,
  FormEvidenceGroup as EvidenceGroup,
  FormRenderedOutput as RenderedOutput,
} from "../../shared/FormEvidence.js";
import "../../shared/forms-evidence.playground.css";

const customFieldTokens = {
  "--brick-field-column-gap": "2rem",
  "--brick-field-error-foreground": "#7a102f",
  "--brick-field-label-foreground": "#123b5d",
  "--brick-field-row-gap": "1rem",
} as CSSProperties;

export const fieldScenarios = [
  { description: "Field’s canonical rendering is one vertical visible Label, one compatible control, and one Description. Generated IDs and relationships remain Atom-owned.", id: "field.overview", number: 1, title: "Overview" },
  { description: "Root, Label, Description, Error, and RequiredIndicator remain explicit parts. Field never creates, clones, or chooses the application control.", id: "field.anatomy", number: 2, title: "Anatomy" },
  { description: "Required, optional, disabled, and read-only examples change only the named state while retaining the default vertical anatomy.", id: "field.states", number: 3, title: "States" },
  { description: "Invalid, matched Error, forced server Error, and invalid-without-message states remain distinct without automatic live announcements.", id: "field.errors", navigationTitle: "Errors", number: 4, title: "Errors and validity" },
  { description: "Vertical is the default. Horizontal changes only layout tracks and returns to one column before labels or controls overflow.", id: "field.orientation", navigationTitle: "Layout", number: 5, title: "Orientation" },
  { description: "Generated and explicit IDs, Label activation, Description/Error relationships, and explicit native ARIA remain stable before interaction and hydration.", id: "field.relationships", navigationTitle: "Relations", number: 6, title: "Relationships" },
  { description: "Default, render, and asChild paths preserve appropriate elements, part registration, classes, slots, relationships, and refs.", id: "field.composition", navigationTitle: "Compose", number: 7, title: "Composition" },
  { description: "Adjacent appearance scopes preserve default anatomy. Public part classes, slots, native style, and Field tokens customize one Field only.", id: "field.appearance", navigationTitle: "Theme", number: 8, title: "Appearance and customization" },
  { description: "Long labels, unbroken descriptions, horizontal reflow, genuine RTL content, logical invalid cues, and narrow widths remain contained.", id: "field.stress", navigationTitle: "Stress", number: 9, title: "Responsive and RTL" },
] as const satisfies readonly ScenarioDefinition[];

function DefaultField({
  id,
  orientation = "vertical",
}: {
  id: string;
  orientation?: "horizontal" | "vertical";
}) {
  return <Field.Root id={id} orientation={orientation}><Field.Label>Work email</Field.Label><Control name={id} placeholder="name@example.com" /><Field.Description>Used for account notices.</Field.Description></Field.Root>;
}

export function FieldPage() {
  return (
    <div className="forms-page" data-component-page="field" data-testid="field-workbench">
      <Scenario {...fieldScenarios[0]}>
        <div className="forms-overview" data-testid="field-overview"><DefaultField id="field-overview-email" /></div>
      </Scenario>

      <Scenario {...fieldScenarios[1]}>
        <div className="forms-grid forms-grid--two forms-grid--preview-start" data-testid="field-anatomy">
          <Cell label="complete matched anatomy"><Field.Root id="field-complete" invalid required><Field.Label>Work email</Field.Label><Control name="email" /><Field.Description>Used for account notices.</Field.Description><Field.Error>Enter a valid email address.</Field.Error></Field.Root></Cell>
          <Cell label="optional indicator fallback"><Field.Root id="field-optional-anatomy"><Field.Label>Work email <Field.RequiredIndicator fallback="(optional)" /></Field.Label><Control name="email" /><Field.Description>Used for account notices.</Field.Description></Field.Root></Cell>
        </div>
      </Scenario>

      <Scenario {...fieldScenarios[2]}>
        <div className="forms-grid forms-grid--four" data-testid="field-states">
          <Cell label="required"><Field.Root id="field-required" required><Field.Label>Work email</Field.Label><Control /><Field.Description>Used for account notices.</Field.Description></Field.Root></Cell>
          <Cell label="optional"><Field.Root id="field-optional"><Field.Label>Work email <Field.RequiredIndicator fallback="(optional)" /></Field.Label><Control /><Field.Description>Used for account notices.</Field.Description></Field.Root></Cell>
          <Cell label="disabled"><Field.Root disabled id="field-disabled"><Field.Label>Work email</Field.Label><Control /><Field.Description>Used for account notices.</Field.Description></Field.Root></Cell>
          <Cell label="readOnly"><Field.Root id="field-readonly" readOnly><Field.Label>Work email</Field.Label><Control defaultValue="name@example.com" /><Field.Description>Used for account notices.</Field.Description></Field.Root></Cell>
        </div>
      </Scenario>

      <Scenario {...fieldScenarios[3]}>
        <div className="forms-grid forms-grid--three forms-grid--preview-start" data-testid="field-errors">
          <Cell label="invalid + matched Error"><Field.Root id="field-invalid" invalid><Field.Label>Work email</Field.Label><Control /><Field.Description>Used for account notices.</Field.Description><Field.Error>Enter a valid email address.</Field.Error></Field.Root></Cell>
          <Cell label="forced application Error"><Field.Root id="field-forced"><Field.Label>Work email</Field.Label><Control /><Field.Description>Used for account notices.</Field.Description><Field.Error forceMatch>Enter a valid email address.</Field.Error></Field.Root></Cell>
          <Cell label="invalid · no Error"><Field.Root id="field-invalid-no-error" invalid><Field.Label>Work email</Field.Label><Control /><Field.Description>Used for account notices.</Field.Description></Field.Root></Cell>
        </div>
      </Scenario>

      <Scenario {...fieldScenarios[4]}>
        <div className="forms-evidence-stack" data-testid="field-orientation">
          <EvidenceGroup description="Default source order and one layout track." title="Vertical">
            <div className="forms-overview"><DefaultField id="field-vertical" /></div>
          </EvidenceGroup>
          <EvidenceGroup description="Only orientation changes; Description and Error align with the control track while space permits." title="Horizontal">
            <div className="forms-overview"><DefaultField id="field-horizontal" orientation="horizontal" /></div>
          </EvidenceGroup>
        </div>
      </Scenario>

      <Scenario {...fieldScenarios[5]}>
        <div className="forms-evidence-stack" data-testid="field-relationships">
          <EvidenceGroup description="Atom derives stable label, control, and description IDs from the explicit Root ID and connects them automatically." title="Generated IDs and ARIA">
            <RenderedOutput label="Generated Field HTML"><DefaultField id="field-generated-relations" /></RenderedOutput>
          </EvidenceGroup>
          <EvidenceGroup description="The visible result stays identical while an explicit control ID and native ARIA references remain authoritative." title="Explicit control ID and ARIA">
            <RenderedOutput label="Explicit Field HTML"><Field.Root id="field-explicit-aria"><Field.Label htmlFor="field-explicit-control">Work email</Field.Label><Control aria-describedby="field-explicit-aria-description" aria-labelledby="field-explicit-aria-label" id="field-explicit-control" name="field-explicit-aria" placeholder="name@example.com" /><Field.Description>Used for account notices.</Field.Description></Field.Root></RenderedOutput>
          </EvidenceGroup>
        </div>
      </Scenario>

      <Scenario {...fieldScenarios[6]}>
        <div className="forms-evidence-stack" data-testid="field-composition">
          <EvidenceGroup description="render supplies appropriate host elements while Field preserves classes, slots, relationships, and content." title="render output">
            <RenderedOutput label="Rendered adapter HTML"><Field.Root data-testid="field-render" id="field-rendered" render={<section data-adapter="rendered-field" />}><Field.Label render={<label data-adapter="rendered-label" />}>Work email</Field.Label><Control name="field-rendered" placeholder="name@example.com" /><Field.Description render={<p data-adapter="rendered-description" />}>Used for account notices.</Field.Description></Field.Root></RenderedOutput>
          </EvidenceGroup>
          <EvidenceGroup description="asChild merges Field behavior into consumer elements while retaining the same visible anatomy and relationships." title="asChild output">
            <RenderedOutput label="Composed adapter HTML"><Field.Root asChild data-testid="field-as-child" id="field-composed"><section data-adapter="composed-field"><Field.Label asChild><label data-adapter="composed-label">Work email</label></Field.Label><Control name="field-composed" placeholder="name@example.com" /><Field.Description asChild><p data-adapter="composed-description">Used for account notices.</p></Field.Description></section></Field.Root></RenderedOutput>
          </EvidenceGroup>
        </div>
      </Scenario>

      <Scenario {...fieldScenarios[7]}>
        <div className="forms-evidence-stack">
          <EvidenceGroup description="The same default Field anatomy composes inside adjacent local appearance scopes." title="Scoped appearances">
            <div className="forms-scoped-grid" data-testid="field-appearance"><div data-brick-appearance="light"><code>light</code><DefaultField id="field-light" /></div><div data-brick-appearance="dark"><code>dark</code><DefaultField id="field-dark" /></div></div>
          </EvidenceGroup>
          <EvidenceGroup description="The code names supported hooks and exactly matches the rendered result." title="Consumer customization">
            <article className="forms-customization"><div><Text as="h4" variant="title-sm">Field anatomy properties</Text><Text as="p" tone="secondary" variant="body-sm">Class, slot, native style, and public Field tokens visibly change this Field only.</Text><pre aria-label="Field customization example" tabIndex={0}><code>{`<Field.Root
  data-slot="custom-field"
  invalid
  style={{
    "--brick-field-column-gap": "2rem",
    "--brick-field-label-foreground": "#123b5d",
    "--brick-field-row-gap": "1rem",
    "--brick-field-error-foreground": "#7a102f",
  }}
>
  ...
</Field.Root>`}</code></pre></div><div className="forms-customization__preview"><Field.Root data-slot="custom-field" id="field-custom" invalid style={customFieldTokens}><Field.Label>Customized account field</Field.Label><Control /><Field.Description>Local spacing and hierarchy.</Field.Description><Field.Error>Customized error treatment.</Field.Error></Field.Root></div></article>
          </EvidenceGroup>
        </div>
      </Scenario>

      <Scenario {...fieldScenarios[8]}>
        <div className="forms-evidence-stack" data-testid="field-stress">
          <EvidenceGroup description="A long horizontal Field returns to one column and wraps inside a 20rem frame." title="Constrained-width stress">
            <div className="forms-stress-panel"><div className="forms-phone-frame"><Field.Root id="field-long" invalid orientation="horizontal" required><Field.Label>Extremely detailed localized account recovery and emergency contact address</Field.Label><Control /><Field.Description>ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-without-a-natural-break remains contained.</Field.Description><Field.Error>The translated error remains fully reachable.</Field.Error></Field.Root></div></div>
          </EvidenceGroup>
          <EvidenceGroup description="Label, control, messages, and logical invalid treatment inherit genuine right-to-left direction." title="RTL inheritance">
            <div className="forms-stress-panel"><div className="forms-phone-frame" dir="rtl"><Field.Root id="field-rtl" invalid required><Field.Label>عنوان البريد الإلكتروني للحساب</Field.Label><Control /><Field.Description>يستخدم هذا العنوان لإشعارات الحساب.</Field.Description><Field.Error>يرجى إدخال عنوان صالح.</Field.Error></Field.Root></div></div>
          </EvidenceGroup>
        </div>
      </Scenario>
    </div>
  );
}
