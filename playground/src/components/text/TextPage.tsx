import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  Grid,
  VStack,
  Button,
  Caption,
  Eyebrow,
  Heading,
  Paragraph,
  Text,
  type TextAlign,
  type TextElement,
  type TextTone,
  type TextTransform,
  type TextVariant,
  type TextWeight,
  type TextWrap,
} from "@flowstack-ui/brick";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./text.playground.css";
import "./text-wrap.playground.css";

const variants: TextVariant[] = [
  "display",
  "display-sm",
  "display-md",
  "display-lg",
  "display-xl",
  "title-lg",
  "title-lg",
  "title-md",
  "title-sm",
  "title-xs",
  "title-2xs",
  "body-xl",
  "body-lg",
  "body-md",
  "body-sm",
  "caption",
  "eyebrow",
];
const tones: TextTone[] = [
  "inherit",
  "primary",
  "secondary",
  "muted",
  "accent",
  "info",
  "success",
  "warning",
  "danger",
];
const weights: TextWeight[] = ["inherit", "regular", "medium", "semibold"];
const aligns: TextAlign[] = ["start", "center", "end"];
const wraps: TextWrap[] = ["wrap", "nowrap", "balance", "pretty"];
const transforms: TextTransform[] = ["none", "uppercase", "lowercase", "capitalize"];
const semanticHosts: TextElement[] = ["span", "p", "div", "h2"];
const comparisonCopy = "Build dependable interfaces.";
const wrapCopy =
  "A dependable interface keeps important content readable for every person.";

const customTextStyle = {
  "--brick-text-font-size": "1.375rem",
  "--brick-text-font-weight": "600",
  "--brick-text-letter-spacing": "-0.015em",
  "--brick-text-foreground": "#18794e",
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
    <VStack as="section" className="text-evidence-group">
      <VStack className="text-evidence-group__heading">
        <Text as="h3" variant="title-sm">{title}</Text>
        <Text as="p" tone="secondary" variant="body-sm">{description}</Text>
      </VStack>
      {children}
    </VStack>
  );
}

function Cell({ children, label }: { children: ReactNode; label: string }) {
  return (
    <EvidenceSurface className="text-cell">
      <SpecimenLabel>{label}</SpecimenLabel>
      <div className="text-cell__preview">{children}</div>
    </EvidenceSurface>
  );
}

export const textScenarios = [
  {
    description:
      "Text’s canonical rendering is an inline span using the body-md visual recipe, primary text foreground, regular weight, and natural wrapping.",
    id: "text.overview",
    number: 1,
    title: "Overview",
  },
  {
    description:
      "Fourteen restrained visual recipes change typography only. Every specimen keeps the default span host, primary tone, identical copy, and natural wrapping.",
    id: "text.variants",
    number: 2,
    title: "Type variants",
  },
  {
    description:
      "Semantic foreground roles change color only. Primary means the normal high-emphasis text foreground; accent is the brand-colored role.",
    id: "text.tones",
    number: 3,
    title: "Tones",
  },
  {
    description:
      "Weight and logical alignment are independent overrides. Every comparison retains body-md, primary tone, the span host, and identical copy.",
    id: "text.emphasis",
    navigationTitle: "Emphasis",
    number: 4,
    title: "Weight and alignment",
  },
  {
    description:
      "The semantic host never chooses visual size. Identical body-md text renders through inline, paragraph, block, and heading hosts with actual output shown.",
    id: "text.semantics",
    number: 5,
    title: "Semantic hosts",
  },
  {
    description:
      "Wrapping choices, single-line truncation, and bounded line clamping are explicit content treatments inside equal application-owned frames.",
    id: "text.overflow",
    number: 6,
    title: "Wrapping and overflow",
  },
  {
    description:
      "Native language, direction, IDs, ARIA, data attributes, refs, and inline semantic children pass directly to the selected host without invented roles.",
    id: "text.native",
    number: 7,
    title: "Native attributes and composition",
  },
  {
    description:
      "Adjacent appearance scopes preserve the canonical defaults. Public Text variables visibly customize one exact result matching the shown code.",
    id: "text.appearance",
    navigationTitle: "Theme",
    number: 8,
    title: "Appearance and customization",
  },
  {
    description:
      "Long localized copy, unbroken content, genuine RTL, logical alignment, text spacing, zoom, reflow, and forced colors remain readable and contained.",
    id: "text.stress",
    number: 9,
    title: "Responsive and RTL",
  },
] as const satisfies readonly ScenarioDefinition[];

