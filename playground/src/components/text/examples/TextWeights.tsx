import { For, Text, VStack } from "@flowstack-ui/brick";

export function TextWeights() {
  return (
    <VStack gap={3}>
      <For
        each={
          [
            "thin",
            "extralight",
            "light",
            "regular",
            "medium",
            "semibold",
            "bold",
            "extrabold",
            "black",
          ] as const
        }
      >
        {(weight) => (
          <Text key={weight} weight={weight}>
            {weight}
          </Text>
        )}
      </For>
    </VStack>
  );
}
