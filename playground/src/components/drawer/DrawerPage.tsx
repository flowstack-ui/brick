import {
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import {
  VStack,
  Button,
  Checkbox,
  Dialog,
  Drawer,
  Fieldset,
  Text,
  type DrawerPlacement,
  type DrawerSize,
} from "@flowstack-ui/brick";
import {
  Scenario,
  type ScenarioDefinition,
} from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./drawer.playground.css";

const placements: DrawerPlacement[] = ["start", "end", "top", "bottom"];
const sizes: DrawerSize[] = ["sm", "md", "lg", "full"];
const titleLevels = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;

const tokenCustomization = {
  "--brick-drawer-radius": "0.25rem",
  "--brick-drawer-space": "2rem",
  "--brick-drawer-shadow": "0 1.5rem 4rem rgb(53 46 91 / 35%)",
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
    <VStack as="section" className="drawer-evidence-group">
      <VStack className="drawer-evidence-group__heading">
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
    <div className="drawer-specimen-cell">
      <SpecimenLabel>{label}</SpecimenLabel>
      <div className="drawer-specimen-cell__preview">{children}</div>
    </div>
  );
}

function StandardDrawer({
  body = "Application-owned controls remain explicit while Drawer supplies the finished edge surface.",
  contentTestId,
  description = "Narrow the visible project list without leaving this page.",
  dir,
  label,
  placement,
  size,
  title = "Filter projects",
}: {
  body?: ReactNode;
  contentTestId?: string;
  description?: string;
  dir?: "ltr" | "rtl";
  label: string;
  placement?: DrawerPlacement;
  size?: DrawerSize;
  title?: string;
}) {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button>{label}</Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay />
        <Drawer.Content
          data-testid={contentTestId}
          dir={dir}
          placement={placement}
          size={size}
        >
          <Drawer.Header>
            <Drawer.Title>{title}</Drawer.Title>
            <Drawer.Description>{description}</Drawer.Description>
          </Drawer.Header>
          <Drawer.Body>{body}</Drawer.Body>
          <Drawer.Footer>
            <Drawer.Close asChild>
              <Button tone="neutral" variant="outline">
                Cancel
              </Button>
            </Drawer.Close>
            <Drawer.Close asChild>
              <Button>Apply changes</Button>
            </Drawer.Close>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

function ScopedDrawer({
  appearance,
}: {
  appearance: "light" | "dark";
}) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const label = `${appearance === "light" ? "Light" : "Dark"} scoped Drawer`;

  return (
    <div
      className="drawer-appearance-panel"
      data-brick-appearance={appearance}
      ref={setContainer}
    >
      <span>{appearance === "light" ? "Light" : "Dark"} scope</span>
      {container ? (
        <Drawer.Root>
          <Drawer.Trigger asChild>
            <Button>{label}</Button>
          </Drawer.Trigger>
          <Drawer.Portal container={container}>
            <Drawer.Overlay />
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>{label}</Drawer.Title>
                <Drawer.Description>
                  A custom portal container preserves this local token scope.
                </Drawer.Description>
              </Drawer.Header>
              <Drawer.Body>
                Placement, size, and modal behavior remain at their defaults.
              </Drawer.Body>
              <Drawer.Footer>
                <Drawer.Close asChild>
                  <Button>Close</Button>
                </Drawer.Close>
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      ) : null}
    </div>
  );
}

