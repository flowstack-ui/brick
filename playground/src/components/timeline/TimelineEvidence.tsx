import { Check, Package, Truck } from "lucide-react";
import {
  Appearance,
  Avatar,
  Badge,
  Button,
  Card,
  For,
  Frame,
  Grid,
  HStack,
  Icon,
  Link,
  Surface,
  Timeline,
  VStack,
  type TimelineRootProps,
  type TimelineSide,
} from "@flowstack-ui/brick";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";

export const timelineScenarios = [
  {
    id: "timeline.basic",
    number: 1,
    title: "Chronological events",
    description: "An ordered list, not an interactive stepper.",
  },
  {
    id: "timeline.sizes",
    number: 2,
    title: "Sizes",
    description: "Markers remain exactly circular with coordinated typography.",
  },
  {
    id: "timeline.recipes",
    number: 3,
    title: "Variants and tones",
    description: "Four marker surfaces and semantic event overrides.",
  },
  {
    id: "timeline.indicators",
    number: 4,
    title: "Rich indicators",
    description:
      "Text, icons and avatars fit the marker without stretching it.",
  },
  {
    id: "timeline.sides",
    number: 5,
    title: "Content placement",
    description: "Logical before and after tracks mirror in RTL.",
  },
  {
    id: "timeline.alternating",
    number: 6,
    title: "Alternating and two-sided",
    description:
      "Balanced tracks preserve a shared connector axis without empty content nodes.",
  },
  {
    id: "timeline.rich",
    number: 7,
    title: "Rich activity",
    description:
      "Actions and attachments remain in accessible content, not decorative markers.",
  },
  {
    id: "timeline.time",
    number: 8,
    title: "Time metadata",
    description:
      "Applications own localized text and machine-readable timestamps.",
  },
  {
    id: "timeline.last",
    number: 9,
    title: "Final separator and boundaries",
    description:
      "Hide the last line by default; opt in for a continued chronology.",
  },
  {
    id: "timeline.surfaces",
    number: 10,
    title: "Variable content and surfaces",
    description:
      "Real connector spacing works across nested surfaces without painted masks.",
  },
  {
    id: "timeline.appearance",
    number: 11,
    title: "Narrow, RTL and appearance",
    description: "Long descriptions wrap while the marker stays square.",
  },
] as const satisfies readonly ScenarioDefinition[];

const events = [
  {
    title: "Order placed",
    description: "We received your order and payment.",
    Icon: Package,
  },
  {
    title: "On the way",
    description:
      "Your parcel is with the carrier. Delivery updates will appear here as your order travels to its destination.",
    Icon: Truck,
  },
  {
    title: "Delivered",
    description: "Your parcel arrived safely.",
    Icon: Check,
  },
] as const;

function Events({
  side = "after",
  alternate = false,
  count = 3,
  ...props
}: TimelineRootProps & {
  side?: TimelineSide;
  alternate?: boolean;
  count?: number;
}) {
  return (
    <Timeline.Root {...props}>
      <For each={events.slice(0, count)}>
        {(event, index) => (
          <Timeline.Item key={event.title}>
            <Timeline.Connector>
              <Timeline.Separator />
              <Timeline.Indicator>
                <Icon size="sm">
                  <event.Icon />
                </Icon>
              </Timeline.Indicator>
            </Timeline.Connector>
            <Timeline.Content
              side={alternate && index % 2 === 0 ? "before" : side}
            >
              <Timeline.Title>{event.title}</Timeline.Title>
              <Timeline.Description>{event.description}</Timeline.Description>
            </Timeline.Content>
          </Timeline.Item>
        )}
      </For>
    </Timeline.Root>
  );
}

