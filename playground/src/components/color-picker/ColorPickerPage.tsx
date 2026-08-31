import { useState, type ComponentProps, type CSSProperties, type FormEvent } from "react";
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
import { CustomizationEvidence } from "../../shared/CustomizationEvidence.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";

const presets = [
  { label: "Indigo", value: "#5b5bd6" },
  { label: "Sky", value: "#0090ff" },
  { label: "Grass", value: "#30a46c" },
  { label: "Amber", value: "#f5d90a" },
  { label: "Coral", value: "#e5484d" },
  { label: "Plum", value: "#8e4ec6" },
] as const;

const customStyle = {
  "--brick-color-picker-border-color": "var(--brick-color-accent-border)",
  "--brick-color-picker-content-radius": "var(--brick-radius-surface)",
  "--brick-color-picker-area-block-size": "9rem",
  "--brick-color-picker-swatch-radius": "var(--brick-radius-subtle)",
} as CSSProperties;

export const colorPickerScenarios = [
  { id: "color-picker.overview", number: 1, title: "Compact popup", description: "A finished trigger opens the full editor while one value stays synchronized everywhere." },
  { id: "color-picker.inline", number: 2, title: "Inline editor", description: "Area, hue, opacity, value, and format controls compose as one visible editor." },
  { id: "color-picker.recipes", number: 3, title: "Sizes and variants", description: "The complete sm, md, and lg sizes pair with outline and soft recipes." },
  { id: "color-picker.formats", number: 4, title: "Formats and channel inputs", navigationTitle: "Formats", description: "RGBA, HSLA, and HSBA views preserve the same color while exposing appropriate channels." },
  { id: "color-picker.presets", number: 5, title: "Presets and selected indicator", navigationTitle: "Presets", description: "Named circular presets expose selected state with a visible checkmark rather than color alone." },
  { id: "color-picker.platform", number: 6, title: "Native chooser and EyeDropper", navigationTitle: "Platform", description: "Platform-owned color tools remain optional progressive enhancements beside the Brick editor." },
  { id: "color-picker.states", number: 7, title: "States and form", description: "Validation, disabled/read-only behavior, submission, and reset retain Atom ownership." },
  { id: "color-picker.adaptation", number: 8, title: "Appearance, customization, and RTL", navigationTitle: "Adaptation", description: "Light/dark scopes, public properties, narrow width, and RTL keep the complete editor usable." },
] as const satisfies readonly ScenarioDefinition[];

function PickerPanel() {
  return (
    <>
      <ColorPicker.Area aria-label="Saturation and brightness">
        <ColorPicker.AreaBackground />
        <ColorPicker.AreaThumb />
      </ColorPicker.Area>
      <ColorPicker.ChannelSlider channel="hue">
        <ColorPicker.ChannelSliderLabel>Hue</ColorPicker.ChannelSliderLabel>
        <ColorPicker.ChannelSliderValueText />
        <ColorPicker.ChannelSliderTrack />
        <ColorPicker.ChannelSliderThumb />
      </ColorPicker.ChannelSlider>
      <ColorPicker.ChannelSlider channel="alpha">
        <ColorPicker.ChannelSliderLabel>Opacity</ColorPicker.ChannelSliderLabel>
        <ColorPicker.ChannelSliderValueText />
        <ColorPicker.ChannelSliderTrack>
          <ColorPicker.TransparencyGrid size="8px" />
        </ColorPicker.ChannelSliderTrack>
        <ColorPicker.ChannelSliderThumb />
      </ColorPicker.ChannelSlider>
      <HStack gap="2" wrap>
        <ColorPicker.FormatSelect aria-label="Color format" />
        <ColorPicker.Input aria-label="Hex color" />
        <ColorPicker.ChannelInput aria-label="Opacity channel" channel="alpha" />
        <ColorPicker.EyeDropperTrigger aria-label="Pick color from screen" />
      </HStack>
      <ColorPicker.SwatchGroup aria-label="Color presets">
        {presets.map((preset) => (
          <ColorPicker.SwatchTrigger aria-label={`Use ${preset.label}`} key={preset.value} value={preset.value}>
            <ColorPicker.Swatch value={preset.value}>
              <ColorPicker.SwatchIndicator />
            </ColorPicker.Swatch>
          </ColorPicker.SwatchTrigger>
        ))}
      </ColorPicker.SwatchGroup>
    </>
  );
}

