import { Rating, VStack } from "@flowstack-ui/brick";
const heart = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21 3 12C-3 6 6-2 12 5c6-7 15 1 9 7Z" />
  </svg>
);
export function RatingArtwork() {
  return (
    <VStack gap="6">
      <Rating.Root defaultValue={3}>
        <Rating.Label>Favorites</Rating.Label>
        <Rating.Control>
          <Rating.Items icon={heart} />
        </Rating.Control>
      </Rating.Root>
      <Rating.Root defaultValue={3}>
        <Rating.Label>How was your visit?</Rating.Label>
        <Rating.Control>
          {["😞", "🙁", "😐", "🙂", "😍"].map((emoji, index) => (
            <Rating.Item key={emoji} value={index + 1} contentMode="content">
              <Rating.ItemContext>
                {(item) => (
                  <span style={{ opacity: item.fill ? 1 : 0.45 }}>{emoji}</span>
                )}
              </Rating.ItemContext>
            </Rating.Item>
          ))}
        </Rating.Control>
      </Rating.Root>
    </VStack>
  );
}
