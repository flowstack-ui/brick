import {
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  Grid,
  VStack,
  AlertDialog,
  Button,
  Dialog,
  Text,
  type AlertDialogSize,
} from "@flowstack-ui/brick";
import {
  Scenario,
  type ScenarioDefinition,
} from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import "./alert-dialog.playground.css";

const sizes: AlertDialogSize[] = ["sm", "md"];
const titleLevels = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;

const tokenCustomization = {
  "--brick-alert-dialog-radius": "0.25rem",
  "--brick-alert-dialog-space": "2rem",
  "--brick-alert-dialog-shadow":
    "0 1.5rem 4rem rgb(53 46 91 / 35%)",
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
    <VStack as="section" className="alert-dialog-evidence-group">
      <VStack className="alert-dialog-evidence-group__heading">
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
    <EvidenceSurface className="alert-dialog-specimen-cell">
      <SpecimenLabel>{label}</SpecimenLabel>
      <div className="alert-dialog-specimen-cell__preview">{children}</div>
    </EvidenceSurface>
  );
}

function StandardAlertDialog({
  body,
  contentTestId,
  description = "This permanently removes the selected project and cannot be undone.",
  dir,
  label,
  size,
  title = "Delete project?",
}: {
  body?: ReactNode;
  contentTestId?: string;
  description?: string;
  dir?: "ltr" | "rtl";
  label: string;
  size?: AlertDialogSize;
  title?: string;
}) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <Button>{label}</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay />
        <AlertDialog.Content
          data-testid={contentTestId}
          dir={dir}
          size={size}
        >
          <AlertDialog.Header>
            <AlertDialog.Title>{title}</AlertDialog.Title>
            <AlertDialog.Description>{description}</AlertDialog.Description>
          </AlertDialog.Header>
          {body !== undefined ? (
            <AlertDialog.Body>{body}</AlertDialog.Body>
          ) : null}
          <AlertDialog.Footer>
            <AlertDialog.Cancel asChild>
              <Button tone="neutral" variant="outline">
                Keep project
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button tone="danger">Delete project</Button>
            </AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

function ScopedAlertDialog({
  appearance,
}: {
  appearance: "light" | "dark";
}) {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const label = `${appearance === "light" ? "Light" : "Dark"} decision`;

  return (
    <EvidenceSurface
      className="alert-dialog-appearance-panel"
      data-brick-appearance={appearance}
      ref={setContainer}
    >
      <span>{appearance === "light" ? "Light" : "Dark"} scope</span>
      {container ? (
        <AlertDialog.Root>
          <AlertDialog.Trigger asChild>
            <Button>{label}</Button>
          </AlertDialog.Trigger>
          <AlertDialog.Portal container={container}>
            <AlertDialog.Overlay />
            <AlertDialog.Content>
              <AlertDialog.Header>
                <AlertDialog.Title>{label}</AlertDialog.Title>
                <AlertDialog.Description>
                  A custom portal container preserves this local token scope.
                </AlertDialog.Description>
              </AlertDialog.Header>
              <AlertDialog.Footer>
                <AlertDialog.Cancel asChild>
                  <Button tone="neutral" variant="outline">
                    Cancel
                  </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action asChild>
                  <Button>Continue</Button>
                </AlertDialog.Action>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      ) : null}
    </EvidenceSurface>
  );
}

