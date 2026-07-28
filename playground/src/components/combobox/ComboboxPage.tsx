import { useState, type CSSProperties, type ReactNode } from "react";
import { Badge, Combobox, Grid, Text, VStack, type ComboboxShape, type ComboboxSize, type ComboboxVariant } from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./combobox.playground.css";

const cities = [
  { value: "boston", label: "Boston" },
  { value: "chicago", label: "Chicago" },
  { value: "denver", label: "Denver" },
  { value: "lisbon", label: "Lisbon" },
  { value: "tokyo", label: "Tokyo" },
];
const customStyle = { "--brick-combobox-border": "var(--brick-color-accent-border)", "--brick-combobox-background": "var(--brick-color-accent-subtle)", "--brick-combobox-radius": "1rem" } as CSSProperties;

function Example({ defaultValue, disabled, freeSolo, label = "City", options = cities, placeholder = "Search cities", readOnly, shape, size, style, variant }: { defaultValue?: string; disabled?: boolean; freeSolo?: boolean; label?: string; options?: typeof cities; placeholder?: string; readOnly?: boolean; shape?: ComboboxShape; size?: ComboboxSize; style?: CSSProperties; variant?: ComboboxVariant }) {
  const recipe = variant === "underline" ? { variant } as const : { shape, variant };
  return <div><Combobox.Root {...recipe} defaultValue={defaultValue} disabled={disabled} freeSolo={freeSolo} options={options} size={size}><Combobox.Label>{label}</Combobox.Label><Combobox.Control style={style}><Combobox.Input placeholder={placeholder} /><Combobox.Clear aria-label="Clear city" /><Combobox.Indicator /></Combobox.Control><Combobox.Portal><Combobox.Content><Combobox.Listbox>{options.map(option => <Combobox.Item key={option.value} label={option.label} value={option.value}>{option.label}</Combobox.Item>)}<Combobox.Empty>No matching cities</Combobox.Empty></Combobox.Listbox></Combobox.Content></Combobox.Portal></Combobox.Root></div>;
}
function Cell({ children, label }: { children: ReactNode; label: string }) { return <EvidenceSurface className="combobox-cell"><SpecimenLabel>{label}</SpecimenLabel>{children}</EvidenceSurface>; }
function ControlledExample() { const [value, setValue] = useState("boston"); return <VStack gap="2"><Example defaultValue={value} /><Text aria-live="polite" tone="secondary" variant="body-sm">Selected: {value}</Text></VStack>; }

export const comboboxScenarios = [
  { id: "combobox.overview", number: 1, title: "Overview", description: "A searchable single-value choice control with filtering, selection, clearing, and collision-aware positioning." },
  { id: "combobox.anatomy", number: 2, title: "Anatomy and semantics", navigationTitle: "Anatomy", description: "The thirteen-part compound API preserves Atom's combobox, listbox, option, label, and portal semantics." },
  { id: "combobox.recipes", number: 3, title: "Variants", description: "Outline, soft, and underline change control paint without changing filtering behavior." },
  { id: "combobox.sizing", number: 4, title: "Sizes and shapes", navigationTitle: "Sizing", description: "Three control sizes and three corner treatments preserve input and clear-button geometry." },
  { id: "combobox.filtering", number: 5, title: "Filtering and empty state", navigationTitle: "Filtering", description: "Typing filters authored options and announces a useful empty result." },
  { id: "combobox.behavior", number: 6, title: "Selection, clearing, and free text", navigationTitle: "Behavior", description: "Applications may own selection while freeSolo permits an authored value outside the option set." },
  { id: "combobox.states", number: 7, title: "Disabled, read-only, and loading", navigationTitle: "States", description: "Unavailable, immutable, and asynchronous states stay visually and semantically distinct." },
  { id: "combobox.appearance", number: 8, title: "Appearance and customization", navigationTitle: "Theme", description: "Compact badges identify light and dark scopes; the titled custom specimen documents its exact variables." },
  { id: "combobox.stress", number: 9, title: "Responsive, RTL, keyboard, and touch", navigationTitle: "Stress", description: "Narrow and RTL layouts preserve logical placement; the popup flips, remains scrollable, and dismisses safely after touch." },
] as const satisfies readonly ScenarioDefinition[];

