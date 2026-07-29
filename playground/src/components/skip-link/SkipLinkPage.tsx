import {
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  Badge,
  Button,
  Grid,
  HStack,
  SkipLink,
  Surface,
  Text,
  VStack,
} from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./skip-link.playground.css";

export const skipLinkScenarios = [
  { id: "skip-link.overview", number: 1, title: "Overview", description: "The native bypass link remains off-canvas until focus, then appears above the page and moves focus to primary content." },
  { id: "skip-link.focus", number: 2, title: "Focus and activation", navigationTitle: "Focus", description: "Tab, programmatic focus, and Enter use one visible focus-reveal and Atom-owned destination behavior." },
  { id: "skip-link.output", number: 3, title: "Target and rendered output", navigationTitle: "Output", description: "Root and Target retain native fragment, focusability, slots, classes, and authored content." },
  { id: "skip-link.native", number: 4, title: "Native behavior and failure paths", navigationTitle: "Native paths", description: "Prevented activation, native-only navigation, and missing destinations preserve their explicit fallback behavior." },
  { id: "skip-link.composition", number: 5, title: "Composition, props, and refs", navigationTitle: "Composition", description: "render and asChild preserve semantic hosts while native props, authored slots, styles, and refs remain observable." },
  { id: "skip-link.sticky", number: 6, title: "Sticky application chrome", navigationTitle: "Sticky chrome", description: "The focused link stays above repeated sticky navigation without inheriting shell layout or scroll-offset policy." },
  { id: "skip-link.appearance", number: 7, title: "Appearance and customization", navigationTitle: "Theme", description: "Separate light and dark examples use compact badges; the customized example names the exact public variables it changes." },
  { id: "skip-link.stress", number: 8, title: "Responsive, localization, and RTL", navigationTitle: "Stress", description: "Long localized text wraps inside the viewport and logical placement follows narrow LTR and RTL layouts." },
] as const satisfies readonly ScenarioDefinition[];

function EvidenceGroup({ children, description, title }: { children: ReactNode; description: string; title: string }) {
  return <VStack as="section" gap="4"><VStack gap="2"><Text as="h3" variant="title-sm">{title}</Text><Text as="p" tone="secondary" variant="body-sm">{description}</Text></VStack>{children}</VStack>;
}

function Cell({ children, label }: { children: ReactNode; label: string }) {
  return <EvidenceSurface className="skip-link-cell"><SpecimenLabel>{label}</SpecimenLabel><div className="skip-link-cell__preview">{children}</div></EvidenceSurface>;
}

function Target({ children = "Primary workspace content", id = "skip-link-page-target" }: { children?: ReactNode; id?: string }) {
  return <SkipLink.Target asChild id={id}><section aria-label={`${id.replace(/-/g, " ")} destination`} className="skip-link-target-card"><Text as="h3" variant="title-sm">Destination reached</Text><Text as="p" tone="secondary" variant="body-sm">{children}</Text><Button size="sm" variant="outline">First content action</Button></section></SkipLink.Target>;
}

const customStyle = {
  "--brick-skip-link-background": "#2e1065",
  "--brick-skip-link-foreground": "#ffffff",
  "--brick-skip-link-border-color": "#c4b5fd",
  "--brick-skip-link-radius": "999px",
} as CSSProperties;

