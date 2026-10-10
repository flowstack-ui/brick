import { Rating } from "@flowstack-ui/brick";
export function RatingComposition() {
  return (
    <Rating.Root inputMode="manual" name="quality" defaultValue={4}>
      <Rating.Label>Quality</Rating.Label>
      <Rating.Control>
        {[1, 2, 3, 4, 5].map((value) => (
          <Rating.Item key={value} value={value} asChild>
            <span>
              <Rating.ItemIndicator />
            </span>
          </Rating.Item>
        ))}
      </Rating.Control>
      <Rating.HiddenInput />
    </Rating.Root>
  );
}
