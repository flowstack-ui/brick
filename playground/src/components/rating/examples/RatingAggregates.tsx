import { Rating, VStack, HStack, Text, Blockquote } from "@flowstack-ui/brick";
export function RatingAggregates() {
  return (
    <VStack gap="5">
      <HStack gap="3">
        <Rating.Display value={4.5} label="4.5 out of 5 stars" />
        <Text>128 reviews</Text>
      </HStack>
      <Rating.Summary value={4.8} label="4.8 out of 5 stars" />
      <Text>“Everything arrived on time, and the quality was excellent.”</Text>
      <Text>Alex Morgan, verified buyer</Text>
    </VStack>
  );
}
