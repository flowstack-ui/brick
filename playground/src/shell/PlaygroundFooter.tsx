import { Frame, Grid, HStack, Icon, Link, Surface, Text, VStack } from "@flowstack-ui/brick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { playgroundEntries, type PlaygroundEntry } from "../app/component-registry.js";
import { orderNavigation } from "./navigation-order.js";

function PageLink({ entry, next = false }: { entry: PlaygroundEntry; next?: boolean }) {
  return <Surface level="canvas" bordered inset="md" radius="md" asChild>
    <Link variant="plain" tone="neutral" asChild>
      <a href={entry.route} rel={next ? "next" : "prev"}>
      <Frame inlineSize="100%" asChild>
        <VStack gap="1" align={next ? "end" : "start"}>
          <Text variant="body-sm" tone="secondary">{next ? "Next" : "Previous"}</Text>
          <HStack gap="2">
            {!next && <Icon size="xs"><ChevronLeft /></Icon>}
            <Text variant="body-sm" weight="medium">{entry.title}</Text>
            {next && <Icon size="xs"><ChevronRight /></Icon>}
          </HStack>
        </VStack>
      </Frame>
      </a>
    </Link>
  </Surface>;
}

export function PlaygroundFooter({ currentRoute }: { currentRoute: string }) {
  const entries = orderNavigation(playgroundEntries);
  const index = entries.findIndex(entry => entry.route === currentRoute);
  if (index < 0) return null;
  const previous = entries[index - 1];
  const next = entries[index + 1];
  return <VStack as="footer" startSpacing={16}>
    <Grid.Root as="nav" aria-label="Adjacent component pages" columns={2} gap="4">
      <Grid.Item><VStack>{previous && <PageLink entry={previous} />}</VStack></Grid.Item>
      <Grid.Item><VStack>{next && <PageLink entry={next} next />}</VStack></Grid.Item>
    </Grid.Root>
  </VStack>;
}
