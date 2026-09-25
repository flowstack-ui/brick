import { For, Surface, Text, VStack } from "@flowstack-ui/brick";

export function SurfaceInset() {
  return (
    <VStack gap="4">
      <For each={["none", "sm", "md", "lg", "xl", "2xl"] as const}>
        {(inset) => (
          <Surface key={inset} inset={inset} bordered>
            <Text>{inset}</Text>
          </Surface>
        )}
      </For>
      <Surface inset={{ md: "lg" }} bordered>
        <Text>Responsive inset from md</Text>
      </Surface>
    </VStack>
  );
}
