import { For, HStack, Icon, IconButton, NotificationBadge, VStack } from "@flowstack-ui/brick";
import { Mail } from "lucide-react";

export function NotificationBadgeSizingEvidence() {
  return <VStack gap={6} data-testid="notification-badge-sizing-integration">
    <For each={["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const}>{size => <HStack key={size} gap={6}>
      <IconButton size={size} aria-label={`Raw ${size}, 3 unread`}><NotificationBadge count={3} size="xs"><Mail /></NotificationBadge></IconButton>
      <IconButton size={size} aria-label={`Icon ${size}, 3 unread`}><NotificationBadge count={3} size="sm"><Icon><Mail /></Icon></NotificationBadge></IconButton>
      <IconButton size={size} aria-label={`Projected ${size}, 3 unread`}><NotificationBadge count={3}><Icon asChild><Mail /></Icon></NotificationBadge></IconButton>
    </HStack>}</For>
    <IconButton loading aria-label="Loading inbox"><NotificationBadge count={3}><Icon><Mail /></Icon></NotificationBadge></IconButton>
    <IconButton disabled aria-label="Disabled inbox, 3 unread"><NotificationBadge count={3}><Icon><Mail /></Icon></NotificationBadge></IconButton>
  </VStack>;
}
