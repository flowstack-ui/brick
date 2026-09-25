import { Rating, VStack } from "@flowstack-ui/brick";
export function RatingPrecision() {
  return (
    <VStack gap="6">
      <Rating.Root defaultValue={3.5} step={0.5}>
        <Rating.Label>Half stars</Rating.Label>
        <Rating.Control />
      </Rating.Root>
      <Rating.Root defaultValue={4.2} step={0.1}>
        <Rating.Label>Expert score (tenths)</Rating.Label>
        <Rating.Control />
      </Rating.Root>
    </VStack>
  );
}
