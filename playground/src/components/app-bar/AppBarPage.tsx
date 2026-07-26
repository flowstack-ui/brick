import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import type { CSSProperties, ReactNode } from "react";
import {
  Grid,
  HStack,
  VStack,
  AppBar,
  Avatar,
  IconButton,
  Link,
  ScrollArea,
  Text,
  type AppBarRootProps,
  type AppBarTone,
  type AppBarToolbarProps,
  type AppBarVariant,
} from "@flowstack-ui/brick";
import {
  Scenario,
  type ScenarioDefinition,
} from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { MenuIcon, SearchIcon } from "../../shared/icons.js";
import "./app-bar.playground.css";

const variants: AppBarVariant[] = ["solid", "surface", "transparent"];
const tones: AppBarTone[] = ["neutral", "accent"];
const densities: NonNullable<AppBarToolbarProps["density"]>[] = [
  "comfortable",
  "compact",
];
const positions: NonNullable<AppBarRootProps["position"]>[] = [
  "static",
  "absolute",
  "sticky",
  "fixed",
];

const tokenCustomization = {
  "--brick-app-bar-background": "#124e78",
  "--brick-app-bar-foreground": "#ffffff",
  "--brick-app-bar-border-color": "#0d3b5c",
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
    <VStack as="section" className="app-bar-evidence-group">
      <VStack className="app-bar-evidence-group__heading">
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
    <EvidenceSurface className="app-bar-specimen-cell">
      <SpecimenLabel>{label}</SpecimenLabel>
      <div className="app-bar-specimen-cell__preview">{children}</div>
    </EvidenceSurface>
  );
}

function AppBarContents({
  density,
  label,
}: {
  density?: AppBarToolbarProps["density"];
  label: string;
}) {
  return (
    <AppBar.Toolbar density={density}>
      <AppBar.Start>
        <IconButton aria-label={`Open menu for ${label}`}>
          <MenuIcon />
        </IconButton>
        <Text className="app-bar-example__brand" tone="inherit" weight="semibold">Brick</Text>
      </AppBar.Start>
      <AppBar.Center>
        <HStack as="nav" aria-label={`${label} navigation`}>
          <Link href="#app-bar-content" tone="inherit" variant="plain">Projects</Link>
        </HStack>
      </AppBar.Center>
      <AppBar.End>
        <IconButton aria-label={`Search ${label}`}>
          <SearchIcon />
        </IconButton>
        <Avatar alt="Alex Lee" fallback="AL" />
      </AppBar.End>
    </AppBar.Toolbar>
  );
}

function AppBarExample({
  density,
  label,
  ...rootProps
}: Omit<AppBarRootProps, "asChild" | "children" | "render"> & {
  density?: AppBarToolbarProps["density"];
  label: string;
}) {
  return (
    <AppBar.Root aria-label={label} {...rootProps}>
      <AppBarContents density={density} label={label} />
    </AppBar.Root>
  );
}

