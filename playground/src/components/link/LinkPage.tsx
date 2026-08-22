import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { type CSSProperties, type ReactNode } from "react";
import {
  Container,
  Grid,
  Link,
  Surface,
  Text,
  VStack,
  type LinkSize,
  type LinkTone,
  type LinkVariant,
} from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./link.playground.css";

const variants: LinkVariant[] = ["theme", "underline", "plain"];
const tones: LinkTone[] = ["accent", "neutral", "inherit"];
const sizes: LinkSize[] = ["inherit", "sm", "md", "lg"];

function ArrowIcon({ direction = "end" }: { direction?: "start" | "end" }) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 16 16">
      <path
        d={direction === "start" ? "M10.5 3 5.5 8l5 5" : "m5.5 3 5 5-5 5"}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function Cell({ children, label }: { children: ReactNode; label: string }) {
  return (
    <EvidenceSurface className="link-cell">
      <SpecimenLabel>{label}</SpecimenLabel>
      <VStack className="link-cell__preview" gap="3">{children}</VStack>
    </EvidenceSurface>
  );
}

export const linkScenarios = [
  { id: "link.overview", number: 1, title: "Overview", description: "Link’s canonical rendering follows the theme decoration policy, whose Brick fallback is an underlined accent destination that preserves native anchor behavior." },
  { id: "link.variants", number: 2, title: "Variants", description: "Theme, underline, and plain change only resting decoration. Explicit variants override the inherited theme choice." },
  { id: "link.tones", number: 3, title: "Tones", description: "Accent, neutral, and inherited foregrounds keep the same default decoration, content, size, and destination behavior." },
  { id: "link.sizes", number: 4, title: "Sizes", description: "Inherited typography follows surrounding copy; explicit small, medium, and large values use Brick body recipes." },
  { id: "link.content", number: 5, title: "Content", description: "Default text, decorative logical icons, and long destination names remain aligned, named, wrapped, and contained." },
  { id: "link.composition", number: 6, title: "Native and composition", navigationTitle: "Composition", description: "Native attributes, current state, asChild, and render preserve one final anchor. Live rendered HTML makes the destination contract inspectable." },
  { id: "link.appearance", number: 7, title: "Appearance and customization", navigationTitle: "Theme", description: "Semantic tokens adapt across appearance scopes; documented variables permit visible, focused overrides without changing semantics." },
  { id: "link.stress", number: 8, title: "Responsive and RTL", navigationTitle: "Stress", description: "Narrow long content and separate RTL icon examples preserve containment, logical order, and readable decoration." },
] as const satisfies readonly ScenarioDefinition[];