export const alertDialogScenarios = [
  {
    description:
      "AlertDialog’s canonical rendering is a medium, centered destructive decision with a visible h2 title, required alert message, safe Cancel response, and explicit danger-styled Action.",
    id: "alert-dialog.overview",
    number: 1,
    title: "Overview",
  },
  {
    description:
      "Size changes only preferred maximum inline measure and coordinated inset. Both specimens keep identical content, response order, and AlertDialog’s neutral modal surface.",
    id: "alert-dialog.sizes",
    number: 2,
    title: "Sizes",
  },
  {
    description:
      "Description or an explicit native description relationship supplies the required alert message; Body remains optional, one-action acknowledgement is valid, and Title supports h1 through h6.",
    id: "alert-dialog.anatomy",
    number: 3,
    title: "Anatomy and semantics",
  },
  {
    description:
      "Cancel and Action report distinct outcomes, backdrop dismissal stays blocked, Escape can be disabled, a disabled Root cannot open, and prevented Action closure remains application-owned.",
    id: "alert-dialog.states",
    navigationTitle: "States",
    number: 4,
    title: "Decisions and state",
  },
  {
    description:
      "A child AlertDialog becomes the only active modal above an ordinary Dialog, then Cancel returns focus and control to the parent workflow.",
    id: "alert-dialog.nesting",
    navigationTitle: "Nesting",
    number: 5,
    title: "Nested workflow",
  },
  {
    description:
      "A same-document portal container preserves a local appearance scope without changing the global review setting, alert semantics, or default AlertDialog recipe.",
    id: "alert-dialog.appearance",
    navigationTitle: "Theme",
    number: 6,
    title: "Appearance and portal scopes",
  },
  {
    description:
      "Public AlertDialog tokens and native consumer hooks customize one surface, while destructive meaning remains on the explicitly composed Action Button.",
    id: "alert-dialog.customization",
    navigationTitle: "Customization",
    number: 7,
    title: "Customization",
  },
  {
    description:
      "A long optional Body scrolls within the bounded surface while the concise required message, safe Cancel, and explicit Action remain reachable.",
    id: "alert-dialog.responsive",
    navigationTitle: "Responsive",
    number: 8,
    title: "Responsive and long detail",
  },
  {
    description:
      "Genuine Arabic copy, an unbroken project reference, and explicit RTL direction remain contained without changing Cancel-then-Action source or focus order.",
    id: "alert-dialog.stress",
    navigationTitle: "RTL",
    number: 9,
    title: "Localization and RTL",
  },
] as const satisfies readonly ScenarioDefinition[];

