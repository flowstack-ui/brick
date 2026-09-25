import { useState } from "react";
import {
  Appearance,
  Button,
  Dialog,
  Editable,
  Field,
  For,
  Form,
  Grid,
  HStack,
  Text,
  VStack,
  useEditable,
  type EditableRootProps,
} from "@flowstack-ui/brick";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";

export const editableScenarios = [
  {
    id: "editable.basic",
    number: 1,
    title: "Inline rename",
    description: "Focus to edit, Enter to commit, Escape to cancel.",
  },
  {
    id: "editable.activation",
    number: 2,
    title: "Activation modes",
    description:
      "Focus, click, double-click and explicit controls retain keyboard access.",
  },
  {
    id: "editable.submission",
    number: 3,
    title: "Submission modes",
    description:
      "Both, Enter, blur or explicit controls define the transaction boundary.",
  },
  {
    id: "editable.controlled",
    number: 4,
    title: "Controlled and external state",
    description:
      "The application can own both draft and editing; a provider exposes imperative actions.",
  },
  {
    id: "editable.multiline",
    number: 5,
    title: "Multiline and autoresize",
    description:
      "Enter adds a newline; Ctrl/Meta+Enter commits without clipping growing content.",
  },
  {
    id: "editable.empty",
    number: 6,
    title: "Empty, placeholders and limits",
    description:
      "Cancellation restores even an empty baseline, including starting directly in edit mode.",
  },
  {
    id: "editable.forms",
    number: 7,
    title: "Field states and real forms",
    description:
      "Native submission, reset and validation remain available with inherited state.",
  },
  {
    id: "editable.rejection",
    number: 8,
    title: "Application save rejection",
    description:
      "The application may refuse to close and keep a draft available for correction.",
  },
  {
    id: "editable.dialog",
    number: 9,
    title: "Inside Dialog",
    description:
      "Edit controls remain inside the dialog focus scope and Escape ends editing first.",
  },
  {
    id: "editable.appearance",
    number: 10,
    title: "Sizes and appearance",
    description:
      "Matched preview/editor geometry, light/dark, RTL and narrow containment.",
  },
] satisfies ScenarioDefinition[];

