import { useState, type CSSProperties, type ReactNode } from "react";
import {
  HStack,
  VStack,
  IconButton,
  Text,
  type IconButtonShape,
  type IconButtonSize,
  type IconButtonTone,
  type IconButtonVariant,
} from "@flowstack-ui/brick";
import {
  Scenario,
  type ScenarioDefinition,
} from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import {
  ArrowIcon,
  MenuIcon,
  SearchIcon,
} from "../../shared/icons.js";
import "./icon-button.playground.css";

const variants: IconButtonVariant[] = [
  "solid",
  "soft",
  "outline",
  "ghost",
];
const tones: IconButtonTone[] = [
  "neutral",
  "accent",
  "info",
  "success",
  "warning",
  "danger",
];
const sizes: IconButtonSize[] = ["xs", "sm", "md", "lg", "xl"];
const shapes: IconButtonShape[] = ["rounded", "circle"];

const tokenCustomization = {
  "--brick-icon-button-background": "#6b2f88",
  "--brick-icon-button-background-hover": "#7d3b9c",
  "--brick-icon-button-background-pressed": "#58266f",
  "--brick-icon-button-border-color": "#6b2f88",
  "--brick-icon-button-foreground": "#ffffff",
} as CSSProperties;

const imageIconSource = "/assets/icon-button/brick-image.png";

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
    <VStack as="section" className="icon-button-evidence-group">
      <VStack className="icon-button-evidence-group__heading">
        <Text as="h3" variant="title-sm">{title}</Text>
        <Text as="p" tone="secondary" variant="body-sm">{description}</Text>
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
    <div className="icon-button-specimen-cell">
      <SpecimenLabel>{label}</SpecimenLabel>
      <div className="icon-button-specimen-cell__preview">{children}</div>
    </div>
  );
}

export const iconButtonScenarios = [
  {
    description:
      "IconButton’s canonical rendering is a neutral ghost action at the medium size with a rounded shape. Activate it to confirm the default native interaction and status feedback.",
    id: "icon-button.overview",
    number: 1,
    title: "Overview",
  },
  {
    description:
      "The four visual hierarchies preserve the same square geometry and named Atom action contract.",
    id: "icon-button.variants",
    number: 2,
    title: "Variants",
  },
  {
    description:
      "Tone carries semantic meaning while variant controls visual emphasis. Review every supported tone across all four variants.",
    id: "icon-button.tones",
    number: 3,
    title: "Tones",
  },
  {
    description:
      "The five-size scale supports dense interfaces through prominent controls. Compare target size, icon scale, and visual weight.",
    id: "icon-button.sizes",
    number: 4,
    title: "Sizes",
  },
  {
    description:
      "Shape is a closed visual recipe that changes corner geometry without changing IconButton’s size, tone, or accessible action.",
    id: "icon-button.shapes",
    number: 5,
    title: "Shapes",
  },
  {
    description:
      "IconButton supports Atom’s direct href, render, and asChild composition paths while preserving a square named link and native anchor semantics.",
    id: "icon-button.composition",
    navigationTitle: "Links",
    number: 6,
    title: "Links and composition",
  },
  {
    description:
      "One decorative visual icon and one complete accessible name remain stable across ordinary, disabled, loading, and combined inactive states.",
    id: "icon-button.states",
    navigationTitle: "States",
    number: 7,
    title: "Content and states",
  },
  {
    description:
      "Appearance can be scoped locally, and public styling hooks support deliberate consumer customization without changing the API.",
    id: "icon-button.appearance",
    navigationTitle: "Theme",
    number: 8,
    title: "Appearance and customization",
  },
  {
    description:
      "Long accessible names, constrained width, localization, and RTL preserve square geometry and logical placement.",
    id: "icon-button.stress",
    navigationTitle: "Stress",
    number: 9,
    title: "Responsive and RTL",
  },
] as const satisfies readonly ScenarioDefinition[];

