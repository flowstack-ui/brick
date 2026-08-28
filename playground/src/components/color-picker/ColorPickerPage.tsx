import { useState, type ComponentProps, type FormEvent } from "react";
import { Button, ColorPicker, ColorSwatch, Form, Grid, HStack, Surface, Text, VStack } from "@flowstack-ui/brick";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";

const presets = [
  { label: "Indigo", value: "#5b5bd6" },
  { label: "Coral", value: "#e5484d" },
  { label: "Grass", value: "#30a46c" },
] as const;

export const colorPickerScenarios = [
  { id: "color-picker.overview", number: 1, title: "Overview", description: "Text, native chooser, trigger, and named presets share one Atom-owned hexadecimal value." },
  { id: "color-picker.recipes", number: 2, title: "Sizes and variants", description: "Three shared control sizes pair with outline and soft surface treatments." },
  { id: "color-picker.form", number: 3, title: "Presets and form", description: "One hidden successful control submits the selected preset and resets to its authored default." },
  { id: "color-picker.states", number: 4, title: "States", description: "Invalid, disabled, and read-only behavior remains visible without moving ownership out of Atom." },
  { id: "color-picker.responsive", number: 5, title: "Responsive composition", description: "Long localized content wraps while controls and floating content stay within the viewport." },
] as const satisfies readonly ScenarioDefinition[];

function Picker({
  defaultValue = "#5b5bd6",
  label,
  size = "md",
  variant = "outline",
  ...rootProps
}: Pick<ComponentProps<typeof ColorPicker.Root>, "disabled" | "invalid" | "readOnly" | "required"> & {
  defaultValue?: string;
  label: string;
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "soft";
}) {
  const [value, setValue] = useState(defaultValue);
  return (
    <ColorPicker.Root {...rootProps} onValueChange={setValue} size={size} value={value} variant={variant}>
      <ColorPicker.Label>{label}</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.Input />
        <ColorPicker.NativeInput aria-label={`${label} native chooser`} />
        <ColorPicker.Trigger aria-label={`Choose ${label.toLowerCase()} preset`}>
          <ColorSwatch.Root value={value} />
        </ColorPicker.Trigger>
      </ColorPicker.Control>
      <ColorPicker.Content align="start" aria-label={`${label} presets`}>
        {presets.map((preset) => (
          <ColorPicker.SwatchTrigger aria-label={`Use ${preset.label}`} key={preset.value} value={preset.value}>
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
    setFormStatus(`Submitted ${String(new FormData(event.currentTarget).get("brandColor") ?? "")}.`);
  };

  return (
    <VStack data-component-page="color-picker" gap="6">
      <Scenario {...colorPickerScenarios[0]}>
        <Surface bordered data-testid="color-picker-overview" inset="lg"><Picker label="Brand color" /></Surface>
      </Scenario>

      <Scenario {...colorPickerScenarios[1]}>
        <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
          {(["sm", "md", "lg"] as const).map((size) => (
            <Surface bordered inset="lg" key={size}>
              <Picker label={`${size.toUpperCase()} outline color`} size={size} />
            </Surface>
          ))}
          <Surface inset="lg" level="subtle"><Picker label="Soft color" variant="soft" /></Surface>
        </Grid.Root>
      </Scenario>

      <Scenario {...colorPickerScenarios[2]}>
        <Surface bordered inset="lg">
          <Form aria-label="Brand color form" onReset={() => setFormStatus("Reset to #5b5bd6.")} onSubmit={handleSubmit}>
            <VStack gap="4">
              <ColorPicker.Root defaultValue="#5b5bd6" name="brandColor">
                <ColorPicker.Label>Submitted brand color</ColorPicker.Label>
                <ColorPicker.Control><ColorPicker.Input /></ColorPicker.Control>
                <HStack aria-label="Brand color presets" gap="2" wrap>
                  {presets.map((preset) => (
                    <ColorPicker.SwatchTrigger aria-label={`Select ${preset.label}`} key={preset.value} value={preset.value}>
                      <ColorSwatch.Root value={preset.value} /> {preset.label}
                    </ColorPicker.SwatchTrigger>
                  ))}
                </HStack>
                <ColorPicker.HiddenInput />
              </ColorPicker.Root>
              <HStack gap="2" wrap><Button type="submit">Save color</Button><Button type="reset" variant="outline">Reset</Button></HStack>
              <Text aria-live="polite" data-testid="color-picker-form-status" tone="secondary">{formStatus}</Text>
            </VStack>
          </Form>
        </Surface>
      </Scenario>

      <Scenario {...colorPickerScenarios[3]}>
        <Grid.Root columns={{ initial: 1, md: 3 }} gap="4">
          <Surface bordered inset="lg"><Picker invalid label="Invalid color" /></Surface>
          <Surface bordered inset="lg"><Picker disabled label="Disabled color" /></Surface>
          <Surface bordered inset="lg"><Picker label="Read-only color" readOnly /></Surface>
        </Grid.Root>
      </Scenario>

      <Scenario {...colorPickerScenarios[4]}>
        <Surface bordered dir="rtl" inset="lg">
          <Picker label="لون العلامة التجارية للمؤسسة الدولية" variant="soft" />
        </Surface>
      </Scenario>
    </VStack>
  );
}
