import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import type { CSSProperties, ReactNode } from "react";
import {
  Grid,
  VStack,
  Button,
  Card,
  IconButton,
  Image,
  List,
  Text,
  type CardRootElement,
  type CardRootProps,
  type CardSize,
  type CardTitleElement,
  type CardVariant,
} from "@flowstack-ui/brick";
import {
  Scenario,
  type ScenarioDefinition,
} from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { MenuIcon } from "../../shared/icons.js";
import "./card.playground.css";

const variants: CardVariant[] = ["outline", "elevated", "subtle"];
const sizes: CardSize[] = ["sm", "md", "lg"];
const rootElements: CardRootElement[] = ["div", "article", "section", "li"];
const titleElements: CardTitleElement[] = ["h1", "h2", "h3", "h4", "h5", "h6"];

const tokenCustomization = {
  "--brick-card-radius": "0.25rem",
  "--brick-card-shadow": "0 1rem 3rem rgb(53 46 91 / 25%)",
  "--brick-card-space": "2rem",
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
    <VStack as="section" className="card-evidence-group">
      <VStack className="card-evidence-group__heading">
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
    <EvidenceSurface className="card-specimen-cell">
      <SpecimenLabel>{label}</SpecimenLabel>
      <div className="card-specimen-cell__preview">{children}</div>
    </EvidenceSurface>
  );
}

function RecipeCard(props: Pick<CardRootProps, "size" | "variant">) {
  return (
    <Card.Root {...props}>
      <Card.Header>
        <Card.Title>Project summary</Card.Title>
        <Card.Description>Updated today</Card.Description>
      </Card.Header>
      <Card.Content>
        The same subject and anatomy make the selected Card recipe easier to
        compare.
      </Card.Content>
    </Card.Root>
  );
}

export const cardScenarios = [
  {
    description:
      "Card’s canonical rendering is a neutral outline surface at the medium size. The default Root is a div and the default Title is an h3; explicit Brick actions retain their own semantics.",
    id: "card.overview",
    number: 1,
    title: "Overview",
  },
  {
    description:
      "Variants change only surface prominence. Compare outline, elevated, and subtle using identical content and Card’s default medium size.",
    id: "card.variants",
    number: 2,
    title: "Variants",
  },
  {
    description:
      "Size coordinates section inset, region spacing, and title scale without setting width or height. Every specimen retains the default outline variant and identical content.",
    id: "card.sizes",
    number: 3,
    title: "Sizes",
  },
  {
    description:
      "Every Card region is optional. Partial compositions render only their authored parts and never generate empty headers, footers, separators, or actions.",
    id: "card.anatomy",
    number: 4,
    title: "Anatomy",
  },
  {
    description:
      "Root offers four restricted document elements and Title offers h1 through h6. These choices change native semantics only; Card’s visual defaults remain stable.",
    id: "card.semantics",
    navigationTitle: "Semantics",
    number: 5,
    title: "Semantic elements",
  },
  {
    description:
      "Native media, explicit Brick controls, and an application-owned single-action link compose through children. Card itself remains static and non-focusable.",
    id: "card.composition",
    navigationTitle: "Composition",
    number: 6,
    title: "Composition",
  },
  {
    description:
      "Appearance can be scoped locally, while the three public Card tokens and native consumer hooks support deliberate customization without changing anatomy.",
    id: "card.appearance",
    navigationTitle: "Theme",
    number: 7,
    title: "Appearance and customization",
  },
  {
    description:
      "Long content, compact trailing actions, wrapping footers, and genuine right-to-left copy remain contained through logical Card layout and application-owned width.",
    id: "card.stress",
    navigationTitle: "Stress",
    number: 8,
    title: "Responsive and RTL",
  },
] as const satisfies readonly ScenarioDefinition[];

