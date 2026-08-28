import { useState } from "react";
import {
  Card,
  IconButton,
  LinkBox,
  Paragraph,
  VStack,
} from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import "./link-box.playground.css";

function HeartIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
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
] as const satisfies readonly ScenarioDefinition[];

function DestinationCard({ withAction = false }: { withAction?: boolean }) {
  const [saved, setSaved] = useState(false);
  return (
    <LinkBox.Root
      as="article"
      className="link-box-example"
      data-testid={withAction ? "link-box-action" : "link-box-destination"}
    >
      <Card.Root>
        <Card.Header>
          <Card.Title>
            <LinkBox.Link href="#link-box-product">Stride Run 360</LinkBox.Link>
          </Card.Title>
          <Card.Description>Responsive road running shoe</Card.Description>
          {withAction ? (
            <Card.Action>
              <LinkBox.Action>
                <IconButton
                  aria-label={saved ? "Remove Stride Run 360 from saved products" : "Save Stride Run 360"}
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

export function LinkBoxPage() {
  return (
    <VStack data-component-page="link-box">
      <Scenario {...linkBoxScenarios[0]}>
        <EvidenceSurface inset="lg">
          <DestinationCard />
        </EvidenceSurface>
      </Scenario>
      <Scenario {...linkBoxScenarios[1]}>
        <EvidenceSurface inset="lg">
          <DestinationCard withAction />
        </EvidenceSurface>
      </Scenario>
    </VStack>
  );
}
