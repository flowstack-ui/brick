import { useEffect, useState, type ComponentProps, type CSSProperties, type FormEvent } from "react";
import {
  Button,
  ColorPicker,
  ColorSwatch,
  Dialog,
  Form,
  Grid,
  HStack,
  Text,
  VStack,
} from "@flowstack-ui/brick";
import { CustomizationEvidence } from "../../shared/CustomizationEvidence.js";
import { EvidenceGroup } from "../../shared/EvidenceGroup.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";
import "./color-picker.playground.css";

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
  { id: "color-picker.overview", number: 1, title: "Overview", description: "A compact finished field opens a focused editor while one value stays synchronized everywhere." },
  { id: "color-picker.inline", number: 2, title: "Inline editor", description: "Area, hue, opacity, value, and format controls compose as one visible editor." },
  { id: "color-picker.recipes", number: 3, title: "Sizes and variants", description: "Seven production sizes and two visual recipes are isolated for direct comparison." },
  { id: "color-picker.entry-points", number: 4, title: "Inputs, swatches, and triggers", navigationTitle: "Entry points", description: "Compact application compositions can expose only the parts needed for a task." },
  { id: "color-picker.formats", number: 5, title: "Formats, channels, and sliders", navigationTitle: "Formats", description: "RGBA, HSLA, and HSBA views preserve one color while exposing the appropriate inputs and sliders." },
  { id: "color-picker.events", number: 6, title: "Controlled state and events", navigationTitle: "State", description: "Controlled value, change-end, close-on-select, and context access stay in the released machine." },
  { id: "color-picker.presets", number: 7, title: "Preset and saved-swatch compositions", navigationTitle: "Swatches", description: "Predefined, saved, input-adjacent, and trigger-adjacent swatches remain named and visibly selected." },
  { id: "color-picker.integration", number: 8, title: "Forms and dialogs", navigationTitle: "Integration", description: "Applications can adapt the same picker to form libraries and nested overlays without new component behavior." },
  { id: "color-picker.platform", number: 9, title: "Native chooser and EyeDropper", navigationTitle: "Platform", description: "Platform-owned color tools remain optional progressive enhancements beside the Brick editor." },
  { id: "color-picker.states", number: 10, title: "Disabled, read-only, invalid, and reset", navigationTitle: "States", description: "Validation, disabled/read-only behavior, submission, and reset retain Atom ownership." },
  { id: "color-picker.adaptation", number: 11, title: "Appearance, customization, and RTL", navigationTitle: "Adaptation", description: "Light/dark scopes, public properties, narrow width, and RTL keep the complete editor usable." },
] as const satisfies readonly ScenarioDefinition[];

type PickerSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

function CompactPickerPanel({ showPresets = false }: { showPresets?: boolean }) {
  return (
    <>
      <ColorPicker.Area aria-label="Saturation and brightness">
        <ColorPicker.AreaBackground />
        <ColorPicker.AreaThumb />
      </ColorPicker.Area>
      <HStack align="center" className="color-picker-compact-tools" gap="2">
        <ColorPicker.EyeDropperTrigger aria-label="Pick color from screen" title="Pick color from screen" />
        <VStack className="color-picker-compact-sliders" gap="2">
          <ColorPicker.ChannelSlider aria-label="Hue" channel="hue">
            <ColorPicker.ChannelSliderTrack />
            <ColorPicker.ChannelSliderThumb />
          </ColorPicker.ChannelSlider>
          <ColorPicker.ChannelSlider aria-label="Opacity" channel="alpha">
            <ColorPicker.TransparencyGrid size="8px" />
            <ColorPicker.ChannelSliderTrack />
            <ColorPicker.ChannelSliderThumb />
          </ColorPicker.ChannelSlider>
        </VStack>
      </HStack>
      {showPresets ? <ColorPicker.SwatchGroup aria-label="Optional color presets">
        {presets.map((preset) => (
          <ColorPicker.SwatchTrigger aria-label={`Use ${preset.label}`} frame="none" key={preset.value} shape="rounded" value={preset.value}>
            <ColorPicker.Swatch shape="rounded" value={preset.value}>
              <ColorPicker.SwatchIndicator />
            </ColorPicker.Swatch>
          </ColorPicker.SwatchTrigger>
        ))}
      </ColorPicker.SwatchGroup> : null}
    </>
  );
}

