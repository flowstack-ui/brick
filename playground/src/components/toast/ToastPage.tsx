import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import {
  Badge,
  Button,
  Grid,
  Text,
  Toaster,
  VStack,
  toast,
  type ToastPosition,
  type ToastStacking,
  type ToastType,
  type ToastWidth,
} from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import "./toast.playground.css";

const types: ToastType[] = [
  "default",
  "success",
  "error",
  "warning",
  "info",
  "loading",
];
const positions: ToastPosition[] = [
  "top-start",
  "top-center",
  "top-end",
  "bottom-start",
  "bottom-center",
  "bottom-end",
];

const customViewportStyle = {
  "--brick-toast-background": "#fffbeb",
  "--brick-toast-border-color": "#d97706",
  "--brick-toast-accent": "#b45309",
} as CSSProperties;

const typeTone = {
  default: "neutral",
  success: "success",
  error: "danger",
  warning: "warning",
  info: "info",
  loading: "accent",
} as const;

export const toastScenarios = [
  {
    id: "toast.overview",
    number: 1,
    title: "Overview",
    description:
      "Create, update, and dismiss a finished default notification from application actions.",
  },
  {
    id: "toast.types",
    number: 2,
    title: "Types",
    description:
      "Six semantic types retain one stable card geometry and communicate meaning in authored text.",
  },
  {
    id: "toast.content",
    number: 3,
    title: "Content and actions",
    navigationTitle: "Content",
    description:
      "Title, description, custom icon, optional action, close policy, and persistent content use the same public anatomy.",
  },
  {
    id: "toast.queue",
    number: 4,
    title: "Lifecycle and queue",
    navigationTitle: "Queue",
    description:
      "Three visible cards, separated or overlapping, preserve Atom-owned timing and queue promotion.",
  },
  {
    id: "toast.positions",
    number: 5,
    title: "Logical positions",
    navigationTitle: "Positions",
    description:
      "Each logical position has an independent labelled trigger; start and end follow document direction while center remains physically centered.",
  },
  {
    id: "toast.async",
    number: 6,
    title: "Async workflows",
    navigationTitle: "Async",
    description:
      "Loading, stable-ID updates, promise success, and promise error use independent imperative examples.",
  },
  {
    id: "toast.customization",
    number: 7,
    title: "Customization",
    navigationTitle: "Theme",
    description:
      "Width and appearance examples remain individually labelled while changing only the named Toaster option.",
  },
  {
    id: "toast.keyboard",
    number: 8,
    title: "Keyboard and accessibility",
    navigationTitle: "Keyboard",
    description:
      "F8 reaches the notification region; focus pauses timers and Escape dismisses without global interference.",
  },
  {
    id: "toast.stress",
    number: 9,
    title: "Responsive stress",
    navigationTitle: "Stress",
    description:
      "Long localized content, RTL, narrow layouts, reduced motion, and forced colors remain separately testable.",
  },
] as const satisfies readonly ScenarioDefinition[];

type ExampleProps = {
  badge: string;
  buttonLabel: string;
  children: ReactNode;
  onPress: () => void;
  tone?: "neutral" | "accent" | "info" | "success" | "warning" | "danger";
};

function Example({
  badge,
  buttonLabel,
  children,
  onPress,
  tone = "neutral",
}: ExampleProps) {
  return (
    <EvidenceSurface className="toast-example" inset="md">
      <VStack gap="3">
        <Badge size="sm" tone={tone}>
          {badge}
        </Badge>
        <Text as="p" tone="secondary" variant="body-sm">
          {children}
        </Text>
        <Button className="toast-example__trigger" size="sm" onPress={onPress}>
          {buttonLabel}
        </Button>
      </VStack>
    </EvidenceSurface>
  );
}

type RuntimeOptions = {
  appearance?: "light" | "dark";
  custom?: boolean;
  dir?: "ltr" | "rtl";
  position?: ToastPosition;
  stacking?: ToastStacking;
  width?: ToastWidth;
};

