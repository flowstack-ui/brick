import { useState, type CSSProperties, type ReactNode } from "react";
import {
  Avatar,
  Badge,
  HoverCard,
  type HoverCardSize,
} from "@flowstack-ui/brick";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./hover-card.playground.css";

const sizes: HoverCardSize[] = ["sm", "md", "lg"];
const sides = ["top", "right", "bottom", "left"] as const;
const aligns = ["start", "center", "end"] as const;
const customTokens = {
  "--brick-hover-card-border": "var(--brick-color-accent-border)",
  "--brick-hover-card-radius": "0.25rem",
  "--brick-hover-card-shadow": "0 1rem 3rem rgb(53 46 91 / 25%)",
} as CSSProperties;

function EvidenceGroup({ children, description, title }: { children: ReactNode; description: string; title: string }) {
  return <section className="hover-card-evidence-group"><div className="hover-card-evidence-group__heading"><h3>{title}</h3><p>{description}</p></div>{children}</section>;
}

function Cell({ children, label }: { children: ReactNode; label: string }) {
  return <div className="hover-card-specimen-cell"><SpecimenLabel>{label}</SpecimenLabel><div className="hover-card-specimen-cell__preview">{children}</div></div>;
}

function Profile({ person = "Ada Lovelace" }: { person?: string }) {
  const fallback = person.split(" ").map((part) => part[0]).join("").slice(0, 2);
  return <div className="hover-card-profile"><Avatar alt="" fallback={fallback} /><div><strong>{person}</strong><p>{person === "Ada Lovelace" ? "Mathematician and early computing author." : "Computer scientist and compiler pioneer."}</p><Badge>Available</Badge></div></div>;
}

function Preview({ align = "center", arrow = true, children = <Profile />, disabled = false, label, side = "bottom", size }: {
  align?: "start" | "center" | "end";
  arrow?: boolean;
  children?: ReactNode;
  disabled?: boolean;
  label: string;
  side?: "top" | "right" | "bottom" | "left";
  size?: HoverCardSize;
}) {
  const resource = label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return <HoverCard.Root closeDelay={0} disabled={disabled} openDelay={0}><HoverCard.Trigger asChild><a href={`/hover-card/destination?resource=${resource}`}>{label}</a></HoverCard.Trigger><HoverCard.Portal><HoverCard.Content align={align} data-testid={`hover-card-content-${resource}`} side={side} size={size}>{children}{arrow ? <HoverCard.Arrow /> : null}</HoverCard.Content></HoverCard.Portal></HoverCard.Root>;
}

function ScopedPreview({ appearance }: { appearance: "light" | "dark" }) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  return <div className="hover-card-appearance-panel" data-brick-appearance={appearance} ref={setContainer}><code>{appearance}</code>{container ? <HoverCard.Root openDelay={0}><HoverCard.Trigger asChild><a href={`/hover-card/destination?resource=${appearance}-profile`}>{appearance} profile</a></HoverCard.Trigger><HoverCard.Portal container={container}><HoverCard.Content><Profile /><HoverCard.Arrow /></HoverCard.Content></HoverCard.Portal></HoverCard.Root> : null}</div>;
}

export const hoverCardScenarios = [
  { description: "HoverCard’s canonical rendering is a medium neutral preview for a genuine link. The destination owns all essential information; the generic preview adds no popup role, focus management, or interactive descendants.", id: "hover-card.overview", number: 1, title: "Overview" },
  { description: "Size changes only preferred maximum inline width. Typography, child components, timing, placement, Arrow, and content remain identical.", id: "hover-card.sizes", number: 2, title: "Sizes" },
  { description: "Preferred side changes only initial placement. The explicit shared Arrow follows Atom’s collision-resolved side; the final specimen intentionally proves Arrow omission.", id: "hover-card.sides", navigationTitle: "Sides", number: 3, title: "Sides and Arrow" },
  { description: "Alignment changes only the cross-axis relationship. Every preview keeps the default bottom side, medium size, Arrow, timing, and identical content.", id: "hover-card.alignments", number: 4, title: "Alignments" },
  { description: "Controlled, default timing, and disabled state remain Atom-owned. Escape closes the top preview without moving focus from its genuine link.", id: "hover-card.states", navigationTitle: "States", number: 5, title: "State and timing" },
  { description: "Profile and document previews compose passive Brick components and semantic text only. Trigger asChild, render, native props, slots, handlers, and refs remain observable without adding preview controls.", id: "hover-card.composition", navigationTitle: "Composition", number: 6, title: "Content and composition" },
  { description: "Custom portal containers preserve local appearance scopes. Public Content class, slot, style, and component tokens customize the neutral surface only.", id: "hover-card.appearance", navigationTitle: "Theme", number: 7, title: "Appearance and customization" },
  { description: "Long unbroken copy, constrained width, collision edges, and genuine RTL content remain viewport-contained while touch continues to activate the underlying link.", id: "hover-card.stress", navigationTitle: "Stress", number: 8, title: "Responsive and RTL" },
] as const satisfies readonly ScenarioDefinition[];

