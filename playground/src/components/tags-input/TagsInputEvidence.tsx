import { useState } from "react";
import {
  Appearance,
  Button,
  Combobox,
  Dialog,
  Field,
  For,
  Form,
  Grid,
  HStack,
  Input,
  TagsInput,
  Text,
  VStack,
  useTagsInput,
  useTagsInputCombobox,
  useTagsInputContext,
  type TagsInputRootProps,
  type TagsInputItemTone,
} from "@flowstack-ui/brick";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";
export const tagsInputScenarios = [
  [
    "basic",
    "Create and remove",
    "Type a value and press Enter; removal returns focus to the draft.",
  ],
  [
    "controlled",
    "Controlled axes and provider",
    "Collection and draft are independent; controller actions use the same acceptance policy.",
  ],
  [
    "editing",
    "Edit and cancel",
    "Double-click a token or highlight it and press Enter. Escape cancels; leaving the editor cancels without moving focus.",
  ],
  [
    "paste",
    "Paste and delimiters",
    "Comma and semicolon delimiters commit whole validated batches.",
  ],
  [
    "validation",
    "Normalization and validation",
    "Normalize case and reject duplicates or invalid values without losing the draft.",
  ],
  [
    "limits",
    "Limits and overflow",
    "Count and character limits apply to edits, paste and controller actions.",
  ],
  [
    "states",
    "Disabled and required states",
    "Disabled items remain submitted and survive clear; readonly prohibits mutation.",
  ],
  [
    "tones",
    "Item content and tones",
    "Six semantic palettes and authored text content retain the same geometry.",
  ],
  [
    "forms",
    "Forms and reset",
    "Only committed values serialize as one JSON array; reset restores both uncontrolled axes.",
  ],
  [
    "suggestions",
    "Suggestions in a dialog",
    "Combobox owns the popup while TagsInput owns acceptance and the shared draft.",
  ],
  [
    "recipes",
    "Sizes, variants and reflow",
    "Seven responsive sizes align with Input, across appearance, direction and wrapping.",
  ],
  [
    "translations",
    "Translations and composition",
    "Localized labels and announcements; IME composition is never treated as an Enter submission.",
  ],
].map(([key, title, description], index) => ({
  id: "tags-input." + key,
  number: index + 1,
  title,
  description,
})) satisfies ScenarioDefinition[];
function Example({
  label,
  tone,
  ...props
}: TagsInputRootProps & { label: string; tone?: TagsInputItemTone }) {
  return (
    <TagsInput.Root defaultValue={["React", "TypeScript"]} {...props}>
      <TagsInput.Label>{label}</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Items tone={tone} />
        <TagsInput.Input placeholder={props.placeholder ?? "Add value…"} />
        <TagsInput.ClearTrigger />
      </TagsInput.Control>
      <TagsInput.HiddenInput />
    </TagsInput.Root>
  );
}
function Controlled() {
  const [value, setValue] = useState(["Design"]),
    [inputValue, setInputValue] = useState("");
  return (
    <VStack gap="3">
      <Example
        label="Controlled topics"
        value={value}
        inputValue={inputValue}
        onValueChange={(e) => setValue(e.value)}
        onInputValueChange={(e) => setInputValue(e.inputValue)}
      />
      <Text role="status">
        Values: {JSON.stringify(value)}; draft: {inputValue}
      </Text>
      <Button size="sm" onClick={() => setValue(["External"])}>
        Replace collection
      </Button>
    </VStack>
  );
}
function Provider() {
  const api = useTagsInput({ defaultValue: ["Research"] });
  return (
    <VStack gap="3">
      <TagsInput.RootProvider value={api}>
        <TagsInput.Label>Provider topics</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Items />
          <TagsInput.Input />
          <TagsInput.ClearTrigger />
        </TagsInput.Control>
        <TagsInput.HiddenInput />
      </TagsInput.RootProvider>
      <Button
        size="sm"
        onClick={() => {
          api.addValue("Design");
          api.addValue("Review");
        }}
      >
        Add two values
      </Button>
    </VStack>
  );
}
function Validated() {
  const [error, setError] = useState("");
  return (
    <VStack gap="3">
      <Example
        label="Lowercase topics"
        defaultValue={["react"]}
        editable
        sanitizeValue={(v) => v.trim().toLowerCase()}
        validate={({ inputValue }) => inputValue.length >= 3}
        onValueInvalid={(e) => setError(e.reason)}
        onValueChange={() => setError("")}
      />
      <Text role="status">{error || "Use at least three characters."}</Text>
    </VStack>
  );
}
function Suggestions() {
  const tags = useTagsInputContext(),
    bindings = useTagsInputCombobox();
  const [loading, setLoading] = useState(false);
  const options = ["React", "TypeScript", "Design", "Research"]
    .filter((value) => !tags.value.includes(value))
    .map((value) => ({ value, label: value }));
  return (
    <VStack gap="3">
      <Combobox.Root
        {...bindings}
        options={loading ? [] : options}
        loading={loading}
      >
        <TagsInput.Label>Suggested skills</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Items />
          <TagsInput.Input placeholder="Search or create" />
          <Combobox.Trigger />
        </TagsInput.Control>
        <Combobox.Portal>
          <Combobox.Content>
            <Combobox.Listbox>
              <For each={options}>
                {(option) => (
                  <Combobox.Item key={option.value} {...option}>
                    {option.label}
                  </Combobox.Item>
                )}
              </For>
              <Combobox.Empty>
                No suggestions — press Enter to create.
              </Combobox.Empty>
              <Combobox.Loading>Loading suggestions…</Combobox.Loading>
            </Combobox.Listbox>
          </Combobox.Content>
        </Combobox.Portal>
      </Combobox.Root>
      <Button size="sm" variant="outline" onClick={() => setLoading(!loading)}>
        Toggle loading
      </Button>
      <TagsInput.HiddenInput />
    </VStack>
  );
}
export function TagsInputEvidence() {
  const [submitted, setSubmitted] = useState("Not submitted");
  return (
    <VStack gap="8" data-component-page="tags-input">
      <Scenario {...tagsInputScenarios[0]}>
        <Specimen label="Default">
          <Example label="Topics" />
        </Specimen>
      </Scenario>
      <Scenario {...tagsInputScenarios[1]}>
        <Grid.Root columns={{ initial: 1, md: 2 }} gap="6">
          <Controlled />
          <Provider />
        </Grid.Root>
      </Scenario>
      <Scenario {...tagsInputScenarios[2]}>
        <Example label="Editable topics" editable />
        <Example label="Initially empty" defaultValue={[]} editable />
      </Scenario>
      <Scenario {...tagsInputScenarios[3]}>
        <Example label="Comma paste" defaultValue={[]} addOnPaste />
        <Example
          label="Semicolon paste"
          defaultValue={[]}
          addOnPaste
          delimiter={/;/}
        />
      </Scenario>
      <Scenario {...tagsInputScenarios[4]}>
        <Validated />
        <Example
          label="Duplicates permitted"
          allowDuplicates
          defaultValue={["Same", "Same"]}
        />
      </Scenario>
      <Scenario {...tagsInputScenarios[5]}>
        <Example
          label="Two values maximum"
          defaultValue={["One"]}
          max={2}
          addOnPaste
        />
        <Example
          label="Overflow exposed"
          defaultValue={["One", "Two", "Three"]}
          max={2}
          allowOverflow
        />
        <Example
          label="Eight characters maximum"
          defaultValue={["Short"]}
          maxLength={8}
          editable
        />
      </Scenario>
      <Scenario {...tagsInputScenarios[6]}>
        <Example label="Disabled topics" disabled />
        <Example label="Readonly topics" readOnly />
        <Example label="Required topics" required defaultValue={[]} />
        <TagsInput.Root defaultValue={["Locked", "Removable"]}>
          <TagsInput.Label>Partially locked</TagsInput.Label>
          <TagsInput.Control>
            <TagsInput.Items disabled={(value) => value === "Locked"} />
            <TagsInput.Input />
            <TagsInput.ClearTrigger />
          </TagsInput.Control>
          <TagsInput.HiddenInput />
        </TagsInput.Root>
      </Scenario>
      <Scenario {...tagsInputScenarios[7]}>
        <Example label="Soft accent topics" variant="soft" tone="accent" />
        <Example label="Soft contrast topics" variant="soft" tone="contrast" />
        <Grid.Root columns={{ initial: 1, md: 2 }} gap="6">
          <For
            each={
              [
                "neutral",
                "accent",
                "info",
                "success",
                "warning",
                "danger",
              ] as const
            }
          >
            {(tone) => (
              <Example key={tone} label={tone + " topics"} tone={tone} />
            )}
          </For>
        </Grid.Root>
        <TagsInput.Root defaultValue={["Research", "Design"]}>
          <TagsInput.Label>Authored item content</TagsInput.Label>
          <TagsInput.Control>
            <TagsInput.Items>
              {(value) => (
                <Text as="span" weight="medium">
                  {value}
                </Text>
              )}
            </TagsInput.Items>
            <TagsInput.Input />
          </TagsInput.Control>
        </TagsInput.Root>
      </Scenario>
      <Scenario {...tagsInputScenarios[8]}>
        <Form
          id="tags-example-form"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(
              String(new FormData(event.currentTarget).get("topics")),
            );
          }}
        >
          <Field.Root required>
            <Field.Label>Form topics</Field.Label>
            <TagsInput.Root
              name="topics"
              defaultValue={["Original"]}
              defaultInputValue="Draft"
            >
              <TagsInput.Control>
                <TagsInput.Items />
                <TagsInput.Input />
              </TagsInput.Control>
              <TagsInput.HiddenInput />
            </TagsInput.Root>
            <Field.Description>Committed values only.</Field.Description>
            <Field.Error>Add a topic.</Field.Error>
          </Field.Root>
          <HStack gap="3">
            <Button type="submit">Submit topics</Button>
            <Button type="reset" variant="outline">
              Reset topics
            </Button>
          </HStack>
          <Text role="status">{submitted}</Text>
        </Form>
        <Example
          label="External form topics"
          name="external"
          form="tags-external-form"
          defaultValue={["External"]}
        />
        <Form id="tags-external-form">
          <Button type="reset" variant="outline">
            Reset external topics
          </Button>
        </Form>
        <Example label="Add on blur" defaultValue={[]} blurBehavior="add" />
        <Example label="Clear on blur" defaultValue={[]} blurBehavior="clear" />
      </Scenario>
      <Scenario {...tagsInputScenarios[9]}>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button>Open skills dialog</Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Choose skills</Dialog.Title>
                <Dialog.Description>
                  Create tags or choose a suggestion.
                </Dialog.Description>
              </Dialog.Header>
              <Dialog.Body>
                <TagsInput.Root
                  defaultValue={[]}
                  required
                  editable
                  blurBehavior="add"
                >
                  <Suggestions />
                </TagsInput.Root>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.Close asChild>
                  <Button variant="outline" tone="neutral">
                    Close skills
                  </Button>
                </Dialog.Close>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </Scenario>
      <Scenario {...tagsInputScenarios[10]}>
        <For each={["light", "dark"] as const}>
          {(appearance) => (
            <Appearance key={appearance} value={appearance}>
              <Specimen label={appearance}>
                <VStack gap="5">
                  <For
                    each={["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const}
                  >
                    {(size) => (
                      <VStack
                        gap="2"
                        key={size}
                        data-testid={appearance + "-" + size}
                      >
                        <Example
                          label={appearance + " " + size + " topics"}
                          size={size}
                          defaultValue={["React"]}
                        />
                        <Input
                          size={size}
                          aria-label={appearance + " " + size + " comparison"}
                        />
                      </VStack>
                    )}
                  </For>
                </VStack>
              </Specimen>
            </Appearance>
          )}
        </For>
        <For each={["outline", "soft", "underline", "surface", "subtle", "ghost", "plain"] as const}>
          {(variant) => (
            <Example
              key={variant}
              label={variant + " variant"}
              variant={variant}
            />
          )}
        </For>
        <For each={["sharp", "rounded", "pill"] as const}>
          {(shape) => (
            <Example key={shape} label={shape + " shape"} shape={shape} />
          )}
        </For>
        <Example label="Responsive topics" size={{ initial: "sm", lg: "xl" }} variant={{ initial: "underline", lg: "outline" }} />
        <Example
          label="Long wrapped values"
          defaultValue={[
            "A-long-localized-value-that-stays-inside-the-control",
            "One",
            "Two",
            "Three",
            "Four",
            "Five",
          ]}
        />
      </Scenario>
      <Scenario {...tagsInputScenarios[11]}>
        <Example
          label="المهارات"
          placeholder="أضف مهارة…"
          dir="rtl"
          defaultValue={["التصميم", "البحث"]}
          editable
          translations={{
            clearTriggerLabel: "مسح المهارات",
            deleteTagTriggerLabel: (value) => "إزالة " + value,
            tagAdded: (value) => "تمت إضافة " + value,
            tagSelected: (value) => "تم تحديد " + value,
          }}
        />
        <Example label="Japanese composition" defaultValue={[]} editable />
        <Text tone="secondary">
          Physical IME and screen-reader checks are recorded separately from
          simulated events.
        </Text>
      </Scenario>
    </VStack>
  );
}
