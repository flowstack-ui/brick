import { useState } from "react";
import {
  For,
  Input,
  LocaleProvider,
  Text,
  VStack,
  useFilter,
} from "@flowstack-ui/brick";

function FilterItems() {
  const [query, setQuery] = useState("");
  const filter = useFilter({ sensitivity: "base" });
  const items = ["Café", "Résumé", "Inventory"];
  return (
    <VStack gap="4">
      <Input
        aria-label="Filter items"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <For
        each={items.filter((item) => filter.contains(item, query))}
        fallback={<Text>No matches</Text>}
      >
        {(item) => <Text key={item}>{item}</Text>}
      </For>
    </VStack>
  );
}
export function LocaleProviderFilter() {
  return (
    <LocaleProvider locale="en-US">
      <FilterItems />
    </LocaleProvider>
  );
}
