import { useState, type CSSProperties } from "react";
import {
  HStack,
  VStack,
  Button,
  CheckboxGroup,
  Fieldset,
  Form,
  Text,
  type CheckboxSize,
} from "@flowstack-ui/brick";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import {
  FormEvidenceCell as Cell,
  FormEvidenceGroup as EvidenceGroup,
  FormRenderedOutput as RenderedOutput,
} from "../../shared/FormEvidence.js";
import "../../shared/forms-evidence.playground.css";

const values = ["email", "push"];
const sizes: CheckboxSize[] = ["sm", "md", "lg"];
const customGroupTokens = {
  "--brick-checkbox-group-gap": "1.25rem",
  "--brick-checkbox-control-checked-background": "#18794e",
  "--brick-checkbox-gap": "1rem",
  "--brick-checkbox-radius": "0.5rem",
} as CSSProperties;

export const checkboxGroupScenarios = [
  { description: "CheckboxGroup’s canonical rendering is a medium vertical collection of related unchecked choices. Atom owns selection, keyboard, form, and relationship behavior.", id: "checkbox-group.overview", number: 1, title: "Overview" },
  { description: "Uncontrolled and controlled groups change only ownership. Values, content, size, orientation, and native interaction remain identical.", id: "checkbox-group.ownership", navigationTitle: "Ownership", number: 2, title: "Selection ownership" },
  { description: "Parent derives unchecked, mixed, and checked state from allValues. Each example remains interactive and updates the complete available selection without replacing item semantics.", id: "checkbox-group.parent", navigationTitle: "Parent", number: 3, title: "Parent aggregation" },
  { description: "Small, medium, and large change shared item geometry only. Every group retains the same vertical content and selection.", id: "checkbox-group.sizes", number: 4, title: "Sizes" },
  { description: "Vertical and horizontal change layout only. The same values, selection, size, labels, and behavior remain available, with horizontal rows wrapping when needed.", id: "checkbox-group.orientation", navigationTitle: "Layout", number: 5, title: "Orientation" },
  { description: "ItemLabel and ItemDescription provide structured content while disabled and invalid demonstrate group-level and item-level state independently.", id: "checkbox-group.content", navigationTitle: "Content", number: 6, title: "Content and states" },
  { description: "Fieldset and Form compose related native repeated values with one shared legend, description, error, validation focus, correction, and reset flow.", id: "checkbox-group.form", navigationTitle: "Form", number: 7, title: "Form and Fieldset composition" },
  { description: "Default, render, and asChild paths preserve the group, item, parent, content parts, native props, events, slots, and refs.", id: "checkbox-group.composition", navigationTitle: "Compose", number: 8, title: "Composition" },
  { description: "Adjacent appearance scopes preserve default recipes. Public group and Checkbox tokens visibly customize one group only.", id: "checkbox-group.appearance", navigationTitle: "Theme", number: 9, title: "Appearance and customization" },
  { description: "Long localized content, unbroken copy, genuine RTL direction, logical invalid cues, touch targets, wrapping, and narrow widths remain contained.", id: "checkbox-group.stress", navigationTitle: "Stress", number: 10, title: "Responsive and RTL" },
] as const satisfies readonly ScenarioDefinition[];

function DefaultItems() {
  return (
    <>
      <CheckboxGroup.Item value="email">Email reports</CheckboxGroup.Item>
      <CheckboxGroup.Item value="push">Push notifications</CheckboxGroup.Item>
    </>
  );
}

