import { Button, HStack, Skeleton } from "@flowstack-ui/brick";
export function SkeletonChildren() {
  return (
    <HStack gap="4">
      <Skeleton asChild>
        <Button>Save changes</Button>
      </Skeleton>
      <Skeleton asChild loading={false}>
        <Button>Save changes</Button>
      </Skeleton>
    </HStack>
  );
}