export function AlertDialogPage() {
  const [decisionLog, setDecisionLog] = useState("No decision yet");

  return (
    <VStack
      className="alert-dialog-page"
      data-component-page="alert-dialog"
      data-testid="alert-dialog-workbench"
    >
      <Scenario {...alertDialogScenarios[0]}>
        <EvidenceSurface
          className="alert-dialog-overview"
          data-testid="alert-dialog-overview"
          inset="lg"
        >
          <StandardAlertDialog
            contentTestId="alert-dialog-overview-content"
            label="Delete project?"
          />
        </EvidenceSurface>
      </Scenario>

      <Scenario {...alertDialogScenarios[1]}>
        <Grid.Root columns={2}
          className="alert-dialog-specimen-grid alert-dialog-specimen-grid--two"
          data-testid="alert-dialog-sizes"
        >
          {sizes.map((size) => (
            <SpecimenCell key={size} label={size}>
              <StandardAlertDialog
                contentTestId={`alert-dialog-size-${size}`}
                label={`Open ${size} decision`}
                size={size}
              />
            </SpecimenCell>
          ))}
        </Grid.Root>
      </Scenario>

      <Scenario {...alertDialogScenarios[2]}>
        <VStack className="alert-dialog-evidence-stack">
          <EvidenceGroup
            description="These valid compositions differ only in the authored message/detail path. AlertDialog never generates missing regions or response copy."
            title="Authored regions"
          >
            <Grid.Root columns={4}
              className="alert-dialog-specimen-grid alert-dialog-specimen-grid--four"
              data-testid="alert-dialog-anatomy"
            >
              <SpecimenCell label="Description + responses">
                <StandardAlertDialog label="Open required message" />
              </SpecimenCell>

              <SpecimenCell label="Supplemental Body">
                <StandardAlertDialog
                  body={<Text weight="semibold">Project: Mobile checkout refresh</Text>}
                  contentTestId="alert-dialog-anatomy-body"
                  label="Inspect decision anatomy"
                />
              </SpecimenCell>

              <SpecimenCell label="native aria-describedby">
                <AlertDialog.Root>
                  <AlertDialog.Trigger asChild>
                    <Button>Open native relationship</Button>
                  </AlertDialog.Trigger>
                  <AlertDialog.Portal>
                    <AlertDialog.Overlay />
                    <AlertDialog.Content
                      aria-describedby="native-alert-message"
                      data-testid="alert-dialog-native-description"
                    >
                      <AlertDialog.Header>
                        <AlertDialog.Title>
                          Archive workspace?
                        </AlertDialog.Title>
                        <Text as="p" id="native-alert-message">
                          Archived workspaces become read-only for every member.
                        </Text>
                      </AlertDialog.Header>
                      <AlertDialog.Footer>
                        <AlertDialog.Cancel asChild>
                          <Button tone="neutral" variant="outline">
                            Keep active
                          </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                          <Button>Archive workspace</Button>
                        </AlertDialog.Action>
                      </AlertDialog.Footer>
                    </AlertDialog.Content>
                  </AlertDialog.Portal>
                </AlertDialog.Root>
              </SpecimenCell>

              <SpecimenCell label="single acknowledgement">
                <AlertDialog.Root>
                  <AlertDialog.Trigger asChild>
                    <Button>Open acknowledgement</Button>
                  </AlertDialog.Trigger>
                  <AlertDialog.Portal>
                    <AlertDialog.Overlay />
                    <AlertDialog.Content data-testid="alert-dialog-acknowledgement">
                      <AlertDialog.Header>
                        <AlertDialog.Title>
                          Session access changed
                        </AlertDialog.Title>
                        <AlertDialog.Description>
                          Your administrator now requires a new sign-in.
                        </AlertDialog.Description>
                      </AlertDialog.Header>
                      <AlertDialog.Footer>
                        <AlertDialog.Action asChild>
                          <Button>Continue to sign in</Button>
                        </AlertDialog.Action>
                      </AlertDialog.Footer>
                    </AlertDialog.Content>
                  </AlertDialog.Portal>
                </AlertDialog.Root>
              </SpecimenCell>
            </Grid.Root>
          </EvidenceGroup>

          <EvidenceGroup
            description="Only the native Title heading element changes; every decision retains the default medium size and identical message."
            title="Title levels"
          >
            <Grid.Root columns={6}
              className="alert-dialog-specimen-grid alert-dialog-specimen-grid--six"
              data-testid="alert-dialog-semantics"
            >
              {titleLevels.map((level) => (
                <SpecimenCell key={level} label={level}>
                  <AlertDialog.Root>
                    <AlertDialog.Trigger asChild>
                      <Button>Open {level} decision</Button>
                    </AlertDialog.Trigger>
                    <AlertDialog.Portal>
                      <AlertDialog.Overlay />
                      <AlertDialog.Content
                        data-testid={`alert-dialog-title-${level}`}
                      >
                        <AlertDialog.Header>
                          <AlertDialog.Title as={level}>
                            Delete project?
                          </AlertDialog.Title>
                          <AlertDialog.Description>
                            This permanently removes the selected project.
                          </AlertDialog.Description>
                        </AlertDialog.Header>
                        <AlertDialog.Footer>
                          <AlertDialog.Cancel asChild>
                            <Button tone="neutral" variant="outline">
                              Keep project
                            </Button>
                          </AlertDialog.Cancel>
                          <AlertDialog.Action asChild>
                            <Button tone="danger">Delete project</Button>
                          </AlertDialog.Action>
                        </AlertDialog.Footer>
                      </AlertDialog.Content>
                    </AlertDialog.Portal>
                  </AlertDialog.Root>
                </SpecimenCell>
              ))}
            </Grid.Root>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...alertDialogScenarios[3]}>
        <VStack className="alert-dialog-evidence-stack">
          <EvidenceGroup
            description="The callback distinguishes safe cancellation from affirmative action without AlertDialog inventing application behavior."
            title="Decision outcomes"
          >
            <div
              className="alert-dialog-action-panel"
              data-testid="alert-dialog-decisions"
            >
              <AlertDialog.Root
                onOpenChange={(open, reason) => {
                  if (!open) {
                    setDecisionLog(
                      reason === "cancelClick"
                        ? "Closed: cancel"
                        : reason === "actionClick"
                          ? "Closed: action"
                          : `Closed: ${reason ?? "controlled"}`,
                    );
                  }
                }}
              >
                <AlertDialog.Trigger asChild>
                  <Button>Open tracked decision</Button>
                </AlertDialog.Trigger>
                <AlertDialog.Portal>
                  <AlertDialog.Overlay />
                  <AlertDialog.Content>
                    <AlertDialog.Header>
                      <AlertDialog.Title>
                        Remove tracked project?
                      </AlertDialog.Title>
                      <AlertDialog.Description>
                        This action records the exact decision reason.
                      </AlertDialog.Description>
                    </AlertDialog.Header>
                    <AlertDialog.Footer>
                      <AlertDialog.Cancel asChild>
                        <Button tone="neutral" variant="outline">
                          Cancel tracked decision
                        </Button>
                      </AlertDialog.Cancel>
                      <AlertDialog.Action asChild>
                        <Button tone="danger">
                          Confirm tracked decision
                        </Button>
                      </AlertDialog.Action>
                    </AlertDialog.Footer>
                  </AlertDialog.Content>
                </AlertDialog.Portal>
              </AlertDialog.Root>
              <output
                aria-live="polite"
                className="alert-dialog-event-log"
              >
                {decisionLog}
              </output>
            </div>
          </EvidenceGroup>

          <EvidenceGroup
            description="Each cell isolates one public policy: explicit response, unavailable opening, or application-controlled pending work."
            title="Policy states"
          >
            <Grid.Root columns={3} className="alert-dialog-specimen-grid alert-dialog-specimen-grid--three">
              <SpecimenCell label="Escape disabled">
                <AlertDialog.Root closeOnEscape={false}>
                  <AlertDialog.Trigger asChild>
                    <Button>Open Escape-disabled decision</Button>
                  </AlertDialog.Trigger>
                  <AlertDialog.Portal>
                    <AlertDialog.Overlay />
                    <AlertDialog.Content>
                      <AlertDialog.Header>
                        <AlertDialog.Title>
                          Explicit response required
                        </AlertDialog.Title>
                        <AlertDialog.Description>
                          Escape and the scrim cannot close this decision.
                        </AlertDialog.Description>
                      </AlertDialog.Header>
                      <AlertDialog.Footer>
                        <AlertDialog.Cancel asChild>
                          <Button tone="neutral" variant="outline">
                            Close explicit decision
                          </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                          <Button>Continue explicitly</Button>
                        </AlertDialog.Action>
                      </AlertDialog.Footer>
                    </AlertDialog.Content>
                  </AlertDialog.Portal>
                </AlertDialog.Root>
              </SpecimenCell>

              <SpecimenCell label="disabled Root">
                <AlertDialog.Root disabled>
                  <AlertDialog.Trigger asChild>
                    <Button>Unavailable decision</Button>
                  </AlertDialog.Trigger>
                </AlertDialog.Root>
              </SpecimenCell>

              <SpecimenCell label="prevented Action">
                <AlertDialog.Root>
                  <AlertDialog.Trigger asChild>
                    <Button>Open pending decision</Button>
                  </AlertDialog.Trigger>
                  <AlertDialog.Portal>
                    <AlertDialog.Overlay />
                    <AlertDialog.Content>
                      <AlertDialog.Header>
                        <AlertDialog.Title>
                          Start asynchronous removal?
                        </AlertDialog.Title>
                        <AlertDialog.Description>
                          The Action stays open while application work is
                          pending.
                        </AlertDialog.Description>
                      </AlertDialog.Header>
                      <AlertDialog.Footer>
                        <AlertDialog.Cancel asChild>
                          <Button tone="neutral" variant="outline">
                            Cancel pending decision
                          </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action
                          asChild
                          onClick={(event) => {
                            event.preventDefault();
                            setDecisionLog("Pending action kept open");
                          }}
                        >
                          <Button tone="danger">
                            Start pending action
                          </Button>
                        </AlertDialog.Action>
                      </AlertDialog.Footer>
                    </AlertDialog.Content>
                  </AlertDialog.Portal>
                </AlertDialog.Root>
              </SpecimenCell>
            </Grid.Root>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...alertDialogScenarios[4]}>
        <div
          className="alert-dialog-action-panel"
          data-testid="alert-dialog-nested"
        >
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button>Edit draft project</Button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay />
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Edit draft project</Dialog.Title>
                  <Dialog.Description>
                    Closing with unsaved work requires a separate decision.
                  </Dialog.Description>
                </Dialog.Header>
                <Dialog.Body>
                  <AlertDialog.Root>
                    <AlertDialog.Trigger asChild>
                      <Button tone="danger" variant="outline">
                        Discard draft
                      </Button>
                    </AlertDialog.Trigger>
                    <AlertDialog.Portal>
                      <AlertDialog.Overlay />
                      <AlertDialog.Content>
                        <AlertDialog.Header>
                          <AlertDialog.Title>
                            Discard draft?
                          </AlertDialog.Title>
                          <AlertDialog.Description>
                            Unsaved project changes will be lost.
                          </AlertDialog.Description>
                        </AlertDialog.Header>
                        <AlertDialog.Footer>
                          <AlertDialog.Cancel asChild>
                            <Button tone="neutral" variant="outline">
                              Keep editing draft
                            </Button>
                          </AlertDialog.Cancel>
                          <AlertDialog.Action asChild>
                            <Button tone="danger">
                              Discard draft changes
                            </Button>
                          </AlertDialog.Action>
                        </AlertDialog.Footer>
                      </AlertDialog.Content>
                    </AlertDialog.Portal>
                  </AlertDialog.Root>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.Close asChild>
                    <Button>Finish editing</Button>
                  </Dialog.Close>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </Scenario>

      <Scenario {...alertDialogScenarios[5]}>
        <Grid.Root columns={2}
          className="alert-dialog-scoped-appearance-grid"
          data-testid="alert-dialog-appearance"
        >
          <ScopedAlertDialog appearance="light" />
          <ScopedAlertDialog appearance="dark" />
        </Grid.Root>
      </Scenario>

      <Scenario {...alertDialogScenarios[6]}>
        <div className="alert-dialog-customization-list">
          <EvidenceSurface as="article" className="alert-dialog-customization" inset="lg">
            <div>
              <Text as="h4" variant="title-sm">Component CSS properties</Text>
              <Text as="p" tone="secondary" variant="body-sm">
                Public AlertDialog tokens change spacing, radius, and elevation
                for this surface only.
              </Text>
              <pre
                aria-label="AlertDialog component token example"
                tabIndex={0}
              >
                <code>{`<AlertDialog.Content
  style={{
    "--brick-alert-dialog-radius": "0.25rem",
    "--brick-alert-dialog-space": "2rem",
    "--brick-alert-dialog-shadow": "0 1.5rem 4rem rgb(53 46 91 / 35%)"
  }}
>
  <AlertDialog.Header>
    <AlertDialog.Title>Component CSS properties</AlertDialog.Title>
    <AlertDialog.Description>Local token overrides.</AlertDialog.Description>
  </AlertDialog.Header>
  <AlertDialog.Footer>
    <AlertDialog.Cancel asChild><Button>Cancel</Button></AlertDialog.Cancel>
    <AlertDialog.Action asChild><Button tone="danger">Remove</Button></AlertDialog.Action>
  </AlertDialog.Footer>
</AlertDialog.Content>`}</code>
              </pre>
            </div>
            <div className="alert-dialog-customization__preview">
              <AlertDialog.Root>
                <AlertDialog.Trigger asChild>
                  <Button>Open token customization</Button>
                </AlertDialog.Trigger>
                <AlertDialog.Portal>
                  <AlertDialog.Overlay />
                  <AlertDialog.Content
                    data-testid="alert-dialog-token-customization"
                    style={tokenCustomization}
                  >
                    <AlertDialog.Header>
                      <AlertDialog.Title>
                        Component CSS properties
                      </AlertDialog.Title>
                      <AlertDialog.Description>
                        Local token overrides.
                      </AlertDialog.Description>
                    </AlertDialog.Header>
                    <AlertDialog.Footer>
                      <AlertDialog.Cancel asChild>
                        <Button>Cancel</Button>
                      </AlertDialog.Cancel>
                      <AlertDialog.Action asChild>
                        <Button tone="danger">Remove</Button>
                      </AlertDialog.Action>
                    </AlertDialog.Footer>
                  </AlertDialog.Content>
                </AlertDialog.Portal>
              </AlertDialog.Root>
            </div>
          </EvidenceSurface>

          <EvidenceSurface as="article" className="alert-dialog-customization" inset="lg">
            <div>
              <Text as="h4" variant="title-sm">Consumer hooks and Button tone</Text>
              <Text as="p" tone="secondary" variant="body-sm">
                Portal-safe class, style, and slot hooks customize the surface;
                the composed Action Button owns danger presentation.
              </Text>
              <pre
                aria-label="AlertDialog consumer hook example"
                tabIndex={0}
              >
                <code>{`.brick-alert-dialog-content.dashed-alert-dialog {
  border-style: dashed;
}

<AlertDialog.Content
  className="dashed-alert-dialog"
  data-slot="custom-alert-dialog"
  style={{ borderWidth: "0.125rem" }}
>
  <AlertDialog.Header data-slot="custom-alert-dialog-header">
    <AlertDialog.Title>Consumer hooks</AlertDialog.Title>
    <AlertDialog.Description>Class, style, and slot overrides.</AlertDialog.Description>
  </AlertDialog.Header>
  <AlertDialog.Footer>
    <AlertDialog.Cancel asChild><Button>Cancel</Button></AlertDialog.Cancel>
    <AlertDialog.Action asChild><Button tone="danger">Remove</Button></AlertDialog.Action>
  </AlertDialog.Footer>
</AlertDialog.Content>`}</code>
              </pre>
            </div>
            <div className="alert-dialog-customization__preview">
              <AlertDialog.Root>
                <AlertDialog.Trigger asChild>
                  <Button>Open consumer hooks</Button>
                </AlertDialog.Trigger>
                <AlertDialog.Portal>
                  <AlertDialog.Overlay />
                  <AlertDialog.Content
                    className="dashed-alert-dialog"
                    data-slot="custom-alert-dialog"
                    style={{ borderWidth: "0.125rem" }}
                  >
                    <AlertDialog.Header data-slot="custom-alert-dialog-header">
                      <AlertDialog.Title>Consumer hooks</AlertDialog.Title>
                      <AlertDialog.Description>
                        Class, style, and slot overrides.
                      </AlertDialog.Description>
                    </AlertDialog.Header>
                    <AlertDialog.Footer>
                      <AlertDialog.Cancel asChild>
                        <Button>Cancel</Button>
                      </AlertDialog.Cancel>
                      <AlertDialog.Action asChild>
                        <Button tone="danger">Remove</Button>
                      </AlertDialog.Action>
                    </AlertDialog.Footer>
                  </AlertDialog.Content>
                </AlertDialog.Portal>
              </AlertDialog.Root>
            </div>
          </EvidenceSurface>
        </div>
      </Scenario>

      <Scenario {...alertDialogScenarios[7]}>
        <EvidenceSurface
          className="alert-dialog-stress-panel"
          data-testid="alert-dialog-long-content"
        >
          <StandardAlertDialog
            body={
              <VStack className="alert-dialog-long-copy">
                {Array.from({ length: 12 }, (_, index) => (
                  <Text as="p" key={index}>
                    Consequence {index + 1}: supplemental detail remains
                    readable and contained without replacing the concise alert
                    message.
                  </Text>
                ))}
              </VStack>
            }
            contentTestId="alert-dialog-long-content-surface"
            label="Open long decision"
            title="Delete archived project?"
          />
        </EvidenceSurface>
      </Scenario>

      <Scenario {...alertDialogScenarios[8]}>
        <EvidenceSurface
          className="alert-dialog-stress-panel"
          data-testid="alert-dialog-stress"
          dir="rtl"
        >
          <StandardAlertDialog
            body="مرجع غير منقطع: ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            contentTestId="alert-dialog-rtl-content"
            description="سيؤدي هذا الإجراء إلى حذف المشروع نهائيًا ولا يمكن التراجع عنه."
            dir="rtl"
            label="حذف مشروع مساحة العمل بالتأكيد؟"
            title="حذف مشروع مساحة العمل بالتأكيد؟"
          />
        </EvidenceSurface>
      </Scenario>
    </VStack>
  );
}