export function TextPage() {
  const nativeRef = useRef<HTMLElement>(null);
  const [refHost, setRefHost] = useState("Not inspected");

  return (
    <VStack className="text-page" data-component-page="text" data-testid="text-workbench">
      <Scenario {...textScenarios[0]}>
        <EvidenceSurface className="text-overview" data-testid="text-overview" inset="lg">
          <Text>{comparisonCopy}</Text>
        </EvidenceSurface>
      </Scenario>

      <Scenario {...textScenarios[1]}>
        <VStack gap="4">
          <Grid.Root columns={4} className="text-grid text-grid--four" data-testid="text-variants">
            {variants.map((variant) => (
              <Cell key={variant} label={variant}>
                <Text variant={variant}>{comparisonCopy}</Text>
              </Cell>
            ))}
          </Grid.Root>
          <EvidenceSurface inset="md">
            <Heading
              data-testid="text-responsive-variant"
              level={2}
              align={{ initial: "center", lg: "start" }}
              variant={{ initial: "display-sm", md: "display-md", lg: "display-lg" }}
            >
              One heading level, responsive visual hierarchy
            </Heading>
          </EvidenceSurface>
        </VStack>
      </Scenario>

      <Scenario {...textScenarios[2]}>
        <Grid.Root columns={3} className="text-grid text-grid--three" data-testid="text-tones">
          {tones.map((tone) => (
            <Cell key={tone} label={tone}>
              <Text tone={tone}>{comparisonCopy}</Text>
            </Cell>
          ))}
        </Grid.Root>
      </Scenario>

      <Scenario {...textScenarios[3]}>
        <VStack className="text-evidence-stack">
          <EvidenceGroup
            description="Only font weight changes across these otherwise identical default specimens."
            title="Weight overrides"
          >
            <Grid.Root columns={4} className="text-grid text-grid--four" data-testid="text-weights">
              {weights.map((weight) => (
                <Cell key={weight} label={weight}>
                  <Text weight={weight}>{comparisonCopy}</Text>
                </Cell>
              ))}
            </Grid.Root>
          </EvidenceGroup>
          <EvidenceGroup
            description="Explicit transforms change presentation without rewriting authored content; semantic titles should still be authored with their correct casing."
            title="Text transforms"
          >
            <Grid.Root columns={4} className="text-grid text-grid--four" data-testid="text-transforms">
              {transforms.map((transform) => (
                <Cell key={transform} label={transform}>
                  <Text transform={transform}>Flowstack API access</Text>
                </Cell>
              ))}
            </Grid.Root>
          </EvidenceGroup>
          <EvidenceGroup
            description="Start and end are logical values and reverse with inherited direction; center remains centered."
            title="Logical alignment"
          >
            <Grid.Root columns={3} className="text-grid text-grid--three" data-testid="text-alignments">
              {aligns.map((align) => (
                <Cell key={align} label={align}>
                  <Text align={align}>{comparisonCopy}</Text>
                </Cell>
              ))}
            </Grid.Root>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...textScenarios[4]}>
        <VStack className="text-evidence-stack" data-testid="text-semantics">
          <Grid.Root columns={4} className="text-grid text-grid--four">
            {semanticHosts.map((as) => (
              <Cell key={as} label={as}>
                <Text as={as}>{comparisonCopy}</Text>
              </Cell>
            ))}
          </Grid.Root>
          <EvidenceGroup
            description="The live heading uses body-md, proving that semantic level and visual recipe are independent."
            title="Rendered semantic output"
          >
            <RenderedOutput label="Text semantic host HTML">
              <Text as="h2" id="text-output-heading" variant="body-md">
                Account settings
              </Text>
            </RenderedOutput>
          </EvidenceGroup>
          <EvidenceGroup
            description="Named exports supply common semantic hosts and typography defaults while Heading still requires an authored document level."
            title="Named semantic text"
          >
            <VStack data-testid="text-named" gap="2">
              <Heading level={3}>Project settings</Heading>
              <Paragraph tone="secondary">Manage the defaults shared by this workspace.</Paragraph>
              <Caption tone="muted">Updated today</Caption>
              <Eyebrow>Workspace</Eyebrow>
            </VStack>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...textScenarios[5]}>
        <VStack className="text-evidence-stack" data-testid="text-overflow">
          <EvidenceGroup
            description="At the same fixed measure, wrap leaves a one-word final line, balance redistributes every line, and pretty protects the final phrase. Pretty remains a progressive enhancement."
            title="Wrapping choices"
          >
            <Grid.Root columns={4} className="text-grid text-grid--four" data-testid="text-wraps">
              {wraps.map((wrap) => (
                <Cell key={wrap} label={wrap}>
                  <div className="text-constrained text-constrained--wrapping">
                    <Text data-testid={`text-wrap-${wrap}`} wrap={wrap}>
                      {wrapCopy}
                    </Text>
                  </div>
                </Cell>
              ))}
            </Grid.Root>
          </EvidenceGroup>
          <EvidenceGroup
            description="The complete text is identical; only the explicit overflow treatment changes."
            title="Content clipping"
          >
            <Grid.Root columns={3} className="text-grid text-grid--three">
              <Cell label="natural">
                <div className="text-constrained"><Text>{wrapCopy}</Text></div>
              </Cell>
              <Cell label="truncate">
                <div className="text-constrained"><Text truncate>{wrapCopy}</Text></div>
              </Cell>
              <Cell label="3-line clamp">
                <div className="text-constrained text-constrained--narrow">
                  <Text lineClamp={3}>{wrapCopy}</Text>
                </div>
              </Cell>
            </Grid.Root>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...textScenarios[6]}>
        <VStack className="text-evidence-stack" data-testid="text-native">
          <EvidenceGroup
            description="The rendered element exposes authored native attributes and semantic inline emphasis without extra wrappers."
            title="Native output"
          >
            <RenderedOutput label="Text native attribute HTML">
              <Text
                aria-describedby="text-native-description"
                as="p"
                data-evidence="native"
                dir="rtl"
                id="text-native-copy"
                lang="ar"
              >
                <strong>واجهة</strong> واضحة
              </Text>
            </RenderedOutput>
          </EvidenceGroup>
          <EvidenceGroup
            description="The forwarded ref targets the selected native host."
            title="Ref target"
          >
            <EvidenceSurface className="text-overview" inset="lg">
              <div className="text-ref-example">
                <Text as="p" ref={nativeRef}>Inspectable paragraph</Text>
                <Button
                  onClick={() => setRefHost(nativeRef.current?.tagName ?? "Missing")}
                  type="button"
                >
                  Inspect ref
                </Button>
                <output>Ref host: {refHost}</output>
              </div>
            </EvidenceSurface>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...textScenarios[7]}>
        <VStack className="text-evidence-stack">
          <EvidenceGroup
            description="Both scopes use the exact canonical Text defaults."
            title="Scoped appearances"
          >
            <Grid.Root columns={2} className="text-scoped-grid" data-testid="text-appearance">
              <EvidenceSurface data-brick-appearance="light">
                <SpecimenLabel>Light</SpecimenLabel>
                <Text>{comparisonCopy}</Text>
              </EvidenceSurface>
              <EvidenceSurface data-brick-appearance="dark">
                <SpecimenLabel>Dark</SpecimenLabel>
                <Text>{comparisonCopy}</Text>
              </EvidenceSurface>
            </Grid.Root>
          </EvidenceGroup>
          <EvidenceGroup
            description="The shown public variables exactly match the customized live result."
            title="Consumer customization"
          >
            <EvidenceSurface as="article" className="text-customization" inset="lg">
              <div>
                <SpecimenLabel>Customized</SpecimenLabel>
                <Text as="h4" variant="title-sm">Local Text variables</Text>
                <Text as="p" tone="secondary" variant="body-sm">Size, weight, tracking, and foreground change on this instance only.</Text>
                <PlaygroundCodeBlock aria-label="Text customization example" tabIndex={0}>{`<Text
  style={{
    "--brick-text-font-size": "1.375rem",
    "--brick-text-font-weight": "600",
    "--brick-text-letter-spacing": "-0.015em",
    "--brick-text-foreground": "#18794e",
  }}
>
  Customized project summary
</Text>`}</PlaygroundCodeBlock>
              </div>
              <EvidenceSurface className="text-customization__preview">
                <Text style={customTextStyle}>Customized project summary</Text>
              </EvidenceSurface>
            </EvidenceSurface>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...textScenarios[8]}>
        <VStack className="text-evidence-stack" data-testid="text-stress">
          <EvidenceGroup
            description="Localized and unbroken copy wraps inside a 20rem application-owned frame without widening the page."
            title="Constrained localization"
          >
            <EvidenceSurface className="text-stress-panel">
              <div className="text-phone-frame">
                <Text as="h2" variant="title-sm">International project summary</Text>
                <Text as="p">
                  Donaudampfschifffahrtsgesellschaftskapitän manages
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 records.
                </Text>
                <Text as="p" lang="ja">信頼できるインターフェースは、利用可能な幅が変化しても読みやすさを保ちます。</Text>
              </div>
            </EvidenceSurface>
          </EvidenceGroup>
          <EvidenceGroup
            description="Genuine RTL content keeps the same recipes while start and end follow the inherited writing direction."
            title="RTL inheritance"
          >
            <EvidenceSurface className="text-stress-panel">
              <div className="text-phone-frame" dir="rtl">
                <Text align="start" as="h2" variant="title-sm">ملخص المشروع</Text>
                <Text align="end" as="p">واجهة موثوقة تحافظ على وضوح المحتوى في المساحات الضيقة.</Text>
              </div>
            </EvidenceSurface>
          </EvidenceGroup>
        </VStack>
      </Scenario>
    </VStack>
  );
}
