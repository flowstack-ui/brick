import { useEffect, useRef, useState } from "react";
import { Feed, Button, HStack, Text, VStack } from "@flowstack-ui/brick";
export function FeedUpdates() {
  const [items, setItems] = useState([1, 2]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  const sequence = useRef(2);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  function load(fail: boolean) {
    setBusy(true);
    setError(false);
    timer.current = setTimeout(() => {
      if (fail) setError(true);
      else {
        sequence.current += 1;
        setItems((current) => [...current, sequence.current]);
      }
      setBusy(false);
    }, 500);
  }
  return (
    <VStack gap={4}>
      <HStack gap={2} wrap>
        <Button size="sm" disabled={busy} onClick={() => load(false)}>
          {error ? "Retry" : "Load more"}
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={busy}
          onClick={() => load(true)}
        >
          Simulate error
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={busy || !items.length}
          onClick={() => setItems([])}
        >
          Clear updates
        </Button>
      </HStack>
      <Text role="status" variant="body-sm">
        {busy
          ? "Loading updates…"
          : error
            ? "Updates could not be loaded. Try again."
            : items.length
              ? items.length + " updates loaded."
              : "No activity yet."}
      </Text>
      <Feed.Root aria-label="Live activity" busy={busy} setSize="unknown">
        {items.map((item, index) => (
          <Feed.Item key={item} index={index} aria-label={"Update " + item}>
            <Text>Update {item}</Text>
          </Feed.Item>
        ))}
      </Feed.Root>
    </VStack>
  );
}
