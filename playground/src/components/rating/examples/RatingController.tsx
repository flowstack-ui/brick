import { Rating, useRating, HStack, Button } from "@flowstack-ui/brick";
export function RatingControllerExample() {
  const rating = useRating({ defaultValue: 3 });
  return (
    <HStack gap="6" wrap="wrap">
      <Rating.RootProvider controller={rating} aria-label="Experience" />
      <Button variant="outline" onClick={() => rating.reset()}>
        Reset rating
      </Button>
    </HStack>
  );
}