function DetailedPickerPanel() {
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
        <ColorPicker.TransparencyGrid size="8px" />
        <ColorPicker.ChannelSliderTrack />
        <ColorPicker.ChannelSliderThumb />
      </ColorPicker.ChannelSlider>
      <HStack className="color-picker-value-row" gap="1">
        <ColorPicker.FormatSelect aria-label="Color format" />
        <ColorPicker.Input aria-label="Hex color" />
        <ColorPicker.ChannelInput aria-label="Opacity channel" channel="alpha" />
      </HStack>
      <ColorPicker.SwatchGroup aria-label="Color presets">
        {presets.map((preset) => (
          <ColorPicker.SwatchTrigger aria-label={`Use ${preset.label}`} key={preset.value} value={preset.value}>
            <ColorPicker.Swatch value={preset.value}><ColorPicker.SwatchIndicator /></ColorPicker.Swatch>
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
  showPresets = false,
  style,
  ...rootProps
}: Pick<ComponentProps<typeof ColorPicker.Root>, "closeOnSelect" | "disabled" | "invalid" | "readOnly" | "required"> & {
  defaultValue?: string;
  label: string;
  size?: PickerSize;
  variant?: "outline" | "soft";
  showPresets?: boolean;
  style?: CSSProperties;
}) {
  const [value, setValue] = useState(defaultValue);
  return (
    <ColorPicker.Root
      {...rootProps}
      onValueChange={(details) => setValue(details.valueAsString)}
      positioning={{ placement: "bottom-start", gutter: 8 }}
      size={size}
      style={style}
      value={value}
      variant={variant}
    >
      <ColorPicker.Label>{label}</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.Trigger aria-label={`Open ${label.toLowerCase()} editor`}>
          <ColorPicker.ValueSwatch />
        </ColorPicker.Trigger>
        <ColorPicker.Input />
      </ColorPicker.Control>
      <ColorPicker.Positioner>
        <ColorPicker.Content aria-label={`${label} editor`}>
          <CompactPickerPanel showPresets={showPresets} />
        </ColorPicker.Content>
      </ColorPicker.Positioner>
    </ColorPicker.Root>
  );
}

function InlinePicker({ label, style, dir, size = "sm" }: { label: string; style?: CSSProperties; dir?: "ltr" | "rtl"; size?: PickerSize }) {
  return (
    <ColorPicker.Root defaultValue="rgba(0, 144, 255, 0.68)" dir={dir} inline size={size} style={style}>
      <HStack align="center" gap="2" wrap>
        <ColorPicker.ValueSwatch />
        <ColorPicker.Label>{label}</ColorPicker.Label>
        <ColorPicker.ValueText />
      </HStack>
      <ColorPicker.Content aria-label={`${label} inline editor`}>
        <DetailedPickerPanel />
      </ColorPicker.Content>
    </ColorPicker.Root>
  );
}

function EyeDropperExample() {
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    setAvailable(window.isSecureContext !== false && "EyeDropper" in window);
  }, []);
  return (
    <ColorPicker.Root defaultValue="#0090ff" inline>
      <ColorPicker.Label>Screen color</ColorPicker.Label>
      <HStack align="center" gap="2">
        <ColorPicker.EyeDropperTrigger aria-label="Pick a screen color" />
        <ColorPicker.ValueSwatch />
        <ColorPicker.ValueText />
      </HStack>
      <Text tone="secondary" variant="body-sm">
        {available ? "Available in this browser." : "Unavailable in this browser; use the editor or native chooser."}
      </Text>
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

function PresetSwatches({ frame = "outline", shape = "circle", values = presets }: {
  frame?: "none" | "outline";
  shape?: "sharp" | "rounded" | "circle";
  values?: readonly { label: string; value: string }[];
}) {
  return (
    <ColorPicker.SwatchGroup aria-label="Color presets">
      {values.map((preset) => (
        <ColorPicker.SwatchTrigger aria-label={`Use ${preset.label}`} frame={frame} key={preset.value} shape={shape} value={preset.value}>
          <ColorPicker.Swatch value={preset.value}><ColorPicker.SwatchIndicator /></ColorPicker.Swatch>
        </ColorPicker.SwatchTrigger>
      ))}
    </ColorPicker.SwatchGroup>
  );
}

function InputOnlyPicker() {
  return (
    <ColorPicker.Root data-testid="color-picker-input-only" defaultValue="#e5484d" inline size="xs">
      <ColorPicker.Label>Color</ColorPicker.Label>
      <ColorPicker.Control layout="integrated">
        <ColorPicker.ValueSwatch shape="rounded" />
        <ColorPicker.Input />
        <ColorPicker.EyeDropperTrigger aria-label="Pick color from screen" />
      </ColorPicker.Control>
    </ColorPicker.Root>
  );
}

function TriggerOnlyPicker({ fitContent = false }: { fitContent?: boolean }) {
  return (
    <ColorPicker.Root defaultValue="#e5484d" positioning={{ placement: "bottom-start", gutter: 8 }} size="xs">
      <ColorPicker.Label>Color</ColorPicker.Label>
      <ColorPicker.Trigger aria-label="Open color editor" data-fit-content={fitContent ? "" : undefined}>
        <ColorPicker.ValueSwatch />
        <ColorPicker.ValueText />
      </ColorPicker.Trigger>
      <ColorPicker.Positioner><ColorPicker.Content><CompactPickerPanel /></ColorPicker.Content></ColorPicker.Positioner>
    </ColorPicker.Root>
  );
}

function TriggerInsideInputPicker() {
  return (
    <ColorPicker.Root data-testid="color-picker-integrated-trigger" defaultValue="#e5484d" positioning={{ placement: "bottom-start", gutter: 8 }} size="xs">
      <ColorPicker.Label>Color</ColorPicker.Label>
      <ColorPicker.Control layout="integrated">
        <ColorPicker.Input />
        <ColorPicker.Trigger aria-label="Open color editor"><ColorPicker.ValueSwatch /></ColorPicker.Trigger>
      </ColorPicker.Control>
      <ColorPicker.Positioner><ColorPicker.Content><CompactPickerPanel /></ColorPicker.Content></ColorPicker.Positioner>
    </ColorPicker.Root>
  );
}

function ChannelSlidersOnly() {
  const channels = {
    rgba: ["red", "green", "blue", "alpha"],
    hsla: ["hue", "saturation", "lightness", "alpha"],
    hsba: ["hue", "saturation", "brightness", "alpha"],
  } as const;
  const [format, setFormat] = useState<keyof typeof channels>("rgba");
  return (
    <ColorPicker.Root className="color-picker-channel-sliders" defaultValue="rgba(229, 72, 77, 0.75)" format={format} inline onFormatChange={(details) => setFormat(details.format)} size="xs">
      <ColorPicker.FormatSelect aria-label="Slider format" />
      {channels[format].map((channel) => (
        <ColorPicker.ChannelSlider channel={channel} format={format} key={channel}>
          <ColorPicker.ChannelSliderLabel>{channel}</ColorPicker.ChannelSliderLabel>
          <ColorPicker.ChannelSliderValueText />
          {channel === "alpha" ? <ColorPicker.TransparencyGrid size="8px" /> : null}
          <ColorPicker.ChannelSliderTrack />
          <ColorPicker.ChannelSliderThumb />
        </ColorPicker.ChannelSlider>
      ))}
    </ColorPicker.Root>
  );
}

function ControlledPicker() {
  const [value, setValue] = useState("#5b5bd6");
  return (
    <VStack align="start" gap="3">
      <ColorPicker.Root onValueChange={(details) => setValue(details.value.toString("hex"))} positioning={{ placement: "bottom-start", gutter: 8 }} size="xs" value={value}>
        <ColorPicker.Label>Controlled color</ColorPicker.Label>
        <ColorPicker.Control><ColorPicker.Trigger aria-label="Open controlled color"><ColorPicker.ValueSwatch /></ColorPicker.Trigger><ColorPicker.Input /></ColorPicker.Control>
        <ColorPicker.Positioner><ColorPicker.Content><CompactPickerPanel /></ColorPicker.Content></ColorPicker.Positioner>
      </ColorPicker.Root>
      <HStack gap="2"><Button onClick={() => setValue("#30a46c")} size="xs" variant="outline">Set grass</Button><Text tone="secondary" variant="body-sm">{value}</Text></HStack>
    </VStack>
  );
}

function ChangeEndPicker() {
  const [result, setResult] = useState("No completed change yet.");
  return (
    <ColorPicker.Root defaultValue="#e5484d" inline onValueChangeEnd={(details) => setResult(`Finished at ${details.value.toString("hex")}.`)} size="xs">
      <ColorPicker.Label>Scrub color</ColorPicker.Label>
      <ColorPicker.ChannelSlider channel="hue">
        <ColorPicker.ChannelSliderLabel>Hue</ColorPicker.ChannelSliderLabel><ColorPicker.ChannelSliderValueText />
        <ColorPicker.ChannelSliderTrack /><ColorPicker.ChannelSliderThumb />
      </ColorPicker.ChannelSlider>
      <Text aria-live="polite" tone="secondary" variant="body-sm">{result}</Text>
    </ColorPicker.Root>
  );
}

function ContextPicker() {
  return (
    <ColorPicker.Root defaultValue="#8e4ec6" inline size="xs">
      <ColorPicker.Label>Context value</ColorPicker.Label>
      <PresetSwatches values={presets.slice(0, 3)} />
      <ColorPicker.Context>{(picker) => <Text tone="secondary" variant="body-sm">Machine value: {picker.value.toString("hex")}</Text>}</ColorPicker.Context>
    </ColorPicker.Root>
  );
}

function SavedSwatchesPicker() {
  const [value, setValue] = useState("#e5484d");
  const [saved, setSaved] = useState<{ label: string; value: string }[]>([]);
  const save = () => setSaved((current) => current.some((item) => item.value === value) ? current : [...current, { label: `Saved ${current.length + 1}`, value }]);
  return (
    <VStack align="start" gap="3">
      <ColorPicker.Root inline onValueChange={(details) => setValue(details.value.toString("hex"))} size="xs" value={value}>
        <ColorPicker.Label>Saved palette</ColorPicker.Label>
        <ColorPicker.Control layout="integrated"><ColorPicker.Input /><ColorPicker.ValueSwatch /></ColorPicker.Control>
        <PresetSwatches values={presets.slice(0, 4)} />
        {saved.length ? <PresetSwatches values={saved} /> : <Text tone="secondary" variant="body-sm">No saved colors yet.</Text>}
      </ColorPicker.Root>
      <Button onClick={save} size="xs" variant="outline">Save current color</Button>
    </VStack>
  );
}

function DialogPicker() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild><Button size="sm">Open color editor</Button></Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content size="sm">
          <Dialog.Header><Dialog.Title>Brand color</Dialog.Title><Dialog.Description>Choose the accent used by this workspace.</Dialog.Description></Dialog.Header>
          <Dialog.Body><InlinePicker label="Accent color" size="xs" /></Dialog.Body>
          <Dialog.Footer><Dialog.Close asChild><Button size="sm" variant="outline">Done</Button></Dialog.Close></Dialog.Footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
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
          <CompactPicker label="Brand color" showPresets size="2xs" />
        </Specimen>
      </Scenario>

      <Scenario {...colorPickerScenarios[1]}>
        <Specimen label="complete inline composition"><InlinePicker label="Accent color" /></Specimen>
      </Scenario>

      <Scenario {...colorPickerScenarios[2]}>
        <VStack gap="6">
          <EvidenceGroup description="Each control size is isolated so its footprint can be compared." title="Sizes">
            <Grid.Root columns={{ initial: 1, md: 3 }} gap="4">
              {(["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
                <Specimen key={size} label={size}><CompactPicker label={`${size.toUpperCase()} color`} size={size} /></Specimen>
              ))}
            </Grid.Root>
          </EvidenceGroup>
          <EvidenceGroup description="Variants change paint without changing the control anatomy." title="Variants">
            <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
              <Specimen label="outline"><CompactPicker label="Outline color" /></Specimen>
              <Specimen label="soft"><CompactPicker label="Soft color" variant="soft" /></Specimen>
            </Grid.Root>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...colorPickerScenarios[3]}>
        <VStack gap="6">
          <EvidenceGroup description="Use only the visible entry point the task needs." title="Minimal controls">
            <Grid.Root columns={{ initial: 1, md: 3 }} gap="4">
              <Specimen label="input only"><InputOnlyPicker /></Specimen>
              <Specimen label="swatches only"><ColorPicker.Root defaultValue="#30a46c" inline size="xs"><ColorPicker.Label>Preset</ColorPicker.Label><PresetSwatches frame="none" shape="rounded" /></ColorPicker.Root></Specimen>
              <Specimen label="trigger only"><TriggerOnlyPicker /></Specimen>
            </Grid.Root>
          </EvidenceGroup>
          <EvidenceGroup description="Triggers can sit beside an input or collapse to their authored content." title="Trigger placement">
            <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
              <Specimen label="integrated input trigger"><TriggerInsideInputPicker /></Specimen>
              <Specimen label="fit-content trigger"><TriggerOnlyPicker fitContent /></Specimen>
            </Grid.Root>
          </EvidenceGroup>
          <EvidenceGroup description="The interactive frame follows the authored swatch shape, or can disappear while preserving the accessible button." title="Swatch frames and shapes">
            <Grid.Root columns={{ initial: 1, sm: 2, lg: 4 }} data-testid="color-picker-swatch-recipes" gap="4">
              <Specimen label="square outline"><ColorPicker.Root data-testid="color-picker-swatches-sharp" defaultValue="#30a46c" inline size="xs"><PresetSwatches shape="sharp" values={presets.slice(0, 3)} /></ColorPicker.Root></Specimen>
              <Specimen label="rounded outline"><ColorPicker.Root data-testid="color-picker-swatches-rounded" defaultValue="#30a46c" inline size="xs"><PresetSwatches shape="rounded" values={presets.slice(0, 3)} /></ColorPicker.Root></Specimen>
              <Specimen label="circle outline"><ColorPicker.Root data-testid="color-picker-swatches-circle" defaultValue="#30a46c" inline size="xs"><PresetSwatches shape="circle" values={presets.slice(0, 3)} /></ColorPicker.Root></Specimen>
              <Specimen label="no frame"><ColorPicker.Root data-testid="color-picker-swatches-frameless" defaultValue="#30a46c" inline size="xs"><PresetSwatches frame="none" shape="rounded" values={presets.slice(0, 3)} /></ColorPicker.Root></Specimen>
            </Grid.Root>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...colorPickerScenarios[4]}>
        <VStack gap="6">
          <EvidenceGroup description="The active format determines which labelled numeric channels are shown." title="Channel inputs">
            <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
              <Specimen label="format views"><FormatInputs /></Specimen>
              <Specimen label="complete inline editor"><InlinePicker label="Translucent overlay" /></Specimen>
            </Grid.Root>
          </EvidenceGroup>
          <EvidenceGroup description="Every active channel can also be edited with a keyboard and pointer slider." title="Channel sliders">
            <Specimen label="format-aware channel sliders"><ChannelSlidersOnly /></Specimen>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...colorPickerScenarios[5]}>
        <VStack gap="6">
          <EvidenceGroup description="Applications can own the value or react only when scrubbing finishes." title="External state">
            <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
              <Specimen label="controlled value"><ControlledPicker /></Specimen>
              <Specimen label="change-end event"><ChangeEndPicker /></Specimen>
            </Grid.Root>
          </EvidenceGroup>
          <EvidenceGroup description="Context exposes the same machine, while close-on-select is a Root policy." title="Machine access">
            <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
              <Specimen label="context access"><ContextPicker /></Specimen>
              <Specimen label="close after swatch selection"><CompactPicker closeOnSelect label="Quick preset" showPresets size="xs" /></Specimen>
            </Grid.Root>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...colorPickerScenarios[6]}>
        <VStack gap="6">
          <EvidenceGroup description="Presets expose a visible selected indicator and may close the popup after selection." title="Predefined colors">
            <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
              <Specimen label="six named presets"><ColorPicker.Root defaultValue="#30a46c" inline size="xs"><ColorPicker.Label>Brand preset</ColorPicker.Label><PresetSwatches /><HStack gap="2"><ColorPicker.ValueSwatch /><ColorPicker.ValueText /></HStack></ColorPicker.Root></Specimen>
              <Specimen label="swatches and popup trigger"><CompactPicker label="Palette color" showPresets size="xs" /></Specimen>
            </Grid.Root>
          </EvidenceGroup>
          <EvidenceGroup description="Saving and arranging palettes is application state composed around the picker." title="Application-owned palettes">
            <Grid.Root columns={{ initial: 1, md: 3 }} gap="4">
              <Specimen label="save current swatch"><SavedSwatchesPicker /></Specimen>
              <Specimen label="swatch beside input"><ColorPicker.Root defaultValue="#e5484d" inline size="xs"><ColorPicker.Label>Input color</ColorPicker.Label><ColorPicker.Control layout="integrated"><ColorPicker.Input /><ColorPicker.ValueSwatch /></ColorPicker.Control></ColorPicker.Root></Specimen>
              <Specimen label="swatch inside trigger"><TriggerOnlyPicker /></Specimen>
            </Grid.Root>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...colorPickerScenarios[7]}>
        <VStack gap="6">
          <EvidenceGroup description="The hidden input is the native seam used by ordinary forms and form-library adapters." title="Form adapter">
            <Specimen label="submit and reset one color">
            <Form aria-label="Brand color form" onReset={() => setFormStatus("Reset to #5b5bd6.")} onSubmit={handleSubmit}>
              <VStack gap="4">
                <ColorPicker.Root defaultValue="#5b5bd6" inline name="brandColor" size="xs">
                  <ColorPicker.Label>Submitted brand color</ColorPicker.Label>
                  <ColorPicker.Control layout="integrated"><ColorPicker.Input /><ColorPicker.ValueSwatch /></ColorPicker.Control>
                  <PresetSwatches values={presets.slice(0, 3)} />
                  <ColorPicker.HiddenInput />
                </ColorPicker.Root>
                <HStack gap="2"><Button size="sm" type="submit">Save color</Button><Button size="sm" type="reset" variant="outline">Reset</Button></HStack>
                <Text aria-live="polite" data-testid="color-picker-form-status" tone="secondary">{formStatus}</Text>
              </VStack>
            </Form>
          </Specimen>
          </EvidenceGroup>
          <EvidenceGroup description="Inline content stays inside the Dialog, so nested overlay ownership remains explicit." title="Nested overlay">
            <Specimen label="open from dialog"><DialogPicker /></Specimen>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...colorPickerScenarios[8]}>
        <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
          <Specimen label="browser / OS chooser">
            <ColorPicker.Root defaultValue="#8e4ec6" inline size="xs">
              <ColorPicker.Label>Native color</ColorPicker.Label>
              <HStack gap="2"><ColorPicker.NativeInput /><ColorPicker.ValueSwatch /><ColorPicker.ValueText /></HStack>
            </ColorPicker.Root>
          </Specimen>
          <Specimen label="progressive EyeDropper"><EyeDropperExample /></Specimen>
        </Grid.Root>
      </Scenario>

      <Scenario {...colorPickerScenarios[9]}>
        <Grid.Root columns={{ initial: 1, md: 3 }} gap="4">
          <Specimen label="invalid"><CompactPicker invalid label="Invalid color" size="xs" /></Specimen>
          <Specimen label="disabled"><CompactPicker disabled label="Disabled color" size="xs" /></Specimen>
          <Specimen label="read-only"><CompactPicker label="Read-only color" readOnly size="xs" /></Specimen>
        </Grid.Root>
      </Scenario>

      <Scenario {...colorPickerScenarios[10]}>
        <VStack gap="5">
          <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
            <Specimen data-brick-appearance="light" label="light"><CompactPicker label="Light color" size="xs" variant="soft" /></Specimen>
            <Specimen data-brick-appearance="dark" label="dark"><CompactPicker label="Dark color" size="xs" variant="soft" /></Specimen>
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
