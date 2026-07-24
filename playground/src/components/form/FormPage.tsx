import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Button, Field, Fieldset, Form, Text } from "@flowstack-ui/brick";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import {
  FormEvidenceCell as Cell,
  FormEvidenceControl as Control,
  FormEvidenceGroup as EvidenceGroup,
} from "../../shared/FormEvidence.js";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import "../../shared/forms-evidence.playground.css";

const customFormTokens = {
  "--brick-form-fieldset-gap": "2rem",
  "--brick-form-gap": "2rem",
} as CSSProperties;

export const formScenarios = [
  { description: "Form’s canonical rendering is an unboxed native submission boundary with vertical rhythm. It adds no Card, columns, generated fields, validation schema, request client, or workflow policy.", id: "form.overview", number: 1, title: "Overview" },
  { description: "Native URL, React function action, and callback models use identical fields, values, actions, and local results. Only submission ownership changes.", id: "form.models", navigationTitle: "Models", number: 2, title: "Submission models" },
  { description: "Inline and browser-native validation use identical fields, guidance, actions, and local results so only validation behavior changes.", id: "form.validation", number: 3, title: "Validation and reset" },
  { description: "One callback Form exposes its actual data-submitting, data-submitted, and data-invalid hooks while moving through invalid, submitting, submitted, and reset states.", id: "form.states", navigationTitle: "States", number: 4, title: "Submission state" },
  { description: "One specimen proves native attribute forwarding; another proves submit and reset controls can remain outside the Form through native form ownership.", id: "form.native", number: 5, title: "Native form surface" },
  { description: "Default, render, and asChild paths preserve form semantics, native attributes, classes, slots, events, and refs.", id: "form.composition", navigationTitle: "Composition", number: 6, title: "Composition" },
  { description: "Local appearance scopes leave the unboxed boundary unchanged. Public class, slot, style, and rhythm tokens customize only this Form.", id: "form.appearance", navigationTitle: "Theme", number: 7, title: "Appearance and customization" },
  { description: "Long controls, constrained width, wrapping actions, genuine RTL content, and logical source order remain contained without page-owned columns.", id: "form.stress", navigationTitle: "Stress", number: 8, title: "Responsive and RTL" },
] as const satisfies readonly ScenarioDefinition[];

function SimpleFields({ prefix }: { prefix: string }) {
  return (
    <>
      <Field.Root id={`${prefix}-name`}>
        <Field.Label>Project name</Field.Label>
        <Control defaultValue="Analytical Engine" name="project" />
      </Field.Root>
      <Field.Root id={`${prefix}-owner`}>
        <Field.Label>Owner email</Field.Label>
        <Control name="owner" placeholder="name@example.com" />
      </Field.Root>
    </>
  );
}