export function ComboboxPage() {
  const variants: ComboboxVariant[] = ["outline", "soft", "underline"]; const sizes: ComboboxSize[] = ["sm", "md", "lg"]; const shapes: ComboboxShape[] = ["sharp", "rounded", "pill"];
  return <VStack className="combobox-page" data-component-page="combobox" gap="6">
    <Scenario {...comboboxScenarios[0]}><EvidenceSurface inset="lg"><Example defaultValue="chicago" /></EvidenceSurface></Scenario>
    <Scenario {...comboboxScenarios[1]}><VStack gap="4"><Cell label="thirteen public parts"><Example /></Cell><RenderedOutput label="Rendered Combobox HTML"><Example /></RenderedOutput></VStack></Scenario>
    <Scenario {...comboboxScenarios[2]}><Grid.Root className="combobox-grid" columns={3} gap="4">{variants.map(variant => <Cell key={variant} label={variant}><Example variant={variant} /></Cell>)}</Grid.Root></Scenario>
    <Scenario {...comboboxScenarios[3]}><VStack gap="4"><Grid.Root className="combobox-grid" columns={3} gap="4">{sizes.map(size => <Cell key={size} label={size}><Example size={size} /></Cell>)}</Grid.Root><Grid.Root className="combobox-grid" columns={3} gap="4">{shapes.map(shape => <Cell key={shape} label={shape}><Example shape={shape} /></Cell>)}</Grid.Root></VStack></Scenario>
    <Scenario {...comboboxScenarios[4]}><Grid.Root className="combobox-grid" columns={2} gap="4"><Cell label="type to filter"><Example /></Cell><Cell label="empty result"><Example options={[]} /></Cell></Grid.Root></Scenario>
    <Scenario {...comboboxScenarios[5]}><Grid.Root className="combobox-grid" columns={2} gap="4"><Cell label="application-owned selection"><ControlledExample /></Cell><Cell label="free text allowed"><Example freeSolo label="Destination" /></Cell></Grid.Root></Scenario>
    <Scenario {...comboboxScenarios[6]}><Grid.Root className="combobox-grid" columns={3} gap="4"><Cell label="disabled"><Example disabled /></Cell><Cell label="read-only"><Example defaultValue="boston" readOnly /></Cell><Cell label="loading"><Example options={[]} /></Cell></Grid.Root></Scenario>
    <Scenario {...comboboxScenarios[7]}><VStack gap="5"><Grid.Root className="combobox-grid" columns={2} gap="4"><EvidenceSurface data-brick-appearance="light"><Badge size="sm">Light</Badge><Example /></EvidenceSurface><EvidenceSurface data-brick-appearance="dark"><Badge size="sm">Dark</Badge><Example /></EvidenceSurface></Grid.Root><EvidenceSurface><Grid.Root className="combobox-customization" columns={2} gap="5"><VStack gap="2"><Badge size="sm" style={{ alignSelf: "flex-start", inlineSize: "fit-content" }} tone="accent">Customized</Badge><Text as="h3" variant="title-sm">Combobox CSS properties</Text><Text tone="secondary" variant="body-sm">The accent control surface, border, and radius use only the documented properties below.</Text><PlaygroundCodeBlock>{`--brick-combobox-background: var(--brick-color-accent-subtle);\n--brick-combobox-border: var(--brick-color-accent-border);\n--brick-combobox-radius: 1rem;`}</PlaygroundCodeBlock></VStack><Example style={customStyle} /></Grid.Root></EvidenceSurface></VStack></Scenario>
    <Scenario {...comboboxScenarios[8]}><Grid.Root className="combobox-grid" columns={2} gap="4"><Cell label="narrow viewport"><div className="combobox-narrow"><Example /></div></Cell><Cell label="RTL localized"><div dir="rtl"><Example label="المدينة" placeholder="ابحث عن مدينة" options={[{ value: "cairo", label: "القاهرة" }, { value: "dubai", label: "دبي" }, { value: "doha", label: "الدوحة" }]} /></div></Cell></Grid.Root></Scenario>
  </VStack>;
}
