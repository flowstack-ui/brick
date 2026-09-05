import { useState, type CSSProperties, type ReactNode } from "react";
import {
  Button,
  Field,
  Form,
  Grid,
  HStack,
  Select,
  Text,
  VStack,
  type SelectRootProps,
  type SelectShape,
  type SelectSize,
  type SelectVariant,
} from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "../../shared/forms-evidence.playground.css";
import "./select.playground.css";

const variants: SelectVariant[] = ["outline", "soft", "ghost", "underline"];
const sizes: SelectSize[] = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"];
const shapes: SelectShape[] = ["sharp", "rounded", "pill"];

const customTokens = {
  "--brick-select-trigger-background": "#eefbf5",
  "--brick-select-trigger-border": "#18794e",
  "--brick-select-trigger-focus-ring": "#18794e",
  "--brick-select-trigger-foreground": "#0d3b2a",
  "--brick-select-content-background": "#f4fff9",
  "--brick-select-item-highlighted-background": "#d7f7e5",
} as CSSProperties;

function Options() {
  return (
    <>
      <Select.Item value="starter"><Select.ItemText>Starter</Select.ItemText><Select.ItemIndicator /></Select.Item>
      <Select.Item value="team"><Select.ItemText>Team</Select.ItemText><Select.ItemIndicator /></Select.Item>
      <Select.Item value="enterprise" disabled><Select.ItemText>Enterprise</Select.ItemText><Select.ItemIndicator /></Select.Item>
    </>
  );
}

function PlanSelect({
  id,
  label = "Plan",
  rootProps,
  children,
  contentStyle,
  triggerStyle,
}: {
  id: string;
  label?: string;
  rootProps?: Omit<SelectRootProps, "children">;
  children?: ReactNode;
  contentStyle?: CSSProperties;
  triggerStyle?: CSSProperties;
}) {
  const selectProps = { defaultValue: "team", ...rootProps } as SelectRootProps;
  return (
    <Field.Root id={id}>
      <Field.Label>{label}</Field.Label>
      <Select.Root {...selectProps}>
        <Select.Trigger style={triggerStyle}><Select.Value placeholder="Choose a plan" /><Select.Icon /></Select.Trigger>
        <Select.Content style={contentStyle}>
          <Select.ScrollUpButton />
          <Select.Viewport>{children ?? Options()}</Select.Viewport>
          <Select.ScrollDownButton />
          <Select.Arrow />
        </Select.Content>
      </Select.Root>
    </Field.Root>
  );
}

function Tile({ label, children, testId }: { label: string; children: ReactNode; testId?: string }) {
  return <EvidenceSurface className="select-tile" data-testid={testId} inset="md"><SpecimenLabel>{label}</SpecimenLabel>{children}</EvidenceSurface>;
}

export const selectScenarios = [
  { id: "select.overview", number: 1, title: "Overview", description: "Select’s canonical rendering is full-width, 44px lg, outline, and rounded. Field supplies the visible label; the selected value and default artwork demonstrate the complete default control." },
  { id: "select.variants", number: 2, title: "Variants", description: "Outline, soft, ghost, and underline change trigger paint only. Value, options, size, and all other defaults remain identical." },
  { id: "select.sizes", number: 3, title: "Sizes", description: "Small, medium, and large change complete control geometry only. Every example stays outline and rounded with identical content." },
  { id: "select.shapes", number: 4, title: "Shapes and width", description: "Sharp, rounded, and pill change trigger geometry only. Separate examples prove the default full width and opt-in intrinsic width." },
  { id: "select.options", number: 5, title: "Options and scrolling", navigationTitle: "Options", description: "Groups, labels, separator, disabled options, scrolling controls, Viewport, and collision-aware Arrow appear together in one long-list example." },
  { id: "select.states", number: 6, title: "Content and states", navigationTitle: "States", description: "Placeholder, controlled value/open state, disabled, read-only, and invalid examples retain the default recipe so only the named state changes." },
  { id: "select.forms", number: 7, title: "Forms and composition", navigationTitle: "Forms", description: "Field and Form expose native submission, reset, validation, external ownership, Trigger composition, and rendered anatomy without moving those responsibilities into Select." },
  { id: "select.appearance", number: 8, title: "Appearance and customization", navigationTitle: "Theme", description: "Light and dark scopes retain the same defaults. One documented token override visibly customizes the actual trigger, popup, and options." },
  { id: "select.stress", number: 9, title: "Responsive, RTL, and preferences", navigationTitle: "Responsive", description: "Long localization, narrow containment, RTL logical placement, zoom, reduced motion, and forced colors remain usable without clipping." },
] as const satisfies readonly ScenarioDefinition[];