export function CardPage() {
  return (
    <VStack
      className="card-page"
      data-component-page="card"
      data-testid="card-workbench"
    >
      <Scenario {...cardScenarios[0]}>
        <EvidenceSurface className="card-overview" data-testid="card-overview" inset="lg">
          <Card.Root>
            <Card.Header>
              <Card.Title>Quarterly report</Card.Title>
              <Card.Description>
                Performance snapshot · updated five minutes ago
              </Card.Description>
              <Card.Action>
                <IconButton aria-label="More report options">
                  <MenuIcon />
                </IconButton>
              </Card.Action>
            </Card.Header>
            <Card.Content>
              <Text as="p" className="card-overview__metric" variant="title-lg">24.8%</Text>
              <Text as="p" tone="secondary">Conversion improved across every mobile checkout step.</Text>
            </Card.Content>
            <Card.Footer>
              <Button>Open report</Button>
              <Button tone="neutral" variant="outline">
                Export
              </Button>
            </Card.Footer>
          </Card.Root>
        </EvidenceSurface>
      </Scenario>

      <Scenario {...cardScenarios[1]}>
        <Grid.Root columns={3}
          className="card-specimen-grid card-specimen-grid--three"
          data-testid="card-variants"
        >
          {variants.map((variant) => (
            <SpecimenCell key={variant} label={variant}>
              <RecipeCard variant={variant} />
            </SpecimenCell>
          ))}
        </Grid.Root>
      </Scenario>

      <Scenario {...cardScenarios[2]}>
        <Grid.Root columns={3}
          className="card-specimen-grid card-specimen-grid--three card-specimen-grid--natural"
          data-testid="card-sizes"
        >
          {sizes.map((size) => (
            <SpecimenCell key={size} label={size}>
              <RecipeCard size={size} />
            </SpecimenCell>
          ))}
        </Grid.Root>
      </Scenario>

      <Scenario {...cardScenarios[3]}>
        <Grid.Root columns={4}
          className="card-specimen-grid card-specimen-grid--four"
          data-testid="card-anatomy"
        >
          <SpecimenCell label="Content">
            <Card.Root data-testid="card-anatomy-content">
              <Card.Content>
                <Text weight="semibold">Content only</Text>
                <Text as="p" tone="secondary" variant="body-sm">No empty header or footer is rendered.</Text>
              </Card.Content>
            </Card.Root>
          </SpecimenCell>
          <SpecimenCell label="Header">
            <Card.Root data-testid="card-anatomy-header">
              <Card.Header>
                <Card.Title>Header only</Card.Title>
                <Card.Description>Title and supporting copy</Card.Description>
              </Card.Header>
            </Card.Root>
          </SpecimenCell>
          <SpecimenCell label="Footer">
            <Card.Root data-testid="card-anatomy-footer">
              <Card.Footer>
                <Button>Footer action</Button>
              </Card.Footer>
            </Card.Root>
          </SpecimenCell>
          <SpecimenCell label="Action">
            <Card.Root data-testid="card-anatomy-action">
              <Card.Header>
                <Card.Title>Trailing action</Card.Title>
                <Card.Description>
                  Compact controls belong in Card.Action.
                </Card.Description>
                <Card.Action>
                  <IconButton aria-label="Edit card">
                    <MenuIcon />
                  </IconButton>
                </Card.Action>
              </Card.Header>
            </Card.Root>
          </SpecimenCell>
        </Grid.Root>
      </Scenario>

      <Scenario {...cardScenarios[4]}>
        <VStack className="card-evidence-stack" data-testid="card-semantics">
          <EvidenceGroup
            description="Each Root uses the same default recipe and content while only its native container element changes."
            title="Root elements"
          >
            <Grid.Root columns={4} className="card-specimen-grid card-specimen-grid--four">
              {rootElements.map((element) => {
                const card = (
                  <Card.Root
                    as={element}
                    data-testid={`card-root-${element}`}
                  >
                    <Card.Header>
                      <Card.Title>Project summary</Card.Title>
                    </Card.Header>
                    <Card.Content>Native container semantics.</Card.Content>
                  </Card.Root>
                );

                return (
                  <SpecimenCell key={element} label={element}>
                    {element === "li" ? (
                      <List.Root className="card-list-reset" marker="none">
                        <List.Item asChild>{card}</List.Item>
                      </List.Root>
                    ) : (
                      card
                    )}
                  </SpecimenCell>
                );
              })}
            </Grid.Root>
          </EvidenceGroup>

          <EvidenceGroup
            description="Visual treatment remains Card-owned while the page selects the correct native heading level."
            title="Title levels"
          >
            <Grid.Root columns={6} className="card-specimen-grid card-specimen-grid--six">
              {titleElements.map((element) => (
                <SpecimenCell key={element} label={element}>
                  <Card.Root>
                    <Card.Header>
                      <Card.Title
                        as={element}
                        data-testid={`card-title-${element}`}
                      >
                        Project summary
                      </Card.Title>
                    </Card.Header>
                  </Card.Root>
                </SpecimenCell>
              ))}
            </Grid.Root>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...cardScenarios[5]}>
        <Grid.Root columns={3}
          className="card-specimen-grid card-specimen-grid--three"
          data-testid="card-composition"
        >
          <SpecimenCell label="Image composition">
            <Card.Root data-testid="card-composition-image">
              <Image.Root className="card-media-example" fit="contain" frame="subtle" ratio={16 / 9} src="/assets/icon-button/brick-image.png">
                <Image.Content
                  alt="Three colorful Brick blocks"
                />
                <Image.Fallback>Brick preview unavailable</Image.Fallback>
              </Image.Root>
              <Card.Header>
                <Card.Title>Brick workspace</Card.Title>
                <Card.Description>
                  Finished media composes through Brick Image.
                </Card.Description>
              </Card.Header>
            </Card.Root>
          </SpecimenCell>

          <SpecimenCell label="explicit controls">
            <Card.Root data-testid="card-composition-controls">
              <Card.Header>
                <Card.Title>Workspace access</Card.Title>
                <Card.Description>Actions retain native ownership.</Card.Description>
                <Card.Action>
                  <IconButton aria-label="Workspace options">
                    <MenuIcon />
                  </IconButton>
                </Card.Action>
              </Card.Header>
              <Card.Footer>
                <Button>Open workspace</Button>
              </Card.Footer>
            </Card.Root>
          </SpecimenCell>

          <SpecimenCell label="application link">
            <a
              aria-labelledby="card-single-action-title"
              className="card-single-action-link"
              href="#card-single-action"
            >
              <Card.Root id="card-single-action">
                <Card.Header>
                  <Card.Title id="card-single-action-title">
                    Single-action preview
                  </Card.Title>
                  <Card.Description>
                    A real link owns focus and navigation.
                  </Card.Description>
                </Card.Header>
              </Card.Root>
            </a>
          </SpecimenCell>
        </Grid.Root>
      </Scenario>

      <Scenario {...cardScenarios[6]}>
        <EvidenceGroup
          description="Adjacent local scopes prove that Card consumes appearance without changing the document-wide review setting."
          title="Scoped appearances"
        >
          <Grid.Root columns={2}
            className="card-scoped-appearance-grid"
            data-testid="card-appearance"
          >
            <EvidenceSurface className="card-appearance-panel" data-brick-appearance="light">
              <span>Light scope</span>
              <RecipeCard />
            </EvidenceSurface>
            <EvidenceSurface className="card-appearance-panel" data-brick-appearance="dark">
              <span>Dark scope</span>
              <RecipeCard />
            </EvidenceSurface>
          </Grid.Root>
        </EvidenceGroup>

        <EvidenceGroup
          description="Each row names a supported customization mechanism, shows matching consumer code, and renders the exact result."
          title="Consumer customization"
        >
          <div className="card-customization-list">
            <EvidenceSurface as="article" className="card-customization" inset="lg">
              <div>
                <Text as="h4" variant="title-sm">Component CSS properties</Text>
                <Text as="p" tone="secondary" variant="body-sm">
                  Public Card tokens change spacing, radius, and the selected
                  elevated shadow for this instance only.
                </Text>
                <PlaygroundCodeBlock aria-label="Card component token example" tabIndex={0}>{`<Card.Root
  style={{
    "--brick-card-radius": "0.25rem",
    "--brick-card-shadow": "0 1rem 3rem rgb(53 46 91 / 25%)",
    "--brick-card-space": "2rem"
  }}
  variant="elevated"
>
  <Card.Header>
    <Card.Title>Component CSS properties</Card.Title>
    <Card.Description>Local Card token overrides.</Card.Description>
  </Card.Header>
  <Card.Content>Customized surface content.</Card.Content>
</Card.Root>`}</PlaygroundCodeBlock>
              </div>
              <div className="card-customization__preview">
                <Card.Root
                  data-testid="card-token-customization"
                  style={tokenCustomization}
                  variant="elevated"
                >
                  <Card.Header>
                    <Card.Title>Component CSS properties</Card.Title>
                    <Card.Description>
                      Local Card token overrides.
                    </Card.Description>
                  </Card.Header>
                  <Card.Content>Customized surface content.</Card.Content>
                </Card.Root>
              </div>
            </EvidenceSurface>

            <EvidenceSurface as="article" className="card-customization" inset="lg">
              <div>
                <Text as="h4" variant="title-sm">Consumer hooks</Text>
                <Text as="p" tone="secondary" variant="body-sm">
                  className, style, and data-slot pass through for direct local
                  targeting without changing the Card API.
                </Text>
                <PlaygroundCodeBlock aria-label="Card consumer hook example" tabIndex={0}>{`.card-page .dashed-card {
  border-style: dashed;
}

<Card.Root
  className="dashed-card"
  data-slot="custom-card"
  style={{ borderWidth: "0.125rem" }}
>
  <Card.Header data-slot="custom-card-header">
    <Card.Title>Consumer hooks</Card.Title>
    <Card.Description>Class, style, and slot overrides.</Card.Description>
  </Card.Header>
  <Card.Content>Customized surface content.</Card.Content>
</Card.Root>`}</PlaygroundCodeBlock>
              </div>
              <div className="card-customization__preview">
                <Card.Root
                  className="dashed-card"
                  data-slot="custom-card"
                  style={{ borderWidth: "0.125rem" }}
                >
                  <Card.Header data-slot="custom-card-header">
                    <Card.Title>Consumer hooks</Card.Title>
                    <Card.Description>
                      Class, style, and slot overrides.
                    </Card.Description>
                  </Card.Header>
                  <Card.Content>Customized surface content.</Card.Content>
                </Card.Root>
              </div>
            </EvidenceSurface>
          </div>
        </EvidenceGroup>
      </Scenario>

      <Scenario {...cardScenarios[7]}>
        <VStack className="card-evidence-stack" data-testid="card-stress">
          <EvidenceGroup
            description="Long translated content and an unbroken reference wrap inside a 20rem application frame while the Footer remains reachable."
            title="Constrained-width stress"
          >
            <EvidenceSurface className="card-stress-panel">
              <div className="card-phone-frame">
                <Card.Root data-testid="card-stress-constrained">
                  <Card.Header>
                    <Card.Title>
                      Detailed delivery preferences and account verification
                    </Card.Title>
                    <Card.Description>
                      ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ
                    </Card.Description>
                    <Card.Action>
                      <IconButton aria-label="Edit delivery preferences">
                        <MenuIcon />
                      </IconButton>
                    </Card.Action>
                  </Card.Header>
                  <Card.Content>
                    Long content wraps instead of expanding the page beyond its
                    constrained canvas.
                  </Card.Content>
                  <Card.Footer>
                    <Button>Confirm preferences</Button>
                    <Button tone="neutral" variant="outline">
                      Review everything again
                    </Button>
                  </Card.Footer>
                </Card.Root>
              </div>
            </EvidenceSurface>
          </EvidenceGroup>

          <EvidenceGroup
            description="Card inherits genuine right-to-left direction, mirrors logical spacing and Action placement, and preserves meaningful source order."
            title="RTL inheritance"
          >
            <EvidenceSurface className="card-stress-panel">
              <div className="card-phone-frame" dir="rtl">
                <Card.Root data-testid="card-stress-rtl">
                  <Card.Header>
                    <Card.Title>إعداد مساحة العمل</Card.Title>
                    <Card.Description>
                      يتكيف المحتوى من اليمين إلى اليسار دون تغيير ترتيب المصدر.
                    </Card.Description>
                    <Card.Action>
                      <IconButton aria-label="تعديل مساحة العمل">
                        <MenuIcon />
                      </IconButton>
                    </Card.Action>
                  </Card.Header>
                  <Card.Content>
                    تظل البنية واضحة وقابلة للقراءة على الشاشات الضيقة.
                  </Card.Content>
                  <Card.Footer>
                    <Button>متابعة</Button>
                  </Card.Footer>
                </Card.Root>
              </div>
            </EvidenceSurface>
          </EvidenceGroup>
        </VStack>
      </Scenario>
    </VStack>
  );
}
