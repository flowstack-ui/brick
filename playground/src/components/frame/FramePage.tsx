import {
  Frame,
  Grid,
  HStack,
  ScrollArea,
  Surface,
  Text,
  VStack,
} from "../../../../src/index.js";
import { Scenario } from "../../shared/Scenario.js";
import "./frame.playground.css";

export const frameScenarios = [
  { id: "frame.overview", number: 1, title: "Constraint ownership", description: "Four unrelated layouts use one narrow logical-size grammar." },
  { id: "frame.responsive", number: 2, title: "Responsive carry-forward", description: "Values remain active until a later Brick breakpoint replaces them." },
  { id: "frame.composition", number: 3, title: "One-host composition", description: "Frame can enhance the node that already owns semantics or paint." },
  { id: "frame.stress", number: 4, title: "Logical and content stress", description: "Long content, RTL, and vertical writing preserve access and source order." },
];

const updates = Array.from({ length: 12 }, (_, index) => `Project update ${index + 1}`);

export function FramePage() {
  return (
    <VStack data-component-page="frame" gap="6">
      <Scenario {...frameScenarios[0]}>
        <Grid.Root columns={{ initial: 1, lg: 2 }} data-testid="frame-cases" gap="4">
          <Surface inset="md"><HStack align="stretch" gap="3"><Frame minInlineSize="9rem"><Text weight="semibold">Navigation rail</Text></Frame><Text tone="secondary">Flexible content remains beside a deliberate minimum.</Text></HStack></Surface>
          <Surface inset="md"><Frame maxInlineSize="48ch"><Text>Readable copy stops growing while its surrounding layout may continue across a wide viewport.</Text></Frame></Surface>
          <Frame minBlockSize={{ initial: "12rem", lg: "18rem" }}><Surface className="frame-canvas" inset="md"><Text weight="semibold">Media canvas</Text></Surface></Frame>
          <Frame maxBlockSize={{ initial: "12rem", lg: "16rem" }}><ScrollArea.Root className="frame-scroll" scrollbarVisibility="always"><ScrollArea.Viewport aria-label="Project updates" focusable><VStack gap="2">{updates.map((update) => <Text key={update}>{update}</Text>)}</VStack></ScrollArea.Viewport></ScrollArea.Root></Frame>
        </Grid.Root>
      </Scenario>

      <Scenario {...frameScenarios[1]}>
        <Frame data-testid="frame-responsive" inlineSize={{ initial: "100%", md: "75%", xl: "50%" }} minBlockSize={{ initial: "8rem", lg: "12rem" }}>
          <Surface inset="md"><Text>Inspect my computed logical size at each breakpoint.</Text></Surface>
        </Frame>
      </Scenario>

      <Scenario {...frameScenarios[2]}>
        <VStack gap="4">
          <Frame asChild data-testid="frame-composed" maxInlineSize="36rem">
            <Surface as="article" inset="md"><Text weight="semibold">One article host owns paint and a deliberate maximum measure.</Text></Surface>
          </Frame>
          <Frame blockSize={{ initial: "20rem", lg: "24rem" }} data-testid="frame-nested-parent">
            <Frame blockSize="50%" data-testid="frame-nested-child">
              <Surface inset="sm"><Text>Nested Frame constraints remain locally scoped.</Text></Surface>
            </Frame>
            <Frame data-testid="frame-nested-auto">
              <Text>An unconstrained child keeps intrinsic block size.</Text>
            </Frame>
          </Frame>
        </VStack>
      </Scenario>

      <Scenario {...frameScenarios[3]}>
        <Grid.Root columns={2} gap="4">
          <Frame as="section" dir="rtl" maxInlineSize="32rem"><Surface inset="md"><Text>محتوى طويل يحافظ على القيود المنطقية واتجاه القراءة.</Text></Surface></Frame>
          <Frame className="frame-vertical" maxBlockSize="18rem"><Surface inset="md"><Text>Logical constraints remain meaningful in vertical writing.</Text></Surface></Frame>
        </Grid.Root>
      </Scenario>
    </VStack>
  );
}
