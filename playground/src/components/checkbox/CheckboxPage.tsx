import { useState, type CSSProperties } from "react";
import { Button, Checkbox, Field, Form, Text, type CheckboxSize } from "@flowstack-ui/brick";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import {
  FormEvidenceCell as Cell,
  FormEvidenceGroup as EvidenceGroup,
  FormRenderedOutput as RenderedOutput,
} from "../../shared/FormEvidence.js";
import "../../shared/forms-evidence.playground.css";

const sizes: CheckboxSize[] = ["sm", "md", "lg"];
const customCheckboxTokens = {
  "--brick-checkbox-control-checked-background": "#18794e",
  "--brick-checkbox-control-size": "1.5rem",
  "--brick-checkbox-gap": "1rem",
  "--brick-checkbox-radius": "0.5rem",
  "--brick-checkbox-row-padding-inline": "0.75rem",
} as CSSProperties;

export const checkboxScenarios = [
  { description: "Checkbox’s canonical rendering is one unchecked medium independent submitted selection with visible text. Atom owns checkbox semantics, state, form participation, and focus.", id: "checkbox.overview", number: 1, title: "Overview" },
  { description: "Unchecked, checked, and indeterminate change only native state and force-mounted mark artwork; complete content and medium geometry remain identical.", id: "checkbox.states", number: 2, title: "States" },
  { description: "Small, medium, and large change complete row/control geometry only. Every specimen remains unchecked with identical content.", id: "checkbox.sizes", number: 3, title: "Sizes" },
  { description: "Uncontrolled, controlled, and read-only examples retain identical checked content, medium size, and visual state so only ownership or mutability changes.", id: "checkbox.control", navigationTitle: "Ownership", number: 4, title: "State ownership" },
  { description: "A disabled artwork matrix preserves medium geometry across every check state; read-only, invalid, and required examples remain default unchecked comparisons.", id: "checkbox.availability", navigationTitle: "Availability", number: 5, title: "Availability and validity" },
  { description: "Field and Form compose one submitted acknowledgement with inline validation, first-invalid focus, correction, reset, and external form ownership.", id: "checkbox.form", navigationTitle: "Form", number: 6, title: "Form and Field composition" },
  { description: "Default, render, and asChild paths preserve one semantic checkbox, the built-in visual subtree, content, native props, events, slots, and refs.", id: "checkbox.composition", navigationTitle: "Compose", number: 7, title: "Composition" },
  { description: "Adjacent appearance scopes preserve default recipes. Public root/control classes, slots, native style, and Checkbox tokens customize one row only.", id: "checkbox.appearance", navigationTitle: "Theme", number: 8, title: "Appearance and customization" },
  { description: "Long localized content, unbroken copy, genuine RTL direction, logical invalid cues, touch targets, and narrow widths remain contained.", id: "checkbox.stress", navigationTitle: "Stress", number: 9, title: "Responsive and RTL" },
] as const satisfies readonly ScenarioDefinition[];

