import { useState, type CSSProperties, type ReactNode } from "react";
import {
  HStack,
  VStack,
  Avatar,
  Button,
  Text,
  Fieldset,
  NotificationBadge,
  ToggleGroup,
  type AvatarShape,
  type AvatarSize,
  type AvatarStatus,
} from "@flowstack-ui/brick";
import {
  Scenario,
  type ScenarioDefinition,
} from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./avatar.playground.css";

const sizes: AvatarSize[] = ["xs", "sm", "md", "lg", "xl"];
const shapes: AvatarShape[] = ["circle", "rounded"];
const statuses: AvatarStatus[] = ["online", "away", "busy", "offline"];
const statusLabels: Record<AvatarStatus, string> = {
  online: "Online",
  away: "Away",
  busy: "Busy",
  offline: "Offline",
};
const avatarImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'%3E%3Cdefs%3E%3ClinearGradient id='g' x2='1' y2='1'%3E%3Cstop stop-color='%236d5ce7'/%3E%3Cstop offset='1' stop-color='%23e58a5f'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='96' height='96' fill='url(%23g)'/%3E%3Ccircle cx='48' cy='36' r='17' fill='%23fff' fill-opacity='.88'/%3E%3Cpath d='M17 91c3-23 15-35 31-35s28 12 31 35' fill='%23fff' fill-opacity='.88'/%3E%3C/svg%3E";
const customTokens = {
  "--brick-avatar-background": "var(--brick-color-accent-soft)",
  "--brick-avatar-foreground": "var(--brick-color-accent-text)",
  "--brick-avatar-radius": "0.25rem",
  "--brick-avatar-status-ring-width": "0.2rem",
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
    <VStack as="section" className="avatar-evidence-group">
      <VStack className="avatar-evidence-group__heading">
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
    <div className="avatar-specimen-cell">
      <SpecimenLabel>{label}</SpecimenLabel>
      <div className="avatar-specimen-cell__preview">{children}</div>
    </div>
  );
}

export const avatarScenarios = [
  {
    description:
      "Avatar’s canonical rendering is a medium circular frame with no status. A fallback-only identity is valid; the consumer explicitly supplies both the full alternative and visible fallback.",
    id: "avatar.overview",
    number: 1,
    title: "Overview",
  },
  {
    description:
      "Size changes only the square frame and fallback typography. Every specimen keeps the default circle shape, no status, no source, and identical fallback content.",
    id: "avatar.sizes",
    number: 2,
    title: "Sizes",
  },
  {
    description:
      "Shape changes only frame geometry. Every specimen keeps the default medium size, no status, no source, and identical fallback content.",
    id: "avatar.shapes",
    number: 3,
    title: "Shapes",
  },
  {
    description:
      "One deterministic source drives loaded Image and Fallback state. Missing and failed sources preserve the same frame and informative fallback name.",
    id: "avatar.image-states",
    navigationTitle: "Images",
    number: 4,
    title: "Image and fallback states",
  },
  {
    description:
      "Informative fallback exposes the supplied full identity; decorative fallback stays silent beside visible text. An owning Button supplies action semantics and focus.",
    id: "avatar.semantics",
    navigationTitle: "Semantics",
    number: 5,
    title: "Accessibility and composition",
  },
  {
    description:
      "Status changes only the shape-following perimeter ring and never generates text or semantics. Visible localized copy preserves meaning beyond color; a focused geometry comparison proves both shapes.",
    id: "avatar.statuses",
    number: 6,
    title: "Status rings",
  },
  {
    description:
      "NotificationBadge remains a separate attached indicator. Count and dot composition can coexist with Avatar’s own status ring without changing Avatar’s API.",
    id: "avatar.notifications",
    navigationTitle: "Notifications",
    number: 7,
    title: "Notification composition",
  },
  {
    description:
      "Local appearance scopes and public root, slot, style, and component-token hooks customize one Avatar without changing Atom-owned loading behavior.",
    id: "avatar.appearance",
    navigationTitle: "Theme",
    number: 8,
    title: "Appearance and customization",
  },
  {
    description:
      "Non-Latin fallback, long adjacent content, constrained width, and genuine RTL preserve the explicit square frame without clipping or page overflow.",
    id: "avatar.stress",
    navigationTitle: "Stress",
    number: 9,
    title: "Responsive and RTL",
  },
] as const satisfies readonly ScenarioDefinition[];

