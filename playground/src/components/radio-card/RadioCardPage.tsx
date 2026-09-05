import { useState } from "react";
import { Badge, Button, Fieldset, Form, Grid, HStack, RadioCard, Text, VStack, type RadioCardSize, type RadioCardVariant } from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { FormEvidenceCell as Cell } from "../../shared/FormEvidence.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import "../../shared/forms-evidence.playground.css";

const sizes: RadioCardSize[] = ["sm", "md", "lg"];
const variants: RadioCardVariant[] = ["outline", "surface", "subtle", "solid"];

export const radioCardScenarios = [
  { id: "radio-card.overview", number: 1, title: "Overview", description: "A rich whole-card radio choice preserves one semantic group and one selected value." },
  { id: "radio-card.recipes", number: 2, title: "Sizes and variants", navigationTitle: "Recipes", description: "Three coordinated sizes and four state-aware recipes cover ordinary and emphasized choice sets." },
  { id: "radio-card.content", number: 3, title: "Content and alignment", navigationTitle: "Content", description: "Titles, descriptions, indicators, badges, and addons remain optional composable parts." },
  { id: "radio-card.states", number: 4, title: "State and form behavior", navigationTitle: "States", description: "Disabled, read-only, required, submission, reset, and controlled ownership remain Atom behavior." },
  { id: "radio-card.stress", number: 5, title: "Responsive and appearance", navigationTitle: "Stress", description: "Long content, narrow grids, RTL, light and dark scopes, forced colors, and touch targets remain usable." },
] as const satisfies readonly ScenarioDefinition[];

function Plan({ description, title, value, addon }: { description: string; title: string; value: string; addon?: string }) {
  return <RadioCard.Item value={value}><RadioCard.Control><RadioCard.Content><RadioCard.Title>{title}</RadioCard.Title><RadioCard.Description>{description}</RadioCard.Description></RadioCard.Content><RadioCard.Indicator /></RadioCard.Control>{addon ? <RadioCard.Addon>{addon}</RadioCard.Addon> : null}</RadioCard.Item>;
}

function Plans() {
  return <><Plan value="starter" title="Starter" description="For personal projects"/><Plan value="team" title="Team" description="For growing product teams" addon="Most popular"/><Plan value="business" title="Business" description="For larger organizations"/></>;
}

export function RadioCardPage() {
  const [value, setValue] = useState("starter");
  const [status, setStatus] = useState("No form event yet");
  return <VStack className="forms-page" data-component-page="radio-card" data-testid="radio-card-workbench">
    <Scenario {...radioCardScenarios[0]}><EvidenceSurface inset="lg" data-testid="radio-card-overview"><Fieldset.Root><Fieldset.Legend>Choose a plan</Fieldset.Legend><RadioCard.Root defaultValue="team" name="plan"><Plans/></RadioCard.Root></Fieldset.Root></EvidenceSurface></Scenario>
    <Scenario {...radioCardScenarios[1]}><VStack gap="6" data-testid="radio-card-recipes"><Grid.Root columns={3} className="forms-grid forms-grid--three">{sizes.map(size=><Cell key={size} label={size}><RadioCard.Root aria-label={`${size} plans`} defaultValue="team" size={size}><Plans/></RadioCard.Root></Cell>)}</Grid.Root><Grid.Root columns={2} className="forms-grid forms-grid--two">{variants.map(variant=><Cell key={variant} label={variant}><RadioCard.Root aria-label={`${variant} plans`} defaultValue="team" variant={variant}><Plan value="team" title="Team" description="Shared collaboration"/></RadioCard.Root></Cell>)}</Grid.Root></VStack></Scenario>
    <Scenario {...radioCardScenarios[2]}><Grid.Root columns={2} className="forms-grid forms-grid--two" data-testid="radio-card-content"><Cell label="centered vertical content"><RadioCard.Root aria-label="Centered plan" align="center" defaultValue="team" orientation="vertical"><RadioCard.Item value="team"><RadioCard.Control><RadioCard.Content><RadioCard.Title>Team</RadioCard.Title><RadioCard.Description>Centered vertical content with no indicator</RadioCard.Description></RadioCard.Content></RadioCard.Control></RadioCard.Item></RadioCard.Root></Cell><Cell label="custom indicator and addon"><RadioCard.Root aria-label="Custom plan" defaultValue="team"><RadioCard.Item value="team"><RadioCard.Control><RadioCard.Content><HStack gap="2"><RadioCard.Title>Team</RadioCard.Title><Badge size="sm" variant="surface">Popular</Badge></HStack><RadioCard.Description>Rich metadata stays inside one radio</RadioCard.Description></RadioCard.Content><RadioCard.Indicator><Text aria-hidden="true" as="span">✓</Text></RadioCard.Indicator></RadioCard.Control><RadioCard.Addon>Billed annually</RadioCard.Addon></RadioCard.Item></RadioCard.Root></Cell></Grid.Root></Scenario>
    <Scenario {...radioCardScenarios[3]}><Grid.Root columns={2} className="forms-grid forms-grid--two" data-testid="radio-card-states"><Cell label="controlled and disabled"><VStack gap="3"><RadioCard.Root aria-label="Controlled plan" onValueChange={setValue} value={value}><Plan value="starter" title="Starter" description="Available now"/><Plan value="team" title="Team" description="Available now"/><RadioCard.Item disabled value="enterprise"><RadioCard.Control><RadioCard.Content><RadioCard.Title>Enterprise</RadioCard.Title><RadioCard.Description>Contact sales to unlock</RadioCard.Description></RadioCard.Content><RadioCard.Indicator/></RadioCard.Control></RadioCard.Item></RadioCard.Root><output><Text as="span" tone="secondary" variant="body-sm">Selected: {value}</Text></output></VStack></Cell><Cell label="native form"><Form aria-label="Plan form" onReset={()=>setStatus("Reset to Starter")} onSubmit={event=>setStatus(`Submitted: ${new FormData(event.currentTarget).get("billing-plan") ?? "none"}`)} preventDefaultOnSubmit><Fieldset.Root required><Fieldset.Legend>Billing plan</Fieldset.Legend><RadioCard.Root defaultValue="starter" name="billing-plan"><Plan value="starter" title="Starter" description="Monthly billing"/><Plan value="team" title="Team" description="Annual billing"/></RadioCard.Root></Fieldset.Root><HStack gap="2"><Button type="submit">Save</Button><Button tone="neutral" type="reset" variant="outline">Reset</Button></HStack><output><Text as="span" tone="secondary" variant="body-sm">{status}</Text></output></Form></Cell></Grid.Root></Scenario>
    <Scenario {...radioCardScenarios[4]}><VStack gap="5" data-testid="radio-card-stress"><Grid.Root columns={{ initial: 1, md: 2 }} className="forms-scoped-grid"><EvidenceSurface data-brick-appearance="light"><RadioCard.Root aria-label="Light plans" defaultValue="team"><Plans/></RadioCard.Root></EvidenceSurface><EvidenceSurface data-brick-appearance="dark"><RadioCard.Root aria-label="Dark plans" defaultValue="team"><Plans/></RadioCard.Root></EvidenceSurface></Grid.Root><EvidenceSurface dir="rtl"><RadioCard.Root aria-label="خطط الفوترة" defaultValue="team"><Plan value="starter" title="الخطة الأساسية" description="للمشاريع الشخصية والمحتوى الطويل"/><Plan value="team" title="خطة الفريق" description="للفرق التي تتعاون في منتجات متعددة"/></RadioCard.Root></EvidenceSurface></VStack></Scenario>
  </VStack>;
}