export function SelectPage() {
  const [value, setValue] = useState("team");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("No form event yet");
  return (
    <VStack className="forms-page select-page" data-component-page="select" data-testid="select-workbench">
      <Scenario {...selectScenarios[0]}><EvidenceSurface data-testid="select-overview" inset="lg"><PlanSelect id="select-overview-field" /></EvidenceSurface></Scenario>
      <Scenario {...selectScenarios[1]}>
        <Grid.Root columns={4} gap="4" className="select-grid" data-testid="select-variants">
          {variants.map((variant) => <Tile key={variant} label={variant}><PlanSelect id={`select-variant-${variant}`} rootProps={{ variant }} /></Tile>)}
        </Grid.Root>
      </Scenario>
      <Scenario {...selectScenarios[2]}>
        <Grid.Root columns={3} gap="4" className="select-grid" data-testid="select-sizes">
          {sizes.map((size) => <Tile key={size} label={size}><PlanSelect id={`select-size-${size}`} rootProps={{ size }} /></Tile>)}
        </Grid.Root>
      </Scenario>
      <Scenario {...selectScenarios[3]}>
        <VStack gap="4" data-testid="select-shapes">
          <Grid.Root columns={3} gap="4" className="select-grid">
            {shapes.map((shape) => <Tile key={shape} label={shape}><PlanSelect id={`select-shape-${shape}`} rootProps={{ shape }} /></Tile>)}
          </Grid.Root>
          <Grid.Root columns={2} gap="4" className="select-grid">
            <Tile label="full width"><PlanSelect id="select-full-width" /></Tile>
            <Tile label="intrinsic"><PlanSelect id="select-intrinsic" rootProps={{ fullWidth: false }} /></Tile>
          </Grid.Root>
        </VStack>
      </Scenario>
      <Scenario {...selectScenarios[4]}>
        <Tile label="grouped and scrollable" testId="select-options">
          <PlanSelect id="select-long">
            <Select.Group><Select.Label>Recommended</Select.Label>{Options()}</Select.Group>
            <Select.Separator />
            <Select.Group>
              <Select.Label>Regions</Select.Label>
              {Array.from({ length: 14 }, (_, index) => <Select.Item key={index} value={`region-${index}`}><Select.ItemText>Region {index + 1}</Select.ItemText><Select.ItemIndicator /></Select.Item>)}
            </Select.Group>
          </PlanSelect>
        </Tile>
      </Scenario>
      <Scenario {...selectScenarios[5]}>
        <Grid.Root columns={3} gap="4" className="select-grid" data-testid="select-states">
          <Tile label="placeholder"><Field.Root id="select-placeholder"><Field.Label>Plan</Field.Label><Select.Root><Select.Trigger><Select.Value placeholder="Choose a plan" /><Select.Icon /></Select.Trigger><Select.Content><Select.Viewport><Options /></Select.Viewport><Select.Arrow /></Select.Content></Select.Root></Field.Root></Tile>
          <Tile label="controlled"><Field.Root id="select-controlled"><Field.Label>Plan</Field.Label><Select.Root value={value} onValueChange={setValue} open={open} onOpenChange={setOpen}><Select.Trigger><Select.Value /><Select.Icon /></Select.Trigger><Select.Content><Select.Viewport><Options /></Select.Viewport><Select.Arrow /></Select.Content></Select.Root><Text variant="caption">Value: {value}; open: {String(open)}</Text></Field.Root></Tile>
          <Tile label="disabled"><PlanSelect id="select-disabled" rootProps={{ disabled: true }} /></Tile>
          <Tile label="read only"><PlanSelect id="select-readonly" rootProps={{ readOnly: true }} /></Tile>
          <Tile label="invalid"><Field.Root id="select-invalid" invalid><Field.Label>Plan</Field.Label><Select.Root invalid><Select.Trigger><Select.Value placeholder="Choose a plan" /><Select.Icon /></Select.Trigger><Select.Content><Select.Viewport><Options /></Select.Viewport></Select.Content></Select.Root><Field.Error>Choose an available plan.</Field.Error></Field.Root></Tile>
        </Grid.Root>
      </Scenario>
      <Scenario {...selectScenarios[6]}>
        <Grid.Root columns={2} gap="4" className="select-grid" data-testid="select-forms">
          <Tile label="native form">
            <Form onReset={() => setStatus("Form reset")} onSubmit={(event) => { event.preventDefault(); setStatus(String(new FormData(event.currentTarget).get("plan"))); }}>
              <Field.Root id="select-form-plan" required><Field.Label>Billing plan</Field.Label><Select.Root defaultValue="team" name="plan" required><Select.Trigger><Select.Value placeholder="Choose a plan" /><Select.Icon /></Select.Trigger><Select.Content><Select.Viewport>{Options()}</Select.Viewport><Select.Arrow /></Select.Content></Select.Root><Field.Error>Choose a plan.</Field.Error></Field.Root>
              <HStack className="select-form-actions" gap="2"><Button type="submit">Submit</Button><Button tone="neutral" type="reset">Reset</Button></HStack>
              <output data-testid="select-form-status"><Text as="span" variant="caption">{status}</Text></output>
            </Form>
          </Tile>
          <Tile label="asChild trigger"><Field.Root id="select-as-child"><Field.Label>Plan</Field.Label><Select.Root defaultValue="team"><Select.Trigger asChild><button type="button"><Select.Value /><Select.Icon /></button></Select.Trigger><Select.Content><Select.Viewport>{Options()}</Select.Viewport><Select.Arrow /></Select.Content></Select.Root></Field.Root></Tile>
        </Grid.Root>
      </Scenario>
      <Scenario {...selectScenarios[7]}>
        <VStack gap="5" data-testid="select-appearance">
          <Grid.Root columns={2} gap="4" className="select-grid">
            <EvidenceSurface className="select-appearance-surface" data-brick-appearance="light"><SpecimenLabel>Light</SpecimenLabel><PlanSelect id="select-light" /></EvidenceSurface>
            <EvidenceSurface className="select-appearance-surface" data-brick-appearance="dark"><SpecimenLabel>Dark</SpecimenLabel><PlanSelect id="select-dark" /></EvidenceSurface>
          </Grid.Root>
          <EvidenceSurface className="playground-customization-evidence" inset="none">
            <Grid.Root columns={2} gap="0" className="select-customization playground-customization-layout">
              <VStack gap="2">
                <SpecimenLabel>Customized</SpecimenLabel>
                <Text as="h3" variant="title-sm">Select CSS properties</Text>
                <Text tone="secondary" variant="body-sm">The accent trigger, popup, and highlighted option use only the documented properties below.</Text>
                <PlaygroundCodeBlock>{`--brick-select-trigger-background: #eefbf5;
--brick-select-trigger-border: #18794e;
--brick-select-trigger-focus-ring: #18794e;
--brick-select-trigger-foreground: #0d3b2a;
--brick-select-content-background: #f4fff9;
--brick-select-item-highlighted-background: #d7f7e5;`}</PlaygroundCodeBlock>
              </VStack>
              <div className="playground-customization-preview"><PlanSelect id="select-custom" contentStyle={customTokens} triggerStyle={customTokens} /></div>
            </Grid.Root>
          </EvidenceSurface>
        </VStack>
      </Scenario>
      <Scenario {...selectScenarios[8]}>
        <Grid.Root columns={2} gap="4" className="select-grid" data-testid="select-stress">
          <Tile label="narrow and long"><div className="select-narrow"><PlanSelect id="select-long-text" label="Localized subscription plan with extended wording"><Select.Item value="team"><Select.ItemText>Collaboration workspace with an intentionally long localized option</Select.ItemText><Select.ItemIndicator /></Select.Item></PlanSelect></div></Tile>
          <Tile label="RTL localized">
            <div dir="rtl">
              <PlanSelect id="select-rtl" label="خطة الاشتراك">
                <Select.Item value="team"><Select.ItemText>خطة الفريق</Select.ItemText><Select.ItemIndicator /></Select.Item>
                <Select.Item value="starter"><Select.ItemText>الخطة الأساسية</Select.ItemText><Select.ItemIndicator /></Select.Item>
                <Select.Item value="enterprise"><Select.ItemText>خطة المؤسسات</Select.ItemText><Select.ItemIndicator /></Select.Item>
              </PlanSelect>
            </div>
          </Tile>
        </Grid.Root>
      </Scenario>
    </VStack>
  );
}