export function AvatarPage() {
  const [sourceMode, setSourceMode] = useState<
    "loaded" | "broken" | "missing"
  >("loaded");
  const [activation, setActivation] = useState("No activation yet");
  const interactiveSource =
    sourceMode === "loaded"
      ? avatarImage
      : sourceMode === "broken"
        ? "/__broken-avatar-image__.png"
        : undefined;

  return (
    <VStack
      className="avatar-page"
      data-component-page="avatar"
      data-testid="avatar-workbench"
    >
      <Scenario {...avatarScenarios[0]}>
        <div className="avatar-overview" data-testid="avatar-overview">
          <Avatar alt="Ada Lovelace" fallback="AL" />
        </div>
      </Scenario>

      <Scenario {...avatarScenarios[1]}>
        <div
          className="avatar-specimen-grid avatar-specimen-grid--five"
          data-testid="avatar-sizes"
        >
          {sizes.map((size) => (
            <SpecimenCell key={size} label={size}>
              <Avatar alt="Ada Lovelace" fallback="AL" size={size} />
            </SpecimenCell>
          ))}
        </div>
      </Scenario>

      <Scenario {...avatarScenarios[2]}>
        <div
          className="avatar-specimen-grid avatar-specimen-grid--two"
          data-testid="avatar-shapes"
        >
          {shapes.map((shape) => (
            <SpecimenCell key={shape} label={shape}>
              <Avatar alt="Ada Lovelace" fallback="AL" shape={shape} />
            </SpecimenCell>
          ))}
        </div>
      </Scenario>

      <Scenario {...avatarScenarios[3]}>
        <div className="avatar-image-state-panel" data-testid="avatar-states">
          <Fieldset.Root>
            <Fieldset.Legend>Avatar source</Fieldset.Legend>
            <Fieldset.Description>
              Change only the source condition for the same identity.
            </Fieldset.Description>
            <ToggleGroup.Root
              attached
              aria-label="Avatar source"
              onValueChange={(value) => {
                if (
                  value === "loaded" ||
                  value === "broken" ||
                  value === "missing"
                ) {
                  setSourceMode(value);
                }
              }}
              size="sm"
              value={sourceMode}
            >
              <ToggleGroup.Item value="loaded">Loaded</ToggleGroup.Item>
              <ToggleGroup.Item value="broken">Broken</ToggleGroup.Item>
              <ToggleGroup.Item value="missing">Missing</ToggleGroup.Item>
            </ToggleGroup.Root>
          </Fieldset.Root>
          <HStack className="avatar-person-row">
            <Avatar
              alt="Ada Lovelace"
              fallback="AL"
              fallbackDelayMs={150}
              src={interactiveSource}
            />
            <VStack className="avatar-person-copy">
              <Text weight="semibold">Ada Lovelace</Text>
              <span>Current source: {sourceMode}</span>
            </VStack>
          </HStack>
        </div>
      </Scenario>

      <Scenario {...avatarScenarios[4]}>
        <VStack className="avatar-evidence-stack" data-testid="avatar-contexts">
          <EvidenceGroup
            description="These contexts differ only because the consumer’s accessibility requirement differs."
            title="Identity semantics"
          >
            <div className="avatar-specimen-grid avatar-specimen-grid--two">
              <SpecimenCell label="informative">
                <Avatar alt="Grace Hopper" fallback="GH" />
              </SpecimenCell>
              <SpecimenCell label="decorative beside text">
                <HStack className="avatar-person-row">
                  <Avatar alt="" fallback="AL" />
                  <Text weight="semibold">Ada Lovelace</Text>
                </HStack>
              </SpecimenCell>
            </div>
          </EvidenceGroup>
          <EvidenceGroup
            description="Avatar remains decorative and passive; Button owns the complete name, focus, and activation."
            title="Owning control"
          >
            <div className="avatar-control-panel">
              <Button
                aria-label="Open Katherine Johnson profile"
                onPress={() => setActivation("Katherine Johnson profile")}
                startIcon={<Avatar alt="" fallback="KJ" size="sm" />}
              >
                Profile
              </Button>
              <Text aria-live="polite" role="status" variant="body-sm">{activation}</Text>
            </div>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...avatarScenarios[5]}>
        <VStack className="avatar-evidence-stack" data-testid="avatar-statuses">
          <EvidenceGroup
            description="All four status values use the default medium circular frame and identical fallback content."
            title="Status values"
          >
            <div className="avatar-specimen-grid avatar-specimen-grid--four">
              {statuses.map((status) => (
                <SpecimenCell key={status} label={status}>
                  <HStack className="avatar-status-example">
                    <Avatar alt="" fallback="AL" status={status} />
                    <span>{statusLabels[status]}</span>
                  </HStack>
                </SpecimenCell>
              ))}
            </div>
          </EvidenceGroup>
          <EvidenceGroup
            description="Online is repeated across both supported shapes solely to verify that the ring inherits frame geometry."
            title="Shape-following geometry"
          >
            <div className="avatar-specimen-grid avatar-specimen-grid--two">
              {shapes.map((shape) => (
                <SpecimenCell key={shape} label={shape}>
                  <Avatar
                    alt=""
                    fallback="AL"
                    shape={shape}
                    status="online"
                  />
                </SpecimenCell>
              ))}
            </div>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...avatarScenarios[6]}>
        <div
          className="avatar-specimen-grid avatar-specimen-grid--two"
          data-testid="avatar-notifications"
        >
          <SpecimenCell label="count + status ring">
            <HStack className="avatar-status-example">
              <NotificationBadge count={3} overlap="circular">
                <Avatar alt="" fallback="AL" status="online" />
              </NotificationBadge>
              <span>Online · 3 updates</span>
            </HStack>
          </SpecimenCell>
          <SpecimenCell label="dot">
            <HStack className="avatar-status-example">
              <NotificationBadge dot overlap="circular" tone="success">
                <Avatar alt="" fallback="GH" />
              </NotificationBadge>
              <span>Grace Hopper · Online</span>
            </HStack>
          </SpecimenCell>
        </div>
      </Scenario>

      <Scenario {...avatarScenarios[7]}>
        <VStack className="avatar-evidence-stack">
          <EvidenceGroup
            description="Adjacent light and dark scopes preserve Avatar’s default fallback recipe."
            title="Scoped appearances"
          >
            <div
              className="avatar-scoped-appearance-grid"
              data-testid="avatar-appearance"
            >
              <div data-brick-appearance="light">
                <code>light</code>
                <Avatar alt="Ada Lovelace" fallback="AL" />
              </div>
              <div data-brick-appearance="dark">
                <code>dark</code>
                <Avatar alt="Ada Lovelace" fallback="AL" />
              </div>
            </div>
          </EvidenceGroup>
          <EvidenceGroup
            description="The code names every supported hook and exactly matches the rendered result."
            title="Consumer customization"
          >
            <article className="avatar-customization">
              <div>
                <Text as="h4" variant="title-sm">Root and component CSS properties</Text>
                <Text as="p" tone="secondary" variant="body-sm">
                  Root class, slot, native style, and public Avatar tokens
                  customize one rounded online identity.
                </Text>
                <pre aria-label="Avatar customization example" tabIndex={0}>
                  <code>{`<Avatar
  alt="Customized identity"
  className="custom-avatar"
  data-slot="workspace-avatar"
  fallback="CX"
  shape="rounded"
  status="online"
  style={{
    "--brick-avatar-background":
      "var(--brick-color-accent-soft)",
    "--brick-avatar-foreground":
      "var(--brick-color-accent-text)",
    "--brick-avatar-radius": "0.25rem",
    "--brick-avatar-status-ring-width": "0.2rem",
  }}
/>`}</code>
                </pre>
              </div>
              <div className="avatar-customization__preview">
                <Avatar
                  alt="Customized identity"
                  className="custom-avatar"
                  data-slot="workspace-avatar"
                  fallback="CX"
                  shape="rounded"
                  status="online"
                  style={customTokens}
                />
              </div>
            </article>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...avatarScenarios[8]}>
        <VStack className="avatar-evidence-stack" data-testid="avatar-stress">
          <EvidenceGroup
            description="A fixed Avatar remains square while long adjacent identity text reflows inside a 20rem frame."
            title="Constrained-width stress"
          >
            <div className="avatar-stress-panel">
              <HStack className="avatar-phone-frame">
                <Avatar alt="" fallback="李" shape="rounded" status="offline" />
                <VStack className="avatar-person-copy">
                  <Text weight="semibold">李小龍</Text>
                  <span>
                    Offline · ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789
                  </span>
                </VStack>
              </HStack>
            </div>
          </EvidenceGroup>
          <EvidenceGroup
            description="Avatar has no directional layout; genuine right-to-left adjacent content controls reading order."
            title="RTL inheritance"
          >
            <div className="avatar-stress-panel">
              <HStack className="avatar-phone-frame" dir="rtl">
                <Avatar alt="" fallback="ن" status="away" />
                <VStack className="avatar-person-copy">
                  <Text weight="semibold">نور</Text>
                  <span>بعيد · حالة محلية طويلة لمساحة العمل</span>
                </VStack>
              </HStack>
            </div>
          </EvidenceGroup>
        </VStack>
      </Scenario>
    </VStack>
  );
}
