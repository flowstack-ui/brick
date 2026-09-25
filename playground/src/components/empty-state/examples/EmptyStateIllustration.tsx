import { EmptyState, Frame, VStack } from "@flowstack-ui/brick";
export function EmptyStateIllustration() {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <Frame inlineSize="10rem">
          <svg aria-hidden="true" viewBox="0 0 160 80" fill="none">
            <rect
              x="30"
              y="20"
              width="100"
              height="50"
              rx="8"
              fill="currentColor"
              opacity=".08"
            />
            <path
              d="M20 20h45l10 10h65v40H20Z"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </Frame>
        <VStack gap={2}>
          <EmptyState.Title>Your archive is empty</EmptyState.Title>
          <EmptyState.Description>
            Archived projects will appear here.
          </EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}
