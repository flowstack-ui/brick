import { ColorSwatch, Grid, HStack, Surface, Text, VStack } from "@flowstack-ui/brick";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";

export const colorSwatchScenarios = [
  { id: "color-swatch.overview", number: 1, title: "Overview", description: "Solid and alpha colors keep one finished footprint while the checker reveals transparency." },
  { id: "color-swatch.sizes", number: 2, title: "Sizes", description: "The closed size vocabulary aligns previews with nearby color values." },
  { id: "color-swatch.mix", number: 3, title: "Mixed colors", description: "Two or more colors share one swatch footprint with equal visual weight." },
  { id: "color-swatch.semantics", number: 4, title: "Semantics", description: "Decorative previews stay hidden while an explicitly labeled preview becomes a named image." },
] as const satisfies readonly ScenarioDefinition[];

export function ColorSwatchPage() {
  return (
    <VStack data-component-page="color-swatch" gap="6">
      <Scenario {...colorSwatchScenarios[0]}>
        <Surface inset="lg"><HStack gap="4">
          <ColorSwatch.Root data-testid="color-swatch-solid" value="#5b5bd6" />
          <Text>Indigo #5b5bd6</Text>
          <ColorSwatch.Root data-testid="color-swatch-alpha" value="rgb(229 72 77 / 45%)" />
          <Text>Ruby at 45%</Text>
        </HStack></Surface>
      </Scenario>
      <Scenario {...colorSwatchScenarios[1]}>
        <Surface inset="lg"><HStack gap="4">
          {(["sm", "md", "lg"] as const).map((size) => <VStack align="center" gap="2" key={size}><ColorSwatch.Root data-testid={`color-swatch-${size}`} size={size} value="#30a46c" /><Text variant="caption">{size}</Text></VStack>)}
        </HStack></Surface>
      </Scenario>
      <Scenario {...colorSwatchScenarios[2]}>
        <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
          <Surface inset="lg"><HStack gap="3"><ColorSwatch.Mix data-testid="color-swatch-mix-two" values={["#5b5bd6", "#e5484d"]} /><Text>Campaign pair</Text></HStack></Surface>
          <Surface inset="lg"><HStack gap="3"><ColorSwatch.Mix data-testid="color-swatch-mix-three" values={["#5b5bd6", "#e5484d", "#30a46c"]} /><Text>Product palette</Text></HStack></Surface>
        </Grid.Root>
      </Scenario>
      <Scenario {...colorSwatchScenarios[3]}>
        <Surface inset="lg"><HStack gap="4"><ColorSwatch.Root data-testid="color-swatch-decorative" value="#f5d90a" /><Text>Yellow #f5d90a</Text><ColorSwatch.Root data-testid="color-swatch-labeled" label="Ocean blue color" value="#0090ff" /></HStack></Surface>
      </Scenario>
    </VStack>
  );
}