export function CheckboxPage() {
  const [controlled, setControlled] = useState<false | true | "indeterminate">(true);
  const [status, setStatus] = useState("No form event yet");

  return (
    <div className="forms-page" data-component-page="checkbox" data-testid="checkbox-workbench">
      <Scenario {...checkboxScenarios[0]}>
        <div className="forms-overview" data-testid="checkbox-overview"><Checkbox>Ready to publish</Checkbox></div>
      </Scenario>

      <Scenario {...checkboxScenarios[1]}>
        <div className="forms-grid forms-grid--three" data-testid="checkbox-states">
          <Cell label="unchecked"><Checkbox>Preview</Checkbox></Cell>
          <Cell label="checked"><Checkbox defaultChecked>Preview</Checkbox></Cell>
          <Cell label="indeterminate"><Checkbox defaultChecked="indeterminate">Preview</Checkbox></Cell>
        </div>
      </Scenario>

      <Scenario {...checkboxScenarios[2]}>
        <div className="forms-grid forms-grid--three" data-testid="checkbox-sizes">
          {sizes.map((size) => <Cell key={size} label={size}><Checkbox size={size}>Preview</Checkbox></Cell>)}
        </div>
      </Scenario>

      <Scenario {...checkboxScenarios[3]}>
        <div className="forms-grid forms-grid--three" data-testid="checkbox-ownership">
          <Cell label="uncontrolled"><Checkbox defaultChecked>Preview</Checkbox></Cell>
          <Cell label="controlled"><Checkbox checked={controlled} onCheckedChange={setControlled}>Preview</Checkbox></Cell>
          <Cell label="readOnly"><Checkbox defaultChecked readOnly>Preview</Checkbox></Cell>
        </div>
      </Scenario>

      <Scenario {...checkboxScenarios[4]}>
        <div className="forms-evidence-stack" data-testid="checkbox-availability">
          <EvidenceGroup description="Only checked state changes. Every specimen remains disabled at the default medium size and retains the same complete row geometry." title="Disabled artwork">
            <div className="forms-grid forms-grid--three" data-testid="checkbox-disabled-artwork">
              <Cell label="unchecked"><Checkbox disabled>Preview</Checkbox></Cell>
              <Cell label="checked"><Checkbox defaultChecked disabled>Preview</Checkbox></Cell>
              <Cell label="indeterminate"><Checkbox defaultChecked="indeterminate" disabled>Preview</Checkbox></Cell>
            </div>
          </EvidenceGroup>
          <EvidenceGroup description="Only the named state changes; content, unchecked state, and medium geometry remain identical." title="Read-only and validity">
            <div className="forms-grid forms-grid--three" data-testid="checkbox-validity">
              <Cell label="readOnly"><Checkbox readOnly>Preview</Checkbox></Cell>
              <Cell label="invalid"><Checkbox invalid>Preview</Checkbox></Cell>
              <Cell label="required"><Checkbox required>Preview</Checkbox></Cell>
            </div>
          </EvidenceGroup>
        </div>
      </Scenario>

      <Scenario {...checkboxScenarios[5]}>
        <div className="forms-evidence-stack" data-testid="checkbox-form">
          <EvidenceGroup description="One required Checkbox composes with Field Error and native FormData without becoming a group." title="Submitted acknowledgement">
            <div className="forms-overview"><Form aria-label="Release acknowledgement" id="checkbox-form-example" onReset={() => setStatus("Form reset")} onSubmit={(event) => { const data = new FormData(event.currentTarget); setStatus(`Submitted: ${String(data.get("acknowledgement") ?? "none")}`); }} preventDefaultOnSubmit><Field.Root id="checkbox-acknowledgement" required><Field.Label>Release acknowledgement</Field.Label><Checkbox name="acknowledgement" required value="accepted">I reviewed the release notes</Checkbox><Field.Description>This selection submits a native value.</Field.Description><Field.Error>Review is required.</Field.Error></Field.Root><div className="forms-actions"><Button type="submit">Save acknowledgement</Button><Button tone="neutral" type="reset">Reset</Button></div><output className="forms-status">{status}</output></Form></div>
          </EvidenceGroup>
          <EvidenceGroup description="The semantic Checkbox may belong to a native Form elsewhere in the document." title="External form ownership">
            <div className="forms-overview"><Checkbox form="checkbox-form-example" name="external-consent" value="yes">Externally owned preference</Checkbox></div>
          </EvidenceGroup>
        </div>
      </Scenario>

      <Scenario {...checkboxScenarios[6]}>
        <div className="forms-evidence-stack" data-testid="checkbox-composition">
          <EvidenceGroup description="render supplies the button host while Checkbox preserves semantics, slots, the built-in visual subtree, content, and default state." title="render output">
            <RenderedOutput label="Rendered adapter HTML"><Checkbox data-testid="checkbox-render" render={<button data-adapter="rendered-checkbox" />}>Preview</Checkbox></RenderedOutput>
          </EvidenceGroup>
          <EvidenceGroup description="asChild merges Checkbox into a consumer button while preserving the same visible content, medium size, and unchecked state." title="asChild output">
            <RenderedOutput label="Composed adapter HTML"><Checkbox asChild data-testid="checkbox-as-child"><button data-adapter="composed-checkbox">Preview</button></Checkbox></RenderedOutput>
          </EvidenceGroup>
        </div>
      </Scenario>

      <Scenario {...checkboxScenarios[7]}>
        <div className="forms-evidence-stack">
          <EvidenceGroup description="The same default unchecked state composes inside adjacent local appearance scopes." title="Scoped appearances">
            <div className="forms-scoped-grid" data-testid="checkbox-appearance"><div data-brick-appearance="light"><code>light</code><Checkbox>Preview</Checkbox></div><div data-brick-appearance="dark"><code>dark</code><Checkbox>Preview</Checkbox></div></div>
          </EvidenceGroup>
          <EvidenceGroup description="The code names supported hooks and exactly matches the rendered result." title="Consumer customization">
            <article className="forms-customization"><div><Text as="h4" variant="title-sm">Row and visual-control properties</Text><Text as="p" tone="secondary" variant="body-sm">Slot, native style, and public Checkbox tokens visibly change the row and control.</Text><pre aria-label="Checkbox customization example" tabIndex={0}><code>{`<Checkbox
  data-slot="custom-checkbox"
  defaultChecked
  style={{
    "--brick-checkbox-control-checked-background": "#18794e",
    "--brick-checkbox-control-size": "1.5rem",
    "--brick-checkbox-gap": "1rem",
    "--brick-checkbox-radius": "0.5rem",
    "--brick-checkbox-row-padding-inline": "0.75rem",
  }}
>
  Customized selection
</Checkbox>`}</code></pre></div><div className="forms-customization__preview"><Checkbox data-slot="custom-checkbox" defaultChecked style={customCheckboxTokens}>Customized selection</Checkbox></div></article>
          </EvidenceGroup>
        </div>
      </Scenario>

      <Scenario {...checkboxScenarios[8]}>
        <div className="forms-evidence-stack" data-testid="checkbox-stress">
          <EvidenceGroup description="Long content and an unbroken segment wrap inside a 20rem application-owned frame." title="Constrained-width stress">
            <div className="forms-stress-panel"><div className="forms-phone-frame"><Checkbox defaultChecked>Extremely detailed localized publishing preference ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-without-a-natural-break</Checkbox></div></div>
          </EvidenceGroup>
          <EvidenceGroup description="Control, label, state, and logical invalid cue inherit genuine right-to-left direction." title="RTL inheritance">
            <div className="forms-stress-panel"><div className="forms-phone-frame" dir="rtl"><Checkbox defaultChecked invalid>تلقي تقارير النشر الأسبوعية وتحديثات الحساب</Checkbox></div></div>
          </EvidenceGroup>
        </div>
      </Scenario>
    </div>
  );
}
