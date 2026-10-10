import { Rating, VStack } from "@flowstack-ui/brick";
export function RatingColors() {
  return (
    <VStack gap="6">
      <Rating.Root defaultValue={3} tone="neutral">
        <Rating.Label>Neutral</Rating.Label>
        <Rating.Control />
      </Rating.Root>
      <Rating.Root defaultValue={3} fillColor="#b45309" emptyColor="#d6d3d1">
        <Rating.Label>Custom color</Rating.Label>
        <Rating.Control />
      </Rating.Root>
      <Rating.Root defaultValue={3} variant="outline">
        <Rating.Label>Outline</Rating.Label>
        <Rating.Control />
      </Rating.Root>
    </VStack>
  );
}