export function HoverCardPage() {
  const [controlledOpen, setControlledOpen] = useState(false);
  return <div className="hover-card-page" data-component-page="hover-card" data-testid="hover-card-workbench">
    <Scenario {...hoverCardScenarios[0]}><div className="hover-card-overview" data-testid="hover-card-overview"><Preview label="Ada Lovelace" /><p>Ada’s complete profile remains available at the destination.</p></div></Scenario>

    <Scenario {...hoverCardScenarios[1]}><div className="hover-card-specimen-grid hover-card-specimen-grid--three" data-testid="hover-card-sizes">{sizes.map((size) => <Cell key={size} label={size}><Preview label={`${size} preview`} size={size}><div className="hover-card-document"><Badge>{size}</Badge><strong>Analytical Engine notes</strong><p>A concise document preview with a stable destination.</p></div></Preview></Cell>)}</div></Scenario>

    <Scenario {...hoverCardScenarios[2]}><div className="hover-card-specimen-grid hover-card-specimen-grid--four" data-testid="hover-card-placement">{sides.map((side) => <Cell key={side} label={side}><Preview arrow={side !== "left"} label={side === "top" ? "Top" : side === "right" ? "Right" : side === "bottom" ? "Bottom" : "Left, no arrow"} side={side} /></Cell>)}</div></Scenario>

    <Scenario {...hoverCardScenarios[3]}><div className="hover-card-specimen-grid hover-card-specimen-grid--three" data-testid="hover-card-alignments">{aligns.map((align) => <Cell key={align} label={align}><Preview align={align} label={`${align} preview`} /></Cell>)}</div></Scenario>

    <Scenario {...hoverCardScenarios[4]}><div className="hover-card-specimen-grid hover-card-specimen-grid--three" data-testid="hover-card-state">
      <Cell label="controlled"><HoverCard.Root onOpenChange={setControlledOpen} open={controlledOpen} openDelay={0}><HoverCard.Trigger asChild><a href="/hover-card/destination?resource=controlled-preview">Controlled preview</a></HoverCard.Trigger><HoverCard.Portal><HoverCard.Content><strong>Controlled resource</strong><p>State is owned by the application.</p><HoverCard.Arrow /></HoverCard.Content></HoverCard.Portal></HoverCard.Root></Cell>
      <Cell label="default timing"><HoverCard.Root><HoverCard.Trigger asChild><a href="/hover-card/destination?resource=default-delay">Default delay preview</a></HoverCard.Trigger><HoverCard.Portal><HoverCard.Content><strong>Default timing</strong><p>700 ms open and 300 ms close.</p><HoverCard.Arrow /></HoverCard.Content></HoverCard.Portal></HoverCard.Root></Cell>
      <Cell label="disabled"><Preview disabled label="Disabled preview"><p>This preview must not open.</p></Preview></Cell>
    </div></Scenario>

    <Scenario {...hoverCardScenarios[5]}><div className="hover-card-evidence-stack" data-testid="hover-card-composition">
      <EvidenceGroup description="Both previews remain passive summaries whose full content exists at their genuine destinations." title="Preview content"><div className="hover-card-specimen-grid hover-card-specimen-grid--two"><Cell label="profile"><Preview label="Grace Hopper"><Profile person="Grace Hopper" /></Preview></Cell><Cell label="document"><Preview label="Compiler project notes" size="lg"><div className="hover-card-document"><Badge>Document</Badge><strong>Compiler project notes</strong><p>Updated July 18 · 12 minute read · Engineering workspace.</p></div></Preview></Cell></div></EvidenceGroup>
      <EvidenceGroup description="Trigger composition changes only the authored link mechanism; each live result is paired with its actual link output." title="Trigger composition"><div className="playground-output-stack"><RenderedOutput label="asChild Hover Card Trigger HTML"><Preview label="As-child resource" /></RenderedOutput><RenderedOutput label="render Hover Card Trigger HTML"><HoverCard.Root openDelay={0}><HoverCard.Trigger data-testid="hover-card-render" render={<a href="/hover-card/destination?resource=render-resource" />}>Render resource</HoverCard.Trigger><HoverCard.Portal><HoverCard.Content><Profile /><HoverCard.Arrow /></HoverCard.Content></HoverCard.Portal></HoverCard.Root></RenderedOutput></div></EvidenceGroup>
    </div></Scenario>

    <Scenario {...hoverCardScenarios[6]}><div className="hover-card-evidence-stack">
      <EvidenceGroup description="Focus or hover each genuine link to inspect its same-document portal inside the local light or dark token scope." title="Scoped appearances"><div className="hover-card-scoped-grid" data-testid="hover-card-appearance"><ScopedPreview appearance="light" /><ScopedPreview appearance="dark" /></div></EvidenceGroup>
      <EvidenceGroup description="The code names supported hooks and exactly matches the rendered result." title="Consumer customization"><article className="hover-card-customization"><div><h4>Content CSS properties</h4><p>Focus or hover the genuine link to inspect the customized Content class, slot, native style, and public surface tokens.</p><pre aria-label="HoverCard customization example" tabIndex={0}><code>{`<HoverCard.Content
  className="custom-hover-card"
  data-slot="custom-hover-card"
  style={{
    "--brick-hover-card-border":
      "var(--brick-color-accent-border)",
    "--brick-hover-card-radius": "0.25rem",
    "--brick-hover-card-shadow":
      "0 1rem 3rem rgb(53 46 91 / 25%)",
  }}
>
  <Profile />
  <HoverCard.Arrow />
</HoverCard.Content>`}</code></pre></div><div className="hover-card-customization__preview"><HoverCard.Root openDelay={0}><HoverCard.Trigger asChild><a href="/hover-card/destination?resource=custom-profile">Custom profile</a></HoverCard.Trigger><HoverCard.Portal><HoverCard.Content className="custom-hover-card" data-slot="custom-hover-card" style={customTokens}><Profile /><HoverCard.Arrow /></HoverCard.Content></HoverCard.Portal></HoverCard.Root></div></article></EvidenceGroup>
    </div></Scenario>

    <Scenario {...hoverCardScenarios[7]}><div className="hover-card-evidence-stack" data-testid="hover-card-stress">
      <EvidenceGroup description="Long localized content wraps within a 20rem frame and collision handling keeps the preview in the viewport." title="Constrained-width stress"><div className="hover-card-stress-panel"><div className="hover-card-phone-frame"><Preview align="start" label="Very long localized document preview" size="lg"><div className="hover-card-document"><strong>ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-without-a-natural-break</strong><p>A deliberately long localized description that remains within the dynamic viewport.</p></div></Preview></div></div></EvidenceGroup>
      <EvidenceGroup description="Logical alignment and authored content inherit genuine right-to-left direction." title="RTL inheritance"><div className="hover-card-stress-panel"><div className="hover-card-phone-frame" dir="rtl"><Preview align="end" label="ملف آدا لوفلايس"><div className="hover-card-profile"><Avatar alt="" fallback="آل" /><div><strong>آدا لوفلايس</strong><p>عالمة رياضيات وكاتبة في الحوسبة المبكرة.</p></div></div></Preview></div></div></EvidenceGroup>
    </div></Scenario>
  </div>;
}