function CompactPicker({
  defaultValue = "rgba(91, 91, 214, 0.72)",
  label,
  size = "md",
  variant = "outline",
  style,
  ...rootProps
}: Pick<ComponentProps<typeof ColorPicker.Root>, "disabled" | "invalid" | "readOnly" | "required"> & {
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
      onValueChange={(details) => setValue(details.valueAsString)}
      size={size}
      style={style}
      value={value}
      variant={variant}
    >
      <ColorPicker.Label>{label}</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.Trigger aria-label={`Open ${label.toLowerCase()} editor`}>
          <ColorPicker.ValueSwatch><ColorPicker.SwatchIndicator value={value} /></ColorPicker.ValueSwatch>
        </ColorPicker.Trigger>
        <ColorPicker.Input />
      </ColorPicker.Control>
      <ColorPicker.Positioner>
        <ColorPicker.Content aria-label={`${label} editor`}>
          <PickerPanel />
        </ColorPicker.Content>
      </ColorPicker.Positioner>
    </ColorPicker.Root>
  );
}

function InlinePicker({ label, style, dir }: { label: string; style?: CSSProperties; dir?: "ltr" | "rtl" }) {
  return (
    <ColorPicker.Root defaultValue="rgba(0, 144, 255, 0.68)" dir={dir} inline style={style}>
      <HStack align="center" gap="2" wrap>
        <ColorPicker.ValueSwatch />
        <ColorPicker.Label>{label}</ColorPicker.Label>
        <ColorPicker.ValueText />
      </HStack>
      <ColorPicker.Content aria-label={`${label} inline editor`}>
        <PickerPanel />
      </ColorPicker.Content>
    </ColorPicker.Root>
  );
}

