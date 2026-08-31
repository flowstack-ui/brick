import { useState, type CSSProperties } from "react";
import {
  Card,
  Grid,
  IconButton,
  Image,
  LinkBox,
  Paragraph,
  VStack,
  ZStack,
} from "@flowstack-ui/brick";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";
import { CustomizationEvidence } from "../../shared/CustomizationEvidence.js";
import "./link-box.playground.css";

function HeartIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

export const linkBoxScenarios = [
  {
    description:
      "One native title Link expands across a noninteractive article without adding another tab stop.",
    id: "link-box.destination",
    number: 1,
    title: "Primary destination",
  },
  {
    description:
      "A separately named action remains above the primary destination and activates without navigation.",
    id: "link-box.action",
    number: 2,
    title: "Independent action",
  },
  {
    description:
      "A media-corner action uses ZStack's named action layer while the expanded destination remains available beneath it.",
    id: "link-box.overlay",
    number: 3,
    title: "Overlay composition",
  },
  {
    description:
      "Long copy, narrow widths, dark appearance, RTL, and system media keep both interaction layers usable.",
    id: "link-box.stress",
    number: 4,
    title: "Responsive and stress",
    navigationTitle: "Stress",
  },
] as const satisfies readonly ScenarioDefinition[];

function DestinationCard({
  testId,
  title = "Stride Run 360",
  withAction = false,
  variant,
  style,
}: {
  testId?: string;
  title?: string;
  withAction?: boolean;
  variant?: "outline" | "plain";
  style?: CSSProperties;
}) {
  const [saved, setSaved] = useState(false);
  return (
    <LinkBox.Root
      as="article"
      className="link-box-example"
      style={style}
      variant={variant}
      data-testid={
        testId ?? (withAction ? "link-box-action" : "link-box-destination")
      }
    >
      <Card.Root>
        <Card.Header>
          <Card.Title>
            <LinkBox.Link href="#link-box-product">{title}</LinkBox.Link>
          </Card.Title>
          <Card.Description>Responsive road running shoe</Card.Description>
          {withAction ? (
            <Card.Action>
              <LinkBox.Action>
                <IconButton
                  aria-label={
                    saved
                      ? `Remove ${title} from saved products`
                      : `Save ${title}`
                  }
                  onClick={() => setSaved((value) => !value)}
                  tone="neutral"
                  variant="ghost"
                >
                  <HeartIcon />
                </IconButton>
              </LinkBox.Action>
            </Card.Action>
          ) : null}
        </Card.Header>
        <Card.Content>
          <VStack gap="2">
            <Paragraph>$129.99</Paragraph>
            <Paragraph tone="secondary" variant="body-sm">
              Free delivery Tuesday
            </Paragraph>
          </VStack>
        </Card.Content>
      </Card.Root>
    </LinkBox.Root>
  );
}

function OverlayCard() {
  const [saved, setSaved] = useState(false);
  return (
    <LinkBox.Root
      as="article"
      className="link-box-example"
      data-testid="link-box-overlay"
    >
      <Card.Root>
        <ZStack.Root isolation="open">
          <Image.Root
            ratio={16 / 9}
            src="/assets/image/workspace-landscape.png"
          >
            <Image.Content
              alt="Flowstack workspace overview"
              height={675}
              width={1200}
            />
            <Image.Fallback>Workspace preview unavailable</Image.Fallback>
          </Image.Root>
          <ZStack.Item
            align="start"
            asChild
            edgeSpacing="3"
            justify="end"
            layer="action"
          >
            <LinkBox.Action>
              <IconButton
                aria-label={
                  saved
                    ? "Remove workspace from saved projects"
                    : "Save workspace"
                }
                onClick={() => setSaved((value) => !value)}
                tone="neutral"
                variant="solid"
              >
                <HeartIcon />
              </IconButton>
            </LinkBox.Action>
          </ZStack.Item>
        </ZStack.Root>
        <Card.Header>
          <Card.Title>
            <LinkBox.Link href="#link-box-workspace">
              Collaboration workspace
            </LinkBox.Link>
          </Card.Title>
          <Card.Description>
            A complete product surface with one destination and one independent
            media action.
          </Card.Description>
        </Card.Header>
      </Card.Root>
    </LinkBox.Root>
  );
}

export function LinkBoxPage() {
  return (
    <VStack data-component-page="link-box">
      <Scenario {...linkBoxScenarios[0]}>
        <Specimen inset="lg" label="destination only">
          <DestinationCard />
        </Specimen>
      </Scenario>
      <Scenario {...linkBoxScenarios[1]}>
        <Specimen inset="lg" label="destination + independent action">
          <DestinationCard withAction />
        </Specimen>
      </Scenario>
      <Scenario {...linkBoxScenarios[2]}>
        <Specimen inset="lg" label="media overlay action">
          <OverlayCard />
        </Specimen>
      </Scenario>
      <Scenario {...linkBoxScenarios[3]}>
        <VStack gap="5">
          <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
            <Specimen
              data-brick-appearance="dark"
              inset="lg"
              label="dark + long title"
            >
              <DestinationCard
                testId="link-box-dark"
                title="A deliberately long project destination that still wraps clearly"
                withAction
              />
            </Specimen>
            <Specimen dir="rtl" inset="lg" label="RTL">
              <DestinationCard
                testId="link-box-rtl"
                title="مساحة عمل للمشروع"
                withAction
              />
            </Specimen>
            <Specimen inset="lg" label="plain interaction ring">
              <DestinationCard
                testId="link-box-plain"
                title="Plain linked article"
                variant="plain"
              />
            </Specimen>
          </Grid.Root>
          <CustomizationEvidence
            code={`--brick-link-box-radius: var(--brick-radius-full);\n--brick-link-box-hover-ring: var(--brick-color-accent-border);`}
            description="The live destination uses the same radius and hover ring shown in code."
            title="Link Box CSS properties"
          >
            <DestinationCard
              style={
                {
                  "--brick-link-box-radius": "var(--brick-radius-full)",
                  "--brick-link-box-hover-ring":
                    "var(--brick-color-accent-border)",
                } as CSSProperties
              }
              testId="link-box-customized"
              title="Customized destination"
            />
          </CustomizationEvidence>
        </VStack>
      </Scenario>
    </VStack>
  );
}
