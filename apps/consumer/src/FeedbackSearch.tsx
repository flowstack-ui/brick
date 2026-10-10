import { useState } from "react";
import { Alert } from "@flowstack-ui/brick/alert";
import { EmptyState } from "@flowstack-ui/brick/empty-state";
import { Spinner } from "@flowstack-ui/brick/spinner";
import { Button } from "@flowstack-ui/brick/button";
import { Input } from "@flowstack-ui/brick/input";
import { HStack, VStack } from "@flowstack-ui/brick/stack";
import { Text } from "@flowstack-ui/brick/text";

export function FeedbackSearch() {
  const [query, setQuery] = useState("archived");
  const [state, setState] = useState<"empty" | "loading" | "error" | "ready">("empty");
  return <VStack as="section" aria-label="Project search feedback" gap="4">
    <Text as="h2" variant="title-lg">Find a project</Text>
    <Input aria-label="Project query" value={query} onChange={event => setQuery(event.currentTarget.value)} />
    <HStack gap="3" wrap><Button loading={state === "loading"} onClick={() => setState("loading")}>Search projects</Button>
      {state === "loading" && <><Button variant="outline" tone="neutral" onClick={() => setState("error")}>Simulate search failure</Button><Button variant="outline" tone="neutral" onClick={() => setState("empty")}>Complete with no results</Button></>}
    </HStack>
    <Text role="status">{state === "loading" ? "Searching projects…" : state === "empty" ? "No matching projects." : state === "ready" ? "One project found." : "Search interrupted."}</Text>
    <VStack aria-busy={state === "loading"} gap="3">
      {state === "loading" && <Spinner />}
      {state === "empty" && <EmptyState.Root size={{ initial: "sm", md: "md" }}><EmptyState.Content><VStack gap={2}><EmptyState.Title as="h3">No matching projects</EmptyState.Title><EmptyState.Description>Try a shorter term or clear your filters.</EmptyState.Description></VStack><Button tone="neutral" variant="outline" onClick={() => { setQuery(""); setState("ready"); }}>Reset project filters</Button></EmptyState.Content></EmptyState.Root>}
      {state === "error" && <Alert.Root status="error" variant="surface"><Alert.Indicator /><Alert.Content><Alert.Title>Search unavailable</Alert.Title><Alert.Description>Your query is preserved. Try again.</Alert.Description><HStack><Button size="sm" onClick={() => setState("ready")}>Retry project search</Button></HStack></Alert.Content></Alert.Root>}
      {state === "ready" && <Text>Website redesign</Text>}
    </VStack>
  </VStack>;
}