function FormatInputs() {
  return (
    <ColorPicker.Root defaultFormat="rgba" defaultValue="rgba(91, 91, 214, 0.65)" inline>
      <ColorPicker.Label>Channel color</ColorPicker.Label>
      <HStack gap="2" wrap>
        <ColorPicker.FormatTrigger />
        <ColorPicker.FormatSelect aria-label="Channel format" />
      </HStack>
      <ColorPicker.View format="rgba">
        <HStack gap="2" wrap>
          {(["red", "green", "blue", "alpha"] as const).map((channel) => (
            <ColorPicker.ChannelInput aria-label={channel} channel={channel} key={channel} />
          ))}
        </HStack>
      </ColorPicker.View>
      <ColorPicker.View format="hsla">
        <HStack gap="2" wrap>
          {(["hue", "saturation", "lightness", "alpha"] as const).map((channel) => (
            <ColorPicker.ChannelInput aria-label={channel} channel={channel} key={channel} />
          ))}
        </HStack>
      </ColorPicker.View>
      <ColorPicker.View format="hsba">
        <HStack gap="2" wrap>
          {(["hue", "saturation", "brightness", "alpha"] as const).map((channel) => (
            <ColorPicker.ChannelInput aria-label={channel} channel={channel} key={channel} />
          ))}
        </HStack>
      </ColorPicker.View>
      <HStack gap="2"><ColorPicker.ValueSwatch /><ColorPicker.ValueText /></HStack>
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
        <Specimen data-testid="color-picker-overview" label="popup editor">
          <CompactPicker label="Brand color" />
        </Specimen>
      </Scenario>

      <Scenario {...colorPickerScenarios[1]}>
        <Specimen label="complete inline composition"><InlinePicker label="Accent color" /></Specimen>
      </Scenario>

      <Scenario {...colorPickerScenarios[2]}>
        <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
          {(["sm", "md", "lg"] as const).map((size) => (
            <Specimen key={size} label={`${size} outline`}><CompactPicker label={`${size.toUpperCase()} color`} size={size} /></Specimen>
          ))}
          <Specimen label="md soft"><CompactPicker label="Soft color" variant="soft" /></Specimen>
        </Grid.Root>
      </Scenario>

      <Scenario {...colorPickerScenarios[3]}>
        <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
          <Specimen label="format views"><FormatInputs /></Specimen>
          <Specimen label="alpha value"><InlinePicker label="Translucent overlay" /></Specimen>
        </Grid.Root>
      </Scenario>

      <Scenario {...colorPickerScenarios[4]}>
        <Specimen label="six named circular presets">
          <ColorPicker.Root defaultValue="#30a46c" inline>
            <ColorPicker.Label>Brand preset</ColorPicker.Label>
            <ColorPicker.SwatchGroup aria-label="Brand presets">
              {presets.map((preset) => (
                <ColorPicker.SwatchTrigger aria-label={preset.label} key={preset.value} value={preset.value}>
                  <ColorPicker.Swatch value={preset.value}><ColorPicker.SwatchIndicator /></ColorPicker.Swatch>
                </ColorPicker.SwatchTrigger>
              ))}
            </ColorPicker.SwatchGroup>
            <HStack gap="2"><ColorPicker.ValueSwatch /><ColorPicker.ValueText /></HStack>
          </ColorPicker.Root>
        </Specimen>
      </Scenario>

      <Scenario {...colorPickerScenarios[5]}>
        <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
          <Specimen label="browser / OS chooser">
            <ColorPicker.Root defaultValue="#8e4ec6" inline>
              <ColorPicker.Label>Native color</ColorPicker.Label>
              <HStack gap="2"><ColorPicker.NativeInput /><ColorPicker.ValueSwatch /><ColorPicker.ValueText /></HStack>
            </ColorPicker.Root>
          </Specimen>
          <Specimen label="progressive EyeDropper">
            <ColorPicker.Root defaultValue="#0090ff" inline>
              <ColorPicker.Label>Screen color</ColorPicker.Label>
              <HStack gap="2"><ColorPicker.EyeDropperTrigger aria-label="Pick a screen color" /><ColorPicker.ValueSwatch /><ColorPicker.ValueText /></HStack>
            </ColorPicker.Root>
          </Specimen>
        </Grid.Root>
      </Scenario>

      <Scenario {...colorPickerScenarios[6]}>
        <VStack gap="4">
          <Grid.Root columns={{ initial: 1, md: 3 }} gap="4">
            <Specimen label="invalid"><CompactPicker invalid label="Invalid color" /></Specimen>
            <Specimen label="disabled"><CompactPicker disabled label="Disabled color" /></Specimen>
            <Specimen label="read-only"><CompactPicker label="Read-only color" readOnly /></Specimen>
          </Grid.Root>
          <Specimen label="one submitted color">
            <Form aria-label="Brand color form" onReset={() => setFormStatus("Reset to #5b5bd6.")} onSubmit={handleSubmit}>
              <VStack gap="4">
                <ColorPicker.Root defaultValue="#5b5bd6" inline name="brandColor">
                  <ColorPicker.Label>Submitted brand color</ColorPicker.Label>
                  <HStack gap="2"><ColorPicker.Input /><ColorPicker.ValueSwatch /></HStack>
                  <ColorPicker.SwatchGroup aria-label="Submitted color presets">
                    {presets.slice(0, 3).map((preset) => (
                      <ColorPicker.SwatchTrigger aria-label={`Select ${preset.label}`} key={preset.value} value={preset.value}>
                        <ColorPicker.Swatch value={preset.value}><ColorPicker.SwatchIndicator /></ColorPicker.Swatch>
                      </ColorPicker.SwatchTrigger>
                    ))}
                  </ColorPicker.SwatchGroup>
                  <ColorPicker.HiddenInput />
                </ColorPicker.Root>
                <HStack gap="2"><Button type="submit">Save color</Button><Button type="reset" variant="outline">Reset</Button></HStack>
                <Text aria-live="polite" data-testid="color-picker-form-status" tone="secondary">{formStatus}</Text>
              </VStack>
            </Form>
          </Specimen>
        </VStack>
      </Scenario>

      <Scenario {...colorPickerScenarios[7]}>
        <VStack gap="5">
          <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
            <Specimen data-brick-appearance="light" label="light"><CompactPicker label="Light color" variant="soft" /></Specimen>
            <Specimen data-brick-appearance="dark" label="dark"><CompactPicker label="Dark color" variant="soft" /></Specimen>
          </Grid.Root>
          <CustomizationEvidence
            code={`--brick-color-picker-border-color: var(--brick-color-accent-border);\n--brick-color-picker-area-block-size: 9rem;\n--brick-color-picker-swatch-radius: var(--brick-radius-subtle);`}
            description="The live editor uses the documented border, area size, and swatch shape properties."
            title="Color Picker CSS properties"
          >
            <CompactPicker label="Customized color" style={customStyle} />
          </CustomizationEvidence>
          <Specimen dir="rtl" label="narrow RTL"><InlinePicker dir="rtl" label="لون العلامة التجارية" /></Specimen>
        </VStack>
      </Scenario>
    </VStack>
  );
}
