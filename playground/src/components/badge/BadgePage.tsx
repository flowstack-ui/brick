import { type CSSProperties, type ReactNode } from "react";
import {
  Badge,
  Button,
  type BadgeShape,
  type BadgeSize,
  type BadgeTone,
  type BadgeVariant,
} from "@flowstack-ui/brick";
import {
  Scenario,
  type ScenarioDefinition,
} from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import "./badge.playground.css";

const variants: BadgeVariant[] = ["soft", "solid", "outline"];
const tones: BadgeTone[] = [
  "neutral",
  "accent",
  "info",
  "success",
  "warning",
  "danger",
];
const sizes: BadgeSize[] = ["sm", "md", "lg"];
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
    <section className="badge-evidence-group">
      <div className="badge-evidence-group__heading">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      {children}
    </section>
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
    <div className="badge-specimen-cell">
      <SpecimenLabel>{label}</SpecimenLabel>
      <div className="badge-specimen-cell__preview">{children}</div>
    </div>
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
      "Size changes only text scale, minimum block size, and padding. Every specimen retains the default soft neutral rounded recipe and identical content.",
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
      "Long localized and unbroken labels wrap inside a constrained container, while genuine RTL content remains in normal reading order without clipping or page overflow.",
    id: "badge.stress",
    navigationTitle: "Stress",
    number: 8,
    title: "Responsive and RTL",
  },
] as const satisfies readonly ScenarioDefinition[];

export function BadgePage() {
  return (
    <div
      className="badge-page"
      data-component-page="badge"
      data-testid="badge-workbench"
    >
      <Scenario {...badgeScenarios[0]}>
        <div className="badge-overview" data-testid="badge-overview">
          <Badge>Published</Badge>
        </div>
      </Scenario>

      <Scenario {...badgeScenarios[1]}>
        <div
          className="badge-specimen-grid badge-specimen-grid--three"
          data-testid="badge-variants"
        >
          {variants.map((variant) => (
            <SpecimenCell key={variant} label={variant}>
              <Badge variant={variant}>Status</Badge>
            </SpecimenCell>
          ))}
        </div>
      </Scenario>

      <Scenario {...badgeScenarios[2]}>
        <div className="badge-evidence-stack" data-testid="badge-tones">
          {variants.map((variant) => (
            <EvidenceGroup
              description={`All semantic tones using the ${variant} treatment.`}
              key={variant}
              title={`${variant[0].toUpperCase()}${variant.slice(1)} tones`}
            >
              <div className="badge-specimen-grid badge-specimen-grid--six">
                {tones.map((tone) => (
                  <SpecimenCell key={tone} label={tone}>
                    <Badge tone={tone} variant={variant}>
                      Status
                    </Badge>
                  </SpecimenCell>
                ))}
              </div>
            </EvidenceGroup>
          ))}
        </div>
      </Scenario>

      <Scenario {...badgeScenarios[3]}>
        <div
          className="badge-specimen-grid badge-specimen-grid--three"
          data-testid="badge-sizes"
        >
          {sizes.map((size) => (
            <SpecimenCell key={size} label={size}>
              <Badge size={size}>Status</Badge>
            </SpecimenCell>
          ))}
        </div>
      </Scenario>

      <Scenario {...badgeScenarios[4]}>
        <div
          className="badge-specimen-grid badge-specimen-grid--two"
          data-testid="badge-shapes"
        >
          {shapes.map((shape) => (
            <SpecimenCell key={shape} label={shape}>
              <Badge shape={shape}>Status</Badge>
            </SpecimenCell>
          ))}
        </div>
      </Scenario>

      <Scenario {...badgeScenarios[5]}>
        <div className="badge-evidence-stack" data-testid="badge-composition">
          <EvidenceGroup
            description="Visible text supplies meaning in headings, prose, and metadata; tone only reinforces that authored copy."
            title="Semantic contexts"
          >
            <div className="badge-specimen-grid badge-specimen-grid--three">
              <SpecimenCell label="heading">
                <h3 className="badge-inline-context">
                  Deployments <Badge>Healthy</Badge>
                </h3>
              </SpecimenCell>
              <SpecimenCell label="prose">
                <p className="badge-inline-context">
                  Pending reviews <Badge>4</Badge>
                </p>
              </SpecimenCell>
              <SpecimenCell label="metadata">
                <p className="badge-inline-context">
                  Environment <Badge>Staging</Badge>
                </p>
              </SpecimenCell>
            </div>
          </EvidenceGroup>
          <EvidenceGroup
            description="Composition changes the authored root mechanism only; all examples retain Badge’s visual defaults."
            title="Native composition"
          >
            <div className="playground-output-stack">
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
            </div>
          </EvidenceGroup>
          <EvidenceGroup
            description="A passive label and an interactive command are different components even when both use compact geometry."
            title="Component routing"
          >
            <div className="badge-specimen-grid badge-specimen-grid--two">
              <SpecimenCell label="Badge · passive">
                <Badge>TypeScript</Badge>
              </SpecimenCell>
              <SpecimenCell label="Button · command">
                <Button>Clear filters</Button>
              </SpecimenCell>
            </div>
          </EvidenceGroup>
        </div>
      </Scenario>

      <Scenario {...badgeScenarios[6]}>
        <div className="badge-evidence-stack">
          <EvidenceGroup
            description="Adjacent light and dark scopes preserve Badge’s default recipe."
            title="Scoped appearances"
          >
            <div
              className="badge-scoped-appearance-grid"
              data-testid="badge-appearance"
            >
              <div data-brick-appearance="light">
                <code>light</code>
                <Badge>Status</Badge>
              </div>
              <div data-brick-appearance="dark">
                <code>dark</code>
                <Badge>Status</Badge>
              </div>
            </div>
          </EvidenceGroup>
          <EvidenceGroup
            description="The code names the supported mechanism and exactly matches the rendered result."
            title="Consumer customization"
          >
            <article className="badge-customization">
              <div>
                <h4>Component CSS properties</h4>
                <p>
                  Public Badge tokens replace the complete color recipe and
                  radius for this instance only.
                </p>
                <pre
                  aria-label="Badge component token example"
                  tabIndex={0}
                >
                  <code>{`<Badge
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
</Badge>`}</code>
                </pre>
              </div>
              <div className="badge-customization__preview">
                <Badge
                  data-slot="custom-status"
                  style={tokenCustomization}
                >
                  Status
                </Badge>
              </div>
            </article>
          </EvidenceGroup>
        </div>
      </Scenario>

      <Scenario {...badgeScenarios[7]}>
        <div className="badge-evidence-stack" data-testid="badge-stress">
          <EvidenceGroup
            description="Both localized and unbroken content wrap inside a 20rem application-owned frame."
            title="Constrained-width stress"
          >
            <div className="badge-stress-panel">
              <div className="badge-phone-frame">
                <Badge>Awaiting detailed workspace verification</Badge>
                <Badge>
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ
                </Badge>
              </div>
            </div>
          </EvidenceGroup>
          <EvidenceGroup
            description="Badge has no direction prop; it inherits genuine right-to-left reading order from its context."
            title="RTL inheritance"
          >
            <div className="badge-stress-panel">
              <div className="badge-phone-frame" dir="rtl">
                <p>
                  حالة الإصدار <Badge>قيد المراجعة</Badge>
                </p>
              </div>
            </div>
          </EvidenceGroup>
        </div>
      </Scenario>
    </div>
  );
}
