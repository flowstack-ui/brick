import { useState, type CSSProperties } from "react";
import {
  Button,
  Fieldset,
  Form,
  Grid,
  HStack,
  RadioGroup,
  Text,
  VStack,
  type RadioGroupSize,
} from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import {
  FormEvidenceCell as Cell,
  FormEvidenceGroup as EvidenceGroup,
  FormRenderedOutput as RenderedOutput,
} from "../../shared/FormEvidence.js";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import "../../shared/forms-evidence.playground.css";

const sizes: RadioGroupSize[] = ["sm", "md", "lg"];
const customTokens = {
  "--brick-radio-group-gap": "1rem",
  "--brick-radio-checked": "#18794e",
  "--brick-radio-control-size": "1.375rem",
  "--brick-radio-dot-size": "0.75rem",
} as CSSProperties;

export const radioGroupScenarios = [
  { description: "RadioGroup’s default is one medium vertical accent selection. Atom owns single selection, roving focus, keyboard, form, validation, direction, and read-only behavior.", id: "radio-group.overview", number: 1, title: "Overview" },
  { description: "Small, medium, and large change shared geometry only. Labels, selected value, vertical layout, and interaction remain identical.", id: "radio-group.sizes", number: 2, title: "Sizes" },
  { description: "Vertical and horizontal change layout and directional arrow mapping only. Horizontal choices wrap without changing their values or selection.", id: "radio-group.orientation", navigationTitle: "Layout", number: 3, title: "Orientation and navigation" },
  { description: "Uncontrolled and controlled groups change only who owns the value. Each example reports its current selection beside the control.", id: "radio-group.ownership", navigationTitle: "Ownership", number: 4, title: "Selection ownership" },
  { description: "Long content, item availability, group availability, and locked selection are independent states on the same default recipe.", id: "radio-group.states", navigationTitle: "States", number: 5, title: "Content and states" },
  { description: "Fieldset supplies the shared name, description, required state, error, validation focus, and correction flow for one visible choice set.", id: "radio-group.validation", navigationTitle: "Validation", number: 6, title: "Validation and Fieldset" },
  { description: "Native submission, reset, and external form ownership preserve exactly one repeated name/value result without custom serialization.", id: "radio-group.form", navigationTitle: "Form", number: 7, title: "Native form behavior" },
  { description: "render and asChild replace hosts while retaining the radiogroup, radios, built-in visuals, labels, state, events, and refs.", id: "radio-group.composition", navigationTitle: "Compose", number: 8, title: "Composition" },
  { description: "Adjacent appearance scopes preserve the default recipe. Supported public variables customize one group and exactly match the shown code.", id: "radio-group.appearance", navigationTitle: "Theme", number: 9, title: "Appearance and customization" },
  { description: "Long localized labels, narrow widths, genuine RTL arrow behavior, logical invalid cues, wrapping, and touch targets remain usable.", id: "radio-group.stress", navigationTitle: "Stress", number: 10, title: "Responsive and RTL" },
] as const satisfies readonly ScenarioDefinition[];

function DefaultItems() {
  return <><RadioGroup.Item value="email">Email reports</RadioGroup.Item><RadioGroup.Item value="push">Push notifications</RadioGroup.Item><RadioGroup.Item value="sms">Text messages</RadioGroup.Item></>;
}

