import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { type CSSProperties, type ReactNode } from "react";
import {
  Grid,
  HStack,
  VStack,
  Badge,
  Icon,
  Text,
  Button,
  type BadgeShape,
  type BadgeSize,
  type BadgeTone,
  type BadgeVariant,
} from "@flowstack-ui/brick";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import "./badge.playground.css";

const variants: BadgeVariant[] = ["soft", "solid", "outline", "surface"];
const tones: BadgeTone[] = [
  "neutral",
  "accent",
  "info",
  "success",
  "warning",
  "danger",
];
const sizes: BadgeSize[] = ["xs", "sm", "md", "lg"];
const shapes: BadgeShape[] = ["rounded", "pill"];

const tokenCustomization = {
  "--brick-badge-background": "var(--brick-color-accent-solid)",
  "--brick-badge-border-color": "var(--brick-color-accent-solid)",
  "--brick-badge-foreground": "var(--brick-color-accent-on-solid)",
  "--brick-badge-radius": "0.2rem",
} as CSSProperties;

function EvidenceGroup({
  children,
  description,
  title,
}: {
  children: ReactNode;
  description: string;
  title: string;
}) {
  return (
    <VStack as="section" className="badge-evidence-group">
      <VStack className="badge-evidence-group__heading">
        <Text as="h3" variant="title-sm">
          {title}
        </Text>
        <Text as="p" tone="secondary" variant="body-sm">
          {description}
        </Text>
      </VStack>
      {children}
    </VStack>
  );
}

function SpecimenCell({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <EvidenceSurface className="badge-specimen-cell">
      <SpecimenLabel>{label}</SpecimenLabel>
      <div className="badge-specimen-cell__preview">{children}</div>
    </EvidenceSurface>
  );
}

export const badgeScenarios = [
  {
    description:
      "Badge’s canonical rendering is a passive soft neutral label at the medium size with a rounded shape. It remains ordinary inline content without a role, tab stop, or generated announcement.",
    id: "badge.overview",
    number: 1,
    title: "Overview",
  },
  {
    description:
      "Variant changes only paint treatment. Every specimen keeps the default neutral tone, medium size, rounded shape, and identical visible content.",
    id: "badge.variants",
    number: 2,
    title: "Variants",
  },
  {
    description:
      "This intentional variant-by-tone matrix shows every semantic tone across every paint treatment. Content, size, and shape stay identical so color and contrast are directly comparable.",
    id: "badge.tones",
    number: 3,
    title: "Tones",
  },
  {
    description:
      "Size changes container density from a 16px micro label through the 28px large label. Large retains 14px text while increasing minimum block size and padding.",
    id: "badge.sizes",
    number: 4,
    title: "Sizes",
  },
  {
    description:
      "Shape changes only corner geometry. Rounded is the default; pill remains a passive label and does not imply filtering, removal, selection, or action.",
    id: "badge.shapes",
    number: 5,
    title: "Shapes",
  },
  {
    description:
      "Badge composes through visible children, native span props, render, and asChild while remaining passive. Interactive commands continue to belong to Button.",
    id: "badge.composition",
    navigationTitle: "Composition",
    number: 6,
    title: "Content and composition",
  },
  {
    description:
      "Local appearance scopes and public component hooks customize presentation without adding behavior or changing Badge’s semantic role.",
    id: "badge.appearance",
    navigationTitle: "Theme",
    number: 7,
    title: "Appearance and customization",
  },
  {
    description:
      "Valid short labels stay atomic inside a constrained container, while the surrounding layout may wrap whole Badges and genuine RTL content remains in normal reading order.",
    id: "badge.stress",
    navigationTitle: "Stress",
    number: 8,
    title: "Responsive and RTL",
  },
] as const satisfies readonly ScenarioDefinition[];

