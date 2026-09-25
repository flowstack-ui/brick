import { useState } from "react";
import { For, Highlight, Input, Paragraph, VStack } from "@flowstack-ui/brick";
const results = [
  "Design foundations",
  "Design system",
  "Component documentation",
];
export function HighlightSearch() {
  const [query, setQuery] = useState("design");
  return (
    <VStack gap="4">
      <Input
        aria-label="Highlight search query"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <For each={results}>
        {(text) => (
          <Paragraph key={text}>
            <Highlight text={text} query={query} />
          </Paragraph>
        )}
      </For>
    </VStack>
  );
}
