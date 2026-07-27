import { createElement, useId, useState, type CSSProperties, type ReactElement, type ReactNode } from "react";
import {
  BottomNavigation,
  Code,
  Grid,
  Icon,
  NotificationBadge,
  Text,
  VStack,
  type BottomNavigationArrangement,
  type BottomNavigationLayout,
  type BottomNavigationLabelVisibility,
  type BottomNavigationPosition,
  type BottomNavigationSize,
  type BottomNavigationTone,
  type BottomNavigationVariant,
} from "@flowstack-ui/brick";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { FormRenderedOutput as RenderedOutput } from "../../shared/FormEvidence.js";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./bottom-navigation.playground.css";

type Destination = { icon: ReactNode; label: string; value: string };

function HomeGraphic() { return <svg viewBox="0 0 24 24"><path d="m4 11 8-7 8 7v9h-6v-6h-4v6H4Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" /></svg>; }
function SearchGraphic() { return <svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" fill="none" r="6.5" stroke="currentColor" strokeWidth="1.7" /><path d="m15.5 15.5 4 4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" /></svg>; }
function InboxGraphic() { return <svg viewBox="0 0 24 24"><path d="M4 6h16v12H4Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" /><path d="m4 14 4-4h8l4 4M8 14h8" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" /></svg>; }
function PersonGraphic() { return <svg viewBox="0 0 24 24"><circle cx="12" cy="8" fill="none" r="3.5" stroke="currentColor" strokeWidth="1.7" /><path d="M5 20c.6-4 3-6 7-6s6.4 2 7 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" /></svg>; }
function SettingsGraphic() { return <svg viewBox="0 0 24 24"><circle cx="12" cy="12" fill="none" r="3" stroke="currentColor" strokeWidth="1.7" /><path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1m0-12.8-2.1 2.1m-8.6 8.6-2.1 2.1" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" /></svg>; }

const destinations: Destination[] = [
  { icon: <HomeGraphic />, label: "Home", value: "home" },
  { icon: <SearchGraphic />, label: "Search", value: "search" },
  { icon: <InboxGraphic />, label: "Inbox", value: "inbox" },
  { icon: <PersonGraphic />, label: "Account", value: "account" },
  { icon: <SettingsGraphic />, label: "Settings", value: "settings" },
];

function DestinationIcon({ children, notification = false }: { children: ReactNode; notification?: boolean }) {
  const icon = <Icon size="md">{children as ReactElement}</Icon>;
  return <BottomNavigation.Icon>{notification ? <NotificationBadge count={4} overlap="circular">{icon}</NotificationBadge> : icon}</BottomNavigation.Icon>;
}

type NavigationBarProps = Omit<React.ComponentProps<typeof BottomNavigation.Root>, "children" | "defaultValue"> & {
  count?: number;
  defaultValue?: string;
  notification?: boolean;
};

function NavigationBar({ ariaLabel = "Primary", count = 4, defaultValue = "home", notification = false, ...props }: NavigationBarProps) {
  const exampleId = useId().replace(/:/g, "");
  return createElement(
    BottomNavigation.Root,
    { ...props, ariaLabel: `${ariaLabel} example ${exampleId}`, defaultValue } as React.ComponentProps<typeof BottomNavigation.Root>,
    destinations.slice(0, count).map((destination) => (
        <BottomNavigation.Item href={`#bottom-navigation-${destination.value}`} key={destination.value} value={destination.value}>
          <DestinationIcon notification={notification && destination.value === "inbox"}>{destination.icon}</DestinationIcon>
          <BottomNavigation.Label>{destination.label}</BottomNavigation.Label>
        </BottomNavigation.Item>
      )),
  );
}

function Cell({ children, label }: { children: ReactNode; label: string }) {
  return <EvidenceSurface className="bottom-navigation-cell" level="canvas"><SpecimenLabel>{label}</SpecimenLabel><div className="bottom-navigation-preview">{children}</div></EvidenceSurface>;
}

function Group({ children, description, title }: { children: ReactNode; description: string; title: string }) {
  return <VStack as="section" className="bottom-navigation-group"><VStack className="bottom-navigation-group__heading"><Text as="h3" variant="title-sm">{title}</Text><Text as="p" tone="secondary" variant="body-sm">{description}</Text></VStack>{children}</VStack>;
}

const variants: BottomNavigationVariant[] = ["solid", "soft", "outline", "ghost"];
const tones: BottomNavigationTone[] = ["accent", "neutral"];
const layouts: BottomNavigationLayout[] = ["full", "floating"];
const arrangements: BottomNavigationArrangement[] = ["equal", "centered"];
const sizes: BottomNavigationSize[] = ["sm", "md", "lg"];
const positions: BottomNavigationPosition[] = ["static", "sticky", "absolute", "fixed"];
const labelPolicies: BottomNavigationLabelVisibility[] = ["always", "active", "hidden"];

const customStyle = {
  "--brick-bottom-navigation-background": "#fffbeb",
  "--brick-bottom-navigation-border-color": "#d97706",
  "--brick-bottom-navigation-selection-background": "#fde68a",
  "--brick-bottom-navigation-selection-border": "#d97706",
  "--brick-bottom-navigation-item-foreground-active": "#92400e",
} as CSSProperties;

export const bottomNavigationScenarios = [
  { id: "bottom-navigation.overview", number: 1, title: "Overview", description: "Defaults render an outline accent bar with full equal layout, medium targets, a pill Icon indicator, persistent labels, static flow, and safe-area support." },
  { id: "bottom-navigation.variants", number: 2, title: "Variants and tones", navigationTitle: "Recipes", description: "Only surface variant and tone change. Accent and fully neutral palettes cover solid, soft, outline, and ghost without altering geometry." },
  { id: "bottom-navigation.layout", number: 3, title: "Layout and arrangement", navigationTitle: "Layout", description: "Full versus floating controls outer geometry; equal versus centered independently controls destination distribution." },
  { id: "bottom-navigation.size-position", number: 4, title: "Sizes and positions", navigationTitle: "Size + position", description: "Three sizes coordinate the whole bar. Static, sticky, absolute, and fixed preserve their distinct flow or overlay intent inside bounded previews." },
  { id: "bottom-navigation.selection", number: 5, title: "Selection and shape", navigationTitle: "Selection", description: "Selected paint targets either Icon or the complete Item, with only shapes valid for that target and no layout shift." },
  { id: "bottom-navigation.labels-content", number: 6, title: "Labels and content", navigationTitle: "Content", description: "Always, active, and hidden visual label policies retain accessible names; three to five destinations and Notification Badge compose without new parts." },
  { id: "bottom-navigation.behavior", number: 7, title: "Destinations, states, and composition", navigationTitle: "Behavior", description: "Native links, controlled buttons, disabled state, and router composition retain Atom behavior, native output, slots, refs, and current state." },
  { id: "bottom-navigation.effects", number: 8, title: "Appearance, effects, and customization", navigationTitle: "Theme", description: "Light and dark defaults, elevation, blur, and one exact CSS-variable customization remain independent from layout and position." },
  { id: "bottom-navigation.stress", number: 9, title: "Responsive, RTL, safe area, and preferences", navigationTitle: "Stress", description: "Narrow width, long labels, RTL, safe-area ownership, zoom, forced colors, reduced motion, and reduced transparency preserve usable geometry." },
] as const satisfies readonly ScenarioDefinition[];

export function BottomNavigationPage() {
  const [controlledValue, setControlledValue] = useState("home");
  return <VStack className="bottom-navigation-page" data-component-page="bottom-navigation" data-testid="bottom-navigation-workbench">
    <Scenario {...bottomNavigationScenarios[0]}><EvidenceSurface className="bottom-navigation-overview" inset="lg" data-testid="bottom-navigation-overview"><div className="bottom-navigation-phone"><NavigationBar /></div></EvidenceSurface></Scenario>
    <Scenario {...bottomNavigationScenarios[1]}><VStack className="bottom-navigation-evidence-stack" data-testid="bottom-navigation-recipes">{tones.map((tone) => <Group key={tone} title={`${tone} tone`} description="Variant changes only the bar surface; all destinations keep the same default content and geometry."><Grid.Root columns={4} className="bottom-navigation-grid bottom-navigation-grid--four">{variants.map((variant) => <Cell key={variant} label={variant}><NavigationBar count={3} tone={tone} variant={variant} /></Cell>)}</Grid.Root></Group>)}</VStack></Scenario>
    <Scenario {...bottomNavigationScenarios[2]}><VStack className="bottom-navigation-evidence-stack" data-testid="bottom-navigation-layout"><Group title="Outer layout" description="The same equal destinations either fill the container or form an inset floating surface."><Grid.Root columns={2} className="bottom-navigation-grid bottom-navigation-grid--two">{layouts.map((layout) => <Cell key={layout} label={layout}><NavigationBar layout={layout} /></Cell>)}</Grid.Root></Group><Group title="Destination arrangement" description="Only track distribution changes between equal available shares and centered closed targets."><Grid.Root columns={2} className="bottom-navigation-grid bottom-navigation-grid--two">{arrangements.map((arrangement) => <Cell key={arrangement} label={arrangement}><NavigationBar arrangement={arrangement} /></Cell>)}</Grid.Root></Group></VStack></Scenario>
    <Scenario {...bottomNavigationScenarios[3]}><VStack className="bottom-navigation-evidence-stack" data-testid="bottom-navigation-size-position"><Group title="Coordinated size" description="Each size changes target, Icon, indicator, padding, and label together."><Grid.Root columns={3} className="bottom-navigation-grid bottom-navigation-grid--three">{sizes.map((size) => <Cell key={size} label={size}><NavigationBar count={3} size={size} variant="outline" /></Cell>)}</Grid.Root></Group><Group title="Position intent" description="Transformed preview frames contain fixed positioning without changing the component's computed position."><Grid.Root columns={2} className="bottom-navigation-grid bottom-navigation-grid--two">{positions.map((position) => <Cell key={position} label={position}><div className={`bottom-navigation-position-preview bottom-navigation-position-preview--${position}`}><Text tone="secondary" variant="caption">Content region</Text><NavigationBar count={3} position={position} size="sm" /></div></Cell>)}</Grid.Root></Group></VStack></Scenario>
    <Scenario {...bottomNavigationScenarios[4]}><VStack className="bottom-navigation-evidence-stack" data-testid="bottom-navigation-selection"><Group title="Icon indicator" description="Circle is square around the Icon; rounded and pill change only selected paint radius and width."><Grid.Root columns={3} className="bottom-navigation-grid bottom-navigation-grid--three">{(["circle", "rounded", "pill"] as const).map((selectionShape) => <Cell key={selectionShape} label={selectionShape}><NavigationBar count={3} selection="indicator" selectionShape={selectionShape} /></Cell>)}</Grid.Root></Group><Group title="Whole Item" description="Square, rounded, and pill paint the complete selected destination without creating a circular target."><Grid.Root columns={3} className="bottom-navigation-grid bottom-navigation-grid--three">{(["square", "rounded", "pill"] as const).map((selectionShape) => <Cell key={selectionShape} label={selectionShape}><NavigationBar count={3} selection="item" selectionShape={selectionShape} /></Cell>)}</Grid.Root></Group></VStack></Scenario>
    <Scenario {...bottomNavigationScenarios[5]}><VStack className="bottom-navigation-evidence-stack" data-testid="bottom-navigation-labels-content"><Group title="Label visibility" description="Only visual label presence changes; every link keeps the same accessible destination name."><Grid.Root columns={3} className="bottom-navigation-grid bottom-navigation-grid--three">{labelPolicies.map((labelVisibility) => <Cell key={labelVisibility} label={labelVisibility}><NavigationBar count={3} labelVisibility={labelVisibility} /></Cell>)}</Grid.Root></Group><Group title="Destination count and badge" description="Three, four, and five items use the default recipe; the final example composes Notification Badge around Inbox Icon."><Grid.Root columns={3} className="bottom-navigation-grid bottom-navigation-grid--three">{[3, 4, 5].map((count) => <Cell key={count} label={`${count} destinations`}><NavigationBar count={count} notification={count === 5} /></Cell>)}</Grid.Root></Group></VStack></Scenario>
    <Scenario {...bottomNavigationScenarios[6]}><VStack className="bottom-navigation-evidence-stack" data-testid="bottom-navigation-behavior"><Group title="Destination models and states" description="Only destination behavior changes; both examples retain default visual recipes."><Grid.Root columns={2} className="bottom-navigation-grid bottom-navigation-grid--two"><Cell label="native links"><NavigationBar count={3} /></Cell><Cell label="controlled buttons"><VStack gap="2" style={{ inlineSize: "100%" }}><BottomNavigation.Root ariaLabel="Workspace views" onChange={setControlledValue} value={controlledValue}>{destinations.slice(0, 3).map((destination) => <BottomNavigation.Item disabled={destination.value === "inbox"} key={destination.value} value={destination.value}><DestinationIcon>{destination.icon}</DestinationIcon><BottomNavigation.Label>{destination.label}</BottomNavigation.Label></BottomNavigation.Item>)}</BottomNavigation.Root><Text data-testid="bottom-navigation-value" tone="secondary" variant="body-sm">Current view: {controlledValue}</Text></VStack></Cell></Grid.Root></Group><Group title="Router composition and rendered output" description="The right side inspects the exact composed anchor with native and Brick/Atom state preserved."><RenderedOutput label="Bottom Navigation item HTML"><BottomNavigation.Root ariaLabel="Composed destinations" defaultValue="docs"><BottomNavigation.Item asChild value="docs"><a className="router-link" data-router-link="docs" href="#bottom-navigation-docs"><DestinationIcon><HomeGraphic /></DestinationIcon><BottomNavigation.Label>Documentation</BottomNavigation.Label></a></BottomNavigation.Item></BottomNavigation.Root></RenderedOutput></Group></VStack></Scenario>
    <Scenario {...bottomNavigationScenarios[7]}><VStack className="bottom-navigation-evidence-stack" data-testid="bottom-navigation-effects"><Group title="Scoped appearances" description="Identical defaults inherit semantic surface and accent tokens in both appearance scopes."><Grid.Root columns={2} className="bottom-navigation-scoped-grid" data-testid="bottom-navigation-appearance"><EvidenceSurface data-brick-appearance="light"><Code>light</Code><NavigationBar /></EvidenceSurface><EvidenceSurface data-brick-appearance="dark"><Code>dark</Code><NavigationBar /></EvidenceSurface></Grid.Root></Group><Group title="Independent effects" description="Elevation and blur add paint only; layout, size, and position stay at defaults."><Grid.Root columns={2} className="bottom-navigation-grid bottom-navigation-grid--two"><Cell label="elevated"><NavigationBar elevated /></Cell><Cell label="blurred"><div className="bottom-navigation-underlay"><NavigationBar blurred /></div></Cell></Grid.Root></Group><Group title="Consumer customization" description="The shown variables exactly produce the amber surface, border, selected indicator, and active foreground."><EvidenceSurface className="bottom-navigation-customization" inset="lg"><PlaygroundCodeBlock aria-label="Bottom Navigation customization code">{`style={{\n  "--brick-bottom-navigation-background": "#fffbeb",\n  "--brick-bottom-navigation-border-color": "#d97706",\n  "--brick-bottom-navigation-selection-background": "#fde68a",\n  "--brick-bottom-navigation-selection-border": "#d97706",\n  "--brick-bottom-navigation-item-foreground-active": "#92400e",\n}}`}</PlaygroundCodeBlock><NavigationBar style={customStyle} /></EvidenceSurface></Group></VStack></Scenario>
    <Scenario {...bottomNavigationScenarios[8]}><VStack className="bottom-navigation-evidence-stack" data-testid="bottom-navigation-stress"><Group title="Narrow and RTL" description="Long labels truncate visually without changing bar height, retain their full accessible names, and preserve logical destination order in RTL."><Grid.Root columns={2} className="bottom-navigation-grid bottom-navigation-grid--two"><Cell label="narrow long labels"><div className="bottom-navigation-narrow"><BottomNavigation.Root ariaLabel="Project destinations" defaultValue="recent"><BottomNavigation.Item value="recent"><DestinationIcon><HomeGraphic /></DestinationIcon><BottomNavigation.Label>Recent activity</BottomNavigation.Label></BottomNavigation.Item><BottomNavigation.Item value="messages"><DestinationIcon><InboxGraphic /></DestinationIcon><BottomNavigation.Label>Team messages</BottomNavigation.Label></BottomNavigation.Item><BottomNavigation.Item value="settings"><DestinationIcon><SettingsGraphic /></DestinationIcon><BottomNavigation.Label>Workspace settings</BottomNavigation.Label></BottomNavigation.Item></BottomNavigation.Root></div></Cell><Cell label="RTL"><div dir="rtl"><BottomNavigation.Root ariaLabel="التنقل الرئيسي" defaultValue="home" dir="rtl"><BottomNavigation.Item value="home"><DestinationIcon><HomeGraphic /></DestinationIcon><BottomNavigation.Label>الرئيسية</BottomNavigation.Label></BottomNavigation.Item><BottomNavigation.Item value="search"><DestinationIcon><SearchGraphic /></DestinationIcon><BottomNavigation.Label>البحث</BottomNavigation.Label></BottomNavigation.Item><BottomNavigation.Item value="account"><DestinationIcon><PersonGraphic /></DestinationIcon><BottomNavigation.Label>الحساب</BottomNavigation.Label></BottomNavigation.Item></BottomNavigation.Root></div></Cell></Grid.Root></Group><Group title="Safe-area ownership" description="Root owns safe-area protection by default; a shell may opt out when it already supplies the inset."><Grid.Root columns={2} className="bottom-navigation-grid bottom-navigation-grid--two"><Cell label="safe area default"><NavigationBar /></Cell><Cell label="shell-owned inset"><NavigationBar safeArea={false} /></Cell></Grid.Root></Group></VStack></Scenario>
  </VStack>;
}
