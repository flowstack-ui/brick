import { Paragraph, VStack } from "@flowstack-ui/brick";
import { DocsSection } from "../../shared/DocsSection.js";

export function PopoverGuide() {
  return (
    <DocsSection id="guide" title="Guide" level={2}>
      <VStack gap="4">
        <Paragraph tone="secondary">Use Popover for a short interactive task, Tooltip for a passive hint, and Dialog for a longer workflow. Give every panel a Title or accessible label. Compose Close with Button or CloseButton.</Paragraph>
        <Paragraph tone="secondary">Header, Body and Footer own their padding. Size controls maximum width; inset controls spacing and overrides density spacing. Unspecified inset preserves the density default. Radius and colors follow Brick tokens.</Paragraph>
        <Paragraph tone="secondary">Keep nested overlays inside their parent's DOM scope. Within Dialog, omit Popover.Portal and use fixed positioning when the dialog scrolls internally. Custom portal containers must live inside the intended appearance and document environment.</Paragraph>
        <Paragraph tone="secondary">Initial focus and final focus accept a target or false. Keep a reachable Close action when disabling Escape and outside dismissal. Persistent elements are explicit exceptions, not a substitute for correct nesting.</Paragraph>
        <Paragraph tone="secondary">Mounting is lazy and content unmounts after exit by default. Set unmountOnExit to false to retain drafts. Activity hiding falls back to display-none where React does not supply Activity. Presence controls visual retention, not application open state.</Paragraph>
        <Paragraph tone="secondary">Pass the original usePopover controller to RootProvider; do not clone it. State and usePopoverState expose public state and actions. Existing side, align and sideOffset remain supported; explicit positioning fields take precedence.</Paragraph>
      </VStack>
    </DocsSection>
  );
}