export function ToastPage() {
  const [position, setPosition] = useState<ToastPosition>("bottom-end");
  const [stacking, setStacking] = useState<ToastStacking>("separated");
  const [width, setWidth] = useState<ToastWidth>("responsive");
  const [appearance, setAppearance] = useState<"light" | "dark">("light");
  const [custom, setCustom] = useState(false);
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");

  useEffect(() => () => toast.dismiss(), []);

  const show = (create: () => void, options: RuntimeOptions = {}) => {
    toast.dismiss();
    setPosition(options.position ?? "bottom-end");
    setStacking(options.stacking ?? "separated");
    setWidth(options.width ?? "responsive");
    setAppearance(options.appearance ?? "light");
    setCustom(options.custom ?? false);
    setDirection(options.dir ?? "ltr");
    window.requestAnimationFrame(create);
  };

  const showType = (type: ToastType) => {
    show(() => {
      toast({
        title: `${type} notification`,
        description: "The durable result remains available in the workspace.",
        type,
      });
    });
  };

  const createOverview = () => {
    show(() => {
      toast.success("Workspace published", {
        description: "The release is available to reviewers.",
        action: { label: "View", onClick: () => undefined },
      });
    });
  };

  const createQueue = (nextStacking: ToastStacking) => {
    show(
      () => {
        for (let index = 1; index <= 4; index += 1) {
          toast.info(`Queued notification ${index}`, {
            description:
              index === 2
                ? "This deliberately longer description verifies variable-height card separation."
                : "Queue evidence.",
            duration: Infinity,
          });
        }
      },
      { stacking: nextStacking },
    );
  };

  const runPromise = (outcome: "success" | "error") => {
    show(() => {
      const task = new Promise<string>((resolve, reject) => {
        window.setTimeout(() => {
          if (outcome === "success") resolve("Report exported");
          else reject(new Error("Export failed"));
        }, 600);
      });
      void toast
        .promise(task, {
          loading: "Exporting report",
          success: (value) => value,
          error: "Export failed",
        })
        .catch(() => undefined);
    });
  };

  return (
    <VStack
      className="toast-page"
      data-component-page="toast"
      data-testid="toast-workbench"
    >
      <Toaster
        data-brick-appearance={appearance}
        data-testid="toast-live-viewport"
        dir={direction}
        position={position}
        stacking={stacking}
        style={custom ? customViewportStyle : undefined}
        width={width}
      />

      <Scenario {...toastScenarios[0]}>
        <Grid.Root columns={2} className="toast-grid" data-testid="toast-overview">
          <Example
            badge="success + action"
            buttonLabel="Create success toast"
            onPress={createOverview}
            tone="success"
          >
            Creates one ordinary success toast with durable supporting copy, one optional action,
            and the default close control.
          </Example>
          <Example
            badge="dismiss all"
            buttonLabel="Dismiss all toasts"
            onPress={() => toast.dismiss()}
          >
            Clears the active region without removing this permanent playground evidence.
          </Example>
        </Grid.Root>
      </Scenario>

      <Scenario {...toastScenarios[1]}>
        <Grid.Root columns={3} className="toast-grid" data-testid="toast-types">
          {types.map((type) => (
            <Example
              badge={type}
              buttonLabel={`Show ${type} toast`}
              key={type}
              onPress={() => showType(type)}
              tone={typeTone[type]}
            >
              Creates only the {type} type while message, description, width, position, and
              stacking stay controlled.
            </Example>
          ))}
        </Grid.Root>
      </Scenario>

      <Scenario {...toastScenarios[2]}>
        <Grid.Root columns={3} className="toast-grid" data-testid="toast-content">
          <Example
            badge="title + description"
            buttonLabel="Show combined content"
            onPress={() =>
              show(() =>
                toast.info("Workspace synchronized", {
                  description: "All durable changes are visible in activity history.",
                }),
              )
            }
            tone="info"
          >
            The default content stack includes both authored hierarchy levels.
          </Example>
          <Example
            badge="title only"
            buttonLabel="Show title only"
            onPress={() => show(() => toast("Workspace synchronized"))}
          >
            Omits Description without leaving empty anatomy or spacing.
          </Example>
          <Example
            badge="description only"
            buttonLabel="Show description only"
            onPress={() =>
              show(() =>
                toast({ description: "Workspace changes are synchronized." }),
              )
            }
          >
            Omits Title while retaining a meaningful status message.
          </Example>
          <Example
            badge="custom icon"
            buttonLabel="Show custom icon"
            onPress={() =>
              show(() =>
                toast.info("Custom icon", {
                  description: "Consumer content replaces the component-owned default glyph.",
                  icon: <span className="toast-custom-icon">★</span>,
                }),
              )
            }
            tone="info"
          >
            Replaces only the decorative glyph without changing content or behavior.
          </Example>
          <Example
            badge="optional action"
            buttonLabel="Show action toast"
            onPress={() =>
              show(() =>
                toast.warning("Review available", {
                  action: { label: "Review", onClick: () => undefined },
                  description: "The same task remains available in the activity list.",
                }),
              )
            }
            tone="warning"
          >
            Adds one safe-to-ignore action and keeps the close control independently available.
          </Example>
          <Example
            badge="persistent, no close"
            buttonLabel="Show persistent toast"
            onPress={() =>
              show(() =>
                toast.info("Background connection active", {
                  closeButton: false,
                  description: "Use Dismiss all when this test is complete.",
                  duration: Infinity,
                }),
              )
            }
            tone="accent"
          >
            Demonstrates an explicit persistent duration and per-toast close override.
          </Example>
        </Grid.Root>
      </Scenario>

      <Scenario {...toastScenarios[3]}>
        <Grid.Root columns={2} className="toast-grid" data-testid="toast-queue">
          <Example
            badge="separated"
            buttonLabel="Create four queued toasts"
            onPress={() => createQueue("separated")}
            tone="info"
          >
            Shows three variable-height cards without collision and queues the fourth.
          </Example>
          <Example
            badge="overlap"
            buttonLabel="Create overlap queue"
            onPress={() => createQueue("overlap")}
            tone="accent"
          >
            Layers the same queue and expands it only when the region is engaged.
          </Example>
        </Grid.Root>
      </Scenario>

      <Scenario {...toastScenarios[4]}>
        <Grid.Root columns={3} className="toast-grid" data-testid="toast-positions">
          {positions.map((nextPosition) => (
            <Example
              badge={nextPosition}
              buttonLabel={`Show ${nextPosition} toast`}
              key={nextPosition}
              onPress={() =>
                show(
                  () =>
                    toast.info(`${nextPosition} position`, {
                      description: "Start and end resolve through logical inline direction.",
                    }),
                  { position: nextPosition },
                )
              }
              tone="info"
            >
              Creates one toast at the {nextPosition} viewport anchor.
            </Example>
          ))}
        </Grid.Root>
      </Scenario>

      <Scenario {...toastScenarios[5]}>
        <Grid.Root columns={3} className="toast-grid" data-testid="toast-async">
          <Example
            badge="stable ID update"
            buttonLabel="Run stable-ID update"
            onPress={() =>
              show(() => {
                const id = toast.loading("Uploading archive");
                window.setTimeout(
                  () =>
                    toast.update(id, {
                      duration: 5000,
                      title: "Upload complete",
                      type: "success",
                    }),
                  600,
                );
              })
            }
            tone="accent"
          >
            Updates one loading record in place instead of creating a second toast.
          </Example>
          <Example
            badge="promise success"
            buttonLabel="Run successful promise"
            onPress={() => runPromise("success")}
            tone="success"
          >
            Moves from loading to the resolved success message after the promise settles.
          </Example>
          <Example
            badge="promise error"
            buttonLabel="Run failing promise"
            onPress={() => runPromise("error")}
            tone="danger"
          >
            Moves from loading to an assertive error message without an unhandled rejection.
          </Example>
        </Grid.Root>
      </Scenario>

      <Scenario {...toastScenarios[6]}>
        <Grid.Root columns={3} className="toast-grid" data-testid="toast-customization">
          {(["responsive", "compact", "full"] as const).map((nextWidth) => (
            <Example
              badge={`${nextWidth} width`}
              buttonLabel={`Show ${nextWidth} width`}
              key={nextWidth}
              onPress={() =>
                show(
                  () =>
                    toast.success(`${nextWidth} width`, {
                      description: "Only the viewport width recipe changes.",
                    }),
                  { width: nextWidth },
                )
              }
              tone="success"
            >
              Uses the {nextWidth} Toaster width while content and position remain controlled.
            </Example>
          ))}
          <Example
            badge="light appearance"
            buttonLabel="Show light appearance"
            onPress={() =>
              show(
                () => toast.success("Light appearance", { description: "Semantic light tokens." }),
                { appearance: "light" },
              )
            }
          >
            Applies the light semantic scope directly to the portalled viewport.
          </Example>
          <Example
            badge="dark appearance"
            buttonLabel="Show dark appearance"
            onPress={() =>
              show(
                () => toast.success("Dark appearance", { description: "Semantic dark tokens." }),
                { appearance: "dark" },
              )
            }
            tone="accent"
          >
            Applies the dark semantic scope without requiring a static toast specimen.
          </Example>
          <Example
            badge="CSS variables"
            buttonLabel="Show customized toast"
            onPress={() =>
              show(
                () =>
                  toast.warning("Customized toast", {
                    description: "Amber paint comes from documented Toast variables.",
                  }),
                { custom: true },
              )
            }
            tone="warning"
          >
            Changes only documented viewport variables while Atom retains all behavior.
          </Example>
        </Grid.Root>
      </Scenario>

      <Scenario {...toastScenarios[7]}>
        <Grid.Root columns={2} className="toast-grid" data-testid="toast-keyboard">
          <Example
            badge="F8 + Escape"
            buttonLabel="Create keyboard fixture"
            onPress={() =>
              show(() =>
                toast.warning("Review required soon", {
                  action: { label: "Review", onClick: () => undefined },
                  description: "The same task remains in the activity list.",
                  duration: Infinity,
                }),
              )
            }
            tone="warning"
          >
            Press F8 after creation, Tab through action and close, then Escape to dismiss and
            restore trigger focus.
          </Example>
          <Example
            badge="assertive announcement"
            buttonLabel="Create assertive fixture"
            onPress={() =>
              show(() =>
                toast.error("Connection lost", {
                  description: "Recovery remains available from the persistent status panel.",
                }),
              )
            }
            tone="danger"
          >
            Creates exactly one assertive announcement without making the visible card a second
            live region.
          </Example>
        </Grid.Root>
      </Scenario>

      <Scenario {...toastScenarios[8]}>
        <Grid.Root columns={3} className="toast-grid" data-testid="toast-stress">
          <Example
            badge="long localized RTL"
            buttonLabel="Show Arabic stress toast"
            onPress={() =>
              show(
                () =>
                  toast.error("تعذر حفظ مساحة العمل", {
                    description:
                      "ستظل التغييرات المحلية متاحة حتى تتمكن من إعادة المحاولة من سجل النشاط.",
                    duration: Infinity,
                  }),
                { dir: "rtl", position: "bottom-start" },
              )
            }
            tone="danger"
          >
            Exercises logical RTL placement and mobile containment with genuine long Arabic content.
          </Example>
          <Example
            badge="long English copy"
            buttonLabel="Show long-copy toast"
            onPress={() =>
              show(() =>
                toast.info("Workspace archive is ready for review", {
                  description:
                    "The durable archive remains available from activity history even after this temporary notification disappears.",
                }),
              )
            }
            tone="info"
          >
            Verifies variable height, wrapping, and narrow responsive width.
          </Example>
          <Example
            badge="persistent loading"
            buttonLabel="Show loading stress toast"
            onPress={() =>
              show(() =>
                toast.loading("Preparing localized workspace archive", {
                  description: "Reduced motion keeps the visible loading state static.",
                }),
              )
            }
            tone="accent"
          >
            Keeps loading visible for reduced-motion and forced-color inspection.
          </Example>
        </Grid.Root>
      </Scenario>
    </VStack>
  );
}