export function LinkPage() {
  const customStyle = {
    "--brick-link-foreground": "var(--brick-color-success-text)",
    "--brick-link-decoration-thickness": "0.16em",
    "--brick-link-decoration-offset": "0.28em",
  } as CSSProperties;

  return (
    <VStack className="link-page" data-component-page="link">
      <Scenario {...linkScenarios[0]}>
        <EvidenceSurface data-testid="link-overview" inset="lg">
          <Text as="p">
            Continue with the <Link href="#link-destination">Link component guide</Link> for navigation patterns.
          </Text>
        </EvidenceSurface>
      </Scenario>

      <Scenario {...linkScenarios[1]}>
        <Grid.Root className="link-grid" columns={2} data-testid="link-variants">
          {variants.map((variant) => <Cell key={variant} label={variant}><Link href="#link-destination" variant={variant}>Read navigation guidance</Link></Cell>)}
        </Grid.Root>
      </Scenario>

      <Scenario {...linkScenarios[2]}>
        <Grid.Root className="link-grid" columns={3} data-testid="link-tones">
          {tones.map((tone) => <Cell key={tone} label={tone}><Link href="#link-destination" tone={tone}>Read navigation guidance</Link></Cell>)}
        </Grid.Root>
      </Scenario>

      <Scenario {...linkScenarios[3]}>
        <Grid.Root className="link-grid" columns={2} data-testid="link-sizes">
          {sizes.map((size) => <Cell key={size} label={size}><Text as="p" variant="body-md"><Link href="#link-destination" size={size}>Read navigation guidance</Link></Text></Cell>)}
        </Grid.Root>
      </Scenario>

      <Scenario {...linkScenarios[4]}>
        <Grid.Root className="link-grid" columns={2} data-testid="link-content">
          <Cell label="default"><Link href="#link-destination">Explore component guidance</Link></Cell>
          <Cell label="start icon"><Link href="#link-destination" startIcon={<ArrowIcon direction="start" />}>Explore component guidance</Link></Cell>
          <Cell label="end icon"><Link endIcon={<ArrowIcon />} href="#link-destination">Explore component guidance</Link></Cell>
          <Cell label="long content"><Link endIcon={<ArrowIcon />} href="#link-destination">Explore international navigation guidance for dependable product interfaces</Link></Cell>
        </Grid.Root>
      </Scenario>

      <Scenario {...linkScenarios[5]}>
        <VStack data-testid="link-composition" gap="4">
          <Grid.Root className="link-grid" columns={2}>
            <Cell label="native current"><Link aria-current="page" href="#link-destination">Account overview</Link></Cell>
            <Cell label="native download"><Link download="navigation-guide.pdf" href="data:text/plain,Navigation guide">Download navigation guide</Link></Cell>
          </Grid.Root>
          <Grid.Root className="link-output-grid" columns={2}>
            <RenderedOutput label="asChild router-shaped HTML">
              <Link asChild><a href="#router-account" data-router="as-child">Account settings</a></Link>
            </RenderedOutput>
            <RenderedOutput label="render adapter HTML">
              <Link render={(props) => <a {...props} data-router="render" href="#router-reports" />}>View reports</Link>
            </RenderedOutput>
          </Grid.Root>
        </VStack>
      </Scenario>

      <Scenario {...linkScenarios[6]}>
        <VStack data-testid="link-appearance" gap="4">
          <Grid.Root className="link-grid" columns={2}>
            <EvidenceSurface data-brick-appearance="light"><Link href="#link-destination">Read appearance guidance</Link></EvidenceSurface>
            <EvidenceSurface data-brick-appearance="dark"><Link href="#link-destination">Read appearance guidance</Link></EvidenceSurface>
          </Grid.Root>
          <EvidenceSurface as="article" className="link-customization" inset="lg">
            <VStack gap="2">
              <Text as="h3" variant="title-sm">Link CSS properties</Text>
              <Text tone="secondary" variant="body-sm">Success foreground, thicker decoration, and a larger underline offset use documented variables.</Text>
              <PlaygroundCodeBlock tabIndex={0}>--brick-link-foreground; --brick-link-decoration-thickness; --brick-link-decoration-offset</PlaygroundCodeBlock>
            </VStack>
            <Surface bordered inset="md"><Link href="#link-destination" style={customStyle}>Read customized guidance</Link></Surface>
            <Surface
              bordered
              inset="md"
              style={{ "--brick-link-decoration": "none" } as CSSProperties}
            >
              <VStack gap="2">
                <Link href="#link-destination">Theme-following decoration</Link>
                <Link href="#link-destination" variant="underline">Explicit underline decoration</Link>
              </VStack>
            </Surface>
          </EvidenceSurface>
        </VStack>
      </Scenario>

      <Scenario {...linkScenarios[7]}>
        <Container gutter="sm" measure="narrow">
          <Grid.Root className="link-grid" columns={2} data-testid="link-stress">
            <Cell label="narrow long content"><Link endIcon={<ArrowIcon />} href="#link-destination">Review localized navigation instructions that remain readable on a narrow display</Link></Cell>
            <Cell label="RTL logical icons"><VStack dir="rtl" gap="3"><Link href="#link-destination" startIcon={<ArrowIcon direction="start" />}>العودة إلى دليل التنقل</Link><Link endIcon={<ArrowIcon />} href="#link-destination">متابعة قراءة دليل التنقل</Link></VStack></Cell>
          </Grid.Root>
        </Container>
      </Scenario>

      <span aria-hidden="true" id="link-destination" />
      <span aria-hidden="true" id="router-account" />
      <span aria-hidden="true" id="router-reports" />
    </VStack>
  );
}
