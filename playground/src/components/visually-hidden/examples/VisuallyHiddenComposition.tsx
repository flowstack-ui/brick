import { Button, HStack, VisuallyHidden } from "@flowstack-ui/brick";
export function VisuallyHiddenComposition() {
  return (
    <HStack gap="3" wrap>
      <Button variant="outline">
        Read more
        <VisuallyHidden.Root asChild>
          <span> about billing</span>
        </VisuallyHidden.Root>
      </Button>
      <Button variant="outline">
        Read more
        <VisuallyHidden.Root render={<span />}>
          {" "}
          about security
        </VisuallyHidden.Root>
      </Button>
    </HStack>
  );
}