export const appBarScenarios = [
  {
    description:
      "AppBar’s canonical rendering uses the surface variant, neutral tone, static position, visible separator, and comfortable Toolbar density. Its five-part anatomy aligns real Brick content in one row.",
    id: "app-bar.overview",
    number: 1,
    title: "Overview",
  },
  {
    description:
      "Variants change only the top-surface treatment. Compare solid, surface, and transparent while retaining AppBar’s default neutral tone and all other defaults.",
    id: "app-bar.variants",
    number: 2,
    title: "Variants",
  },
  {
    description:
      "Tone and variant form AppBar’s complete recipe matrix. Compare neutral and accent within each variant while content, position, density, and surface options remain unchanged.",
    id: "app-bar.tones",
    number: 3,
    title: "Tones",
  },
  {
    description:
      "Comfortable and compact change only Toolbar density. Anatomy, content, surface recipe, position, and structural—not ARIA toolbar—semantics remain identical.",
    id: "app-bar.density",
    number: 4,
    title: "Density",
  },
  {
    description:
      "Border, static elevation, and backdrop blur are independent surface options. Each specimen changes only the named option from AppBar’s defaults.",
    id: "app-bar.surface",
    navigationTitle: "Surface",
    number: 5,
    title: "Surface options",
  },
  {
    description:
      "Static, absolute, sticky, and fixed are public positioning modes. These contained stages make each mode inspectable; applications remain responsible for content offsets and scroll policy.",
    id: "app-bar.positions",
    number: 6,
    title: "Positions",
  },
  {
    description:
      "Root supports Atom’s default, render, and asChild composition paths while preserving the finished AppBar anatomy and native header landmark.",
    id: "app-bar.composition",
    navigationTitle: "Composition",
    number: 7,
    title: "Composition",
  },
  {
    description:
      "Appearance can be scoped locally, and public AppBar tokens plus native consumer hooks support deliberate brand customization without changing the component API.",
    id: "app-bar.appearance",
    navigationTitle: "Theme",
    number: 8,
    title: "Appearance and customization",
  },
  {
    description:
      "Application-owned truncation keeps long content in one row, while logical Start and End placement inherit genuine right-to-left direction without an AppBar-specific RTL prop.",
    id: "app-bar.stress",
    navigationTitle: "Stress",
    number: 9,
    title: "Responsive and RTL",
  },
] as const satisfies readonly ScenarioDefinition[];

