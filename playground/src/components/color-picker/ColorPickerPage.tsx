import {
  useState,
  type ComponentProps,
  type CSSProperties,
  type FormEvent,
} from "react";
import {
  Button,
  ColorPicker,
  ColorSwatch,
  Form,
  Grid,
  HStack,
  Text,
  VStack,
} from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";

const presets = [
  { label: "Indigo", value: "#5b5bd6" },
  { label: "Coral", value: "#e5484d" },
  { label: "Grass", value: "#30a46c" },
] as const;
const customStyle = {
  "--brick-color-picker-border-color": "var(--brick-color-accent-border)",
  "--brick-color-picker-content-radius": "var(--brick-radius-surface)",
  "--brick-color-picker-gap": "var(--brick-space-3)",
} as CSSProperties;

export const colorPickerScenarios = [
  {
    id: "color-picker.overview",
    number: 1,
    title: "Overview",
    description:
      "Text, native chooser, trigger, and named presets share one Atom-owned hexadecimal value.",
  },
  {
    id: "color-picker.recipes",
    number: 2,
    title: "Sizes and variants",
    description:
      "Three shared control sizes pair with outline and soft surface treatments.",
  },
  {
    id: "color-picker.form",
    number: 3,
    title: "Presets and form",
    description:
      "One hidden successful control submits the selected preset and resets to its authored default.",
  },
  {
    id: "color-picker.states",
    number: 4,
    title: "States",
    description:
      "Invalid, disabled, and read-only behavior remains visible without moving ownership out of Atom.",
  },
  {
    id: "color-picker.responsive",
    number: 5,
    title: "Appearance, customization, and RTL",
    navigationTitle: "Adaptation",
    description:
      "Theme scopes, public properties, and long localized content keep controls and floating content inside the viewport.",
  },
] as const satisfies readonly ScenarioDefinition[];

function Picker({
  defaultValue = "#5b5bd6",
  label,
  size = "md",
  variant = "outline",
  style,
  ...rootProps
}: Pick<
  ComponentProps<typeof ColorPicker.Root>,
  "disabled" | "invalid" | "readOnly" | "required"
> & {
  defaultValue?: string;
  label: string;
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "soft";
  style?: CSSProperties;
}) {
  const [value, setValue] = useState(defaultValue);
  return (
    <ColorPicker.Root
      {...rootProps}
      onValueChange={setValue}
      size={size}
      style={style}
      value={value}
      variant={variant}
    >
      <ColorPicker.Label>{label}</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.Input />
        <ColorPicker.NativeInput aria-label={`${label} native chooser`} />
        <ColorPicker.Trigger
          aria-label={`Choose ${label.toLowerCase()} preset`}
        >
          <ColorSwatch.Root value={value} />
        </ColorPicker.Trigger>
      </ColorPicker.Control>
      <ColorPicker.Content align="start" aria-label={`${label} presets`}>
        {presets.map((preset) => (
          <ColorPicker.SwatchTrigger
            aria-label={`Use ${preset.label}`}
            key={preset.value}
            value={preset.value}
          >
            <ColorSwatch.Root value={preset.value} />
            <Text as="span">{preset.label}</Text>
          </ColorPicker.SwatchTrigger>
        ))}
      </ColorPicker.Content>
    </ColorPicker.Root>
  );
}

