import { useState, type CSSProperties } from "react";
import { Appearance, Badge, Button, Card, For, Frame, Grid, HStack, Link, Marquee, Surface, Text, VStack, useMarquee, type MarqueeOptions } from "@flowstack-ui/brick";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";
import "./marquee-art.css";

export const marqueeScenarios = [
  { id: "marquee.basic", number: 1, title: "Continuous partner strip", description: "One original track, explicitly authored passive replicas and a persistent pause control." },
  { id: "marquee.directions", number: 2, title: "Logical directions", description: "Start, end, reverse and RTL resolve to one physical movement direction." },
  { id: "marquee.vertical", number: 3, title: "Vertical lanes", description: "Frame owns the bounded height; Marquee owns continuous movement." },
  { id: "marquee.timing", number: 4, title: "Speed, spacing and delay", description: "Pixels per second determine duration. Numeric spacing follows Brick’s shared factor." },
  { id: "marquee.fill", number: 5, title: "Short and long content", description: "Short strips repeat enough to cover the viewport; autoFill remains bounded." },
  { id: "marquee.pause", number: 6, title: "Independent pause reasons", description: "Hover cannot undo a requested pause; keyboard focus exposes stationary originals." },
  { id: "marquee.store", number: 7, title: "Store and Context", description: "External controls and context readouts share the same controller." },
  { id: "marquee.finite", number: 8, title: "Finite loops", description: "Two iterations, completion and explicit restart. Restart preserves user pause." },
  { id: "marquee.edges", number: 9, title: "Optional surface-aware fades", description: "Decorative edges use the owning surface’s semantic paint, never intercept input." },
  { id: "marquee.lanes", number: 10, title: "Independent lanes", description: "Separate directions and controls without shared animation state." },
  { id: "marquee.art", number: 11, title: "Diagonal and perspective", description: "Scoped illustration transforms compose around the same public motion primitive." },
  { id: "marquee.news", number: 12, title: "Accessible news links", description: "Only originals are links. Focus pauses and reveals the original track for reading." },
  { id: "marquee.cards", number: 13, title: "Testimonials and delayed content", description: "Load the customer images after initial measurement. Passive replicas update with the original cards without per-frame React updates." },
  { id: "marquee.preferences", number: 14, title: "Motion preferences and appearance", description: "Reduced motion exposes scrollable originals and hides decorative fades and replicas." },
  { id: "marquee.boundaries", number: 15, title: "Hidden, resized and empty", description: "Hidden or empty content stays stationary until it can be measured safely." },
  { id: "marquee.safety", number: 16, title: "Replica safety", description: "Missing or interactive replicas use a safe static fallback; original IDs stay unique." },
] as const satisfies readonly ScenarioDefinition[];

