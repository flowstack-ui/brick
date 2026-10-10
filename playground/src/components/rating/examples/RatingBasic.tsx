import { Rating } from "@flowstack-ui/brick";
export function RatingBasic() {
  return (
    <Rating.Root defaultValue={3}>
      <Rating.Label>Your rating</Rating.Label>
      <Rating.Control />
    </Rating.Root>
  );
}