export function SkipLinkPage() {
  const focusRef = useRef<HTMLAnchorElement>(null);
  const compositionRef = useRef<HTMLAnchorElement>(null);
  const [focusState, setFocusState] = useState("Skip link has not been focused.");
  const [nativeState, setNativeState] = useState("No native-path example activated.");
  const [refState, setRefState] = useState("Ref not inspected.");

  return <VStack className="skip-link-page" data-component-page="skip-link">
    <Scenario {...skipLinkScenarios[0]}>
      <EvidenceSurface className="skip-link-overview" data-testid="skip-link-overview" inset="lg">
        <SkipLink.Root href="#skip-link-overview-target">Skip repeated workspace navigation</SkipLink.Root>
        <VStack gap="3"><Badge size="sm" tone="accent">Keyboard bypass</Badge><Text as="h3" variant="title-md">A direct route to primary content</Text><Text as="p" tone="secondary">Focus the hidden link to reveal the finished overlay, then activate it to land beyond the repeated tools.</Text><Target id="skip-link-overview-target" /></VStack>
      </EvidenceSurface>
    </Scenario>

    <Scenario {...skipLinkScenarios[1]}>
      <EvidenceSurface data-testid="skip-link-focus" inset="lg"><VStack gap="4">
        <HStack gap="3" wrap><Button onClick={() => { focusRef.current?.focus(); setFocusState("Skip link focused and visible."); }}>Focus skip link</Button><output data-testid="skip-link-focus-status"><Text as="span" tone="secondary" variant="body-sm">{focusState}</Text></output></HStack>
        <SkipLink.Root href="#skip-link-focus-target" ref={focusRef}>Skip focus demonstration</SkipLink.Root>
        <Target id="skip-link-focus-target">After activation, continue with the first content action.</Target>
      </VStack></EvidenceSurface>
    </Scenario>

    <Scenario {...skipLinkScenarios[2]}>
      <RenderedOutput label="Skip Link HTML"><SkipLink.Root href="#rendered-primary">Skip navigation</SkipLink.Root><SkipLink.Target asChild id="rendered-primary"><section aria-label="Rendered primary content"><Text as="p">Rendered primary content</Text></section></SkipLink.Target></RenderedOutput>
    </Scenario>

    <Scenario {...skipLinkScenarios[3]}>
      <Grid.Root columns={3} className="skip-link-grid" data-testid="skip-link-native">
        <Cell label="consumer prevented"><SkipLink.Root href="#prevented-target" onClick={(event) => { event.preventDefault(); setNativeState("Consumer prevented focus transfer."); }}>Skip prevented example</SkipLink.Root><Button onClick={() => document.querySelector<HTMLAnchorElement>('[href="#prevented-target"]')?.focus()} size="sm" variant="outline">Focus example</Button><Target id="prevented-target" /></Cell>
        <Cell label="native only"><SkipLink.Root focusTarget={false} href="#native-target" onClick={() => setNativeState("Native fragment navigation requested.")}>Use native fragment navigation</SkipLink.Root><Button onClick={() => document.querySelector<HTMLAnchorElement>('[href="#native-target"]')?.focus()} size="sm" variant="outline">Focus example</Button><Target id="native-target" /></Cell>
        <Cell label="missing destination"><SkipLink.Root href="#missing-skip-destination" onClick={() => setNativeState("Missing target left native behavior intact.")}>Skip to missing destination</SkipLink.Root><Button onClick={() => document.querySelector<HTMLAnchorElement>('[href="#missing-skip-destination"]')?.focus()} size="sm" variant="outline">Focus example</Button></Cell>
      </Grid.Root>
      <output data-testid="skip-link-native-status"><Text as="span" tone="secondary">{nativeState}</Text></output>
    </Scenario>

    <Scenario {...skipLinkScenarios[4]}>
      <VStack gap="4"><Grid.Root columns={2} className="skip-link-grid"><Cell label="render adapters"><SkipLink.Root href="#render-target" render={<a data-adapter="render-root" />}>Skip rendered navigation</SkipLink.Root><Button onClick={() => document.querySelector<HTMLAnchorElement>('[data-adapter="render-root"]')?.focus()} size="sm" variant="outline">Focus render root</Button><SkipLink.Target id="render-target" render={<section aria-label="Rendered target" data-adapter="render-target" />} /></Cell><Cell label="asChild and native props"><SkipLink.Root asChild data-purpose="composition" data-slot="custom-skip-root" href="#child-target" ref={compositionRef}><a href="#child-target">Skip child navigation</a></SkipLink.Root><Button onClick={() => { setRefState(compositionRef.current?.tagName === "A" ? "Ref host: A" : "Ref missing"); compositionRef.current?.focus(); }} size="sm" variant="outline">Inspect and focus ref</Button><SkipLink.Target asChild id="child-target"><section aria-label="Child target" data-adapter="child-target" /></SkipLink.Target></Cell></Grid.Root><output data-testid="skip-link-ref-status"><Text as="span" tone="secondary">{refState}</Text></output></VStack>
    </Scenario>

    <Scenario {...skipLinkScenarios[5]}>
      <EvidenceSurface className="skip-link-shell-stage" data-testid="skip-link-sticky" inset="none"><div className="skip-link-shell-stage__bar"><Text weight="semibold">Sticky workspace navigation</Text><Badge size="sm">Repeated</Badge></div><VStack className="skip-link-shell-stage__content" gap="3"><Text as="h3" variant="title-sm">Content below the sticky bar</Text><Button onClick={() => document.querySelector<HTMLAnchorElement>('[href="#skip-link-playground-main"]')?.focus()} size="sm">Reveal the application Skip Link</Button><Text as="p" tone="secondary">This route explicitly places the real Skip Link before the playground App Bar and pairs it with the main content target.</Text></VStack></EvidenceSurface>
    </Scenario>

    <Scenario {...skipLinkScenarios[6]}>
      <VStack className="skip-link-evidence-stack" gap="6"><EvidenceGroup title="Scoped appearances" description="Compact badges identify the same Skip Link defaults in separate light and dark scopes."><Grid.Root columns={2} className="skip-link-grid" data-testid="skip-link-appearance"><EvidenceSurface data-brick-appearance="light"><Badge size="sm">Light</Badge><SkipLink.Root href="#appearance-light-target">Skip light navigation</SkipLink.Root><Button onClick={() => document.querySelector<HTMLAnchorElement>('[href="#appearance-light-target"]')?.focus()} size="sm" variant="outline">Focus light link</Button><Target id="appearance-light-target" /></EvidenceSurface><EvidenceSurface data-brick-appearance="dark"><Badge size="sm">Dark</Badge><SkipLink.Root href="#appearance-dark-target">Skip dark navigation</SkipLink.Root><Button onClick={() => document.querySelector<HTMLAnchorElement>('[href="#appearance-dark-target"]')?.focus()} size="sm" variant="outline">Focus dark link</Button><Target id="appearance-dark-target" /></EvidenceSurface></Grid.Root></EvidenceGroup><EvidenceGroup title="Consumer customization" description="A violet surface and pill boundary come only from the documented variables shown."><EvidenceSurface as="article" className="skip-link-customization" data-testid="skip-link-customization" inset="lg"><VStack gap="2"><Badge size="sm" tone="accent">Customized</Badge><Text as="h4" variant="title-sm">Violet bypass surface</Text><Text as="p" tone="secondary" variant="body-sm">The link keeps the same focus and target behavior while consumer variables alter only its paint.</Text><PlaygroundCodeBlock>{`--brick-skip-link-background: #2e1065;\n--brick-skip-link-foreground: #ffffff;\n--brick-skip-link-border-color: #c4b5fd;\n--brick-skip-link-radius: 999px;`}</PlaygroundCodeBlock></VStack><SkipLink.Root href="#custom-target" style={customStyle}>Skip customized navigation</SkipLink.Root><Button onClick={() => document.querySelector<HTMLAnchorElement>('[href="#custom-target"]')?.focus()} size="sm">Focus customized link</Button><Target id="custom-target" /></EvidenceSurface></EvidenceGroup></VStack>
    </Scenario>

    <Scenario {...skipLinkScenarios[7]}>
      <Grid.Root columns={2} className="skip-link-grid" data-testid="skip-link-stress"><Surface bordered className="skip-link-stress-panel" inset="md"><Badge size="sm">Narrow LTR</Badge><div className="skip-link-phone"><SkipLink.Root href="#localized-target">Skip the full international workspace navigation and continue directly to the primary release review content</SkipLink.Root><Button onClick={() => document.querySelector<HTMLAnchorElement>('[href="#localized-target"]')?.focus()} size="sm" variant="outline">Reveal long label</Button><Target id="localized-target" /></div></Surface><Surface bordered className="skip-link-stress-panel" dir="rtl" inset="md"><Badge size="sm">RTL</Badge><div className="skip-link-phone"><SkipLink.Root href="#rtl-target">تخطى أدوات التنقل وانتقل إلى المحتوى الرئيسي</SkipLink.Root><Button onClick={() => document.querySelector<HTMLAnchorElement>('[href="#rtl-target"]')?.focus()} size="sm" variant="outline">إظهار رابط التخطي</Button><Target id="rtl-target">المحتوى الرئيسي لمساحة العمل</Target></div></Surface></Grid.Root>
    </Scenario>
  </VStack>;
}

export function SkipLinkFixturePage() {
  return <div className="skip-link-fixture" data-testid="skip-link-fixture"><SkipLink.Root href="#fixture-main">Skip fixture navigation</SkipLink.Root><header><nav aria-label="Fixture navigation"><a href="#one">One</a><a href="#two">Two</a><a href="#three">Three</a></nav></header><div className="skip-link-fixture__spacer" aria-hidden="true" /><SkipLink.Target id="fixture-main"><h1>Fixture main content</h1><a href="#fixture-next">First main-content link</a><p id="fixture-next">Focus continues in primary content.</p></SkipLink.Target></div>;
}
