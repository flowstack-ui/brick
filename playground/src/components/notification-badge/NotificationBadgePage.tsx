import { Paragraph, VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { NotificationBadgeEvidence } from "./NotificationBadgeEvidence.js";
import { NotificationBadgeBasic } from "./examples/NotificationBadgeBasic.js";
import source from "./examples/NotificationBadgeBasic.tsx?raw";
import { examples, parts } from "./documentation.js";
export { notificationBadgeScenarios } from "./NotificationBadgeEvidence.js";
export function NotificationBadgePage() {
  const preview = usePreviewContext();
  if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <NotificationBadgeEvidence />;
  return (
    <VStack gap={12} data-component-page="notification-badge">
      <ExamplePreview label="NotificationBadge basic" source={source}><NotificationBadgeBasic /></ExamplePreview>
      <OwnerDocumentation name="NotificationBadge" usage={'<NotificationBadge count={3}>\n  <Avatar alt="Ada, 3 unread messages" fallback="AL" />\n</NotificationBadge>'} usageDescription="Attach a visual count or dot to one element. Include its meaning in the owning control name or nearby text." examples={examples} parts={parts} guide={<Paragraph tone="secondary">Wrap the whole control to mark its boundary, or wrap its icon inside IconButton to mark the artwork. Both are valid. Badge size is independent: start with xs/sm for compact controls, sm/md for ordinary controls, and md/lg for larger avatars. Keep the full interaction target and let IconButton size its artwork.</Paragraph>} />
    </VStack>
  );
}
