import { Carousel, Grid, Surface, Text, VStack } from "@flowstack-ui/brick";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import "./carousel.playground.css";

export const carouselScenarios = [
  { id: "carousel.overview", number: 1, title: "Overview", description: "A finished one-slide sequence combines native touch scrolling with optional arrows and picker dots." },
  { id: "carousel.controls", number: 2, title: "Optional controls", description: "Manual, picker-only, and full-control compositions preserve the same slide behavior." },
  { id: "carousel.rotation", number: 3, title: "User-controlled rotation", description: "Automatic rotation always includes a visible stop or start control and direct navigation." },
  { id: "carousel.appearance", number: 4, title: "Placement, size, and appearance", navigationTitle: "Appearance", description: "Overlay and outside placements use the same semantic styling across sizes and appearances." },
] as const satisfies readonly ScenarioDefinition[];

const slides = [
  { value: "build", label: "Build with confidence", title: "One system. Clear decisions.", copy: "Accessible behavior and finished styling stay coordinated while product content remains yours." },
  { value: "launch", label: "Launch faster", title: "From idea to launch.", copy: "Compose tested parts instead of rebuilding interaction contracts for every project." },
  { value: "grow", label: "Grow without rewrites", title: "A foundation that scales.", copy: "Tokens and stable component anatomy support new brands without fragmenting behavior." },
];

function Slides() {
  return <Carousel.Viewport><Carousel.Track>{slides.map(slide => <Carousel.Slide key={slide.value} label={slide.label} value={slide.value}><Surface className="carousel-demo-slide" inset="lg" level="subtle" radius="surface"><VStack className="carousel-demo-slide-content" gap="3"><Text as="h3" variant="title-lg">{slide.title}</Text><Text as="p" tone="secondary">{slide.copy}</Text></VStack></Surface></Carousel.Slide>)}</Carousel.Track></Carousel.Viewport>;
}

function Picker({ variant = "surface" }: Pick<React.ComponentProps<typeof Carousel.Picker>, "variant">) {
  return <Carousel.Picker variant={variant}>{slides.map(slide => <Carousel.PickerItem key={slide.value} value={slide.value} />)}</Carousel.Picker>;
}

function FullCarousel(props: Omit<React.ComponentProps<typeof Carousel.Root>, "children"> = {}) {
  return <Carousel.Root aria-label="Flowstack story" defaultValue="build" loop {...props}>{props.defaultAutoPlay ? <Carousel.Controls><Carousel.RotationControl size="xs" variant="ghost" /><Picker variant="bare" /></Carousel.Controls> : null}<Slides /><Carousel.Navigation visibility="interaction"><Carousel.Previous /><Carousel.Next /></Carousel.Navigation>{props.defaultAutoPlay ? null : <Carousel.Controls><Picker /></Carousel.Controls>}</Carousel.Root>;
}

export function CarouselPage() {
  return <VStack data-component-page="carousel" gap="6">
    <Scenario {...carouselScenarios[0]}><div className="carousel-demo-fill-frame"><FullCarousel fill /></div></Scenario>
    <Scenario {...carouselScenarios[1]}><Grid.Root className="carousel-demo-grid" columns={2} gap="4"><VStack gap="2"><Text as="h3" variant="title-sm">No controls</Text><Carousel.Root aria-label="Manual story" defaultValue="build"><Slides /></Carousel.Root></VStack><VStack gap="2"><Text as="h3" variant="title-sm">Picker only</Text><Carousel.Root aria-label="Picker story" defaultValue="build" controlPlacement="outside"><Slides /><Carousel.Controls><Picker /></Carousel.Controls></Carousel.Root></VStack></Grid.Root></Scenario>
    <Scenario {...carouselScenarios[2]}><FullCarousel defaultAutoPlay interval={4000} /></Scenario>
    <Scenario {...carouselScenarios[3]}><Grid.Root className="carousel-demo-grid" columns={2} gap="4"><FullCarousel controlShape="rounded" controlVariant="outline" size="sm" /><Surface className="carousel-demo-dark" data-brick-appearance="dark" inset="md" level="canvas"><FullCarousel controlPlacement="outside" controlVariant="ghost" size="lg" /></Surface></Grid.Root></Scenario>
  </VStack>;
}