export function AppBarPage() {
  return (
    <VStack
      className="app-bar-page"
      data-component-page="app-bar"
      data-testid="app-bar-workbench"
      id="app-bar-content"
    >
      <Scenario {...appBarScenarios[0]}>
        <EvidenceSurface className="app-bar-overview" data-testid="app-bar-overview" inset="lg">
          <AppBarExample label="Default AppBar" />
        </EvidenceSurface>
      </Scenario>

      <Scenario {...appBarScenarios[1]}>
        <Grid.Root columns={3}
          className="app-bar-specimen-grid app-bar-specimen-grid--three"
          data-testid="app-bar-variants"
        >
          {variants.map((variant) => (
            <SpecimenCell key={variant} label={variant}>
              <AppBarExample
                label={`${variant} variant AppBar`}
                variant={variant}
              />
            </SpecimenCell>
          ))}
        </Grid.Root>
      </Scenario>

      <Scenario {...appBarScenarios[2]}>
        <VStack className="app-bar-evidence-stack" data-testid="app-bar-tones">
          {variants.map((variant) => (
            <EvidenceGroup
              description={`Both supported tones using the ${variant} treatment.`}
              key={variant}
              title={`${variant[0].toUpperCase()}${variant.slice(1)} tones`}
            >
              <Grid.Root columns={2} className="app-bar-specimen-grid app-bar-specimen-grid--two">
                {tones.map((tone) => (
                  <SpecimenCell key={tone} label={tone}>
                    <AppBarExample
                      label={`${variant} ${tone} AppBar`}
                      tone={tone}
                      variant={variant}
                    />
                  </SpecimenCell>
                ))}
              </Grid.Root>
            </EvidenceGroup>
          ))}
        </VStack>
      </Scenario>

      <Scenario {...appBarScenarios[3]}>
        <Grid.Root columns={2}
          className="app-bar-specimen-grid app-bar-specimen-grid--two"
          data-testid="app-bar-density"
        >
          {densities.map((density) => (
            <SpecimenCell key={density} label={density}>
              <AppBarExample
                density={density}
                label={`${density} density AppBar`}
              />
            </SpecimenCell>
          ))}
        </Grid.Root>
      </Scenario>

      <Scenario {...appBarScenarios[4]}>
        <Grid.Root columns={3}
          className="app-bar-specimen-grid app-bar-specimen-grid--three"
          data-testid="app-bar-options"
        >
          <SpecimenCell label="elevated">
            <EvidenceSurface className="app-bar-surface-stage app-bar-surface-stage--elevated">
              <AppBarExample elevated label="Elevated AppBar" />
            </EvidenceSurface>
          </SpecimenCell>
          <SpecimenCell label="blurred">
            <EvidenceSurface className="app-bar-surface-stage app-bar-surface-stage--blurred">
              <div aria-hidden="true" className="app-bar-blur-backdrop">
                <span />
                <span />
                <span />
              </div>
              <AppBarExample blurred label="Blurred AppBar" />
            </EvidenceSurface>
          </SpecimenCell>
          <SpecimenCell label="bordered={false}">
            <AppBarExample bordered={false} label="Borderless AppBar" />
          </SpecimenCell>
        </Grid.Root>
      </Scenario>

      <Scenario {...appBarScenarios[5]}>
        <Grid.Root columns={2}
          className="app-bar-specimen-grid app-bar-specimen-grid--two"
          data-testid="app-bar-positions"
        >
          {positions.map((position) => (
            <SpecimenCell key={position} label={position}>
              <ScrollArea.Root className="app-bar-position-stage" scrollbarVisibility="interaction">
                <ScrollArea.Viewport>
                  <AppBarExample
                    label={`${position} position AppBar`}
                    position={position}
                  />
                  <div aria-hidden="true" className="app-bar-position-stage__content">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                </ScrollArea.Viewport>
              </ScrollArea.Root>
            </SpecimenCell>
          ))}
        </Grid.Root>
      </Scenario>

      <Scenario {...appBarScenarios[6]}>
        <Grid.Root
          className="playground-output-stack"
          data-testid="app-bar-composition"
        >
          <RenderedOutput label="Default App Bar HTML">
            <AppBar.Root
              aria-label="Default composition AppBar"
              data-testid="app-bar-composition-default"
            >
              <AppBarContents label="Default composition AppBar" />
            </AppBar.Root>
          </RenderedOutput>
          <RenderedOutput label="Rendered App Bar HTML">
            <AppBar.Root
              aria-label="Render composition AppBar"
              data-testid="app-bar-composition-render"
              render={<header />}
            >
              <AppBarContents label="Render composition AppBar" />
            </AppBar.Root>
          </RenderedOutput>
          <RenderedOutput label="Composed App Bar HTML">
            <AppBar.Root aria-label="asChild composition AppBar" asChild>
              <header data-testid="app-bar-composition-as-child">
                <AppBarContents label="asChild composition AppBar" />
              </header>
            </AppBar.Root>
          </RenderedOutput>
        </Grid.Root>
      </Scenario>

      <Scenario {...appBarScenarios[7]}>
        <EvidenceGroup
          description="Adjacent local scopes prove that AppBar consumes the selected appearance without changing the document-wide review setting."
          title="Scoped appearances"
        >
          <Grid.Root columns={2} className="app-bar-appearance-grid">
            <EvidenceSurface
              className="app-bar-appearance-panel"
              data-brick-appearance="light"
            >
              <span>Light scope</span>
              <AppBarExample label="Light appearance AppBar" />
            </EvidenceSurface>
            <EvidenceSurface
              className="app-bar-appearance-panel"
              data-brick-appearance="dark"
            >
              <span>Dark scope</span>
              <AppBarExample label="Dark appearance AppBar" />
            </EvidenceSurface>
          </Grid.Root>
        </EvidenceGroup>

        <EvidenceGroup
          description="Each row names a supported customization mechanism, shows matching consumer code, and renders the exact result."
          title="Consumer customization"
        >
          <div className="app-bar-customization-list">
            <EvidenceSurface as="article" className="app-bar-customization" inset="lg">
              <div>
                <Text as="h4" variant="title-sm">Component CSS properties</Text>
                <Text as="p" tone="secondary" variant="body-sm">
                  Public AppBar tokens replace the default surface recipe for
                  this instance only.
                </Text>
                <PlaygroundCodeBlock
                  aria-label="AppBar component token example"
                  tabIndex={0}
                >{`style={{
  "--brick-app-bar-background": "#124e78",
  "--brick-app-bar-foreground": "#ffffff",
  "--brick-app-bar-border-color": "#0d3b5c"
}}`}</PlaygroundCodeBlock>
              </div>
              <div className="app-bar-customization__preview">
                <AppBarExample
                  label="Token customized AppBar"
                  style={tokenCustomization}
                />
              </div>
            </EvidenceSurface>

            <EvidenceSurface as="article" className="app-bar-customization" inset="lg">
              <div>
                <Text as="h4" variant="title-sm">Consumer hooks</Text>
                <Text as="p" tone="secondary" variant="body-sm">
                  className, style, and data-slot pass through for local
                  targeting without changing the AppBar API.
                </Text>
                <PlaygroundCodeBlock aria-label="AppBar consumer hook example" tabIndex={0}>{`.app-bar-page .dashed-app-bar {
  --brick-app-bar-background: var(--brick-color-accent-soft);
  --brick-app-bar-border-color: var(--brick-color-accent-border);
  --brick-app-bar-foreground: var(--brick-color-accent-text);
  border-block-end-style: dashed;
}

<AppBar.Root
  aria-label="Customized AppBar"
  className="dashed-app-bar"
  data-slot="custom-app-bar"
  style={{ borderBlockEndWidth: "0.125rem" }}
>
  ...
</AppBar.Root>`}</PlaygroundCodeBlock>
              </div>
              <div className="app-bar-customization__preview">
                <AppBar.Root
                  aria-label="Customized AppBar"
                  className="dashed-app-bar"
                  data-slot="custom-app-bar"
                  style={{ borderBlockEndWidth: "0.125rem" }}
                >
                  <AppBarContents label="Customized AppBar" />
                </AppBar.Root>
              </div>
            </EvidenceSurface>
          </div>
        </EvidenceGroup>
      </Scenario>

      <Scenario {...appBarScenarios[8]}>
        <VStack className="app-bar-evidence-stack" data-testid="app-bar-stress">
          <EvidenceGroup
            description="A long application-owned workspace label truncates inside a 22rem frame while AppBar retains one row and its default surface recipe."
            title="Constrained-width stress"
          >
            <EvidenceSurface className="app-bar-stress-panel">
              <div className="app-bar-phone-frame">
                <AppBar.Root aria-label="Constrained AppBar">
                  <AppBar.Toolbar>
                    <AppBar.Start>
                      <IconButton aria-label="Open constrained menu">
                        <MenuIcon />
                      </IconButton>
                      <Text className="app-bar-stress-label" tone="inherit" weight="semibold">
                        International product operations workspace
                      </Text>
                    </AppBar.Start>
                    <AppBar.End>
                      <IconButton aria-label="Search constrained workspace">
                        <SearchIcon />
                      </IconButton>
                    </AppBar.End>
                  </AppBar.Toolbar>
                </AppBar.Root>
              </div>
            </EvidenceSurface>
          </EvidenceGroup>

          <EvidenceGroup
            description="AppBar inherits direction from genuine right-to-left content and places logical Start and End on the expected physical sides."
            title="RTL inheritance"
          >
            <EvidenceSurface className="app-bar-stress-panel">
              <div className="app-bar-phone-frame" dir="rtl">
                <AppBar.Root aria-label="شريط التطبيق">
                  <AppBar.Toolbar>
                    <AppBar.Start>
                      <IconButton aria-label="فتح القائمة">
                        <MenuIcon />
                      </IconButton>
                      <Text className="app-bar-stress-label" tone="inherit" weight="semibold">
                        مساحة العمل
                      </Text>
                    </AppBar.Start>
                    <AppBar.Center>
                      <HStack as="nav" aria-label="التنقل في المشاريع">
                        <Link href="#app-bar-content" tone="inherit" variant="plain">المشاريع</Link>
                      </HStack>
                    </AppBar.Center>
                    <AppBar.End>
                      <IconButton aria-label="البحث">
                        <SearchIcon />
                      </IconButton>
                    </AppBar.End>
                  </AppBar.Toolbar>
                </AppBar.Root>
              </div>
            </EvidenceSurface>
          </EvidenceGroup>
        </VStack>
      </Scenario>
    </VStack>
  );
}
