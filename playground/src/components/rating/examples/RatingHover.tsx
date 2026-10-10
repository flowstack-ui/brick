import { Rating, useRating, HStack, Text } from "@flowstack-ui/brick";
export function RatingHover() {
  const rating = useRating({ defaultValue: 3 });
  return (
    <HStack gap="4" wrap="wrap">
      <Rating.RootProvider controller={rating} aria-label="Experience" />
      <Text>
        {rating.hoveredValue === null ? "Selected: " : "Preview: "}
        {rating.previewValue}
      </Text>
    </HStack>
  );
}