export function CheckboxGroupPage() {
  const [controlled, setControlled] = useState<string[]>(["email"]);
  const [status, setStatus] = useState("No form event yet");

  return (
    <VStack className="forms-page" data-component-page="checkbox-group" data-testid="checkbox-group-workbench">
      <Scenario {...checkboxGroupScenarios[0]}>
        <div className="forms-overview" data-testid="checkbox-group-overview">
          <CheckboxGroup.Root aria-label="Delivery methods" name="delivery-methods">
            <DefaultItems />
          </CheckboxGroup.Root>
        </div>
      </Scenario>

      <Scenario {...checkboxGroupScenarios[1]}>
        <div className="forms-grid forms-grid--two" data-testid="checkbox-group-ownership">
          <Cell label="uncontrolled">
            <CheckboxGroup.Root aria-label="Uncontrolled delivery methods" defaultValue={["email"]}>
              <DefaultItems />
            </CheckboxGroup.Root>
          </Cell>
          <Cell label="controlled">
            <CheckboxGroup.Root aria-label="Controlled delivery methods" onValueChange={setControlled} value={controlled}>
              <DefaultItems />
            </CheckboxGroup.Root>
          </Cell>
        </div>
      </Scenario>

      <Scenario {...checkboxGroupScenarios[2]}>
        <div className="forms-grid forms-grid--three" data-testid="checkbox-group-parent">
          <Cell label="unchecked">
            <CheckboxGroup.Root allValues={values} aria-label="Unchecked aggregate">
              <CheckboxGroup.Parent>All delivery methods</CheckboxGroup.Parent>
              <DefaultItems />
            </CheckboxGroup.Root>
          </Cell>
          <Cell label="mixed">
            <CheckboxGroup.Root allValues={values} aria-label="Mixed aggregate" defaultValue={["email"]}>
              <CheckboxGroup.Parent>All delivery methods</CheckboxGroup.Parent>
              <DefaultItems />
            </CheckboxGroup.Root>
          </Cell>
          <Cell label="checked">
            <CheckboxGroup.Root allValues={values} aria-label="Checked aggregate" defaultValue={values}>
              <CheckboxGroup.Parent>All delivery methods</CheckboxGroup.Parent>
              <DefaultItems />
            </CheckboxGroup.Root>
          </Cell>
        </div>
      </Scenario>

      <Scenario {...checkboxGroupScenarios[3]}>
        <div className="forms-grid forms-grid--three" data-testid="checkbox-group-sizes">
          {sizes.map((size) => (
            <Cell key={size} label={size}>
              <CheckboxGroup.Root aria-label={`${size} delivery methods`} defaultValue={["email"]} size={size}>
                <DefaultItems />
              </CheckboxGroup.Root>
            </Cell>
          ))}
        </div>
      </Scenario>

      <Scenario {...checkboxGroupScenarios[4]}>
        <div className="forms-grid forms-grid--two" data-testid="checkbox-group-orientation">
          <Cell label="vertical">
            <CheckboxGroup.Root aria-label="Vertical delivery methods" defaultValue={["email"]}>
              <DefaultItems />
            </CheckboxGroup.Root>
          </Cell>
          <Cell label="horizontal">
            <CheckboxGroup.Root aria-label="Horizontal delivery methods" defaultValue={["email"]} orientation="horizontal">
              <DefaultItems />
            </CheckboxGroup.Root>
          </Cell>
        </div>
      </Scenario>

      <Scenario {...checkboxGroupScenarios[5]}>
        <VStack className="forms-evidence-stack" data-testid="checkbox-group-content">
          <EvidenceGroup description="Label and description parts preserve one interactive item and automatically contribute its accessible name and description." title="Structured item content">
            <div className="forms-overview">
              <CheckboxGroup.Root aria-label="Detailed delivery methods">
                <CheckboxGroup.Item value="email">
                  <CheckboxGroup.ItemLabel>Email report</CheckboxGroup.ItemLabel>
                  <CheckboxGroup.ItemDescription>Includes build and package details.</CheckboxGroup.ItemDescription>
                </CheckboxGroup.Item>
                <CheckboxGroup.Item value="push">Push notification</CheckboxGroup.Item>
              </CheckboxGroup.Root>
            </div>
          </EvidenceGroup>
          <EvidenceGroup description="Only the named availability or validity scope changes. Every group remains an unchecked, medium, vertical collection with identical content." title="Group and item states">
            <div className="forms-grid forms-grid--three forms-grid--preview-start" data-testid="checkbox-group-states">
              <Cell label="disabled group"><CheckboxGroup.Root aria-label="Disabled delivery methods" disabled><DefaultItems /></CheckboxGroup.Root></Cell>
              <Cell label="invalid group"><CheckboxGroup.Root aria-label="Invalid delivery methods" invalid><DefaultItems /></CheckboxGroup.Root></Cell>
              <Cell label="invalid item"><CheckboxGroup.Root aria-label="Individual delivery validation"><CheckboxGroup.Item invalid value="email">Email reports</CheckboxGroup.Item><CheckboxGroup.Item value="push">Push notifications</CheckboxGroup.Item></CheckboxGroup.Root></Cell>
            </div>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...checkboxGroupScenarios[6]}>
        <VStack className="forms-evidence-stack" data-testid="checkbox-group-form">
          <EvidenceGroup description="One shared legend names the repeated native values. Submit, validation correction, and reset remain native form behavior." title="Fieldset composition">
            <div className="forms-overview">
              <Form aria-label="Publishing preferences" id="checkbox-group-form-example" onReset={() => setStatus("Form reset")} onSubmit={(event) => { const data = new FormData(event.currentTarget); setStatus(`Submitted: ${data.getAll("delivery").join(", ") || "none"}`); }} preventDefaultOnSubmit>
                <Fieldset.Root id="delivery-methods-fieldset" required>
                  <Fieldset.Legend>Delivery methods</Fieldset.Legend>
                  <Fieldset.Description>Choose at least one publishing result.</Fieldset.Description>
                  <CheckboxGroup.Root allValues={values} name="delivery">
                    <CheckboxGroup.Parent>Select every method</CheckboxGroup.Parent>
                    <DefaultItems />
                  </CheckboxGroup.Root>
                  <Fieldset.Error>Choose at least one delivery method.</Fieldset.Error>
                </Fieldset.Root>
                <HStack className="forms-actions"><Button type="submit">Save preferences</Button><Button tone="neutral" type="reset">Reset</Button></HStack>
                <output className="forms-status">{status}</output>
              </Form>
            </div>
          </EvidenceGroup>
          <EvidenceGroup description="The group may remain elsewhere in the document while its repeated native values belong to the named form." title="External form ownership">
            <div className="forms-overview">
              <CheckboxGroup.Root aria-label="Externally owned delivery methods" form="checkbox-group-form-example" name="external-delivery">
                <DefaultItems />
              </CheckboxGroup.Root>
            </div>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...checkboxGroupScenarios[7]}>
        <VStack className="forms-evidence-stack" data-testid="checkbox-group-composition">
          <EvidenceGroup description="render supplies every host while CheckboxGroup preserves the group, Parent, structured Item, built-in visuals, relationships, and default state." title="render output">
            <RenderedOutput label="Rendered adapter HTML">
              <CheckboxGroup.Root allValues={values} aria-label="Rendered delivery methods" render={<section data-adapter="rendered-group" />}>
                <CheckboxGroup.Parent render={<button data-adapter="rendered-parent" />}>All delivery methods</CheckboxGroup.Parent>
                <CheckboxGroup.Item render={<button data-adapter="rendered-item" />} value="email">
                  <CheckboxGroup.ItemLabel render={<strong data-adapter="rendered-label" />}>Email reports</CheckboxGroup.ItemLabel>
                  <CheckboxGroup.ItemDescription render={<small data-adapter="rendered-description" />}>Weekly publishing results.</CheckboxGroup.ItemDescription>
                </CheckboxGroup.Item>
                <CheckboxGroup.Item value="push">Push notifications</CheckboxGroup.Item>
              </CheckboxGroup.Root>
            </RenderedOutput>
          </EvidenceGroup>
          <EvidenceGroup description="asChild merges every part into consumer hosts while preserving the same visible content, medium size, vertical layout, and unchecked state." title="asChild output">
            <RenderedOutput label="Composed adapter HTML">
              <CheckboxGroup.Root allValues={values} asChild aria-label="Composed delivery methods">
                <section data-adapter="composed-group">
                  <CheckboxGroup.Parent asChild><button data-adapter="composed-parent">All delivery methods</button></CheckboxGroup.Parent>
                  <CheckboxGroup.Item asChild value="email">
                    <button data-adapter="composed-item">
                      <CheckboxGroup.ItemLabel asChild><strong data-adapter="composed-label">Email reports</strong></CheckboxGroup.ItemLabel>
                      <CheckboxGroup.ItemDescription asChild><small data-adapter="composed-description">Weekly publishing results.</small></CheckboxGroup.ItemDescription>
                    </button>
                  </CheckboxGroup.Item>
                  <CheckboxGroup.Item value="push">Push notifications</CheckboxGroup.Item>
                </section>
              </CheckboxGroup.Root>
            </RenderedOutput>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...checkboxGroupScenarios[8]}>
        <VStack className="forms-evidence-stack">
          <EvidenceGroup description="The same default unchecked vertical group composes inside adjacent local appearance scopes." title="Scoped appearances">
            <div className="forms-scoped-grid" data-testid="checkbox-group-appearance"><div data-brick-appearance="light"><code>light</code><CheckboxGroup.Root aria-label="Light delivery methods"><DefaultItems /></CheckboxGroup.Root></div><div data-brick-appearance="dark"><code>dark</code><CheckboxGroup.Root aria-label="Dark delivery methods"><DefaultItems /></CheckboxGroup.Root></div></div>
          </EvidenceGroup>
          <EvidenceGroup description="The code names supported hooks and exactly matches the rendered result." title="Consumer customization">
            <article className="forms-customization"><div><Text as="h4" variant="title-sm">Group and item properties</Text><Text as="p" tone="secondary" variant="body-sm">Public group gap and inherited Checkbox tokens visibly change this group.</Text><pre aria-label="CheckboxGroup customization example" tabIndex={0}><code>{`<CheckboxGroup.Root
  defaultValue={["email"]}
  style={{
    "--brick-checkbox-group-gap": "1.25rem",
    "--brick-checkbox-control-checked-background": "#18794e",
    "--brick-checkbox-gap": "1rem",
    "--brick-checkbox-radius": "0.5rem",
  }}
>`}</code></pre></div><div className="forms-customization__preview"><CheckboxGroup.Root aria-label="Customized delivery methods" defaultValue={["email"]} style={customGroupTokens}><DefaultItems /></CheckboxGroup.Root></div></article>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...checkboxGroupScenarios[9]}>
        <VStack className="forms-evidence-stack" data-testid="checkbox-group-stress">
          <EvidenceGroup description="Long structured content and an unbroken segment wrap inside a 20rem application-owned frame." title="Constrained-width stress">
            <div className="forms-stress-panel"><div className="forms-phone-frame"><CheckboxGroup.Root allValues={["long"]} aria-label="Localized publishing choices"><CheckboxGroup.Parent>Select every translated preference</CheckboxGroup.Parent><CheckboxGroup.Item value="long"><CheckboxGroup.ItemLabel>Extremely detailed localized publishing and emergency-notification preference</CheckboxGroup.ItemLabel><CheckboxGroup.ItemDescription>ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-without-a-natural-break remains contained.</CheckboxGroup.ItemDescription></CheckboxGroup.Item></CheckboxGroup.Root></div></div>
          </EvidenceGroup>
          <EvidenceGroup description="Group, parent, items, descriptions, state, and logical invalid cue inherit genuine right-to-left direction." title="RTL inheritance">
            <div className="forms-stress-panel"><div className="forms-phone-frame" dir="rtl"><CheckboxGroup.Root allValues={values} aria-label="طرق الإشعار" defaultValue={["email"]} invalid><CheckboxGroup.Parent>اختيار جميع طرق الإشعار</CheckboxGroup.Parent><CheckboxGroup.Item value="email"><CheckboxGroup.ItemLabel>البريد الإلكتروني</CheckboxGroup.ItemLabel><CheckboxGroup.ItemDescription>تقارير النشر الأسبوعية وتحديثات الحساب.</CheckboxGroup.ItemDescription></CheckboxGroup.Item><CheckboxGroup.Item value="push">الهاتف</CheckboxGroup.Item></CheckboxGroup.Root></div></div>
          </EvidenceGroup>
        </VStack>
      </Scenario>
    </VStack>
  );
}