function Controls() {
  return (
    <Editable.Control>
      <Editable.EditTrigger>Edit</Editable.EditTrigger>
      <Editable.SubmitTrigger>Save</Editable.SubmitTrigger>
      <Editable.CancelTrigger>Cancel</Editable.CancelTrigger>
    </Editable.Control>
  );
}
function Example({
  label,
  multiline = false,
  controls = true,
  ...props
}: EditableRootProps & {
  label: string;
  multiline?: boolean;
  controls?: boolean;
}) {
  return (
    <Editable.Root defaultValue="Project notes" {...props}>
      <Editable.Label>{label}</Editable.Label>
      <Editable.Area>
        <Editable.Preview />
        {multiline ? <Editable.Textarea rows={2} /> : <Editable.Input />}
      </Editable.Area>
      {controls && <Controls />}
    </Editable.Root>
  );
}
function ControlledExample() {
  const [value, setValue] = useState("Quarterly roadmap");
  const [edit, setEdit] = useState(false);
  return (
    <VStack gap="3">
      <Example
        label="Controlled title"
        value={value}
        edit={edit}
        onValueChange={(event) => setValue(event.value)}
        onEditChange={(event) => setEdit(event.edit)}
      />
      <Text role="status">
        Draft: {value}; editing: {String(edit)}
      </Text>
      <Button size="sm" onClick={() => setValue("External replacement")}>
        Replace externally
      </Button>
    </VStack>
  );
}
function ProviderExample() {
  const controller = useEditable({
    defaultValue: "Provider notes",
    activationMode: "none",
  });
  return (
    <VStack gap="3">
      <Editable.RootProvider value={controller}>
        <Editable.Label>Provider title</Editable.Label>
        <Editable.Area>
          <Editable.Preview />
          <Editable.Input />
        </Editable.Area>
        <Controls />
      </Editable.RootProvider>
      <Button size="sm" onClick={() => controller.clearValue()}>
        Clear provider value
      </Button>
    </VStack>
  );
}
function RejectionExample() {
  const [value, setValue] = useState("Design notes"),
    [edit, setEdit] = useState(false),
    [error, setError] = useState("");
  return (
    <VStack gap="3">
      <Example
        label="Validated title"
        value={value}
        edit={edit}
        invalid={!!error}
        submitMode="enter"
        onValueChange={(event) => {
          setValue(event.value);
          setError("");
        }}
        onEditChange={(event) => {
          if (!event.edit && value.length < 4)
            setError("Use at least four characters before saving.");
          else setEdit(event.edit);
        }}
      />
      <Text role="status" tone="secondary">
        {error ||
          "Draft stays available when the application refuses the close request."}
      </Text>
    </VStack>
  );
}
export function EditableEvidence() {
  const [saved, setSaved] = useState("Not committed"),
    [submitted, setSubmitted] = useState("Not submitted");
  return (
    <VStack gap="8" data-component-page="editable">
      <Scenario {...editableScenarios[0]}>
        <Specimen label="Default">
          <Example
            label="Document name"
            controls={false}
            onValueCommit={({ value }) => setSaved(value)}
          />
          <Text role="status">Committed: {saved}</Text>
        </Specimen>
      </Scenario>
      <Scenario {...editableScenarios[1]}>
        <Grid.Root columns={{ initial: 1, md: 2 }} gap="6">
          <For each={["focus", "click", "dblclick", "none"] as const}>
            {(mode) => (
              <Specimen label={mode} key={mode}>
                <Example label={`${mode} activation`} activationMode={mode} />
              </Specimen>
            )}
          </For>
        </Grid.Root>
      </Scenario>
      <Scenario {...editableScenarios[2]}>
        <Grid.Root columns={{ initial: 1, md: 2 }} gap="6">
          <For each={["both", "enter", "blur", "none"] as const}>
            {(mode) => (
              <Specimen label={mode} key={mode}>
                <Example label={`${mode} submission`} submitMode={mode} />
                <Button size="sm" variant="outline">
                  Outside {mode}
                </Button>
              </Specimen>
            )}
          </For>
        </Grid.Root>
      </Scenario>
      <Scenario {...editableScenarios[3]}>
        <Grid.Root columns={{ initial: 1, md: 2 }} gap="6">
          <ControlledExample />
          <ProviderExample />
        </Grid.Root>
      </Scenario>
      <Scenario {...editableScenarios[4]}>
        <VStack gap="6">
          <Example
            label="Growing description"
            multiline
            autoResize
            defaultValue={
              "A short project description.\nA second line stays readable."
            }
          />
          <Example
            label="Growing title"
            autoResize
            defaultValue="Auto-sized title"
          />
          <Example
            label="Fixed multiline"
            multiline
            defaultValue="A normal resizable textarea."
          />
        </VStack>
      </Scenario>
      <Scenario {...editableScenarios[5]}>
        <VStack gap="6">
          <Example
            label="Empty title"
            defaultValue=""
            maxLength={20}
            placeholder={{ preview: "Untitled", edit: "Up to 20 characters" }}
          />
          <Example
            label="Initially editing"
            defaultEdit
            defaultValue=""
            placeholder="Start writing"
          />
          <Example label="Unselected on focus" selectOnFocus={false} />
        </VStack>
      </Scenario>
      <Scenario {...editableScenarios[6]}>
        <VStack gap="6">
          <Form
            id="editable-form"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(
                String(new FormData(event.currentTarget).get("title")),
              );
            }}
          >
            <VStack gap="3">
              <Field.Root required>
                <Field.Label>Form title</Field.Label>
                <Example
                  label="Submitted title"
                  name="title"
                  defaultValue="Original title"
                />
                <Field.Description>
                  This title is included once in native form data.
                </Field.Description>
              </Field.Root>
              <HStack gap="2">
                <Button size="sm" type="submit">
                  Submit form
                </Button>
                <Button size="sm" type="reset" variant="outline">
                  Reset form
                </Button>
              </HStack>
              <Text role="status">Submitted: {submitted}</Text>
            </VStack>
          </Form>
          <Grid.Root columns={{ initial: 1, md: 3 }} gap="4">
            <Field.Root disabled>
              <Example label="Disabled title" />
            </Field.Root>
            <Field.Root readOnly>
              <Example label="Readonly title" />
            </Field.Root>
            <Field.Root invalid>
              <Example label="Invalid title" />
            </Field.Root>
          </Grid.Root>
        </VStack>
      </Scenario>
      <Scenario {...editableScenarios[7]}>
        <RejectionExample />
      </Scenario>
      <Scenario {...editableScenarios[8]}>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button>Open rename dialog</Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Rename document</Dialog.Title>
                <Dialog.Description>
                  Edit the title without leaving this dialog.
                </Dialog.Description>
              </Dialog.Header>
              <Dialog.Body>
                <Example label="Dialog title" />
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.Close asChild>
                  <Button variant="outline" tone="neutral">
                    Close rename dialog
                  </Button>
                </Dialog.Close>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </Scenario>
      <Scenario {...editableScenarios[9]}>
        <VStack gap="6">
          <For each={["light", "dark"] as const}>
            {(appearance) => (
              <Appearance key={appearance} value={appearance}>
                <Specimen label={appearance}>
                  <VStack gap="4">
                    <For each={["sm", "md", "lg"] as const}>
                      {(size) => (
                        <Example
                          key={size}
                          size={size}
                          label={`${appearance} ${size} title`}
                          data-testid={`${appearance}-${size}`}
                        />
                      )}
                    </For>
                    <Example
                      dir="rtl"
                      label={`${appearance} RTL`}
                      defaultValue="ملاحظات المشروع"
                    />
                    <Example
                      label={`${appearance} long title`}
                      defaultValue="A very long project title that must wrap within narrow layouts without overflowing the page"
                    />
                  </VStack>
                </Specimen>
              </Appearance>
            )}
          </For>
        </VStack>
      </Scenario>
    </VStack>
  );
}
