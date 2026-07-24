import { type CSSProperties, type ReactNode } from "react";
import {
  HStack,
  VStack,
  Avatar,
  IconButton,
  NotificationBadge,
  Text,
  type BadgeTone,
  type NotificationBadgeOverlap,
  type NotificationBadgePlacement,
  type NotificationBadgeSize,
} from "@flowstack-ui/brick";
import {
  Scenario,
  type ScenarioDefinition,
} from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./notification-badge.playground.css";

const tones: BadgeTone[] = [
  "neutral",
  "accent",
  "info",
  "success",
  "warning",
  "danger",
];
const sizes: NotificationBadgeSize[] = ["sm", "md", "lg"];
const placements: NotificationBadgePlacement[] = [
  "top-start",
  "top-end",
  "bottom-start",
  "bottom-end",
];
const overlaps: NotificationBadgeOverlap[] = ["rectangular", "circular"];
const customTokens = {
  "--brick-notification-badge-size": "1.75rem",
  "--brick-notification-badge-inline-padding": "0.5rem",
  "--brick-notification-badge-outline-color":
    "var(--brick-color-accent-border)",
} as CSSProperties;

function MailIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20">
      <rect
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
        width="16"
        x="2"
        y="4"
      />
      <path
        d="m3.5 6 6.5 5 6.5-5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

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
    <VStack as="section" className="notification-badge-evidence-group">
      <VStack className="notification-badge-evidence-group__heading">
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
    <div className="notification-badge-specimen-cell">
      <SpecimenLabel>{label}</SpecimenLabel>
      <div className="notification-badge-specimen-cell__preview">
        {children}
      </div>
    </div>
  );
}

function MailTarget({ label = "Inbox, 4 unread messages" }: { label?: string }) {
  return (
    <IconButton aria-label={label} tone="neutral" variant="outline">
      <MailIcon />
    </IconButton>
  );
}

export const notificationBadgeScenarios = [
  {
    description:
      "NotificationBadge’s canonical rendering is a danger count at the medium size, attached to the logical top-end of a rectangular target. The owning action provides the complete accessible name.",
    id: "notification-badge.overview",
    number: 1,
    title: "Overview",
  },
  {
    description:
      "Tone changes only the indicator’s semantic color. Count, medium size, top-end placement, rectangular overlap, and target content remain identical.",
    id: "notification-badge.tones",
    number: 2,
    title: "Tones",
  },
  {
    description:
      "Size changes only indicator geometry and padding. Every specimen retains the default danger tone, top-end placement, rectangular overlap, count, and target.",
    id: "notification-badge.sizes",
    number: 3,
    title: "Sizes",
  },
  {
    description:
      "Placement changes only the logical corner. Every specimen keeps the default rectangular overlap and mirrors start/end automatically in RTL.",
    id: "notification-badge.placements",
    number: 4,
    title: "Placements",
  },
  {
    description:
      "Rectangular overlap follows a control corner; circular overlap uses the audited inset for a round target. Placement, tone, size, and count stay at their defaults.",
    id: "notification-badge.overlap",
    number: 5,
    title: "Overlap",
  },
  {
    description:
      "Count and dot are exclusive modes. Zero, overflow, invalid values, and invisible state deterministically decide whether an indicator is rendered.",
    id: "notification-badge.states",
    navigationTitle: "States",
    number: 6,
    title: "Content and visibility states",
  },
  {
    description:
      "The indicator is always hidden from accessibility APIs and pointer input. Only the single owning child receives focus and activation.",
    id: "notification-badge.semantics",
    navigationTitle: "Semantics",
    number: 7,
    title: "Interaction and semantics",
  },
  {
    description:
      "Local appearance scopes and public wrapper, slot, style, and component-token hooks customize the visual indicator without changing its behavior.",
    id: "notification-badge.appearance",
    navigationTitle: "Theme",
    number: 8,
    title: "Appearance and customization",
  },
  {
    description:
      "Logical corners mirror around genuine RTL content, while long accessible names and constrained width preserve target size without page overflow.",
    id: "notification-badge.stress",
    navigationTitle: "Stress",
    number: 9,
    title: "Responsive and RTL",
  },
] as const satisfies readonly ScenarioDefinition[];

