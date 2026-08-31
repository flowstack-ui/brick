import {
  Badge,
  Button,
  Surface,
  Text,
  VStack,
  ZStack,
} from "@flowstack-ui/brick";
import type { ReactNode } from "react";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";
import "./z-stack.playground.css";

export const zStackScenarios = [
  {
    id: "z-stack.overview",
    number: 1,
    title: "Overview",
    description:
      "Two authored children share one naturally sized grid cell without absolute positioning.",
  },
  {
    id: "z-stack.placement",
    number: 2,
    title: "Nine-position placement",
    description:
      "Per-item logical alignment places labels at corners and center without changing source order.",
  },
  {
    id: "z-stack.composition",
    number: 3,
    title: "Composition",
    description:
      "An existing semantic child can receive item placement without another wrapper.",
  },
  {
    id: "z-stack.stress",
    number: 4,
    title: "Accessibility and stress",
    description:
      "Long content, RTL, focus order, appearance, and narrow widths retain authored semantics and access.",
  },
] as const satisfies readonly ScenarioDefinition[];

function Canvas({ children, label }: { children: ReactNode; label: string }) {
  return (
    <Specimen className="z-stack-canvas" label={label}>
      {children}
    </Specimen>
  );
}

export function ZStackPage() {
  return (
    <VStack data-component-page="z-stack" gap="6">
      <Scenario {...zStackScenarios[0]}>
        <Canvas label="natural shared grid cell">
          <ZStack.Root data-testid="z-stack-overview">
            <Surface
              className="z-stack-positioned-layer"
              inset="lg"
              level="subtle"
              radius="surface"
            >
              <Text>Foundation layer</Text>
            </Surface>
            <ZStack.Item align="center" justify="center">
              <Badge>Overlay</Badge>
            </ZStack.Item>
          </ZStack.Root>
        </Canvas>
      </Scenario>
      <Scenario {...zStackScenarios[1]}>
        <Canvas label="all nine logical placements">
          <ZStack.Root data-testid="z-stack-placement">
            <Surface bordered className="z-stack-stage" radius="surface" />
            <ZStack.Item align="start" justify="start">
              <Badge>Top start</Badge>
            </ZStack.Item>
            <ZStack.Item align="start" justify="center">
              <Badge>Top middle</Badge>
            </ZStack.Item>
            <ZStack.Item align="start" justify="end">
              <Badge>Top end</Badge>
            </ZStack.Item>
            <ZStack.Item align="center" justify="start">
              <Badge>Middle start</Badge>
            </ZStack.Item>
            <ZStack.Item align="center" justify="center">
              <Badge tone="accent">Center</Badge>
            </ZStack.Item>
            <ZStack.Item align="center" justify="end">
              <Badge>Middle end</Badge>
            </ZStack.Item>
            <ZStack.Item align="end" justify="start">
              <Badge>Bottom start</Badge>
            </ZStack.Item>
            <ZStack.Item align="end" justify="center">
              <Badge>Bottom middle</Badge>
            </ZStack.Item>
            <ZStack.Item align="end" justify="end">
              <Badge>Bottom end</Badge>
            </ZStack.Item>
          </ZStack.Root>
        </Canvas>
      </Scenario>
      <Scenario {...zStackScenarios[2]}>
        <Canvas label="composed action layer">
          <ZStack.Root data-testid="z-stack-composition" isolation="open">
            <Surface
              className="z-stack-stage"
              level="subtle"
              radius="surface"
            />
            <ZStack.Item
              align="end"
              asChild
              edgeSpacing="3"
              justify="end"
              layer="action"
            >
              <Button size="sm">Composed action</Button>
            </ZStack.Item>
          </ZStack.Root>
        </Canvas>
      </Scenario>
      <Scenario {...zStackScenarios[3]}>
        <Canvas label="responsive RTL focus order">
          <ZStack.Root
            align={{ initial: "stretch", md: "center" }}
            data-testid="z-stack-stress"
            dir="rtl"
            justify={{ initial: "stretch", md: "center" }}
          >
            <Surface
              className="z-stack-stage"
              level="subtle"
              radius="surface"
            />
            <ZStack.Item
              align={{ initial: "end", md: "center" }}
              justify={{ initial: "start", md: "center" }}
            >
              <VStack align="center" gap="2">
                <Text>طبقات مرتبة حسب المصدر</Text>
                <Button>First action</Button>
                <Button tone="neutral" variant="outline">
                  Second action
                </Button>
              </VStack>
            </ZStack.Item>
          </ZStack.Root>
        </Canvas>
      </Scenario>
    </VStack>
  );
}