export function FormPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("No form event yet");
  const [nativeModelStatus, setNativeModelStatus] = useState("Not submitted");
  const [actionModelStatus, setActionModelStatus] = useState("Not submitted");
  const [callbackModelStatus, setCallbackModelStatus] = useState("Not submitted");
  const [inlineValidationStatus, setInlineValidationStatus] = useState("Not submitted");
  const [nativeValidationStatus, setNativeValidationStatus] = useState("Not submitted");
  const [nativeSurfaceStatus, setNativeSurfaceStatus] = useState("Not submitted");
  const [externalStatus, setExternalStatus] = useState("No external form event yet");
  const stateFormRef = useRef<HTMLFormElement>(null);
  const [stateHooks, setStateHooks] = useState({
    invalid: false,
    submitted: false,
    submitting: false,
  });

  useEffect(() => {
    const form = stateFormRef.current;
    if (!form) return;

    const readState = () => {
      setStateHooks({
        invalid: form.hasAttribute("data-invalid"),
        submitted: form.hasAttribute("data-submitted"),
        submitting: form.hasAttribute("data-submitting"),
      });
    };
    const observer = new MutationObserver(readState);
    observer.observe(form, {
      attributeFilter: ["data-invalid", "data-submitted", "data-submitting"],
      attributes: true,
    });
    readState();
    return () => observer.disconnect();
  }, []);

  return (
    <div className="forms-page" data-component-page="form" data-testid="form-workbench">
      <Scenario {...formScenarios[0]}>
        <div className="forms-overview" data-testid="form-overview">
          <Form
            aria-label="Create account"
            onReset={() => {
              setEmail("");
              setStatus("Form reset");
            }}
            onSubmit={async () => {
              await new Promise((resolve) => window.setTimeout(resolve, 30));
              setStatus("Account form submitted");
            }}
            preventDefaultOnSubmit
          >
            <Field.Root id="form-overview-email">
              <Field.Label>Work email</Field.Label>
              <Control name="email" onValueChange={setEmail} placeholder="name@example.com" value={email} />
              <Field.Description>Used for account notices.</Field.Description>
            </Field.Root>
            <div className="forms-actions">
              <Button type="submit">Create account</Button>
              <Button tone="neutral" type="reset">Reset</Button>
            </div>
            <output aria-live="polite" className="forms-status">{status}</output>
          </Form>
        </div>
      </Scenario>

      <Scenario {...formScenarios[1]}>
        <div className="forms-grid forms-grid--three" data-testid="form-models">
          <Cell label="native URL">
            <Form
              action="?submission-model=native"
              aria-label="Native URL model"
              method="get"
              onSubmit={(event) => {
                const data = new FormData(event.currentTarget);
                setNativeModelStatus(`Submitted: ${String(data.get("project"))}`);
              }}
              target="form-native-model-target"
            >
              <Field.Root id="form-native-project"><Field.Label>Project name</Field.Label><Control defaultValue="Analytical Engine" name="project" /></Field.Root>
              <Button size="sm" type="submit">Submit project</Button>
              <output className="forms-status">{nativeModelStatus}</output>
            </Form>
            <iframe hidden name="form-native-model-target" title="Native URL submission result" />
          </Cell>
          <Cell label="function action">
            <Form
              action={async (formData) => {
                setActionModelStatus(`Submitted: ${String(formData.get("project"))}`);
              }}
              aria-label="Function action model"
            >
              <Field.Root id="form-action-project"><Field.Label>Project name</Field.Label><Control defaultValue="Analytical Engine" name="project" /></Field.Root>
              <Button size="sm" type="submit">Submit project</Button>
              <output className="forms-status">{actionModelStatus}</output>
            </Form>
          </Cell>
          <Cell label="callback">
            <Form
              aria-label="Callback model"
              onSubmit={(event) => {
                const data = new FormData(event.currentTarget);
                setCallbackModelStatus(`Submitted: ${String(data.get("project"))}`);
              }}
              preventDefaultOnSubmit
            >
              <Field.Root id="form-callback-project"><Field.Label>Project name</Field.Label><Control defaultValue="Analytical Engine" name="project" /></Field.Root>
              <Button size="sm" type="submit">Submit project</Button>
              <output className="forms-status">{callbackModelStatus}</output>
            </Form>
          </Cell>
        </div>
      </Scenario>

      <Scenario {...formScenarios[2]}>
        <div className="forms-grid forms-grid--two" data-testid="form-validation">
          <Cell label="inline validation">
            <Form
              aria-label="Inline validation"
              onReset={() => setInlineValidationStatus("Form reset")}
              onSubmit={() => setInlineValidationStatus("Valid form submitted")}
              preventDefaultOnSubmit
            >
              <Field.Root id="form-inline-email" required>
                <Field.Label>Work email</Field.Label>
                <Control name="email" required type="email" />
                <Field.Description>Enter a valid account address.</Field.Description>
                <Field.Error>Enter a valid email address.</Field.Error>
              </Field.Root>
              <div className="forms-actions"><Button type="submit">Submit profile</Button><Button tone="neutral" type="reset">Reset</Button></div>
              <output className="forms-status">{inlineValidationStatus}</output>
            </Form>
          </Cell>
          <Cell label="native validation">
            <Form
              aria-label="Native validation"
              onReset={() => setNativeValidationStatus("Form reset")}
              onSubmit={() => setNativeValidationStatus("Valid form submitted")}
              preventDefaultOnSubmit
              validationBehavior="native"
            >
              <Field.Root id="form-native-email" required>
                <Field.Label>Work email</Field.Label>
                <Control name="email" required type="email" />
                <Field.Description>Enter a valid account address.</Field.Description>
                <Field.Error>Enter a valid email address.</Field.Error>
              </Field.Root>
              <div className="forms-actions"><Button type="submit">Submit profile</Button><Button tone="neutral" type="reset">Reset</Button></div>
              <output className="forms-status">{nativeValidationStatus}</output>
            </Form>
          </Cell>
        </div>
      </Scenario>

      <Scenario {...formScenarios[3]}>
        <div className="forms-overview" data-testid="form-states">
          <Form
            aria-label="Submission state"
            onSubmit={async () => {
              await new Promise((resolve) => window.setTimeout(resolve, 300));
            }}
            preventDefaultOnSubmit
            ref={stateFormRef}
          >
            <Field.Root id="form-state-project" required>
              <Field.Label>Project name</Field.Label>
              <Control name="project" required />
              <Field.Description>Submit empty to inspect invalid, then enter a value and submit again.</Field.Description>
              <Field.Error>Enter a project name.</Field.Error>
            </Field.Root>
            <div className="forms-actions"><Button type="submit">Submit project</Button><Button tone="neutral" type="reset">Reset</Button></div>
            <output aria-live="polite" className="forms-hook-readout">
              <span><code>data-submitting</code> {String(stateHooks.submitting)}</span>
              <span><code>data-submitted</code> {String(stateHooks.submitted)}</span>
              <span><code>data-invalid</code> {String(stateHooks.invalid)}</span>
            </output>
          </Form>
        </div>
      </Scenario>

      <Scenario {...formScenarios[4]}>
        <div className="forms-evidence-stack" data-testid="form-native-surface">
          <EvidenceGroup description="The native form attributes forward unchanged. Submission targets the hidden result frame so the playground remains in place." title="Forwarded native attributes">
            <div className="forms-overview">
              <Form
                acceptCharset="UTF-8"
                action="?native-surface=attributes"
                aria-label="Native attributes"
                autoComplete="on"
                encType="application/x-www-form-urlencoded"
                method="post"
                name="native-attributes"
                noValidate
                onSubmit={() => setNativeSurfaceStatus("Native form submitted")}
                target="form-native-surface-target"
              >
                <SimpleFields prefix="form-attributes" />
                <div className="forms-actions"><Button type="submit">Submit native form</Button><Button tone="neutral" type="reset">Reset</Button></div>
                <output className="forms-status">{nativeSurfaceStatus}</output>
                <dl className="forms-attribute-readout"><div><dt>method</dt><dd>post</dd></div><div><dt>encoding</dt><dd>urlencoded</dd></div><div><dt>target</dt><dd>result frame</dd></div><div><dt>validation</dt><dd>noValidate</dd></div></dl>
              </Form>
              <iframe hidden name="form-native-surface-target" title="Native attribute submission result" />
            </div>
          </EvidenceGroup>
          <EvidenceGroup description="The Form contains only fields. Native form attributes connect the separately spaced submit and reset actions to that Form." title="External control ownership">
            <div className="forms-overview">
              <div className="forms-external-evidence">
                <Form
                  aria-label="External controls"
                  id="external-controls-form"
                  onReset={() => setExternalStatus("External reset")}
                  onSubmit={() => setExternalStatus("External submit")}
                  preventDefaultOnSubmit
                >
                  <SimpleFields prefix="form-external" />
                </Form>
                <div className="forms-actions">
                  <Button form="external-controls-form" type="submit">External submit</Button>
                  <Button form="external-controls-form" tone="neutral" type="reset">External reset</Button>
                </div>
                <output className="forms-status">{externalStatus}</output>
              </div>
            </div>
          </EvidenceGroup>
        </div>
      </Scenario>

      <Scenario {...formScenarios[5]}>
        <div className="playground-output-stack" data-testid="form-composition">
          <RenderedOutput label="Rendered Form HTML">
            <Form aria-label="Rendered form" data-testid="form-render" preventDefaultOnSubmit render={<form data-adapter="rendered-form" />}>
              <SimpleFields prefix="form-rendered" />
              <Button type="submit">Submit rendered Form</Button>
            </Form>
          </RenderedOutput>
          <RenderedOutput label="Composed Form HTML">
            <Form aria-label="Composed form" asChild data-testid="form-as-child" preventDefaultOnSubmit>
              <form data-adapter="composed-form"><SimpleFields prefix="form-composed" /><Button type="submit">Submit composed Form</Button></form>
            </Form>
          </RenderedOutput>
        </div>
      </Scenario>

      <Scenario {...formScenarios[6]}>
        <div className="forms-evidence-stack">
          <EvidenceGroup description="The same default Form rhythm composes inside adjacent local appearance scopes." title="Scoped appearances">
            <div className="forms-scoped-grid" data-testid="form-appearance">
              <div data-brick-appearance="light"><code>light</code><Form aria-label="Light form"><SimpleFields prefix="form-light" /></Form></div>
              <div data-brick-appearance="dark"><code>dark</code><Form aria-label="Dark form"><SimpleFields prefix="form-dark" /></Form></div>
            </div>
          </EvidenceGroup>
          <EvidenceGroup description="The code names supported hooks and exactly matches the rendered result." title="Consumer customization">
            <article className="forms-customization">
              <div><Text as="h4" variant="title-sm">Form rhythm properties</Text><Text as="p" tone="secondary" variant="body-sm">Slot, native style, and public Form gap tokens visibly change this boundary only.</Text><pre aria-label="Form customization example" tabIndex={0}><code>{`<Form
  data-slot="custom-form"
  style={{
    "--brick-form-gap": "2rem",
    "--brick-form-fieldset-gap": "2rem",
  }}
>
  ...
</Form>`}</code></pre></div>
              <div className="forms-customization__preview"><Form aria-label="Customized form" data-slot="custom-form" style={customFormTokens}><SimpleFields prefix="form-custom" /></Form></div>
            </article>
          </EvidenceGroup>
        </div>
      </Scenario>

      <Scenario {...formScenarios[7]}>
        <div className="forms-evidence-stack" data-testid="form-stress">
          <EvidenceGroup description="The unboxed boundary and actions remain contained inside a 20rem application-owned frame." title="Constrained-width stress">
            <div className="forms-stress-panel"><div className="forms-phone-frame"><Form aria-label="Long localized form"><Field.Root id="form-long-field"><Field.Label>Extremely detailed localized account recovery contact address</Field.Label><Control name="longValue" /><Field.Description>ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-without-a-natural-break remains contained.</Field.Description></Field.Root><div className="forms-actions"><Button type="submit">Save detailed settings</Button><Button tone="neutral" type="reset">Reset</Button></div></Form></div></div>
          </EvidenceGroup>
          <EvidenceGroup description="Form source order, controls, and logical layout inherit genuine right-to-left direction." title="RTL inheritance">
            <div className="forms-stress-panel"><div className="forms-phone-frame" dir="rtl"><Form aria-label="إعدادات الحساب"><Field.Root id="form-rtl-name"><Field.Label>اسم مساحة العمل</Field.Label><Control name="workspace" /></Field.Root><div className="forms-actions"><Button type="submit">حفظ الإعدادات</Button><Button tone="neutral" type="reset">إعادة تعيين</Button></div></Form></div></div>
          </EvidenceGroup>
        </div>
      </Scenario>
    </div>
  );
}