export function NotificationBadgePage() {
  return (
    <VStack
      className="notification-badge-page"
      data-component-page="notification-badge"
      data-testid="notification-badge-workbench"
    >
      <Scenario {...notificationBadgeScenarios[0]}>
        <div
          className="notification-badge-overview"
          data-testid="notification-badge-overview"
        >
          <NotificationBadge count={4}>
            <MailTarget />
          </NotificationBadge>
        </div>
      </Scenario>

      <Scenario {...notificationBadgeScenarios[1]}>
        <div
          className="notification-badge-specimen-grid notification-badge-specimen-grid--six"
          data-testid="notification-badge-tones"
        >
          {tones.map((tone) => (
            <SpecimenCell key={tone} label={tone}>
              <NotificationBadge count={4} tone={tone}>
                <MailTarget />
              </NotificationBadge>
            </SpecimenCell>
          ))}
        </div>
      </Scenario>

      <Scenario {...notificationBadgeScenarios[2]}>
        <div
          className="notification-badge-specimen-grid notification-badge-specimen-grid--three"
          data-testid="notification-badge-sizes"
        >
          {sizes.map((size) => (
            <SpecimenCell key={size} label={size}>
              <NotificationBadge count={4} size={size}>
                <MailTarget />
              </NotificationBadge>
            </SpecimenCell>
          ))}
        </div>
      </Scenario>

      <Scenario {...notificationBadgeScenarios[3]}>
        <div
          className="notification-badge-specimen-grid notification-badge-specimen-grid--four"
          data-testid="notification-badge-placements"
        >
          {placements.map((placement) => (
            <SpecimenCell key={placement} label={placement}>
              <NotificationBadge count={4} placement={placement}>
                <MailTarget />
              </NotificationBadge>
            </SpecimenCell>
          ))}
        </div>
      </Scenario>

      <Scenario {...notificationBadgeScenarios[4]}>
        <div
          className="notification-badge-specimen-grid notification-badge-specimen-grid--two"
          data-testid="notification-badge-overlaps"
        >
          {overlaps.map((overlap) => (
            <SpecimenCell key={overlap} label={overlap}>
              <NotificationBadge count={4} overlap={overlap}>
                {overlap === "circular" ? (
                  <Avatar alt="" fallback="AL" />
                ) : (
                  <MailTarget />
                )}
              </NotificationBadge>
            </SpecimenCell>
          ))}
        </div>
      </Scenario>

      <Scenario {...notificationBadgeScenarios[5]}>
        <div
          className="notification-badge-specimen-grid notification-badge-specimen-grid--six"
          data-testid="notification-badge-states"
        >
          <SpecimenCell label="one digit">
            <NotificationBadge count={4}>
              <MailTarget />
            </NotificationBadge>
          </SpecimenCell>
          <SpecimenCell label="overflow">
            <NotificationBadge count={125}>
              <MailTarget label="Inbox, more than 99 unread messages" />
            </NotificationBadge>
          </SpecimenCell>
          <SpecimenCell label="dot">
            <NotificationBadge dot>
              <MailTarget label="Inbox has new activity" />
            </NotificationBadge>
          </SpecimenCell>
          <SpecimenCell label="show zero">
            <NotificationBadge count={0} showZero>
              <MailTarget label="Inbox, no unread messages" />
            </NotificationBadge>
          </SpecimenCell>
          <SpecimenCell label="zero hidden">
            <NotificationBadge count={0}>
              <MailTarget label="Inbox, no unread messages" />
            </NotificationBadge>
          </SpecimenCell>
          <SpecimenCell label="invisible">
            <NotificationBadge count={4} invisible>
              <MailTarget />
            </NotificationBadge>
          </SpecimenCell>
        </div>
      </Scenario>

      <Scenario {...notificationBadgeScenarios[6]}>
        <div
          className="notification-badge-semantics"
          data-testid="notification-badge-semantics"
        >
          <NotificationBadge count={12}>
            <MailTarget label="Inbox, 12 unread messages" />
          </NotificationBadge>
          <Text as="p" tone="secondary">
            The visual “12” is supplemental. The action’s accessible name owns
            the complete localized meaning.
          </Text>
        </div>
      </Scenario>

      <Scenario {...notificationBadgeScenarios[7]}>
        <VStack className="notification-badge-evidence-stack">
          <EvidenceGroup
            description="Adjacent light and dark scopes preserve the default count recipe."
            title="Scoped appearances"
          >
            <div
              className="notification-badge-scoped-appearance-grid"
              data-testid="notification-badge-appearance"
            >
              <div data-brick-appearance="light">
                <code>light</code>
                <NotificationBadge count={4}>
                  <MailTarget />
                </NotificationBadge>
              </div>
              <div data-brick-appearance="dark">
                <code>dark</code>
                <NotificationBadge count={4}>
                  <MailTarget />
                </NotificationBadge>
              </div>
            </div>
          </EvidenceGroup>
          <EvidenceGroup
            description="The code names every supported hook and exactly matches the rendered result."
            title="Consumer customization"
          >
            <article className="notification-badge-customization">
              <div>
                <Text as="h4" variant="title-sm">Wrapper and component CSS properties</Text>
                <Text as="p" tone="secondary" variant="body-sm">
                  Root class, slot, native style, and public indicator tokens
                  remain local to this composition.
                </Text>
                <pre
                  aria-label="NotificationBadge customization example"
                  tabIndex={0}
                >
                  <code>{`<NotificationBadge
  className="custom-notification"
  count={12}
  data-slot="custom-notification"
  style={{
    "--brick-notification-badge-size": "1.75rem",
    "--brick-notification-badge-inline-padding": "0.5rem",
    "--brick-notification-badge-outline-color":
      "var(--brick-color-accent-border)",
  }}
>
  <IconButton aria-label="Inbox, 12 unread messages">
    <MailIcon />
  </IconButton>
</NotificationBadge>`}</code>
                </pre>
              </div>
              <div className="notification-badge-customization__preview">
                <NotificationBadge
                  className="custom-notification"
                  count={12}
                  data-slot="custom-notification"
                  style={customTokens}
                >
                  <MailTarget label="Inbox, 12 unread messages" />
                </NotificationBadge>
              </div>
            </article>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...notificationBadgeScenarios[8]}>
        <VStack
          className="notification-badge-evidence-stack"
          data-testid="notification-badge-stress"
        >
          <EvidenceGroup
            description="The target remains usable inside a 20rem application-owned frame even with a long accessible name."
            title="Constrained-width stress"
          >
            <div className="notification-badge-stress-panel">
              <HStack className="notification-badge-phone-frame">
                <NotificationBadge count={125}>
                  <MailTarget label="International workspace inbox, more than 99 unread messages" />
                </NotificationBadge>
                <span>International workspace inbox</span>
              </HStack>
            </div>
          </EvidenceGroup>
          <EvidenceGroup
            description="Top-end resolves to the physical left in this genuine right-to-left context without changing source order."
            title="RTL inheritance"
          >
            <div className="notification-badge-stress-panel">
              <HStack className="notification-badge-phone-frame" dir="rtl">
                <NotificationBadge count={4}>
                  <MailTarget label="البريد الوارد، ٤ رسائل غير مقروءة" />
                </NotificationBadge>
                <span>البريد الوارد</span>
              </HStack>
            </div>
          </EvidenceGroup>
        </VStack>
      </Scenario>
    </VStack>
  );
}