function BranchDrawer() {
  const [branchOpen, setBranchOpen] = useState(false);

  return (
    <Drawer.Root onOpenChange={(open) => !open && setBranchOpen(false)}>
      <Drawer.Trigger asChild>
        <Button>Open branch drawer</Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Branch composition</Drawer.Title>
            <Drawer.Description>
              Portalled composite content remains owned by this modal.
            </Drawer.Description>
          </Drawer.Header>
          <Drawer.Body>
            <Button onPress={() => setBranchOpen(true)}>
              Open portalled surface
            </Button>
            {branchOpen
              ? createPortal(
                  <Drawer.Branch asChild>
                    <aside
                      aria-label="Owned branch surface"
                      className="drawer-branch-panel"
                    >
                      <Text weight="semibold">Registered branch</Text>
                      <Text as="p" tone="secondary" variant="body-sm">Focus remains owned by the active Drawer.</Text>
                      <Button onPress={() => setBranchOpen(false)}>
                        Close branch surface
                      </Button>
                    </aside>
                  </Drawer.Branch>,
                  document.body,
                )
              : null}
          </Drawer.Body>
          <Drawer.Footer>
            <Drawer.Close asChild>
              <Button>Close branch drawer</Button>
            </Drawer.Close>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export const drawerScenarios = [
  {
    description:
      "Drawer’s canonical rendering is a medium modal surface attached to the logical end edge, with a visible h2 title, optional description, scrollable Body, and explicit Close actions.",
    id: "drawer.overview",
    number: 1,
    title: "Overview",
  },
  {
    description:
      "Placement changes only the attached logical or block edge. Every specimen keeps Drawer’s default medium size, identical content, and the same modal behavior.",
    id: "drawer.placements",
    number: 2,
    title: "Placements",
  },
  {
    description:
      "Size changes only the complete directional dimension recipe. Every specimen keeps the default end placement and identical content; only full occupies the viewport.",
    id: "drawer.sizes",
    number: 3,
    title: "Sizes",
  },
  {
    description:
      "Header, Description, Body, and Footer are authored regions; a visible Close path remains required. Title supports h1 through h6 without changing Drawer’s visual defaults.",
    id: "drawer.anatomy",
    number: 4,
    title: "Anatomy and semantics",
  },
  {
    description:
      "Default Escape and exact-Overlay dismissal report their reasons, disabled policies require explicit Close, and a disabled Root cannot open.",
    id: "drawer.states",
    navigationTitle: "States",
    number: 5,
    title: "States and dismissal",
  },
  {
    description:
      "A nested Dialog takes top-layer ownership, while a registered third-party portal remains inside the Drawer modal boundary.",
    id: "drawer.composition",
    navigationTitle: "Composition",
    number: 6,
    title: "Composition and modal ownership",
  },
  {
    description:
      "A same-document portal container preserves a local appearance scope without changing Drawer’s default end placement, medium size, or modal behavior.",
    id: "drawer.appearance",
    navigationTitle: "Theme",
    number: 7,
    title: "Appearance and portal scopes",
  },
  {
    description:
      "Public Drawer tokens and native consumer hooks customize one surface without introducing arbitrary dimensions, physical placement, or behavior overrides.",
    id: "drawer.customization",
    navigationTitle: "Customization",
    number: 8,
    title: "Customization",
  },
  {
    description:
      "Long Body content remains bounded with reachable actions, while genuine RTL content proves that logical start resolves to the physical right without changing source order.",
    id: "drawer.stress",
    navigationTitle: "Stress",
    number: 9,
    title: "Responsive and RTL",
  },
] as const satisfies readonly ScenarioDefinition[];

export function DrawerPage() {
  const [eventLog, setEventLog] = useState("No drawer event yet");

  return (
    <VStack
      className="drawer-page"
      data-component-page="drawer"
      data-testid="drawer-workbench"
    >
      <Scenario {...drawerScenarios[0]}>
        <div className="drawer-overview" data-testid="drawer-overview">
          <Drawer.Root>
            <Drawer.Trigger asChild>
              <Button>Filter projects</Button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay />
              <Drawer.Content data-testid="drawer-overview-content">
                <Drawer.Header>
                  <Drawer.Title>Filter projects</Drawer.Title>
                  <Drawer.Description>
                    Narrow the visible project list without leaving this page.
                  </Drawer.Description>
                </Drawer.Header>
                <Drawer.Body>
                  <Fieldset.Root id="drawer-project-status">
                    <Fieldset.Legend>Project status</Fieldset.Legend>
                    <Fieldset.Description>
                      Choose which projects remain visible.
                    </Fieldset.Description>
                    <Checkbox defaultChecked>Active projects</Checkbox>
                    <Checkbox>Archived projects</Checkbox>
                  </Fieldset.Root>
                </Drawer.Body>
                <Drawer.Footer>
                  <Drawer.Close asChild>
                    <Button tone="neutral" variant="outline">
                      Cancel
                    </Button>
                  </Drawer.Close>
                  <Drawer.Close asChild>
                    <Button>Apply filters</Button>
                  </Drawer.Close>
                </Drawer.Footer>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>
      </Scenario>

      <Scenario {...drawerScenarios[1]}>
        <div
          className="drawer-specimen-grid drawer-specimen-grid--four"
          data-testid="drawer-placements"
        >
          {placements.map((placement) => (
            <SpecimenCell key={placement} label={placement}>
              <StandardDrawer
                contentTestId={`drawer-placement-${placement}`}
                label={`Open ${placement} drawer`}
                placement={placement}
              />
            </SpecimenCell>
          ))}
        </div>
      </Scenario>

      <Scenario {...drawerScenarios[2]}>
        <div
          className="drawer-specimen-grid drawer-specimen-grid--four"
          data-testid="drawer-sizes"
        >
          {sizes.map((size) => (
            <SpecimenCell key={size} label={size}>
              <StandardDrawer
                contentTestId={`drawer-size-${size}`}
                label={`Open ${size} drawer`}
                size={size}
              />
            </SpecimenCell>
          ))}
        </div>
      </Scenario>

      <Scenario {...drawerScenarios[3]}>
        <VStack className="drawer-evidence-stack">
          <EvidenceGroup
            description="These compositions render only their authored regions while retaining an accessible name and visible Close path."
            title="Authored regions"
          >
            <div
              className="drawer-specimen-grid drawer-specimen-grid--three"
              data-testid="drawer-anatomy"
            >
              <SpecimenCell label="Title + Close">
                <Drawer.Root>
                  <Drawer.Trigger asChild>
                    <Button>Open minimum drawer</Button>
                  </Drawer.Trigger>
                  <Drawer.Portal>
                    <Drawer.Overlay />
                    <Drawer.Content data-testid="drawer-anatomy-minimum">
                      <Drawer.Title>Minimum named Drawer</Drawer.Title>
                      <Drawer.Close asChild>
                        <Button>Close minimum Drawer</Button>
                      </Drawer.Close>
                    </Drawer.Content>
                  </Drawer.Portal>
                </Drawer.Root>
              </SpecimenCell>

              <SpecimenCell label="Header + Body">
                <Drawer.Root>
                  <Drawer.Trigger asChild>
                    <Button>Open descriptive drawer</Button>
                  </Drawer.Trigger>
                  <Drawer.Portal>
                    <Drawer.Overlay />
                    <Drawer.Content data-testid="drawer-anatomy-body">
                      <Drawer.Header>
                        <Drawer.Title>Descriptive Drawer</Drawer.Title>
                        <Drawer.Description>
                          Description remains optional when Title supplies the
                          accessible name.
                        </Drawer.Description>
                      </Drawer.Header>
                      <Drawer.Body>Primary supporting content.</Drawer.Body>
                      <Drawer.Close asChild>
                        <Button>Close descriptive Drawer</Button>
                      </Drawer.Close>
                    </Drawer.Content>
                  </Drawer.Portal>
                </Drawer.Root>
              </SpecimenCell>

              <SpecimenCell label="Complete anatomy">
                <StandardDrawer
                  body={
                    <Fieldset.Root id="drawer-anatomy-filters">
                      <Fieldset.Legend>Visibility</Fieldset.Legend>
                      <Checkbox defaultChecked>Active projects</Checkbox>
                      <Checkbox>Archived projects</Checkbox>
                    </Fieldset.Root>
                  }
                  contentTestId="drawer-anatomy-complete"
                  label="Inspect drawer anatomy"
                />
              </SpecimenCell>
            </div>
          </EvidenceGroup>

          <EvidenceGroup
            description="Only the native Title heading element changes; every Drawer retains the default end placement, medium size, and identical content."
            title="Title levels"
          >
            <div
              className="drawer-specimen-grid drawer-specimen-grid--six"
              data-testid="drawer-semantics"
            >
              {titleLevels.map((level) => (
                <SpecimenCell key={level} label={level}>
                  <Drawer.Root>
                    <Drawer.Trigger asChild>
                      <Button>Open {level} Drawer</Button>
                    </Drawer.Trigger>
                    <Drawer.Portal>
                      <Drawer.Overlay />
                      <Drawer.Content data-testid={`drawer-title-${level}`}>
                        <Drawer.Header>
                          <Drawer.Title as={level}>
                            Filter projects
                          </Drawer.Title>
                          <Drawer.Description>
                            Native heading semantics with default Drawer
                            styling.
                          </Drawer.Description>
                        </Drawer.Header>
                        <Drawer.Body>Drawer content remains unchanged.</Drawer.Body>
                        <Drawer.Footer>
                          <Drawer.Close asChild>
                            <Button>Close</Button>
                          </Drawer.Close>
                        </Drawer.Footer>
                      </Drawer.Content>
                    </Drawer.Portal>
                  </Drawer.Root>
                </SpecimenCell>
              ))}
            </div>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...drawerScenarios[4]}>
        <VStack className="drawer-evidence-stack">
          <EvidenceGroup
            description="Escape and exact Overlay activation update the same close-reason callback and restore focus to the Trigger."
            title="Default dismissal"
          >
            <div
              className="drawer-action-panel"
              data-testid="drawer-states"
            >
              <Drawer.Root
                onOpenChange={(open, reason) =>
                  setEventLog(
                    open ? "Opened" : `Closed: ${reason ?? "controlled"}`,
                  )
                }
              >
                <Drawer.Trigger asChild>
                  <Button>Open event drawer</Button>
                </Drawer.Trigger>
                <Drawer.Portal>
                  <Drawer.Overlay />
                  <Drawer.Content>
                    <Drawer.Header>
                      <Drawer.Title>Dismissal evidence</Drawer.Title>
                      <Drawer.Description>
                        Try Escape, the scrim, or Close.
                      </Drawer.Description>
                    </Drawer.Header>
                    <Drawer.Body>
                      Only the active top layer responds.
                    </Drawer.Body>
                    <Drawer.Footer>
                      <Drawer.Close asChild>
                        <Button>Close event drawer</Button>
                      </Drawer.Close>
                    </Drawer.Footer>
                  </Drawer.Content>
                </Drawer.Portal>
              </Drawer.Root>
              <output aria-live="polite" className="drawer-event-log">
                {eventLog}
              </output>
            </div>
          </EvidenceGroup>

          <EvidenceGroup
            description="These separate Roots isolate unavailable opening from a workflow that disables both Escape and backdrop dismissal."
            title="Disabled policies"
          >
            <div className="drawer-specimen-grid drawer-specimen-grid--two">
              <SpecimenCell label="disabled Root">
                <Drawer.Root disabled>
                  <Drawer.Trigger asChild>
                    <Button>Unavailable drawer</Button>
                  </Drawer.Trigger>
                </Drawer.Root>
              </SpecimenCell>
              <SpecimenCell label="dismissal disabled">
                <Drawer.Root
                  closeOnBackdropClick={false}
                  closeOnEscape={false}
                >
                  <Drawer.Trigger asChild>
                    <Button>Open dismissal-disabled drawer</Button>
                  </Drawer.Trigger>
                  <Drawer.Portal>
                    <Drawer.Overlay />
                    <Drawer.Content>
                      <Drawer.Header>
                        <Drawer.Title>
                          Explicit close required
                        </Drawer.Title>
                        <Drawer.Description>
                          Escape and the scrim are disabled.
                        </Drawer.Description>
                      </Drawer.Header>
                      <Drawer.Body>
                        Use the visible close control.
                      </Drawer.Body>
                      <Drawer.Footer>
                        <Drawer.Close asChild>
                          <Button>Close persistent drawer</Button>
                        </Drawer.Close>
                      </Drawer.Footer>
                    </Drawer.Content>
                  </Drawer.Portal>
                </Drawer.Root>
              </SpecimenCell>
            </div>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...drawerScenarios[5]}>
        <div
          className="drawer-specimen-grid drawer-specimen-grid--two"
          data-testid="drawer-composition"
        >
          <SpecimenCell label="nested Dialog">
            <Drawer.Root>
              <Drawer.Trigger asChild>
                <Button>Open parent drawer</Button>
              </Drawer.Trigger>
              <Drawer.Portal>
                <Drawer.Overlay />
                <Drawer.Content>
                  <Drawer.Header>
                    <Drawer.Title>Parent filters</Drawer.Title>
                    <Drawer.Description>
                      A Dialog may open above this Drawer.
                    </Drawer.Description>
                  </Drawer.Header>
                  <Drawer.Body>
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <Button>Open nested dialog from drawer</Button>
                      </Dialog.Trigger>
                      <Dialog.Portal>
                        <Dialog.Overlay />
                        <Dialog.Content>
                          <Dialog.Header>
                            <Dialog.Title>Save filter preset?</Dialog.Title>
                            <Dialog.Description>
                              The Drawer remains beneath this layer.
                            </Dialog.Description>
                          </Dialog.Header>
                          <Dialog.Footer>
                            <Dialog.Close asChild>
                              <Button>Done with nested dialog</Button>
                            </Dialog.Close>
                          </Dialog.Footer>
                        </Dialog.Content>
                      </Dialog.Portal>
                    </Dialog.Root>
                  </Drawer.Body>
                  <Drawer.Footer>
                    <Drawer.Close asChild>
                      <Button>Close parent drawer</Button>
                    </Drawer.Close>
                  </Drawer.Footer>
                </Drawer.Content>
              </Drawer.Portal>
            </Drawer.Root>
          </SpecimenCell>
          <SpecimenCell label="registered portal branch">
            <BranchDrawer />
          </SpecimenCell>
        </div>
      </Scenario>

      <Scenario {...drawerScenarios[6]}>
        <div
          className="drawer-scoped-appearance-grid"
          data-testid="drawer-appearance"
        >
          <ScopedDrawer appearance="light" />
          <ScopedDrawer appearance="dark" />
        </div>
      </Scenario>

      <Scenario {...drawerScenarios[7]}>
        <div className="drawer-customization-list">
          <article className="drawer-customization">
            <div>
              <Text as="h4" variant="title-sm">Component CSS properties</Text>
              <Text as="p" tone="secondary" variant="body-sm">
                Public Drawer tokens change spacing, radius, and elevation for
                this default end/medium surface only.
              </Text>
              <pre
                aria-label="Drawer component token example"
                tabIndex={0}
              >
                <code>{`<Drawer.Content
  style={{
    "--brick-drawer-radius": "0.25rem",
    "--brick-drawer-space": "2rem",
    "--brick-drawer-shadow": "0 1.5rem 4rem rgb(53 46 91 / 35%)"
  }}
>
  <Drawer.Header>
    <Drawer.Title>Component CSS properties</Drawer.Title>
    <Drawer.Description>Local Drawer token overrides.</Drawer.Description>
  </Drawer.Header>
  <Drawer.Body>Customized surface content.</Drawer.Body>
  <Drawer.Footer>
    <Drawer.Close asChild><Button>Close</Button></Drawer.Close>
  </Drawer.Footer>
</Drawer.Content>`}</code>
              </pre>
            </div>
            <div className="drawer-customization__preview">
              <Drawer.Root>
                <Drawer.Trigger asChild>
                  <Button>Open token customization</Button>
                </Drawer.Trigger>
                <Drawer.Portal>
                  <Drawer.Overlay />
                  <Drawer.Content
                    data-testid="drawer-token-customization"
                    style={tokenCustomization}
                  >
                    <Drawer.Header>
                      <Drawer.Title>
                        Component CSS properties
                      </Drawer.Title>
                      <Drawer.Description>
                        Local Drawer token overrides.
                      </Drawer.Description>
                    </Drawer.Header>
                    <Drawer.Body>
                      Customized surface content.
                    </Drawer.Body>
                    <Drawer.Footer>
                      <Drawer.Close asChild>
                        <Button>Close</Button>
                      </Drawer.Close>
                    </Drawer.Footer>
                  </Drawer.Content>
                </Drawer.Portal>
              </Drawer.Root>
            </div>
          </article>

          <article className="drawer-customization">
            <div>
              <Text as="h4" variant="title-sm">Consumer hooks</Text>
              <Text as="p" tone="secondary" variant="body-sm">
                Portal-safe class, style, and slot hooks customize a local
                surface without changing Drawer behavior.
              </Text>
              <pre
                aria-label="Drawer consumer hook example"
                tabIndex={0}
              >
                <code>{`.brick-drawer-content.dashed-drawer {
  border-style: dashed;
}

<Drawer.Content
  className="dashed-drawer"
  data-slot="custom-drawer"
  style={{ borderWidth: "0.125rem" }}
>
  <Drawer.Header data-slot="custom-drawer-header">
    <Drawer.Title>Consumer hooks</Drawer.Title>
    <Drawer.Description>Class, style, and slot overrides.</Drawer.Description>
  </Drawer.Header>
  <Drawer.Body>Customized surface content.</Drawer.Body>
  <Drawer.Footer>
    <Drawer.Close asChild><Button>Close</Button></Drawer.Close>
  </Drawer.Footer>
</Drawer.Content>`}</code>
              </pre>
            </div>
            <div className="drawer-customization__preview">
              <Drawer.Root>
                <Drawer.Trigger asChild>
                  <Button>Open consumer hooks</Button>
                </Drawer.Trigger>
                <Drawer.Portal>
                  <Drawer.Overlay />
                  <Drawer.Content
                    className="dashed-drawer"
                    data-slot="custom-drawer"
                    style={{ borderWidth: "0.125rem" }}
                  >
                    <Drawer.Header data-slot="custom-drawer-header">
                      <Drawer.Title>Consumer hooks</Drawer.Title>
                      <Drawer.Description>
                        Class, style, and slot overrides.
                      </Drawer.Description>
                    </Drawer.Header>
                    <Drawer.Body>
                      Customized surface content.
                    </Drawer.Body>
                    <Drawer.Footer>
                      <Drawer.Close asChild>
                        <Button>Close</Button>
                      </Drawer.Close>
                    </Drawer.Footer>
                  </Drawer.Content>
                </Drawer.Portal>
              </Drawer.Root>
            </div>
          </article>
        </div>
      </Scenario>

      <Scenario {...drawerScenarios[8]}>
        <VStack className="drawer-evidence-stack" data-testid="drawer-stress">
          <EvidenceGroup
            description="Open this default end/medium Drawer at a narrow or short viewport. Body scrolls independently while Header and Footer remain reachable."
            title="Constrained viewport and long Body"
          >
            <div className="drawer-stress-panel">
              <StandardDrawer
                body={
                  <VStack className="drawer-long-copy">
                    {Array.from({ length: 14 }, (_, index) => (
                      <Text as="p" key={index}>
                        Section {index + 1}: long filter guidance remains
                        readable inside the bounded Body region.
                      </Text>
                    ))}
                  </VStack>
                }
                contentTestId="drawer-long-content-surface"
                label="Open long drawer"
                title="Detailed project filters"
              />
            </div>
          </EvidenceGroup>

          <EvidenceGroup
            description="This separate specimen uses genuine Arabic copy and logical start placement. In RTL, start resolves to the physical right edge."
            title="RTL logical placement"
          >
            <div className="drawer-stress-panel" dir="rtl">
              <StandardDrawer
                body={
                  <VStack className="drawer-long-copy">
                    {Array.from({ length: 12 }, (_, index) => (
                      <Text as="p" key={index}>
                        القسم {index + 1}: يبقى المحتوى الطويل داخل منطقة قابلة
                        للتمرير مع مرجع
                        ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.
                      </Text>
                    ))}
                  </VStack>
                }
                contentTestId="drawer-rtl-content"
                description="تظل المرشحات والإجراءات قابلة للوصول داخل السطح المنطقي."
                dir="rtl"
                label="فتح مرشحات مساحة العمل المفصلة"
                placement="start"
                title="فتح مرشحات مساحة العمل المفصلة"
              />
            </div>
          </EvidenceGroup>
        </VStack>
      </Scenario>
    </VStack>
  );
}
