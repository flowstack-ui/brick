import { useState } from "react";
import {
  Appearance,
  Button,
  Field,
  For,
  Form,
  Frame,
  Grid,
  HStack,
  Input,
  NativeSelect,
  Text,
  VStack,
  type NativeSelectRootProps,
} from "@flowstack-ui/brick";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";

export const nativeSelectScenarios = [
  {
    id: "native-select.basic",
    number: 1,
    title: "Native selection",
    description: "A labelled native control with browser-owned options.",
  },
  {
    id: "native-select.sizes",
    number: 2,
    title: "Seven control sizes",
    description:
      "Select and Input share control geometry. The compact 2xs Button has a smaller intrinsic height.",
  },
  {
    id: "native-select.variants",
    number: 3,
    title: "Variants",
    description: "Border and fill change without changing the control height.",
  },
  {
    id: "native-select.shapes",
    number: 4,
    title: "Shapes",
    description: "Sharp, theme-rounded and pill are independent of size.",
  },
  {
    id: "native-select.controlled",
    number: 5,
    title: "Controlled value",
    description: "The application owns the selected framework.",
  },
  {
    id: "native-select.groups",
    number: 6,
    title: "Groups and unavailable options",
    description: "Native optgroup and option semantics remain intact.",
  },
  {
    id: "native-select.list",
    number: 7,
    title: "Multiple and visible rows",
    description: "Native lists do not reserve space for a popup indicator.",
  },
  {
    id: "native-select.states",
    number: 8,
    title: "Field states",
    description:
      "Required, invalid and disabled come from Field; explicit values can override them.",
  },
  {
    id: "native-select.forms",
    number: 9,
    title: "Form submission and reset",
    description:
      "A single native successful control provides the selected value.",
  },
  {
    id: "native-select.indicator",
    number: 10,
    title: "Optional indicator",
    description: "Omitted decoration leaves no phantom end inset.",
  },
  {
    id: "native-select.responsive",
    number: 11,
    title: "Responsive and narrow",
    description:
      "Sparse sizing uses the normal baseline; long text stays inside the field.",
  },
  {
    id: "native-select.appearance",
    number: 12,
    title: "Appearance and RTL",
    description:
      "Logical indicator placement and semantic paint follow the local environment.",
  },
] as const satisfies readonly ScenarioDefinition[];

