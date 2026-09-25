import { Feed, Text } from "@flowstack-ui/brick";
export function FeedPositions() {
  return (
    <Feed.Root aria-label="Older activity" setSize="unknown">
      {[11, 12, 13].map((position) => (
        <Feed.Item
          key={position}
          position={position}
          aria-label={"Update " + position}
        >
          <Text>Update {position}</Text>
        </Feed.Item>
      ))}
    </Feed.Root>
  );
}