export function ColorPickerPage() {
  const [formStatus, setFormStatus] = useState("No color submitted.");
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus(
      `Submitted ${String(new FormData(event.currentTarget).get("brandColor") ?? "")}.`,
    );
  };

  return (
    <VStack data-component-page="color-picker" gap="6">
      <Scenario {...colorPickerScenarios[0]}>
        <Specimen
          data-testid="color-picker-overview"
          label="text + browser chooser + preset popover"
        >
          <VStack gap="3">
            <Picker label="Brand color" />
            <Text tone="secondary" variant="body-sm">
              The square native chooser is rendered by the browser and operating
              system. The swatch button opens Brick’s optional preset popover.
            </Text>
          </VStack>
        </Specimen>
      </Scenario>

      <Scenario {...colorPickerScenarios[1]}>
        <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
          {(["sm", "md", "lg"] as const).map((size) => (
            <Specimen key={size} label={`${size} outline`}>
              <Picker
                label={`${size.toUpperCase()} outline color`}
                size={size}
              />
            </Specimen>
          ))}
          <Specimen label="md soft">
            <Picker label="Soft color" variant="soft" />
          </Specimen>
        </Grid.Root>
      </Scenario>

      <Scenario {...colorPickerScenarios[2]}>
        <Specimen label="named presets with one submitted value">
          <Form
            aria-label="Brand color form"
            onReset={() => setFormStatus("Reset to #5b5bd6.")}
            onSubmit={handleSubmit}
          >
            <VStack gap="4">
              <ColorPicker.Root defaultValue="#5b5bd6" name="brandColor">
                <ColorPicker.Label>Submitted brand color</ColorPicker.Label>
                <ColorPicker.Control>
                  <ColorPicker.Input />
                </ColorPicker.Control>
                <HStack aria-label="Brand color presets" gap="2" wrap>
                  {presets.map((preset) => (
                    <ColorPicker.SwatchTrigger
                      aria-label={`Select ${preset.label}`}
                      key={preset.value}
                      value={preset.value}
                    >
                      <ColorSwatch.Root value={preset.value} /> {preset.label}
                    </ColorPicker.SwatchTrigger>
                  ))}
                </HStack>
                <ColorPicker.HiddenInput />
              </ColorPicker.Root>
              <HStack gap="2" wrap>
                <Button type="submit">Save color</Button>
                <Button type="reset" variant="outline">
                  Reset
                </Button>
              </HStack>
              <Text
                aria-live="polite"
                data-testid="color-picker-form-status"
                tone="secondary"
              >
                {formStatus}
              </Text>
            </VStack>
          </Form>
        </Specimen>
      </Scenario>

      <Scenario {...colorPickerScenarios[3]}>
        <Grid.Root columns={{ initial: 1, md: 3 }} gap="4">
          <Specimen label="invalid">
            <Picker invalid label="Invalid color" />
          </Specimen>
          <Specimen label="disabled">
            <Picker disabled label="Disabled color" />
          </Specimen>
          <Specimen label="read-only">
            <Picker label="Read-only color" readOnly />
          </Specimen>
        </Grid.Root>
      </Scenario>

      <Scenario {...colorPickerScenarios[4]}>
        <VStack gap="5">
          <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
            <Specimen data-brick-appearance="light" label="light">
              <Picker label="Light color" variant="soft" />
            </Specimen>
            <Specimen data-brick-appearance="dark" label="dark">
              <Picker label="Dark color" variant="soft" />
            </Specimen>
          </Grid.Root>
          <EvidenceSurface
            className="playground-customization-evidence"
            inset="none"
          >
            <Grid.Root
              className="playground-customization-layout"
              columns={2}
              gap="0"
            >
              <VStack gap="2">
                <SpecimenLabel>customized</SpecimenLabel>
                <Text as="h3" variant="title-sm">
                  Color Picker CSS properties
                </Text>
                <Text tone="secondary" variant="body-sm">
                  The same outline, popover radius, and control gap shown here
                  are used by the preview.
                </Text>
                <PlaygroundCodeBlock>{`--brick-color-picker-border-color: var(--brick-color-accent-border);\n--brick-color-picker-content-radius: var(--brick-radius-surface);\n--brick-color-picker-gap: var(--brick-space-3);`}</PlaygroundCodeBlock>
              </VStack>
              <VStack className="playground-customization-preview">
                <Picker label="Customized color" style={customStyle} />
              </VStack>
            </Grid.Root>
          </EvidenceSurface>
          <Specimen dir="rtl" label="narrow RTL">
            <Picker
              label="لون العلامة التجارية للمؤسسة الدولية"
              variant="soft"
            />
          </Specimen>
        </VStack>
      </Scenario>
    </VStack>
  );
}
