import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import {
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import {
  Grid,
  VStack,
  Button,
  Dialog,
  Field,
  Form,
  Input,
  Text,
  type DialogSize,
} from "@flowstack-ui/brick";
import {
  Scenario,
  type ScenarioDefinition,
} from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import "./dialog.playground.css";

const sizes: DialogSize[] = ["sm", "md", "lg"];
const titleLevels = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;

const tokenCustomization = {
  "--brick-dialog-radius": "0.25rem",
  "--brick-dialog-space": "2rem",
  "--brick-dialog-shadow": "0 1.5rem 4rem rgb(53 46 91 / 35%)",
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
    <VStack as="section" className="dialog-evidence-group">
      <VStack className="dialog-evidence-group__heading">
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
    <EvidenceSurface className="dialog-specimen-cell">
      <SpecimenLabel>{label}</SpecimenLabel>
      <div className="dialog-specimen-cell__preview">{children}</div>
    </EvidenceSurface>
  );
}

function StandardDialog({
  body = "The same focused task makes the selected Dialog behavior easier to compare.",
  contentTestId,
  description = "Update the information visible to your team.",
  dir,
  label,
  size,
  title = "Project settings",
}: {
  body?: ReactNode;
  contentTestId?: string;
  description?: string;
  dir?: "ltr" | "rtl";
  label: string;
  size?: DialogSize;
  title?: string;
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>{label}</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content
          data-testid={contentTestId}
          dir={dir}
          size={size}
        >
          <Dialog.Header>
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Description>{description}</Dialog.Description>
          </Dialog.Header>
          <Dialog.Body>{body}</Dialog.Body>
          <Dialog.Footer>
            <Dialog.Close asChild>
              <Button tone="neutral" variant="outline">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button>Save changes</Button>
            </Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function ScopedDialog({
  appearance,
}: {
  appearance: "light" | "dark";
}) {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const label = `${appearance === "light" ? "Light" : "Dark"} scoped dialog`;

  return (
    <EvidenceSurface
      className="dialog-appearance-panel"
      data-brick-appearance={appearance}
      ref={setContainer}
    >
      <span>{appearance === "light" ? "Light" : "Dark"} scope</span>
      {container ? (
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button>{label}</Button>
          </Dialog.Trigger>
          <Dialog.Portal container={container}>
            <Dialog.Overlay />
            <Dialog.Content size="sm">
              <Dialog.Header>
                <Dialog.Title>{label}</Dialog.Title>
                <Dialog.Description>
                  A custom portal container preserves this local token scope.
                </Dialog.Description>
              </Dialog.Header>
              <Dialog.Body>
                The modal behavior remains owned by the same Dialog Root.
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.Close asChild>
                  <Button>Close</Button>
                </Dialog.Close>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      ) : null}
    </EvidenceSurface>
  );
}

function BranchDialog() {
  const [branchOpen, setBranchOpen] = useState(false);

  return (
    <Dialog.Root onOpenChange={(open) => !open && setBranchOpen(false)}>
      <Dialog.Trigger asChild>
        <Button>Open branch example</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Registered portal branch</Dialog.Title>
            <Dialog.Description>
              A third-party portal can remain inside the active modal boundary.
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Body>
            <Button onPress={() => setBranchOpen(true)}>
              Open portalled panel
            </Button>
            {branchOpen
              ? createPortal(
                  <Dialog.Branch asChild>
                    <aside
                      aria-label="Registered portalled panel"
                      className="dialog-branch-panel"
                    >
                      <Text weight="semibold">Registered branch</Text>
                      <Text as="p" tone="secondary" variant="body-sm">Focus remains owned by the active Dialog.</Text>
                      <Button onPress={() => setBranchOpen(false)}>
                        Close portalled panel
                      </Button>
                    </aside>
                  </Dialog.Branch>,
                  document.body,
                )
              : null}
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.Close asChild>
              <Button>Close dialog</Button>
            </Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export const dialogScenarios = [
  {
    description:
      "Dialog’s canonical rendering is a centered medium modal with a visible h2 title, optional description, bounded body, and explicit actions. Open it to inspect the default finished anatomy and focus behavior.",
    id: "dialog.overview",
    number: 1,
    title: "Overview",
  },
  {
    description:
      "Size changes only the preferred maximum inline measure and coordinated inset. Every Dialog keeps identical content, the default modal treatment, and the same centered viewport behavior.",
    id: "dialog.sizes",
    number: 2,
    title: "Sizes",
  },
  {
    description:
      "Dialog renders only the regions the consumer authors. Compare the minimum named surface, a descriptive task, and the complete Header, Body, and Footer composition.",
    id: "dialog.anatomy",
    number: 3,
    title: "Anatomy",
  },
  {
    description:
      "Title supports h1 through h6 without changing Dialog’s default size or presentation. The selected native heading remains the generated accessible name.",
    id: "dialog.semantics",
    navigationTitle: "Semantics",
    number: 4,
    title: "Title semantics",
  },
  {
    description:
      "Default dismissal reports its reason, a disabled Root makes its composed trigger unavailable, and a disabled Overlay requires an explicit close action.",
    id: "dialog.states",
    navigationTitle: "States",
    number: 5,
    title: "States and dismissal",
  },
  {
    description:
      "Nested modal layers and registered third-party portals preserve Dialog ownership. Trigger and Close controls continue to use ordinary Brick Button composition.",
    id: "dialog.composition",
    navigationTitle: "Composition",
    number: 6,
    title: "Composition and modal ownership",
  },
  {
    description:
      "A same-document portal container preserves a local appearance scope without changing the document-wide review setting or Dialog’s default modal behavior.",
    id: "dialog.appearance",
    navigationTitle: "Theme",
    number: 7,
    title: "Appearance and portal scopes",
  },
  {
    description:
      "Public Dialog tokens and native consumer hooks customize one surface without changing its default size, anatomy, focus, dismissal, or portal behavior.",
    id: "dialog.customization",
    navigationTitle: "Customization",
    number: 8,
    title: "Customization",
  },
  {
    description:
      "A long Body scrolls within the viewport while Header and Footer remain reachable. Genuine RTL content inherits logical alignment independently from the constrained mobile stress case.",
    id: "dialog.stress",
    navigationTitle: "Stress",
    number: 9,
    title: "Responsive and RTL",
  },
] as const satisfies readonly ScenarioDefinition[];

export function DialogPage() {
  const [eventLog, setEventLog] = useState("No dialog event yet");

  return (
    <VStack
      className="dialog-page"
      data-component-page="dialog"
      data-testid="dialog-workbench"
    >
      <Scenario {...dialogScenarios[0]}>
        <EvidenceSurface className="dialog-overview" data-testid="dialog-overview" inset="lg">
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button>Edit profile</Button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay />
              <Dialog.Content data-testid="dialog-overview-content">
                <Dialog.Header>
                  <Dialog.Title>Edit profile</Dialog.Title>
                  <Dialog.Description>
                    Update the information visible to your team.
                  </Dialog.Description>
                </Dialog.Header>
                <Dialog.Body>
                  <Form
                    aria-label="Profile details"
                    className="dialog-profile-form"
                    onSubmit={() => undefined}
                    preventDefaultOnSubmit
                  >
                    <Field.Root id="dialog-display-name">
                      <Field.Label>Display name</Field.Label>
                      <Input
                        defaultValue="Ada Lovelace"
                        id="dialog-display-name-control"
                        name="displayName"
                      />
                    </Field.Root>
                    <Field.Root id="dialog-team-role">
                      <Field.Label>Team role</Field.Label>
                      <Input
                        defaultValue="Product engineer"
                        id="dialog-team-role-control"
                        name="teamRole"
                      />
                    </Field.Root>
                  </Form>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.Close asChild>
                    <Button tone="neutral" variant="outline">
                      Cancel
                    </Button>
                  </Dialog.Close>
                  <Dialog.Close asChild>
                    <Button>Save changes</Button>
                  </Dialog.Close>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </EvidenceSurface>
      </Scenario>

      <Scenario {...dialogScenarios[1]}>
        <Grid.Root columns={3}
          className="dialog-specimen-grid dialog-specimen-grid--three"
          data-testid="dialog-sizes"
        >
          {sizes.map((size) => (
            <SpecimenCell key={size} label={size}>
              <StandardDialog
                contentTestId={`dialog-size-${size}`}
                label={`Open ${size} dialog`}
                size={size}
              />
            </SpecimenCell>
          ))}
        </Grid.Root>
      </Scenario>

      <Scenario {...dialogScenarios[2]}>
        <Grid.Root columns={3}
          className="dialog-specimen-grid dialog-specimen-grid--three"
          data-testid="dialog-anatomy"
        >
          <SpecimenCell label="Title">
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button>Open named surface</Button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay />
                <Dialog.Content data-testid="dialog-anatomy-title">
                  <Dialog.Title>Named surface</Dialog.Title>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </SpecimenCell>

          <SpecimenCell label="Header + Body">
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button>Open descriptive task</Button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay />
                <Dialog.Content data-testid="dialog-anatomy-body">
                  <Dialog.Header>
                    <Dialog.Title>Descriptive task</Dialog.Title>
                    <Dialog.Description>
                      Description remains optional but supplies the accessible
                      relationship when authored.
                    </Dialog.Description>
                  </Dialog.Header>
                  <Dialog.Body>Primary task content.</Dialog.Body>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </SpecimenCell>

          <SpecimenCell label="Header + Body + Footer">
            <StandardDialog
              contentTestId="dialog-anatomy-complete"
              label="Inspect dialog anatomy"
            />
          </SpecimenCell>
        </Grid.Root>
      </Scenario>

      <Scenario {...dialogScenarios[3]}>
        <Grid.Root columns={6}
          className="dialog-specimen-grid dialog-specimen-grid--six"
          data-testid="dialog-semantics"
        >
          {titleLevels.map((level) => (
            <SpecimenCell key={level} label={level}>
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <Button>Open {level} title</Button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay />
                  <Dialog.Content data-testid={`dialog-title-${level}`}>
                    <Dialog.Header>
                      <Dialog.Title as={level}>Project settings</Dialog.Title>
                      <Dialog.Description>
                        Native heading semantics with default Dialog styling.
                      </Dialog.Description>
                    </Dialog.Header>
                    <Dialog.Body>Dialog content remains unchanged.</Dialog.Body>
                    <Dialog.Footer>
                      <Dialog.Close asChild>
                        <Button>Close</Button>
                      </Dialog.Close>
                    </Dialog.Footer>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </SpecimenCell>
          ))}
        </Grid.Root>
      </Scenario>

      <Scenario {...dialogScenarios[4]}>
        <VStack className="dialog-evidence-stack">
          <EvidenceGroup
            description="Escape, the exact Overlay target, and explicit Close controls update the same public close-reason callback."
            title="Dismissal reasons"
          >
            <EvidenceSurface className="dialog-action-panel" inset="lg">
              <Dialog.Root
                onOpenChange={(open, reason) =>
                  setEventLog(
                    open ? "Opened" : `Closed: ${reason ?? "controlled"}`,
                  )
                }
              >
                <Dialog.Trigger asChild>
                  <Button>Open event dialog</Button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay />
                  <Dialog.Content>
                    <Dialog.Header>
                      <Dialog.Title>Dismissal evidence</Dialog.Title>
                      <Dialog.Description>
                        Try Escape, the scrim, Cancel, or Save.
                      </Dialog.Description>
                    </Dialog.Header>
                    <Dialog.Body>
                      Only the top active modal responds.
                    </Dialog.Body>
                    <Dialog.Footer>
                      <Dialog.Close asChild>
                        <Button tone="neutral" variant="outline">
                          Cancel
                        </Button>
                      </Dialog.Close>
                      <Dialog.Close asChild>
                        <Button>Save</Button>
                      </Dialog.Close>
                    </Dialog.Footer>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
              <output aria-live="polite" className="dialog-event-log">
                {eventLog}
              </output>
            </EvidenceSurface>
          </EvidenceGroup>

          <EvidenceGroup
            description="These are separate Root policies: disabled prevents opening, while Overlay disabled preserves the active Dialog until an explicit Close."
            title="Unavailable and persistent states"
          >
            <Grid.Root columns={2} className="dialog-specimen-grid dialog-specimen-grid--two">
              <SpecimenCell label="disabled Root">
                <Dialog.Root disabled>
                  <Dialog.Trigger asChild>
                    <Button>Unavailable dialog</Button>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay />
                    <Dialog.Content aria-label="Unavailable content">
                      Unavailable content
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
              </SpecimenCell>
              <SpecimenCell label="disabled Overlay">
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <Button>Open overlay-disabled dialog</Button>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay disabled />
                    <Dialog.Content>
                      <Dialog.Header>
                        <Dialog.Title>
                          Overlay dismissal disabled
                        </Dialog.Title>
                        <Dialog.Description>
                          The scrim cannot dismiss this Dialog.
                        </Dialog.Description>
                      </Dialog.Header>
                      <Dialog.Body>
                        Use the explicit close control to leave.
                      </Dialog.Body>
                      <Dialog.Footer>
                        <Dialog.Close asChild>
                          <Button>Close persistent dialog</Button>
                        </Dialog.Close>
                      </Dialog.Footer>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
              </SpecimenCell>
            </Grid.Root>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...dialogScenarios[5]}>
        <Grid.Root columns={2}
          className="dialog-specimen-grid dialog-specimen-grid--two"
          data-testid="dialog-composition"
        >
          <SpecimenCell label="nested modal">
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button>Open parent dialog</Button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay />
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Parent settings</Dialog.Title>
                    <Dialog.Description>
                      The child Dialog is a separate modal layer.
                    </Dialog.Description>
                  </Dialog.Header>
                  <Dialog.Body>
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <Button>Open nested dialog</Button>
                      </Dialog.Trigger>
                      <Dialog.Portal>
                        <Dialog.Overlay />
                        <Dialog.Content>
                          <Dialog.Header>
                            <Dialog.Title>Nested confirmation</Dialog.Title>
                            <Dialog.Description>
                              Escape closes this top layer first.
                            </Dialog.Description>
                          </Dialog.Header>
                          <Dialog.Body>
                            Parent focus remains owned but inactive.
                          </Dialog.Body>
                          <Dialog.Footer>
                            <Dialog.Close asChild>
                              <Button>Done</Button>
                            </Dialog.Close>
                          </Dialog.Footer>
                        </Dialog.Content>
                      </Dialog.Portal>
                    </Dialog.Root>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.Close asChild>
                      <Button>Close parent</Button>
                    </Dialog.Close>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </SpecimenCell>
          <SpecimenCell label="registered portal branch">
            <BranchDialog />
          </SpecimenCell>
        </Grid.Root>
      </Scenario>

      <Scenario {...dialogScenarios[6]}>
        <Grid.Root columns={2}
          className="dialog-scoped-appearance-grid"
          data-testid="dialog-appearance"
        >
          <ScopedDialog appearance="light" />
          <ScopedDialog appearance="dark" />
        </Grid.Root>
      </Scenario>

      <Scenario {...dialogScenarios[7]}>
        <div className="dialog-customization-list">
          <EvidenceSurface as="article" className="dialog-customization" inset="lg">
            <div>
              <Text as="h4" variant="title-sm">Component CSS properties</Text>
              <Text as="p" tone="secondary" variant="body-sm">
                Public Dialog tokens change spacing, radius, and elevation
                for this surface only.
              </Text>
              <PlaygroundCodeBlock
                aria-label="Dialog component token example"
                tabIndex={0}
              >{`<Dialog.Content
  style={{
    "--brick-dialog-radius": "0.25rem",
    "--brick-dialog-space": "2rem",
    "--brick-dialog-shadow": "0 1.5rem 4rem rgb(53 46 91 / 35%)"
  }}
>
  <Dialog.Header>
    <Dialog.Title>Component CSS properties</Dialog.Title>
    <Dialog.Description>Local Dialog token overrides.</Dialog.Description>
  </Dialog.Header>
  <Dialog.Body>Customized surface content.</Dialog.Body>
  <Dialog.Footer>
    <Dialog.Close asChild><Button>Close</Button></Dialog.Close>
  </Dialog.Footer>
</Dialog.Content>`}</PlaygroundCodeBlock>
            </div>
            <div className="dialog-customization__preview">
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <Button>Open token customization</Button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay />
                  <Dialog.Content
                    data-testid="dialog-token-customization"
                    style={tokenCustomization}
                  >
                    <Dialog.Header>
                      <Dialog.Title>
                        Component CSS properties
                      </Dialog.Title>
                      <Dialog.Description>
                        Local Dialog token overrides.
                      </Dialog.Description>
                    </Dialog.Header>
                    <Dialog.Body>
                      Customized surface content.
                    </Dialog.Body>
                    <Dialog.Footer>
                      <Dialog.Close asChild>
                        <Button>Close</Button>
                      </Dialog.Close>
                    </Dialog.Footer>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
          </EvidenceSurface>

          <EvidenceSurface as="article" className="dialog-customization" inset="lg">
            <div>
              <Text as="h4" variant="title-sm">Consumer hooks</Text>
              <Text as="p" tone="secondary" variant="body-sm">
                className, style, and data-slot pass through for direct
                local targeting without changing the Dialog API.
              </Text>
              <PlaygroundCodeBlock
                aria-label="Dialog consumer hook example"
                tabIndex={0}
              >{`.brick-dialog-content.dashed-dialog {
  border-style: dashed;
}

<Dialog.Content
  className="dashed-dialog"
  data-slot="custom-dialog"
  style={{ borderWidth: "0.125rem" }}
>
  <Dialog.Header data-slot="custom-dialog-header">
    <Dialog.Title>Consumer hooks</Dialog.Title>
    <Dialog.Description>Class, style, and slot overrides.</Dialog.Description>
  </Dialog.Header>
  <Dialog.Body>Customized surface content.</Dialog.Body>
  <Dialog.Footer>
    <Dialog.Close asChild><Button>Close</Button></Dialog.Close>
  </Dialog.Footer>
</Dialog.Content>`}</PlaygroundCodeBlock>
            </div>
            <div className="dialog-customization__preview">
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <Button>Open consumer hooks</Button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay />
                  <Dialog.Content
                    className="dashed-dialog"
                    data-slot="custom-dialog"
                    style={{ borderWidth: "0.125rem" }}
                  >
                    <Dialog.Header data-slot="custom-dialog-header">
                      <Dialog.Title>Consumer hooks</Dialog.Title>
                      <Dialog.Description>
                        Class, style, and slot overrides.
                      </Dialog.Description>
                    </Dialog.Header>
                    <Dialog.Body>
                      Customized surface content.
                    </Dialog.Body>
                    <Dialog.Footer>
                      <Dialog.Close asChild>
                        <Button>Close</Button>
                      </Dialog.Close>
                    </Dialog.Footer>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
          </EvidenceSurface>
        </div>
      </Scenario>

      <Scenario {...dialogScenarios[8]}>
        <VStack className="dialog-evidence-stack" data-testid="dialog-stress">
          <EvidenceGroup
            description="Open this Dialog at a narrow or short viewport. Only Body scrolls; the default Header and Footer remain visible inside the bounded surface."
            title="Constrained viewport and long Body"
          >
            <EvidenceSurface
              className="dialog-stress-panel"
              data-testid="dialog-long-content"
            >
              <StandardDialog
                body={
                  <VStack className="dialog-long-copy">
                    {Array.from({ length: 12 }, (_, index) => (
                      <Text as="p" key={index}>
                        Section {index + 1}: realistic content remains
                        readable, wraps naturally, and stays inside the bounded
                        Body region.
                      </Text>
                    ))}
                  </VStack>
                }
                contentTestId="dialog-long-content-surface"
                label="Open long mobile dialog"
                title="Long content task"
              />
            </EvidenceSurface>
          </EvidenceGroup>

          <EvidenceGroup
            description="This separate specimen uses genuine Arabic copy and explicit RTL direction. Logical alignment changes without changing source or focus order."
            title="RTL inheritance"
          >
            <EvidenceSurface className="dialog-stress-panel" dir="rtl">
              <StandardDialog
                body="مرجع طويل غير منقطع: ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                contentTestId="dialog-rtl-content"
                description="يتكيف المحتوى من اليمين إلى اليسار دون تغيير ترتيب المصدر."
                dir="rtl"
                label="فتح إعدادات مساحة العمل المفصلة"
                title="فتح إعدادات مساحة العمل المفصلة"
              />
            </EvidenceSurface>
          </EvidenceGroup>
        </VStack>
      </Scenario>
    </VStack>
  );
}