const partners = ["Northstar", "Acme", "Layers", "Orbit", "Catalog", "Sisyphus"];
function Items({ words = partners, links = false, images = false }: { words?: readonly string[]; links?: boolean; images?: boolean }) {
  return <For each={words}>{word => <Marquee.Item key={word}><Surface level="subtle" radius="surface" inset="md">
    {images && <img src="/assets/image/workspace-landscape.png" width={256} height={144} alt="" />}
    {links ? <Link href="#scenario-marquee-news">{word}</Link> : <Text variant="title-xs" weight="medium">{word}</Text>}
  </Surface></Marquee.Item>}</For>;
}
function Lane({ label, words, edges = false, edgeColor, links = false, images = false, unsafe = false, missing = false, ...options }: MarqueeOptions & { label: string; words?: readonly string[]; edges?: boolean; edgeColor?: string; links?: boolean; images?: boolean; unsafe?: boolean; missing?: boolean }) {
  const value = useMarquee({ autoFill: true, ...options, translations: { regionLabel: label } });
  const vertical = value.orientation === "vertical";
  return <VStack gap="3">
    <HStack justify="between"><Text variant="body-sm" weight="medium">{label}</Text><Button size="xs" variant="outline" tone="neutral" aria-pressed={value.requestedPaused} onClick={value.togglePause}>{value.requestedPaused ? "Resume" : "Pause"} {label}</Button></HStack>
    <Frame blockSize={vertical ? "12rem" : undefined}>
      <Marquee.RootProvider value={value} data-example={label} style={edgeColor ? { "--brick-marquee-edge-color": edgeColor } as CSSProperties : undefined}>
        <Marquee.Viewport><Marquee.Content renderReplica={missing ? undefined : () => <Items words={words} links={unsafe} images={images} />}><Items words={words} links={links} images={images} /></Marquee.Content></Marquee.Viewport>
        {edges && <><Marquee.Edge side={vertical ? "top" : "start"} /><Marquee.Edge side={vertical ? "bottom" : "end"} /></>}
      </Marquee.RootProvider>
    </Frame>
  </VStack>;
}
function PauseExample() {
  const [paused, setPaused] = useState(false);
  return <VStack gap="4"><Lane label="Controlled hover" paused={paused} onPauseChange={setPaused} pauseOnInteraction /><Lane label="Initially paused" defaultPaused pauseOnInteraction /></VStack>;
}
function StoreExample() {
  const value = useMarquee({ speed: 250, loopCount: 2, autoFill: true });
  return <VStack gap="3"><HStack gap="2"><Button size="sm" onClick={value.togglePause}>{value.requestedPaused ? "Resume" : "Pause"} store</Button><Button size="sm" variant="outline" onClick={value.restart}>Restart store</Button></HStack>
    <Marquee.RootProvider value={value} aria-label="Store example"><Marquee.Viewport><Marquee.Content renderReplica={() => <Items />}><Items /></Marquee.Content></Marquee.Viewport><Marquee.Context>{state => <Text variant="body-sm">Iteration {state.iteration}; {state.completed ? "completed" : state.paused ? "paused" : "playing"}</Text>}</Marquee.Context></Marquee.RootProvider>
  </VStack>;
}
function FiniteExample() {
  const [events, setEvents] = useState<string[]>([]);
  const value = useMarquee({ speed: 450, loopCount: 2, autoFill: true, onLoopComplete: ({ iteration }) => setEvents(previous => [...previous, `Loop ${iteration}`]), onComplete: () => setEvents(previous => [...previous, "Complete"]) });
  return <VStack gap="3"><HStack gap="2"><Button size="sm" variant="outline" onClick={() => { setEvents([]); value.restart(); }}>Restart finite</Button><Button size="sm" variant="outline" onClick={value.togglePause}>{value.requestedPaused ? "Resume" : "Pause"} finite</Button></HStack>
    <Marquee.RootProvider value={value} aria-label="Finite example"><Marquee.Viewport><Marquee.Content renderReplica={() => <Items words={["One", "Two"]} />}><Items words={["One", "Two"]} /></Marquee.Content></Marquee.Viewport></Marquee.RootProvider>
    <Text variant="body-sm" data-testid="finite-events">{events.join(" · ") || "Waiting for the first loop"}</Text>
  </VStack>;
}
function Boundaries() {
  const [visible, setVisible] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const [extra, setExtra] = useState(false);
  return <VStack gap="4"><HStack gap="2"><Button size="sm" onClick={() => setVisible(!visible)}>Toggle hidden lane</Button><Button size="sm" onClick={() => setNarrow(!narrow)}>Resize lane</Button><Button size="sm" onClick={() => setExtra(!extra)}>Replace content</Button></HStack>
    <Frame hidden={!visible} maxInlineSize={narrow ? "18rem" : "100%"}><Lane label="Hidden lane" words={extra ? ["A much longer replacement partner name", ...partners] : partners} /></Frame>
    <Lane label="Empty lane" words={[]} /><Lane label="Single item" words={["One partner"]} autoFill />
  </VStack>;
}
function CardsExample() {
  const [loaded, setLoaded] = useState(false);
  const value = useMarquee({ pauseOnInteraction: true, autoFill: true });
  const cards = () => <For each={["Thoughtful defaults.", "A consistent foundation.", "Made for real products."]}>{quote => <Marquee.Item key={quote}><Frame inlineSize="16rem"><Card.Root><Card.Content><VStack gap="3">{loaded && <img src="/assets/image/workspace-landscape.png" width={208} height={117} alt="" />}<Badge tone="accent">Customer story</Badge><Text>{quote}</Text><Text variant="body-sm" tone="secondary">{loaded ? "A longer customer name loaded after the first measurement" : "Customer"}</Text></VStack></Card.Content></Card.Root></Frame></Marquee.Item>}</For>;
  return <VStack gap="3"><HStack gap="2"><Button size="sm" variant="outline" onClick={value.togglePause}>{value.requestedPaused ? "Resume" : "Pause"} testimonials</Button><Button size="sm" variant="outline" onClick={() => setLoaded(!loaded)}>Load customer details</Button></HStack><Marquee.RootProvider value={value} aria-label="Customer stories"><Marquee.Viewport><Marquee.Content renderReplica={cards}>{cards()}</Marquee.Content></Marquee.Viewport></Marquee.RootProvider></VStack>;
}
export function MarqueePage() {
  return <VStack gap="8" data-component-page="marquee">
    <Scenario {...marqueeScenarios[0]}><Specimen label="Default"><Lane label="Partners" edges /></Specimen></Scenario>
    <Scenario {...marqueeScenarios[1]}><VStack gap="4"><Lane label="Start" /><Lane label="End" side="end" /><Lane label="Reverse" reverse /><Lane label="RTL start" dir="rtl" /></VStack></Scenario>
    <Scenario {...marqueeScenarios[2]}><Grid.Root columns={{ initial: 1, md: 2 }} gap="4"><Lane label="Up" side="top" edges /><Lane label="Down" side="bottom" edges /></Grid.Root></Scenario>
    <Scenario {...marqueeScenarios[3]}><VStack gap="4"><Lane label="Slow" speed={20} spacing={2} /><Lane label="Fast delayed" speed={100} spacing={8} delay={1} /></VStack></Scenario>
    <Scenario {...marqueeScenarios[4]}><VStack gap="4"><Lane label="Short autofill" words={["One", "Two"]} autoFill /><Lane label="Long strip" words={[...partners, "Umbrella", "Cloud", "Vista"]} /></VStack></Scenario>
    <Scenario {...marqueeScenarios[5]}><PauseExample /></Scenario>
    <Scenario {...marqueeScenarios[6]}><StoreExample /></Scenario>
    <Scenario {...marqueeScenarios[7]}><FiniteExample /></Scenario>
    <Scenario {...marqueeScenarios[8]}><VStack gap="4"><Surface level="base" inset="md"><Lane label="Base fades" edges /></Surface><Surface level="subtle" inset="md"><Lane label="Subtle fades" edges edgeColor="var(--brick-color-surface-subtle)" /></Surface></VStack></Scenario>
    <Scenario {...marqueeScenarios[9]}><VStack gap="4"><Lane label="Lane one" speed={35} /><Lane label="Lane two" side="end" speed={65} /></VStack></Scenario>
    <Scenario {...marqueeScenarios[10]}><VStack gap="6"><Frame className="marquee-art-diagonal"><Lane label="Diagonal artwork" images /></Frame><Frame className="marquee-art-perspective"><Lane label="Perspective artwork" side="end" images /></Frame><Text variant="body-sm" tone="secondary">The transforms are example artwork, not component recipes. Passive native images keep visual replicas free of extra stateful wrappers.</Text></VStack></Scenario>
    <Scenario {...marqueeScenarios[11]}><Lane label="News" links words={["Product update", "Community stories", "Release notes", "Upcoming events"]} /></Scenario>
    <Scenario {...marqueeScenarios[12]}><CardsExample /></Scenario>
    <Scenario {...marqueeScenarios[13]}><VStack gap="4"><For each={["light", "dark"] as const}>{appearance => <Appearance key={appearance} value={appearance}><Surface level="base" inset="md"><Lane label={`${appearance} appearance`} edges /></Surface></Appearance>}</For><Text variant="body-sm" tone="secondary">Enable your system’s reduced-motion preference: all originals remain available by scrolling.</Text></VStack></Scenario>
    <Scenario {...marqueeScenarios[14]}><Boundaries /></Scenario>
    <Scenario {...marqueeScenarios[15]}><VStack gap="4"><Lane label="Missing replicas" missing /><Lane label="Rejected link replicas" unsafe /><Text variant="body-sm" tone="secondary">Replica factories must be pure and passive. DOM validation cannot detect arbitrary React side effects.</Text></VStack></Scenario>
  </VStack>;
}
