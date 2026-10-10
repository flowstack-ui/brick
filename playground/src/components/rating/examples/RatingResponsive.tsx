import { Rating } from "@flowstack-ui/brick";
export function RatingResponsive() {
  return (
    <Rating.Root
      defaultValue={3}
      size={{ initial: "sm", md: "lg" }}
      density={{ initial: "comfortable", md: "compact" }}
      gap={{ initial: 0, md: 1 }}
    >
      <Rating.Label>Responsive rating</Rating.Label>
      <Rating.Control />
    </Rating.Root>
  );
}