export function TimelineEvidence() {
  return (
    <VStack gap="8" data-component-page="timeline">
      <Scenario {...timelineScenarios[0]}>
        <Specimen label="Order activity">
          <Events />
        </Specimen>
      </Scenario>
      <Scenario {...timelineScenarios[1]}>
        <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
          <For each={["sm", "md", "lg", "xl"] as const}>
            {(size) => (
              <Specimen key={size} label={size}>
                <Events size={size} />
              </Specimen>
            )}
          </For>
        </Grid.Root>
      </Scenario>
      <Scenario {...timelineScenarios[2]}>
        <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
          <For each={["soft", "solid", "outline", "plain"] as const}>
            {(variant) => (
              <Specimen key={variant} label={variant}>
                <Timeline.Root variant={variant} tone="accent">
                  <For
                    each={
                      [
                        "neutral",
                        "accent",
                        "info",
                        "success",
                        "warning",
                        "danger",
                      ] as const
                    }
                  >
                    {(tone) => (
                      <Timeline.Item key={tone} tone={tone}>
                        <Timeline.Connector>
                          <Timeline.Indicator>1</Timeline.Indicator>
                          <Timeline.Separator />
                        </Timeline.Connector>
                        <Timeline.Content>
                          <Timeline.Title>{tone}</Timeline.Title>
                          <Timeline.Description>
                            Event category
                          </Timeline.Description>
                        </Timeline.Content>
                      </Timeline.Item>
                    )}
                  </For>
                </Timeline.Root>
              </Specimen>
            )}
          </For>
        </Grid.Root>
      </Scenario>
      <Scenario {...timelineScenarios[3]}>
        <Specimen label="Avatar, icon and ordinal">
          <Timeline.Root size="xl" tone="accent">
            <For each={["Avatar", "Icon", "Number"]}>
              {(label, index) => (
                <Timeline.Item key={label}>
                  <Timeline.Connector>
                    <Timeline.Separator />
                    <Timeline.Indicator>
                      {index === 0 ? (
                        <Avatar alt="" fallback="RC" />
                      ) : index === 1 ? (
                        <Icon size="sm">
                          <Check />
                        </Icon>
                      ) : (
                        "3"
                      )}
                    </Timeline.Indicator>
                  </Timeline.Connector>
                  <Timeline.Content>
                    <Timeline.Title>{label} event</Timeline.Title>
                    <Timeline.Description>
                      Meaning is repeated in accessible content.
                    </Timeline.Description>
                  </Timeline.Content>
                </Timeline.Item>
              )}
            </For>
          </Timeline.Root>
        </Specimen>
      </Scenario>
      <Scenario {...timelineScenarios[4]}>
        <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
          <For each={["before", "after"] as const}>
            {(side) => (
              <Specimen key={side} label={side}>
                <Events side={side} />
              </Specimen>
            )}
          </For>
        </Grid.Root>
      </Scenario>
      <Scenario {...timelineScenarios[5]}>
        <VStack gap="4">
          <Specimen label="Alternating">
            <Events alternate />
          </Specimen>
          <Specimen label="Two-sided">
            <Timeline.Root>
              <For each={events}>
                {(event, index) => (
                  <Timeline.Item key={event.title}>
                    <Timeline.Content side="before">
                      <Timeline.Description>
                        Day {index + 1}
                      </Timeline.Description>
                    </Timeline.Content>
                    <Timeline.Connector>
                      <Timeline.Separator />
                      <Timeline.Indicator>{index + 1}</Timeline.Indicator>
                    </Timeline.Connector>
                    <Timeline.Content>
                      <Timeline.Title>{event.title}</Timeline.Title>
                      <Timeline.Description>
                        {event.description}
                      </Timeline.Description>
                    </Timeline.Content>
                  </Timeline.Item>
                )}
              </For>
            </Timeline.Root>
          </Specimen>
        </VStack>
      </Scenario>
      <Scenario {...timelineScenarios[6]}>
        <Specimen label="Account activity">
          <Timeline.Root size="lg" variant="soft" tone="success">
            <Timeline.Item>
              <Timeline.Connector>
                <Timeline.Separator />
                <Timeline.Indicator>
                  <Check />
                </Timeline.Indicator>
              </Timeline.Connector>
              <Timeline.Content>
                <Timeline.Title>Riley approved the proposal</Timeline.Title>
                <Timeline.Description>
                  Review completed with no changes requested.
                </Timeline.Description>
                <HStack gap="2" wrap>
                  <Badge tone="success">Approved</Badge>
                  <Link href="#scenario-timeline-rich">Proposal.pdf</Link>
                </HStack>
                <HStack justify="start">
                  <Button size="sm" variant="outline">
                    Reply to Riley
                  </Button>
                </HStack>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Connector>
                <Timeline.Indicator>
                  <Package />
                </Timeline.Indicator>
              </Timeline.Connector>
              <Timeline.Content>
                <Timeline.Title>Project created</Timeline.Title>
                <Timeline.Description>Workspace ready.</Timeline.Description>
              </Timeline.Content>
            </Timeline.Item>
          </Timeline.Root>
        </Specimen>
      </Scenario>
      <Scenario {...timelineScenarios[7]}>
        <Specimen label="Authored local time">
          <Timeline.Root>
            <Timeline.Item>
              <Timeline.Connector>
                <Timeline.Indicator>
                  <Check />
                </Timeline.Indicator>
              </Timeline.Connector>
              <Timeline.Content>
                <Timeline.Title>Deployment completed</Timeline.Title>
                <Timeline.Description>
                  <time dateTime="2026-09-07T14:30:00Z">
                    September 7, 2026 at 10:30 AM EDT
                  </time>
                </Timeline.Description>
              </Timeline.Content>
            </Timeline.Item>
          </Timeline.Root>
        </Specimen>
      </Scenario>
      <Scenario {...timelineScenarios[8]}>
        <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
          <Specimen label="Final line hidden">
            <Events count={1} />
          </Specimen>
          <Specimen label="Continued">
            <Events count={1} showLastSeparator />
          </Specimen>
          <Specimen label="Empty">
            <Timeline.Root aria-label="No recorded events" />
          </Specimen>
        </Grid.Root>
      </Scenario>
      <Scenario {...timelineScenarios[9]}>
        <VStack gap="4">
          <Card.Root>
            <Card.Content>
              <Events />
              <Timeline.Root size="xl">
                <Timeline.Item>
                  <Timeline.Connector>
                    <Timeline.Indicator>1</Timeline.Indicator>
                  </Timeline.Connector>
                  <Timeline.Content>
                    <Timeline.Title>Parent event</Timeline.Title>
                    <Events size="sm" />
                  </Timeline.Content>
                </Timeline.Item>
              </Timeline.Root>
            </Card.Content>
          </Card.Root>
          <Surface>
            <Events />
          </Surface>
        </VStack>
      </Scenario>
      <Scenario {...timelineScenarios[10]}>
        <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
          <For each={["light", "dark"] as const}>
            {(appearance) => (
              <Appearance key={appearance} value={appearance}>
                <Specimen label={appearance}>
                  <Frame maxInlineSize="18rem">
                    <Events dir="rtl" tone="accent" variant="outline" />
                  </Frame>
                </Specimen>
              </Appearance>
            )}
          </For>
        </Grid.Root>
      </Scenario>
    </VStack>
  );
}