export function IconButtonPage() {
  const [pressCount, setPressCount] = useState(0);

  return (
    <VStack
      className="icon-button-page"
      data-component-page="icon-button"
      data-testid="icon-button-workbench"
    >
      <Scenario {...iconButtonScenarios[0]}>
        <div className="icon-button-hero" data-testid="icon-button-overview">
          <IconButton
            aria-label="Search workspace"
            onPress={() => setPressCount((count) => count + 1)}
          >
            <SearchIcon />
          </IconButton>
          <Text aria-atomic="true" aria-live="polite" role="status" variant="body-sm">
            Activated {pressCount} {pressCount === 1 ? "time" : "times"}
          </Text>
        </div>
      </Scenario>

      <Scenario {...iconButtonScenarios[1]}>
        <div className="icon-button-specimen-grid" data-testid="icon-button-variants">
          {variants.map((variant) => (
            <SpecimenCell key={variant} label={variant}>
              <IconButton
                aria-label={`${variant} menu`}
                variant={variant}
              >
                <MenuIcon />
              </IconButton>
            </SpecimenCell>
          ))}
        </div>
      </Scenario>

      <Scenario {...iconButtonScenarios[2]}>
        <VStack className="icon-button-evidence-stack" data-testid="icon-button-tones">
          {variants.map((variant) => (
            <EvidenceGroup
              description={`All semantic tones using the ${variant} treatment.`}
              key={variant}
              title={`${variant[0].toUpperCase()}${variant.slice(1)} tones`}
            >
              <div className="icon-button-specimen-grid icon-button-specimen-grid--six">
                {tones.map((tone) => (
                  <SpecimenCell key={tone} label={tone}>
                    <IconButton
                      aria-label={`${variant} ${tone} action`}
                      tone={tone}
                      variant={variant}
                    >
                      <SearchIcon />
                    </IconButton>
                  </SpecimenCell>
                ))}
              </div>
            </EvidenceGroup>
          ))}
        </VStack>
      </Scenario>

      <Scenario {...iconButtonScenarios[3]}>
        <div
          className="icon-button-row icon-button-specimen-grid icon-button-specimen-grid--five"
          data-testid="icon-button-sizes"
        >
          {sizes.map((size) => (
            <SpecimenCell key={size} label={size}>
              <IconButton
                aria-label={`${size} action`}
                size={size}
              >
                <MenuIcon />
              </IconButton>
            </SpecimenCell>
          ))}
        </div>
      </Scenario>

      <Scenario {...iconButtonScenarios[4]}>
        <div
          className="icon-button-row icon-button-specimen-grid icon-button-specimen-grid--two"
          data-testid="icon-button-shapes"
        >
          {shapes.map((shape) => (
            <SpecimenCell key={shape} label={shape}>
              <IconButton
                aria-label={`${shape} action`}
                shape={shape}
              >
                <SearchIcon />
              </IconButton>
            </SpecimenCell>
          ))}
        </div>
      </Scenario>

      <Scenario {...iconButtonScenarios[5]}>
        <div
          className="playground-output-stack"
          data-testid="icon-button-composition"
        >
          <RenderedOutput label="href Icon Button HTML">
            <IconButton
              aria-label="Documentation"
              data-testid="icon-button-link-href"
              href="#scenario-icon-button-states"
            >
              <ArrowIcon />
            </IconButton>
          </RenderedOutput>
          <RenderedOutput label="render Icon Button HTML">
            <IconButton
              aria-label="Documentation"
              data-testid="icon-button-link-render"
              render={<a href="#scenario-icon-button-states" />}
            >
              <ArrowIcon />
            </IconButton>
          </RenderedOutput>
          <RenderedOutput label="asChild Icon Button HTML">
            <IconButton
              aria-label="Documentation"
              asChild
              data-testid="icon-button-link-as-child"
            >
              <a href="#scenario-icon-button-states">
                <ArrowIcon />
              </a>
            </IconButton>
          </RenderedOutput>
        </div>
      </Scenario>

      <Scenario {...iconButtonScenarios[6]}>
        <div
          className="icon-button-specimen-grid icon-button-specimen-grid--five"
          data-testid="icon-button-states"
        >
          <SpecimenCell label="SVG icon">
            <IconButton aria-label="Search projects">
              <SearchIcon />
            </IconButton>
          </SpecimenCell>
          <SpecimenCell label="image icon">
            <IconButton
              aria-labelledby="icon-button-image-label"
            >
              <img alt="" src={imageIconSource} />
            </IconButton>
            <span className="icon-button-visually-named" id="icon-button-image-label">
              Open Brick resources
            </span>
          </SpecimenCell>
          <SpecimenCell label="disabled">
            <IconButton aria-label="Disabled search" disabled>
              <SearchIcon />
            </IconButton>
          </SpecimenCell>
          <SpecimenCell label="loading">
            <IconButton
              aria-label="Loading search"
              loading
            >
              <SearchIcon />
            </IconButton>
          </SpecimenCell>
          <SpecimenCell label="disabled + loading">
            <IconButton
              aria-label="Unavailable loading search"
              disabled
              loading
            >
              <SearchIcon />
            </IconButton>
          </SpecimenCell>
        </div>
      </Scenario>

      <Scenario {...iconButtonScenarios[7]}>
        <VStack className="icon-button-evidence-stack">
          <EvidenceGroup
            description="Adjacent light and dark scopes preserve the selected recipe."
            title="Scoped appearances"
          >
            <div className="icon-button-appearance-grid">
              <div data-brick-appearance="light">
                <code>light</code>
                <IconButton
                  aria-label="Search"
                  data-testid="icon-button-appearance-light"
                >
                  <SearchIcon />
                </IconButton>
              </div>
              <div data-brick-appearance="dark">
                <code>dark</code>
                <IconButton
                  aria-label="Search"
                  data-testid="icon-button-appearance-dark"
                >
                  <SearchIcon />
                </IconButton>
              </div>
            </div>
          </EvidenceGroup>
          <EvidenceGroup
            description="Each row names the supported mechanism, shows minimal code, and renders the result."
            title="Consumer customization"
          >
            <div className="icon-button-customization-list">
              <article className="icon-button-customization">
                <div>
                  <Text as="h4" variant="title-sm">Component CSS properties</Text>
                  <Text as="p" tone="secondary" variant="body-sm">Public IconButton tokens replace the complete solid recipe within this instance only.</Text>
                  <pre aria-label="IconButton component token example" tabIndex={0}><code>{`style={{
  "--brick-icon-button-background": "#6b2f88",
  "--brick-icon-button-background-hover": "#7d3b9c",
  "--brick-icon-button-background-pressed": "#58266f",
  "--brick-icon-button-border-color": "#6b2f88",
  "--brick-icon-button-foreground": "#ffffff"
}}`}</code></pre>
                </div>
                <div className="icon-button-customization__preview">
                  <IconButton
                    aria-label="Customized search"
                    data-testid="icon-button-token-customization"
                    style={tokenCustomization}
                    variant="solid"
                  >
                    <SearchIcon />
                  </IconButton>
                </div>
              </article>
              <article className="icon-button-customization">
                <div>
                  <Text as="h4" variant="title-sm">Consumer hooks</Text>
                  <Text as="p" tone="secondary" variant="body-sm">className, style, and data-slot pass through for local targeting without changing the IconButton API.</Text>
                  <pre aria-label="IconButton consumer hook example" tabIndex={0}><code>{`.icon-button-page .dashed-icon-action {
  --brick-icon-button-background: transparent;
  --brick-icon-button-background-hover: var(--brick-color-accent-soft);
  --brick-icon-button-background-pressed: var(--brick-color-accent-soft-pressed);
  --brick-icon-button-border-color: var(--brick-color-accent-border);
  --brick-icon-button-foreground: var(--brick-color-accent-text);
  border-style: dashed;
}

<IconButton
  aria-label="Search"
  className="dashed-icon-action"
  data-slot="custom-icon-action"
  style={{ borderWidth: "0.125rem" }}
>
  <SearchIcon />
</IconButton>`}</code></pre>
                </div>
                <div className="icon-button-customization__preview">
                  <IconButton
                    aria-label="Search"
                    className="dashed-icon-action"
                    data-slot="custom-icon-action"
                    style={{ borderWidth: "0.125rem" }}
                  >
                    <SearchIcon />
                  </IconButton>
                </div>
              </article>
            </div>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...iconButtonScenarios[8]}>
        <VStack className="icon-button-evidence-stack" data-testid="icon-button-stress">
          <EvidenceGroup
            description="Long accessible names remain semantic while two controls stay square inside a narrow frame."
            title="Constrained-width stress"
          >
            <div className="icon-button-stress-panel">
              <div className="phone-frame">
                <Text as="p" variant="body-sm">Dense application actions</Text>
                <HStack className="icon-button-row" wrap>
                  <IconButton aria-label="Open a very detailed workspace navigation menu">
                    <MenuIcon />
                  </IconButton>
                  <IconButton aria-label="Search all localized workspace content">
                    <SearchIcon />
                  </IconButton>
                </HStack>
              </div>
            </div>
          </EvidenceGroup>
          <EvidenceGroup
            description="IconButton inherits direction from genuine right-to-left content without a component-specific RTL prop."
            title="RTL inheritance"
          >
            <div className="icon-button-stress-panel">
              <div className="phone-frame" dir="rtl">
                <Text as="p" variant="body-sm">إجراءات مساحة العمل</Text>
                <HStack className="icon-button-row" wrap>
                  <IconButton aria-label="فتح القائمة">
                    <MenuIcon />
                  </IconButton>
                  <IconButton aria-label="البحث">
                    <SearchIcon />
                  </IconButton>
                </HStack>
              </div>
            </div>
          </EvidenceGroup>
        </VStack>
      </Scenario>
    </VStack>
  );
}