function Options() {
  return (
    <>
      <option value="react">React</option>
      <option value="vue">Vue</option>
      <option value="svelte">Svelte</option>
    </>
  );
}
function Example({
  label = "Framework",
  indicator = true,
  ...props
}: Extract<NativeSelectRootProps, { asChild?: false }> & { label?: string; indicator?: boolean }) {
  return (
    <NativeSelect.Root {...props}>
      <NativeSelect.Field aria-label={label} defaultValue="react">
        <Options />
      </NativeSelect.Field>
      {indicator && <NativeSelect.Indicator />}
    </NativeSelect.Root>
  );
}
export function NativeSelectEvidence() {
  const [value, setValue] = useState("react");
  const [submitted, setSubmitted] = useState("Not submitted");
  return (
    <VStack gap="8" data-component-page="native-select">
      <Scenario {...nativeSelectScenarios[0]}>
        <Specimen label="Default">
          <Field.Root>
            <Field.Label>Framework</Field.Label>
            <NativeSelect.Root>
              <NativeSelect.Field name="framework" defaultValue="react">
                <Options />
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
            <Field.Description>
              Choose a framework for this project.
            </Field.Description>
          </Field.Root>
        </Specimen>
      </Scenario>
      <Scenario {...nativeSelectScenarios[1]}>
        <VStack gap="4">
          <For each={["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const}>
            {(size) => (
              <Specimen key={size} label={size}>
                <Grid.Root
                  columns={{ initial: 1, md: 3 }}
                  gap="3"
                  data-testid={`size-${size}`}
                >
                  <Example size={size} label={`${size} framework`} />
                  <Input
                    size={size}
                    aria-label={`${size} project`}
                    placeholder="Project name"
                  />
                  <Button size={size}>Continue</Button>
                </Grid.Root>
              </Specimen>
            )}
          </For>
        </VStack>
      </Scenario>
      <Scenario {...nativeSelectScenarios[2]}>
        <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
          <For
            each={["outline", "soft", "ghost", "plain", "underline", "surface"] as const}
          >
            {(variant) => (
              <Specimen key={variant} label={variant}>
                <Example variant={variant} label={`${variant} framework`} />
              </Specimen>
            )}
          </For>
        </Grid.Root>
      </Scenario>
      <Scenario {...nativeSelectScenarios[3]}>
        <Grid.Root columns={{ initial: 1, md: 3 }} gap="4">
          <For each={["sharp", "rounded", "pill"] as const}>
            {(shape) => (
              <Specimen key={shape} label={shape}>
                <Example shape={shape} label={`${shape} framework`} />
              </Specimen>
            )}
          </For>
        </Grid.Root>
      </Scenario>
      <Scenario {...nativeSelectScenarios[4]}>
        <Specimen label="Application state">
          <VStack gap="3">
            <NativeSelect.Root>
              <NativeSelect.Field
                aria-label="Controlled framework"
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
              >
                <Options />
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
            <Text role="status">Selected: {value}</Text>
          </VStack>
        </Specimen>
      </Scenario>
      <Scenario {...nativeSelectScenarios[5]}>
        <Specimen label="Grouped options">
          <NativeSelect.Root>
            <NativeSelect.Field aria-label="Deployment" defaultValue="us">
              <optgroup label="Available">
                <option value="us">United States</option>
                <option value="eu">Europe</option>
                <option disabled value="ap">
                  Asia Pacific — unavailable
                </option>
              </optgroup>
              <optgroup disabled label="Coming soon">
                <option value="au">Australia</option>
              </optgroup>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Specimen>
      </Scenario>
      <Scenario {...nativeSelectScenarios[6]}>
        <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
          <Specimen label="Multiple">
            <NativeSelect.Root multiple rows={4}>
              <NativeSelect.Field
                aria-label="Multiple frameworks"
                name="frameworks"
                defaultValue={["react", "vue"]}
              >
                <Options />
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Specimen>
          <Specimen label="Single list">
            <Example rows={3} label="Visible frameworks" />
          </Specimen>
        </Grid.Root>
      </Scenario>
      <Scenario {...nativeSelectScenarios[7]}>
        <Grid.Root columns={{ initial: 1, md: 3 }} gap="4">
          <Specimen label="Required">
            <Field.Root required>
              <Field.Label>Framework</Field.Label>
              <Example label="Required framework" />
            </Field.Root>
          </Specimen>
          <Specimen label="Invalid">
            <Field.Root invalid>
              <Field.Label>Framework</Field.Label>
              <Example label="Invalid framework" />
              <Field.Error>Choose an available framework.</Field.Error>
            </Field.Root>
          </Specimen>
          <Specimen label="Disabled">
            <Field.Root disabled>
              <Field.Label>Framework</Field.Label>
              <Example label="Disabled framework" />
            </Field.Root>
          </Specimen>
        </Grid.Root>
      </Scenario>
      <Scenario {...nativeSelectScenarios[8]}>
        <Specimen label="Native form">
          <VStack gap="3">
            <Form
              id="native-select-form"
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(
                  String(new FormData(event.currentTarget).get("framework")),
                );
              }}
            >
              <NativeSelect.Root>
                <NativeSelect.Field
                  aria-label="Submitted framework"
                  name="framework"
                  defaultValue="react"
                >
                  <Options />
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
              <HStack gap="3">
                <Button type="submit">Submit</Button>
                <Button type="reset" variant="outline" tone="neutral">
                  Reset
                </Button>
              </HStack>
              <Text role="status">Submitted: {submitted}</Text>
            </Form>
            <NativeSelect.Root>
              <NativeSelect.Field
                aria-label="External region"
                form="native-select-form"
                name="region"
                defaultValue="eu"
              >
                <option value="eu">Europe</option>
                <option value="us">United States</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </VStack>
        </Specimen>
      </Scenario>
      <Scenario {...nativeSelectScenarios[9]}>
        <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
          <Specimen label="Default chevron">
            <Example />
          </Specimen>
          <Specimen label="Without indicator">
            <Example indicator={false} />
          </Specimen>
        </Grid.Root>
      </Scenario>
      <Scenario {...nativeSelectScenarios[10]}>
        <Specimen label="Sparse responsive size">
          <Frame maxInlineSize="20rem">
            <NativeSelect.Root size={{ lg: "xl" }}>
              <NativeSelect.Field aria-label="Long framework">
                <option>
                  A long localized framework and deployment description
                </option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Frame>
        </Specimen>
      </Scenario>
      <Scenario {...nativeSelectScenarios[11]}>
        <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
          <For each={["light", "dark"] as const}>
            {(appearance) => (
              <Appearance key={appearance} value={appearance}>
                <Specimen label={appearance}>
                  <VStack dir="rtl" gap="3">
                    <Example label={`${appearance} RTL framework`} />
                    <Example
                      variant="soft"
                      label={`${appearance} soft framework`}
                    />
                  </VStack>
                </Specimen>
              </Appearance>
            )}
          </For>
        </Grid.Root>
      </Scenario>
    </VStack>
  );
}