export function RadioGroupPage() {
  const [controlled, setControlled] = useState("email");
  const [uncontrolled, setUncontrolled] = useState("email");
  const [status, setStatus] = useState("No form event yet");

  return (
    <VStack className="forms-page" data-component-page="radio-group" data-testid="radio-group-workbench">
      <Scenario {...radioGroupScenarios[0]}>
        <EvidenceSurface className="forms-overview" data-testid="radio-group-overview" inset="lg">
          <RadioGroup.Root aria-label="Delivery channel" defaultValue="email" name="delivery-channel"><DefaultItems /></RadioGroup.Root>
        </EvidenceSurface>
      </Scenario>

      <Scenario {...radioGroupScenarios[1]}>
        <Grid.Root columns={3} className="forms-grid forms-grid--three" data-testid="radio-group-sizes">
          {sizes.map((size) => <Cell key={size} label={size}><RadioGroup.Root aria-label={`${size} delivery channel`} defaultValue="email" size={size}><DefaultItems /></RadioGroup.Root></Cell>)}
        </Grid.Root>
      </Scenario>

      <Scenario {...radioGroupScenarios[2]}>
        <Grid.Root columns={2} className="forms-grid forms-grid--two" data-testid="radio-group-orientation">
          <Cell label="vertical"><RadioGroup.Root aria-label="Vertical delivery channel" defaultValue="email"><DefaultItems /></RadioGroup.Root></Cell>
          <Cell label="horizontal"><RadioGroup.Root aria-label="Horizontal delivery channel" defaultValue="email" orientation="horizontal"><DefaultItems /></RadioGroup.Root></Cell>
        </Grid.Root>
      </Scenario>

      <Scenario {...radioGroupScenarios[3]}>
        <Grid.Root columns={2} className="forms-grid forms-grid--two" data-testid="radio-group-ownership">
          <Cell label="uncontrolled"><VStack gap="2"><RadioGroup.Root aria-label="Uncontrolled delivery channel" defaultValue="email" onValueChange={setUncontrolled}><DefaultItems /></RadioGroup.Root><output><Text as="span" tone="secondary" variant="body-sm">Selected: {uncontrolled}</Text></output></VStack></Cell>
          <Cell label="controlled"><VStack gap="2"><RadioGroup.Root aria-label="Controlled delivery channel" onValueChange={setControlled} value={controlled}><DefaultItems /></RadioGroup.Root><output><Text as="span" tone="secondary" variant="body-sm">Selected: {controlled}</Text></output></VStack></Cell>
        </Grid.Root>
      </Scenario>

      <Scenario {...radioGroupScenarios[4]}>
        <Grid.Root columns={4} className="forms-grid forms-grid--four forms-grid--preview-start" data-testid="radio-group-states">
          <Cell label="long label"><RadioGroup.Root aria-label="Detailed delivery channel" defaultValue="email"><RadioGroup.Item value="email">Detailed weekly publishing reports and account activity summaries</RadioGroup.Item><RadioGroup.Item value="push">Push notifications</RadioGroup.Item></RadioGroup.Root></Cell>
          <Cell label="disabled item"><RadioGroup.Root aria-label="Limited delivery channel" defaultValue="email"><RadioGroup.Item value="email">Email reports</RadioGroup.Item><RadioGroup.Item disabled value="push">Push notifications</RadioGroup.Item></RadioGroup.Root></Cell>
          <Cell label="disabled group"><RadioGroup.Root aria-label="Disabled delivery channel" defaultValue="email" disabled><DefaultItems /></RadioGroup.Root></Cell>
          <Cell label="read only"><RadioGroup.Root aria-label="Read-only delivery channel" defaultValue="email" name="locked-channel" readOnly><DefaultItems /></RadioGroup.Root></Cell>
        </Grid.Root>
      </Scenario>

      <Scenario {...radioGroupScenarios[5]}>
        <Grid.Root columns={2} className="forms-grid forms-grid--two forms-grid--preview-start" data-testid="radio-group-validation">
          <Cell label="inline validation"><Fieldset.Root id="radio-inline" invalid required><Fieldset.Legend>Delivery channel</Fieldset.Legend><Fieldset.Description>Choose how publishing reports arrive.</Fieldset.Description><RadioGroup.Root defaultValue="" name="inline-channel"><DefaultItems /></RadioGroup.Root><Fieldset.Error>Choose one delivery channel.</Fieldset.Error></Fieldset.Root></Cell>
          <Cell label="native validation"><Form aria-label="Radio native validation" preventDefaultOnSubmit><Fieldset.Root id="radio-native" required><Fieldset.Legend>Delivery channel</Fieldset.Legend><Fieldset.Description>Choose how publishing reports arrive.</Fieldset.Description><RadioGroup.Root name="native-channel"><DefaultItems /></RadioGroup.Root><Fieldset.Error>Choose one delivery channel.</Fieldset.Error></Fieldset.Root><Button type="submit">Validate choice</Button></Form></Cell>
        </Grid.Root>
      </Scenario>

      <Scenario {...radioGroupScenarios[6]}>
        <VStack className="forms-evidence-stack" data-testid="radio-group-form">
          <EvidenceGroup description="Submit reports the selected native value. Reset restores Email reports without changing the visual recipe." title="Submission and reset">
            <EvidenceSurface className="forms-overview" inset="lg"><Form aria-label="Delivery preferences" id="radio-group-form-example" onReset={() => setStatus("Form reset: email")} onSubmit={(event) => setStatus(`Submitted: ${new FormData(event.currentTarget).get("delivery") ?? "none"}`)} preventDefaultOnSubmit><Fieldset.Root id="delivery-preferences"><Fieldset.Legend>Delivery channel</Fieldset.Legend><RadioGroup.Root defaultValue="email" name="delivery"><DefaultItems /></RadioGroup.Root></Fieldset.Root><HStack className="forms-actions"><Button type="submit">Save preference</Button><Button tone="neutral" type="reset">Reset</Button></HStack><output className="forms-status">{status}</output></Form></EvidenceSurface>
          </EvidenceGroup>
          <EvidenceGroup description="The group remains elsewhere in the document while its selected native value belongs to the named form." title="External form ownership"><EvidenceSurface className="forms-overview" inset="lg"><RadioGroup.Root aria-label="Externally owned channel" defaultValue="push" form="radio-group-form-example" name="external-channel"><DefaultItems /></RadioGroup.Root></EvidenceSurface></EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...radioGroupScenarios[7]}>
        <VStack className="forms-evidence-stack" data-testid="radio-group-composition">
          <EvidenceGroup description="render supplies both hosts while RadioGroup preserves roles, labels, default state, and built-in control/dot anatomy." title="render output"><RenderedOutput label="Rendered adapter HTML"><RadioGroup.Root aria-label="Rendered delivery channel" defaultValue="email" render={<div data-adapter="rendered-group" />}><RadioGroup.Item render={<button data-adapter="rendered-item" />} value="email">Email reports</RadioGroup.Item><RadioGroup.Item value="push">Push notifications</RadioGroup.Item></RadioGroup.Root></RenderedOutput></EvidenceGroup>
          <EvidenceGroup description="asChild merges the same behavior and visuals into consumer hosts without creating wrapper elements." title="asChild output"><RenderedOutput label="Composed adapter HTML"><RadioGroup.Root asChild aria-label="Composed delivery channel" defaultValue="email"><div data-adapter="composed-group"><RadioGroup.Item asChild value="email"><button data-adapter="composed-item">Email reports</button></RadioGroup.Item><RadioGroup.Item value="push">Push notifications</RadioGroup.Item></div></RadioGroup.Root></RenderedOutput></EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...radioGroupScenarios[8]}>
        <VStack className="forms-evidence-stack">
          <EvidenceGroup description="The same medium vertical selected group composes inside adjacent local appearance scopes." title="Scoped appearances"><Grid.Root columns={2} className="forms-scoped-grid" data-testid="radio-group-appearance"><EvidenceSurface data-brick-appearance="light"><SpecimenLabel>Light</SpecimenLabel><RadioGroup.Root aria-label="Light delivery channel" defaultValue="email"><DefaultItems /></RadioGroup.Root></EvidenceSurface><EvidenceSurface data-brick-appearance="dark"><SpecimenLabel>Dark</SpecimenLabel><RadioGroup.Root aria-label="Dark delivery channel" defaultValue="email"><DefaultItems /></RadioGroup.Root></EvidenceSurface></Grid.Root></EvidenceGroup>
          <EvidenceGroup description="The code names supported hooks and exactly matches the larger green control rendered beside it." title="Consumer customization"><EvidenceSurface as="article" className="forms-customization" inset="lg"><div><Text as="h4" variant="title-sm">Group and control properties</Text><Text as="p" tone="secondary" variant="body-sm">Public variables adjust spacing and selected-control paint without replacing behavior.</Text><PlaygroundCodeBlock aria-label="RadioGroup customization example" tabIndex={0}>{`<RadioGroup.Root
  defaultValue="email"
  style={{
    "--brick-radio-group-gap": "1rem",
    "--brick-radio-checked": "#18794e",
    "--brick-radio-control-size": "1.375rem",
    "--brick-radio-dot-size": "0.75rem",
  }}
>`}</PlaygroundCodeBlock></div><EvidenceSurface className="forms-customization__preview"><RadioGroup.Root aria-label="Customized delivery channel" defaultValue="email" style={customTokens}><DefaultItems /></RadioGroup.Root></EvidenceSurface></EvidenceSurface></EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...radioGroupScenarios[9]}>
        <VStack className="forms-evidence-stack" data-testid="radio-group-stress">
          <EvidenceGroup description="Long localized and unbroken labels wrap inside a narrow application-owned frame." title="Constrained-width stress"><EvidenceSurface className="forms-stress-panel"><div className="forms-phone-frame"><RadioGroup.Root aria-label="Localized delivery channel" defaultValue="long"><RadioGroup.Item value="long">Extremely detailed localized publishing preference ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789</RadioGroup.Item><RadioGroup.Item value="push">Push notifications</RadioGroup.Item></RadioGroup.Root></div></EvidenceSurface></EvidenceGroup>
          <EvidenceGroup description="The horizontal group uses genuine right-to-left direction; logical arrow navigation and invalid cue reverse without mirrored text hacks." title="RTL inheritance"><EvidenceSurface className="forms-stress-panel"><div className="forms-phone-frame" dir="rtl"><RadioGroup.Root aria-label="طرق الإشعار" defaultValue="email" dir="rtl" invalid orientation="horizontal"><RadioGroup.Item value="email">البريد الإلكتروني</RadioGroup.Item><RadioGroup.Item value="push">الهاتف</RadioGroup.Item><RadioGroup.Item value="sms">رسالة نصية</RadioGroup.Item></RadioGroup.Root></div></EvidenceSurface></EvidenceGroup>
        </VStack>
      </Scenario>
    </VStack>
  );
}