export function BadgePage() {
  return (
    <VStack
      className="badge-page"
      data-component-page="badge"
      data-testid="badge-workbench"
    >
      <Scenario {...badgeScenarios[0]}>
        <EvidenceSurface
          className="badge-overview"
          data-testid="badge-overview"
          inset="lg"
        >
          <Badge>Published</Badge>
        </EvidenceSurface>
      </Scenario>

      <Scenario {...badgeScenarios[1]}>
        <Grid.Root
          columns={4}
          className="badge-specimen-grid badge-specimen-grid--four"
          data-testid="badge-variants"
        >
          {variants.map((variant) => (
            <SpecimenCell key={variant} label={variant}>
              <Badge variant={variant}>Status</Badge>
            </SpecimenCell>
          ))}
        </Grid.Root>
      </Scenario>

      <Scenario {...badgeScenarios[2]}>
        <VStack className="badge-evidence-stack" data-testid="badge-tones">
          {variants.map((variant) => (
            <EvidenceGroup
              description={`All semantic tones using the ${variant} treatment.`}
              key={variant}
              title={`${variant[0].toUpperCase()}${variant.slice(1)} tones`}
            >
              <Grid.Root
                columns={6}
                className="badge-specimen-grid badge-specimen-grid--six"
              >
                {tones.map((tone) => (
                  <SpecimenCell key={tone} label={tone}>
                    <Badge tone={tone} variant={variant}>
                      Status
                    </Badge>
                  </SpecimenCell>
                ))}
              </Grid.Root>
            </EvidenceGroup>
          ))}
        </VStack>
      </Scenario>

      <Scenario {...badgeScenarios[3]}>
        <Grid.Root
          columns={4}
          className="badge-specimen-grid badge-specimen-grid--four"
          data-testid="badge-sizes"
        >
          {sizes.map((size) => (
            <SpecimenCell key={size} label={size}>
              <Badge size={size}>Status</Badge>
            </SpecimenCell>
          ))}
        </Grid.Root>
      </Scenario>

      <Scenario {...badgeScenarios[4]}>
        <Grid.Root
          columns={2}
          className="badge-specimen-grid badge-specimen-grid--two"
          data-testid="badge-shapes"
        >
          {shapes.map((shape) => (
            <SpecimenCell key={shape} label={shape}>
              <Badge shape={shape}>Status</Badge>
            </SpecimenCell>
          ))}
        </Grid.Root>
      </Scenario>

      <Scenario {...badgeScenarios[5]}>
        <VStack
          className="badge-evidence-stack"
          data-testid="badge-composition"
        >
          <EvidenceGroup
            description="Visible text supplies meaning in headings, prose, and metadata; tone only reinforces that authored copy."
            title="Semantic contexts"
          >
            <Grid.Root
              columns={3}
              className="badge-specimen-grid badge-specimen-grid--three"
            >
              <SpecimenCell label="heading">
                <Text
                  as="h3"
                  className="badge-inline-context"
                  variant="title-sm"
                >
                  Deployments <Badge>Healthy</Badge>
                </Text>
              </SpecimenCell>
              <SpecimenCell label="prose">
                <Text as="p" className="badge-inline-context">
                  Pending reviews <Badge>4</Badge>
                </Text>
              </SpecimenCell>
              <SpecimenCell label="metadata">
                <Text as="p" className="badge-inline-context">
                  Environment <Badge>Staging</Badge>
                </Text>
              </SpecimenCell>
              <SpecimenCell label="icon and label">
                <Badge
                  data-testid="badge-icon-label"
                  shape="pill"
                  tone="accent"
                >
                  <Icon size="xs">
                    <svg viewBox="0 0 24 24">
                      <path
                        d="M5 12h14m-5-5 5 5-5 5"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                  </Icon>
                  Built for business
                </Badge>
              </SpecimenCell>
            </Grid.Root>
          </EvidenceGroup>
          <EvidenceGroup
            description="Composition changes the authored root mechanism only; all examples retain Badge’s visual defaults."
            title="Native composition"
          >
            <Grid.Root className="playground-output-stack">
              <RenderedOutput label="Native Badge HTML">
                <Badge title="Release status">Status</Badge>
              </RenderedOutput>
              <RenderedOutput label="Rendered Badge HTML">
                <Badge render={<span data-testid="badge-render" />}>
                  Status
                </Badge>
              </RenderedOutput>
              <RenderedOutput label="Composed Badge HTML">
                <Badge asChild>
                  <span data-testid="badge-as-child">Status</span>
                </Badge>
              </RenderedOutput>
            </Grid.Root>
          </EvidenceGroup>
          <EvidenceGroup
            description="A passive label and an interactive command are different components even when both use compact geometry."
            title="Component routing"
          >
            <Grid.Root
              columns={2}
              className="badge-specimen-grid badge-specimen-grid--two"
            >
              <SpecimenCell label="Badge · passive">
                <Badge>TypeScript</Badge>
              </SpecimenCell>
              <SpecimenCell label="Button · command">
                <Button>Clear filters</Button>
              </SpecimenCell>
            </Grid.Root>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...badgeScenarios[6]}>
        <VStack className="badge-evidence-stack">
          <EvidenceGroup
            description="Adjacent light and dark scopes preserve Badge’s default recipe."
            title="Scoped appearances"
          >
            <Grid.Root
              columns={2}
              className="badge-scoped-appearance-grid"
              data-testid="badge-appearance"
            >
              <EvidenceSurface data-brick-appearance="light">
                <SpecimenLabel>Light</SpecimenLabel>
                <div className="badge-appearance-preview">
                  <Badge>Status</Badge>
                </div>
              </EvidenceSurface>
              <EvidenceSurface data-brick-appearance="dark">
                <SpecimenLabel>Dark</SpecimenLabel>
                <div className="badge-appearance-preview">
                  <Badge>Status</Badge>
                </div>
              </EvidenceSurface>
            </Grid.Root>
          </EvidenceGroup>
          <EvidenceGroup
            description="The code names the supported mechanism and exactly matches the rendered result."
            title="Consumer customization"
          >
            <EvidenceSurface
              as="article"
              className="badge-customization"
              inset="none"
            >
              <div>
                <SpecimenLabel>Customized</SpecimenLabel>
                <Text as="h4" variant="title-sm">
                  Component CSS properties
                </Text>
                <Text as="p" tone="secondary" variant="body-sm">
                  Public Badge tokens replace the complete color recipe and
                  radius for this instance only.
                </Text>
                <PlaygroundCodeBlock
                  aria-label="Badge component token example"
                  tabIndex={0}
                >{`<Badge
  data-slot="custom-status"
  style={{
    "--brick-badge-background":
      "var(--brick-color-accent-solid)",
    "--brick-badge-border-color":
      "var(--brick-color-accent-solid)",
    "--brick-badge-foreground":
      "var(--brick-color-accent-on-solid)",
    "--brick-badge-radius": "0.2rem",
  }}
>
  Status
</Badge>`}</PlaygroundCodeBlock>
              </div>
              <div className="badge-customization__preview">
                <Badge data-slot="custom-status" style={tokenCustomization}>
                  Status
                </Badge>
              </div>
            </EvidenceSurface>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...badgeScenarios[7]}>
        <VStack className="badge-evidence-stack" data-testid="badge-stress">
          <EvidenceGroup
            description="The application-owned frame may move whole Badges to another row, but each compact label stays on one line."
            title="Constrained-width stress"
          >
            <EvidenceSurface className="badge-stress-panel">
              <HStack className="badge-phone-frame" wrap>
                <Badge>Awaiting review</Badge>
                <Badge>Requires follow-up</Badge>
              </HStack>
            </EvidenceSurface>
          </EvidenceGroup>
          <EvidenceGroup
            description="Badge has no direction prop; it inherits genuine right-to-left reading order from its context."
            title="RTL inheritance"
          >
            <EvidenceSurface className="badge-stress-panel">
              <HStack className="badge-phone-frame" dir="rtl" wrap>
                <Text as="p">
                  حالة الإصدار <Badge>قيد المراجعة</Badge>
                </Text>
              </HStack>
            </EvidenceSurface>
          </EvidenceGroup>
        </VStack>
      </Scenario>
    </VStack>
  );
}
